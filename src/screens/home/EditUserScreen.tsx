import React from 'react';
import EditUserDetail from '~/components/ui/EditUserDetail';
import { HomeStackList } from './HomeNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSpinner } from '~/components/ui/Spinner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editEmail, editUsername } from '~/services/authentication';

type Props = NativeStackScreenProps<HomeStackList, 'EditUserScreen'>;

const EditUserScreen = ({ navigation, route }: Props) => {
  const { openSpinner, closeSpinner } = useSpinner();
  const queryClient = useQueryClient();
  const title = route.params?.title;

  const editUsernameMutation = useMutation(editUsername, {
    onMutate: () => {
      openSpinner();
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
      navigation.goBack();
    },
    onSettled: () => {
      closeSpinner();
    },
  });

  const editEmailMutation = useMutation(editEmail, {
    onMutate: () => {
      openSpinner();
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
      navigation.goBack();
    },
    onSettled: () => {
      closeSpinner();
    },
  });

  const handleEditUsername = (username: string) => {
    editUsernameMutation.mutate({ username: username });
  };

  const handleEditEmail = (username: string) => {
    editEmailMutation.mutate({ email: username });
  };

  return (
    <EditUserDetail
      title={title}
      onMutation={
        title === 'Username'
          ? handleEditUsername
          : title === 'Email'
          ? handleEditEmail
          : () => {}
      }
    />
  );
};

export default EditUserScreen;
