import React, { PropsWithChildren } from 'react';
import { View, StyleSheet } from 'react-native';

export const Container = ({ children }: PropsWithChildren) => {
  return <View style={containerStyle.root}>{children}</View>;
};

const containerStyle = StyleSheet.create({
  root: {
    marginHorizontal: 28,
    flex: 1,
  },
});
