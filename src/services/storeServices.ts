import {Asset, ImagePickerResponse} from 'react-native-image-picker';
import {StoreItem, UploadItem} from '../screens/stores/common/constants';
import {UserData} from '../types/storeTypes';
import {StoresRef, UPLOAD_KEY, UPLOAD_QUEUE} from './utils/constants';
import storage, {FirebaseStorageTypes} from '@react-native-firebase/storage';
import {getItem, setItem} from '../utils/helpers';
import BackgroundService from 'react-native-background-actions';

export const fetchStoreData = async (userData: UserData) => {
  let storeSnapshop = await StoresRef.once('value');
  if (storeSnapshop.exists()) {
    let storesData: StoreItem[] = [];
    let dbStoreData = Object.keys(storeSnapshop.val()).map(item => {
      let storeItem: StoreItem = storeSnapshop.val()[item];
      return {
        ...storeItem,
        key: item,
      };
    });
    dbStoreData.map(store => {
      if (userData.stores.includes(store.key || '')) {
        storesData.push(store);
      }
      return true;
    });
    return storesData;
  }
};

export const storeImageData = async (
  storeData: StoreItem,
  imageFile: Asset,
) => {
  let storeSnapshop = await StoresRef.once('value');
  if (storeSnapshop.exists() && imageFile) {
    let uploadFiles: UploadItem[] = (await getItem(UPLOAD_KEY)) || [];
    if (uploadFiles.length > 0) {
      let uploadPending = (await getItem(UPLOAD_QUEUE)) || [];
      uploadPending.push({storeData, imageFile});
      setItem(UPLOAD_QUEUE, uploadPending);
      return;
    }
    const imageId = Date.now().toString(36);
    const imageRef = storage().ref(`${storeData.key}/${imageFile.fileName}`);
    const uploadTracker = imageRef.putFile(imageFile.uri || '');
    uploadTracker.on(
      'state_changed',
      state => handleProgress(state, imageFile, imageId, uploadFiles),
      error => console.log('🚀 ~ file: storeServices.ts:58 ~ error:', error),
      () => handleSuccess(imageRef, storeData, imageId),
    );
  }
};

const handleProgress = async (
  state: FirebaseStorageTypes.TaskSnapshot,
  imageFile: Asset,
  imageId: string,
  uploadFiles: UploadItem[],
) => {
  var progress = (state.bytesTransferred / state.totalBytes) * 100;
  var uploadData: UploadItem = {
    fileName: imageFile.fileName || '',
    progress: progress,
    id: imageId,
  };
  console.log('🚀 ~ file: storeServices.ts:67 ~ uploadData:', uploadData);

  // Saving progress in async storage
  let index = uploadFiles.findIndex(val => val.id == imageId);
  if (index < 0) {
    uploadFiles.push(uploadData);
  } else {
    uploadFiles[index] = uploadData;
  }
  setItem(UPLOAD_KEY, uploadFiles);
};

const handleSuccess = async (
  imageRef: FirebaseStorageTypes.Reference,
  storeData: StoreItem,
  imageId: string,
) => {
  try {
    let downloadUrl = await imageRef.getDownloadURL();
    let imageData = storeData.imageUrl ? [...storeData.imageUrl] : [];
    imageData.push(downloadUrl);
    if (storeData.key) {
      await StoresRef.child(storeData.key).set({
        ...storeData,
        imageUrl: imageData,
      });
    }
    // Update local storage
    let uploadFiles: UploadItem[] = (await getItem(UPLOAD_KEY)) || [];
    let index = uploadFiles.findIndex(val => val.id === imageId);
    if (index !== -1) {
      uploadFiles.splice(index, 1);
      await setItem(UPLOAD_KEY, uploadFiles);
      // Execute next in queue
      let uploadPending: any[] = (await getItem(UPLOAD_QUEUE)) || [];
      if (uploadPending.length > 0) {
        storeData.imageUrl = imageData;
        let fileToUpload = uploadPending.splice(0, 1);
        await setItem(UPLOAD_QUEUE, uploadPending);
        storeImageData(storeData, fileToUpload[0].imageFile);
      } else {
        await BackgroundService.stop();
        console.log('🚀 ~ file: storeServices.ts:110 ~ imageFile:-------');
      }
    }
  } catch (err: any) {
    console.log('🚀 ~ file: storeServices.ts:91 ~ err:', err);
    setItem(UPLOAD_KEY, []);
    setItem(UPLOAD_QUEUE, []);
    await BackgroundService.stop();
  }
};
