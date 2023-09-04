import React from 'react';
import { TitleContainer } from '~/components/ui/TitleContainer';
import { StyleSheet, View, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MapStackList } from './Navigator';

type Props = NativeStackScreenProps<MapStackList, 'LiveMap'>;

const LiveMap = ({ navigation }: Props) => {
  return (
    <TitleContainer title="MAP">
      <View style={style.mapContainer} />
      <View style={style.categoryContainer}>
        <Button
          title="Restaurant"
          onPress={() => navigation.push('Restaurant')}
        />
        <Button
          title="Restaurant"
          onPress={() => navigation.push('Restaurant')}
        />
        <Button
          title="Restaurant"
          onPress={() => navigation.push('Restaurant')}
        />
      </View>
    </TitleContainer>
  );
};

const style = StyleSheet.create({
  mapContainer: {
    height: '80%',
    width: '100%',
    borderColor: 'black',
    borderWidth: 0.5,
    borderRadius: 15,
  },
  categoryContainer: {
    width: '100%',
    height: '15%',
    borderColor: 'black',
    borderWidth: 0.5,
    borderRadius: 15,
    marginTop: '5%',
  },
});

export default LiveMap;
