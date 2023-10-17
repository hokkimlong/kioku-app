import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Dimensions,
  Image as NativeImage,
} from 'react-native';
import { BaseInput, Input, Label } from '~/components/form/Input';
import { TitleContainer } from '~/components/ui/TitleContainer';
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from 'react-hook-form';
import { Button } from '~/components/ui/Button';
import { AddIconButton } from '~/components/ui/AddIconButton';
import {
  Asset,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { DefaultAppBar } from './HomeNavigator';
import {
  IconButton,
  List,
  Modal,
  Portal,
  Text,
  useTheme,
} from 'react-native-paper';

import Feathericon from 'react-native-vector-icons/Feather';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { stringRequired } from '~/components/form/utils';
import { User, useUsers } from '~/services/member';
import { pluralize } from '~/utils/pluralize';
import { DateInput } from '~/components/form/Date';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  activityQueryKey,
  createActivity,
  useActivityById,
  editActivity,
} from '~/services/activity';
import { Image } from '~/services/post';
import { getS3Image, uploadImage } from '~/utils/s3';
import { useSpinner } from '~/components/ui/Spinner';

type NewActivityStackList = {
  NewInfo: undefined;
  MemberSelect: undefined;
};

const schema = z.object({
  name: stringRequired,
  date: z.object({
    startDate: z.date(),
    endDate: z.date(),
  }),
  members: z.array(
    z.object({
      id: z.number(),
    }),
  ),
  image: z
    .array(
      z.object({
        key: stringRequired,
        uri: stringRequired,
      }),
    )
    .min(1),
});

type FormSchema = {
  name: string;
  members: User[];
  image: Image[];
  date: {
    startDate: Date;
    endDate: Date;
  };
};

const Stack = createNativeStackNavigator<NewActivityStackList>();

const NewActivityNavigator = (props: any) => {
  const activityEditId = props.route.params.id;
  const { activity: editActivityData } = useActivityById(activityEditId, {
    enabled: !!activityEditId,
  });
  const methods = useForm<FormSchema>({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (editActivityData) {
      methods.setValue('name', editActivityData.name);
      methods.setValue('date.startDate', new Date(editActivityData.startDate));
      methods.setValue('date.endDate', new Date(editActivityData.endDate));
      methods.setValue('members', editActivityData.users);
      methods.setValue('image', [
        {
          uri: getS3Image(editActivityData.image),
          key: editActivityData.image,
        },
      ]);
    }
  }, [editActivityData, methods]);

  return (
    <FormProvider {...methods}>
      <Stack.Navigator
        screenOptions={{
          header: DefaultAppBar,
        }}>
        <Stack.Screen
          initialParams={{ id: activityEditId } as any}
          name="NewInfo"
          component={NewActivityInfo}
        />
        <Stack.Screen
          initialParams={{ id: activityEditId } as any}
          name="MemberSelect"
          component={MemberSelector}
        />
      </Stack.Navigator>
    </FormProvider>
  );
};

type NewActivityInfoProps = NativeStackScreenProps<
  NewActivityStackList,
  'NewInfo'
>;

const NewActivityInfo = ({ navigation, route }: NewActivityInfoProps) => {
  const { trigger } = useFormContext<FormSchema>();

  return (
    <TitleContainer
      title={(route.params as any).id ? 'Edit Activity' : 'New Activity'}
      description="Let's start a new adventure">
      <Input
        name="name"
        label="Activity Name"
        placeholder="Enter your activity name"
      />
      <DateInput label="Date" name="date" />
      <ImagePicker selectionLimit={1} label="Add new image" name="image" />
      <View style={{ flex: 1 }} />
      <Button
        outlined
        onPress={async () => {
          const result = await trigger(['name', 'image']);
          if (result) {
            navigation.push('MemberSelect');
          }
        }}>
        Next
      </Button>
    </TitleContainer>
  );
};

type MemberSelectProps = NativeStackScreenProps<
  NewActivityStackList,
  'MemberSelect'
>;

