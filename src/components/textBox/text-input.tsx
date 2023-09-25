import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

type TextInputButtonProps = {
  onSend: (value: string) => void;
};

const TextInputButton = ({ onSend }: TextInputButtonProps) => {
  const [text, setText] = useState('');

  return (
    <View style={styles.wrapper}>
      <View style={styles.iconContainer}>
        <Icon
          solid
          name="paperclip"
          size={25}
          color="#5badff"
          onPress={() => {
            onSend(text);
            setText('');
          }}
          style={styles.icon}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          value={text}
          multiline
          placeholder="Say Hello..."
          placeholderTextColor="rgba(0,0,0,0.5)"
          onChangeText={newText => setText(newText)}
          style={styles.textInput}
        />
      </View>
      <View style={styles.iconContainer}>
        <View>
          <Icon
            solid
            name={text ? 'arrow-up' : 'arrow-right'}
            size={25}
            color="#5badff"
            onPress={() => {
              onSend(text);
              setText('');
              Keyboard.dismiss();
            }}
            style={styles.icon}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  inputContainer: {
    width: '80%',
    height: 30,
  },
  textInput: {
    color: 'black',
    paddingVertical: 2,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(0,0,0,0.08)',
    borderRadius: 20,
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  icon: {
    // padding: 50,
  },
});

export default TextInputButton;
