import React, { PropsWithChildren } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  ImageBackground,
} from 'react-native';
import { Text } from 'react-native-paper';
import { Colors } from '~/utils/color';

const image = {
  uri: 'https://jade-decisive-mouse-858.mypinata.cloud/ipfs/Qma4Gqhvo5cMyoryAMCzztdNFx2R3Ub9ePqpdKk8tn3Coa',
};

const LocationThumbnail = ({
  onPress,
}: PropsWithChildren<TouchableOpacityProps>) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ marginBottom: 10 }}>
      <View style={style.thumbnail}>
        <ImageBackground
          source={image}
          resizeMode="cover"
          style={style.backgroundImage}
        />
      </View>
      <View style={style.titleContainer}>
        <Text style={style.title}>Carl Jr Phnom Penh</Text>
        <Text style={style.title}>&#9733; 4.6 (1456)</Text>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  thumbnail: {
    borderWidth: 0.5,
    borderRadius: 15,
    overflow: 'hidden',
    borderColor: 'rgba(0,0,0,0.1)',
  },
  titleContainer: {
    padding: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: Colors.textColorPrimary,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: 120,
  },
});

export default LocationThumbnail;
