import React, { PropsWithChildren, useState } from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import { Text, Menu } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Image, likePost } from '~/services/post';
import { getS3Image } from '~/utils/s3';
import { Post } from '~/services/post';
import { useUser } from '~/services/authentication';
import { Colors } from '~/utils/color';
import { Image as NativeImage } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type PostProps = PropsWithChildren<{
  publisher: string;
  imageUrl: Image[];
  caption: string;
  reactionAmount: number;
  commentAmount: number;
  isLike: boolean;
  onLike: () => void;
  onPress: () => void;
  post: Post;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}>;

const win = Dimensions.get('window');

const PostThumbnail = ({
  publisher,
  imageUrl,
  caption,
  reactionAmount,
  commentAmount,
  onLike,
  onPress,
  isLike = false,
  post,
  onDelete,
  onEdit,
}: PostProps) => {
  const { user } = useUser();
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleDeleteActivity = (id: number) => {
    onDelete(id);
    closeMenu();
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.publisherContainer}>
        <Text variant="bodyMedium" style={styles.publisher}>
          <Text variant="bodyLarge" style={{ color: Colors.primary }}>
            @
          </Text>
          {publisher}
        </Text>
        {user?.id === post?.userId && (
          <TouchableOpacity style={styles.settingIcon} onPress={openMenu}>
            <Menu
              visible={visible}
              onDismiss={closeMenu}
              anchor={<Icon solid size={20} name="ellipsis-h" color="#000" />}>
              <Menu.Item
                leadingIcon="pen"
                title="Edit"
                onPress={() => {
                  onEdit(post.id);
                  closeMenu();
                }}
              />
              <Menu.Item
                leadingIcon="delete"
                title="Delete"
                onPress={() => {
                  Alert.alert(
                    'Delete',
                    'Are you sure you want to "permanently" delete activity ?',
                    [
                      {
                        text: 'Cancel',
                        style: 'cancel',
                      },
                      {
                        text: 'OK',
                        onPress: () => handleDeleteActivity(post.id),
                      },
                    ],
                  );
                }}
              />
            </Menu>
          </TouchableOpacity>
        )}
      </View>
      <View style={{ marginBottom: 8 }}>
        <Text variant="bodyMedium">{caption}</Text>
      </View>
      <ScrollView horizontal={true} style={{ flex: 1 }}>
        {imageUrl?.map((item, index) => {
          return (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                width: imageUrl.length > 1 ? win.width * 0.8 : win.width * 0.95,
                marginRight: 5,
              }}>
              <TouchableWithoutFeedback>
                <NativeImage
                  source={{ uri: getS3Image(item.uri) }}
                  resizeMode="contain"
                  style={{
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: Colors.line,
                    resizeMode: 'cover',
                    flex: 1,
                    aspectRatio: 0.8,
                  }}
                />
              </TouchableWithoutFeedback>
            </View>
          );
        })}
      </ScrollView>
      <View style={{ flexDirection: 'row', marginTop: 4 }}>
        <Text
          style={{ marginRight: 5, color: Colors.textColorCaption }}
          variant="bodyMedium">
          {`${reactionAmount} like${reactionAmount > 1 ? 's' : ''}`}
        </Text>
        <Text
          variant="bodyMedium"
          style={{
            color: Colors.textColorCaption,
          }}>
          {`${commentAmount} comment${commentAmount > 1 ? 's' : ''}`}
        </Text>
      </View>
      <View style={styles.actionContainer}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={onLike}>
            <View style={styles.actionContainer}>
              <Ionicons
                name={isLike ? 'heart' : 'heart-outline'}
                size={26}
                color={isLike ? '#ff0000' : Colors.textColorPrimary}
              />
              {/* <Text style={{ marginLeft: 2 }} variant="bodyLarge">
              {reactionAmount ?? 0}
            </Text> */}
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPress}>
            <View style={styles.actionContainer}>
              <Ionicons
                name={'chatbubble-outline'}
                size={24}
                color={Colors.textColorPrimary}
              />
              {/* <Text style={{ marginLeft: 2 }} variant="bodyLarge">
              {commentAmount ?? 0}
            </Text> */}
            </View>
          </TouchableOpacity>
        </View>
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
    height: 400,
    marginRight: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.line,
    overflow: 'hidden',
  },
  SingularImageContainer: {
    width: 350,
    height: 400,
    marginRight: 5,
    borderWidth: 1,
    borderColor: Colors.line,
    borderRadius: 10,
    overflow: 'hidden',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  publisher: {
    marginBottom: 2,
  },
  actionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    marginRight: 10,
  },
  actionText: {
    marginLeft: 2,
    fontWeight: 'bold',
  },
  settingIcon: {},
  publisherContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default PostThumbnail;
