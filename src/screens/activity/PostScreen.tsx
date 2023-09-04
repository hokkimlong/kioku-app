import React from 'react';
import { TitleContainer } from '~/components/ui/TitleContainer';
import { Appbar } from 'react-native-paper';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { backIcon, defaultAppbarStyle } from '../home/HomeNavigator';
import { AddIcon } from '~/components/ui/AddIconButton';
import { useActivityPosts } from '~/services/activity';
import { useActivityContext } from './DetailStackNavigator';

import PostThumbnail from '~/components/thumbnail/postThumbnail';

const PostScreen = () => {
  const activity = useActivityContext();
  const { posts } = useActivityPosts(activity?.id);

  return (
    <TitleContainer title={activity?.name}>
      {posts?.map(post => {
        return (
          <PostThumbnail
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
