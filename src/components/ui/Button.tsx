import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Text } from 'react-native-paper';

interface ButtonProps extends TouchableOpacityProps {
  outlined?: boolean;
}

export const Button = ({ children, outlined, ...props }: ButtonProps) => {
  const linearColors = ['#FC466B', '#3F5EFB'];
  const start = { x: 0, y: 0 };
  const end = { x: 1, y: 0 };
  return (
    <View style={buttonStyle.root}>
      <TouchableOpacity {...props}>
        <LinearGradient
          start={start}
          end={end}
          style={[
            buttonStyle.border,
            outlined ? buttonStyle.outlinedBorder : buttonStyle.outlined,
          ]}
          colors={linearColors}>
          <View style={[outlined && buttonStyle.outlined]}>
            <Text
              style={[buttonStyle.text, outlined && buttonStyle.outlinedText]}>
              {children}
            </Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};
const buttonStyle = StyleSheet.create({
  root: {
    marginVertical: 12,
  },
  outlinedText: {
    color: '#992967',
  },
  outlined: {
    borderRadius: 15,
    padding: 16,
    backgroundColor: 'white',
    justifyContent: 'center',
    display: 'flex',
  },
  text: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  outlinedBorder: {
    padding: 1.8,
  },
  border: {
    borderRadius: 16,
  },
  normal: {
    padding: 16,
  },
});
