import React from 'react';
import { TitleContainer } from '~/components/ui/TitleContainer';
import { Appbar } from 'react-native-paper';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { backIcon, defaultAppbarStyle } from '../home/HomeNavigator';
import { AddIcon } from '~/components/ui/AddIconButton';
import { useActivityPosts } from '~/services/activity';
import {
  DetailActivityStackList,
  useActivityContext,
} from './DetailStackNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import PostThumbnail from '~/components/thumbnail/postThumbnail';
import { useMutation } from '@tanstack/react-query';
import { likePost } from '~/services/post';
import { getS3Image } from '~/utils/s3';

type Props = NativeStackScreenProps<DetailActivityStackList, 'Post'>;

const PostScreen = ({ navigation }: Props) => {
  const activity = useActivityContext();
  const { posts } = useActivityPosts(activity?.id);

  const mutation = useMutation(likePost);

  return (
    <TitleContainer title={activity?.name}>
      {posts?.map(post => {
        // console.log(post.postImages);
        return (
          <PostThumbnail
            onLike={() => {
              mutation.mutate(post.id);
            }}
            imageUrl={getS3Image(post.postImages[0].uri)}
            onPress={() => navigation.push('CommentScreen')}
            caption={post.description}
            publisher={post.user.username}
          />
        );
      })}
    </TitleContainer>
  );
};

PostScreen.navigationOptions = () => {
  return {
    header: (props: NativeStackHeaderProps) => {
      return (
        <Appbar.Header style={defaultAppbarStyle.header}>
          <Appbar.Action
            style={defaultAppbarStyle.action}
            icon={backIcon}
            onPress={props.navigation.goBack}
            size={28}
          />
          <Appbar.Action
            style={defaultAppbarStyle.action}
            icon={AddIcon}
            onPress={() => props.navigation.push('NewPost')}
            size={36}
          />
        </Appbar.Header>
      );
    },
  };
};

export default PostScreen;
