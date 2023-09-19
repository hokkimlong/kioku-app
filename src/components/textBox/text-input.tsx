import React, { useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

type TextInputButtonProps = {
  onSend: (value: string) => void;
};

const TextInputButton = ({ onSend }: TextInputButtonProps) => {
  const [text, setText] = useState('');

  return (
    <View style={styles.wrapper}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Message"
          placeholderTextColor="black"
          onChangeText={newText => setText(newText)}
          style={styles.textInput}
        />
      </View>
      <View style={styles.icon}>
        <Icon
          name="paper-plane"
          size={30}
          solid
          color="#ff196f"
          onPress={() => {
            onSend(text);
            setText('');
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  inputContainer: {
    width: '90%',
  },
  textInput: {
    color: 'black',
  },
  icon: {
    width: '10%',
  },
});

export default TextInputButton;
