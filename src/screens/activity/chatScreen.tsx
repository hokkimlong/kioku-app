import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import MsgBox from '~/components/textBox/msg-box';
import TextBox from '~/components/textBox/text-box';
import { TitleContainer } from '~/components/ui/TitleContainer';

const list = [
  {
    id: 1,
    name: 'soth Kimleng',
    message: [
      {
        msg: 'Hello',
      },
      {
        msg: 'Bro lg ey ta nerb ta nerb jg',
      },
    ],
    isUser: false,
  },
  {
    id: 2,
    name: 'soth Kimleng',
    isUser: true,
    message: [{ msg: 'DUma' }],
  },
  {
    id: 3,
    name: 'soth Kimleng',
    isUser: false,
    message: [{ msg: 'DUma' }],
  },
];

const ChatScreen = () => {
  return (
    <TitleContainer title="Chat">
      {list?.map(item => (
        <View style={{ marginVertical: 2 }} key={item.id}>
          <TextBox item={item} isUser={item.isUser} isComment={true} />
        </View>
      ))}
    </TitleContainer>
  );
};

export default ChatScreen;
