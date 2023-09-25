import React from 'react';
import { TitleContainer } from '~/components/ui/TitleContainer';
import CustomAppbar from '~/components/ui/Appbar';
import { ActivityHomeTabList } from './ActivityTab';
import {
  BottomTabHeaderProps,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import { useActivityContext } from './DetailStackNavigator';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { useActivityInformations } from '~/services/activity';

import Icon from 'react-native-vector-icons/FontAwesome5';

type Props = BottomTabScreenProps<ActivityHomeTabList, 'Information'>;

const InformationScreen = ({ navigation }: Props) => {
  const activity = useActivityContext();
  const { informationBoards } = useActivityInformations(activity?.id);

  return (
    <TitleContainer
      title={'Information'}
      description="Let's your friend know more">
      {informationBoards?.map(informationBoard => {
        return (
          <View style={{ marginBottom: 18 }} key={informationBoard.id}>
            <InformationCard
              onPress={() =>
                navigation
                  .getParent()
                  ?.navigate('InformationDetail', { id: informationBoard.id })
              }
              title={informationBoard.title}
              createdAt={informationBoard.createdAt}
              imageCount={informationBoard._count.images}
            />
          </View>
        );
      })}
    </TitleContainer>
  );
};

const InformationCard = ({
  title,
  createdAt,
  imageCount,
  onPress,
}: {
  title: string;
  createdAt: Date;
  imageCount: number;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          borderRadius: 16,
          overflow: 'hidden',
        }}>
        <View
          style={{
            backgroundColor: getColorFromDate(new Date(createdAt)),
          }}>
          <View
            style={{
              height: 120,
              backgroundColor: 'rgba(0,0,0, 0.5)',
              justifyContent: 'center',
              padding: 30,
            }}>
            <Text
              variant="headlineSmall"
              style={{ color: 'white', fontWeight: 'bold' }}>
              {title}
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="image" size={18} color="white" solid />
                <Text
                  variant="bodyLarge"
                  style={{ color: 'white', fontWeight: 'bold', marginLeft: 5 }}>
                  {imageCount}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

InformationScreen.navigationOptions = () => {
  return {
    header: (props: BottomTabHeaderProps) => {
      return (
        <CustomAppbar
          onBack={props.navigation.goBack}
          onAdd={() => props.navigation.navigate('NewInformation')}
        />
      );
    },
  };
};

function getColorFromDate(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  // Calculate RGB values based on date components
  const red = (year * 13 + month) % 256;
  const green = (day * 7 + hour) % 256;
  const blue = (minute * 11 + second) % 256;

  // Convert the values to hexadecimal and format the color string
  const color = `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;

  return color;
}

export default InformationScreen;
