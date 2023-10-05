import React, { useEffect } from 'react';
import { TitleContainer } from '~/components/ui/TitleContainer';
import { AddIconButton } from '../../components/ui/AddIconButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackList } from './HomeNavigator';
import { useActivities } from '~/services/activity';
import ActivityThumbnail from '~/components/thumbnail/ActivityThumbnail';
import { useSpinner } from '~/components/ui/Spinner';
import { View } from 'react-native';

type Props = NativeStackScreenProps<HomeStackList, 'Home'>;
const HomeScreen = ({ navigation }: Props) => {
  const { activities } = useActivities();
  const { openSpinner, closeSpinner } = useSpinner();

  return (
    <TitleContainer
      title="Activity"
      right={
        <AddIconButton onPress={() => navigation.push('NewActivity', {})} />
      }>
      {activities?.map(activity => {
        return (
          <ActivityThumbnail
            key={activity.id}
            item={activity}
            onPress={() => navigation.push('ActivityDetail', { activity })}
            onEdit={id => navigation.push('NewActivity', { id })}
          />
        );
      })}
    </TitleContainer>
  );
};

export default HomeScreen;
