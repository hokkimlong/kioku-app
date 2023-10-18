import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { Input, InputProps } from './Input';
import { Colors } from '~/utils/color';

export const PasswordInput = ({ label, ...props }: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Input
      label={label}
      secureTextEntry={!showPassword}
      right={
        <TextInput.Icon
          color={Colors.textColorLight}
          onPress={() => setShowPassword(prev => !prev)}
          icon={showPassword ? 'eye-off' : 'eye'}
        />
      }
      {...props}
    />
  );
};
