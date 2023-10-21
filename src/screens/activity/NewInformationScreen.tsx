import React, { useEffect } from 'react';
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
import { getS3Image, uploadImage } from '~/utils/s3';
import {
  DetailActivityStackList,
  useActivityContext,
} from './DetailStackNavigator';
import {
  createInformation,
  updateInformation,
  useInformationById,
} from '~/services/information';
import { useSpinner } from '~/components/ui/Spinner';

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

const NewInformationScreen = ({ navigation, route }: Props) => {
  const id = route.params?.id;
  const methods = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      images: [],
    },
  });
  const queryClient = useQueryClient();
  const { openSpinner, closeSpinner } = useSpinner();
  const mutation = useMutation(id ? updateInformation : createInformation, {
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
      queryClient.invalidateQueries([informationQueryKey]);
    },
    onSettled: () => {
      closeSpinner();
    },
  });

  useInformationById(id, {
    enabled: !!id,
    onSuccess: (data: any) => {
      methods.reset({
        title: data.title,
        description: data.description,
        images: data.images.map((image: any) => ({
          key: image.uri,
          uri: getS3Image(image.uri),
        })),
      });
      closeSpinner();
    },
    onError: () => {
      closeSpinner();
    },
  });

  useEffect(() => {
    if (id) {
      openSpinner();
    }
  }, [id]);

  const activity = useActivityContext();

  return (
    <FormProvider {...methods}>
      <TitleContainer
        title={id ? 'Information' : 'New Information'}
        description="Tell your friend more">
        <Input name="title" label="Title" />
        <ImagePicker label="Images" name="images" />
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
              try {
                openSpinner();
                if (id) {
                  mutation.mutate({
                    id,
                    activityId: activity.id,
                    title: data.title,
                    description: data.description,
                    images: data.images.map(image => ({ uri: image.key })),
                  });
                } else {
                  mutation.mutate({
                    activityId: activity.id,
                    title: data.title,
                    description: data.description,
                    images: data.images.map(image => ({ uri: image.key })),
                  } as any);
                }
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

export default NewInformationScreen;
