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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { useRoundStore, type SyncStatus } from '../../stores/roundStore';
import { useAppStore } from '../../stores/appStore';
import { apiFetch } from '../../lib/api';
import { startSyncQueue, stopSyncQueue, syncPendingHoles, syncPendingShots } from '../../services/syncQueue';
import { registerBackgroundLocationTask } from '../../services/backgroundLocation';
import { HoleRow } from './HoleRow';
import { ScoreStepperCard } from './ScoreStepperCard';
import { SecondaryStatsPanel } from './SecondaryStatsPanel';
import { HoleConfirmationSheet } from './HoleConfirmationSheet';

const MOCK_DISTANCES: Record<number, { front: number; center: number; back: number }> = {
  1: { front: 145, center: 158, back: 172 }, 2: { front: 132, center: 147, back: 160 },
  3: { front: 178, center: 192, back: 205 }, 4: { front: 110, center: 125, back: 138 },
  5: { front: 155, center: 168, back: 182 }, 6: { front: 190, center: 204, back: 218 },
  7: { front: 98, center: 112, back: 124 }, 8: { front: 165, center: 179, back: 193 },
  9: { front: 142, center: 156, back: 170 }, 10: { front: 151, center: 164, back: 178 },
  11: { front: 188, center: 201, back: 215 }, 12: { front: 120, center: 134, back: 148 },
  13: { front: 173, center: 187, back: 200 }, 14: { front: 105, center: 118, back: 131 },
  15: { front: 160, center: 174, back: 188 }, 16: { front: 195, center: 210, back: 224 },
  17: { front: 137, center: 150, back: 163 }, 18: { front: 148, center: 162, back: 176 },
};

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

  const currentHole = activeRound?.currentHole ?? 1;
  const holeData = activeRound?.holes.find((h) => h.holeNumber === currentHole);
  const distances = MOCK_DISTANCES[currentHole] ?? { front: 150, center: 165, back: 180 };

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
            <View style={s.mapPlaceholder}>
              <MaterialCommunityIcons name="map-marker-radius" size={36} color="#006747" />
              <Text style={s.mapText}>GPS Active</Text>
            </View>
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
  mapPlaceholder: {
    height: 100,
    backgroundColor: '#0a1a10',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapText: { fontFamily: 'Manrope', fontSize: 12, color: '#bec9c1', marginTop: 4 },
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
});
