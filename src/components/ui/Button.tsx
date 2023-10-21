import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Text } from 'react-native-paper';
import { Colors } from '~/utils/color';

interface ButtonProps extends TouchableOpacityProps {
  outlined?: boolean;
  size?: 'small' | 'normal';
}

export const Button = ({
  children,
  outlined,
  size = 'normal',
  ...props
}: ButtonProps) => {
  const linearColors = ['#FC466B', '#3F5EFB'];
  const start = { x: 0, y: 0 };
  const end = { x: 1, y: 0 };
  const isSizeSmall = size === 'small';
  return (
    <View style={[!isSizeSmall && buttonStyle.root]}>
      <TouchableOpacity {...props}>
        <LinearGradient
          start={start}
          end={end}
          style={[
            buttonStyle.border,
            outlined ? buttonStyle.outlinedBorder : buttonStyle.outlinedFull,
          ]}
          colors={linearColors}>
          <View
            style={[
              outlined && buttonStyle.outlined,
              !outlined && isSizeSmall ? buttonStyle.outlinedFull : null,
              isSizeSmall && !outlined && { paddingVertical: 4.5 },
              isSizeSmall && outlined && { paddingVertical: 3.13 },
            ]}>
            <Text
              style={[
                buttonStyle.text,
                outlined && buttonStyle.outlinedText,
                !isSizeSmall && buttonStyle.outlinedNormal,
                isSizeSmall && buttonStyle.outlinedSmall,
              ]}>
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
    color: '#CE4B8D',
  },
  outlined: {
    borderRadius: 15,
    backgroundColor: Colors.background,
    // paddingVertical: 4.5,
    justifyContent: 'center',
    display: 'flex',
  },
  outlinedFull: {
    // paddingVertical: 3.13,
    paddingHorizontal: 1,
  },

  outlinedNormal: {
    padding: 16,
  },
  outlinedSmall: {
    paddingHorizontal: 16,
    paddingVertical: 0,
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
