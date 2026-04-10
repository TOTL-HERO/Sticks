import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, ScrollView, Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { useNavigation, useRoute } from '@react-navigation/native';
import { apiFetch } from '../../lib/api';
import { supabase } from '../../lib/supabase';
import { Card } from '../../components/Card';

interface LeaderboardEntry {
  rank: number;
  entryId: string;
  userId: string;
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
  flight: string | null;
  scoreRelToPar: number;
  grossScore: number;
  netScore: number | null;
  thru: number;
  movement: 'up' | 'down' | 'unchanged';
  matchStatus?: string;
  bracketRound?: number;
}

interface TournamentMeta {
  name: string;
  format: string;
  handicapMode: string | null;
  leaderboardFrozen: boolean;
  flights: string[];
  organization: { name: string; logoUrl: string | null; colorScheme: { primary?: string; secondary?: string; accent?: string } | null };
}

interface LeaderboardResponse {
  meta: TournamentMeta;
  entries: LeaderboardEntry[];
  myEntry: LeaderboardEntry | null;
}

interface BracketMatch {
  roundNumber: number;
  matchNumber: number;
  player1: { name: string } | null;
  player2: { name: string } | null;
  winner: { name: string } | null;
  matchScore: string | null;
  isBye: boolean;
}

const MEDAL_COLORS = ['#e9c349', '#c0c0c0', '#cd7f32'];
const MOVEMENT_ICONS: Record<string, { name: string; color: string }> = {
  up: { name: 'arrow-up', color: '#84d7af' },
  down: { name: 'arrow-down', color: '#ffb4ab' },
  unchanged: { name: 'minus', color: '#88938c' },
};

function formatScore(rel: number): string {
  if (rel === 0) return 'E';
  return rel > 0 ? `+${rel}` : `${rel}`;
}

