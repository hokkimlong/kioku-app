import React, { PropsWithChildren } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MsgBox from './msg-box';
import { User } from '~/services/member';

type TextBoxProps = PropsWithChildren<{
  isComment: boolean;
  isNotification: boolean;
  isUser: boolean;
  user: User;
  message: string;
}>;

const TextBox = ({
  isComment = false,
  isNotification = false,
  isUser = false,
  user,
  message,
}: TextBoxProps) => {
  return (
    <View style={styles.wrapper}>
      {isNotification && (
        <View style={styles.iconBox}>
          <Icon name="heart" size={30} color="#FF470D" solid />
        </View>
      )}
      <View style={{ width: isNotification ? '85%' : '100%' }}>
        {isNotification && (
          <Text style={styles.subtitle}>Let's have some fun</Text>
        )}
        {isNotification && <MsgBox isUser={isUser} message="message" />}

        {isComment && (
          <View style={styles.commentTitle}>
            <Text style={styles.subtitle}>@{user.username}</Text>
            <Text style={styles.subtitle}>8 Mar 23</Text>
          </View>
        )}

        {
          isComment && (
            // item?.message?.map((msg, index) => (
            <MsgBox isUser={isUser} message={message} />
          )
          // ))
        }
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
