import auth from '@react-native-firebase/auth';
import {UserRef} from './utils/constants';
import {UserData} from '../types/storeTypes';

export const logInUser = async (email: string, password: string) => {
  let user = await auth().signInWithEmailAndPassword(email, password);
  if (user) {
    let userSnapshot = await UserRef.orderByChild('email')
      .equalTo(email)
      .once('value');
    if (userSnapshot.val()) {
      let userData: UserData | undefined;
      userSnapshot.forEach(child => {
        userData = child.val();
        return true;
      });
      return userData;
    }
  }
};
