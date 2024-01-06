import {
  FlatList,
  Modal,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import AppText from './AppText';
import MatIcons from 'react-native-vector-icons/MaterialIcons';
import {screenHeight} from '../utils/measure';

type Props = {
  value: any;
  data: any[];
  dataField?: string;
  placecholder?: string;
  style?: StyleProp<any>;
  onSelect?: (value: any) => void;
};
export default function AppDropdown({
  value,
  data = [],
  dataField = 'label',
  placecholder = 'Select Item',
  style,
  onSelect = () => {},
}: Props) {
  const [isVisible, setIsVisible] = useState(false);

  const onSelectItem = (item: any) => {
    setIsVisible(false);
    onSelect(item);
  };

  const renderItem = ({item, index}: {item: any; index: number}) => {
    return (
      <TouchableOpacity
        style={{...styles.listItem, borderTopWidth: index == 0 ? 0 : 1}}
        onPress={() => onSelectItem(item)}>
        <AppText color="#000" fontSize={13}>
          {item?.[dataField]}
        </AppText>
        <MatIcons name="keyboard-arrow-right" size={20} />
      </TouchableOpacity>
    );
  };

  const _renderDropdown = () => {
    return (
      <Modal
        visible={isVisible}
        animationType="fade"
        onDismiss={() => setIsVisible(false)}
        transparent>
        <View style={styles.modalBack}>
          <TouchableOpacity
            style={styles.modalClose}
            onPress={() => setIsVisible(false)}>
            <MatIcons name="close" size={20} color="#fff" />
          </TouchableOpacity>
          <View style={styles.modalContent}>
            <AppText fontSize={16} bold color="#000" paddingBottom={10}>
              {placecholder}
            </AppText>
            <FlatList data={data} renderItem={renderItem} />
          </View>
        </View>
      </Modal>
    );
  };
  return (
    <View>
      <TouchableOpacity
        style={[styles.buttonView, style]}
        onPress={() => setIsVisible(true)}>
        <AppText color={value ? '#000' : undefined}>
          {value?.[dataField] || placecholder}
        </AppText>
        <MatIcons name="keyboard-arrow-down" size={22} />
      </TouchableOpacity>
      {_renderDropdown()}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonView: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'lightgray',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  // Modal
  modalBack: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    maxHeight: screenHeight * 0.5,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalClose: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 6,
    alignSelf: 'flex-end',
    borderRadius: 99,
    marginBottom: 10,
    marginRight: 16,
  },
  listItem: {
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
});
