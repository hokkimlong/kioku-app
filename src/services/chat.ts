import { post } from './fetcher';
import { User } from './member';

export type CreateMessageGroupDto = {
  activityId: number;
  message: string;
};

export type Message = {
  message: string;
  user: User;
};

export const sendMessageToGroup = (payload: CreateMessageGroupDto) => {
  return post('/chat', payload);
};
