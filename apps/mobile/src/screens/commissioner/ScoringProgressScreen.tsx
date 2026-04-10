import React, { useEffect, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { useNavigation, useRoute } from '@react-navigation/native';
import { apiFetch } from '../../lib/api';
import { supabase } from '../../lib/supabase';

interface PlayerProgress {
  entryId: string;
  name: string;
  holesCompleted: boolean[]; // index 0 = hole 1, true = submitted
  thru: number;
}

interface ProgressData {
  totalHoles: number;
  players: PlayerProgress[];
}

export function ScoringProgressScreen() {
  const nav = useNavigation<any>();
  const route = useRoute<any>();
  const tournamentId = route.params?.tournamentId;
  const [liveData, setLiveData] = useState<ProgressData | null>(null);

  const { data, isLoading, error } = useQuery<ProgressData>({
    queryKey: ['scoring-progress', tournamentId],
    queryFn: () => apiFetch<ProgressData>(`/tournaments/${tournamentId}/leaderboard?view=progress`),
    enabled: !!tournamentId,
  });

  useEffect(() => {
    if (data) setLiveData(data);
  }, [data]);

  useEffect(() => {
    if (!tournamentId) return;
    const channel = supabase
      .channel(`tournament:${tournamentId}`)
      .on('broadcast', { event: 'leaderboard_update' }, (payload: any) => {
        if (payload?.payload?.progress) {
          setLiveData(payload.payload.progress);
        }
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [tournamentId]);

  const progress = liveData ?? data;
  const totalHoles = progress?.totalHoles ?? 18;
  const players = progress?.players ?? [];

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => nav.goBack()} hitSlop={12}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#dfe4dd" />
        </TouchableOpacity>
        <Text style={styles.header}>Scoring Progress</Text>
        <View style={styles.liveBadge}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>LIVE</Text>
        </View>
      </View>

      {isLoading ? (
        <View style={styles.center}><ActivityIndicator size="large" color="#84d7af" /></View>
      ) : error ? (
        <View style={styles.center}>
          <MaterialCommunityIcons name="alert-circle-outline" size={48} color="#ffb4ab" />
          <Text style={styles.errorText}>Could not load progress</Text>
        </View>
      ) : players.length === 0 ? (
        <View style={styles.center}>
          <MaterialCommunityIcons name="golf" size={48} color="#88938c" />
          <Text style={styles.emptyText}>No scoring data yet</Text>
        </View>
      ) : (
        <ScrollView horizontal>
          <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
            {/* Header row */}
            <View style={styles.gridRow}>
              <View style={styles.nameCol}><Text style={styles.colHeader}>Player</Text></View>
              {Array.from({ length: totalHoles }, (_, i) => (
                <View key={i} style={styles.holeCol}>
                  <Text style={styles.colHeader}>{i + 1}</Text>
                </View>
              ))}
              <View style={styles.holeCol}><Text style={styles.colHeader}>Thru</Text></View>
            </View>

            {/* Player rows */}
            {players.map((p) => (
              <View key={p.entryId} style={styles.gridRow}>
                <View style={styles.nameCol}>
                  <Text style={styles.playerName} numberOfLines={1}>{p.name}</Text>
                </View>
                {Array.from({ length: totalHoles }, (_, i) => (
                  <View key={i} style={styles.holeCol}>
                    <View style={[styles.cell, p.holesCompleted[i] ? styles.cellDone : styles.cellPending]}>
                      {p.holesCompleted[i] && (
                        <MaterialCommunityIcons name="check" size={12} color="#101511" />
                      )}
                    </View>
                  </View>
                ))}
                <View style={styles.holeCol}>
                  <Text style={styles.thruText}>{p.thru}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#101511' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 },
  headerRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 16, paddingBottom: 12, gap: 12 },
  header: { flex: 1, color: '#dfe4dd', fontFamily: 'Newsreader', fontSize: 24, fontStyle: 'italic' },
  liveBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#1c211c', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 4 },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#84d7af' },
  liveText: { fontFamily: 'Manrope', fontSize: 10, fontWeight: '700', color: '#84d7af' },
  gridRow: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: 'rgba(63,73,67,0.3)' },
  nameCol: { width: 120, paddingHorizontal: 12, paddingVertical: 8 },
  holeCol: { width: 36, alignItems: 'center', paddingVertical: 8 },
  colHeader: { fontFamily: 'Manrope', fontSize: 11, fontWeight: '700', color: '#bec9c1' },
  playerName: { fontFamily: 'Manrope', fontSize: 12, color: '#dfe4dd' },
  cell: { width: 20, height: 20, borderRadius: 4, alignItems: 'center', justifyContent: 'center' },
  cellDone: { backgroundColor: '#84d7af' },
  cellPending: { backgroundColor: '#3f4943' },
  thruText: { fontFamily: 'Manrope', fontSize: 12, fontWeight: '600', color: '#bec9c1' },
  errorText: { color: '#bec9c1', fontFamily: 'Manrope', fontSize: 14 },
  emptyText: { color: '#bec9c1', fontFamily: 'Manrope', fontSize: 14 },
});
