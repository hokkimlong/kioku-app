import React from 'react';
import { useMutation } from '@tanstack/react-query';
import ChatCommentContainer from '~/components/ui/ChatCommentContainer';
import { sendMessageToGroup } from '~/services/chat';
import { useActivityContext } from './DetailStackNavigator';
import { useActivityChats } from '~/services/activity';

const ChatScreen = () => {
  const activity = useActivityContext();
  const { groupChats, refetch } = useActivityChats(activity?.id);
  const mutation = useMutation(sendMessageToGroup, {
    onSuccess: () => refetch(),
  });

  // console.log('groupChats', groupChats);

  return (
    <ChatCommentContainer
      title="Chat"
      onSend={value =>
        mutation.mutate({ message: value, activityId: activity?.id })
      }
      messages={groupChats}
    />
  );
};

export default ChatScreen;
