import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppText from '../../common/AppText';
import MatIcons from 'react-native-vector-icons/MaterialIcons';
import {screenHeight} from '../../utils/measure';
import {NavigationProp} from '@react-navigation/native';
import {MOCK_UPLOAD, UploadItem, UploadPending} from './common/constants';
import {getItem} from '../../utils/helpers';
import {UPLOAD_KEY, UPLOAD_QUEUE} from '../../services/utils/constants';

type Props = {
  navigation: NavigationProp<any>;
};
export default function Uploads(props: Props) {
  const [uploads, setUploads] = useState<UploadItem[]>([]);
  const [uploadPending, setUploadPending] = useState<UploadPending[]>([]);

  useEffect(() => {
    getItem(UPLOAD_KEY).then(result => setUploads(result));
    getItem(UPLOAD_QUEUE).then(result => setUploadPending(result));
  }, [uploads]);

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
            Uploads
          </AppText>
        </View>
      </View>
    );
  };

  const renderUploadItem = ({
    item,
    index,
  }: {
    item: UploadItem;
    index: number;
  }) => {
    return (
      <View style={styles.uploadItem}>
        <AppText fontSize={14}>{item.fileName}</AppText>
        <View style={styles.progressView}>
          <View style={{...styles.progressLine, width: `${item.progress}%`}} />
        </View>
        <View style={styles.progressValues}>
          <AppText>{Math.round(item.progress)}%</AppText>
        </View>
      </View>
    );
  };

  const renderPendingItem = ({
    item,
    index,
  }: {
    item: UploadPending;
    index: number;
  }) => {
    return (
      <View style={styles.uploadItem}>
        <AppText fontSize={14}>{item.imageFile.fileName}</AppText>
        <View style={styles.progressView}>
          <View style={{...styles.progressLine, width: `0%`}} />
        </View>
        <View style={styles.progressValues}>
          <AppText color="gray">Upload Pending</AppText>
        </View>
      </View>
    );
  };

  const _renderUploadItem = () => {
    return (
      <View>
        {uploads?.length > 0 || uploadPending?.length > 0 ? (
          <FlatList
            keyExtractor={(item, index) => `uploadItem_${index}`}
            data={uploads}
            renderItem={renderUploadItem}
          />
        ) : (
          <View style={styles.noItems}>
            <AppText color="gray" fontSize={14}>
              No uploads in progress
            </AppText>
          </View>
        )}
        <FlatList
          keyExtractor={(item, index) => `uploadItemPending_${index}`}
          data={uploadPending}
          renderItem={renderPendingItem}
        />
      </View>
    );
  };

  return (
    <View>
      {_renderHeader()}
      {_renderUploadItem()}
    </View>
  );
}

const styles = StyleSheet.create({
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
  uploadItem: {
    marginHorizontal: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'lightgray',
    marginTop: 14,
    borderRadius: 8,
  },
  progressView: {
    width: '100%',
    height: 5,
    backgroundColor: 'lightgray',
    marginTop: 10,
  },
  progressLine: {
    height: 5,
    width: '50%',
    backgroundColor: 'blue',
  },
  progressValues: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  noItems: {
    alignItems: 'center',
    marginTop: 40,
  },
});
