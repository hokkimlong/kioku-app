import React, { useEffect } from 'react';
import { Button } from '~/components/ui/Button';
import { TitleContainer } from '~/components/ui/TitleContainer';
import { useSpinner } from '~/components/ui/Spinner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editProfile, useUser } from '~/services/authentication';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackList } from './HomeNavigator';
import { FormProvider, useForm } from 'react-hook-form';
import { Input } from '~/components/form/Input';
import { View } from 'react-native';
import { PopupMessage } from '~/components/thumbnail/postThumbnail';
import { emailRequired, stringRequired } from '~/components/form/utils';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type Props = NativeStackScreenProps<HomeStackList, 'Home'>;

const schema = z.object({
  username: stringRequired,
  email: emailRequired,
});

const ChangeUsername = ({ navigation }: Props) => {
  const methods = useForm({
    resolver: zodResolver(schema),
  });
  const { user } = useUser();

  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const [title, setTitle] = React.useState('');
  const [message, setMessage] = React.useState('');
  const { openSpinner, closeSpinner } = useSpinner();

  useEffect(() => {
    methods.reset({
      username: user?.username,
      email: user?.email,
    });
  }, [user]);

  const queryClient = useQueryClient();

  const editUsernameMutation = useMutation(editProfile, {
    onMutate: () => {
      openSpinner();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['user']);
      navigation.goBack();
    },
    onError: (error: any) => {
      setTitle('Update failed');
      setMessage(error?.response?.data?.message);
      openMenu();
    },
    onSettled: () => {
      closeSpinner();
    },
  });

  return (
    <FormProvider {...methods}>
      <TitleContainer title="Update profile">
        <Input
          autoCapitalize="none"
          returnKeyType="next"
          name="username"
          label="Username"
          placeholder="Enter your username"
          onSubmitEditing={() => methods.setFocus('email')}
        />
        <Input
          autoCapitalize="none"
          keyboardType="email-address"
          returnKeyType="send"
          name="email"
          label="Email"
          placeholder="Enter your email"
          onSubmitEditing={() =>
            methods.handleSubmit((data: any) => {
              editUsernameMutation.mutate(data.username, data.email);
            })
          }
        />
        <Button
          onPress={methods.handleSubmit((data: any) => {
            editUsernameMutation.mutate(data);
          })}>
          Submit
        </Button>
        <View style={{ flex: 1 }} />
      </TitleContainer>
      <PopupMessage
        onClose={closeMenu}
        title={title}
        message={message}
        open={visible}
        onConfirm={closeMenu}
      />
    </FormProvider>
  );
};

export default ChangeUsername;
