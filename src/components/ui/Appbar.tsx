import React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { Appbar as ReactPaperAppbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { AddIcon } from './AddIconButton';
import { Colors } from '~/utils/color';
type Props = {
  onBack?: () => void;
  onAdd?: () => void;
};

const CustomAppbar = ({ onBack, onAdd }: Props) => {
  return (
    <ReactPaperAppbar.Header style={appbarStyle.header}>
      {onBack && (
        <ReactPaperAppbar.Action
          style={appbarStyle.action}
          icon={backIcon}
          size={28}
          onPress={onBack}
        />
      )}
      {onAdd && (
        <ReactPaperAppbar.Action
          style={appbarStyle.action}
          icon={AddIcon}
          size={36}
          onPress={onAdd}
        />
      )}
    </ReactPaperAppbar.Header>
  );
};

const backIcon = () => (
  <MaterialIcon
    color={Colors.textColorPrimary}
    size={28}
    name="arrow-back-ios"
  />
);

const appbarStyle = StyleSheet.create({
  header: {
    backgroundColor: Colors.background,
    elevation: 1,
    height: 55,
    justifyContent: 'space-between',
  },
  action: {
    marginLeft: 15,
  },
  actionRight: {
    marginRight: 30,
  },
});

export default CustomAppbar;
