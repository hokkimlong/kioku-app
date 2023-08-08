import React, { PropsWithChildren } from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Text } from 'react-native-paper';

export const Container = ({
  children,
  onPress,
}: PropsWithChildren<TouchableWithoutFeedbackProps>) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <KeyboardAwareScrollView
        enableOnAndroid
        contentContainerStyle={containerStyle.root}>
        {children}
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
};

const containerStyle = StyleSheet.create({
  root: {
    marginHorizontal: 28,
    flexGrow: 1,
  },
});
