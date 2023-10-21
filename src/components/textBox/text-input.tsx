import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors } from '~/utils/color';

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
        placeholder="Add a comment..."
        placeholderTextColor={Colors.textColorCaptionLight}
        onChangeText={newText => setText(newText)}
        style={styles.textInput}
      />
      {text && (
        <TouchableWithoutFeedback
          onPress={() => {
            if (!text) {
              return;
            }
            onSend(text);
            setText('');
            // Keyboard.dismiss();
          }}>
          <Icon
            solid
            name={'arrow-right'}
            size={26}
            color={Colors.primary}
            style={styles.icon}
          />
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingLeft: 20,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.textColorPrimary,
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(0,0,0,0.08)',
  },
  icon: {
    marginHorizontal: 5,
  },
});

export default TextInputButton;
