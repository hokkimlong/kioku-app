import React, { PropsWithChildren } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  ImageBackground,
} from 'react-native';
import { Text } from 'react-native-paper';

const image = {
  uri: 'https://jade-decisive-mouse-858.mypinata.cloud/ipfs/Qma4Gqhvo5cMyoryAMCzztdNFx2R3Ub9ePqpdKk8tn3Coa',
};

const LocationThumbnail = ({
  onPress,
}: PropsWithChildren<TouchableOpacityProps>) => {
  return (
    <View style={style.thumbnailContainer}>
      <TouchableOpacity onPress={onPress}>
        <View style={style.thumbnail}>
          <ImageBackground source={image} style={style.backgroundaImage} />
        </View>
        <View style={style.titleContainer}>
          <Text style={style.title}>Carl Jr Phnom Penh</Text>
          <Text style={style.title}>&#9733; 4.6 (1456)</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  thumbnailContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '30%',
  },
  thumbnail: {
    height: '75%',
    borderColor: 'black',
    borderWidth: 0.5,
    borderRadius: 15,
    overflow: 'hidden',
  },
  titleContainer: {
    height: '25%',
    padding: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: 'black',
  },
  backgroundaImage: {
    width: '100%',
    height: '100%',
  },
});

export default LocationThumbnail;
