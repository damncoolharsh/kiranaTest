import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppText from '../../common/AppText';
import AppInput from '../../common/AppInput';
import AppButton from '../../common/AppButton';
import {NavigationProp} from '@react-navigation/native';

type Props = {
  navigation: NavigationProp<any>;
};
export default function Login({navigation}: Props) {
  const onSubmit = () => {
    navigation.navigate('Stores');
  };
  return (
    <View style={styles.container}>
      <AppText bold fontSize={20}>
        Login
      </AppText>
      <AppInput
        placeholder="Enter Username"
        value=""
        containerStyle={styles.inputView}
        onChangeText={text => {}}
      />
      <AppInput
        placeholder="Enter Password"
        value=""
        containerStyle={styles.inputView}
        onChangeText={text => {}}
      />
      <AppButton style={styles.buttonView} label="Login" onPress={onSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  inputView: {
    marginTop: 16,
  },
  buttonView: {
    marginTop: 24,
  },
});
