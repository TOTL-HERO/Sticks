import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TopographicBackground } from '../../components/TopographicBackground';
import { Button } from '../../components/Button';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

type AuthStackParamList = {
  Landing: undefined;
  SignUp: undefined;
  SignIn: undefined;
};

export function LandingScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  return (
    <View style={styles.root}>
      <TopographicBackground />

      {/* Radial glow */}
      <View style={styles.glow} />

      {/* Center branding */}
      <View style={styles.center}>
        <Text style={styles.brandTitle}>STICKS</Text>
        <Text style={styles.tagline}>Golf is more fun with stakes.</Text>
        <View style={styles.divider} />
      </View>

      {/* Bottom actions */}
      <View style={styles.bottom}>
        <Button variant="primary" fullWidth onPress={() => navigation.navigate('SignUp')}>
          Get Started
        </Button>
        <Button variant="secondary" fullWidth onPress={() => navigation.navigate('SignIn')}>
          Sign In
        </Button>
      </View>

      {/* Bottom golf icon */}
      <View style={styles.bottomIcon}>
        <MaterialCommunityIcons name="golf-tee" size={20} color="#bec9c1" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#101511' },
  glow: {
    position: 'absolute',
    top: '40%',
    left: '25%',
    width: '50%',
    height: '30%',
    opacity: 0.05,
    borderRadius: 999,
    backgroundColor: '#006747',
  },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
  brandTitle: {
    fontFamily: 'Newsreader',
    fontSize: 72,
    fontStyle: 'italic',
    fontWeight: '900',
    color: '#006747',
    letterSpacing: 3,
  },
  tagline: {
    fontFamily: 'Manrope',
    fontSize: 11,
    color: '#bec9c1',
    letterSpacing: 4,
    textTransform: 'uppercase',
    fontWeight: '500',
    marginTop: 8,
  },
  divider: { height: 4, width: 48, backgroundColor: '#006747', borderRadius: 2, marginTop: 24 },
  bottom: { paddingHorizontal: 24, paddingBottom: 48, gap: 12 },
  bottomIcon: { position: 'absolute', bottom: 16, alignSelf: 'center', opacity: 0.3 },
});
