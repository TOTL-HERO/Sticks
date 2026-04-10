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

interface Dispute {
  id: string;
  holeNumber: number;
  claimedScore: number;
  recordedScore: number;
  evidenceUrl: string | null;
  status: 'OPEN' | 'RESOLVED' | 'DISMISSED';
  resolutionNotes: string | null;
  entry: { user: { firstName: string; lastName: string } };
}

const STATUS_COLORS: Record<string, string> = { OPEN: '#e9c349', RESOLVED: '#84d7af', DISMISSED: '#ffb4ab' };

export function DisputeListScreen() {
  const nav = useNavigation<any>();
  const route = useRoute<any>();
  const tournamentId = route.params?.tournamentId;
  const queryClient = useQueryClient();
  const [resolvingId, setResolvingId] = useState<string | null>(null);
  const [notes, setNotes] = useState('');

  const { data, isLoading, error } = useQuery<Dispute[]>({
    queryKey: ['disputes', tournamentId],
    queryFn: () => apiFetch<Dispute[]>(`/tournaments/${tournamentId}/disputes`),
    enabled: !!tournamentId,
  });

  const resolveMutation = useMutation({
    mutationFn: ({ disputeId, status, resolutionNotes }: { disputeId: string; status: string; resolutionNotes: string }) =>
      apiFetch(`/tournaments/${tournamentId}/disputes/${disputeId}`, {
        method: 'PUT',
        body: JSON.stringify({ status, resolutionNotes }),
      }),
    onSuccess: () => {
      setResolvingId(null);
      setNotes('');
      queryClient.invalidateQueries({ queryKey: ['disputes', tournamentId] });
    },
    onError: (err: Error) => Alert.alert('Error', err.message),
  });

  const disputes = data ?? [];

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => nav.goBack()} hitSlop={12}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#dfe4dd" />
        </TouchableOpacity>
        <Text style={styles.header}>Disputes</Text>
        <Text style={styles.count}>{disputes.filter((d) => d.status === 'OPEN').length} open</Text>
      </View>

      {isLoading ? (
        <View style={styles.center}><ActivityIndicator size="large" color="#84d7af" /></View>
      ) : error ? (
        <View style={styles.center}>
          <MaterialCommunityIcons name="alert-circle-outline" size={48} color="#ffb4ab" />
          <Text style={styles.errorText}>Could not load disputes</Text>
        </View>
      ) : disputes.length === 0 ? (
        <View style={styles.center}>
          <MaterialCommunityIcons name="check-circle-outline" size={48} color="#84d7af" />
          <Text style={styles.emptyText}>No disputes</Text>
        </View>
      ) : (
        <FlatList
          data={disputes}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
          renderItem={({ item }) => (
            <Card marginBottom={12}>
              <View style={styles.disputeHeader}>
                <Text style={styles.playerName}>{item.entry.user.firstName} {item.entry.user.lastName}</Text>
                <View style={[styles.badge, { borderColor: STATUS_COLORS[item.status] }]}>
                  <Text style={[styles.badgeText, { color: STATUS_COLORS[item.status] }]}>{item.status}</Text>
                </View>
              </View>
              <Text style={styles.detail}>
                Hole {item.holeNumber}: claims {item.claimedScore}, recorded {item.recordedScore}
              </Text>
              {item.evidenceUrl && (
                <Text style={styles.evidence}>📎 Evidence attached</Text>
              )}
              {item.resolutionNotes && (
                <Text style={styles.resolution}>Resolution: {item.resolutionNotes}</Text>
              )}
              {item.status === 'OPEN' && (
                resolvingId === item.id ? (
                  <View style={styles.resolveBox}>
                    <TextInput
                      style={styles.input}
                      value={notes}
                      onChangeText={setNotes}
                      placeholder="Resolution notes..."
                      placeholderTextColor="#88938c"
                    />
                    <View style={styles.resolveActions}>
                      <Button variant="primary" onPress={() => resolveMutation.mutate({ disputeId: item.id, status: 'RESOLVED', resolutionNotes: notes })}>
                        Accept Claim
                      </Button>
                      <Button variant="secondary" onPress={() => resolveMutation.mutate({ disputeId: item.id, status: 'DISMISSED', resolutionNotes: notes })}>
                        Dismiss
                      </Button>
                    </View>
                  </View>
                ) : (
                  <TouchableOpacity onPress={() => setResolvingId(item.id)} style={{ marginTop: 8 }}>
                    <Text style={styles.resolveLink}>Resolve →</Text>
                  </TouchableOpacity>
                )
              )}
            </Card>
          )}
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
  count: { fontFamily: 'Manrope', fontSize: 13, color: '#e9c349' },
  disputeHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  playerName: { fontFamily: 'Manrope', fontSize: 14, fontWeight: '600', color: '#dfe4dd' },
  badge: { borderWidth: 1, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 2 },
  badgeText: { fontFamily: 'Manrope', fontSize: 11, fontWeight: '600' },
  detail: { fontFamily: 'Manrope', fontSize: 13, color: '#bec9c1' },
  evidence: { fontFamily: 'Manrope', fontSize: 12, color: '#84d7af', marginTop: 4 },
  resolution: { fontFamily: 'Manrope', fontSize: 12, color: '#bec9c1', marginTop: 4, fontStyle: 'italic' },
  resolveLink: { fontFamily: 'Manrope', fontSize: 13, fontWeight: '600', color: '#84d7af' },
  resolveBox: { marginTop: 8, gap: 8 },
  resolveActions: { flexDirection: 'row', gap: 8 },
  input: { backgroundColor: '#101511', borderWidth: 1, borderColor: '#3f4943', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8, color: '#dfe4dd', fontFamily: 'Manrope', fontSize: 13 },
  errorText: { color: '#bec9c1', fontFamily: 'Manrope', fontSize: 14 },
  emptyText: { color: '#bec9c1', fontFamily: 'Manrope', fontSize: 14 },
});
