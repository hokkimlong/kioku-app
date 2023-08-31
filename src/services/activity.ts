import { useQuery } from '@tanstack/react-query';
import { post, get } from './fetcher';

export type Activity = {
  name: string;
  startDate: Date;
  endDate: Date;
  image: string;
  members: { id: string }[];
};

export const createActivity = (activity: Activity) => {
  return post('/activity', activity);
};

export const activityQueryKey = 'activity';

export const useActivities = () => {
  const { data, ...other } = useQuery<Activity[]>([activityQueryKey], () =>
    get<Activity[]>('/activity'),
  );
  return { activities: data, ...other };
};
