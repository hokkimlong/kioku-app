import React from 'react';
import TextBox from '~/components/textBox/text-box';
import { TitleContainer } from '~/components/ui/TitleContainer';
import { FlatList, View } from 'react-native';
import { useNotifications } from '~/services/notification';

const NotificationScreen = () => {
  const { notifications } = useNotifications();
  return (
    <TitleContainer
      title="Notification"
      description="Let's start a new adventure">
      <FlatList
        data={notifications}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 2 }} key={item.id}>
            <TextBox
              createdAt={item?.createdAt}
              notificationTitle={item.activity.name}
              message={item.message}
              isNotification={true}
            />
          </View>
        )}
      />
      {/* {list?.map(item => (
        <View style={{ marginVertical: 2 }} key={item.id}>
          <TextBox isNotification={true} />
        </View>
      ))} */}
    </TitleContainer>
  );
};

export default NotificationScreen;
