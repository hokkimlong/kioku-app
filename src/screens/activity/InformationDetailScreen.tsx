import React from 'react';
import { TitleContainer } from '~/components/ui/TitleContainer';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DetailActivityStackList } from './DetailStackNavigator';
import { useInformationById } from '~/services/information';
import { Text } from 'react-native-paper';
import { Image, View } from 'react-native';
import { getS3Image } from '~/utils/s3';

type Props = NativeStackScreenProps<
  DetailActivityStackList,
  'InformationDetail'
>;

const InformationDetailScreen = ({ route }: Props) => {
  const { information } = useInformationById(route.params.id);

  return (
    <TitleContainer title={information?.title}>
      <Text variant="bodyLarge">{information?.description}</Text>
      {information?.images.map(image => {
        return (
          <View style={{ marginBottom: 12 }} key={image.uri}>
            <Image
              source={{ uri: getS3Image(image.uri) }}
              style={{ height: 400, width: '100%' }}
            />
          </View>
        );
      })}
    </TitleContainer>
  );
};

export default InformationDetailScreen;
