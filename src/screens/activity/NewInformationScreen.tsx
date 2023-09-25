import React from 'react';
import { TitleContainer } from '~/components/ui/TitleContainer';
import { useForm, FormProvider } from 'react-hook-form';
import { Button } from '~/components/ui/Button';
import { Input } from '~/components/form/Input';
import { ImagePicker } from '../home/NewActivityScreen';
import { View } from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { stringRequired } from '~/components/form/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { informationQueryKey } from '~/services/activity';
import { uploadImage } from '~/utils/s3';
import {
  DetailActivityStackList,
  useActivityContext,
} from './DetailStackNavigator';
import { createInformation } from '~/services/information';

const schema = z.object({
  title: stringRequired,
  description: stringRequired,
  images: z.array(
    z.object({
      key: stringRequired,
      uri: stringRequired,
    }),
  ),
});

type FormSchema = z.infer<typeof schema>;

type Props = NativeStackScreenProps<DetailActivityStackList, 'NewInformation'>;

const NewInformationScreen = ({ navigation }: Props) => {
  const methods = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      images: [],
    },
  });
  const queryClient = useQueryClient();
  const mutation = useMutation(createInformation, {
    onSuccess: () => {
      const values = methods.getValues('images');

      if (values.length > 0) {
        values.forEach(item => {
          uploadImage(item);
        });
      }

      navigation.goBack();
      queryClient.invalidateQueries([informationQueryKey]);
    },
  });
  const activity = useActivityContext();

  return (
    <FormProvider {...methods}>
      <TitleContainer
        title="New Information"
        description="Let’s start a new adventure">
        <Input name="title" label="Title" />
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
                title: data.title,
                description: data.description,
                images: data.images.map(image => ({ uri: image.key })),
              });
            }
          })}>
          Create
        </Button>
      </TitleContainer>
    </FormProvider>
  );
};

export default NewInformationScreen;
