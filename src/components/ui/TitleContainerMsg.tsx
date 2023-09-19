import React from 'react';
import { Dimensions } from 'react-native';
import { View, ScrollView, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Text } from 'react-native-paper';
import TextBox from '~/components/textBox/text-box';
import TextInputButton from '~/components/textBox/text-input';
import { chatLog } from '~/utils/temp/chatLog';

type TitleContainerMsgProps = {
  title: string | undefined;
  mutation: any;
  route: any;
};

const TitleContainerMsg = ({
  title,
  mutation,
  route,
}: TitleContainerMsgProps) => {
  const sendMessage = (value: string) => {
    console.log(value);
  };

  let deviceHeight = Dimensions.get('window').height;
  let titleHeight = (5 / 100) * deviceHeight;
  // let isTitle = title !== undefined ? 79 : 79;
  let scrollViewHeight = (79 / 100) * deviceHeight;

  return (
    <KeyboardAwareScrollView style={styles.wrapper}>
      {title !== undefined && (
        <View
          style={{
            height: titleHeight,
            display: 'flex',
            justifyContent: 'center',
          }}>
          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{title}</Text>
        </View>
      )}

      <ScrollView
        style={{ height: scrollViewHeight }}
        ref={ref => (this.scrollView = ref)}
        onContentSizeChange={() => {
          this.scrollView.scrollToEnd({ animated: true });
        }}>
        <View>
          {chatLog?.map(item => (
            <TextBox
              key={item.id}
              item={item}
              isUser={item.isUser}
              isComment={true}
              isNotification={false}
            />
          ))}
        </View>
      </ScrollView>
      <TextInputButton
        onSend={value => {
          mutation.mutate({
            postId: route.params.postId,
            message: value,
          });
          sendMessage(value);
        }}
      />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    paddingHorizontal: '5%',
  },
});

export default TitleContainerMsg;
