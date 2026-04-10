import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Platform,
  PanResponder,
  AppState,
} from 'react-native';
import type { AppStateStatus } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { useRoundStore, type SyncStatus } from '../../stores/roundStore';
import { useAppStore } from '../../stores/appStore';
import { apiFetch } from '../../lib/api';
import { startSyncQueue, stopSyncQueue, syncPendingHoles, syncPendingShots, flushSyncQueue } from '../../services/syncQueue';
import { registerBackgroundLocationTask, checkAndRecoverTask } from '../../services/backgroundLocation';
import { getCourseDataProvider, type HoleGeometry, type CourseGeometry, type DistanceResult } from '../../services/courseDataProvider';
import { CourseMapOverlay } from '../../components/CourseMapOverlay';
import { HoleRow } from './HoleRow';
import { ScoreStepperCard } from './ScoreStepperCard';
import { SecondaryStatsPanel } from './SecondaryStatsPanel';
import { HoleConfirmationSheet } from './HoleConfirmationSheet';
import { ManualShotTracker } from './ManualShotTracker';

const DEFAULT_DISTANCES: DistanceResult = { front: 150, center: 165, back: 180 };

function SyncStatusBadge({ status }: { status: SyncStatus }) {
  if (status === 'synced')
    return (
      <View style={s.syncRow}>
        <MaterialCommunityIcons name="check-circle" size={16} color="#84d7af" />
        <Text style={[s.syncText, { color: '#84d7af' }]}>Synced</Text>
      </View>
    );
  if (status === 'pending')
    return (
      <View style={s.syncRow}>
        <ActivityIndicator size="small" color="#e9c349" />
        <Text style={[s.syncText, { color: '#e9c349' }]}>Syncing</Text>
      </View>
    );
  return (
    <View style={s.syncRow}>
      <MaterialCommunityIcons name="circle" size={12} color="#ffb4ab" />
      <Text style={[s.syncText, { color: '#ffb4ab' }]}>Offline</Text>
    </View>
  );
}

