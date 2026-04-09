import React, { useCallback } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import { Card } from '../components/Card';
import { apiFetch } from '../lib/api';

interface UserProfile { id: string; firstName: string; lastName: string; avatarUrl: string | null; ghinIndex: number | null; homeCourseName: string | null; }
interface Hole { holeNumber: number; strokes: number; putts: number; penalties: number; gpsTimestamp: string | null; par: number | null; }
interface Round { id: string; courseName: string; coursePar: number; totalScore: number | null; scoreRelToPar: number | null; isFinalized: boolean; startedAt: string; endedAt: string | null; holes: Hole[]; }
interface RoundsResponse { rounds: Round[]; nextCursor: string | null; }

function formatScore(rel: number | null): string { if (rel === null) return '--'; if (rel === 0) return 'E'; return rel > 0 ? `+${rel}` : `${rel}`; }
function formatDate(dateStr: string): string { return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); }

function StatCard({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <Card flex={1}>
      <View style={{ alignItems: 'center', gap: 8 }}>
        <MaterialCommunityIcons name={icon as any} size={20} color="#84d7af" />
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
      </View>
    </Card>
  );
}

export function ProfileScreen() {
  const navigation = useNavigation<any>();

  const { data: profile, isLoading: profileLoading } = useQuery<UserProfile>({
    queryKey: ['profile'], queryFn: () => apiFetch<UserProfile>('/users/me'),
  });
  const { data: roundsData, isLoading: roundsLoading } = useQuery<RoundsResponse>({
    queryKey: ['my-rounds'], queryFn: () => apiFetch<RoundsResponse>('/rounds/me'),
  });

  const rounds = roundsData?.rounds?.filter((r) => r.isFinalized) ?? [];
  const hasRounds = rounds.length > 0;
  let fairwayPct = '--'; let girPct = '--'; let avgPutts = '--';
  if (hasRounds) {
    const totalPutts = rounds.reduce((sum, r) => sum + r.holes.reduce((hs, h) => hs + h.putts, 0), 0);
    const totalHoles = rounds.reduce((sum, r) => sum + r.holes.length, 0);
    avgPutts = totalHoles > 0 ? (totalPutts / totalHoles).toFixed(1) : '--';
  }

  const handleRoundPress = useCallback((roundId: string) => { navigation.navigate('RoundDetail', { roundId }); }, [navigation]);
  const isLoading = profileLoading || roundsLoading;

  const renderRound = useCallback(({ item }: { item: Round }) => {
    const hasGps = item.holes.some((h) => h.gpsTimestamp !== null);
    return (
      <TouchableOpacity onPress={() => handleRoundPress(item.id)} activeOpacity={0.7}>
        <Card marginHorizontal={16} marginBottom={12}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.roundCourse}>{item.courseName}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 }}>
                <Text style={styles.roundDate}>{formatDate(item.startedAt)}</Text>
                {hasGps && <MaterialCommunityIcons name="check-decagram" size={14} color="#84d7af" />}
              </View>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={[styles.roundScore, { color: item.scoreRelToPar !== null && item.scoreRelToPar <= 0 ? '#84d7af' : '#ffb4ab' }]}>{formatScore(item.scoreRelToPar)}</Text>
              <Text style={styles.roundTotal}>{item.totalScore ?? '--'}</Text>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    );
  }, [handleRoundPress]);

  if (isLoading) {
    return (<SafeAreaView style={styles.safe} edges={['top']}><View style={styles.center}><ActivityIndicator size="large" color="#84d7af" /></View></SafeAreaView>);
  }

  const displayName = profile ? `${profile.firstName} ${profile.lastName}`.trim() || 'Golfer' : 'Golfer';

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <FlatList
        data={rounds} keyExtractor={(item) => item.id} renderItem={renderRound} contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View style={styles.hero}>
              <View style={styles.avatarWrap}><MaterialCommunityIcons name="account" size={40} color="#bec9c1" /></View>
              <Text style={styles.displayName}>{displayName}</Text>
              {profile?.homeCourseName && (
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <MaterialCommunityIcons name="map-marker" size={14} color="#88938c" />
                  <Text style={styles.homeCourse}>{profile.homeCourseName}</Text>
                </View>
              )}
              {profile?.ghinIndex !== null && profile?.ghinIndex !== undefined && (
                <View style={styles.handicapBadge}><Text style={styles.handicapText}>Handicap: {profile.ghinIndex}</Text></View>
              )}
            </View>
            <View style={styles.statsRow}>
              <StatCard label="Fairways Hit" value={fairwayPct} icon="golf-tee" />
              <StatCard label="GIR" value={girPct} icon="flag-variant" />
              <StatCard label="Avg Putts" value={avgPutts} icon="circle-outline" />
            </View>
            <View style={styles.historyHeader}><Text style={styles.historyLabel}>ROUND HISTORY</Text></View>
          </>
        }
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            <MaterialCommunityIcons name="golf" size={48} color="#88938c" />
            <Text style={styles.emptyTitle}>No rounds yet</Text>
            <Text style={styles.emptyDesc}>Play a round to see your stats and history</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#101511' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  hero: { alignItems: 'center', paddingVertical: 24, paddingHorizontal: 16, gap: 12 },
  avatarWrap: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#1c211c', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#006747' },
  displayName: { color: '#dfe4dd', fontFamily: 'Newsreader', fontSize: 32, fontStyle: 'italic' },
  homeCourse: { fontFamily: 'Manrope', fontSize: 13, color: '#bec9c1' },
  handicapBadge: { backgroundColor: '#1c211c', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 8, borderWidth: 1, borderColor: '#3f4943' },
  handicapText: { fontFamily: 'Manrope', fontSize: 13, color: '#e9c349', fontWeight: '600' },
  statsRow: { flexDirection: 'row', paddingHorizontal: 16, gap: 12, marginBottom: 20 },
  statValue: { fontFamily: 'Manrope', fontSize: 18, fontWeight: '700', color: '#dfe4dd' },
  statLabel: { fontFamily: 'Manrope', fontSize: 12, color: '#bec9c1', textAlign: 'center' },
  historyHeader: { paddingHorizontal: 16, paddingBottom: 12 },
  historyLabel: { fontFamily: 'Manrope', fontSize: 12, fontWeight: '600', color: '#bec9c1' },
  roundCourse: { fontFamily: 'Manrope', fontSize: 14, fontWeight: '600', color: '#dfe4dd' },
  roundDate: { fontFamily: 'Manrope', fontSize: 12, color: '#bec9c1' },
  roundScore: { fontFamily: 'Manrope', fontSize: 16, fontWeight: '700' },
  roundTotal: { fontFamily: 'Manrope', fontSize: 12, color: '#bec9c1' },
  emptyWrap: { alignItems: 'center', paddingVertical: 48, gap: 16 },
  emptyTitle: { color: '#bec9c1', fontFamily: 'Manrope', fontSize: 16, textAlign: 'center' },
  emptyDesc: { color: '#bec9c1', fontFamily: 'Manrope', fontSize: 13, textAlign: 'center', opacity: 0.6 },
});
