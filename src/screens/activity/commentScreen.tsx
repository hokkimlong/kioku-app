import React from 'react';
import { DetailActivityStackList } from './DetailStackNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMutation } from '@tanstack/react-query';
import { createComment } from '~/services/post';
import ChatCommentContainer from '~/components/ui/ChatCommentContainer';

type Props = NativeStackScreenProps<DetailActivityStackList, 'CommentScreen'>;

const CommentScreen = ({ route }: Props) => {
  const mutation = useMutation(createComment);

  return (
    <ChatCommentContainer
      title="Comment"
      mutation={mutation}
      route={route}
      keyboardOffset={-190}
    />
  );
};

export default CommentScreen;
