import React from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { View, ScrollView, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Portal, Text, TextInput } from 'react-native-paper';
import TextBox from '~/components/textBox/text-box';
import TextInputButton from '~/components/textBox/text-input';
import { Message } from '~/services/chat';
import { User } from '~/services/member';
import { KeyboardAvoidingScrollView } from '@tareq0065/rn-keyboard-avoiding-scroll-view';
import { Button } from './Button';

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
    <>
      {/* // <KeyboardAvoidingView style={{ flex: 1 }}> */}
      {/* <View style={{ flex: 1 }}> */}
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
      {/* <ScrollView
        ref={ref => (this.scrollView = ref)}
        onContentSizeChange={() => {
          this.scrollView.scrollToEnd({ animated: true });
        }}>

        {messages?.map((item, index) => (
          <TextBox
            key={index}
            user={item.user}
            isUser={item.user.username === currentUser?.username}
            message={item.message}
            createdAt={item?.createdAt || new Date()}
            isComment={true}
            isOnGoing={
              index > 0 &&
              item.user.username === messages[index - 1].user.username
            }
            isNotification={false}
          />
        ))}
      </ScrollView> */}

      {/* <Portal> */}
      {/* <View style={{ position: 'absolute', bottom: 0, left: 0, width: 100 }}> */}
      {/* <ScrollView> */}

      <KeyboardAvoidingScrollView
        // style={{ flex: 1 }}
        // automaticallyAdjustKeyboardInsets={true}>
        stickyFooter={
          <Button
            onPress={() => {
              console.log('onPress');
            }}>
            Send
          </Button>
        }>
        <TextInput />
        {/* {messages?.map((item, index) => (
          <TextBox
            key={index}
            user={item.user}
            isUser={item.user.username === currentUser?.username}
            message={item.message}
            createdAt={item?.createdAt || new Date()}
            isComment={true}
            isOnGoing={
              index > 0 &&
              item.user.username === messages[index - 1].user.username
            }
            isNotification={false}
          />
        ))} */}
        {/* <View /> */}
        {/* <View style={{ height: 10 }} /> */}
      </KeyboardAvoidingScrollView>

      {/* </View> */}
      {/* </Portal> */}
      {/* input section */}
      {/* <Input /> */}

      {/* // </KeyboardAvoidingView> */}
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'relative',
  },
});

export default ChatCommentContainer;
