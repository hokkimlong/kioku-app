import React, { useState } from 'react';
import { TitleContainer } from '~/components/ui/TitleContainer';
import CustomAppbar from '~/components/ui/Appbar';
import {
  BottomTabHeaderProps,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import { useActivityContext } from './DetailStackNavigator';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
} from 'react-native';
import { Menu, Text } from 'react-native-paper';
import { useActivityInformations } from '~/services/activity';

import Icon from 'react-native-vector-icons/FontAwesome5';
import { ActivityHomeTabList } from './Navigator';
import { useMutation } from '@tanstack/react-query';
import { useSpinner } from '~/components/ui/Spinner';
import { deleteInformation } from '~/services/information';

type Props = BottomTabScreenProps<ActivityHomeTabList, 'Information'>;

const InformationScreen = ({ navigation }: Props) => {
  const activity = useActivityContext();
  const { informationBoards, refetch, isFetching } = useActivityInformations(
    activity?.id,
  );
  const { openSpinner, closeSpinner } = useSpinner();

  const deleteMutation = useMutation(deleteInformation, {
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
    <TitleContainer
      title={'Information'}
      description="Let's your friend know more">
      <FlatList
        refreshing={isFetching}
        ListEmptyComponent={() => (
          <Text
            variant="bodyLarge"
            style={{ textAlign: 'center', color: 'gray' }}>
            No Information
          </Text>
        )}
        onRefresh={refetch}
        data={informationBoards}
        ItemSeparatorComponent={() => <View style={{ height: 18 }} />}
        renderItem={({ item }) => (
          <InformationCard
            onPress={() =>
              navigation
                .getParent()
                ?.navigate('InformationDetail', { id: item.id })
            }
            title={item.title}
            createdAt={item.createdAt}
            imageCount={item._count.images}
            onDelete={() => {
              deleteMutation.mutate(item.id);
            }}
            onEdit={() => {
              navigation
                .getParent()
                ?.navigate('NewInformation', { id: item.id });
            }}
          />
        )}
      />
    </TitleContainer>
  );
};

const InformationCard = ({
  title,
  createdAt,
  imageCount,
  onPress,
  onDelete,
  onEdit,
}: {
  title: string;
  createdAt: Date;
  imageCount: number;
  onPress: () => void;
  onDelete: () => void;
  onEdit: () => void;
}) => {
  const [visible, setVisible] = useState(false);
  const openMenu = () => {
    setVisible(true);
  };

  const closeMenu = () => {
    setVisible(false);
  };

  const handleDeleteAlert = () => {
    Alert.alert(
      'Delete',
      'Are you sure you want to "permanently" delete information?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: onDelete,
        },
      ],
    );
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          borderRadius: 16,
          overflow: 'hidden',
        }}>
        <View
          style={{
            backgroundColor: getColorFromDate(new Date(createdAt)),
          }}>
          <TouchableOpacity style={styles.settingIcon} onPress={openMenu}>
            <Menu
              visible={visible}
              onDismiss={closeMenu}
              anchor={<Icon solid size={20} name="ellipsis-v" color="#fff" />}>
              <Menu.Item
                leadingIcon="pen"
                onPress={() => {
                  onEdit();
                  closeMenu();
                }}
                title="Edit"
              />
              <Menu.Item
                leadingIcon="delete"
                title="Delete"
                onPress={() => {
                  handleDeleteAlert();
                  closeMenu();
                }}
              />
            </Menu>
          </TouchableOpacity>
          <View
            style={{
              height: 120,
              backgroundColor: 'rgba(0,0,0, 0.5)',
              justifyContent: 'center',
              padding: 30,
            }}>
            <Text
              variant="headlineSmall"
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{ color: 'white', fontWeight: 'bold' }}>
              {title}
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="image" size={18} color="white" solid />
                <Text
                  variant="bodyLarge"
                  style={{ color: 'white', fontWeight: 'bold', marginLeft: 5 }}>
                  {imageCount}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

InformationScreen.navigationOptions = () => {
  return {
    header: (props: BottomTabHeaderProps) => {
      return (
        <CustomAppbar
          onBack={props.navigation.goBack}
          onAdd={() => props.navigation.navigate('NewInformation')}
        />
      );
    },
  };
};

function getColorFromDate(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  // Calculate RGB values based on date components
  const red = (year * 13 + month) % 256;
  const green = (day * 7 + hour) % 256;
  const blue = (minute * 11 + second) % 256;

  // Convert the values to hexadecimal and format the color string
  const color = `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;

  return color;
}

const styles = StyleSheet.create({
  settingIcon: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 15,
    display: 'flex',
    justifyContent: 'center',
    zIndex: 999,
  },
});

export default InformationScreen;
