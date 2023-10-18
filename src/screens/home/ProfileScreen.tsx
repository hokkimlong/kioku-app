import React, { useState } from 'react';
import { editUsername, useLogout, useUser } from '~/services/authentication';
import { TitleContainer } from '~/components/ui/TitleContainer';
import { Text, Menu } from 'react-native-paper';
import { Button } from '~/components/ui/Button';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useSpinner } from '~/components/ui/Spinner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUser, usersQueryKey } from '~/services/member';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackList } from './HomeNavigator';

type Props = NativeStackScreenProps<HomeStackList, 'Home'>;

const ProfileScreen = ({ navigation }: Props) => {
  const { openSpinner, closeSpinner } = useSpinner();
  const queryClient = useQueryClient();
  const { logout } = useLogout();
  const { user } = useUser();

  const [visible, setVisible] = useState(false);
  const openMenu = () => {
    setVisible(true);
  };

  const closeMenu = () => {
    setVisible(false);
  };

  const deleteUserMutation = useMutation(deleteUser, {
    onMutate: () => {
      openSpinner();
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onSettled: () => {
      closeSpinner();
    },
  });

  const handleRemoveAccount = () => {
    deleteUserMutation.mutate();
  };

  return (
    <TitleContainer
      title="Profile"
      right={
        <TouchableOpacity onPress={openMenu}>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={<Icon solid size={20} name="edit" color="#000" />}>
            <Menu.Item
              leadingIcon="account-edit"
              onPress={() => {
                navigation.push('ChangeUsername');
                closeMenu();
              }}
              title="Change Username"
            />
            <Menu.Item
              leadingIcon="email-edit"
              onPress={() => {
                console.log('Edit');
                closeMenu();
              }}
              title="Change Email"
            />
            <Menu.Item
              leadingIcon="account-remove"
              onPress={() => {
                handleRemoveAccount();
                closeMenu();
              }}
              title="Delete Account"
            />
          </Menu>
        </TouchableOpacity>
      }>
      <View style={styles.infoContainer}>
        <Icon solid name="at" size={25} color="#000" style={styles.icon} />
        <View>
          <Text style={styles.label}>Username</Text>
          <Text style={styles.infoText}>@{user?.username}</Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <Icon solid name="user" size={25} color="#000" style={styles.icon} />
        <View>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.infoText}>{user?.email}</Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <Icon solid name="running" size={25} color="#000" style={styles.icon} />
        <View>
          <Text style={styles.label}>Total Activities</Text>
          <Text style={styles.infoText}>{user?.activities.length}</Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <Icon solid name="images" size={20} color="#000" style={styles.icon} />
        <View>
          <Text style={styles.label}>Total Posts</Text>
          <Text style={styles.infoText}>{user?.posts.length}</Text>
        </View>
      </View>
      <Button onPress={logout} outlined>
        Logout
      </Button>
    </TitleContainer>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    marginBottom: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    color: 'rgba(0, 0, 0, 0.6)',
  },
  infoText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  icon: {
    padding: 5,
    marginRight: 5,
  },
});

export default ProfileScreen;
