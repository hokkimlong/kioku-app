import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert } from 'react-native';
import { Button } from '~/components/ui/Button';
import { TitleContainer } from '~/components/ui/TitleContainer';

type EditUserDetailProps = {
  title: string;
  onMutation(username: string): void;
};

const EditUserDetail = ({ title, onMutation }: EditUserDetailProps) => {
  const [text, setText] = useState('');

  return (
    <TitleContainer title={`Change ${title}`}>
      <View style={styles.root}>
        <TextInput
          value={text}
          multiline
          placeholder={`New ${title}`}
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
                    onPress: () => text.length !== 0 && onMutation(text),
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
    backgroundColor: 'white',
  },
  buttonContainer: {
    width: '50%',
    alignSelf: 'center',
  },
});

export default EditUserDetail;
