import React from 'react';
import { IconButton, IconButtonProps } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '~/utils/color';

export const AddIconButton = (props: Omit<IconButtonProps, 'icon'>) => (
  <IconButton
    style={{ borderRadius: 20 }}
    iconColor={Colors.textColorPrimary}
    size={34}
    {...props}
    icon={AddIcon}
  />
);
export const AddIcon = (props: any) => (
  <Ionicons {...props} color={Colors.textColorPrimary} name="add" />
);
