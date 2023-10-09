import React, { useState } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { Menu, Icon } from 'react-native-paper';

interface Props {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const MenuDropDown: React.FC<Props> = ({ onEdit, onDelete }) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleDeleteActivity = (id: string) => {
    onDelete(id);
    closeMenu();
  };

  return (
    <TouchableOpacity style={styles.settingIcon} onPress={openMenu}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Icon solid size={20} name="ellipsis-v" color="#fff" />}>
        <Menu.Item
          leadingIcon="pen"
          onPress={() => {
            onEdit(item.id);
            closeMenu();
          }}
          title="Edit"
        />
        <Menu.Item
          leadingIcon="delete"
          title="Delete"
          onPress={() => {
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
                  onPress: () => handleDeleteActivity(item.id),
                },
              ],
            );
          }}
        />
        <Menu.Item leadingIcon="human" title="Add Member" onPress={() => {}} />
      </Menu>
    </TouchableOpacity>
  );
};

const styles = {
  settingIcon: {
    marginRight: 10,
  },
};

export default MenuDropDown;
