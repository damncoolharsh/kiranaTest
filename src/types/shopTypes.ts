export type ShopState = {
  shopList: ShopItem[];
};

export type ShopItem = {
  address: string;
  area: string;
  name: string;
  route: string;
  type: string;
  imageUrl?: string;
};

export type ShopActions = {
  setShopState: (value: Partial<ShopState>) => void;
};
