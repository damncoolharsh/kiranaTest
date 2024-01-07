import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Stores from '../screens/stores/Stores';
import StoreDetails from '../screens/stores/StoreDetails';
import Uploads from '../screens/stores/Uploads';

const Stack = createNativeStackNavigator();

export default function AppRoutes() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Stores" component={Stores} />
      <Stack.Screen name="StoreDetails" component={StoreDetails} />
      <Stack.Screen name="Uploads" component={Uploads} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
