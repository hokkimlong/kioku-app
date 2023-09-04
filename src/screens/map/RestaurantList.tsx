import React from 'react';
import { FlatList } from 'react-native';
import { TitleContainer } from '~/components/ui/TitleContainer';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MapStackList } from './Navigator';
import LocationThumbnail from '~/components/thumbnail/LocationThumbnail';

type Props = NativeStackScreenProps<MapStackList, 'LiveMap'>;
// const image = { uri: 'https://legacy.reactjs.org/logo-og.png' };

const List = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const RestaurantList = ({ navigation }: Props) => {
  return (
    <TitleContainer title="Restaurant">
      <FlatList
        data={List}
        renderItem={() => (
          <LocationThumbnail
            onPress={() => navigation.push('RestaurantDetail')}
          />
        )}
      />
    </TitleContainer>
  );
};

export default RestaurantList;
