import React, { PropsWithChildren } from 'react';
import { View, StyleSheet, Keyboard } from 'react-native';
import { Title } from './Title';
import { Description } from './Description';
import { Container } from './Container';

type FormContainerProps = PropsWithChildren<{
  title: string;
  description: string;
}>;

export const FormContainer = ({
  title,
  description,
  children,
}: FormContainerProps) => {
  return (
    <Container onPress={Keyboard.dismiss}>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <View style={formStyle.content}>{children}</View>
    </Container>
  );
};

const formStyle = StyleSheet.create({
  content: {
    paddingVertical: 12,
    flex: 1,
  },
});
