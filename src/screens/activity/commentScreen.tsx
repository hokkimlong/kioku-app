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
import { Message } from '~/services/chat';
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

type Props = NativeStackScreenProps<DetailActivityStackList, 'CommentScreen'>;

const CommentScreen = ({ route, navigation }: Props) => {
  const postId = route.params?.postId;
  const { user } = useUser();
  const queryClient = useQueryClient();

  const { openSpinner, closeSpinner } = useSpinner();
  const { comments, refetch } = usePostComments(postId, {
    onSuccess: () => {
      closeSpinner();
    },
  });

  const commentsWithId = comments?.map(comment => ({
    ...comment,
    _id: comment.id,
  }));
  const activity = useActivityContext();

  const mutation = useMutation(createComment, {
    onSuccess: () => {
      refetch();
      queryClient.invalidateQueries(['activity-post', activity?.id]);
    },
  });

  useEffect(() => {
    openSpinner();
    navigation.setOptions({
      headerTitle: 'Comments',
    });
  }, []);

  useFocusEffect(() => {
    socket.emit('postcomment:join', { postId });

    socket.on('message:postcomment', data => {
      queryClient.setQueryData<Message[]>(
        [postQueryKey, postId, 'comments'],
        prev => [
          ...prev,
          {
            message: data.message,
            user: data.sender,
            id: Date.now().toString(),
            createdAt: new Date(),
          },
        ],
      );
    });

    return () => {
      socket.emit('postcomment:leave', { postId });
      socket.off('message:postcomment');
    };
  });

  const giftedChatRef = useRef(null);

  return (
    <GiftedChat
      messageContainerRef={giftedChatRef}
      messages={commentsWithId ?? []}
      keyboardShouldPersistTaps={'handled'}
      onSend={value => {
        queryClient.setQueryData<Message[]>(
          [postQueryKey, postId, 'comments'],
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
        mutation.mutate({ message: value[0].text, postId });
        socket.emit('message:postcomment', {
          message: value,
          postId,
          sender: user,
        });

        if (giftedChatRef.current) {
          giftedChatRef.current?.scrollToEnd();
        }
      }}
      renderChatEmpty={renderChatEmpty}
      // showUserAvatar={false}
      user={{
        _id: 1,
      }}
      renderInputToolbar={renderInputToolbar}
      textInputProps={{
        placeholder: 'Add a comment...',
        fontSize: 16,
        lineHeight: 24,
        multiline: false,
        returnKeyType: 'send',
        // height: 48,
      }}
      minComposerHeight={48}
      // maxComposerHeight={48}
      renderFooter={renderFooter}
      renderAvatar={renderAvatar}
      renderMessage={renderMessage}
      inverted={false}
      renderComposer={ChatComposer}
      alignTop
    />
  );
};

const renderChatEmpty = props => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text
      style={{
        transform: [{ scaleY: -1 }],
        color: Colors.textColorCaptionLight,
      }}>
      No comment yet
    </Text>
  </View>
);

const ChatComposer = (
  props: ComposerProps & {
    onSend: SendProps<IMessage>['onSend'];
    text: SendProps<IMessage>['text'];
  },
) => {
  return (
    <Composer
      {...props}
      textInputProps={{
        ...props.textInputProps,
        blurOnSubmit: false,
        multiline: false,
        onSubmitEditing: () => {
          if (props.text && props.onSend) {
            props.onSend({ text: props.text.trim() }, true);
          }
        },
      }}
    />
  );
};

const renderMessage = props => {
  const { user, message, createdAt } = props.currentMessage;

  return (
    <View style={{ padding: 8 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginRight: 10,
        }}>
        <Text
          variant="bodyMedium"
          style={{ color: Colors.textColorPrimary, marginRight: 10 }}>
          <Text variant="bodyLarge" style={{ color: Colors.primary }}>
            @
          </Text>
          {user.username}
        </Text>
        <Text
          variant="bodySmall"
          style={{ color: Colors.textColorCaptionLight, marginRight: 10 }}>
          {formatDuration(new Date(createdAt))}
        </Text>
      </View>
      <Text variant="bodyMedium" style={{ color: Colors.textColorPrimary }}>
        {message}
      </Text>
    </View>
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
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { formatDuration } from '~/utils/date';
import { useSpinner } from '~/components/ui/Spinner';
import CustomAppbar from '~/components/ui/Appbar';
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { act } from 'react-test-renderer';

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

CommentScreen.navigationOptions = () => {
  return {
    header: (props: BottomTabHeaderProps) => {
      return (
        <CustomAppbar
          onBack={() => props.navigation.getParent()?.navigate('Home')}
          title={'Comments'}
        />
      );
    },
  };
};

export default CommentScreen; //