export function TournamentLeaderboardScreen() {
  const nav = useNavigation<any>();
  const route = useRoute<any>();
  const tournamentId = route.params?.tournamentId;
  const [flight, setFlight] = useState<string>('All');
  const [scoring, setScoring] = useState<'gross' | 'net'>('gross');
  const [liveEntries, setLiveEntries] = useState<LeaderboardEntry[] | null>(null);
  const [showBracket, setShowBracket] = useState(false);

  const { data, isLoading, error } = useQuery<LeaderboardResponse>({
    queryKey: ['tournament-leaderboard', tournamentId, flight, scoring],
    queryFn: () => {
      const params = new URLSearchParams();
      if (flight !== 'All') params.set('flight', flight);
      params.set('scoring', scoring);
      return apiFetch<LeaderboardResponse>(`/tournaments/${tournamentId}/leaderboard?${params}`);
    },
    enabled: !!tournamentId,
  });

  const { data: bracketData } = useQuery<BracketMatch[]>({
    queryKey: ['bracket-view', tournamentId],
    queryFn: () => apiFetch<BracketMatch[]>(`/tournaments/${tournamentId}/bracket`),
    enabled: !!tournamentId && showBracket,
  });

  // 20.2 — Supabase Realtime subscription
  useEffect(() => {
    if (!tournamentId) return;
    const channel = supabase
      .channel(`tournament:${tournamentId}`)
      .on('broadcast', { event: 'leaderboard_update' }, (payload: any) => {
        if (payload?.payload?.entries) {
          setLiveEntries(payload.payload.entries);
        }
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [tournamentId]);

  const meta = data?.meta;
  const entries = liveEntries ?? data?.entries ?? [];
  const myEntry = data?.myEntry;
  const flights = ['All', ...(meta?.flights ?? [])];
  const isMatchPlay = meta?.format === 'MATCH_PLAY';
  const isFrozen = meta?.leaderboardFrozen ?? false;
  const primary = meta?.organization?.colorScheme?.primary || '#84d7af';
  const secondary = meta?.organization?.colorScheme?.secondary || '#006747';

  const dynamicStyles = useMemo(() => StyleSheet.create({
    accent: { color: primary },
    accentBg: { backgroundColor: secondary },
  }), [primary, secondary]);

  const renderPodium = useCallback(() => {
    const top3 = entries.slice(0, 3);
    if (top3.length === 0) return null;
    return (
      <View style={styles.podium}>
        {top3.map((e, i) => (
          <View key={e.entryId} style={[styles.podiumItem, i === 0 && styles.podiumFirst]}>
            <View style={[styles.podiumMedal, { backgroundColor: MEDAL_COLORS[i] }]}>
              <Text style={styles.podiumRank}>{i + 1}</Text>
            </View>
            <Text style={styles.podiumName} numberOfLines={1}>{e.firstName} {e.lastName?.charAt(0)}.</Text>
            <Text style={[styles.podiumScore, { color: e.scoreRelToPar <= 0 ? primary : '#ffb4ab' }]}>
              {formatScore(e.scoreRelToPar)}
            </Text>
          </View>
        ))}
      </View>
    );
  }, [entries, primary]);

  const renderEntry = useCallback(({ item }: { item: LeaderboardEntry }) => {
    const mv = MOVEMENT_ICONS[item.movement] ?? MOVEMENT_ICONS.unchanged;
    return (
      <View style={styles.entryRow}>
        <View style={styles.rankWrap}>
          <Text style={[styles.rank, item.rank <= 3 && { color: MEDAL_COLORS[item.rank - 1] }]}>{item.rank}</Text>
        </View>
        <MaterialCommunityIcons name={mv.name as any} size={14} color={mv.color} />
        <View style={styles.avatar}>
          <MaterialCommunityIcons name="account" size={20} color="#bec9c1" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{item.firstName} {item.lastName}</Text>
          <Text style={styles.meta}>
            {item.flight ? `${item.flight} · ` : ''}Thru {item.thru}
            {isMatchPlay && item.matchStatus ? ` · ${item.matchStatus}` : ''}
          </Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={[styles.score, { color: item.scoreRelToPar <= 0 ? primary : '#ffb4ab' }]}>
            {formatScore(item.scoreRelToPar)}
          </Text>
          <Text style={styles.total}>
            {scoring === 'net' && item.netScore != null ? item.netScore : item.grossScore}
          </Text>
        </View>
      </View>
    );
  }, [primary, scoring, isMatchPlay]);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Header with org branding */}
      <View style={[styles.headerBar, dynamicStyles.accentBg]}>
        <TouchableOpacity onPress={() => nav.goBack()} hitSlop={12}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#dfe4dd" />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={styles.headerTitle}>{meta?.name ?? 'Leaderboard'}</Text>
          {meta?.organization?.name && <Text style={styles.headerOrg}>{meta.organization.name}</Text>}
        </View>
        <View style={{ width: 24 }} />
      </View>

      {isFrozen && (
        <View style={styles.frozenBanner}>
          <MaterialCommunityIcons name="pause-circle" size={16} color="#e9c349" />
          <Text style={styles.frozenText}>Leaderboard paused</Text>
        </View>
      )}

      {/* Flight filters */}
      {flights.length > 1 && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
          {flights.map((f) => (
            <TouchableOpacity key={f} onPress={() => setFlight(f)} activeOpacity={0.7}
              style={[styles.filterChip, flight === f && dynamicStyles.accentBg]}>
              <Text style={[styles.filterText, flight === f && dynamicStyles.accent]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* Net/Gross toggle + bracket toggle */}
      <View style={styles.toggleRow}>
        {meta?.handicapMode === 'both' && (
          <View style={styles.toggleGroup}>
            {(['gross', 'net'] as const).map((s) => (
              <TouchableOpacity key={s} onPress={() => setScoring(s)} activeOpacity={0.7}
                style={[styles.toggleBtn, scoring === s && dynamicStyles.accentBg]}>
                <Text style={[styles.toggleText, scoring === s && dynamicStyles.accent]}>{s.toUpperCase()}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        {isMatchPlay && (
          <TouchableOpacity onPress={() => setShowBracket(!showBracket)} activeOpacity={0.7}
            style={[styles.toggleBtn, showBracket && dynamicStyles.accentBg]}>
            <Text style={[styles.toggleText, showBracket && dynamicStyles.accent]}>Bracket</Text>
          </TouchableOpacity>
        )}
      </View>

      {isLoading ? (
        <View style={styles.center}><ActivityIndicator size="large" color={primary} /></View>
      ) : error ? (
        <View style={styles.center}>
          <MaterialCommunityIcons name="alert-circle-outline" size={48} color="#ffb4ab" />
          <Text style={styles.errorText}>Could not load leaderboard</Text>
        </View>
      ) : showBracket && bracketData ? (
        // 20.3 — Match play bracket view
        <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 120 }}>
          {bracketData.map((m) => (
            <Card key={`${m.roundNumber}-${m.matchNumber}`} marginBottom={8}>
              <Text style={styles.bracketLabel}>R{m.roundNumber} · Match {m.matchNumber}{m.isBye ? ' (BYE)' : ''}</Text>
              <View style={styles.bracketRow}>
                <Text style={[styles.bracketPlayer, m.winner?.name === m.player1?.name && { color: primary, fontWeight: '700' }]}>
                  {m.player1?.name ?? 'BYE'}
                </Text>
                <Text style={styles.bracketVs}>vs</Text>
                <Text style={[styles.bracketPlayer, m.winner?.name === m.player2?.name && { color: primary, fontWeight: '700' }]}>
                  {m.player2?.name ?? 'BYE'}
                </Text>
              </View>
              {m.matchScore && <Text style={styles.bracketScore}>{m.matchScore}</Text>}
            </Card>
          ))}
        </ScrollView>
      ) : entries.length === 0 ? (
        <View style={styles.center}>
          <MaterialCommunityIcons name="podium" size={48} color="#88938c" />
          <Text style={styles.emptyText}>No scores yet</Text>
        </View>
      ) : (
        <FlatList
          data={entries}
          keyExtractor={(item) => item.entryId}
          renderItem={renderEntry}
          ListHeaderComponent={renderPodium}
          contentContainerStyle={{ paddingBottom: myEntry ? 130 : 100 }}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}

      {/* My Position sticky card */}
      {myEntry && (
        <View style={styles.stickyCard}>
          <Card elevated>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <View style={[styles.myRankBadge, dynamicStyles.accentBg]}>
                <Text style={[styles.myRankText, dynamicStyles.accent]}>{myEntry.rank}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>My Position</Text>
                <Text style={styles.meta}>Thru {myEntry.thru}{myEntry.flight ? ` · ${myEntry.flight}` : ''}</Text>
              </View>
              <Text style={[styles.myScore, { color: myEntry.scoreRelToPar <= 0 ? primary : '#ffb4ab' }]}>
                {formatScore(myEntry.scoreRelToPar)}
              </Text>
            </View>
          </Card>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#101511' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 },
  headerBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 16, paddingBottom: 12, gap: 12 },
  headerTitle: { fontFamily: 'Newsreader', fontSize: 20, fontStyle: 'italic', color: '#dfe4dd', textAlign: 'center' },
  headerOrg: { fontFamily: 'Manrope', fontSize: 11, color: '#bec9c1', textAlign: 'center' },
  frozenBanner: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: 'rgba(233,195,73,0.15)', paddingVertical: 8 },
  frozenText: { fontFamily: 'Manrope', fontSize: 13, fontWeight: '600', color: '#e9c349' },
  filterRow: { paddingHorizontal: 16, paddingVertical: 8, gap: 8 },
  filterChip: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 8, backgroundColor: '#1c211c', borderWidth: 1, borderColor: '#3f4943' },
  filterText: { fontFamily: 'Manrope', fontSize: 12, fontWeight: '600', color: '#bec9c1' },
  toggleRow: { flexDirection: 'row', paddingHorizontal: 16, paddingBottom: 8, gap: 8 },
  toggleGroup: { flexDirection: 'row', gap: 4 },
  toggleBtn: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 6, backgroundColor: '#1c211c', borderWidth: 1, borderColor: '#3f4943' },
  toggleText: { fontFamily: 'Manrope', fontSize: 11, fontWeight: '600', color: '#bec9c1' },
  podium: { flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', paddingVertical: 16, paddingHorizontal: 16, gap: 12 },
  podiumItem: { alignItems: 'center', gap: 4, flex: 1 },
  podiumFirst: { marginBottom: 8 },
  podiumMedal: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  podiumRank: { fontFamily: 'Manrope', fontSize: 14, fontWeight: '700', color: '#101511' },
  podiumName: { fontFamily: 'Manrope', fontSize: 12, fontWeight: '600', color: '#dfe4dd' },
  podiumScore: { fontFamily: 'Manrope', fontSize: 16, fontWeight: '700' },
  entryRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 10, gap: 8 },
  rankWrap: { width: 28, alignItems: 'center' },
  rank: { fontFamily: 'Manrope', fontSize: 14, fontWeight: '700', color: '#bec9c1' },
  avatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#1c211c', alignItems: 'center', justifyContent: 'center' },
  name: { fontFamily: 'Manrope', fontSize: 13, fontWeight: '600', color: '#dfe4dd' },
  meta: { fontFamily: 'Manrope', fontSize: 11, color: '#bec9c1' },
  score: { fontFamily: 'Manrope', fontSize: 16, fontWeight: '700' },
  total: { fontFamily: 'Manrope', fontSize: 11, color: '#bec9c1' },
  separator: { height: 1, backgroundColor: '#3f4943', marginHorizontal: 16, opacity: 0.3 },
  stickyCard: { position: 'absolute', bottom: 100, left: 16, right: 16 },
  myRankBadge: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  myRankText: { fontFamily: 'Manrope', fontSize: 14, fontWeight: '700' },
  myScore: { fontFamily: 'Manrope', fontSize: 24, fontWeight: '700' },
  bracketLabel: { fontFamily: 'Manrope', fontSize: 11, fontWeight: '600', color: '#bec9c1', marginBottom: 6 },
  bracketRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  bracketPlayer: { fontFamily: 'Manrope', fontSize: 14, color: '#dfe4dd', flex: 1 },
  bracketVs: { fontFamily: 'Manrope', fontSize: 12, color: '#88938c', marginHorizontal: 8 },
  bracketScore: { fontFamily: 'Manrope', fontSize: 12, color: '#e9c349', textAlign: 'center', marginTop: 4 },
  errorText: { color: '#bec9c1', fontFamily: 'Manrope', fontSize: 14 },
  emptyText: { color: '#bec9c1', fontFamily: 'Manrope', fontSize: 14 },
});
