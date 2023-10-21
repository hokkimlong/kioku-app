// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import ChatCommentContainer from '~/components/ui/ChatCommentContainer';
// import { Message, sendMessageToGroup } from '~/services/chat';
// import { useActivityContext } from './DetailStackNavigator';
// import { groupChatQueryKey, useActivityChats } from '~/services/activity';
// import { useFocusEffect } from '@react-navigation/native';
// import socket from '~/utils/socket';
// import { useUser } from '~/services/authentication';

// const ChatScreen = () => {
//   return (
//     <ChatCommentContainer
//       title="Chat"
//       onSend={value => {
//         mutation.mutate({ message: value, activityId: activity?.id });
//         socket.emit('message:groupchat', {
//           message: value,
//           activityId: activity?.id,
//           sender: user,
//         });
//       }}
//       currentUser={user}
//       messages={groupChats}
//     />
//   );
// };

// export default ChatScreen;

import React, { useEffect, useRef } from 'react';
import {
  DetailActivityStackList,
  useActivityContext,
} from './DetailStackNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createComment, postQueryKey, usePostComments } from '~/services/post';
import { useFocusEffect } from '@react-navigation/native';
import { useUser } from '~/services/authentication';
import socket from '~/utils/socket';
import { Message, sendMessageToGroup } from '~/services/chat';
import {
  GiftedChat,
  InputToolbar,
  Send,
  Composer,
  ComposerProps,
  SendProps,
  IMessage,
} from 'react-native-gifted-chat';
import { Colors } from '~/utils/color';

const ChatScreen = ({ route, navigation }: Props) => {
  const activity = useActivityContext();
  const { user } = useUser();
  const queryClient = useQueryClient();
  const { groupChats, refetch } = useActivityChats(activity?.id, {
    onSuccess: () => {},
  });

  const mutation = useMutation(sendMessageToGroup, {
    onSuccess: () => {
      refetch();
    },
  });

  useFocusEffect(() => {
    socket.emit('groupchat:join', { activityId: activity?.id });

    socket.on('message:groupchat', data => {
      queryClient.setQueryData<Message[]>(
        [groupChatQueryKey, activity?.id],
        prev => [...prev, { message: data.message, user: data.sender }],
      );
    });

    return () => {
      socket.emit('groupchat:leave', { activityId: activity?.id });
      socket.off('message:groupchat');
    };
  });

  const { openSpinner, closeSpinner } = useSpinner();

  const groupChatWithId = groupChats?.map(groupChat => ({
    ...groupChat,
    _id: groupChat.id,
  }));

  useEffect(() => {
    navigation.setOptions({
      headerTitle: activity?.name,
    });
  }, []);

  const giftedChatRef = useRef(null);

  const toggleTabBar = (show: boolean) => {
    navigation.setOptions({
      tabBarStyle: { ...defaultBarStyle, display: show ? 'block' : 'none' },
    });
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        toggleTabBar(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        toggleTabBar(true);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <GiftedChat
      messagesContainerStyle={{ marginHorizontal: 14 }}
      messageContainerRef={giftedChatRef}
      messages={groupChatWithId ?? []}
      keyboardShouldPersistTaps={'handled'}
      onSend={value => {
        queryClient.setQueryData<Message[]>(
          [groupChatQueryKey, activity?.id],
          prev => [
            ...prev,
            {
              message: value[0].text,
              user,
              createdAt: new Date(),
              id: Date.now().toString(),
            },
          ],
        );
        mutation.mutate({ message: value[0].text, activityId: activity?.id });
        socket.emit('message:groupchat', {
          message: value,
          activityId: activity?.id,
          sender: user,
        });

        if (giftedChatRef.current) {
          giftedChatRef.current?.scrollToEnd();
        }
      }}
      renderChatEmpty={renderChatEmpty}
      // showUserAvatar={false}
      user={user}
      renderInputToolbar={renderInputToolbar}
      textInputProps={{
        placeholder: 'Type a message...',
        fontSize: 16,
        lineHeight: 24,
        multiline: true,
        // returnKeyType: 'send',
        // height: 48,
      }}
      minComposerHeight={48}
      // maxComposerHeight={48}
      renderFooter={renderFooter}
      renderAvatar={renderAvatar}
      renderMessage={renderMessage}
      inverted={false}
      alignTop={groupChatWithId?.length === 0}
    />
  );
};

const defaultBarStyle = {
  backgroundColor: Colors.background,
  elevation: 0,
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  borderTopWidth: 1,
  borderColor: Colors.background,
};

const renderChatEmpty = props => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text
      style={{
        transform: [{ scaleY: -1 }],
        color: Colors.textColorCaptionLight,
      }}>
      No message yet
    </Text>
  </View>
);

