import React from 'react';
import { View, StyleSheet, ViewStyle, ViewProps } from 'react-native';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  elevated?: boolean;
  flex?: number;
  flexDirection?: ViewStyle['flexDirection'];
  alignItems?: ViewStyle['alignItems'];
  justifyContent?: ViewStyle['justifyContent'];
  paddingHorizontal?: number;
  paddingVertical?: number;
  marginHorizontal?: number;
  marginBottom?: number;
  height?: ViewStyle['height'];
}

export function Card({
  children,
  elevated,
  flex,
  flexDirection,
  alignItems,
  justifyContent,
  paddingHorizontal,
  paddingVertical,
  marginHorizontal,
  marginBottom,
  height,
  style,
  ...rest
}: CardProps) {
  return (
    <View
      style={[
        styles.card,
        elevated && styles.elevated,
        flex !== undefined && { flex },
        flexDirection && { flexDirection },
        alignItems && { alignItems },
        justifyContent && { justifyContent },
        paddingHorizontal !== undefined && { paddingHorizontal },
        paddingVertical !== undefined && { paddingVertical },
        marginHorizontal !== undefined && { marginHorizontal },
        marginBottom !== undefined && { marginBottom },
        height !== undefined && { height },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1c211c',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#3f4943',
    padding: 16,
    overflow: 'hidden',
  },
  elevated: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
});
