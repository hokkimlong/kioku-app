import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, TextProps } from 'react-native-paper';

export const Description = (props: TextProps<any>) => {
  const { children, ...otherProps } = props;
  return (
    <Text variant="bodyLarge" style={descriptionStyle.root} {...otherProps}>
      {children}
    </Text>
  );
};

const descriptionStyle = StyleSheet.create({
  root: {
    fontSize: 16,
    color: '#827979',
  },
});
