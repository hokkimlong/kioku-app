import React, { PropsWithChildren } from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import KeyboardDismissView from 'react-native-keyboard-dismiss-view';

export const Container = ({
  children,
  onPress,
  scroll = true,
}: PropsWithChildren<TouchableWithoutFeedbackProps & { scroll?: boolean }>) => {
  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps={'always'}
      enableOnAndroid
      contentContainerStyle={containerStyle.root}>
      <KeyboardDismissView style={{ flex: 1 }}>{children}</KeyboardDismissView>
    </KeyboardAwareScrollView>
  );
  // ) : (
  //   <View style={containerStyle.root}>
  //     <KeyboardDismissView>{children}</KeyboardDismissView>
  //   </View>
  // );
};

const containerStyle = StyleSheet.create({
  root: {
    marginHorizontal: 28,
    flexGrow: 1,
  },
});
