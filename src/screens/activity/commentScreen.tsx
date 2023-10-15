import React from 'react';
import { DetailActivityStackList } from './DetailStackNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createComment, postQueryKey, usePostComments } from '~/services/post';
import ChatCommentContainer from '~/components/ui/ChatCommentContainer';
import { useFocusEffect } from '@react-navigation/native';
import { useUser } from '~/services/authentication';
import socket from '~/utils/socket';
import { Message } from '~/services/chat';

type Props = NativeStackScreenProps<DetailActivityStackList, 'CommentScreen'>;

const CommentScreen = ({ route }: Props) => {
  const postId = route.params?.postId;
  const { user } = useUser();
  const queryClient = useQueryClient();
  const { comments, refetch } = usePostComments(postId, {
    onSuccess: () => {},
  });

  const mutation = useMutation(createComment, {
    onSuccess: () => {
      refetch();
    },
  });

  useFocusEffect(() => {
    socket.emit('postcomment:join', { postId });

    socket.on('message:postcomment', data => {
      queryClient.setQueryData<Message[]>(
        [postQueryKey, postId, 'comments'],
        prev => [...prev, { message: data.message, user: data.sender }],
      );
    });

    return () => {
      socket.emit('postcomment:leave', { postId });
      socket.off('message:postcomment');
    };
  });

  return (
    <ChatCommentContainer
      title="Comment"
      onSend={value => {
        mutation.mutate({ message: value, postId });
        socket.emit('message:postcomment', {
          message: value,
          postId,
          sender: user,
        });
      }}
      currentUser={user}
      messages={comments}
    />
  );
};

export default CommentScreen; //
