import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {screenHeight, screenWidth} from '../../utils/measure';
import AppText from '../../common/AppText';
import MatIcons from 'react-native-vector-icons/MaterialIcons';
import AppInput from '../../common/AppInput';
import AppDropdown from '../../common/AppDropdown';
import {NavigationProp, useFocusEffect} from '@react-navigation/native';
import {
  FILTER_TYPE,
  FilterType,
  MENU_LIST,
  StoreItem,
  UploadItem,
} from './common/constants';
import {fetchStoreData} from '../../services/storeServices';
import {useAuthStore} from '../../store/authStore';
import {useShopStore} from '../../store/shopStore';
import {getItem} from '../../utils/helpers';
import {UPLOAD_KEY} from '../../services/utils/constants';
import AppLoading from '../../common/AppLoading';
import auth from '@react-native-firebase/auth';

type Props = {
  navigation: NavigationProp<any>;
};

const SHOP_WIDTH = screenWidth * 0.44;
const SHOP_HEIGHT = SHOP_WIDTH * 1.3;
const SHOP_ITEM_HEADER = SHOP_HEIGHT * 0.55;
const SHOP_ITEM_FOOTER = SHOP_HEIGHT * 0.45;

export default function Stores(props: Props) {
  const {shopList, setShopState} = useShopStore(state => state);
  const [isSearch, setIsSearch] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [filterType, setFilterType] = useState<FilterType>();
  const [filterValueList, setFitlerValueList] = useState<FilterType[]>([]);
  const [filterValue, setFilterValue] = useState<FilterType>();
  const userData = useAuthStore(state => state.userData);
  const [loading, setLoading] = useState(false);
  const setAuthState = useAuthStore(state => state.setAuthState);

  useFocusEffect(
    React.useCallback(() => {
      getInitialData();
    }, []),
  );

  const getInitialData = async () => {
    setLoading(true);
    try {
      if (!userData) return;
      let storeData = await fetchStoreData(userData);
      if (storeData) {
        setShopState({shopList: storeData});
      }
    } catch (err) {
      console.log('🚀 ~ file: Stores.tsx:50 ~ getInitialData ~ err:', err);
    }
    setLoading(false);
  };

  const getFilteredList = () => {
    let newList = [...shopList];
    if (keyword.length > 0) {
      newList = shopList.filter(item =>
        item.name.toLowerCase().includes(keyword.toLowerCase()),
      );
    }
    if (filterValue && filterType) {
      let dataKey: 'area' | 'type' | 'route';
      switch (filterType?.id) {
        case 1:
          dataKey = 'area';
          break;
        case 2:
          dataKey = 'type';
          break;
        case 3:
          dataKey = 'route';
          break;
      }
      newList = newList.filter(
        item => item[dataKey].toLowerCase() == filterValue.label.toLowerCase(),
      );
    }
    return newList;
  };

  const onPressItem = (index: number) => {
    setShopState({selectedShop: index});
    props.navigation.navigate('StoreDetails');
  };

  const onSelectFilterType = (item: FilterType) => {
    let newStoreList: FilterType[] = [];
    let index = 1;
    let dataKey: 'area' | 'type' | 'route';
    switch (item.id) {
      case 1:
        dataKey = 'area';
        break;
      case 2:
        dataKey = 'type';
        break;
      case 3:
        dataKey = 'route';
        break;
    }
    shopList.map(item => {
      if (
        !newStoreList.some(
          val => val.label.toLowerCase() === item[dataKey].toLowerCase(),
        )
      ) {
        newStoreList.push({
          id: index,
          label: item[dataKey],
        });
      }
    });
    setFitlerValueList(newStoreList);
    setFilterType(item);
    setFilterValue(undefined);
  };

  const onSelectMenuItem = async (item: FilterType) => {
    if (item.id == 1) {
      props.navigation.navigate('Uploads');
    } else if (item.id == 2) {
      await auth().signOut();
      setAuthState({userData: null});
    }
  };

  const _renderToolbar = () => {
    return (
      <View style={styles.toolsMain}>
        <View style={styles.toolsView}>
          <AppText fontSize={18} bold color="#000">
            Stores
          </AppText>
          <View style={styles.toolButtons}>
            <TouchableOpacity
              onPress={() => [setIsSearch(!isSearch), setKeyword('')]}
              style={{
                ...styles.toolButton,
                borderBottomColor: isSearch ? '#1212b5' : '#fff',
              }}>
              <MatIcons
                name="search"
                size={22}
                color={isSearch ? '#1212b5' : undefined}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => [
                setIsFilter(!isFilter),
                setFilterType(undefined),
                setFilterType(undefined),
              ]}
              style={{
                ...styles.toolButton,
                borderBottomColor: isFilter ? '#1212b5' : '#fff',
              }}>
              <MatIcons
                name="filter-alt"
                size={22}
                color={isFilter ? '#1212b5' : undefined}
              />
            </TouchableOpacity>
            <AppDropdown
              data={MENU_LIST}
              placecholder="Options"
              style={{
                ...styles.toolButton,
                borderBottomColor: '#fff',
              }}
              onSelect={item => onSelectMenuItem(item)}>
              <MatIcons name="more-vert" size={22} />
            </AppDropdown>
          </View>
        </View>
        <View>
          {isSearch && (
            <View style={styles.searchView}>
              <AppInput
                value={keyword}
                inputStyle={styles.inputStyle}
                placeholder="Search Store"
                onChangeText={text => setKeyword(text)}
              />
            </View>
          )}
          {isFilter && (
            <View style={styles.filterView}>
              <AppDropdown
                value={filterType}
                data={FILTER_TYPE}
                style={styles.dropdown}
                placecholder="Select Type"
                onSelect={item => {
                  onSelectFilterType(item);
                }}
              />
              <AppDropdown
                value={filterValue}
                data={filterValueList}
                style={styles.dropdown}
                placecholder="Select Value"
                onSelect={item => {
                  setFilterValue(item);
                }}
              />
            </View>
          )}
        </View>
      </View>
    );
  };

  const renderStoreItem = ({item, index}: {item: StoreItem; index: number}) => {
    return (
      <TouchableOpacity
        style={{...styles.storeItemView}}
        onPress={() => onPressItem(index)}>
        <View style={styles.storeItemHead}>
          {item.imageUrl ? (
            <Image source={{uri: item.imageUrl[0]}} style={styles.imageView} />
          ) : (
            <AppText fontSize={14} color="gray">
              No Images
            </AppText>
          )}
        </View>
        <View style={styles.storeItemFooter}>
          <AppText bold paddingBottom={4}>
            {item.name}
          </AppText>
          <AppText paddingBottom={2}>{item.type}</AppText>
          <AppText>{item.area}</AppText>
        </View>
      </TouchableOpacity>
    );
  };

  const filteredList = getFilteredList();

  return (
    <View style={styles.container}>
      {_renderToolbar()}
      <View style={styles.main}>
        {shopList.length > 0 ? (
          <FlatList
            columnWrapperStyle={styles.listWrapper}
            contentContainerStyle={styles.listView}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            data={filteredList}
            renderItem={renderStoreItem}
          />
        ) : (
          <View style={styles.noData}>
            <AppText color="gray" fontSize={14}>
              No Stores Found
            </AppText>
          </View>
        )}
      </View>
      <AppLoading loading={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  main: {
    paddingHorizontal: 16,
  },
  listView: {
    paddingBottom: 40,
  },
  listWrapper: {
    justifyContent: 'space-between',
  },
  // Store Item
  storeItemView: {
    width: SHOP_WIDTH,
    height: SHOP_HEIGHT,
    backgroundColor: '#EBF1F3',
    marginTop: 24,
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  storeItemHead: {
    height: SHOP_ITEM_HEADER,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageView: {
    height: SHOP_ITEM_HEADER,
    width: '100%',
  },
  storeItemFooter: {
    height: SHOP_ITEM_FOOTER,
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 4,
    justifyContent: 'center',
  },
  // Tools View
  toolsMain: {
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  toolsView: {
    height: screenHeight * 0.06,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toolButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toolButton: {
    marginLeft: 10,
    borderBottomWidth: 2,
    padding: 4,
  },
  inputStyle: {
    fontSize: 12,
    paddingVertical: 4,
  },
  searchView: {
    marginBottom: 16,
  },
  filterView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 16,
  },
  dropdown: {
    width: screenWidth * 0.44,
  },
  noData: {
    alignItems: 'center',
    marginTop: 40,
  },
});