export function ScoringScreen() {
  const navigation = useNavigation<any>();
  const {
    activeRound,
    syncStatus,
    updateHole,
    advanceHole,
    goToHole,
    finalizeRound,
    clearRound,
  } = useRoundStore();
  const setHideTabBar = useAppStore((st) => st.setHideTabBar);

  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [courseGeometry, setCourseGeometry] = useState<CourseGeometry | null>(null);
  const [distances, setDistances] = useState<DistanceResult>(DEFAULT_DISTANCES);
  const [trackerVisible, setTrackerVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentHole = activeRound?.currentHole ?? 1;
  const holeData = activeRound?.holes.find((h) => h.holeNumber === currentHole);
  const currentHoleGeometry: HoleGeometry | null =
    courseGeometry?.holes.find((h) => h.holeNumber === currentHole) ?? null;

  // Shot count for current hole
  const shotCount =
    activeRound?.shotPoints.filter(
      (sp) =>
        sp.holeNumber === currentHole &&
        (sp.eventType === 'DETECTED' || sp.eventType === 'MANUAL' || sp.eventType === 'CORRECTED'),
    ).length ?? 0;

  // Running score
  const totalStrokes = activeRound?.holes.reduce((sum, h) => sum + h.strokes, 0) ?? 0;
  const totalPar = activeRound?.holes.reduce((sum, h) => sum + h.par, 0) ?? 0;
  const scoreRelPar = totalStrokes - totalPar;

  // --- Swipe gesture for hole navigation ---
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gs) => Math.abs(gs.dx) > 30 && Math.abs(gs.dy) < 30,
      onPanResponderRelease: (_, gs) => {
        const { activeRound: round } = useRoundStore.getState();
        if (!round) return;
        if (gs.dx < -50 && round.currentHole < 18) {
          useRoundStore.getState().advanceHole();
        } else if (gs.dx > 50 && round.currentHole > 1) {
          useRoundStore.getState().goToHole(round.currentHole - 1);
        }
      },
    }),
  ).current;

  // --- Location setup ---
  useEffect(() => {
    let sub: Location.LocationSubscription | null = null;
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Location Required',
          'Sticks uses your location to calculate distance to the pin during golf rounds.',
        );
        return;
      }
      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
      sub = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, distanceInterval: 5 },
        (newLoc) => setLocation(newLoc),
      );
      if (Platform.OS === 'ios') registerBackgroundLocationTask();
    })();
    return () => {
      sub?.remove();
    };
  }, []);

  // --- Sync queue ---
  useEffect(() => {
    startSyncQueue();
    return () => stopSyncQueue();
  }, []);

  // --- Fetch course geometry on round start ---
  useEffect(() => {
    if (!activeRound?.courseId) return;
    let cancelled = false;
    (async () => {
      try {
        const provider = getCourseDataProvider();
        const geom = await provider.getCourseGeometry(activeRound.courseId!);
        if (!cancelled && geom) setCourseGeometry(geom);
      } catch {
        // Geometry fetch failed — map will show fallback
      }
    })();
    return () => { cancelled = true; };
  }, [activeRound?.courseId]);

  // --- AppState listener for background task recovery ---
  useEffect(() => {
    const appStateRef = { current: AppState.currentState };

    const handleAppStateChange = async (nextState: AppStateStatus) => {
      if (appStateRef.current.match(/inactive|background/) && nextState === 'active') {
        // App came to foreground — check if background task needs recovery
        try {
          const result = await checkAndRecoverTask();
          if (result.recovered) {
            // Task was recovered — flush sync queue
            flushSyncQueue();
          }
        } catch {
          // Recovery check failed — non-critical
        }
      }
      appStateRef.current = nextState;
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription.remove();
  }, []);

  // --- Stepper handlers ---
  const handleIncrement = useCallback(() => {
    if (!holeData) return;
    updateHole(currentHole, { strokes: holeData.strokes + 1 });
  }, [currentHole, holeData, updateHole]);

  const handleDecrement = useCallback(() => {
    if (!holeData) return;
    updateHole(currentHole, { strokes: Math.max(1, holeData.strokes - 1) });
  }, [currentHole, holeData, updateHole]);

  // --- Secondary stats handlers ---
  const handlePuttsChange = useCallback(
    (delta: number) => {
      if (!holeData) return;
      const current = holeData.putts ?? 0;
      updateHole(currentHole, { putts: Math.max(0, current + delta) });
    },
    [currentHole, holeData, updateHole],
  );

  const handleFairwayToggle = useCallback(() => {
    if (!holeData) return;
    updateHole(currentHole, { fairwayHit: holeData.fairwayHit === true ? false : true });
  }, [currentHole, holeData, updateHole]);

  const handleGirToggle = useCallback(() => {
    if (!holeData) return;
    updateHole(currentHole, { gir: holeData.gir === true ? false : true });
  }, [currentHole, holeData, updateHole]);

  // --- Confirm score ---
  const handleConfirmScore = useCallback(() => {
    if (!holeData) return;
    // Persist GPS timestamp
    if (location) updateHole(currentHole, { gpsTimestamp: new Date().toISOString() });
    syncPendingHoles();
    syncPendingShots();
    setSheetVisible(true);
  }, [currentHole, holeData, location, updateHole]);

  // --- Confirmation sheet save ---
  const handleSheetSave = useCallback(
    (data: { strokes: number; putts: number | null; fairwayHit: boolean | null; gir: boolean | null }) => {
      updateHole(currentHole, {
        strokes: data.strokes,
        putts: data.putts,
        fairwayHit: data.fairwayHit,
        gir: data.gir,
      });
      syncPendingHoles();
      setSheetVisible(false);

      // Auto-advance after 300ms
      setTimeout(() => {
        if (currentHole >= 18) {
          handleEndRound();
        } else {
          advanceHole();
        }
      }, 300);
    },
    [currentHole, updateHole, advanceHole],
  );

  // --- End round ---
  const handleEndRound = useCallback(async () => {
    if (!activeRound) return;
    Alert.alert('End Round', 'Are you sure you want to finish this round?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'End Round',
        style: 'destructive',
        onPress: async () => {
          try {
            await syncPendingHoles();
            await syncPendingShots();
            await apiFetch(`/rounds/${activeRound.id}/finalize`, { method: 'POST' });
            finalizeRound();
            clearRound();
            setHideTabBar(false);
            navigation.goBack();
          } catch (err: any) {
            Alert.alert('Error', err.message ?? 'Could not finalize round');
          }
        },
      },
    ]);
  }, [activeRound, finalizeRound, clearRound, setHideTabBar, navigation]);

  // --- Hole row tap ---
  const handleHolePress = useCallback(
    (holeNumber: number) => {
      goToHole(holeNumber);
    },
    [goToHole],
  );

  // --- Manual shot tracker ---
  const handleShotSaved = useCallback((summary: string) => {
    setTrackerVisible(false);
    setToastMessage(summary);
    if (toastTimeout.current) clearTimeout(toastTimeout.current);
    toastTimeout.current = setTimeout(() => setToastMessage(null), 2500);
  }, []);

  // --- No active round ---
  if (!activeRound || !holeData) {
    return (
      <SafeAreaView style={s.safe}>
        <View style={s.center}>
          <Text style={s.noRound}>No active round</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <View style={{ flex: 1 }} {...panResponder.panHandlers}>
        {/* 1. Header */}
        <View style={s.header}>
          <View style={{ flex: 1 }}>
            <Text style={s.courseName}>{activeRound.courseName}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <SyncStatusBadge status={syncStatus} />
            <TouchableOpacity onPress={handleEndRound}>
              <MaterialCommunityIcons name="flag-checkered" size={24} color="#ffb4ab" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          {/* 2. GPS Section */}
          <View style={s.gpsSection}>
            <CourseMapOverlay
              holeGeometry={currentHoleGeometry}
              userLocation={
                location
                  ? { latitude: location.coords.latitude, longitude: location.coords.longitude }
                  : null
              }
              distances={distances}
              onDistanceUpdate={setDistances}
            />
            <View style={s.distRow}>
              <View style={s.distItem}>
                <Text style={s.distLabel}>FRONT</Text>
                <Text style={[s.distVal, { color: '#84d7af' }]}>{distances.front}</Text>
              </View>
              <View style={s.distItem}>
                <Text style={s.distLabel}>CENTER</Text>
                <Text style={[s.distVal, { color: '#e9c349' }]}>{distances.center}</Text>
              </View>
              <View style={s.distItem}>
                <Text style={s.distLabel}>BACK</Text>
                <Text style={[s.distVal, { color: '#84d7af' }]}>{distances.back}</Text>
              </View>
            </View>
            {/* Shot count indicator */}
            <Text style={s.shotIndicator}>
              {shotCount > 0
                ? `${shotCount} shot${shotCount !== 1 ? 's' : ''} detected on this hole`
                : 'No shots detected yet'}
            </Text>
          </View>

          {/* Score pill */}
          <View style={s.scorePillRow}>
            <View style={s.scorePill}>
              <Text
                style={[
                  s.scorePillText,
                  { color: scoreRelPar <= 0 ? '#84d7af' : '#ffb4ab' },
                ]}
              >
                {scoreRelPar === 0 ? 'E' : scoreRelPar > 0 ? `+${scoreRelPar}` : scoreRelPar}
              </Text>
            </View>
          </View>

          {/* 3. Live Scorecard */}
          <View style={s.scorecardWrap}>
            {activeRound.holes.map((hole) => (
              <HoleRow
                key={hole.holeNumber}
                holeNumber={hole.holeNumber}
                par={hole.par}
                strokes={hole.strokes}
                isCurrentHole={hole.holeNumber === currentHole}
                onPress={handleHolePress}
              />
            ))}
          </View>

          {/* 4. ScoreStepperCard */}
          <View style={{ marginTop: 16 }}>
            <ScoreStepperCard
              holeNumber={currentHole}
              par={holeData.par}
              strokes={holeData.strokes}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
            />
          </View>

          {/* 5. SecondaryStatsPanel */}
          <SecondaryStatsPanel
            putts={holeData.putts}
            fairwayHit={holeData.fairwayHit}
            gir={holeData.gir}
            onPuttsChange={handlePuttsChange}
            onFairwayToggle={handleFairwayToggle}
            onGirToggle={handleGirToggle}
          />

          {/* 6. Confirm button */}
          <TouchableOpacity activeOpacity={0.8} onPress={handleConfirmScore} style={s.confirmBtn}>
            <Text style={s.confirmBtnText}>Confirm Score</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Confirmation Sheet */}
        <HoleConfirmationSheet
          visible={sheetVisible}
          holeNumber={currentHole}
          par={holeData.par}
          detectedShotCount={shotCount}
          onSave={handleSheetSave}
          onDismiss={() => setSheetVisible(false)}
        />

        {/* Manual Shot Tracker */}
        <ManualShotTracker
          visible={trackerVisible}
          onClose={() => setTrackerVisible(false)}
          onShotSaved={handleShotSaved}
        />

        {/* Track Shot FAB */}
        {!trackerVisible && (
          <TouchableOpacity
            style={s.fab}
            onPress={() => setTrackerVisible(true)}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons name="crosshairs-gps" size={22} color="#101511" />
          </TouchableOpacity>
        )}

        {/* Toast */}
        {toastMessage && (
          <View style={s.toast}>
            <MaterialCommunityIcons name="golf-tee" size={16} color="#84d7af" />
            <Text style={s.toastText}>{toastMessage}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#101511' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  noRound: { color: '#dfe4dd', fontFamily: 'Manrope', fontSize: 14 },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  courseName: {
    fontFamily: 'Newsreader',
    fontSize: 22,
    fontStyle: 'italic',
    color: '#dfe4dd',
  },
  syncRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  syncText: { fontFamily: 'Manrope', fontSize: 11 },

  // GPS Section
  gpsSection: {
    backgroundColor: '#1c211c',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#3f4943',
    overflow: 'hidden',
    marginBottom: 12,
  },
  distRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  distItem: { alignItems: 'center' },
  distLabel: { fontFamily: 'Manrope', fontSize: 11, color: '#bec9c1' },
  distVal: { fontFamily: 'Manrope', fontSize: 16, fontWeight: '700' },
  shotIndicator: {
    fontFamily: 'Manrope',
    fontSize: 12,
    fontWeight: '600',
    color: '#84d7af',
    textAlign: 'center',
    paddingBottom: 8,
  },

  // Score pill
  scorePillRow: { alignItems: 'center', marginBottom: 8 },
  scorePill: {
    backgroundColor: '#1c211c',
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 20,
  },
  scorePillText: { fontFamily: 'Manrope', fontSize: 14, fontWeight: '700' },

  // Scorecard
  scorecardWrap: {
    backgroundColor: '#1c211c',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#3f4943',
    padding: 8,
  },

  // Confirm button
  confirmBtn: {
    backgroundColor: '#006747',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 16,
  },
  confirmBtnText: {
    fontFamily: 'Manrope',
    fontSize: 16,
    fontWeight: '700',
    color: '#84d7af',
  },

  // Track Shot FAB
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#84d7af',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 50,
  },

  // Toast
  toast: {
    position: 'absolute',
    bottom: 90,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#1c211c',
    borderWidth: 1,
    borderColor: '#3f4943',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    zIndex: 60,
  },
  toastText: {
    fontFamily: 'Manrope',
    fontSize: 14,
    fontWeight: '700',
    color: '#dfe4dd',
  },
});
