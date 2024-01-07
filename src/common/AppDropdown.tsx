import {
  FlatList,
  Modal,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {ReactNode, useState} from 'react';
import AppText from './AppText';
import MatIcons from 'react-native-vector-icons/MaterialIcons';
import {screenHeight} from '../utils/measure';
import AppModal from './AppModal';

type Props = {
  value?: any;
  data: any[];
  dataField?: string;
  placecholder?: string;
  style?: StyleProp<any>;
  children?: ReactNode;
  onSelect?: (value: any) => void;
};
export default function AppDropdown({
  value,
  data = [],
  dataField = 'label',
  placecholder = 'Select Item',
  style,
  children,
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
      <AppModal
        isVisible={isVisible}
        modalHeading={placecholder}
        onClose={() => setIsVisible(false)}>
        <FlatList
          keyExtractor={(item, index) => `dropdown_${index}`}
          data={data}
          renderItem={renderItem}
        />
      </AppModal>
    );
  };
  return (
    <View>
      {children ? (
        <TouchableOpacity style={style} onPress={() => setIsVisible(true)}>
          {children}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[styles.buttonView, style]}
          onPress={() => setIsVisible(true)}>
          <AppText color={value ? '#000' : 'gray'}>
            {value?.[dataField] || placecholder}
          </AppText>
          <MatIcons name="keyboard-arrow-down" size={22} />
        </TouchableOpacity>
      )}
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
