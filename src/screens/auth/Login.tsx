import {StyleSheet, Text, ToastAndroid, View} from 'react-native';
import React, {useState} from 'react';
import AppText from '../../common/AppText';
import AppInput from '../../common/AppInput';
import AppButton from '../../common/AppButton';
import {NavigationProp} from '@react-navigation/native';
import {emailRegex} from '../../utils/helpers';
import {logInUser} from '../../services/authServices';
import {useAuthStore} from '../../store/authStore';
import AppLoading from '../../common/AppLoading';

type Props = {
  navigation: NavigationProp<any>;
};
export default function Login({navigation}: Props) {
  const [showError, setShowError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const setAuthState = useAuthStore(state => state.setAuthState);

  const onSubmit = async () => {
    setLoading(true);
    try {
      if (emailRegex.test(email) && password.length > 3) {
        let userData = await logInUser(email, password);
        console.log('🚀 ~ file: Login.tsx:27 ~ onSubmit ~ userData:', userData);
        if (userData) {
          setAuthState({userData: userData});
        }
      } else {
        setShowError(true);
      }
    } catch (e: any) {
      console.log(e.message);
      ToastAndroid.show(e.message, ToastAndroid.LONG);
    }
    setLoading(false);
  };
  return (
    <View style={styles.container}>
      <AppText bold fontSize={20}>
        Login
      </AppText>
      <AppInput
        placeholder="Enter Email"
        value={email}
        containerStyle={styles.inputView}
        onChangeText={text => [setEmail(text), setShowError(false)]}
        error={
          showError && !emailRegex.test(email) ? 'Enter valid email' : undefined
        }
      />
      <AppInput
        placeholder="Enter Password"
        value={password}
        secureTextEntry={true}
        containerStyle={styles.inputView}
        onChangeText={text => [setPassword(text), setShowError(false)]}
        error={
          showError && password.length < 3 ? 'Enter valid password' : undefined
        }
      />
      <AppButton style={styles.buttonView} label="Login" onPress={onSubmit} />
      <AppLoading loading={loading} />
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
