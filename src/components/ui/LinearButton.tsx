import React, { PropsWithChildren } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Text } from 'react-native-paper';

export const LinearButton = ({ children }: PropsWithChildren) => {
  const linearColors = ['#FC466B', '#3F5EFB'];
  const start = { x: 0, y: 0 };
  const end = { x: 1, y: 0 };
  return (
    <View style={buttonStyle.root}>
      <TouchableOpacity>
        <LinearGradient
          start={start}
          end={end}
          style={buttonStyle.linear}
          colors={linearColors}>
          <Text style={buttonStyle.text}>{children}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};
const buttonStyle = StyleSheet.create({
  root: {
    marginVertical: 12,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  linear: {
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
  },
});
