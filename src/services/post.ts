import { post } from './fetcher';

export type Image = {
  uri: string;
  key?: string;
};

export type createPostDto = {
  activityId: number;
  description: string;
  images: Image[];
};

export type Post = {
  id: number;
  activityId: number;
  description: string;
  user: {
    id: number;
    username: string;
  };
  postImages: [];
};

export const createPost = (payload: createPostDto) => {
  return post('/post', payload);
};
