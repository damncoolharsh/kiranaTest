import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import login_routes from './loginRoutes';
import LoginRoutes from './loginRoutes';
import AppRoutes from './appRoutes';
import {useAuthStore} from '../store/authStore';
import auth from '@react-native-firebase/auth';
import {getUserDataByEmail} from '../services/authServices';
import {requestPermission} from '../utils/helpers';
import AppLoading from '../common/AppLoading';

export default function Routes() {
  let userData = useAuthStore(state => state.userData);
  let setAuthState = useAuthStore(state => state.setAuthState);
  let [splash, setSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      auth().onAuthStateChanged(async user => {
        if (user) {
          const data = await getUserDataByEmail(user.email || '');
          if (data) {
            setAuthState({userData: data});
          }
        }
        setSplash(false);
      });
    }, 400);
    requestPermission();
  }, []);

  if (splash) {
    return (
      <View style={styles.main}>
        <AppLoading loading={splash} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {userData ? <AppRoutes /> : <LoginRoutes />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
