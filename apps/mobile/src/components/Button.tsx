import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps {
  children: string;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  onPress?: () => void;
}

const variantStyles: Record<ButtonVariant, ViewStyle> = {
  primary: {
    backgroundColor: '#006747',
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#3f4943',
  },
  ghost: {
    backgroundColor: 'transparent',
  },
};

const variantTextStyles: Record<ButtonVariant, TextStyle> = {
  primary: {
    color: '#84d7af',
  },
  secondary: {
    color: '#dfe4dd',
  },
  ghost: {
    color: '#bec9c1',
  },
};

export function Button({ children, variant = 'primary', fullWidth, onPress }: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.button, variantStyles[variant], fullWidth && styles.fullWidth]}
    >
      <Text style={[styles.text, variantTextStyles[variant]]}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  fullWidth: {
    width: '100%',
  },
  text: {
    fontFamily: 'Manrope',
    fontWeight: '600',
    fontSize: 16,
  },
});
