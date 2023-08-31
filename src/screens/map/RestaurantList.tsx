import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { TitleContainer } from '~/components/ui/TitleContainer';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MapStackList } from './Navigator';
import LocationThumbnail from '~/components/thumbnail/LocationThumbnail';

type Props = NativeStackScreenProps<MapStackList, 'LiveMap'>;
// const image = { uri: 'https://legacy.reactjs.org/logo-og.png' };

const RestaurantList = ({ navigation }: Props) => {
  return (
    <TitleContainer title="Restaurant">
      <LocationThumbnail onPress={() => navigation.push('RestaurantDetail')} />
    </TitleContainer>
  );
};

export default RestaurantList;
