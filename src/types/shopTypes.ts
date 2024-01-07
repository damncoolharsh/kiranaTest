import {StoreItem} from '../screens/stores/common/constants';

export type ShopState = {
  shopList: StoreItem[];
  selectedShop: number;
};

export type ShopActions = {
  setShopState: (value: Partial<ShopState>) => void;
};
