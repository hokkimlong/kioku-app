import React from 'react';
import { TitleContainer } from '~/components/ui/TitleContainer';
import { useForm, FormProvider } from 'react-hook-form';
import { Button } from '~/components/ui/Button';
import { Input } from '~/components/form/Input';
import { ImagePicker } from '../home/NewActivityScreen';
import { View } from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Image, createPost } from '~/services/post';
import {
  DetailActivityStackList,
  useActivityContext,
} from './DetailStackNavigator';
import { z } from 'zod';
import { stringRequired } from '~/components/form/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { postQueryKey } from '~/services/activity';

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

const NewPostScreen = ({ navigation }: Props) => {
  const methods = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: '',
      images: [],
    },
  });
  const queryClient = useQueryClient();
  const mutation = useMutation(createPost, {
    onSuccess: () => {
      navigation.goBack();
      queryClient.invalidateQueries([postQueryKey]);
    },
  });
  const activity = useActivityContext();

  return (
    <FormProvider {...methods}>
      <TitleContainer
        title="New Post"
        description="Let’s start a new adventure">
        <ImagePicker selectionLimit={1} label="Images" name="images" />
        <Input
          name="description"
          label="Description"
          style={{ paddingVertical: 5 }}
          multiline
          numberOfLines={8}
        />
        <View style={{ flex: 1 }} />
        <Button
          onPress={methods.handleSubmit(data => {
            if (activity && activity.id) {
              mutation.mutate({
                activityId: activity.id,
                description: data.description,
                images: data.images.map(image => ({ uri: image.uri })),
              });
            }
          })}>
          Create
        </Button>
      </TitleContainer>
    </FormProvider>
  );
};

export default NewPostScreen;
