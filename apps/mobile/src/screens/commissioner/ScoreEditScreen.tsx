import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigation, useRoute } from '@react-navigation/native';
import { apiFetch } from '../../lib/api';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';

interface HoleScore { holeNumber: number; score: number; par: number }
interface AuditEntry { id: string; holeNumber: number; originalValue: number; newValue: number; editedBy: { firstName: string; lastName: string }; createdAt: string }
interface ScoreData { playerName: string; holes: HoleScore[]; auditLog: AuditEntry[] }

export function ScoreEditScreen() {
  const nav = useNavigation<any>();
  const route = useRoute<any>();
  const { tournamentId, entryId } = route.params ?? {};
  const queryClient = useQueryClient();
  const [scores, setScores] = useState<Record<number, string>>({});

  const { data, isLoading, error } = useQuery<ScoreData>({
    queryKey: ['score-edit', tournamentId, entryId],
    queryFn: () => apiFetch<ScoreData>(`/tournaments/${tournamentId}/entries/${entryId}/scores`),
    enabled: !!tournamentId && !!entryId,
  });

  useEffect(() => {
    if (data?.holes) {
      const initial: Record<number, string> = {};
      data.holes.forEach((h) => { initial[h.holeNumber] = String(h.score); });
      setScores(initial);
    }
  }, [data]);

  const saveMutation = useMutation({
    mutationFn: () => {
      const holeScores = Object.entries(scores).map(([hole, score]) => ({
        holeNumber: parseInt(hole, 10),
        score: parseInt(score, 10),
      }));
      return apiFetch(`/tournaments/${tournamentId}/entries/${entryId}/scores`, {
        method: 'PUT',
        body: JSON.stringify({ holes: holeScores }),
      });
    },
    onSuccess: () => {
      Alert.alert('Saved', 'Scores updated with audit trail');
      queryClient.invalidateQueries({ queryKey: ['score-edit', tournamentId, entryId] });
    },
    onError: (err: Error) => Alert.alert('Error', err.message),
  });

  if (isLoading) {
    return <SafeAreaView style={styles.safe}><View style={styles.center}><ActivityIndicator size="large" color="#84d7af" /></View></SafeAreaView>;
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <MaterialCommunityIcons name="alert-circle-outline" size={48} color="#ffb4ab" />
          <Text style={styles.errorText}>Could not load scores</Text>
        </View>
      </SafeAreaView>
    );
  }

  const holes = data?.holes ?? [];
  const auditLog = data?.auditLog ?? [];

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => nav.goBack()} hitSlop={12}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#dfe4dd" />
        </TouchableOpacity>
        <Text style={styles.header}>Edit Scores</Text>
        <View style={{ width: 24 }} />
      </View>
      {data?.playerName && <Text style={styles.playerLabel}>{data.playerName}</Text>}

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 120 }}>
        <View style={styles.grid}>
          {holes.map((h) => (
            <View key={h.holeNumber} style={styles.holeCell}>
              <Text style={styles.holeNum}>{h.holeNumber}</Text>
              <Text style={styles.holePar}>Par {h.par}</Text>
              <TextInput
                style={styles.scoreInput}
                value={scores[h.holeNumber] ?? ''}
                onChangeText={(v) => setScores({ ...scores, [h.holeNumber]: v })}
                keyboardType="numeric"
                maxLength={2}
              />
            </View>
          ))}
        </View>

        <Button variant="primary" fullWidth onPress={() => saveMutation.mutate()}>
          {saveMutation.isPending ? 'Saving...' : 'Save Changes'}
        </Button>

        {auditLog.length > 0 && (
          <View style={{ marginTop: 24 }}>
            <Text style={styles.auditTitle}>Audit Trail</Text>
            {auditLog.map((a) => (
              <Card key={a.id} marginBottom={6}>
                <Text style={styles.auditText}>
                  Hole {a.holeNumber}: {a.originalValue} → {a.newValue}
                </Text>
                <Text style={styles.auditMeta}>
                  by {a.editedBy.firstName} {a.editedBy.lastName} · {new Date(a.createdAt).toLocaleString()}
                </Text>
              </Card>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#101511' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 },
  headerRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8, gap: 12 },
  header: { flex: 1, color: '#dfe4dd', fontFamily: 'Newsreader', fontSize: 24, fontStyle: 'italic' },
  playerLabel: { fontFamily: 'Manrope', fontSize: 15, fontWeight: '600', color: '#84d7af', paddingHorizontal: 16, paddingBottom: 8 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  holeCell: { width: '17%', alignItems: 'center', gap: 2 },
  holeNum: { fontFamily: 'Manrope', fontSize: 12, fontWeight: '700', color: '#bec9c1' },
  holePar: { fontFamily: 'Manrope', fontSize: 10, color: '#88938c' },
  scoreInput: { backgroundColor: '#1c211c', borderWidth: 1, borderColor: '#3f4943', borderRadius: 6, width: 40, height: 36, textAlign: 'center', color: '#dfe4dd', fontFamily: 'Manrope', fontSize: 16, fontWeight: '700' },
  auditTitle: { fontFamily: 'Manrope', fontSize: 14, fontWeight: '700', color: '#bec9c1', marginBottom: 8 },
  auditText: { fontFamily: 'Manrope', fontSize: 13, color: '#dfe4dd' },
  auditMeta: { fontFamily: 'Manrope', fontSize: 11, color: '#88938c', marginTop: 2 },
  errorText: { color: '#bec9c1', fontFamily: 'Manrope', fontSize: 14 },
});
