import React, { useEffect } from 'react';
import { TitleContainer } from '~/components/ui/TitleContainer';
import { postQueryKey, useActivityPosts } from '~/services/activity';
import { useActivityContext } from './DetailStackNavigator';

import PostThumbnail from '~/components/thumbnail/postThumbnail';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePost, likePost } from '~/services/post';
import {
  BottomTabHeaderProps,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import CustomAppbar from '~/components/ui/Appbar';
import { FlatList, View } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import { ActivityHomeTabList } from './Navigator';
import { useSpinner } from '~/components/ui/Spinner';

type Props = BottomTabScreenProps<ActivityHomeTabList, 'Home'>;

const PostScreen = ({ navigation }: Props) => {
  const activity = useActivityContext();
  const { posts, refetch, isFetching } = useActivityPosts(activity?.id);
  const queryClient = useQueryClient();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: activity?.name,
    });
  }, []);

  const likeMutation = useMutation(likePost);
  const { openSpinner, closeSpinner } = useSpinner();

  const deleteMutation = useMutation(deletePost, {
    onMutate: () => {
      openSpinner();
    },
    onSuccess: () => {
      refetch();
    },
    onSettled: () => {
      closeSpinner();
    },
  });

  return (
    <View style={{ marginLeft: 10 }}>
      <FlatList
        refreshing={isFetching}
        data={posts}
        onRefresh={refetch}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <View style={{ marginVertical: 5 }}>{/* <Divider /> */}</View>
        )}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={() => {
          return (
            <Text variant="bodyLarge" style={{ textAlign: 'center' }}>
              No posts
            </Text>
          );
        }}
        renderItem={({ item, index }) => (
          <PostThumbnail
            isLike={item?.isLike || false}
            imageUrl={item.postImages}
            caption={item.description}
            publisher={item.user?.username}
            post={item}
            reactionAmount={item._count.postLikes}
            commentAmount={item._count.postComments}
            onPress={() =>
              navigation.push('CommentScreen', { postId: item.id })
            }
            onDelete={id => {
              deleteMutation.mutate(id);
            }}
            onLike={async () => {
              queryClient.setQueryData([postQueryKey, activity?.id], prev => {
                if (!prev) {
                  return;
                }
                const temp = prev;
                temp[index].isLike = !item.isLike;
                temp[index]._count.postLikes += item.isLike ? 1 : -1;
                return temp;
              });
              likeMutation.mutate(item.id);
            }}
            onEdit={() => {
              navigation.push('NewPost', { id: item.id });
            }}
          />
        )}
      />
    </View>
  );
};

PostScreen.navigationOptions = () => {
  return {
    header: (props: BottomTabHeaderProps) => {
      return (
        <CustomAppbar
          onBack={props.navigation.goBack}
          title={props.options.headerTitle}
          onAdd={() => props.navigation.navigate('NewPost')}
        />
      );
    },
  };
};

export default PostScreen;
