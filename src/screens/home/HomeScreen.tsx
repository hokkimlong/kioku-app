import React, { useRef } from 'react';
import { TitleContainer } from '~/components/ui/TitleContainer';
import { AddIconButton } from '../../components/ui/AddIconButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackList } from './HomeNavigator';
import { useActivities } from '~/services/activity';
import ActivityThumbnail from '~/components/thumbnail/ActivityThumbnail';
import { FlatList, View } from 'react-native';
import { Text } from 'react-native-paper';
import { ScrollView } from 'react-native';
import { Button } from '~/components/ui/Button';
import { Colors } from '~/utils/color';
import { useFocusEffect } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';
import { notificationQueryKey } from '~/services/notification';

type Props = NativeStackScreenProps<HomeStackList, 'Home'>;

const HomeScreen = ({ navigation }: Props) => {
  const [filter, setFilter] = React.useState({ status: 'ongoing' } as any);
  const flatListRef = useRef<FlatList>(null);
  const queryClient = useQueryClient();
  const { activities, refetch, isFetching } = useActivities(filter, {
    onSuccess: () => {
      queryClient.invalidateQueries([notificationQueryKey]);
    },
  });

  const handleScrollTop = () => {
    flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
  };

  return (
    <View style={{ flex: 1 }}>
      <View>
        <TitleContainer
          scroll={false}
          title="Activities"
          right={
            <AddIconButton onPress={() => navigation.push('NewActivity', {})} />
          }
        />
      </View>
      <View style={{ marginHorizontal: 10 }}>
        <FilterButton
          onChange={value => {
            setFilter({ status: value });
            handleScrollTop();
          }}
        />
      </View>
      <FlatList
        ref={flatListRef}
        style={{ paddingHorizontal: 10 }}
        showsVerticalScrollIndicator={false}
        onRefresh={refetch}
        ListEmptyComponent={() => (
          <Text
            variant="bodyLarge"
            style={{
              textAlign: 'center',
              color: Colors.textColorCaptionLight,
            }}>
            No {filter.status} activities
          </Text>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
        refreshing={isFetching}
        data={activities}
        renderItem={({ item }) => (
          <ActivityThumbnail
            key={item.id}
            item={item}
            onPress={() =>
              navigation.push('ActivityDetail', { activity: item })
            }
            onEdit={id => navigation.push('NewActivity', { id })}
          />
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const buttons = [
  {
    label: 'Ongoing',
    value: 'ongoing',
  },
  {
    label: 'Upcoming',
    value: 'upcoming',
  },
  {
    label: 'Past',
    value: 'past',
  },
];

const FilterButton = ({ onChange }: any) => {
  const [active, setActive] = React.useState(0);

  return (
    <ScrollView horizontal style={{ height: 50 }}>
      {buttons.map((button, index) => (
        <>
          <Button
            onPress={() => {
              setActive(index);
              onChange(button.value);
            }}
            size="small"
            outlined={active !== index}>
            {button.label}
          </Button>
          <View style={{ width: 10 }} />
        </>
      ))}
    </ScrollView>
  );
};

export default HomeScreen;
