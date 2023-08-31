import React, { PropsWithChildren } from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export const Container = ({
  children,
  onPress,
  scroll = true,
}: PropsWithChildren<TouchableWithoutFeedbackProps & { scroll?: boolean }>) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      {scroll ? (
        <KeyboardAwareScrollView
          enableOnAndroid
          contentContainerStyle={containerStyle.root}>
          {children}
        </KeyboardAwareScrollView>
      ) : (
        <View style={containerStyle.root}>{children}</View>
      )}
    </TouchableWithoutFeedback>
  );
};

const containerStyle = StyleSheet.create({
  root: {
    marginHorizontal: 28,
    flexGrow: 1,
  },
});
