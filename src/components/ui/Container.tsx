import React, { PropsWithChildren } from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export const Container = ({
  children,
  onPress,
}: PropsWithChildren<TouchableWithoutFeedbackProps>) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <KeyboardAwareScrollView enableOnAndroid>
        <ScrollView style={containerStyle.root}>{children}</ScrollView>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
};

const containerStyle = StyleSheet.create({
  root: {
    marginHorizontal: 28,
    flex: 1,
  },
});
