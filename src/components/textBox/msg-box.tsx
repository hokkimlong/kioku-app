import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

const MsgBox = () => {
  return (
    <View style={styles.msgContainer}>
      <Text style={styles.msg}>Sent a Message</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  msgContainer: {
    width: '100%',
    borderWidth: 0.3,
    borderColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  msg: {
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default MsgBox;
