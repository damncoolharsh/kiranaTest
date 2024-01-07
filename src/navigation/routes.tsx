import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import login_routes from './loginRoutes';
import LoginRoutes from './loginRoutes';
import AppRoutes from './appRoutes';
import {useAuthStore} from '../store/authStore';

export default function Routes() {
  let userData = useAuthStore(state => state.userData);

  return (
    <NavigationContainer>
      {userData ? <AppRoutes /> : <LoginRoutes />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
