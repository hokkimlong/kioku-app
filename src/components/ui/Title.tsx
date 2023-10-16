import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, TextProps } from 'react-native-paper';

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
    fontSize: 40,
    fontWeight: 'bold',
    color: 'black',
  },
});
