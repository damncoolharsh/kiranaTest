import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import AppText from '../../common/AppText';
import {screenHeight, screenWidth} from '../../utils/measure';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {StoreItem} from './common/constants';
import MatIcons from 'react-native-vector-icons/MaterialIcons';
import AppButton from '../../common/AppButton';

type Props = {
  navigation: NavigationProp<any>;
  route: RouteProp<{params: {storeData: StoreItem}}, 'params'>;
};

const SHOP_ITEM_HEIGHT = screenHeight * 0.5;
const SHOP_ITEM_WIDTH = screenWidth * 0.8;
export default function StoreDetails(props: Props) {
  const storeData = props.route.params.storeData;

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
        <AppButton label="Upload Images" onPress={() => {}} />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {_renderHeader()}
      {_renderImages()}
      {_renderDetails()}
      {_renderFooter()}
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
});
