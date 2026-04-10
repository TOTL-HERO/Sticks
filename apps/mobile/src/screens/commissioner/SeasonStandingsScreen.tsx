import React, { useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, TextInput, ActivityIndicator, StyleSheet, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigation, useRoute } from '@react-navigation/native';
import { apiFetch } from '../../lib/api';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';

interface StandingsEntry {
  userId: string;
  firstName: string;
  lastName: string;
  totalPoints: number;
  eventsPlayed: number;
  eventsCounted: number;
  rank: number;
}

interface SeasonTournament {
  id: string;
  name: string;
  status: string;
  startDate: string | null;
}

interface SeasonDetail {
  id: string;
  name: string;
  finalized: boolean;
  standings: StandingsEntry[];
  tournaments: SeasonTournament[];
}

export function SeasonStandingsScreen() {
  const nav = useNavigation<any>();
  const route = useRoute<any>();
  const seasonId = route.params?.seasonId;
  const queryClient = useQueryClient();
  const [tab, setTab] = useState<'standings' | 'schedule' | 'roster'>('standings');
  const [addUserId, setAddUserId] = useState('');

  const { data, isLoading, error } = useQuery<SeasonDetail>({
    queryKey: ['season-detail', seasonId],
    queryFn: () => apiFetch<SeasonDetail>(`/seasons/${seasonId}`),
    enabled: !!seasonId,
  });

  const { data: standings } = useQuery<StandingsEntry[]>({
    queryKey: ['season-standings', seasonId],
    queryFn: () => apiFetch<StandingsEntry[]>(`/seasons/${seasonId}/standings`),
    enabled: !!seasonId,
  });

  const finalizeMutation = useMutation({
    mutationFn: () => apiFetch(`/seasons/${seasonId}/finalize`, { method: 'POST' }),
    onSuccess: () => {
      Alert.alert('Finalized', 'Season standings have been locked');
      queryClient.invalidateQueries({ queryKey: ['season-detail', seasonId] });
    },
    onError: (err: Error) => Alert.alert('Error', err.message),
  });

  const addRosterMutation = useMutation({
    mutationFn: (userId: string) =>
      apiFetch(`/seasons/${seasonId}/roster`, { method: 'POST', body: JSON.stringify({ userId }) }),
    onSuccess: () => {
      setAddUserId('');
      queryClient.invalidateQueries({ queryKey: ['season-detail', seasonId] });
    },
    onError: (err: Error) => Alert.alert('Error', err.message),
  });

  const removeRosterMutation = useMutation({
    mutationFn: (userId: string) =>
      apiFetch(`/seasons/${seasonId}/roster/${userId}`, { method: 'DELETE' }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['season-detail', seasonId] }),
    onError: (err: Error) => Alert.alert('Error', err.message),
  });

  const standingsData = standings ?? data?.standings ?? [];
  const tournaments = data?.tournaments ?? [];

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => nav.goBack()} hitSlop={12}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#dfe4dd" />
        </TouchableOpacity>
        <Text style={styles.header}>{data?.name ?? 'Season'}</Text>
        {data?.finalized && (
          <View style={styles.finalBadge}><Text style={styles.finalText}>FINAL</Text></View>
        )}
      </View>

      <View style={styles.tabs}>
        {(['standings', 'schedule', 'roster'] as const).map((t) => (
          <TouchableOpacity key={t} onPress={() => setTab(t)} activeOpacity={0.7} style={{ flex: 1 }}>
            <View style={[styles.tab, tab === t && styles.tabActive]}>
              <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>{t.charAt(0).toUpperCase() + t.slice(1)}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {isLoading ? (
        <View style={styles.center}><ActivityIndicator size="large" color="#84d7af" /></View>
      ) : error ? (
        <View style={styles.center}>
          <MaterialCommunityIcons name="alert-circle-outline" size={48} color="#ffb4ab" />
          <Text style={styles.errorText}>Could not load season</Text>
        </View>
      ) : tab === 'standings' ? (
        <>
          <FlatList
            data={standingsData}
            keyExtractor={(item) => item.userId}
            contentContainerStyle={{ paddingBottom: 120 }}
            ListEmptyComponent={<View style={styles.center}><Text style={styles.emptyText}>No standings data yet</Text></View>}
            renderItem={({ item }) => (
              <View style={styles.standingRow}>
                <View style={styles.rankWrap}>
                  <Text style={[styles.rank, item.rank <= 3 && { color: '#e9c349' }]}>{item.rank}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>{item.firstName} {item.lastName}</Text>
                  <Text style={styles.meta}>{item.eventsPlayed} played · {item.eventsCounted} counted</Text>
                </View>
                <Text style={styles.points}>{item.totalPoints} pts</Text>
              </View>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
          {!data?.finalized && (
            <View style={styles.bottomAction}>
              <Button variant="primary" fullWidth onPress={() => finalizeMutation.mutate()}>
                {finalizeMutation.isPending ? 'Finalizing...' : 'Finalize Season'}
              </Button>
            </View>
          )}
        </>
      ) : tab === 'schedule' ? (
        <FlatList
          data={tournaments}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
          ListEmptyComponent={<Text style={styles.emptyText}>No tournaments in this season</Text>}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => nav.navigate('TournamentDetail', { tournamentId: item.id })} activeOpacity={0.7}>
              <Card marginBottom={8}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.meta}>
                  {item.startDate ? new Date(item.startDate).toLocaleDateString() : ''} · {item.status.replace(/_/g, ' ')}
                </Text>
              </Card>
            </TouchableOpacity>
          )}
        />
      ) : (
        <>
          <View style={styles.addRow}>
            <TextInput style={[styles.input, { flex: 1 }]} value={addUserId} onChangeText={setAddUserId} placeholder="User ID to add" placeholderTextColor="#88938c" />
            <Button variant="primary" onPress={() => addUserId.trim() && addRosterMutation.mutate(addUserId.trim())}>Add</Button>
          </View>
          <FlatList
            data={standingsData}
            keyExtractor={(item) => item.userId}
            contentContainerStyle={{ paddingBottom: 100 }}
            ListEmptyComponent={<View style={styles.center}><Text style={styles.emptyText}>No roster members</Text></View>}
            renderItem={({ item }) => (
              <View style={styles.standingRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>{item.firstName} {item.lastName}</Text>
                </View>
                <TouchableOpacity onPress={() => removeRosterMutation.mutate(item.userId)} hitSlop={8}>
                  <MaterialCommunityIcons name="close-circle-outline" size={20} color="#ffb4ab" />
                </TouchableOpacity>
              </View>
            )}
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#101511' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 },
  headerRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8, gap: 12 },
  header: { flex: 1, color: '#dfe4dd', fontFamily: 'Newsreader', fontSize: 24, fontStyle: 'italic' },
  finalBadge: { backgroundColor: '#006747', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  finalText: { fontFamily: 'Manrope', fontSize: 10, fontWeight: '700', color: '#84d7af' },
  tabs: { flexDirection: 'row', paddingHorizontal: 16, paddingBottom: 12, gap: 8 },
  tab: { paddingVertical: 8, borderRadius: 8, alignItems: 'center', backgroundColor: '#1c211c', borderWidth: 1, borderColor: '#3f4943' },
  tabActive: { backgroundColor: '#006747', borderColor: '#84d7af' },
  tabText: { fontFamily: 'Manrope', fontSize: 13, fontWeight: '600', color: '#bec9c1' },
  tabTextActive: { color: '#84d7af' },
  standingRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, gap: 12 },
  rankWrap: { width: 32, alignItems: 'center' },
  rank: { fontFamily: 'Manrope', fontSize: 16, fontWeight: '700', color: '#bec9c1' },
  name: { fontFamily: 'Manrope', fontSize: 14, fontWeight: '600', color: '#dfe4dd' },
  meta: { fontFamily: 'Manrope', fontSize: 12, color: '#bec9c1' },
  points: { fontFamily: 'Manrope', fontSize: 16, fontWeight: '700', color: '#e9c349' },
  separator: { height: 1, backgroundColor: '#3f4943', marginHorizontal: 16, opacity: 0.3 },
  addRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingBottom: 12, gap: 8 },
  input: { backgroundColor: '#1c211c', borderWidth: 1, borderColor: '#3f4943', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, color: '#dfe4dd', fontFamily: 'Manrope', fontSize: 14 },
  bottomAction: { position: 'absolute', bottom: 100, left: 16, right: 16 },
  errorText: { color: '#bec9c1', fontFamily: 'Manrope', fontSize: 14 },
  emptyText: { color: '#bec9c1', fontFamily: 'Manrope', fontSize: 14, textAlign: 'center', paddingTop: 32 },
});
