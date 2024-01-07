import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppText from '../../common/AppText';
import {screenHeight, screenWidth} from '../../utils/measure';
import {
  NavigationProp,
  RouteProp,
  useFocusEffect,
} from '@react-navigation/native';
import {FilterType, MENU_LIST, StoreItem, UploadItem} from './common/constants';
import MatIcons from 'react-native-vector-icons/MaterialIcons';
import AppButton from '../../common/AppButton';
import AppModal from '../../common/AppModal';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {fetchStoreData, storeImageData} from '../../services/storeServices';
import {useAuthStore} from '../../store/authStore';
import {useShopStore} from '../../store/shopStore';
import {getItem} from '../../utils/helpers';
import {UPLOAD_KEY} from '../../services/utils/constants';
import AppDropdown from '../../common/AppDropdown';
import AppLoading from '../../common/AppLoading';
import auth from '@react-native-firebase/auth';

type Props = {
  navigation: NavigationProp<any>;
  route: RouteProp<{params: {storeData: StoreItem}}, 'params'>;
};

const SHOP_ITEM_HEIGHT = screenHeight * 0.5;
const SHOP_ITEM_WIDTH = screenWidth * 0.8;
export default function StoreDetails(props: Props) {
  const [imageModal, setImageModal] = useState(false);
  const {shopList, selectedShop, setShopState} = useShopStore(state => state);
  const userData = useAuthStore(state => state.userData);
  const storeData = shopList[selectedShop];
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

  const uploadImages = (imageData: ImagePickerResponse) => {
    if (imageData.assets && imageData.assets.length > 0) {
      setImageModal(false);
      storeImageData(storeData, imageData.assets[0]);

      ToastAndroid.showWithGravityAndOffset(
        'Upload started in background for ' + imageData.assets[0].fileName,
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        25,
        50,
      );
    }
  };

  const onImageButtonClick = async (type: 'camera' | 'gallary') => {
    try {
      if (type == 'camera') {
        let result = await launchCamera({mediaType: 'photo'});
        if (result) {
          uploadImages(result);
        }
      } else if (type == 'gallary') {
        let result = await launchImageLibrary({mediaType: 'photo'});
        if (result) {
          uploadImages(result);
        }
      }
    } catch (err: any) {
      console.log(
        '🚀 ~ file: StoreDetails.tsx:44 ~ onImageButtonClick ~ err:',
        err,
      );
      ToastAndroid.show(err.message, ToastAndroid.SHORT);
    }
  };

  const onSelectMenuItem = async (item: FilterType) => {
    if (item.id == 1) {
      props.navigation.navigate('Uploads');
    } else if (item.id == 2) {
      await auth().signOut();
      setAuthState({userData: null});
    }
  };

  const _renderUploadImages = () => {
    return (
      <AppModal
        isVisible={imageModal}
        modalHeading={'Select Images From'}
        onClose={() => setImageModal(false)}>
        <View style={styles.imageUploadView}>
          <TouchableOpacity
            style={{...styles.imageButton, marginRight: 16}}
            onPress={() => onImageButtonClick('camera')}>
            <MatIcons name="camera" size={20} />
            <AppText>Camera</AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.imageButton}
            onPress={() => onImageButtonClick('gallary')}>
            <MatIcons name="image" size={20} />
            <AppText>Gallary</AppText>
          </TouchableOpacity>
        </View>
      </AppModal>
    );
  };

  const _renderHeader = () => {
    return (
      <View style={styles.toolsView}>
        <View style={styles.toolsMain}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => props.navigation.goBack()}>
            <MatIcons name="keyboard-arrow-left" size={24} color={'#000'} />
          </TouchableOpacity>
          <View>
            <AppText fontSize={18} bold color="#000">
              Stores Details
            </AppText>
          </View>
        </View>
        <View style={styles.toolButtons}>
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
    );
  };

  const _renderImages = () => {
    return (
      <View style={styles.imageView}>
        <FlatList
          data={storeData.imageUrl || [{}]}
          horizontal
          bounces={false}
          showsHorizontalScrollIndicator={false}
          snapToInterval={screenWidth}
          renderItem={({item, index}) => {
            return (
              <View style={styles.storeItem}>
                <View style={styles.storeItemHead}>
                  {storeData.imageUrl && storeData.imageUrl.length > 0 ? (
                    <Image
                      source={{uri: item}}
                      style={styles.imageItem}
                      resizeMode="cover"
                    />
                  ) : (
                    <AppText fontSize={14} color="gray">
                      No Images
                    </AppText>
                  )}
                </View>
              </View>
            );
          }}
        />
      </View>
    );
  };

  const _renderDetails = () => {
    return (
      <View style={styles.detailsView}>
        <AppText bold fontSize={16}>
          {storeData.name}
        </AppText>
        <View style={styles.detailsItem}>
          <MatIcons name="store-mall-directory" size={15} />
          <AppText paddingLeft={8} fontSize={14}>
            {storeData.type}
          </AppText>
        </View>
        <View style={styles.detailsItem}>
          <MatIcons name="place" size={15} />
          <AppText paddingLeft={8} fontSize={14}>
            {storeData.area}
          </AppText>
        </View>
        <View style={styles.detailsItem}>
          <MatIcons name="location-city" size={15} />
          <AppText paddingLeft={8} fontSize={14}>
            {storeData.address}
          </AppText>
        </View>
      </View>
    );
  };

  const _renderFooter = () => {
    return (
      <View style={styles.footer}>
        <AppButton label="Upload Image" onPress={() => setImageModal(true)} />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {_renderHeader()}
      {_renderImages()}
      {_renderDetails()}
      {_renderFooter()}
      {_renderUploadImages()}
      <AppLoading loading={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // Tools View
  toolsMain: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toolsView: {
    height: screenHeight * 0.06,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    paddingHorizontal: 16,
  },
  button: {
    paddingRight: 10,
  },
  // Images view
  imageView: {
    marginVertical: 16,
  },
  storeItem: {
    width: screenWidth,
    height: SHOP_ITEM_HEIGHT,
    alignItems: 'center',
  },
  storeItemHead: {
    height: SHOP_ITEM_HEIGHT,
    width: SHOP_ITEM_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EBF1F3',
    borderRadius: 4,
    overflow: 'hidden',
  },
  detailsView: {
    paddingHorizontal: 16,
  },
  detailsItem: {
    flexDirection: 'row',
    paddingTop: 10,
    width: screenWidth * 0.8,
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  imageButton: {
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 2,
    paddingHorizontal: 2,
    width: screenWidth * 0.16,
    borderRadius: 4,
    marginVertical: 16,
    borderColor: 'lightgray',
  },
  imageUploadView: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  imageItem: {
    height: SHOP_ITEM_HEIGHT,
    width: SHOP_ITEM_WIDTH,
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
});
