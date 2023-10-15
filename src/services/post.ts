import { useQuery } from '@tanstack/react-query';
import { get, post, remove } from './fetcher';
import { Message } from './chat';

export type Image = {
  uri: string;
  key?: string;
};

export type createPostDto = {
  activityId: number;
  description: string;
  images: Image[];
};

export type updatePostDto = {
  id: number;
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
  _count: {
    postLikes: number;
    postComments: number;
  };
  isLike?: boolean;
};

export type createCommentDto = {
  postId: number;
  message: string;
};

export const postQueryKey = 'post';

export const createPost = (payload: createPostDto) => {
  return post('/post', payload);
};

export const updatePost = (payload: updatePostDto) => {
  return post(`/post/${payload.id}`, payload);
};

export const deletePost = (id: number) => {
  return remove(`/post/${id}`);
};

export const likePost = (postId: number) => {
  return post(`/post/${postId}/like`, null);
};

export const createComment = (payload: createCommentDto) => {
  return post('/post/comment', payload);
};

export const usePostById = (id: number, options: any) => {
  const { data, ...other } = useQuery<Post>(
    [postQueryKey, id],
    () => get<Post>('/post/' + id),
    options,
  );
  return { post: data, ...other };
};

export const usePostComments = (id: number, options: any) => {
  const { data, ...other } = useQuery<Message[]>(
    [postQueryKey, id, 'comments'],
    () => get<Message[]>('/post/' + id + '/comments'),
    options,
  );
  return { comments: data, ...other };
};
