import React, { PropsWithChildren } from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Image } from '~/services/post';
import { getS3Image } from '~/utils/s3';

type PostProps = PropsWithChildren<{
  publisher: string;
  imageUrl: Image[];
  caption: string;
  reactionAmount: number;
  commentAmount: number;
  onLike: () => void;
  onPress: () => void;
}>;

const PostThumbnail = ({
  publisher,
  imageUrl,
  caption,
  reactionAmount,
  commentAmount,
  onLike,
  onPress,
}: PostProps) => {
  return (
    <View style={styles.wrapper}>
      <View>
        <Text style={styles.publisher}>@{publisher}</Text>
      </View>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView horizontal={true}>
          {imageUrl?.map((item, index) => {
            return (
              <View
                key={index}
                style={
                  imageUrl.length !== 1
                    ? styles.ImageContainer
                    : styles.SingularImageContainer
                }>
                <ImageBackground
                  source={{ uri: getS3Image(item.uri) }}
                  resizeMode="cover"
                  style={styles.backgroundImage}
                />
              </View>
            );
          })}
        </ScrollView>
      </SafeAreaView>
      <View>
        <Text>{caption}</Text>
      </View>
      <View style={styles.actionContainer}>
        <TouchableOpacity onPress={onLike}>
          <View style={styles.actionContainer}>
            <Icon name="heart" size={18} color="#FF470D" solid />
            <Text style={styles.actionText}>{reactionAmount ?? 0}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPress}>
          <View style={styles.actionContainer}>
            <Icon name="comment" size={18} color="#E0D1FF" solid />
            <Text style={styles.actionText}>{commentAmount ?? 0}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 10,
    marginBottom: '5%',
  },
  ImageContainer: {
    width: 330,
    height: 175,
    marginRight: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  SingularImageContainer: {
    width: 350,
    height: 175,
    marginRight: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  publisher: {
    fontSize: 15,
    marginBottom: 3,
    fontWeight: 'bold',
  },
  actionContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginRight: 10,
  },
  actionText: {
    marginLeft: 2,
    fontWeight: 'bold',
  },
});

export default PostThumbnail;
