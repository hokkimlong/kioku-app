import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert } from 'react-native';
import { Button } from '~/components/ui/Button';
import { TitleContainer } from '~/components/ui/TitleContainer';
import { useSpinner } from '~/components/ui/Spinner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editUsername } from '~/services/authentication';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackList } from './HomeNavigator';

type Props = NativeStackScreenProps<HomeStackList, 'Home'>;

const ChangeUsername = ({ navigation }: Props) => {
  const [text, setText] = useState('');
  const { openSpinner, closeSpinner } = useSpinner();
  const queryClient = useQueryClient();

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

  const handleEditUsername = () => {
    // console.log('text', text);
    editUsernameMutation.mutate({ username: text });
  };
  return (
    <TitleContainer title="Change Username">
      <View style={styles.root}>
        <TextInput
          value={text}
          multiline
          placeholder="New Username"
          placeholderTextColor="rgba(0,0,0,0.5)"
          onChangeText={newText => setText(newText)}
          style={styles.textInput}
        />
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => {
              Alert.alert(
                'Confirmation',
                'Are you sure you want to change your username?',
                [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                  {
                    text: 'OK',
                    onPress: () =>
                      text.length !== 0 &&
                      editUsernameMutation.mutate({ username: text }),
                  },
                ],
              );
            }}>
            Submit
          </Button>
        </View>
      </View>
    </TitleContainer>
  );
};

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems1: 'center',
  },
  textInput: {
    flex: 1,
    fontSize: 13,
    color: 'black',
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(0,0,0,0.08)',
  },
  buttonContainer: {
    width: '50%',
    alignSelf: 'center',
  },
});

export default ChangeUsername;
