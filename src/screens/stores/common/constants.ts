import {Asset} from 'react-native-image-picker';

export const MOCK_DATA = [
  {
    type: 'General Store',
    name: 'U1_HARE KIRANA AND GENERAL',
    route: 'r4',
    area: 'Koramangla',
    imageUrl: [''],
    address:
      'RADHA KISHAN HARE KIRANA AND GENERAL Ramghat Road, Vishnupuri, Near water tank, sector 5C, Agra, UP',
  },
  {
    type: 'General Store',
    name: 'U1_HARE KIRANA AND GENERAL',
    route: 'r4',
    area: 'Koramangla',
    address:
      'RADHA KISHAN HARE KIRANA AND GENERAL Ramghat Road, Vishnupuri, Near water tank, sector 5C, Agra, UP',
  },
  {
    type: 'General Store',
    name: 'U1_HARE KIRANA AND GENERAL',
    route: 'r4',
    area: 'Koramangla',
    address:
      'RADHA KISHAN HARE KIRANA AND GENERAL Ramghat Road, Vishnupuri, Near water tank, sector 5C, Agra, UP',
  },
  {
    type: 'General Store',
    name: 'U1_HARE KIRANA AND GENERAL',
    route: 'r4',
    area: 'Koramangla',
    address:
      'RADHA KISHAN HARE KIRANA AND GENERAL Ramghat Road, Vishnupuri, Near water tank, sector 5C, Agra, UP',
  },
  {
    type: 'General Store',
    name: 'U1_HARE KIRANA AND GENERAL',
    route: 'r4',
    area: 'Koramangla',
    address:
      'RADHA KISHAN HARE KIRANA AND GENERAL Ramghat Road, Vishnupuri, Near water tank, sector 5C, Agra, UP',
  },
  {
    type: 'General Store',
    name: 'U1_HARE KIRANA AND GENERAL',
    route: 'r4',
    area: 'Koramangla',
    address:
      'RADHA KISHAN HARE KIRANA AND GENERAL Ramghat Road, Vishnupuri, Near water tank, sector 5C, Agra, UP',
  },
  {
    type: 'General Store',
    name: 'U1_HARE KIRANA AND GENERAL',
    route: 'r4',
    area: 'Koramangla',
    address:
      'RADHA KISHAN HARE KIRANA AND GENERAL Ramghat Road, Vishnupuri, Near water tank, sector 5C, Agra, UP',
  },
];

export const FILTER_TYPE = [
  {id: 1, label: 'Area'},
  {id: 2, label: 'Store Type'},
  {id: 3, label: 'Route'},
];

export const MENU_LIST = [
  {id: 1, label: 'Uploads'},
  {id: 2, label: 'Logout'},
];

export const MOCK_UPLOAD = [{id: 1, fileName: 'abcd.png', progress: 10}];
export type StoreItem = {
  type: string;
  name: string;
  route: string;
  area: string;
  address: string;
  imageUrl: string[];
  key?: string;
};
export type FilterType = (typeof FILTER_TYPE)[number];
export type UploadItem = {
  id: string;
  fileName: string;
  progress: number;
};

export type UploadPending = {
  storeData: StoreItem;
  imageFile: Asset;
};
