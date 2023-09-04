import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LiveMap from './LiveMap';
import RestaurantList from './RestaurantList';
import RestaurantDetail from './ResturantDetail';

export type MapStackList = {
  LiveMap: undefined;
  Restaurant: undefined;
  RestaurantDetail: undefined;
  Hotel: undefined;
  TouristLocationList: undefined;
};

const Stack = createNativeStackNavigator<MapStackList>();

const MapNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LiveMap" component={LiveMap} />
      <Stack.Screen name="Restaurant" component={RestaurantList} />
      <Stack.Screen name="RestaurantDetail" component={RestaurantDetail} />
    </Stack.Navigator>
  );
};

export default MapNavigator;
