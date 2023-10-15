import React, { PropsWithChildren } from 'react';
import MsgBox from './msg-box';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { User } from '~/services/member';
import { format } from 'date-fns';

type TextBoxProps = PropsWithChildren<{
  isComment: boolean;
  isNotification: boolean;
  isUser: boolean;
  user: User;
  message: string;
  isOnGoing: boolean;
  createdAt: string;
  notificationTitle?: string;
}>;

const TextBox = ({
  isComment = false,
  isNotification = false,
  isUser = false,
  user,
  message,
  isOnGoing,
  createdAt,
  notificationTitle,
}: TextBoxProps) => {
  return (
    <View style={styles.wrapper}>
      <View style={{ width: '100%' }}>
        {isNotification && (
          <>
            <Text style={styles.subtitle}>{notificationTitle}</Text>
            <MsgBox isUser={isUser} message={message} />
            <Text style={styles.subtitle}>
              {format(new Date(createdAt), 'dd MMM yy HH:mm')}
            </Text>
          </>
        )}

        {!isOnGoing && isComment && (
          <View style={styles.commentTitle}>
            <Text style={styles.subtitle}>@{user.username}</Text>
            <Text style={styles.subtitle}>
              {format(new Date(createdAt), 'dd MMM yy')}
            </Text>
          </View>
        )}
        {isComment && <MsgBox isUser={isUser} message={message} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    marginBottom: 10,
  },
  iconBox: {
    marginRight: 10,
  },
  subtitle: {
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.5)',
  },
  commentTitle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default TextBox;
