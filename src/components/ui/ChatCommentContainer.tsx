import React from 'react';
import { Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import TextBox from '~/components/textBox/text-box';
import TextInputButton from '~/components/textBox/text-input';
import { GroupChat } from '~/services/chat';
import { chatLog } from '~/utils/temp/chatLog';

type ChatScreenProps = {
  title: string | undefined;
  onSend: (value: string) => void;
  messages: GroupChat[];
  keyboardOffset: number;
};

const ChatCommentContainer = ({
  title,
  onSend,
  messages,
  keyboardOffset = -140,
}: ChatScreenProps) => {
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
              height: 50,
              display: 'flex',
              justifyContent: 'center',
              paddingHorizontal: '5%',
            }}>
            <Text style={{ fontWeight: 'bold', fontSize: 30 }}>{title}</Text>
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
            {messages?.map(item => (
              <TextBox
                key={item.id}
                // item={item}
                // isUser={item.isUser}
                user={item.user}
                message={item.message}
                isUser={false}
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
              onSend(value);
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
