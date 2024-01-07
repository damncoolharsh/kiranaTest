import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import AppText from '../../common/AppText';
import {screenHeight, screenWidth} from '../../utils/measure';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {StoreItem} from './common/constants';
import MatIcons from 'react-native-vector-icons/MaterialIcons';
import AppButton from '../../common/AppButton';
import AppModal from '../../common/AppModal';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

type Props = {
  navigation: NavigationProp<any>;
  route: RouteProp<{params: {storeData: StoreItem}}, 'params'>;
};

const SHOP_ITEM_HEIGHT = screenHeight * 0.5;
const SHOP_ITEM_WIDTH = screenWidth * 0.8;
export default function StoreDetails(props: Props) {
  const storeData = props.route.params.storeData;
  const [imageModal, setImageModal] = useState(false);

  const uploadImages = (imageData: ImagePickerResponse) => {
    console.log(
      '🚀 ~ file: StoreDetails.tsx:36 ~ StoreDetails ~ imageData:',
      imageData,
    );
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
    );
  };

  const _renderImages = () => {
    return (
      <View style={styles.imageView}>
        <FlatList
          data={[{}, {}, {}]}
          horizontal
          bounces={false}
          showsHorizontalScrollIndicator={false}
          snapToInterval={screenWidth}
          renderItem={({item, index}) => {
            return (
              <View style={styles.storeItem}>
                <View style={styles.storeItemHead}>
                  {storeData.imageUrl ? (
                    <Image source={{uri: storeData.imageUrl}} />
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
        <AppButton label="Upload Images" onPress={() => setImageModal(true)} />
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
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    flexDirection: 'row',
    height: screenHeight * 0.06,
    alignItems: 'center',
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
});
