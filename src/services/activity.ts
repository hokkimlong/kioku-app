import { useQuery } from '@tanstack/react-query';
import { post, get, remove, update } from './fetcher';
import { Post } from './post';
import { InformationBoard } from './information';
import { Message } from './chat';

export type createActivityDto = {
  name: string;
  startDate: Date;
  endDate: Date;
  image: string;
  members: { id: string }[];
};

export type editActivityDto = {
  id: number;
  name: string;
  startDate: Date;
  endDate: Date;
  image: string;
  members: { id: string }[];
};

export const createActivity = (activity: createActivityDto) => {
  return post('/activity', activity);
};

export const deleteActivity = (id: number) => {
  return remove(`/activity/${id}`);
};

export const editActivity = (activity: editActivityDto) => {
  return update('/activity/' + activity.id, activity);
};

export const leaveActivity = (id: number) => {
  return update(`/activity/leave/${id}`, {});
};

export type Activity = {
  id: number;
  name: string;
  startDate: Date;
  endDate: Date;
  image: string;
  users: any[];
  isAdmin: boolean;
  _count: {
    informations: number;
    posts: number;
    users: number;
  };
};

export const activityQueryKey = 'activity';

export const useActivities = () => {
  const { data, ...other } = useQuery<Activity[]>([activityQueryKey], () =>
    get<Activity[]>('/activity'),
  );
  return { activities: data, ...other };
};

export const useActivityById = (id: number, options: any) => {
  const { data, ...other } = useQuery<Activity>(
    [activityQueryKey, id],
    () => get<Activity>('/activity/' + id),
    options,
  );
  return { activity: data, ...other };
};

export const postQueryKey = 'activity-post';

export const useActivityPosts = (activityId: number | undefined) => {
  const { data, ...other } = useQuery<Post[]>([postQueryKey, activityId], () =>
    get<Post[]>(`/activity/${activityId}/post`),
  );
  return { posts: data, ...other };
};

export const informationQueryKey = 'information-post';

export const useActivityInformations = (activityId: number | undefined) => {
  const { data, ...other } = useQuery<InformationBoard[]>(
    [informationQueryKey, activityId],
    () => get<InformationBoard[]>(`/activity/${activityId}/information`),
  );

  return { informationBoards: data, ...other };
};

export const groupChatQueryKey = 'group-chat';

export const useActivityChats = (
  activityId: number | undefined,
  options: any,
) => {
  const { data, ...other } = useQuery<Message[]>(
    [groupChatQueryKey, activityId],
    () => get<Message[]>(`/activity/${activityId}/chat`),
    options,
  );

  return { groupChats: data, ...other };
};
