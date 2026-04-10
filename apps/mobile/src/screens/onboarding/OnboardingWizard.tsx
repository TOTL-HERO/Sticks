import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { apiFetch } from '../../lib/api';
import { ProfileBasicsStep } from './ProfileBasicsStep';
import { HandicapStep } from './HandicapStep';
import { HomeCourseStep } from './HomeCourseStep';
import { PlayStyleStep } from './PlayStyleStep';
import { PlayerDiscoveryStep } from './PlayerDiscoveryStep';

const TOTAL_STEPS = 5;
const STEP_TITLES = ['Profile Basics', 'Handicap Setup', 'Home Course', 'Play Style', 'Player Discovery'];

interface OnboardingWizardProps { initialStep?: number; onComplete: () => void; }

interface OnboardingData {
  firstName: string; lastName: string; avatarUrl: string | null;
  handicapOption: 'ghin' | 'manual' | 'none'; ghinNumber: string; manualHandicap: string; ghinIndex: number | null;
  homeCourseId: string | null; homeCourseName: string | null;
  playStyle: 'COMPETITIVE' | 'CASUAL' | 'SOCIAL' | null;
  contactsSynced: boolean; instagramConnected: boolean; twitterConnected: boolean;
}

export function OnboardingWizard({ initialStep = 0, onComplete }: OnboardingWizardProps) {
  const [currentStep, setCurrentStep] = useState(Math.max(0, Math.min(initialStep, TOTAL_STEPS - 1)));
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<OnboardingData>({
    firstName: '', lastName: '', avatarUrl: null,
    handicapOption: 'ghin', ghinNumber: '', manualHandicap: '', ghinIndex: null,
    homeCourseId: null, homeCourseName: null, playStyle: null,
    contactsSynced: false, instagramConnected: false, twitterConnected: false,
  });

  const updateData = useCallback((partial: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...partial }));
  }, []);

  const canContinue = (): boolean => {
    switch (currentStep) {
      case 0: return data.firstName.trim().length > 0 && data.lastName.trim().length > 0;
      case 1:
        if (data.handicapOption === 'manual') { const val = parseFloat(data.manualHandicap); return !isNaN(val) && val >= 0 && val <= 54; }
        return true;
      default: return true;
    }
  };

  const persistStep = async (step: number) => {
    try {
      const body: Record<string, any> = { onboardingStep: step + 1 };
      if (step === 0) { body.firstName = data.firstName.trim(); body.lastName = data.lastName.trim(); if (data.avatarUrl) body.avatarUrl = data.avatarUrl; }
      if (step === 1) {
        if (data.handicapOption === 'ghin' && data.ghinIndex !== null) body.ghinIndex = data.ghinIndex;
        else if (data.handicapOption === 'manual' && data.manualHandicap) body.ghinIndex = parseFloat(data.manualHandicap);
      }
      if (step === 2) { if (data.homeCourseId) body.homeCourseId = data.homeCourseId; if (data.homeCourseName) body.homeCourseName = data.homeCourseName; }
      if (step === 3 && data.playStyle) body.playStyle = data.playStyle;
      await apiFetch('/users/me', { method: 'PUT', body: JSON.stringify(body) });
    } catch (err) {
      console.warn('[Onboarding] persistStep failed:', err);
    }
  };

  const handleNext = async () => {
    if (!canContinue()) return;
    setSaving(true);
    await persistStep(currentStep);
    setSaving(false);
    if (currentStep < TOTAL_STEPS - 1) setCurrentStep((prev) => prev + 1);
    else await handleFinalize();
  };

  const handleBack = () => { if (currentStep > 0) setCurrentStep((prev) => prev - 1); };

  const handleSkip = () => {
    if (Platform.OS === 'web') {
      if (window.confirm('Skip Onboarding? You can complete your profile later from Settings.')) {
        setSaving(true);
        apiFetch('/users/me', { method: 'PUT', body: JSON.stringify({ onboardingStep: 5 }) })
          .catch(() => {})
          .finally(() => { setSaving(false); onComplete(); });
      }
      return;
    }
    Alert.alert('Skip Onboarding?', 'You can complete your profile later from Settings.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Skip', onPress: async () => {
        setSaving(true);
        try { await apiFetch('/users/me', { method: 'PUT', body: JSON.stringify({ onboardingStep: 5 }) }); } catch { /* Continue */ }
        setSaving(false);
        onComplete();
      }},
    ]);
  };

  const handleFinalize = async () => {
    setSaving(true);
    try {
      const body: Record<string, any> = { onboardingStep: 5, firstName: data.firstName.trim(), lastName: data.lastName.trim() };
      if (data.avatarUrl) body.avatarUrl = data.avatarUrl;
      if (data.handicapOption === 'ghin' && data.ghinIndex !== null) body.ghinIndex = data.ghinIndex;
      else if (data.handicapOption === 'manual' && data.manualHandicap) body.ghinIndex = parseFloat(data.manualHandicap);
      if (data.homeCourseId) body.homeCourseId = data.homeCourseId;
      if (data.homeCourseName) body.homeCourseName = data.homeCourseName;
      if (data.playStyle) body.playStyle = data.playStyle;
      await apiFetch('/users/me', { method: 'PUT', body: JSON.stringify(body) });
    } catch (err) {
      console.warn('[Onboarding] Failed to save profile, continuing anyway:', err);
    }
    setSaving(false);
    onComplete();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0: return <ProfileBasicsStep data={data} onChange={updateData} />;
      case 1: return <HandicapStep data={data} onChange={updateData} />;
      case 2: return <HomeCourseStep data={data} onChange={updateData} />;
      case 3: return <PlayStyleStep data={data} onChange={updateData} />;
      case 4: return <PlayerDiscoveryStep data={data} onChange={updateData} />;
      default: return null;
    }
  };

  const progressWidth = `${((currentStep + 1) / TOTAL_STEPS) * 100}%`;
  const isLastStep = currentStep === TOTAL_STEPS - 1;

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        {/* Header */}
        <View style={styles.header}>
          {currentStep > 0 ? (
            <TouchableOpacity onPress={handleBack} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <MaterialCommunityIcons name="arrow-left" size={24} color="#dfe4dd" />
            </TouchableOpacity>
          ) : <View style={{ width: 24 }} />}
          <Text style={styles.headerTitle}>{STEP_TITLES[currentStep]}</Text>
          <TouchableOpacity onPress={handleSkip} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <MaterialCommunityIcons name="close" size={24} color="#88938c" />
          </TouchableOpacity>
        </View>

        {/* Progress */}
        <View style={styles.progressWrap}>
          <View style={styles.progressLabels}>
            <Text style={styles.stepLabel}>Step {currentStep + 1} of {TOTAL_STEPS}</Text>
            <Text style={styles.stepName}>{STEP_TITLES[currentStep]}</Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: progressWidth as any, backgroundColor: '#84d7af' }]} />
          </View>
        </View>

        {/* Step Content */}
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 120 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          {renderStep()}
        </ScrollView>

        {/* Bottom Action */}
        <View style={styles.bottomAction}>
          <TouchableOpacity onPress={handleNext} disabled={!canContinue() || saving} activeOpacity={0.9}>
            <View style={[styles.ctaWrap, { opacity: canContinue() && !saving ? 1 : 0.5 }]}>
              <View style={styles.ctaGradient}>
                {saving ? (
                  <ActivityIndicator size="small" color="#003825" />
                ) : (
                  <>
                    <Text style={styles.ctaText}>{isLastStep ? 'Finish' : 'Continue'}</Text>
                    <MaterialCommunityIcons name={isLastStep ? 'check' : 'arrow-right'} size={18} color="#003825" />
                  </>
                )}
              </View>
            </View>
          </TouchableOpacity>

          {currentStep === 4 && (
            <TouchableOpacity onPress={handleNext} activeOpacity={0.7}>
              <View style={{ alignItems: 'center', marginTop: 12 }}>
                <Text style={styles.skipLink}>Skip for now</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#101511' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12 },
  headerTitle: { fontFamily: 'Newsreader', fontSize: 24, fontStyle: 'italic', color: '#dfe4dd', fontWeight: '700' },
  progressWrap: { paddingHorizontal: 16, marginBottom: 20 },
  progressLabels: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 8 },
  stepLabel: { fontFamily: 'Manrope', fontSize: 10, fontWeight: '700', color: '#84d7af', textTransform: 'uppercase', letterSpacing: 2 },
  stepName: { fontFamily: 'Manrope', fontSize: 10, fontWeight: '500', color: '#bec9c1', textTransform: 'uppercase', letterSpacing: 1 },
  progressTrack: { height: 2, backgroundColor: '#1c211c', borderRadius: 1, overflow: 'hidden' },
  progressFill: { height: 2, overflow: 'hidden', borderRadius: 1 },
  bottomAction: { position: 'absolute' as const, bottom: 0, left: 0, right: 0, paddingHorizontal: 16, paddingBottom: 24, paddingTop: 20, backgroundColor: '#101511', zIndex: 10 },
  ctaWrap: { borderRadius: 12, overflow: 'hidden', shadowColor: '#006747', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 12 },
  ctaGradient: { paddingVertical: 16, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8, backgroundColor: '#006747' },
  ctaText: { fontFamily: 'Manrope', fontSize: 13, fontWeight: '700', color: '#003825', textTransform: 'uppercase', letterSpacing: 2 },
  skipLink: { fontFamily: 'Manrope', fontSize: 13, color: '#bec9c1', textDecorationLine: 'underline' },
});
