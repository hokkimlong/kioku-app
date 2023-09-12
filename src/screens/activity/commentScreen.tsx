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
];

const CommentScreen = () => {
  return (
    <TitleContainer title="Comments">
      <View style={{ height: 650 }}>
        <ScrollView style={{ height: '90%' }}>
          {list?.map(item => (
            <View style={{ marginVertical: 2 }} key={item.id}>
              <TextBox isUser={item.isUser} isComment={true} item={item} />
            </View>
          ))}
        </ScrollView>
        <View style={styles.input}>
          <TextInputButton
            onSend={value => {
              console.log(value);
            }}
          />
        </View>
      </View>
    </TitleContainer>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    width: '100%',
  },
});

export default CommentScreen;
