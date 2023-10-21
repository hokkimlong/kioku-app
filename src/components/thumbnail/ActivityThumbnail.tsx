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
  endOfDay,
  format,
  formatDistance,
  isFuture,
  isPast,
  isToday,
  startOfDay,
} from 'date-fns';
import { getS3Image } from '~/utils/s3';
import { deleteActivity } from '~/services/activity';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { activityQueryKey } from '~/services/activity';
import { useSpinner } from '../ui/Spinner';
import { Colors } from '~/utils/color';
import { pluralize } from '~/utils/pluralize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { PopupActions, PopupMessage } from './postThumbnail';
import { Button } from '../ui/Button';

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
  };

  const handleDeleteActivity = (id: number) => {
    deleteMutation.mutate(id);
  };

  let startIn;
  {
    const startDate = startOfDay(new Date(item.startDate));
    const endDate = new Date();
    const differenceMinutes = differenceInMinutes(startDate, endDate);
    if (differenceMinutes > 0) {
      startIn = `start in ${formatDistance(startDate, endDate)}`;
    }
  }

  let remainingDays;
  if (startIn === undefined) {
    const startDate = endOfDay(new Date(item.endDate));
    const endDate = new Date();
    const differenceMinutes = differenceInMinutes(startDate, endDate);
    // let differentDays = differenceInDays(startDate, endDate);
    // const today = startOfDay(new Date());
    if (differenceMinutes > 0) {
      remainingDays = `${formatDistance(startDate, endDate)} remaining`;
    }
  }

  let pastDays;
  if (remainingDays === undefined && startIn === undefined) {
    pastDays = `${formatDistance(
      new Date(),
      endOfDay(new Date(item.endDate)),
    )} ago`;
  }

  const [deletePostConfirm, setDeletePostConfirm] = useState(false);
  return (
    <TouchableWithoutFeedback>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TouchableWithoutFeedback onPress={onPress}>
          <View>
            <Text variant="headlineLarge">
              {format(new Date(item.startDate), 'dd')}
            </Text>
            <Text variant="bodyLarge">
              {format(new Date(item.startDate), 'MMM')}
            </Text>
            <Text
              variant="bodySmall"
              style={{ color: Colors.textColorCaptionLight }}>
              {format(new Date(item.startDate), 'yy')}
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <View>
          <View>
            <TouchableWithoutFeedback onPress={onPress}>
              <View>
                <Image
                  source={{ uri: item.image ? getS3Image(item.image) : '' }}
                  style={{
                    width: win.width * 0.75,
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
              <TouchableWithoutFeedback onPress={onPress}>
                <>
                  {startIn && (
                    <Text
                      style={{
                        marginRight: 4,
                        color: Colors.primary,
                      }}>
                      {startIn}
                    </Text>
                  )}

                  {remainingDays && (
                    <Text
                      style={{
                        marginRight: 4,
                        color: Colors.primary,
                      }}>
                      {remainingDays}
                    </Text>
                  )}

                  {pastDays && (
                    <Text
                      style={{
                        marginRight: 4,
                        color: Colors.primary,
                      }}>
                      {pastDays}
                    </Text>
                  )}
                </>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback onPress={onPress}>
                <Text
                  style={{
                    marginRight: 4,
                    color: Colors.textColorCaptionLight,
                  }}>
                  <>
                    {
                      <Text style={{ color: Colors.textColorCaptionLight }}>
                        end on{' '}
                      </Text>
                    }
                    {format(new Date(item.endDate), 'dd MMM, yy')}
                  </>
                </Text>
              </TouchableWithoutFeedback>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <TouchableWithoutFeedback onPress={onPress}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text
                      style={{
                        marginRight: 4,
                        color: Colors.textColorCaptionLight,
                      }}>
                      {item._count.users}{' '}
                      {pluralize('member', item._count.users)} •
                    </Text>
                    <Text
                      style={{
                        marginRight: 4,
                        color: Colors.textColorCaptionLight,
                      }}>
                      {item._count.posts} {pluralize('post', item._count.posts)}{' '}
                      •
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
                </TouchableWithoutFeedback>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      setVisible(true);
                    }}>
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
        <PopupActions open={visible} onClose={() => setVisible(false)}>
          {item.isAdmin ? (
            <>
              <Button
                onPress={() => {
                  setVisible(false);
                  onEdit(item.id);
                }}>
                Edit
              </Button>
              <Button
                outlined
                onPress={() => {
                  setVisible(false);
                  setDeletePostConfirm(true);
                }}>
                Delete
              </Button>
            </>
          ) : (
            <Button
              onPress={() => {
                setVisible(false);
                handleLeaveActivity(item.id);
              }}>
              Leave
            </Button>
          )}
        </PopupActions>
        <PopupMessage
          onCancel={() => {
            setDeletePostConfirm(false);
          }}
          onConfirm={() => {
            setDeletePostConfirm(false);
            handleDeleteActivity(item.id);
          }}
          open={deletePostConfirm}
          onClose={() => setDeletePostConfirm(false)}
          title={'Delete Activity'}
          message={'Are you sure you want to delete this activity?'}
        />
      </View>
    </TouchableWithoutFeedback>
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
