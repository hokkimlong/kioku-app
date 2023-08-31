import React from 'react';
import { TitleContainer } from '~/components/ui/TitleContainer';
import { AddIconButton } from '../../components/ui/AddIconButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackList } from './Navigator';
import { Button } from '~/components/ui/Button';
import { useActivities } from '~/services/activity';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Text } from 'react-native-paper';
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  format,
} from 'date-fns';

type Props = NativeStackScreenProps<HomeStackList, 'Home'>;
const HomeScreen = ({ navigation }: Props) => {
  const { activities } = useActivities();
  console.log(JSON.stringify(activities, null, 2));

  const linearColors = ['#FC466B', '#3F5EFB'];
  const start = { x: 0, y: 0 };
  const end = { x: 1, y: 0 };

  return (
    <TitleContainer
      title="Activity"
      right={<AddIconButton onPress={() => navigation.push('NewActivity')} />}>
      {activities?.map(item => {
        //  <Button outlined onPress={() => navigation.push('ActivityDetail')}>
        //   {item.name}
        // </Button>
        // <View>

        // </View>

        const startDate = new Date(item.startDate);
        const endDate = new Date();
        const differentDays = differenceInDays(startDate, endDate);
        const differenceHours = differenceInHours(startDate, endDate);
        const differenceMinutes = differenceInMinutes(startDate, endDate);

        const remaining =
          differentDays > 1
            ? `${differentDays} days remaining`
            : differenceHours > 1
            ? `${differenceHours} hours remaining`
            : `${differenceMinutes} minutes remaining`;
        return (
          <View
            style={{
              borderColor: 'black',
              borderWidth: 1,
              borderRadius: 20,
              paddingHorizontal: 20,
              paddingVertical: 20,
              marginBottom: 20,
            }}>
            <Text variant="headlineSmall">{item.name}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text variant="bodyLarge">
                {format(new Date(item.startDate), 'dd MMM yyyy')}
              </Text>
              <Text variant="bodyMedium" style={{ marginLeft: 10 }}>
                {differenceMinutes > 0 && remaining}
              </Text>
            </View>
          </View>
        );
      })}
    </TitleContainer>
  );
};

export default HomeScreen;
