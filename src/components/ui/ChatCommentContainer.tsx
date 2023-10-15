import React from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { View, ScrollView, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';
import TextBox from '~/components/textBox/text-box';
import TextInputButton from '~/components/textBox/text-input';
import { Message } from '~/services/chat';
import { User } from '~/services/member';

type ChatScreenProps = {
  title: string | undefined;
  onSend: (value: string) => void;
  messages: Message[] | undefined;
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
    <View style={styles.wrapper}>
      {/* {title !== undefined && (
        <ScrollView
          style={{
            height: 50,
            display: 'flex',
            // justifyContent: 'center',
            paddingHorizontal: '5%',
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
          <View style={{ height: 45 }}>
            <TextInputButton
              onSend={value => {
                onSend(value);
              }}
            />
          </View>
        </ScrollView>
      )} */}
      {/* chat section */}
      <ScrollView
        style={{ flex: 0.9, paddingHorizontal: '5%' }}
        ref={ref => (this.scrollView = ref)}
        onContentSizeChange={() => {
          this.scrollView.scrollToEnd({ animated: true });
        }}>
        <View>
          {messages?.map((item, index) => (
            <TextBox
              key={item.id}
              user={item.user}
              isUser={item.user.username === currentUser?.username}
              message={item.message}
              createdAt={item.createdAt}
              isComment={true}
              isOnGoing={
                index > 0 &&
                item.user.username === messages[index - 1].user.username
              }
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
