import React from 'react';
import { TitleContainer } from '~/components/ui/TitleContainer';
import { useForm, FormProvider } from 'react-hook-form';
import { Button } from '~/components/ui/Button';
import { Input } from '~/components/form/Input';
import { ImagePicker } from '../home/NewActivityScreen';
import { View } from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Image, createPost, updatePost, usePostById } from '~/services/post';
import {
  DetailActivityStackList,
  useActivityContext,
} from './DetailStackNavigator';
import { z } from 'zod';
import { stringRequired } from '~/components/form/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { postQueryKey } from '~/services/activity';
import { getS3Image, uploadImage } from '~/utils/s3';
import { useSpinner } from '~/components/ui/Spinner';

const schema = z
  .object({
    description: z.string().trim(),
    images: z.array(
      z.object({
        key: stringRequired,
        uri: stringRequired,
      }),
    ),
  })
  .partial()
  .superRefine(({ description, images }, ctx) => {
    if (!description && images?.length === 0) {
      ctx.addIssue({
        message: 'Description required',
        code: z.ZodIssueCode.custom,
        path: ['description'],
      });
      ctx.addIssue({
        message: 'Images required',
        code: z.ZodIssueCode.custom,
        path: ['images'],
      });
    }
  });

type FormSchema = {
  description: string;
  images: Image[];
};

type Props = NativeStackScreenProps<DetailActivityStackList, 'NewPost'>;

const NewPostScreen = ({ navigation, route }: Props) => {
  const id = route?.params?.id;
  const { openSpinner, closeSpinner } = useSpinner();
  const methods = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: '',
      images: [],
    },
  });

  usePostById(id, {
    enabled: !!id,
    onSuccess: (data: any) => {
      methods.reset({
        description: data.description,
        images: data.postImages.map((image: any) => ({
          uri: getS3Image(image.uri),
          key: image.uri,
        })),
      });
    },
  });

  const queryClient = useQueryClient();
  const mutation = useMutation((id ? updatePost : createPost) as any, {
    onMutate: () => {
      openSpinner();
    },
    onSuccess: async () => {
      const values = methods.getValues('images');

      if (values.length > 0) {
        await Promise.all(
          values.map(item => {
            if (!item.uri.includes('http')) {
              uploadImage(item);
            }
          }),
        );
      }

      navigation.goBack();
      queryClient.invalidateQueries([postQueryKey]);
    },
    onSettled: () => {
      closeSpinner();
    },
  });
  const activity = useActivityContext();

  return (
    <FormProvider {...methods}>
      <TitleContainer
        title={id ? 'Post' : 'New Post'}
        description="Let’s start a new adventure">
        <ImagePicker label="Images" name="images" />
        <Input
          name="description"
          label="Description"
          style={{ paddingVertical: 3 }}
          multiline
          numberOfLines={5}
        />
        <View style={{ flex: 1 }} />
        <Button
          onPress={methods.handleSubmit(data => {
            if (activity && activity.id) {
              try {
                openSpinner();
                mutation.mutate({
                  id,
                  activityId: activity.id,
                  description: data.description,
                  images: data.images.map(image => ({ uri: image.key })),
                } as any);
              } catch (error) {
                console.log(error);
              } finally {
                closeSpinner();
              }
            }
          })}>
          {id ? 'Update' : 'Create'}
        </Button>
      </TitleContainer>
    </FormProvider>
  );
};

export default NewPostScreen;
