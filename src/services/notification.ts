import { useQuery } from '@tanstack/react-query';
import { Activity } from './activity';
import { get, post } from './fetcher';

export type Notification = {
  id: string;
  message: string;
  activity: Activity;
  postId: number;
  informationId: number;
};

export type NotificationResponse = {
  data: Notification[];
  unSeenCount: number;
};

export const notificationQueryKey = 'notification';

export const useNotifications = (options?: any) => {
  const { data, ...other } = useQuery<NotificationResponse>(
    [notificationQueryKey],
    () => get<NotificationResponse>('/notification'),
    options,
  );
  return { notifications: data, ...other };
};

export const markAsSeen = () => {
  return post('/notification', null);
};
