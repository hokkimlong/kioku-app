import { Alert } from 'react-native';

export const alert = {
  success(title: string, message: string, callback?: () => void) {
    Alert.alert(
      title,
      message,
      [
        {
          text: 'OK',
          style: 'cancel',
          ...(callback ? { onPress: callback } : {}),
        },
      ],
      {
        cancelable: true,
      },
    );
  },
  error(title: string, message: string, callback?: () => void) {
    Alert.alert(
      title,
      message,
      [
        {
          text: 'Cancel',
          style: 'cancel',
          ...(callback ? { onPress: callback } : {}),
        },
      ],
      {
        cancelable: true,
      },
    );
  },
};
