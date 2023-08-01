import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, TextInputProps } from 'react-native-paper';

export interface InputProps extends TextInputProps {
  label: string;
}
export const Input = ({ label, ...props }: InputProps) => {
  return (
    <View style={inputStyle.root}>
      <Text variant="labelLarge" style={inputStyle.label}>
        {label}
      </Text>
      <TextInput
        mode="outlined"
        outlineStyle={inputStyle.outlined}
        outlineColor="#ECECEC"
        placeholderTextColor="#7E7E7E"
        {...props}
      />
    </View>
  );
};

const inputStyle = StyleSheet.create({
  root: {
    marginVertical: 10,
  },
  outlined: {
    borderRadius: 16,
    backgroundColor: '#FAFAFA',
    height: 55,
    display: 'flex',
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 3,
  },
});
