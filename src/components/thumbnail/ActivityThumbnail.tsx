import React, { PropsWithChildren, useState } from 'react';
import { Activity, leaveActivity } from '~/services/activity';
import { Menu, Text } from 'react-native-paper';
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  Image,
  Dimensions,
} from 'react-native';
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  format,
} from 'date-fns';
import { getS3Image } from '~/utils/s3';
import { deleteActivity } from '~/services/activity';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { activityQueryKey } from '~/services/activity';
import { useSpinner } from '../ui/Spinner';
import { Colors } from '~/utils/color';
import { pluralize } from '~/utils/pluralize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type ActivityProps = PropsWithChildren<{
  item: Activity;
  onPress: () => void;
  onEdit: (id: number) => void;
}>;

const win = Dimensions.get('window');

const ActivityThumbnail = ({ item, onPress, onEdit }: ActivityProps) => {
  const { openSpinner, closeSpinner } = useSpinner();
  const queryClient = useQueryClient();

  const [visible, setVisible] = useState(false);
  const openMenu = () => {
    setVisible(true);
  };

  const closeMenu = () => {
    setVisible(false);
  };

  const deleteMutation = useMutation(deleteActivity, {
    onMutate: () => {
      openSpinner();
    },
    onSuccess: () => {
      queryClient.invalidateQueries([activityQueryKey]);
    },
    onSettled: () => {
      closeSpinner();
    },
  });

  const leaveMutation = useMutation(leaveActivity, {
    onMutate: () => {
      openSpinner();
    },
    onSuccess: () => {
      queryClient.invalidateQueries([activityQueryKey]);
    },
    onSettled: () => {
      closeSpinner();
    },
  });

  const handleLeaveActivity = (id: number) => {
    leaveMutation.mutate(id);
    closeMenu();
  };

  const handleDeleteActivity = (id: number) => {
    deleteMutation.mutate(id);
    closeMenu();
  };

  const handleDeleteAlert = (id: number) => {
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
          onPress: () => handleDeleteActivity(id),
        },
      ],
    );
  };

  const startDate = new Date(item.startDate);
  const endDate = new Date();
  const differentDays = differenceInDays(startDate, endDate);
  const differenceHours = differenceInHours(startDate, endDate);
  const differenceMinutes = differenceInMinutes(startDate, endDate);
  const remaining =
    differentDays > 1
      ? `${differentDays} days remaining`
      : differenceHours > 1
      ? `${differenceHours} hours remaining`
      : `${differenceMinutes} minutes remaining`;

  return (
    <TouchableWithoutFeedback>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        {differentDays > 0 && (
          <View>
            <Text variant="bodyLarge">
              {format(new Date(item.startDate), 'MMM')}
            </Text>
            <Text variant="headlineLarge">
              {format(new Date(item.startDate), 'dd')}
            </Text>
          </View>
        )}
        <View>
          <View>
            <TouchableWithoutFeedback onPress={onPress}>
              <View>
                <Image
                  source={{ uri: item.image ? getS3Image(item.image) : '' }}
                  style={{
                    width: win.width * (differentDays > 0 ? 0.7 : 0.85),
                    height: 150,
                    objectFit: 'cover',
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor: Colors.line,
                  }}
                />
              </View>
            </TouchableWithoutFeedback>
            <View>
              <TouchableWithoutFeedback onPress={onPress}>
                <Text
                  variant="bodyLarge"
                  style={{ marginVertical: 2, width: win.width * 0.7 }}>
                  {item.name}
                </Text>
              </TouchableWithoutFeedback>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text
                    style={{
                      marginRight: 4,
                      color: Colors.textColorCaptionLight,
                    }}>
                    {item._count.users} {pluralize('member', item._count.users)}{' '}
                    •
                  </Text>
                  <Text
                    style={{
                      marginRight: 4,
                      color: Colors.textColorCaptionLight,
                    }}>
                    {item._count.posts} {pluralize('post', item._count.posts)} •
                  </Text>
                  <Text
                    style={{
                      marginRight: 4,
                      color: Colors.textColorCaptionLight,
                    }}>
                    {item._count.informations}{' '}
                    {pluralize('information', item._count.informations)}
                  </Text>
                </View>
                <View>
                  <TouchableOpacity
                  // style={styles.settingIcon}
                  // onPress={() => setPopup(true)}
                  >
                    <Icon
                      size={26}
                      name="dots-horizontal"
                      color={Colors.textColorPrimary}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>

    // <TouchableOpacity onPress={onPress}>
    //   <View style={styles.wrapper}>
    //     <ImageBackground
    //       source={{ uri: item.image ? getS3Image(item.image) : '' }}>
    //       <View style={styles.innerContainer}>
    //         <TouchableOpacity style={styles.settingIcon} onPress={openMenu}>
    //           <Menu
    //             visible={visible}
    //             onDismiss={closeMenu}
    //             anchor={
    //               <Icon solid size={20} name="ellipsis-v" color="#fff" />
    //             }>
    //             {item.isAdmin ? (
    //               <>
    //                 <Menu.Item
    //                   leadingIcon="pen"
    //                   onPress={() => {
    //                     onEdit(item.id);
    //                     closeMenu();
    //                   }}
    //                   title="Edit"
    //                 />
    //                 <Menu.Item
    //                   leadingIcon="delete"
    //                   title="Delete"
    //                   onPress={() => {
    //                     handleDeleteAlert(item.id);
    //                   }}
    //                 />
    //               </>
    //             ) : (
    //               <Menu.Item
    //                 leadingIcon="delete"
    //                 title="Leave Activity"
    //                 onPress={() => {
    //                   handleLeaveActivity(item.id);
    //                 }}
    //               />
    //             )}
    //           </Menu>
    //         </TouchableOpacity>
    //         <View>
    //           <Text
    //             variant="headlineSmall"
    //             style={{
    //               color: 'white',
    //               textTransform: 'uppercase',
    //               fontWeight: 'bold',
    //             }}>
    //             {item.name}
    //           </Text>
    //           <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    //             <Text
    //               variant="bodyLarge"
    //               style={{
    //                 color: 'white',
    //                 fontSize: 15,
    //               }}>
    //               {format(new Date(item.startDate), 'dd MMM yyyy')}
    //             </Text>
    //             <Text
    //               variant="bodyMedium"
    //               style={{ marginLeft: 10, color: 'white' }}>
    //               {differenceMinutes > 0 && remaining}
    //             </Text>
    //           </View>
    //         </View>
    //         <View style={styles.mediaContainer}>
    //           <View style={styles.actionContainer}>
    //             <Icon name="user" size={18} color="white" solid />
    //             <Text style={styles.mediaText}>{item._count.users}</Text>
    //           </View>
    //           <View style={styles.actionContainer}>
    //             <Icon name="film" size={18} color="white" solid />
    //             <Text style={styles.mediaText}>{item._count.posts}</Text>
    //           </View>
    //           <View style={styles.actionContainer}>
    //             <Icon name="newspaper" size={18} color="white" solid />
    //             <Text style={styles.mediaText}>{item._count.informations}</Text>
    //           </View>
    //         </View>
    //       </View>
    //     </ImageBackground>
    //   </View>
    // </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    overflow: 'hidden',
    borderColor: 'rgba(0,0,0,0.2)',
    borderWidth: 0.5,
    borderRadius: 12,
    marginBottom: 20,
  },
  innerContainer: {
    backgroundColor: 'rgba(0,0,0, 0.4)',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  mediaContainer: {
    marginTop: 15,
    display: 'flex',
    flexDirection: 'row',
  },
  actionContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  mediaText: {
    color: 'white',
    marginLeft: 5,
    fontSize: 20,
  },
  settingIcon: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 15,
    display: 'flex',
    justifyContent: 'center',
  },
});

export default ActivityThumbnail;
