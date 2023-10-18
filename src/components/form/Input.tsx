import React, { PropsWithChildren, forwardRef } from 'react';
import { useController } from 'react-hook-form';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, TextInputProps } from 'react-native-paper';
import { Colors } from '~/utils/color';

export interface InputProps extends TextInputProps {
  label: string;
  name: string;
}
export const Input = forwardRef(
  ({ label, name, keyboardType, ...props }: InputProps, ref) => {
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
  },
);

export const BaseInput = forwardRef((props: TextInputProps, ref) => {
  return (
    <TextInput
      mode="outlined"
      outlineStyle={inputStyle.outlined}
      outlineColor={Colors.line}
      placeholderTextColor={Colors.textColorCaption}
      {...props}
      ref={ref as any}
      textColor="white"
    />
  );
});

const inputStyle = StyleSheet.create({
  root: {
    marginVertical: 10,
  },
  outlined: {
    borderRadius: 16,
    backgroundColor: Colors.backgroundLight,
    minHeight: 55,
    display: 'flex',
    justifyContent: 'center',
  },
  label: {
    marginBottom: 2,
    color: Colors.textColorLight,
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
