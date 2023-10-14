import { useMutation, useQueryClient } from '@tanstack/react-query';
import ChatCommentContainer from '~/components/ui/ChatCommentContainer';
import { GroupChat, sendMessageToGroup } from '~/services/chat';
import { useActivityContext } from './DetailStackNavigator';
import { groupChatQueryKey, useActivityChats } from '~/services/activity';
import { useFocusEffect } from '@react-navigation/native';
import socket from '~/utils/socket';
import { useUser } from '~/services/authentication';

const ChatScreen = () => {
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

    socket.on('message', data => {
      queryClient.setQueryData<GroupChat[]>(
        [groupChatQueryKey, activity?.id],
        prev => [...prev, { message: data.message, user: data.sender }],
      );
    });

    return () => {
      socket.emit('groupchat:leave', { activityId: activity?.id });
      socket.off('message');
    };
  });

  return (
    <ChatCommentContainer
      title="Chat"
      onSend={value => {
        mutation.mutate({ message: value, activityId: activity?.id });
        socket.emit('message', {
          message: value,
          activityId: activity?.id,
          sender: user,
        });
      }}
      currentUser={user}
      messages={groupChats}
      keyboardOffset={-190}
    />
  );
};

export default ChatScreen;
