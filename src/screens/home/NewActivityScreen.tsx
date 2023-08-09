import React from 'react';
import { ScrollView, View, Image } from 'react-native';
import { Input, Label } from '~/components/form/Input';
import { TitleContainer } from '~/components/ui/TitleContainer';
import { FormProvider, useForm } from 'react-hook-form';
import { Button } from '~/components/ui/Button';
import { AddIconButton } from '~/components/ui/AddIconButton';
import { Container } from '~/components/ui/Container';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const NewActivityScreen = () => {
  const methods = useForm();
  return (
    <View>
      <FormProvider {...methods}>
        <TitleContainer
          title="New Activity"
          description="Let's start a new adventure">
          <Input
            name="name"
            label="Activity Name"
            placeholder="Enter your activity name"
          />
        </TitleContainer>
      </FormProvider>
      <ImagePicker />
      <Container>
        <View style={{ flex: 1 }} />
        <Button outlined>Next</Button>
      </Container>
    </View>
  );
};

const ImagePicker = () => {
  return (
    <>
      <View style={{ marginLeft: 28 }}>
        <Label label="Add New Image" />
      </View>
      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingRight: 28,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{ marginLeft: 20 }}>
          <AddIconButton
            size={115}
            onPress={() => {
              launchCamera({}, () => {
                console.log('success');
              });
            }}
          />
        </View>
        {Array.from({ length: 10 }).map(item => (
          <View
            style={{
              marginLeft: 12,
              borderRadius: 20,
              width: 160,
              height: 130,
              flex: 1,
              overflow: 'hidden',
            }}>
            <Image
              style={{ width: 160, height: 130, objectFit: 'cover' }}
              source={{
                uri: 'https://reactnative.dev/img/tiny_logo.png',
              }}
            />
          </View>
        ))}
      </ScrollView>
    </>
  );
};

export default NewActivityScreen;
