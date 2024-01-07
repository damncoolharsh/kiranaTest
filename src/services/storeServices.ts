import {StoreItem} from '../screens/stores/common/constants';
import {UserData} from '../types/storeTypes';
import {StoresRef} from './utils/constants';

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
