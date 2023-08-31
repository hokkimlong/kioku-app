import React from 'react';
import { TitleContainer } from '~/components/ui/TitleContainer';
import { AddIconButton } from '../../components/ui/AddIconButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackList } from './Navigator';
import { Button } from '~/components/ui/Button';

type Props = NativeStackScreenProps<HomeStackList, 'Home'>;
const HomeScreen = ({ navigation }: Props) => {
  return (
    <TitleContainer
      title="Activity"
      right={<AddIconButton onPress={() => navigation.push('NewActivity')} />}>
      {Array.from({ length: 5 }).map((item, index) => (
        <Button
          outlined
          onPress={() => navigation.push('ActivityDetail')}
          key={index}>
          View Activity Demo
        </Button>
      ))}
    </TitleContainer>
  );
};

export default HomeScreen;
