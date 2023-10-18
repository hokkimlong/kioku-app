import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, TextProps } from 'react-native-paper';
import { Colors } from '~/utils/color';

export const Title = (props: TextProps<string>) => {
  const { children, ...otherProps } = props;
  return (
    <Text variant="headlineLarge" style={titleStyle.root} {...otherProps}>
      {children}
    </Text>
  );
};

const titleStyle = StyleSheet.create({
  root: {
    fontSize: 30,
    fontWeight: '500',
    color: Colors.textColorPrimary,
  },
});
