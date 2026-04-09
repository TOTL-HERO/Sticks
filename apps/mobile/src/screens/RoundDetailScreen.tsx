import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Card } from '../components/Card';
import { apiFetch } from '../lib/api';

interface Hole { id: string; holeNumber: number; strokes: number; putts: number; penalties: number; gpsTimestamp: string | null; par: number | null; }
interface Player { user: { id: string; firstName: string; lastName: string; avatarUrl: string | null }; }
interface RoundDetail { id: string; courseName: string; coursePar: number; totalScore: number | null; scoreRelToPar: number | null; isFinalized: boolean; startedAt: string; endedAt: string | null; holes: Hole[]; players: Player[]; }

function formatScore(rel: number | null): string { if (rel === null) return '--'; if (rel === 0) return 'E'; return rel > 0 ? `+${rel}` : `${rel}`; }
function formatDate(dateStr: string): string { return new Date(dateStr).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }); }
function holeScoreColor(strokes: number, par: number | null): string {
  if (!par) return '#dfe4dd';
  const diff = strokes - par;
  if (diff <= -2) return '#e9c349'; if (diff === -1) return '#84d7af'; if (diff === 0) return '#dfe4dd'; if (diff === 1) return '#ffb4ab'; return '#ff7961';
}

export function RoundDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const roundId = route.params?.roundId as string;

  const { data: round, isLoading, error } = useQuery<RoundDetail>({
    queryKey: ['round-detail', roundId],
    queryFn: () => apiFetch<RoundDetail>(`/rounds/${roundId}`),
    enabled: !!roundId,
  });

  if (isLoading) {
    return (<SafeAreaView style={styles.safe} edges={['top']}><View style={styles.center}><ActivityIndicator size="large" color="#84d7af" /></View></SafeAreaView>);
  }

  if (error || !round) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.center}>
          <MaterialCommunityIcons name="alert-circle-outline" size={48} color="#ffb4ab" />
          <Text style={styles.errorText}>Could not load round details</Text>
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}><Text style={styles.goBack}>Go Back</Text></TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}><MaterialCommunityIcons name="arrow-left" size={24} color="#bec9c1" /></TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.courseName}>{round.courseName}</Text>
          <Text style={styles.date}>{formatDate(round.startedAt)}</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={[styles.bigScore, { color: round.scoreRelToPar !== null && round.scoreRelToPar <= 0 ? '#84d7af' : '#ffb4ab' }]}>{formatScore(round.scoreRelToPar)}</Text>
          <Text style={styles.totalPar}>{round.totalScore ?? '--'} / Par {round.coursePar}</Text>
        </View>
      </View>

      <View style={styles.scorecardHeader}>
        <View style={{ width: 48, alignItems: 'center' }}><Text style={styles.colLabel}>Hole</Text></View>
        <View style={{ flex: 1, alignItems: 'center' }}><Text style={styles.colLabel}>Par</Text></View>
        <View style={{ flex: 1, alignItems: 'center' }}><Text style={styles.colLabel}>Score</Text></View>
        <View style={{ flex: 1, alignItems: 'center' }}><Text style={styles.colLabel}>Putts</Text></View>
        <View style={{ flex: 1, alignItems: 'center' }}><Text style={styles.colLabel}>Pen.</Text></View>
      </View>

      <FlatList
        data={round.holes} keyExtractor={(item) => item.id ?? `hole-${item.holeNumber}`} contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <View style={styles.holeRow}>
            <View style={{ width: 48, alignItems: 'center' }}><Text style={styles.holeNum}>{item.holeNumber}</Text></View>
            <View style={{ flex: 1, alignItems: 'center' }}><Text style={styles.holePar}>{item.par ?? '--'}</Text></View>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <View style={[styles.scoreBubble, { backgroundColor: item.par && item.strokes < item.par ? 'rgba(132,215,175,0.15)' : item.par && item.strokes > item.par ? 'rgba(255,180,171,0.15)' : 'transparent' }]}>
                <Text style={[styles.holeScore, { color: holeScoreColor(item.strokes, item.par) }]}>{item.strokes}</Text>
              </View>
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}><Text style={styles.holePutts}>{item.putts}</Text></View>
            <View style={{ flex: 1, alignItems: 'center' }}><Text style={[styles.holePen, item.penalties > 0 && { color: '#ffb4ab' }]}>{item.penalties}</Text></View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#101511' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 16 },
  headerRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, gap: 12 },
  courseName: { fontFamily: 'Newsreader', fontSize: 24, fontStyle: 'italic', color: '#dfe4dd' },
  date: { fontFamily: 'Manrope', fontSize: 12, color: '#bec9c1' },
  bigScore: { fontFamily: 'Manrope', fontSize: 28, fontWeight: '700' },
  totalPar: { fontFamily: 'Manrope', fontSize: 13, color: '#bec9c1' },
  errorText: { color: '#bec9c1', fontFamily: 'Manrope', fontSize: 14, textAlign: 'center' },
  goBack: { fontFamily: 'Manrope', fontSize: 14, color: '#84d7af', fontWeight: '600' },
  scorecardHeader: { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 8, backgroundColor: '#1c211c', borderBottomWidth: 1, borderBottomColor: '#3f4943' },
  colLabel: { fontFamily: 'Manrope', fontSize: 12, fontWeight: '600', color: '#bec9c1' },
  holeRow: { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(63,73,67,0.2)' },
  holeNum: { fontFamily: 'Manrope', fontSize: 14, fontWeight: '600', color: '#bec9c1' },
  holePar: { fontFamily: 'Manrope', fontSize: 14, color: '#bec9c1' },
  scoreBubble: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  holeScore: { fontFamily: 'Manrope', fontSize: 14, fontWeight: '700' },
  holePutts: { fontFamily: 'Manrope', fontSize: 14, color: '#dfe4dd' },
  holePen: { fontFamily: 'Manrope', fontSize: 14, color: '#bec9c1' },
});
