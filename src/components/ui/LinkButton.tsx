import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, ButtonProps } from 'react-native-paper';
import { Colors } from '~/utils/color';

const LinkButton = (props: ButtonProps) => {
  const { children, onPress } = props;
  return (
    <Button
      contentStyle={buttonStyle.content}
      style={buttonStyle.root}
      textColor={Colors.textColorPrimary}
      onPress={onPress}>
      {children}
    </Button>
  );
};

const buttonStyle = StyleSheet.create({
  content: {
    padding: 10,
  },
  root: {
    borderRadius: 11,
  },
});

export default LinkButton;
