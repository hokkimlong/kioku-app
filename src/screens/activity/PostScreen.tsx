import React from 'react';
import { TitleContainer } from '~/components/ui/TitleContainer';
import { useActivityPosts } from '~/services/activity';
import { useActivityContext } from './DetailStackNavigator';

import PostThumbnail from '~/components/thumbnail/postThumbnail';
import { useMutation } from '@tanstack/react-query';
import { likePost } from '~/services/post';
import {
  BottomTabHeaderProps,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import { ActivityHomeTabList } from './ActivityTab';
import CustomAppbar from '~/components/ui/Appbar';

type Props = BottomTabScreenProps<ActivityHomeTabList, 'Home'>;

const PostScreen = ({ navigation }: Props) => {
  const activity = useActivityContext();
  const { posts } = useActivityPosts(activity?.id);

  const mutation = useMutation(likePost);

  return (
    <TitleContainer title={activity?.name}>
      {posts?.map(post => {
        return (
          <PostThumbnail
            key={post.id}
            imageUrl={post.postImages}
            caption={post.description}
            publisher={post.user?.username}
            post={post}
            onPress={() =>
              navigation.push('CommentScreen', { postId: post.id })
            }
            onLike={() => {
              mutation.mutate(post.id);
            }}
          />
        );
      })}
    </TitleContainer>
  );
};

PostScreen.navigationOptions = () => {
  return {
    header: (props: BottomTabHeaderProps) => {
      return (
        <CustomAppbar
          onBack={props.navigation.goBack}
          onAdd={() => props.navigation.navigate('NewPost')}
        />
      );
    },
  };
};

export default PostScreen;
