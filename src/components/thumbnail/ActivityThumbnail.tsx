import React, { PropsWithChildren } from 'react';
import { Activity } from '~/services/activity';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  format,
} from 'date-fns';
import { getS3Image } from '~/utils/s3';

type ActivityProps = PropsWithChildren<{
  item: Activity;
  onPress: () => void;
}>;

const ActivityThumbnail = ({ item, onPress }: ActivityProps) => {
  const startDate = new Date(item.startDate);
  const endDate = new Date();
  const differentDays = differenceInDays(startDate, endDate);
  const differenceHours = differenceInHours(startDate, endDate);
  const differenceMinutes = differenceInMinutes(startDate, endDate);
  console.log({ uri: item.image ? getS3Image(item.image) : '' });
  const remaining =
    differentDays > 1
      ? `${differentDays} days remaining`
      : differenceHours > 1
      ? `${differenceHours} hours remaining`
      : `${differenceMinutes} minutes remaining`;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.wrapper}>
        <ImageBackground
          source={{ uri: item.image ? getS3Image(item.image) : '' }}>
          <View style={styles.innerContainer}>
            <View>
              <Text
                variant="headlineSmall"
                style={{
                  color: 'white',
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                }}>
                {item.name}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text
                  variant="bodyLarge"
                  style={{
                    color: 'white',
                    fontSize: 15,
                  }}>
                  {format(new Date(item.startDate), 'dd MMM yyyy')}
                </Text>
                <Text variant="bodyMedium" style={{ marginLeft: 10 }}>
                  {differenceMinutes > 0 && remaining}
                </Text>
              </View>
            </View>
            <View style={styles.mediaContainer}>
              <View style={styles.actionContainer}>
                <Icon name="user" size={18} color="white" solid />
                <Text style={styles.mediaText}>{item._count.users}</Text>
              </View>
              <View style={styles.actionContainer}>
                <Icon name="film" size={18} color="white" solid />
                <Text style={styles.mediaText}>{item._count.posts}</Text>
              </View>
              <View style={styles.actionContainer}>
                <Icon name="newspaper" size={18} color="white" solid />
                <Text style={styles.mediaText}>{item._count.informations}</Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
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
});

export default ActivityThumbnail;
