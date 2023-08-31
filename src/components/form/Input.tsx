import React, { PropsWithChildren } from 'react';
import { useController } from 'react-hook-form';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, TextInputProps } from 'react-native-paper';

export interface InputProps extends TextInputProps {
  label: string;
  name: string;
}
export const Input = ({ label, name, keyboardType, ...props }: InputProps) => {
  const {
    field: { onChange, ...field },
    fieldState: { error },
  } = useController({ name });
  return (
    <Label label={label}>
      <BaseInput
        keyboardType={keyboardType}
        error={!!error}
        onChangeText={onChange}
        {...field}
        {...props}
      />
    </Label>
  );
};

export const BaseInput = (props: TextInputProps) => {
  return (
    <TextInput
      mode="outlined"
      outlineStyle={inputStyle.outlined}
      outlineColor="#ECECEC"
      placeholderTextColor="#7E7E7E"
      {...props}
    />
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

export const Label = ({
  label,
  children,
}: PropsWithChildren<{ label: string }>) => {
  return (
    <View style={inputStyle.root}>
      <Text variant="labelLarge" style={inputStyle.label}>
        {label}
      </Text>
      {children}
    </View>
  );
};
