import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import login_routes from './loginRoutes';
import LoginRoutes from './loginRoutes';
import AppRoutes from './appRoutes';

export default function Routes() {
  let userData = true;
  return (
    <NavigationContainer>
      {userData ? <AppRoutes /> : <LoginRoutes />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
