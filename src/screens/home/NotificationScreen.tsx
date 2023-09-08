import React from 'react';
import TextBox from '~/components/textBox/text-box';
import { TitleContainer } from '~/components/ui/TitleContainer';
import { View } from 'react-native';

const list = [
  {
    id: 1,
    name: 'soth Kimleng',
    isUser: false,
  },
  {
    id: 2,
    name: 'soth Kimleng',
    isUser: false,
  },
  {
    id: 3,
    name: 'soth Kimleng',
    isUser: false,
  },
];

const NotificationScreen = () => {
  return (
    <TitleContainer
      title="Notification"
      description="Let's start a new adventure">
      {list?.map(item => (
        <View style={{ marginVertical: 2 }} key={item.id}>
          <TextBox isNotification={true} />
        </View>
      ))}
    </TitleContainer>
  );
};

export default NotificationScreen;
