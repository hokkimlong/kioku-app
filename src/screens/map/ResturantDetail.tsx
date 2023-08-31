import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

const RestaurantDetail = () => {
  return (
    <View style={style.wrapper}>
      <View style={style.thumbnail}>
        <View style={style.titleContainer}>
          <Text>Carl Jr Phnom Penh</Text>
        </View>
      </View>
      <View style={style.contentContainer}>
        <Text>Content</Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  wrapper: {
    minHeight: '100%',
  },
  thumbnail: {
    width: '100%',
    height: '25%',
    marginBottom: 28,
    borderColor: 'black',
    borderWidth: 0.5,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  titleContainer: {
    height: '25%',
    padding: 5,
    paddingLeft: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  contentContainer: {
    borderColor: 'black',
    borderWidth: 0.5,
    borderRadius: 15,
    height: '65%',
    marginHorizontal: 25,
  },
});

export default RestaurantDetail;
