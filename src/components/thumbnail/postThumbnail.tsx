import React, {
  PropsWithChildren,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import { Text, Menu, Modal, Portal, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Image, likePost } from '~/services/post';
import { getS3Image } from '~/utils/s3';
import { Post } from '~/services/post';
import { useUser } from '~/services/authentication';
import { Colors } from '~/utils/color';
import { Image as NativeImage } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { formatDuration } from '~/utils/date';
import { Button } from '../ui/Button';

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

  const closeMenu = () => setVisible(false);

  const [deletePostConfirm, setDeletePostConfirm] = useState(false);

  const [modal, setModal] = useState(false);
  const [popup, setPopup] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View style={styles.wrapper}>
      <View style={styles.publisherContainer}>
        <Text variant="bodyMedium" style={styles.publisher}>
          <Text variant="bodyLarge" style={{ color: Colors.primary }}>
            @
          </Text>
          {publisher}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: 10,
          }}>
          <Text
            variant="bodyMedium"
            style={{ color: Colors.textColorCaptionLight, marginRight: 10 }}>
            {formatDuration(post?.createdAt)}
          </Text>
          {user?.id === post?.userId && (
            <TouchableOpacity
              style={styles.settingIcon}
              onPress={() => setPopup(true)}>
              <Icon
                size={26}
                name="dots-horizontal"
                color={Colors.textColorPrimary}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {caption && (
        <View style={{ marginBottom: 8 }}>
          <Text variant="bodyMedium">{caption}</Text>
        </View>
      )}
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        decelerationRate={0.85}
        snapToInterval={win.width * 0.8 + 5}>
        {imageUrl?.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                width: imageUrl.length > 1 ? win.width * 0.8 : win.width * 0.95,
                marginRight: 5,
              }}>
              <TouchableWithoutFeedback
                onPress={() => {
                  setActiveIndex(index);
                  setTimeout(() => {
                    setModal(true);
                  }, 1);
                }}>
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
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPress}>
            <View style={styles.actionContainer}>
              <Ionicons
                name={'chatbubble-outline'}
                size={24}
                color={Colors.textColorPrimary}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <ImageSlider
        images={imageUrl}
        open={modal}
        activeIndex={activeIndex}
        onClose={() => setModal(false)}
      />
      <PopupActions open={popup} onClose={() => setPopup(false)}>
        <Button
          onPress={() => {
            setPopup(false);
            onEdit(post.id);
          }}>
          Edit
        </Button>
        <Button
          outlined
          onPress={() => {
            setPopup(false);
            setDeletePostConfirm(true);
          }}>
          Delete
        </Button>
      </PopupActions>
      <PopupMessage
        onCancel={() => setDeletePostConfirm(false)}
        onConfirm={() => {
          setDeletePostConfirm(false);
          onDelete(post.id);
        }}
        open={deletePostConfirm}
        onClose={() => setDeletePostConfirm(false)}
        title={'Delete Post'}
        message={'Are you sure you want to delete this post?'}
      />
    </View>
  );
};

export const PopupMessage = ({
  open,
  onClose,
  title,
  message,
  onConfirm,
  onCancel,
}: any) => {
  return (
    <Portal>
      <Modal
        style={{ position: 'relative' }}
        visible={open}
        onDismiss={onClose}>
        <View
          style={{
            position: 'absolute',
            width: win.width,
            bottom: 0,
            left: 0,
            padding: 20,
            backgroundColor: Colors.background,
          }}>
          <Text
            variant="titleLarge"
            style={{ marginBottom: 10, color: Colors.textColorPrimary }}>
            {title}
          </Text>
          <Text variant="bodyLarge">{message}</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginTop: 20,
            }}>
            {onCancel && (
              <Button onPress={onCancel} outlined style={{ marginRight: 10 }}>
                Cancel
              </Button>
            )}
            <Button onPress={onConfirm}>Confirm</Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

export const PopupActions = ({ open, onClose, children }: any) => {
  return (
    <Portal>
      <Modal
        style={{ position: 'relative' }}
        visible={open}
        onDismiss={onClose}>
        <View
          style={{
            position: 'absolute',
            width: win.width,
            bottom: 0,
            left: 0,
            padding: 20,
            backgroundColor: Colors.background,
          }}>
          {children}
        </View>
      </Modal>
    </Portal>
  );
};

export const ImageSlider = ({
  images,
  open,
  activeIndex,
  onClose,
}: {
  activeIndex: number;
  images: any[];
  open: boolean;
  onClose: () => void;
}) => {
  const scrollRef = useRef(null);

  return (
    <Portal>
      <Modal
        visible={open}
        contentContainerStyle={{
          flex: 1,
          backgroundColor: Colors.background,
        }}
        onDismiss={onClose}>
        <IconButton
          onPress={onClose}
          icon={'close'}
          iconColor={Colors.textColorPrimary}
          style={{
            backgroundColor: Colors.backgroundLight,
            position: 'absolute',
            top: 0,
            left: 0,
            margin: 10,
            zIndex: 999,
          }}
        />
        <ScrollView
          key={activeIndex}
          ref={ref => {
            scrollRef.current = ref;
            ref?.scrollTo({
              x: activeIndex * win.width,
              y: 0,
              animated: false,
            });
          }}
          onLayout={() => {
            scrollRef.current?.scrollTo({
              x: activeIndex * win.width,
              y: 0,
              animated: false,
            });
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          decelerationRate={0.85}
          scrollEnabled
          snapToInterval={win.width}
          style={{ flex: 1 }}>
          {images?.map((item, index) => {
            return (
              <TouchableWithoutFeedback key={index}>
                <NativeImage
                  source={{
                    uri:
                      item.uri.includes('file://') || item.uri.includes('http')
                        ? item.uri
                        : getS3Image(item.uri),
                  }}
                  resizeMode="contain"
                  style={{
                    resizeMode: 'contain',
                    flex: 1,
                    alignItems: 'center',
                    width: win.width,
                    height: win.height,
                  }}
                />
              </TouchableWithoutFeedback>
            );
          })}
        </ScrollView>
      </Modal>
    </Portal>
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
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default PostThumbnail;
