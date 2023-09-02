import React from 'react';
import { IconButton, IconButtonProps } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const AddIconButton = (props: Omit<IconButtonProps, 'icon'>) => (
  <IconButton
    style={{ borderRadius: 20 }}
    iconColor="black"
    size={34}
    {...props}
    icon={AddIcon}
  />
);
export const AddIcon = (props: any) => <Ionicons {...props} name="add" />;
