import React, { useEffect, useState } from 'react';
import { TitleContainer } from '~/components/ui/TitleContainer';
import CustomAppbar from '~/components/ui/Appbar';
import {
  BottomTabHeaderProps,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import { useActivityContext } from './DetailStackNavigator';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import { Menu, Text } from 'react-native-paper';
import { useActivityInformations } from '~/services/activity';

// import Icon from 'react-native-vector-icons/FontAwesome5';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ActivityHomeTabList } from './Navigator';
import { useMutation } from '@tanstack/react-query';
import { useSpinner } from '~/components/ui/Spinner';
import { deleteInformation } from '~/services/information';
import { useUser } from '~/services/authentication';
import { Colors } from '~/utils/color';
import { pluralize } from '~/utils/pluralize';
import { formatDuration } from '~/utils/date';
import {
  PopupActions,
  PopupMessage,
} from '~/components/thumbnail/postThumbnail';
import { Button } from '~/components/ui/Button';

type Props = BottomTabScreenProps<ActivityHomeTabList, 'Information'>;

const InformationScreen = ({ navigation }: Props) => {
  const activity = useActivityContext();
  const { informationBoards, refetch, isFetching } = useActivityInformations(
    activity?.id,
  );
  const { openSpinner, closeSpinner } = useSpinner();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: activity?.name,
    });
  }, []);

  const deleteMutation = useMutation(deleteInformation, {
    onMutate: () => {
      openSpinner();
    },
    onSuccess: () => {
      refetch();
    },
    onSettled: () => {
      closeSpinner();
    },
  });

  return (
    <View style={{ flex: 1 }}>
      <View>
        <TitleContainer
          title={'Informations'}
          description="Let's your friends know more"
        />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 20, marginTop: 10 }}
        refreshing={isFetching}
        ListEmptyComponent={() => (
          <Text
            variant="bodyLarge"
            style={{ textAlign: 'center', color: 'gray' }}>
            No Information
          </Text>
        )}
        onRefresh={refetch}
        data={informationBoards}
        ItemSeparatorComponent={() => <View style={{ height: 18 }} />}
        renderItem={({ item }) => (
          <InformationCard
            onPress={() =>
              navigation
                .getParent()
                ?.navigate('InformationDetail', { id: item.id })
            }
            description={item.description}
            user={item.user}
            title={item.title}
            createdAt={item.createdAt}
            imageCount={item._count.images}
            onDelete={() => {
              deleteMutation.mutate(item.id);
            }}
            onEdit={() => {
              navigation
                .getParent()
                ?.navigate('NewInformation', { id: item.id });
            }}
          />
        )}
      />
    </View>
  );
};

const InformationCard = ({
  authorId,
  title,
  createdAt,
  imageCount,
  onPress,
  onDelete,
  onEdit,
  user,
  description,
}: {
  authorId: number;
  title: string;
  createdAt: Date;
  imageCount: number;
  onPress: () => void;
  onDelete: () => void;
  description: string;
  onEdit: () => void;
  user: any;
}) => {
  const { user: localUser } = useUser();
  const [popup, setPopup] = useState(false);

  const [deletePostConfirm, setDeletePostConfirm] = useState(false);
  return (
    <View style={styles.wrapper}>
      <View style={styles.publisherContainer}>
        <Text variant="bodyMedium" style={styles.publisher}>
          <Text variant="bodyLarge" style={{ color: Colors.primary }}>
            @
          </Text>
          {user?.username}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: 10,
          }}>
          <Text
            variant="bodyMedium"
            style={{ color: Colors.textColorCaptionLight, marginRight: 10 }}>
            {formatDuration(new Date(createdAt))}
          </Text>
          {Number(user?.id) === Number(localUser?.id) && (
            <TouchableOpacity
              style={styles.settingIcon}
              onPress={() => setPopup(true)}>
              <Icon
                size={26}
                name="dots-horizontal"
                color={Colors.textColorPrimary}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={{ marginBottom: 8 }}>
          <Text variant="headlineSmall">{title}</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={{ flexDirection: 'row', marginTop: 4 }}>
          {imageCount > 0 && (
            <Text
              style={{ marginRight: 5, color: Colors.textColorCaption }}
              variant="bodyMedium">
              {`${imageCount} ${pluralize('image', imageCount)}`}
            </Text>
          )}
          {description && (
            <Text
              style={{ marginRight: 5, color: Colors.textColorCaption }}
              variant="bodyMedium">
              with description
            </Text>
          )}
        </View>
      </TouchableWithoutFeedback>
      <PopupActions open={popup} onClose={() => setPopup(false)}>
        <Button
          onPress={() => {
            setPopup(false);
            onEdit();
          }}>
          Edit
        </Button>
        <Button
          outlined
          onPress={() => {
            setPopup(false);
            setDeletePostConfirm(true);
          }}>
          Delete
        </Button>
      </PopupActions>
      <PopupMessage
        onCancel={() => setDeletePostConfirm(false)}
        onConfirm={() => {
          setDeletePostConfirm(false);
          onDelete();
        }}
        open={deletePostConfirm}
        onClose={() => setDeletePostConfirm(false)}
        title={'Delete Information'}
        message={'Are you sure you want to delete this information?'}
      />
    </View>
  );
};

InformationScreen.navigationOptions = () => {
  return {
    header: (props: BottomTabHeaderProps) => {
      return (
        <CustomAppbar
          onBack={() => props.navigation.getParent()?.navigate('Home')}
          title={props.options.headerTitle}
          onAdd={() => props.navigation.navigate('NewInformation')}
        />
      );
    },
  };
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 10,
    marginBottom: '5%',
  },
  ImageContainer: {
    width: 330,
    height: 400,
    marginRight: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.line,
    overflow: 'hidden',
  },
  SingularImageContainer: {
    width: 350,
    height: 400,
    marginRight: 5,
    borderWidth: 1,
    borderColor: Colors.line,
    borderRadius: 10,
    overflow: 'hidden',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  publisher: {
    marginBottom: 2,
  },
  actionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    marginRight: 10,
  },
  actionText: {
    marginLeft: 2,
    fontWeight: 'bold',
  },
  settingIcon: {},
  publisherContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default InformationScreen;
