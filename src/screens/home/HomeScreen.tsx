import React from 'react';
import { TitleContainer } from '~/components/ui/TitleContainer';
import { AddIconButton } from '../../components/ui/AddIconButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackList } from './HomeNavigator';
import { useActivities } from '~/services/activity';
import ActivityThumbnail from '~/components/thumbnail/ActivityThumbnail';

type Props = NativeStackScreenProps<HomeStackList, 'Home'>;
const HomeScreen = ({ navigation }: Props) => {
  const { activities } = useActivities();
  // console.log(JSON.stringify(activities, null, 2));

  return (
    <TitleContainer
      title="Activity"
      right={<AddIconButton onPress={() => navigation.push('NewActivity')} />}>
      {activities?.map(item => {
        return (
          <ActivityThumbnail
            key={item.id}
            item={item}
            url={() => navigation.push('ActivityDetail')}
          />
        );
      })}
    </TitleContainer>
  );
};

export default HomeScreen;
