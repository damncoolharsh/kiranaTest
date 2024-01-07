import {create} from 'zustand';
import {ShopActions, ShopState} from '../types/shopTypes';

export const useShopStore = create<ShopState & ShopActions>((set, get) => {
  return {
    shopList: [],
    selectedShop: -1,
    setShopState: value => set(value),
  };
});
