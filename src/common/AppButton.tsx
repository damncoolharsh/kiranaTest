import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {ReactNode} from 'react';
import AppText from './AppText';

type Props = {
  label: ReactNode;
  style?: StyleProp<any>;
  onPress: () => void;
};
export default function AppButton(props: Props) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.button, props.style]}>
      <AppText color="#fff" fontSize={14} bold>
        {props.label}
      </AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
