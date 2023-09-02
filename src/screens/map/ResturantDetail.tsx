import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { Text } from 'react-native-paper';

const image = {
  uri: 'https://jade-decisive-mouse-858.mypinata.cloud/ipfs/Qma4Gqhvo5cMyoryAMCzztdNFx2R3Ub9ePqpdKk8tn3Coa',
};

const imageContent = {
  uri: 'https://jade-decisive-mouse-858.mypinata.cloud/ipfs/Qmay9TpbGxn12gnyJDANKsziJLzvhxapQn8GkGLnQmVkiV',
};

const RestaurantDetail = () => {
  return (
    <View style={style.wrapper}>
      <View style={style.thumbnail}>
        <ImageBackground
          source={image}
          style={[style.backgroundImage, style.thumbnailImage]}
          resizeMode="cover">
          <View style={style.titleContainer}>
            <Text style={style.title}>Carl Jr Phnom Penh</Text>
            <Text style={style.title}>
              <Text style={style.star}>&#9733; 4.6</Text> (1456)
            </Text>
          </View>
        </ImageBackground>
      </View>
      <View style={style.contentContainer}>
        <ImageBackground
          source={imageContent}
          style={style.backgroundImage}
          resizeMode="stretch"
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  wrapper: {
    minHeight: '100%',
    flex: 1,
  },
  thumbnail: {
    width: '100%',
    height: '25%',
    overflow: 'hidden',
    marginBottom: '5%',
  },
  thumbnailImage: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  titleContainer: {
    padding: 5,
    paddingLeft: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(0,0,0,0.2)',
    color: 'white',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
  },
  star: {
    color: 'yellow',
  },
  contentContainer: {
    borderColor: 'rgba(0,0,0,0.5)',
    borderWidth: 0.3,
    borderRadius: 10,
    height: '70%',
    marginHorizontal: 20,
    overflow: 'hidden',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
});

export default RestaurantDetail;
