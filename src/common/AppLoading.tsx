import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {ReactNode} from 'react';
import MatIcons from 'react-native-vector-icons/MaterialIcons';
import AppText from './AppText';
import {screenHeight} from '../utils/measure';

type Props = {
  loading: boolean;
};
export default function AppLoading({loading}: Props) {
  return (
    <Modal visible={loading} animationType="fade" transparent>
      <View style={styles.modalBack}>
        <ActivityIndicator size={40} color={'blue'} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  // Modal
  modalBack: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
