import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

type MsgBoxProps = {
  isUser: boolean;
  message: string;
};

const MsgBox = ({ isUser, message }: MsgBoxProps) => {
  return (
    <View
      style={[
        styles.msgContainer,
        isUser ? styles.userText : styles.notUserText,
      ]}>
      <Text
        style={{
          color: isUser ? 'white' : 'black',
          fontWeight: 'bold',
          fontSize: 15,
        }}>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  msgContainer: {
    width: '100%',
    borderWidth: 0.3,
    borderRadius: 15,
    borderColor: 'rgba(0,0,0,0.1)',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  userText: {
    borderTopRightRadius: 0,
    backgroundColor: 'rgba(91,173,255,0.8)',
  },
  notUserText: {
    borderTopLeftRadius: 0,
  },
});

export default MsgBox;
