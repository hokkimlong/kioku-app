import { useQuery } from '@tanstack/react-query';
import { Activity } from './activity';
import { get } from './fetcher';

export type Notification = {
  id: string;
  message: string;
  activity: Activity;
  postId: number;
  informationId: number;
};

export const notificationQueryKey = 'notification';

export const useNotifications = () => {
  const { data, ...other } = useQuery<Notification[]>(
    [notificationQueryKey],
    () => get<Notification[]>('/notification'),
  );
  return { notifications: data, ...other };
};
