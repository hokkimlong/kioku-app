import React from 'react';
import { TitleContainer } from '~/components/ui/TitleContainer';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DetailActivityStackList } from './DetailStackNavigator';
import { useInformationById } from '~/services/information';
import { Text } from 'react-native-paper';

type Props = NativeStackScreenProps<
  DetailActivityStackList,
  'InformationDetail'
>;

const InformationDetailScreen = ({ route }: Props) => {
  const { information } = useInformationById(route.params.id);

  return (
    <TitleContainer title={information?.title}>
      <Text variant="bodyLarge">{information?.description}</Text>
    </TitleContainer>
  );
};

export default InformationDetailScreen;
