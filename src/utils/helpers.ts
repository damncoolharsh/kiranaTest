import AsyncStorage from '@react-native-async-storage/async-storage';
import {PermissionsAndroid, ToastAndroid} from 'react-native';

export const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

export const setItem = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log('🚀 ~ file: helpers.ts:9 ~ setItem ~ error:', error);
  }
};

export const getItem = async (key: string) => {
  try {
    const result = await AsyncStorage.getItem(key);
    if (result) return JSON.parse(result);
  } catch (error) {
    console.log('🚀 ~ file: helpers.ts:9 ~ setItem ~ error:', error);
  }
};

export const requestNotificationPermission = async () => {
  const result = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  );
  return result;
};

export const checkNotificationPermission = async () => {
  const result = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  );
  return result;
};

export const requestPermission = async () => {
  const checkPermission = await checkNotificationPermission();
  if (!checkPermission) {
    const request = await requestNotificationPermission();
    if (!request) {
      ToastAndroid.show('Permission Not Granted', ToastAndroid.SHORT);
    }
  }
};
