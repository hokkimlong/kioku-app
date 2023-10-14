import React from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { View, ScrollView, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
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