const MemberSelector = ({ navigation, route }: MemberSelectProps) => {
  const { handleSubmit, control, formState, getValues } =
    useFormContext<FormSchema>();
  const { fields, append, remove } = useFieldArray({
    name: 'members',
    control,
    keyName: 'key',
  });
  const { openSpinner, closeSpinner } = useSpinner();

  const [search, setSearch] = useState('');
  const { users } = useUsers(search);
  const queryClient = useQueryClient();

  const createActivityMutation = useMutation(createActivity, {
    onMutate: () => {
      openSpinner();
    },
    onSuccess: async () => {
      const [image] = getValues('image');

      if (image) {
        await uploadImage(image);
      }

      navigation.getParent()?.goBack();
      queryClient.invalidateQueries([activityQueryKey]);
    },
    onError: error => {
      console.log(error.response.data);
    },
    onSettled: () => {
      closeSpinner();
    },
  });

  const editActivityMutation = useMutation(editActivity, {
    onSuccess: () => {
      const [image] = getValues('image');
      if (!image?.uri.includes('http')) {
        uploadImage(image);
      }
      navigation.getParent()?.goBack();
      queryClient.invalidateQueries([activityQueryKey]);
    },
    onError: error => {
      console.log(error.response.data);
    },
  });

  return (
    <TitleContainer
      scroll={false}
      title={route.params?.id ? 'Members' : 'Add Members'}
      description="Let's add your member">
      <BaseInput
        onChangeText={(value: string) => {
          setSearch(value);
        }}
        placeholder="Search your member"
      />
      <View style={{ paddingVertical: 10 }}>
        <Text style={{ color: 'rgba(0,0,0,0.7)' }}>
          Selected {fields.length} {pluralize('member', fields.length)}
        </Text>
      </View>
      <ScrollView>
        {users?.map(user => {
          const isActive = fields.some(field => field.id === user.id);
          return (
            <MemberListItem
              key={user.id}
              onPress={() => {
                if (isActive) {
                  remove(fields.findIndex(field => field.id === user.id));
                } else {
                  append(user);
                }
              }}
              value={user.username}
              active={isActive}
            />
          );
        })}
      </ScrollView>

      {(route.params as any).id ? (
        <Button
          onPress={handleSubmit(data => {
            const payload = {
              id: (route.params as any).id,
              name: data.name,
              ...data.date,
              image: data.image?.[0].key,
              members: data.members,
            };

            editActivityMutation.mutate(payload);
          })}>
          Update
        </Button>
      ) : (
        <Button
          onPress={handleSubmit(data => {
            const payload = {
              name: data.name,
              ...data.date,
              image: data.image?.[0].key,
              members: data.members,
            };
            createActivityMutation.mutate(payload);
          })}>
          Create
        </Button>
      )}
    </TitleContainer>
  );
};

const MemberListItem = ({
  active,
  value,
  onPress,
}: {
  active: boolean;
  value: string;
  onPress: (value: any) => void;
}) => {
  return (
    <List.Item
      style={{ marginLeft: -14, marginRight: -18 }}
      onPress={onPress}
      title={value}
      titleStyle={{ fontWeight: 'bold', color: 'black' }}
      right={() => (
        <View
          style={{
            overflow: 'hidden',
            borderRadius: 1000,
            backgroundColor: active ? '#479522' : '#D9D9D9',
            width: 20,
            height: 20,
          }}
        />
      )}
    />
  );
};

const deviceWidth = Dimensions.get('window').width;

import { Image as ImageCompressor } from 'react-native-compressor';

export const ImagePicker = ({
  name,
  label,
  selectionLimit = 0,
}: {
  name: string;
  label: string;
  selectionLimit?: number;
}) => {
  const { fields, prepend, remove, replace } = useFieldArray({ name });
  const { formState } = useFormContext();
  const error = formState.errors[name];
  const theme = useTheme();

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddImage = async ({ assets }: ImagePickerResponse) => {
    if (!assets?.length) {
      return;
    }
    const compressedAssets = await Promise.all(
      assets?.map(async (asset: any) => {
        const compressed = await ImageCompressor.compress(asset.uri);
        return {
          key: asset.fileName,
          uri: compressed,
        };
      }),
    );

    if (selectionLimit === 1) {
      replace(compressedAssets);
    } else {
      prepend(compressedAssets);
    }

    handleClose();
  };

  return (
    <View>
      <Portal>
        <Modal
          visible={open}
          onDismiss={handleClose}
          style={{ position: 'relative' }}>
          <View
            style={{
              position: 'absolute',
              width: deviceWidth,
              height: 200,
              bottom: 0,
              left: 0,
              padding: 20,
              backgroundColor: 'white',
            }}>
            <Button
              onPress={() => {
                launchImageLibrary({
                  selectionLimit,
                  mediaType: 'photo',
                }).then(handleAddImage);
              }}>
              Gallery
            </Button>
            <Button
              outlined
              onPress={() => {
                launchCamera({ mediaType: 'photo' }).then(handleAddImage);
              }}>
              Camera
            </Button>
          </View>
        </Modal>
      </Portal>
      <Label label={label} />
      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingRight: 28,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View>
          <AddIconButton
            style={{
              backgroundColor: '#F5F5F5',
              borderRadius: 20,
              borderColor: error ? theme.colors.error : '#ECECEC',
              borderWidth: error ? 2 : 1,
            }}
            size={115}
            onPress={handleOpen}
          />
        </View>
        {fields.map((item: Asset, index) => (
          <View
            key={item.id}
            style={{
              marginLeft: 12,
              borderRadius: 20,
              width: 160,
              height: 130,
              flex: 1,
              overflow: 'hidden',
              position: 'relative',
            }}>
            <IconButton
              onPress={() => {
                remove(index);
              }}
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                zIndex: 1,
                backgroundColor: 'white',
                marginRight: 2,
                marginTop: 2,
              }}
              icon={props => <Feathericon {...props} name="x" />}
            />
            <NativeImage
              style={{ width: 160, height: 130, objectFit: 'cover' }}
              source={{
                uri: item.uri,
              }}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default NewActivityNavigator;
