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
  successResponse(title: string, response: any) {
    this.success(title, response?.message || 'Success');
  },
  errorResponse(title: string, response: any) {
    this.error(title, response?.message || 'Failed');
  },
};
