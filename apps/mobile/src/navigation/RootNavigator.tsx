import { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { apiFetch } from '../lib/api';
import { setOneSignalExternalUserId } from '../services/pushNotifications';
import { AuthStack } from './AuthStack';
import { OnboardingStack } from './OnboardingStack';
import { BottomTabNavigator } from './BottomTabNavigator';

interface UserProfile {
  id: string;
  onboardingStep: number;
  firstName: string;
  lastName: string;
}

export function RootNavigator() {
  const { session, loading: authLoading } = useAuth();
  const [profileLoading, setProfileLoading] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState<number | null>(null);

  useEffect(() => {
    if (!session) {
      setOnboardingStep(null);
      setProfileLoading(false);
      return;
    }

    let cancelled = false;
    setProfileLoading(true);

    // Add a 5-second timeout so we don't hang forever if API is unreachable
    const timeout = setTimeout(() => {
      if (!cancelled) {
        console.log('[RootNavigator] API timeout — defaulting to onboarding');
        setOnboardingStep(0);
        setProfileLoading(false);
      }
    }, 5000);

    apiFetch<UserProfile>('/users/me')
      .then((profile) => {
        if (!cancelled) {
          clearTimeout(timeout);
          setOnboardingStep(profile.onboardingStep ?? 0);
          setProfileLoading(false);
          // Associate user with OneSignal for push notifications
          setOneSignalExternalUserId(profile.id);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          clearTimeout(timeout);
          console.log('[RootNavigator] API error, defaulting to onboarding:', err?.message);
          setOnboardingStep(0);
          setProfileLoading(false);
        }
      });

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [session]);

  const handleOnboardingComplete = useCallback(() => {
    setOnboardingStep(5);
  }, []);

  if (authLoading || (session && profileLoading)) {
    return (
      <View style={s.loading}>
        <Text style={s.title}>STICKS</Text>
        <Text style={s.sub}>Loading...</Text>
      </View>
    );
  }

  if (!session) {
    return <AuthStack />;
  }

  if (onboardingStep !== null && onboardingStep < 5) {
    return (
      <OnboardingStack
        initialStep={onboardingStep}
        onComplete={handleOnboardingComplete}
      />
    );
  }

  return <BottomTabNavigator />;
}

const s = StyleSheet.create({
  loading: { flex: 1, backgroundColor: '#101511', alignItems: 'center', justifyContent: 'center' },
  title: { color: '#dfe4dd', fontSize: 32, fontStyle: 'italic', fontFamily: 'Newsreader' },
  sub: { color: '#bec9c1', fontSize: 16, marginTop: 12, fontFamily: 'Manrope' },
});
