import React from 'react';
import { DetailActivityStackList } from './DetailStackNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMutation } from '@tanstack/react-query';
import { createComment } from '~/services/post';
import TitleContainerMsg from '~/components/ui/TitleContainerMsg';

type Props = NativeStackScreenProps<DetailActivityStackList, 'CommentScreen'>;

const CommentScreen = ({ route }: Props) => {
  const mutation = useMutation(createComment);

  return (
    <TitleContainerMsg
      title="Comment Section"
      mutation={mutation}
      route={route}
    />
  );
};

export default CommentScreen;
