import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Alert, Platform, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { useRoundStore, type SyncStatus } from '../../stores/roundStore';
import { useAppStore } from '../../stores/appStore';
import { apiFetch } from '../../lib/api';
import { startSyncQueue, stopSyncQueue, syncPendingHoles } from '../../services/syncQueue';
import { registerBackgroundLocationTask } from '../../services/backgroundLocation';

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
  if (status === 'synced') return (<View style={s.syncRow}><MaterialCommunityIcons name="check-circle" size={16} color="#84d7af" /><Text style={[s.syncText, { color: '#84d7af' }]}>Synced</Text></View>);
  if (status === 'pending') return (<View style={s.syncRow}><ActivityIndicator size="small" color="#e9c349" /><Text style={[s.syncText, { color: '#e9c349' }]}>Syncing</Text></View>);
  return (<View style={s.syncRow}><MaterialCommunityIcons name="circle" size={12} color="#ffb4ab" /><Text style={[s.syncText, { color: '#ffb4ab' }]}>Offline</Text></View>);
}

export function ScoringScreen() {
  const navigation = useNavigation<any>();
  const { activeRound, syncStatus, updateHole, advanceHole, finalizeRound, clearRound } = useRoundStore();
  const setHideTabBar = useAppStore((s) => s.setHideTabBar);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);

  const currentHole = activeRound?.currentHole ?? 1;
  const holeData = activeRound?.holes.find((h) => h.holeNumber === currentHole);
  const distances = MOCK_DISTANCES[currentHole] ?? { front: 150, center: 165, back: 180 };

  const totalStrokes = activeRound?.holes.reduce((sum, h) => sum + h.strokes, 0) ?? 0;
  const totalPar = activeRound?.holes.filter((h) => h.strokes > 0).reduce((sum, h) => sum + h.par, 0) ?? 0;
  const scoreRelPar = totalStrokes - totalPar;
  const holesPlayed = activeRound?.holes.filter((h) => h.strokes > 0).length ?? 0;

  useEffect(() => {
    let sub: Location.LocationSubscription | null = null;
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') { Alert.alert('Location Required', 'Sticks uses your location to calculate distance to the pin during golf rounds.'); return; }
      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
      sub = await Location.watchPositionAsync({ accuracy: Location.Accuracy.High, distanceInterval: 5 }, (newLoc) => setLocation(newLoc));
      if (Platform.OS === 'ios') registerBackgroundLocationTask();
    })();
    return () => { sub?.remove(); };
  }, []);

  useEffect(() => { startSyncQueue(); return () => stopSyncQueue(); }, []);

  const handleUpdateStrokes = useCallback((delta: number) => { if (!holeData) return; updateHole(currentHole, { strokes: Math.max(0, holeData.strokes + delta) }); }, [currentHole, holeData, updateHole]);
  const handleUpdatePutts = useCallback((delta: number) => { if (!holeData) return; updateHole(currentHole, { putts: Math.max(0, holeData.putts + delta) }); }, [currentHole, holeData, updateHole]);
  const handleAddPenalty = useCallback(() => { if (!holeData) return; updateHole(currentHole, { penalties: holeData.penalties + 1 }); }, [currentHole, holeData, updateHole]);

  const handleEndRound = useCallback(async () => {
    if (!activeRound) return;
    Alert.alert('End Round', 'Are you sure you want to finish this round?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'End Round', style: 'destructive', onPress: async () => {
        try { await syncPendingHoles(); await apiFetch(`/rounds/${activeRound.id}/finalize`, { method: 'POST' }); finalizeRound(); clearRound(); setHideTabBar(false); navigation.goBack(); }
        catch (err: any) { Alert.alert('Error', err.message ?? 'Could not finalize round'); }
      }},
    ]);
  }, [activeRound, finalizeRound, clearRound, setHideTabBar, navigation]);

  const handleNextHole = useCallback(async () => {
    if (location) updateHole(currentHole, { gpsTimestamp: new Date().toISOString() });
    syncPendingHoles();
    if (currentHole >= 18) handleEndRound(); else advanceHole();
  }, [currentHole, location, updateHole, advanceHole, handleEndRound]);

  if (!activeRound || !holeData) {
    return (<SafeAreaView style={s.safe}><View style={s.center}><Text style={s.noRound}>No active round</Text></View></SafeAreaView>);
  }

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <View style={{ flex: 1 }}>
        {/* Header */}
        <View style={s.header}>
          <Text style={s.courseName}>{activeRound.courseName}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <SyncStatusBadge status={syncStatus} />
            <TouchableOpacity onPress={handleEndRound}><MaterialCommunityIcons name="flag-checkered" size={24} color="#ffb4ab" /></TouchableOpacity>
          </View>
        </View>

        {/* Map placeholder */}
        <View style={s.mapWrap}>
          <View style={s.mapPlaceholder}>
            <MaterialCommunityIcons name="map-marker-radius" size={40} color="#006747" />
            <Text style={s.mapText}>GPS Active — Map requires dev build</Text>
          </View>
          <View style={s.distOverlay}>
            <View style={{ alignItems: 'center' }}><Text style={s.distLabel}>FRONT</Text><Text style={[s.distVal, { color: '#84d7af' }]}>{distances.front}</Text></View>
            <View style={{ alignItems: 'center' }}><Text style={s.distLabel}>CENTER</Text><Text style={[s.distVal, { color: '#e9c349' }]}>{distances.center}</Text></View>
            <View style={{ alignItems: 'center' }}><Text style={s.distLabel}>BACK</Text><Text style={[s.distVal, { color: '#84d7af' }]}>{distances.back}</Text></View>
          </View>
        </View>

        {/* Scorecard Controls */}
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 16, gap: 12, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
          <View style={s.holeHeader}>
            <Text style={s.holeTitle}>Hole {currentHole} • Par {holeData.par}</Text>
            <View style={s.scorePill}>
              <Text style={[s.scorePillText, { color: scoreRelPar <= 0 ? '#84d7af' : '#ffb4ab' }]}>
                {scoreRelPar === 0 ? 'E' : scoreRelPar > 0 ? `+${scoreRelPar}` : scoreRelPar} • {holesPlayed} holes
              </Text>
            </View>
          </View>

          {/* Strokes */}
          <Card flexDirection="row" alignItems="center" justifyContent="space-between" paddingVertical={16}>
            <Text style={s.counterLabel}>Strokes</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
              <TouchableOpacity onPress={() => handleUpdateStrokes(-1)}><View style={s.minusBtn}><MaterialCommunityIcons name="minus" size={24} color="#bec9c1" /></View></TouchableOpacity>
              <Text style={s.counterVal}>{holeData.strokes}</Text>
              <TouchableOpacity onPress={() => handleUpdateStrokes(1)}><View style={s.plusBtn}><MaterialCommunityIcons name="plus" size={24} color="#84d7af" /></View></TouchableOpacity>
            </View>
          </Card>

          {/* Putts + Penalty */}
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <Card flex={1} flexDirection="row" alignItems="center" justifyContent="space-between">
              <Text style={s.counterLabelSm}>Putts</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <TouchableOpacity onPress={() => handleUpdatePutts(-1)}><View style={s.minusBtnSm}><MaterialCommunityIcons name="minus" size={18} color="#bec9c1" /></View></TouchableOpacity>
                <Text style={s.counterValSm}>{holeData.putts}</Text>
                <TouchableOpacity onPress={() => handleUpdatePutts(1)}><View style={s.plusBtnSm}><MaterialCommunityIcons name="plus" size={18} color="#84d7af" /></View></TouchableOpacity>
              </View>
            </Card>
            <TouchableOpacity onPress={handleAddPenalty} style={{ flex: 0 }}>
              <Card alignItems="center" justifyContent="center" paddingHorizontal={16} height="100%">
                <MaterialCommunityIcons name="alert-circle-outline" size={22} color="#e9c349" />
                <Text style={s.penText}>+{holeData.penalties}</Text>
              </Card>
            </TouchableOpacity>
          </View>

          <View style={{ paddingBottom: 16 }}>
            <Button variant="primary" fullWidth onPress={handleNextHole}>{currentHole >= 18 ? 'Finish Round' : 'Next Hole →'}</Button>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#101511' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  noRound: { color: '#dfe4dd', fontFamily: 'Manrope', fontSize: 14 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12 },
  courseName: { fontFamily: 'Newsreader', fontSize: 24, fontStyle: 'italic', color: '#dfe4dd' },
  syncRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  syncText: { fontFamily: 'Manrope', fontSize: 11 },
  mapWrap: { height: 180, marginHorizontal: 16, borderRadius: 12, overflow: 'hidden', marginBottom: 12 },
  mapPlaceholder: { flex: 1, backgroundColor: '#0a1a10', alignItems: 'center', justifyContent: 'center' },
  mapText: { fontFamily: 'Manrope', fontSize: 12, color: '#bec9c1', marginTop: 8 },
  distOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-around', backgroundColor: 'rgba(16,21,17,0.85)', paddingVertical: 8, paddingHorizontal: 12 },
  distLabel: { fontFamily: 'Manrope', fontSize: 11, color: '#bec9c1' },
  distVal: { fontFamily: 'Manrope', fontSize: 16, fontWeight: '700' },
  controls: { flex: 1, paddingHorizontal: 16, gap: 12 },
  holeHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  holeTitle: { fontFamily: 'Newsreader', fontSize: 28, fontStyle: 'italic', color: '#dfe4dd' },
  scorePill: { backgroundColor: '#1c211c', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20 },
  scorePillText: { fontFamily: 'Manrope', fontSize: 13, fontWeight: '600' },
  counterLabel: { fontFamily: 'Manrope', fontSize: 16, fontWeight: '600', color: '#dfe4dd' },
  counterVal: { fontFamily: 'Manrope', fontSize: 30, fontWeight: '700', color: '#dfe4dd', minWidth: 50, textAlign: 'center' },
  counterLabelSm: { fontFamily: 'Manrope', fontSize: 14, fontWeight: '600', color: '#dfe4dd' },
  counterValSm: { fontFamily: 'Manrope', fontSize: 20, fontWeight: '700', color: '#dfe4dd', minWidth: 30, textAlign: 'center' },
  minusBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#101511', borderWidth: 1, borderColor: '#3f4943', alignItems: 'center', justifyContent: 'center' },
  plusBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#006747', alignItems: 'center', justifyContent: 'center' },
  minusBtnSm: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#101511', borderWidth: 1, borderColor: '#3f4943', alignItems: 'center', justifyContent: 'center' },
  plusBtnSm: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#006747', alignItems: 'center', justifyContent: 'center' },
  penText: { fontFamily: 'Manrope', fontSize: 12, fontWeight: '600', color: '#e9c349', marginTop: 4 },
});
