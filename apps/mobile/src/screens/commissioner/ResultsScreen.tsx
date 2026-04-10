import React from 'react';
import {
  View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, Alert, Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigation, useRoute } from '@react-navigation/native';
import { apiFetch } from '../../lib/api';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';

interface StandingEntry {
  rank: number;
  entryId: string;
  firstName: string;
  lastName: string;
  grossScore: number;
  netScore: number | null;
  scoreRelToPar: number;
  flight: string | null;
}

const MEDAL_COLORS = ['#e9c349', '#c0c0c0', '#cd7f32'];

function formatScore(rel: number): string {
  if (rel === 0) return 'E';
  return rel > 0 ? `+${rel}` : `${rel}`;
}

export function ResultsScreen() {
  const nav = useNavigation<any>();
  const route = useRoute<any>();
  const tournamentId = route.params?.tournamentId;
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<StandingEntry[]>({
    queryKey: ['tournament-results', tournamentId],
    queryFn: () => apiFetch<StandingEntry[]>(`/tournaments/${tournamentId}/leaderboard`),
    enabled: !!tournamentId,
  });

  const finalizeMutation = useMutation({
    mutationFn: () => apiFetch(`/tournaments/${tournamentId}/finalize`, { method: 'POST' }),
    onSuccess: () => {
      Alert.alert('Finalized', 'Results have been finalized');
      queryClient.invalidateQueries({ queryKey: ['commissioner-tournaments'] });
    },
    onError: (err: Error) => Alert.alert('Error', err.message),
  });

  const handleExport = async (format: 'csv' | 'pdf') => {
    try {
      const res = await apiFetch<{ url: string }>(`/tournaments/${tournamentId}/export/${format}`);
      await Share.share({ url: res.url, message: `Tournament results: ${res.url}` });
    } catch (err: any) {
      Alert.alert('Export Error', err.message);
    }
  };

  const entries = data ?? [];

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => nav.goBack()} hitSlop={12}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#dfe4dd" />
        </TouchableOpacity>
        <Text style={styles.header}>Results</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.actionRow}>
        <Button variant="primary" onPress={() => finalizeMutation.mutate()}>
          {finalizeMutation.isPending ? 'Finalizing...' : 'Finalize Results'}
        </Button>
        <Button variant="secondary" onPress={() => handleExport('csv')}>CSV</Button>
        <Button variant="secondary" onPress={() => handleExport('pdf')}>PDF</Button>
      </View>

      {isLoading ? (
        <View style={styles.center}><ActivityIndicator size="large" color="#84d7af" /></View>
      ) : error ? (
        <View style={styles.center}>
          <MaterialCommunityIcons name="alert-circle-outline" size={48} color="#ffb4ab" />
          <Text style={styles.errorText}>Could not load results</Text>
        </View>
      ) : (
        <FlatList
          data={entries}
          keyExtractor={(item) => item.entryId}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item }) => (
            <View style={styles.entryRow}>
              <View style={styles.rankWrap}>
                <Text style={[styles.rank, item.rank <= 3 && { color: MEDAL_COLORS[item.rank - 1] }]}>
                  {item.rank}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.firstName} {item.lastName}</Text>
                {item.flight && <Text style={styles.meta}>{item.flight}</Text>}
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={[styles.score, { color: item.scoreRelToPar <= 0 ? '#84d7af' : '#ffb4ab' }]}>
                  {formatScore(item.scoreRelToPar)}
                </Text>
                <Text style={styles.meta}>{item.grossScore}{item.netScore != null ? ` / ${item.netScore}` : ''}</Text>
              </View>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#101511' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 },
  headerRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8, gap: 12 },
  header: { flex: 1, color: '#dfe4dd', fontFamily: 'Newsreader', fontSize: 24, fontStyle: 'italic' },
  actionRow: { flexDirection: 'row', paddingHorizontal: 16, paddingBottom: 12, gap: 8 },
  entryRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, gap: 12 },
  rankWrap: { width: 32, alignItems: 'center' },
  rank: { fontFamily: 'Manrope', fontSize: 16, fontWeight: '700', color: '#bec9c1' },
  name: { fontFamily: 'Manrope', fontSize: 14, fontWeight: '600', color: '#dfe4dd' },
  meta: { fontFamily: 'Manrope', fontSize: 12, color: '#bec9c1' },
  score: { fontFamily: 'Manrope', fontSize: 16, fontWeight: '700' },
  separator: { height: 1, backgroundColor: '#3f4943', marginHorizontal: 16, opacity: 0.3 },
  errorText: { color: '#bec9c1', fontFamily: 'Manrope', fontSize: 14 },
});
