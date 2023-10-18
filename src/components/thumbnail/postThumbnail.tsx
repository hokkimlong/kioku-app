import React, { PropsWithChildren, useState } from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Text, Menu } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Image } from '~/services/post';
import { getS3Image } from '~/utils/s3';
import { Post } from '~/services/post';
import { useUser } from '~/services/authentication';

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
        <Text style={styles.publisher}>@{publisher}</Text>
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
            <Icon
              name="heart"
              size={18}
              color={isLike ? '#ff0000' : '#808080'}
              solid
            />
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
  settingIcon: {},
  publisherContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default PostThumbnail;
