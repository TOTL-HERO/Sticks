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

interface PointsRow { position: string; points: string }

export function SeasonConfigScreen() {
  const nav = useNavigation<any>();
  const route = useRoute<any>();
  const queryClient = useQueryClient();
  const seasonId = route.params?.seasonId;
  const isEdit = !!seasonId;

  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dropWorst, setDropWorst] = useState('0');
  const [pointsRows, setPointsRows] = useState<PointsRow[]>([
    { position: '1', points: '100' }, { position: '2', points: '90' }, { position: '3', points: '80' },
    { position: '4', points: '70' }, { position: '5', points: '60' },
  ]);

  const { data: existing, isLoading } = useQuery({
    queryKey: ['season', seasonId],
    queryFn: () => apiFetch<any>(`/seasons/${seasonId}`),
    enabled: isEdit,
  });

  useEffect(() => {
    if (!existing) return;
    setName(existing.name ?? '');
    setStartDate(existing.startDate?.split('T')[0] ?? '');
    setEndDate(existing.endDate?.split('T')[0] ?? '');
    setDropWorst(String(existing.dropWorstRounds ?? 0));
    if (existing.pointsSystem?.positions?.length) {
      setPointsRows(existing.pointsSystem.positions.map((p: any) => ({
        position: String(p.position), points: String(p.points),
      })));
    }
  }, [existing]);

  const saveMutation = useMutation({
    mutationFn: (body: any) =>
      isEdit
        ? apiFetch(`/seasons/${seasonId}`, { method: 'PUT', body: JSON.stringify(body) })
        : apiFetch('/seasons', { method: 'POST', body: JSON.stringify(body) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['seasons'] });
      nav.goBack();
    },
    onError: (err: Error) => Alert.alert('Error', err.message),
  });

  const handleSave = () => {
    if (!name.trim()) { Alert.alert('Validation', 'Season name is required'); return; }
    saveMutation.mutate({
      name: name.trim(),
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      dropWorstRounds: parseInt(dropWorst, 10) || 0,
      pointsSystem: {
        positions: pointsRows
          .filter((r) => r.position && r.points)
          .map((r) => ({ position: parseInt(r.position, 10), points: parseInt(r.points, 10) })),
      },
    });
  };

  const addRow = () => {
    const next = pointsRows.length + 1;
    setPointsRows([...pointsRows, { position: String(next), points: '' }]);
  };

  if (isEdit && isLoading) {
    return <SafeAreaView style={styles.safe}><View style={styles.center}><ActivityIndicator size="large" color="#84d7af" /></View></SafeAreaView>;
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => nav.goBack()} hitSlop={12}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#dfe4dd" />
        </TouchableOpacity>
        <Text style={styles.header}>{isEdit ? 'Edit Season' : 'Create Season'}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 120 }}>
        <Text style={styles.label}>Season Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="e.g. 2025 Spring Season" placeholderTextColor="#88938c" />

        <View style={styles.dateRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Start Date</Text>
            <TextInput style={styles.input} value={startDate} onChangeText={setStartDate} placeholder="YYYY-MM-DD" placeholderTextColor="#88938c" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>End Date</Text>
            <TextInput style={styles.input} value={endDate} onChangeText={setEndDate} placeholder="YYYY-MM-DD" placeholderTextColor="#88938c" />
          </View>
        </View>

        <Text style={styles.label}>Drop Worst Rounds</Text>
        <TextInput style={styles.input} value={dropWorst} onChangeText={setDropWorst} keyboardType="numeric" placeholderTextColor="#88938c" />

        <Text style={styles.label}>Points System</Text>
        <Card marginBottom={12}>
          <View style={styles.pointsHeader}>
            <Text style={styles.pointsCol}>Position</Text>
            <Text style={styles.pointsCol}>Points</Text>
          </View>
          {pointsRows.map((r, i) => (
            <View key={i} style={styles.pointsRow}>
              <TextInput style={[styles.input, { flex: 1, marginBottom: 0 }]} value={r.position} onChangeText={(v) => { const c = [...pointsRows]; c[i].position = v; setPointsRows(c); }} keyboardType="numeric" placeholderTextColor="#88938c" />
              <TextInput style={[styles.input, { flex: 1, marginBottom: 0 }]} value={r.points} onChangeText={(v) => { const c = [...pointsRows]; c[i].points = v; setPointsRows(c); }} keyboardType="numeric" placeholder="pts" placeholderTextColor="#88938c" />
              <TouchableOpacity onPress={() => setPointsRows(pointsRows.filter((_, idx) => idx !== i))} hitSlop={8}>
                <MaterialCommunityIcons name="close-circle" size={18} color="#ffb4ab" />
              </TouchableOpacity>
            </View>
          ))}
          <Button variant="ghost" onPress={addRow}>+ Add Position</Button>
        </Card>

        <Button variant="primary" fullWidth onPress={handleSave}>
          {saveMutation.isPending ? 'Saving...' : isEdit ? 'Update Season' : 'Create Season'}
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#101511' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  headerRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 16, paddingBottom: 12, gap: 12 },
  header: { flex: 1, color: '#dfe4dd', fontFamily: 'Newsreader', fontSize: 24, fontStyle: 'italic' },
  label: { fontFamily: 'Manrope', fontSize: 13, fontWeight: '600', color: '#bec9c1', marginBottom: 6, marginTop: 12 },
  input: { backgroundColor: '#1c211c', borderWidth: 1, borderColor: '#3f4943', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, color: '#dfe4dd', fontFamily: 'Manrope', fontSize: 14, marginBottom: 8 },
  dateRow: { flexDirection: 'row', gap: 12 },
  pointsHeader: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  pointsCol: { flex: 1, fontFamily: 'Manrope', fontSize: 11, fontWeight: '600', color: '#88938c' },
  pointsRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
});
