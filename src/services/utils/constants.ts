import {firebase} from '@react-native-firebase/database';

export const UserRef = firebase
  .app()
  .database(
    'https://testproject-37d1e-default-rtdb.asia-southeast1.firebasedatabase.app',
  )
  .ref('/users');

export const StoresRef = firebase
  .app()
  .database(
    'https://testproject-37d1e-default-rtdb.asia-southeast1.firebasedatabase.app',
  )
  .ref('/stores');
