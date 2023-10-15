import React from 'react';
import TextBox from '~/components/textBox/text-box';
import { TitleContainer } from '~/components/ui/TitleContainer';
import { FlatList, View } from 'react-native';
import {
  markAsSeen,
  notificationQueryKey,
  useNotifications,
} from '~/services/notification';
import { useFocusEffect } from '@react-navigation/native';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const NotificationScreen = () => {
  const { notifications } = useNotifications();
  const queryClient = useQueryClient();

  const mutation = useMutation(markAsSeen, {
    onSuccess: () => {
      queryClient.invalidateQueries([notificationQueryKey]);
      queryClient.setQueryData([notificationQueryKey], prev => ({
        ...prev,
        unSeenCount: 0,
      }));
    },
  });

  useFocusEffect(() => {
    if (notifications?.unSeenCount > 0) {
      mutation.mutate();
    }
  });

  return (
    <TitleContainer
      title="Notification"
      description="Let's start a new adventure">
      <FlatList
        data={notifications?.data}
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