const renderMessage = props => {
  const currentUser = props.user;
  const { user, message, createdAt } = props.currentMessage;
  // console.log('next', props.nextMessage);

  const prevMessage = props.previousMessage;
  const isMyMessage = currentUser.id === user.id;
  const isPreviousMessageFromSameUser =
    prevMessage && prevMessage.user?.id === user.id;

  if (isMyMessage) {
    return (
      <View
        style={{
          padding: 8,
          alignSelf: 'flex-end',
          borderWidth: 1,
          borderColor: Colors.primary,
          borderRadius: 18,
          marginBottom: 8,
          borderBottomEndRadius: 0,
        }}>
        <Text variant="bodyMedium" style={{ color: Colors.textColorPrimary }}>
          {message}
        </Text>
        <Text
          variant="bodySmall"
          style={{ color: Colors.textColorCaptionLight, textAlign: 'right' }}>
          {format(new Date(createdAt), 'h:mm a')}
        </Text>
      </View>
    );
  }

  return (
    <>
      {!isPreviousMessageFromSameUser && (
        <Text
          variant="labelSmall"
          style={{ color: Colors.textColorPrimary, marginBottom: 3 }}>
          <Text variant="labelSmall" style={{ color: Colors.primary }}>
            @
          </Text>
          {user.username}
        </Text>
      )}
      <View
        style={{
          padding: 8,
          alignSelf: 'flex-start',
          borderWidth: 1,
          borderColor: Colors.textColorCaptionLight,
          borderRadius: 18,
          marginBottom: 8,
          borderBottomLeftRadius: 0,
        }}>
        <Text variant="bodyMedium" style={{ color: Colors.textColorPrimary }}>
          {message}
        </Text>
        <Text
          variant="bodySmall"
          style={{ color: Colors.textColorCaptionLight, textAlign: 'right' }}>
          {format(new Date(createdAt), 'h:mm a')}
        </Text>
      </View>
    </>
  );
};

const renderInputToolbar = props => (
  <InputToolbar
    {...props}
    containerStyle={{ backgroundColor: 'black', borderColor: Colors.line }}
    renderSend={renderSend}
  />
);

const renderFooter = () => <View style={{ height: 16 }} />;

import Icon from 'react-native-vector-icons/FontAwesome5';
import { BackHandler, View } from 'react-native';
import { Text } from 'react-native-paper';
import { formatDuration } from '~/utils/date';
import { useSpinner } from '~/components/ui/Spinner';
import CustomAppbar from '~/components/ui/Appbar';
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { groupChatQueryKey, useActivityChats } from '~/services/activity';
import { format } from 'date-fns';
import { Keyboard } from 'react-native';

const renderSend = props => (
  <Send
    {...props}
    containerStyle={{
      margin: 0,
      padding: 0,
      justifyContent: 'center',
      marginBottom: 4,
      marginRight: 10,
    }}>
    <Icon solid name={'arrow-right'} size={26} color={Colors.primary} />
  </Send>
);

const renderAvatar = () => null;

ChatScreen.navigationOptions = () => {
  return {
    header: (props: BottomTabHeaderProps) => {
      return (
        <CustomAppbar
          onBack={() => props.navigation.getParent()?.navigate('Home')}
          title={props.options.headerTitle}
        />
      );
    },
  };
};

export default ChatScreen; //
