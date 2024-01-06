import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewProps,
} from 'react-native';
import React from 'react';

type Props = {
  containerStyle?: StyleProp<any>;
  inputStyle?: StyleProp<any>;
} & TextInputProps;

export default function AppInput(props: Props) {
  return (
    <View style={props.containerStyle}>
      <TextInput
        style={{...styles.inputStyle, ...props.inputStyle}}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputStyle: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'lightgrey',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
});
