import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import TextBox from '~/components/textBox/text-box';
import TextInputButton from '~/components/textBox/text-input';
import { TitleContainer } from '~/components/ui/TitleContainer';

const list = [
  {
    id: 1,
    name: 'soth Kimleng',
    message: [
      {
        msg: 'Helloss',
      },
      {
        msg: 'tos gang',
      },
    ],
    isUser: false,
  },
  {
    id: 2,
    name: 'soth Kimleng',
    message: [
      {
        msg: 'Hii!!!',
      },
      {
        msg: 'MOS',
      },
    ],
    isUser: true,
  },
  {
    id: 3,
    name: 'soth Kimleng',
    message: [
      {
        msg: 'vai learg time :)))',
      },
    ],
    isUser: false,
  },
  {
    id: 4,
    name: 'soth Kimleng',
    message: [
      {
        msg: 'if u see us in da club',
      },
    ],
    isUser: false,
  },
  {
    id: 5,
    name: 'soth Kimleng',
    message: [
      {
        msg: 'if u see us in da club',
      },
    ],
    isUser: false,
  },
  {
    id: 6,
    name: 'soth Kimleng',
    message: [
      {
        msg: 'if u see us in da club',
      },
    ],
    isUser: false,
  },
  {
    id: 7,
    name: 'soth Kimleng',
    message: [
      {
        msg: 'if u see us in da club',
      },
    ],
    isUser: false,
  },
  {
    id: 8,
    name: 'soth Kimleng',
    message: [
      {
        msg: 'if u see us in da club',
      },
    ],
    isUser: false,
  },
  {
    id: 9,
    name: 'soth Kimleng',
    message: [
      {
        msg: 'if u see us in da club',
      },
    ],
    isUser: false,
  },
  {
    id: 10,
    name: 'soth Kimleng',
    message: [
      {
        msg: 'if u see us in da club',
      },
    ],
    isUser: false,
  },
];

const ChatScreen = () => {
  const sendMessage = (value: string) => {
    console.log(value);
  };

  return (
    <TitleContainer title="Chat">
      <View style={{ height: 625 }}>
        <ScrollView>
          <View>
            {list?.map(item => (
              <View style={{ marginVertical: 2 }} key={item.id}>
                <TextBox item={item} isUser={item.isUser} isComment={true} />
              </View>
            ))}
          </View>
        </ScrollView>
        <View>
          <TextInputButton
            onSend={value => {
              sendMessage(value);
            }}
          />
        </View>
      </View>
    </TitleContainer>
  );
};

export default ChatScreen;
