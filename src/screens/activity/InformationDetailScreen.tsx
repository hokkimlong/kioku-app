import React, { useEffect, useState } from 'react';
import { TitleContainer } from '~/components/ui/TitleContainer';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DetailActivityStackList } from './DetailStackNavigator';
import { useInformationById } from '~/services/information';
import { Text } from 'react-native-paper';
import { Image, View } from 'react-native';
import { getS3Image } from '~/utils/s3';
import { ScrollView, TouchableWithoutFeedback } from 'react-native';
import Hyperlink from 'react-native-hyperlink';
import { Colors } from '~/utils/color';
import { ImageSlider } from '~/components/thumbnail/postThumbnail';
import { format } from 'date-fns';
import { useSpinner } from '~/components/ui/Spinner';

type Props = NativeStackScreenProps<
  DetailActivityStackList,
  'InformationDetail'
>;

const InformationDetailScreen = ({ route }: Props) => {
  const { openSpinner, closeSpinner } = useSpinner();
  const { information, isLoading } = useInformationById(route.params.id, {
    onSettled: () => {
      closeSpinner();
    },
  });

  useEffect(() => {
    openSpinner();
  }, [route.params.id]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [popupVisible, setPopupVisible] = useState(false);
  return (
    <ScrollView
      style={{ flex: 1, marginHorizontal: 10 }}
      showsVerticalScrollIndicator={false}>
      <Text variant="headlineMedium" style={{ marginBottom: 5 }}>
        {information?.title}
      </Text>
      {!isLoading && (
        <Text variant="bodyMedium">
          <Text variant="bodyLarge" style={{ color: Colors.primary }}>
            @
          </Text>
          {information?.user?.username}
        </Text>
      )}
      {information?.createdAt && (
        <Text
          variant="bodyMedium"
          style={{ marginBottom: 4, color: Colors.textColorCaptionLight }}>
          {format(new Date(information?.createdAt), 'dd MMM, yyyy')}
        </Text>
      )}
      <Hyperlink linkDefault={true} linkStyle={{ color: Colors.primary }}>
        <Text variant="bodyLarge" style={{ marginBottom: 10 }}>
          {information?.description}
        </Text>
      </Hyperlink>
      {information?.images.map((image, index) => {
        return (
          <View
            style={{
              marginBottom: 12,
            }}
            key={image.uri}>
            <TouchableWithoutFeedback
              onPress={() => {
                setActiveIndex(index);
                setPopupVisible(true);
              }}>
              <Image
                source={{ uri: getS3Image(image.uri) }}
                style={{
                  height: 400,
                  width: '100%',
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: Colors.line,
                }}
              />
            </TouchableWithoutFeedback>
          </View>
        );
      })}
      <ImageSlider
        open={popupVisible}
        onClose={() => setPopupVisible(false)}
        images={information?.images ?? []}
        activeIndex={activeIndex}
      />
    </ScrollView>
  );
};

export default InformationDetailScreen;
