import { useQuery } from '@tanstack/react-query';
import { post, get } from './fetcher';
import { Post, createPostDto } from './post';

export type createActivityDto = {
  name: string;
  startDate: Date;
  endDate: Date;
  image: string;
  members: { id: string }[];
};

export const createActivity = (activity: createActivityDto) => {
  return post('/activity', activity);
};

export type Activity = {
  id: number;
  name: string;
  startDate: Date;
  endDate: Date;
  image: string;
};

export const activityQueryKey = 'activity';

export const useActivities = () => {
  const { data, ...other } = useQuery<createActivityDto[]>(
    [activityQueryKey],
    () => get<createActivityDto[]>('/activity'),
  );
  return { activities: data, ...other };
};

export const postQueryKey = 'activity-post';

export const useActivityPosts = (activityId: number | undefined) => {
  const { data, ...other } = useQuery<Post[]>([postQueryKey, activityId], () =>
    get<Post[]>(`/activity/${activityId}/post`),
  );
  return { posts: data, ...other };
};
