import React, { PropsWithChildren } from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
} from 'react-native';

export const Container = ({
  children,
  onPress,
}: PropsWithChildren<TouchableWithoutFeedbackProps>) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={containerStyle.root}>{children}</View>
    </TouchableWithoutFeedback>
  );
};

const containerStyle = StyleSheet.create({
  root: {
    marginHorizontal: 28,
    flex: 1,
  },
});
