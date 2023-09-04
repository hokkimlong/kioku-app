import React from 'react';
import TextBox from '~/components/textBox/text-box';
import { TitleContainer } from '~/components/ui/TitleContainer';

const NotificationScreen = () => {
  return (
    <TitleContainer
      title="Notification"
      description="Let's start a new adventure">
      <TextBox />
      <TextBox />
      <TextBox />
    </TitleContainer>
  );
};

export default NotificationScreen;
