import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {ReactNode} from 'react';
import MatIcons from 'react-native-vector-icons/MaterialIcons';
import AppText from './AppText';
import {screenHeight} from '../utils/measure';

type Props = {
  isVisible: boolean;
  children: ReactNode;
  modalHeading: string;
  onClose: () => void;
};
export default function AppModal({
  children,
  isVisible,
  modalHeading,
  onClose,
}: Props) {
  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      onDismiss={() => onClose()}
      transparent>
      <View style={styles.modalBack}>
        <TouchableOpacity style={styles.modalClose} onPress={() => onClose()}>
          <MatIcons name="close" size={20} color="#fff" />
        </TouchableOpacity>
        <View style={styles.modalContent}>
          {modalHeading && (
            <AppText
              paddingTop={8}
              fontSize={16}
              bold
              color="#000"
              paddingBottom={10}>
              {modalHeading}
            </AppText>
          )}
          {children}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
});
