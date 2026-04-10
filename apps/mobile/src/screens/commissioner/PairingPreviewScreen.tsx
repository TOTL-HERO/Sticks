import React, { useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, Alert, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigation, useRoute } from '@react-navigation/native';
import { apiFetch } from '../../lib/api';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';

type SeedMethod = 'ghin' | 'results' | 'manual';

interface PairingGroup {
  groupNumber: number;
  players: { entryId: string; name: string; ghinIndex: number | null; seedPosition: number | null }[];
}

interface BracketMatch {
  roundNumber: number;
  matchNumber: number;
  player1: { name: string; entryId: string } | null;
  player2: { name: string; entryId: string } | null;
  isBye: boolean;
  winner?: { name: string } | null;
  matchScore?: string | null;
}

export function PairingPreviewScreen() {
  const nav = useNavigation<any>();
  const route = useRoute<any>();
  const tournamentId = route.params?.tournamentId;
  const format = route.params?.format ?? 'STROKE_PLAY';
  const queryClient = useQueryClient();
  const [seedMethod, setSeedMethod] = useState<SeedMethod>('ghin');
  const isBracket = format === 'MATCH_PLAY';

  const { data: pairings, isLoading: loadingPairings } = useQuery<PairingGroup[]>({
    queryKey: ['pairings', tournamentId],
    queryFn: () => apiFetch<PairingGroup[]>(`/tournaments/${tournamentId}/pairings`),
    enabled: !!tournamentId && !isBracket,
  });

  const { data: bracket, isLoading: loadingBracket } = useQuery<BracketMatch[]>({
    queryKey: ['bracket', tournamentId],
    queryFn: () => apiFetch<BracketMatch[]>(`/tournaments/${tournamentId}/bracket`),
    enabled: !!tournamentId && isBracket,
  });

  const generateMutation = useMutation({
    mutationFn: () => {
      const endpoint = isBracket ? 'bracket' : 'pairings';
      return apiFetch(`/tournaments/${tournamentId}/${endpoint}`, {
        method: 'POST', body: JSON.stringify({ seedMethod }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: isBracket ? ['bracket', tournamentId] : ['pairings', tournamentId] });
    },
    onError: (err: Error) => Alert.alert('Error', err.message),
  });

  const publishMutation = useMutation({
    mutationFn: () => {
      const endpoint = isBracket ? 'bracket/publish' : 'pairings/publish';
      return apiFetch(`/tournaments/${tournamentId}/${endpoint}`, { method: 'POST' });
    },
    onSuccess: () => {
      Alert.alert('Published', 'Draw has been published to players');
      nav.goBack();
    },
    onError: (err: Error) => Alert.alert('Error', err.message),
  });

  const isLoading = loadingPairings || loadingBracket;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => nav.goBack()} hitSlop={12}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#dfe4dd" />
        </TouchableOpacity>
        <Text style={styles.header}>{isBracket ? 'Bracket Preview' : 'Pairing Preview'}</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.seedRow}>
        <Text style={styles.seedLabel}>Seed by:</Text>
        {(['ghin', 'results', 'manual'] as SeedMethod[]).map((m) => (
          <TouchableOpacity key={m} onPress={() => setSeedMethod(m)} activeOpacity={0.7}
            style={[styles.chip, seedMethod === m && styles.chipActive]}>
            <Text style={[styles.chipText, seedMethod === m && styles.chipTextActive]}>
              {m === 'ghin' ? 'GHIN' : m === 'results' ? 'Results' : 'Manual'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.actionRow}>
        <Button variant="secondary" onPress={() => generateMutation.mutate()}>
          {generateMutation.isPending ? 'Generating...' : 'Generate'}
        </Button>
        <Button variant="primary" onPress={() => publishMutation.mutate()}>
          {publishMutation.isPending ? 'Publishing...' : 'Publish Draw'}
        </Button>
      </View>

      {isLoading ? (
        <View style={styles.center}><ActivityIndicator size="large" color="#84d7af" /></View>
      ) : isBracket ? (
        <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
          {(bracket ?? []).map((m) => (
            <Card key={`${m.roundNumber}-${m.matchNumber}`} marginBottom={8}>
              <Text style={styles.matchLabel}>R{m.roundNumber} · Match {m.matchNumber}{m.isBye ? ' (BYE)' : ''}</Text>
              <View style={styles.matchRow}>
                <Text style={[styles.playerName, m.winner?.name === m.player1?.name && styles.winner]}>
                  {m.player1?.name ?? 'BYE'}
                </Text>
                <Text style={styles.vs}>vs</Text>
                <Text style={[styles.playerName, m.winner?.name === m.player2?.name && styles.winner]}>
                  {m.player2?.name ?? 'BYE'}
                </Text>
              </View>
              {m.matchScore && <Text style={styles.matchScore}>{m.matchScore}</Text>}
            </Card>
          ))}
          {(!bracket || bracket.length === 0) && (
            <Text style={styles.emptyText}>No bracket generated yet. Tap Generate above.</Text>
          )}
        </ScrollView>
      ) : (
        <FlatList
          data={pairings ?? []}
          keyExtractor={(item) => String(item.groupNumber)}
          contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
          ListEmptyComponent={<Text style={styles.emptyText}>No pairings generated yet. Tap Generate above.</Text>}
          renderItem={({ item }) => (
            <Card marginBottom={8}>
              <Text style={styles.groupLabel}>Group {item.groupNumber}</Text>
              {item.players.map((p) => (
                <View key={p.entryId} style={styles.pairingPlayer}>
                  <Text style={styles.playerName}>{p.name}</Text>
                  <Text style={styles.playerMeta}>GHIN: {p.ghinIndex ?? '—'}</Text>
                </View>
              ))}
            </Card>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#101511' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  headerRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8, gap: 12 },
  header: { flex: 1, color: '#dfe4dd', fontFamily: 'Newsreader', fontSize: 24, fontStyle: 'italic' },
  seedRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingBottom: 8, gap: 8 },
  seedLabel: { fontFamily: 'Manrope', fontSize: 13, color: '#bec9c1' },
  chip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, backgroundColor: '#1c211c', borderWidth: 1, borderColor: '#3f4943' },
  chipActive: { backgroundColor: '#006747', borderColor: '#84d7af' },
  chipText: { fontFamily: 'Manrope', fontSize: 12, fontWeight: '600', color: '#bec9c1' },
  chipTextActive: { color: '#84d7af' },
  actionRow: { flexDirection: 'row', paddingHorizontal: 16, paddingBottom: 12, gap: 12 },
  groupLabel: { fontFamily: 'Manrope', fontSize: 13, fontWeight: '700', color: '#84d7af', marginBottom: 8 },
  pairingPlayer: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
  playerName: { fontFamily: 'Manrope', fontSize: 14, color: '#dfe4dd' },
  playerMeta: { fontFamily: 'Manrope', fontSize: 12, color: '#bec9c1' },
  matchLabel: { fontFamily: 'Manrope', fontSize: 11, fontWeight: '600', color: '#bec9c1', marginBottom: 6 },
  matchRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  vs: { fontFamily: 'Manrope', fontSize: 12, color: '#88938c' },
  winner: { color: '#84d7af', fontWeight: '700' },
  matchScore: { fontFamily: 'Manrope', fontSize: 12, color: '#e9c349', textAlign: 'center', marginTop: 4 },
  emptyText: { fontFamily: 'Manrope', fontSize: 14, color: '#bec9c1', textAlign: 'center', paddingTop: 32 },
});
