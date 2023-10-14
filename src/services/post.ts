import { post, remove } from './fetcher';

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

export type createCommentDto = {
  postId: number;
  message: string;
};

export const postQueryKey = 'post';

export const createPost = (payload: createPostDto) => {
  return post('/post', payload);
};

export const deletePost = (id: number) => {
  return remove(`/post/${id}`);
};

export const likePost = (postId: number) => {
  return post(`/post/${postId}`, null);
};

export const createComment = (payload: createCommentDto) => {
  return post('/post/comment', payload);
};
