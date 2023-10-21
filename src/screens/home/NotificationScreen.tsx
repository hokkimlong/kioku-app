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
import { Text } from 'react-native-paper';
import { Colors } from '~/utils/color';
import { format } from 'date-fns';

const NotificationScreen = () => {
  const { notifications, isFetching, refetch } = useNotifications();
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
    <View style={{ flex: 1 }}>
      <View>
        <TitleContainer
          title={'Notifications'}
          description="Get updated with your friends"
        />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 20, marginTop: 10 }}
        refreshing={isFetching}
        ListEmptyComponent={() => (
          <Text
            variant="bodyLarge"
            style={{ textAlign: 'center', color: 'gray' }}>
            No notification yet
          </Text>
        )}
        onRefresh={refetch}
        data={notifications?.data ?? []}
        ItemSeparatorComponent={() => <View style={{ height: 18 }} />}
        renderItem={({ item }) => <NotificationCard item={item} />}
      />
    </View>
  );
};

const NotificationCard = ({ item }: any) => {
  return (
    <View style={{ flex: 1 }}>
      <Text variant="bodyLarge" style={{ color: Colors.primary }}>
        {item.activity.name}
      </Text>
      <Text style={{ color: Colors.textColorPrimary }}>
        <Text variant="bodyLarge" style={{ color: Colors.primary }}>
          @
        </Text>
        {item.message.replace('@', '')}
      </Text>
      <Text
        variant="bodySmall"
        style={{ color: Colors.textColorCaptionLight, textAlign: 'right' }}>
        {format(new Date(item.createdAt), 'dd MMM yy - h:mm a')}
      </Text>
    </View>
  );
};

export default NotificationScreen;
