import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface TopAppBarProps {
  avatarUrl?: string | null;
  onAvatarPress?: () => void;
  onNotificationPress?: () => void;
}

export function TopAppBar({ avatarUrl, onAvatarPress, onNotificationPress }: TopAppBarProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onAvatarPress} activeOpacity={0.7} style={styles.avatarWrap}>
        {avatarUrl ? (
          <Image source={{ uri: avatarUrl }} style={styles.avatarImage} />
        ) : (
          <MaterialCommunityIcons name="account" size={22} color="#bec9c1" />
        )}
      </TouchableOpacity>

      <Text style={styles.title}>STICKS</Text>

      <TouchableOpacity onPress={onNotificationPress} activeOpacity={0.7} style={styles.bellWrap}>
        <MaterialCommunityIcons name="bell-outline" size={22} color="#bec9c1" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#101511',
  },
  avatarWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1c211c',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {
    width: 36,
    height: 36,
  },
  title: {
    fontFamily: 'Newsreader',
    fontSize: 24,
    fontStyle: 'italic',
    color: '#dfe4dd',
    letterSpacing: 2,
  },
  bellWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
