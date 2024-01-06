import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Stores from '../screens/stores/Stores';
import StoreDetails from '../screens/stores/StoreDetails';

const Stack = createNativeStackNavigator();

export default function AppRoutes() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Stores" component={Stores} />
      <Stack.Screen name="StoreDetails" component={StoreDetails} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
