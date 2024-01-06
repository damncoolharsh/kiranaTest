import {StyleSheet, Text, View} from 'react-native';
import React, {ReactNode} from 'react';

type Props = {
  children?: ReactNode;
  fontSize?: number;
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
  paddingVertical?: number;
  paddingHorizontal?: number;
  bold?: boolean;
  color?: string;
};

export default function AppText({
  fontSize = 12,
  children,
  paddingBottom,
  paddingHorizontal,
  paddingLeft,
  paddingRight,
  paddingTop,
  paddingVertical,
  bold,
  color = '#000',
}: Props) {
  return (
    <Text
      style={{
        fontSize,
        fontWeight: bold ? 'bold' : 'normal',
        paddingBottom,
        paddingHorizontal,
        paddingLeft,
        paddingRight,
        paddingTop,
        paddingVertical,
        color,
      }}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({});
