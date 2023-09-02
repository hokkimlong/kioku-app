import React, { PropsWithChildren } from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';

type PostProps = PropsWithChildren<{
  publisher: string;
  imageUrl: string;
  caption: string;
  reactionAmount: number;
  commentAmount: number;
}>;

const PostThumbnail = ({
  publisher,
  imageUrl,
  caption,
  reactionAmount,
  commentAmount,
}: PostProps) => {
  return (
    <View style={styles.wrapper}>
      <View>
        <Text style={styles.publisher}>@{publisher}</Text>
      </View>
      <View style={styles.ImageContainer}>
        <ImageBackground
          source={{ uri: imageUrl }}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
      </View>
      <View>
        <Text>{caption}</Text>
      </View>
      <View style={styles.actionContainer}>
        <View style={styles.actionContainer}>
          <Icon name="heart" size={18} color="#FF470D" solid />
          <Text style={styles.actionText}>{reactionAmount}</Text>
        </View>
        <View style={styles.actionContainer}>
          <Icon name="comment" size={18} color="#E0D1FF" solid />
          <Text style={styles.actionText}>{commentAmount}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: '5%',
    borderRadius: 10,
  },
  ImageContainer: {
    height: 175,
    borderColor: 'rgba(0,0,0,0.5)',
    borderWidth: 0.3,
    borderRadius: 10,
    overflow: 'hidden',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  publisher: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 3,
  },
  actionContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginRight: 10,
  },
  actionText: {
    marginLeft: 2,
  },
});

export default PostThumbnail;
