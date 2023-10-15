import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

type TextInputButtonProps = {
  onSend: (value: string) => void;
};

const TextInputButton = ({ onSend }: TextInputButtonProps) => {
  const [text, setText] = useState('');

  return (
    <View style={styles.wrapper}>
      {/* <Icon
        solid
        name="paperclip"
        size={20}
        color="#5badff"
        style={styles.icon}
      /> */}
      <TextInput
        value={text}
        multiline
        placeholder="Aa.."
        placeholderTextColor="rgba(0,0,0,0.5)"
        onChangeText={newText => setText(newText)}
        style={styles.textInput}
      />
      <Icon
        solid
        name={text ? 'arrow-up' : 'arrow-right'}
        size={20}
        color="#5badff"
        onPress={() => {
          onSend(text);
          setText('');
          Keyboard.dismiss();
        }}
        style={styles.icon}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    height: 37,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 13,
    color: 'black',
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(0,0,0,0.08)',
  },
  icon: {
    marginHorizontal: 5,
  },
});

export default TextInputButton;
