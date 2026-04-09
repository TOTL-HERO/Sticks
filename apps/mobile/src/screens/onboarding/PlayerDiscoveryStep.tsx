import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface PlayerDiscoveryStepProps {
  data: { contactsSynced: boolean; instagramConnected: boolean; twitterConnected: boolean };
  onChange: (data: Partial<PlayerDiscoveryStepProps['data']>) => void;
}

const DISCOVERY_OPTIONS = [
  { key: 'contactsSynced' as const, label: 'Sync Contacts', icon: 'contacts' as const, description: 'Find friends already on Sticks' },
  { key: 'instagramConnected' as const, label: 'Connect Instagram', icon: 'instagram' as const, description: 'Follow your golf crew' },
  { key: 'twitterConnected' as const, label: 'Connect X / Twitter', icon: 'twitter' as const, description: 'Find golf accounts you follow' },
];

export function PlayerDiscoveryStep({ data, onChange }: PlayerDiscoveryStepProps) {
  const handleToggle = (key: keyof typeof data) => {
    if (key === 'contactsSynced' && !data.contactsSynced) {
      Alert.alert('Sync Contacts', 'Contact sync will be available in a future update.', [{ text: 'OK' }]);
      return;
    }
    if (key === 'instagramConnected' && !data.instagramConnected) {
      Alert.alert('Connect Instagram', 'Instagram connection will be available in a future update.', [{ text: 'OK' }]);
      return;
    }
    if (key === 'twitterConnected' && !data.twitterConnected) {
      Alert.alert('Connect X / Twitter', 'X/Twitter connection will be available in a future update.', [{ text: 'OK' }]);
      return;
    }
    onChange({ [key]: !data[key] });
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.heading}>Find your crew.</Text>
      <Text style={styles.subheading}>Connect with golfers you already know</Text>

      <View style={{ gap: 12 }}>
        {DISCOVERY_OPTIONS.map((option) => {
          const isConnected = data[option.key];
          return (
            <TouchableOpacity key={option.key} onPress={() => handleToggle(option.key)} activeOpacity={0.7}>
              <View style={[styles.row, isConnected && styles.rowConnected]}>
                <View style={[styles.iconWrap, isConnected && styles.iconWrapConnected]}>
                  <MaterialCommunityIcons name={option.icon} size={24} color={isConnected ? '#84d7af' : '#88938c'} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.label}>{option.label}</Text>
                  <Text style={styles.desc}>{option.description}</Text>
                </View>
                <MaterialCommunityIcons name={isConnected ? 'check-circle' : 'chevron-right'} size={22} color={isConnected ? '#84d7af' : '#88938c'} />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: { fontFamily: 'Newsreader', fontSize: 32, fontStyle: 'italic', color: '#dfe4dd', marginBottom: 8 },
  subheading: { fontFamily: 'Manrope', fontSize: 13, color: '#bec9c1', marginBottom: 24 },
  row: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1c211c', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#3f4943' },
  rowConnected: { borderColor: '#84d7af' },
  iconWrap: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#101511', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  iconWrapConnected: { backgroundColor: 'rgba(132,215,175,0.15)' },
  label: { fontFamily: 'Manrope', fontSize: 14, fontWeight: '600', color: '#dfe4dd' },
  desc: { fontFamily: 'Manrope', fontSize: 12, color: '#bec9c1' },
});
