import {firebase} from '@react-native-firebase/database';

const database = firebase
  .app()
  .database(
    'https://testproject-37d1e-default-rtdb.asia-southeast1.firebasedatabase.app',
  );
export const UserRef = database.ref('/users');

export const StoresRef = database.ref('/stores');

export const UPLOAD_KEY = 'upload_data';
export const UPLOAD_QUEUE = 'upload_queue';
