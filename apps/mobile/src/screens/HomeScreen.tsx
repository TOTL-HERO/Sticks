import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { TopAppBar } from '../components/TopAppBar';
import { Card } from '../components/Card';
import { SkeletonList } from '../components/Skeleton';
import { apiFetch } from '../lib/api';
import { supabase } from '../lib/supabase';

type FeedScope = 'following' | 'local' | 'global';

interface FeedActor { id: string; firstName: string; lastName: string; avatarUrl: string | null; }
interface FeedEvent { id: string; eventType: string; actorId: string; payload: { courseName?: string; totalScore?: number; scoreRelToPar?: number }; createdAt: string; actor: FeedActor; }
interface FeedResponse { events: FeedEvent[]; nextCursor: string | null; }

const SCOPES: { label: string; value: FeedScope }[] = [
  { label: 'Following', value: 'following' },
  { label: 'Local', value: 'local' },
  { label: 'Global', value: 'global' },
];

function formatScore(rel: number): string { if (rel === 0) return 'E'; return rel > 0 ? `+${rel}` : `${rel}`; }

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now'; if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString();
}

function LiveMatchTicker() {
  return (
    <View style={{ paddingHorizontal: 16, paddingBottom: 12 }}>
      <Text style={styles.sectionLabel}>LIVE MATCHES</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.liveCard}>
          <MaterialCommunityIcons name="golf" size={20} color="#88938c" />
          <Text style={styles.liveText}>No live matches</Text>
        </View>
      </ScrollView>
    </View>
  );
}

function FeedCard({ event }: { event: FeedEvent }) {
  const { actor, payload, createdAt } = event;
  const scoreRel = payload.scoreRelToPar ?? 0;
  return (
    <Card marginHorizontal={16} marginBottom={12}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <View style={styles.avatar}><MaterialCommunityIcons name="account" size={22} color="#bec9c1" /></View>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Text style={styles.feedName}>{actor.firstName} {actor.lastName}</Text>
            <Text style={styles.feedTime}>{timeAgo(createdAt)}</Text>
          </View>
          <Text style={styles.feedDesc}>Completed a round at {payload.courseName ?? 'Unknown Course'}</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={[styles.feedScore, { color: scoreRel <= 0 ? '#84d7af' : '#ffb4ab' }]}>{formatScore(scoreRel)}</Text>
          <Text style={styles.feedTotal}>{payload.totalScore ?? '--'}</Text>
        </View>
      </View>
    </Card>
  );
}

export function HomeScreen() {
  const [scope, setScope] = useState<FeedScope>('global');
  const queryClient = useQueryClient();

  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery<FeedResponse>({
    queryKey: ['feed', scope],
    queryFn: ({ pageParam }) => {
      const params = new URLSearchParams({ scope, limit: '20' });
      if (pageParam) params.set('cursor', pageParam as string);
      return apiFetch<FeedResponse>(`/feed?${params.toString()}`);
    },
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  useEffect(() => {
    const channel = supabase.channel('feed-realtime').on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'FeedEvent' }, () => { queryClient.invalidateQueries({ queryKey: ['feed'] }); }).subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [queryClient]);

  const events = useMemo(() => data?.pages.flatMap((page) => page.events) ?? [], [data]);
  const handleEndReached = useCallback(() => { if (hasNextPage && !isFetchingNextPage) fetchNextPage(); }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const renderHeader = useCallback(() => (
    <>
      <LiveMatchTicker />
      <View style={styles.tabs}>
        {SCOPES.map((s) => (
          <TouchableOpacity key={s.value} onPress={() => setScope(s.value)} activeOpacity={0.7} style={{ flex: 1 }}>
            <View style={[styles.tab, scope === s.value && styles.tabActive]}>
              <Text style={[styles.tabText, scope === s.value && styles.tabTextActive]}>{s.label}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </>
  ), [scope]);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <TopAppBar />
      {isLoading && events.length === 0 ? (
        <View style={{ paddingTop: 16 }}>{renderHeader()}<SkeletonList count={5} /></View>
      ) : error && events.length === 0 ? (
        <>{renderHeader()}<View style={styles.center}><MaterialCommunityIcons name="alert-circle-outline" size={48} color="#ffb4ab" /><Text style={styles.errorText}>Could not load feed</Text></View></>
      ) : (
        <FlatList
          data={events} keyExtractor={(item) => item.id}
          renderItem={({ item }) => <FeedCard event={item} />}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={<View style={styles.emptyWrap}><MaterialCommunityIcons name="newspaper-variant-outline" size={48} color="#88938c" /><Text style={styles.emptyTitle}>No activity yet</Text><Text style={styles.emptyDesc}>Play a round or follow other golfers to see their activity</Text></View>}
          onEndReached={handleEndReached} onEndReachedThreshold={0.5}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListFooterComponent={isFetchingNextPage ? <View style={{ paddingVertical: 16, alignItems: 'center' }}><ActivityIndicator size="small" color="#84d7af" /></View> : null}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#101511' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  sectionLabel: { fontFamily: 'Manrope', fontSize: 12, fontWeight: '600', color: '#bec9c1', marginBottom: 8 },
  liveCard: { backgroundColor: '#1c211c', borderRadius: 8, borderWidth: 1, borderColor: '#3f4943', paddingHorizontal: 16, paddingVertical: 12, minWidth: 200, alignItems: 'center', justifyContent: 'center' },
  liveText: { fontFamily: 'Manrope', fontSize: 13, color: '#bec9c1', marginTop: 4 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#101511', alignItems: 'center', justifyContent: 'center' },
  feedName: { fontFamily: 'Manrope', fontSize: 14, fontWeight: '600', color: '#dfe4dd' },
  feedTime: { fontFamily: 'Manrope', fontSize: 12, color: '#bec9c1' },
  feedDesc: { fontFamily: 'Manrope', fontSize: 13, color: '#bec9c1', marginTop: 4 },
  feedScore: { fontFamily: 'Manrope', fontSize: 18, fontWeight: '700' },
  feedTotal: { fontFamily: 'Manrope', fontSize: 12, color: '#bec9c1' },
  tabs: { flexDirection: 'row', paddingHorizontal: 16, paddingBottom: 12, gap: 8 },
  tab: { paddingVertical: 8, borderRadius: 8, alignItems: 'center', backgroundColor: '#1c211c', borderWidth: 1, borderColor: '#3f4943' },
  tabActive: { backgroundColor: '#006747', borderColor: '#84d7af' },
  tabText: { fontFamily: 'Manrope', fontSize: 13, fontWeight: '600', color: '#bec9c1' },
  tabTextActive: { color: '#84d7af' },
  errorText: { color: '#bec9c1', fontFamily: 'Manrope', fontSize: 14, textAlign: 'center' },
  emptyWrap: { alignItems: 'center', paddingVertical: 48, gap: 16 },
  emptyTitle: { color: '#bec9c1', fontFamily: 'Manrope', fontSize: 16, textAlign: 'center' },
  emptyDesc: { color: '#bec9c1', fontFamily: 'Manrope', fontSize: 13, textAlign: 'center', opacity: 0.6 },
});
