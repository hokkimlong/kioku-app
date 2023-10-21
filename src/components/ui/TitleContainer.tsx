import React, { PropsWithChildren, ReactNode } from 'react';
import { View, StyleSheet, Keyboard } from 'react-native';
import { Title } from './Title';
import { Description } from './Description';
import { Container } from './Container';

type FormContainerProps = PropsWithChildren<{
  title: string | undefined;
  description?: string;
  right?: ReactNode;
  scroll?: boolean;
}>;

export const TitleContainer = ({
  title,
  description,
  children,
  right,
  scroll,
}: FormContainerProps) => {
  return (
    <Container scroll={scroll} onPress={Keyboard.dismiss}>
      {title && (
        <View style={formStyle.title}>
          <Title>{title}</Title>
          {right && right}
        </View>
      )}
      {description && <Description>{description}</Description>}
      {children && <View style={formStyle.content}>{children}</View>}
    </Container>
  );
};

const formStyle = StyleSheet.create({
  content: {
    paddingTop: 12,
    flex: 1,
  },
  title: {
    // minHeight: 62,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
