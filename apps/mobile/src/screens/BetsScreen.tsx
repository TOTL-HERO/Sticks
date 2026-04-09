import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export function BetsScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.center}>
        <View style={styles.iconWrap}>
          <MaterialCommunityIcons name="cash-multiple" size={40} color="#e9c349" />
        </View>
        <Text style={styles.title}>Bets</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Coming in M7</Text>
        </View>
        <Text style={styles.desc}>
          Skins, Nassau, Wolf, and more. Put your game where your mouth is.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#101511' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 20 },
  iconWrap: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#1c211c', alignItems: 'center', justifyContent: 'center' },
  title: { color: '#dfe4dd', fontFamily: 'Newsreader', fontSize: 28, fontStyle: 'italic' },
  badge: { backgroundColor: '#1c211c', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: '#3f4943' },
  badgeText: { color: '#e9c349', fontFamily: 'Manrope', fontSize: 13, fontWeight: '600' },
  desc: { color: '#bec9c1', fontFamily: 'Manrope', fontSize: 14, textAlign: 'center', maxWidth: 280, lineHeight: 22 },
});
