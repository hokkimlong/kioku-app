import React from 'react';
import { TitleContainer } from '~/components/ui/TitleContainer';
import { AddIconButton } from '../../components/ui/AddIconButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackList } from './HomeNavigator';
import { useActivities } from '~/services/activity';
import ActivityThumbnail from '~/components/thumbnail/ActivityThumbnail';
import { FlatList } from 'react-native';
import { Text } from 'react-native-paper';

type Props = NativeStackScreenProps<HomeStackList, 'Home'>;

const HomeScreen = ({ navigation }: Props) => {
  const { activities, refetch, isFetching } = useActivities();

  return (
    <TitleContainer
      scroll={false}
      title="Activity"
      right={
        <AddIconButton onPress={() => navigation.push('NewActivity', {})} />
      }>
      <FlatList
        onRefresh={refetch}
        ListEmptyComponent={() => (
          <Text
            variant="bodyLarge"
            style={{ textAlign: 'center', color: 'gray' }}>
            No activities
          </Text>
        )}
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
    </TitleContainer>
  );
};

export default HomeScreen;
