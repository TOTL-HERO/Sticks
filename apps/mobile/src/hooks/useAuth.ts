import { useEffect, useState, useCallback } from 'react';
import { Alert } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { supabase } from '../lib/supabase';
import type { Session } from '@supabase/supabase-js';

WebBrowser.maybeCompleteAuthSession();

const GOOGLE_IOS_CLIENT_ID = '376759411009-rjlvdu7jgpr1r5ehbnggepllpe1rt560.apps.googleusercontent.com';

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const [, googleResponse, googlePromptAsync] = Google.useIdTokenAuthRequest({
    iosClientId: GOOGLE_IOS_CLIENT_ID,
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Handle Google OAuth response
  useEffect(() => {
    if (googleResponse?.type === 'success') {
      const idToken = googleResponse.params.id_token;
      supabase.auth.signInWithIdToken({
        provider: 'google',
        token: idToken,
      }).then(({ error }) => {
        if (error) Alert.alert('Auth Error', error.message);
      });
    }
  }, [googleResponse]);

  const signInWithApple = useCallback(async () => {
    try {
      Alert.alert('Apple Sign In', 'Apple authentication requires a native build with expo-apple-authentication. Use Phone or Email for now.');
    } catch (error: any) {
      Alert.alert('Auth Error', error.message ?? 'Apple sign-in failed');
    }
  }, []);

  const signInWithGoogle = useCallback(async () => {
    try {
      await googlePromptAsync();
    } catch (error: any) {
      Alert.alert('Auth Error', error.message ?? 'Google sign-in failed');
    }
  }, [googlePromptAsync]);

  const signInWithPhone = useCallback(async (phone: string) => {
    try {
      const { error } = await supabase.auth.signInWithOtp({ phone });
      if (error) throw error;
    } catch (error: any) {
      Alert.alert('Auth Error', error.message ?? 'Failed to send OTP');
      throw error;
    }
  }, []);

  const verifyPhoneOtp = useCallback(async (phone: string, token: string) => {
    try {
      const { error } = await supabase.auth.verifyOtp({ phone, token, type: 'sms' });
      if (error) throw error;
    } catch (error: any) {
      Alert.alert('Auth Error', error.message ?? 'OTP verification failed');
      throw error;
    }
  }, []);

  const signInWithEmail = useCallback(async (email: string) => {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      Alert.alert('Auth Error', error.message ?? 'Failed to send code');
      throw error;
    }
  }, []);

  const verifyEmailOtp = useCallback(async (email: string, token: string) => {
    try {
      // Try email_change first, then magiclink, then email
      const { error } = await supabase.auth.verifyOtp({ email, token, type: 'email' });
      if (error) throw error;
    } catch (error: any) {
      Alert.alert('Auth Error', error.message ?? 'Verification failed');
      throw error;
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error: any) {
      Alert.alert('Sign Out Error', error.message ?? 'Failed to sign out');
    }
  }, []);

  return {
    session,
    loading,
    signInWithApple,
    signInWithGoogle,
    signInWithPhone,
    verifyPhoneOtp,
    signInWithEmail,
    verifyEmailOtp,
    signOut,
  };
}
