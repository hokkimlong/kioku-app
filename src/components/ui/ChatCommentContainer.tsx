import React from 'react';
import { Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import TextBox from '~/components/textBox/text-box';
import TextInputButton from '~/components/textBox/text-input';
import { GroupChat } from '~/services/chat';
import { User } from '~/services/member';

type ChatScreenProps = {
  title: string | undefined;
  onSend: (value: string) => void;
  messages: GroupChat[] | undefined;
  keyboardOffset: number;
  currentUser: User | undefined;
};

const ChatCommentContainer = ({
  title,
  onSend,
  messages,
  currentUser,
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
                isUser={item.user.username === currentUser.username}
                user={item.user}
                message={item.message}
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
