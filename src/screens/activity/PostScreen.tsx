import React from 'react';
import { TitleContainer } from '~/components/ui/TitleContainer';
import { Appbar, Text } from 'react-native-paper';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { backIcon, defaultAppbarStyle } from '../home/HomeNavigator';
import { AddIcon } from '~/components/ui/AddIconButton';
import { useActivityPosts } from '~/services/activity';
import { useActivityContext } from './DetailStackNavigator';
import { View } from 'react-native';

const PostScreen = () => {
  const activity = useActivityContext();
  const { posts } = useActivityPosts(activity?.id);

  return (
    <TitleContainer title={activity?.name}>
      {posts?.map(post => {
        return (
          <View
            style={{ borderWidth: 1, borderColor: 'black', marginBottom: 10 }}>
            <Text key={post.id}>@{post.user.username}</Text>
            {post.postImages?.length > 0 && <View style={{ height: 100 }} />}
            {post.description && <Text>{post.description}</Text>}
          </View>
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
