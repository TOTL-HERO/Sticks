import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '../lib/api';
import { supabase } from '../lib/supabase';
import { Card } from '../components/Card';
import { SkeletonList } from '../components/Skeleton';

type Period = 'week' | 'month' | 'all';
interface LeaderboardEntry { userId: string; firstName: string; lastName: string; avatarUrl: string | null; scoreRelToPar: number; totalScore: number; courseName: string; rank: number; }
interface LeaderboardResponse { leaderboard: LeaderboardEntry[]; }

const PERIODS: { label: string; value: Period }[] = [
  { label: 'Week', value: 'week' }, { label: 'Month', value: 'month' }, { label: 'All Time', value: 'all' },
];

function formatScore(rel: number): string { if (rel === 0) return 'E'; return rel > 0 ? `+${rel}` : `${rel}`; }

export function LeaderboardScreen() {
  const [period, setPeriod] = useState<Period>('all');
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<LeaderboardResponse>({
    queryKey: ['leaderboard', period],
    queryFn: () => apiFetch<LeaderboardResponse>(`/leaderboard?period=${period}`),
  });

  useEffect(() => {
    const channel = supabase.channel('leaderboard').on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'FeedEvent' }, (payload) => {
      if (payload.new && (payload.new as any).eventType === 'ROUND_COMPLETED') queryClient.invalidateQueries({ queryKey: ['leaderboard'] });
    }).subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [queryClient]);

  const entries = data?.leaderboard ?? [];
  const myEntry = entries.length > 0 ? entries[0] : null;

  const renderEntry = useCallback(({ item }: { item: LeaderboardEntry }) => (
    <View style={styles.entryRow}>
      <View style={styles.rankWrap}><Text style={[styles.rank, item.rank <= 3 && { color: '#e9c349' }]}>{item.rank}</Text></View>
      <View style={styles.avatar}><MaterialCommunityIcons name="account" size={22} color="#bec9c1" /></View>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.firstName} {item.lastName}</Text>
        <Text style={styles.course}>{item.courseName}</Text>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <Text style={[styles.score, { color: item.scoreRelToPar <= 0 ? '#84d7af' : '#ffb4ab' }]}>{formatScore(item.scoreRelToPar)}</Text>
        <Text style={styles.total}>{item.totalScore}</Text>
      </View>
    </View>
  ), []);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.headerWrap}><Text style={styles.header}>Leaderboard</Text></View>
      <View style={styles.filters}>
        {PERIODS.map((p) => (
          <TouchableOpacity key={p.value} onPress={() => setPeriod(p.value)} activeOpacity={0.7} style={{ flex: 1 }}>
            <View style={[styles.filterBtn, period === p.value && styles.filterBtnActive]}>
              <Text style={[styles.filterText, period === p.value && styles.filterTextActive]}>{p.label}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {isLoading ? (
        <View style={{ paddingTop: 16 }}><SkeletonList count={6} /></View>
      ) : error ? (
        <View style={styles.center}><MaterialCommunityIcons name="alert-circle-outline" size={48} color="#ffb4ab" /><Text style={styles.errorText}>Could not load leaderboard</Text></View>
      ) : entries.length === 0 ? (
        <View style={styles.center}><MaterialCommunityIcons name="podium" size={48} color="#88938c" /><Text style={styles.emptyTitle}>No rounds yet</Text><Text style={styles.emptyDesc}>Play a round to see your ranking</Text></View>
      ) : (
        <FlatList data={entries} keyExtractor={(item) => item.userId} renderItem={renderEntry} contentContainerStyle={{ paddingBottom: myEntry ? 120 : 100 }}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}

      {myEntry && entries.length > 0 && (
        <View style={styles.stickyCard}>
          <Card elevated>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <View style={styles.myRankBadge}><Text style={styles.myRankText}>{myEntry.rank}</Text></View>
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>My Position</Text>
                <Text style={styles.course}>{myEntry.courseName}</Text>
              </View>
              <Text style={[styles.myScore, { color: myEntry.scoreRelToPar <= 0 ? '#84d7af' : '#ffb4ab' }]}>{formatScore(myEntry.scoreRelToPar)}</Text>
            </View>
          </Card>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#101511' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 16 },
  headerWrap: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 },
  header: { color: '#dfe4dd', fontFamily: 'Newsreader', fontSize: 28, fontStyle: 'italic' },
  filters: { flexDirection: 'row', paddingHorizontal: 16, paddingBottom: 12, gap: 8 },
  filterBtn: { paddingVertical: 8, borderRadius: 8, alignItems: 'center', backgroundColor: '#1c211c', borderWidth: 1, borderColor: '#3f4943' },
  filterBtnActive: { backgroundColor: '#006747', borderColor: '#84d7af' },
  filterText: { fontFamily: 'Manrope', fontSize: 13, fontWeight: '600', color: '#bec9c1' },
  filterTextActive: { color: '#84d7af' },
  entryRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, gap: 12 },
  rankWrap: { width: 32, alignItems: 'center' },
  rank: { fontFamily: 'Manrope', fontSize: 16, fontWeight: '700', color: '#bec9c1' },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#1c211c', alignItems: 'center', justifyContent: 'center' },
  name: { fontFamily: 'Manrope', fontSize: 14, fontWeight: '600', color: '#dfe4dd' },
  course: { fontFamily: 'Manrope', fontSize: 12, color: '#bec9c1' },
  score: { fontFamily: 'Manrope', fontSize: 16, fontWeight: '700' },
  total: { fontFamily: 'Manrope', fontSize: 12, color: '#bec9c1' },
  separator: { height: 1, backgroundColor: '#3f4943', marginHorizontal: 16, opacity: 0.3 },
  errorText: { color: '#bec9c1', fontFamily: 'Manrope', fontSize: 14, textAlign: 'center' },
  emptyTitle: { color: '#bec9c1', fontFamily: 'Manrope', fontSize: 16, textAlign: 'center' },
  emptyDesc: { color: '#bec9c1', fontFamily: 'Manrope', fontSize: 13, textAlign: 'center', opacity: 0.6 },
  stickyCard: { position: 'absolute', bottom: 100, left: 16, right: 16 },
  myRankBadge: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#006747', alignItems: 'center', justifyContent: 'center' },
  myRankText: { fontFamily: 'Manrope', fontSize: 14, fontWeight: '700', color: '#84d7af' },
  myScore: { fontFamily: 'Manrope', fontSize: 24, fontWeight: '700' },
});
