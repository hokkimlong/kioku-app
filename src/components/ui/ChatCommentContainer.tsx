import React from 'react';
import { Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import TextBox from '~/components/textBox/text-box';
import TextInputButton from '~/components/textBox/text-input';
import { chatLog } from '~/utils/temp/chatLog';

type ChatScreenProps = {
  title: string | undefined;
  mutation: any;
  route: any;
  keyboardOffset: number;
};

const ChatCommentContainer = ({
  title,
  mutation,
  route,
  keyboardOffset = -140,
}: ChatScreenProps) => {
  const sendMessage = (value: string) => {
    console.log('send Message:', value);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
      keyboardVerticalOffset={keyboardOffset}
      style={{ flex: 1 }}>
      <View style={styles.wrapper}>
        {/* title */}
        {title !== undefined && (
          <View
            style={{
              flex: 0.05,
              display: 'flex',
              justifyContent: 'center',
            }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{title}</Text>
          </View>
        )}
        {/* chat section */}
        <ScrollView
          style={{ height: 600, paddingHorizontal: '5%' }}
          ref={ref => (this.scrollView = ref)}
          onContentSizeChange={() => {
            this.scrollView.scrollToEnd({ animated: true });
          }}>
          <View>
            {chatLog?.map(item => (
              <TextBox
                key={item.id}
                item={item}
                isUser={item.isUser}
                isComment={true}
                isNotification={false}
              />
            ))}
          </View>
        </ScrollView>
        {/* input section */}
        <View style={{ height: 45 }}>
          <TextInputButton
            onSend={value => {
              mutation.mutate({
                postId: route.params.postId,
                message: value,
              });
              sendMessage(value);
            }}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

export default ChatCommentContainer;
