import React from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { View, ScrollView, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';
import TextBox from '~/components/textBox/text-box';
import TextInputButton from '~/components/textBox/text-input';
import { GroupChat } from '~/services/chat';

type ChatScreenProps = {
  title: string | undefined;
  onSend: (value: string) => void;
  messages: GroupChat[];
};

const ChatCommentContainer = ({ title, onSend, messages }: ChatScreenProps) => {
  // console.log('keyboardListener');

  return (
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
        style={{ flex: 0.9, paddingHorizontal: '5%' }}
        ref={ref => (this.scrollView = ref)}
        onContentSizeChange={() => {
          this.scrollView.scrollToEnd({ animated: true });
        }}>
        <View>
          {messages?.map(item => (
            <TextBox
              key={item.id}
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
      <TextInputButton
        onSend={value => {
          onSend(value);
        }}
      />
      {/* <Input /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

export default ChatCommentContainer;
