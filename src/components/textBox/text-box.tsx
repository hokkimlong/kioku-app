import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MsgBox from './msg-box';

const TextBox = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.iconBox}>
        <Icon name="heart" size={30} color="#FF470D" solid />
      </View>
      <View style={{ width: '70%' }}>
        <Text style={styles.subtitle}>Let's have some fun</Text>
        <MsgBox />
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
  msgContainer: {
    width: '100%',
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  subtitle: {
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.5)',
  },
});

export default TextBox;
