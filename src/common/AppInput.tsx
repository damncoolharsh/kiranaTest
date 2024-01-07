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
import AppText from './AppText';

type Props = {
  containerStyle?: StyleProp<any>;
  inputStyle?: StyleProp<any>;
  error?: string;
} & TextInputProps;

export default function AppInput(props: Props) {
  return (
    <View style={props.containerStyle}>
      <TextInput
        style={{...styles.inputStyle, ...props.inputStyle}}
        {...props}
      />
      {!!props.error && (
        <View>
          <AppText paddingTop={8} paddingLeft={10} color="red" bold>
            {props.error}
          </AppText>
        </View>
      )}
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
