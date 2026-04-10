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

interface Entry {
  id: string;
  userId: string;
  flight: string | null;
  paymentStatus: string | null;
  seedPosition: number | null;
  user: { firstName: string; lastName: string; ghinIndex?: number | null };
}

export function RegistrationListScreen() {
  const nav = useNavigation<any>();
  const route = useRoute<any>();
  const tournamentId = route.params?.tournamentId;
  const queryClient = useQueryClient();
  const [addUserId, setAddUserId] = useState('');

  const { data, isLoading, error } = useQuery<Entry[]>({
    queryKey: ['tournament-entries', tournamentId],
    queryFn: () => apiFetch<Entry[]>(`/tournaments/${tournamentId}/entries`),
    enabled: !!tournamentId,
  });

  const removeMutation = useMutation({
    mutationFn: (entryId: string) =>
      apiFetch(`/tournaments/${tournamentId}/entries/${entryId}`, { method: 'DELETE' }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tournament-entries', tournamentId] }),
    onError: (err: Error) => Alert.alert('Error', err.message),
  });

  const addMutation = useMutation({
    mutationFn: (userId: string) =>
      apiFetch(`/tournaments/${tournamentId}/entries`, { method: 'POST', body: JSON.stringify({ userId }) }),
    onSuccess: () => {
      setAddUserId('');
      queryClient.invalidateQueries({ queryKey: ['tournament-entries', tournamentId] });
    },
    onError: (err: Error) => Alert.alert('Error', err.message),
  });

  const entries = data ?? [];

  const renderEntry = ({ item }: { item: Entry }) => (
    <Card marginHorizontal={16} marginBottom={8}>
      <View style={styles.row}>
        <View style={styles.avatar}>
          <MaterialCommunityIcons name="account" size={20} color="#bec9c1" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{item.user.firstName} {item.user.lastName}</Text>
          <Text style={styles.meta}>
            GHIN: {item.user.ghinIndex ?? '—'} · Flight: {item.flight ?? 'Unassigned'}
            {item.paymentStatus ? ` · ${item.paymentStatus}` : ''}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => Alert.alert('Remove Player', `Remove ${item.user.firstName}?`, [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Remove', style: 'destructive', onPress: () => removeMutation.mutate(item.id) },
          ])}
          hitSlop={8}
        >
          <MaterialCommunityIcons name="close-circle-outline" size={22} color="#ffb4ab" />
        </TouchableOpacity>
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => nav.goBack()} hitSlop={12}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#dfe4dd" />
        </TouchableOpacity>
        <Text style={styles.header}>Registrations</Text>
        <Text style={styles.count}>{entries.length} players</Text>
      </View>

      <View style={styles.addRow}>
        <TextInput style={[styles.input, { flex: 1 }]} value={addUserId} onChangeText={setAddUserId} placeholder="User ID to add" placeholderTextColor="#88938c" />
        <Button variant="primary" onPress={() => addUserId.trim() && addMutation.mutate(addUserId.trim())}>Add</Button>
      </View>

      {isLoading ? (
        <View style={styles.center}><ActivityIndicator size="large" color="#84d7af" /></View>
      ) : error ? (
        <View style={styles.center}>
          <MaterialCommunityIcons name="alert-circle-outline" size={48} color="#ffb4ab" />
          <Text style={styles.errorText}>Could not load entries</Text>
        </View>
      ) : entries.length === 0 ? (
        <View style={styles.center}>
          <MaterialCommunityIcons name="account-group-outline" size={48} color="#88938c" />
          <Text style={styles.emptyText}>No players registered yet</Text>
        </View>
      ) : (
        <FlatList data={entries} keyExtractor={(item) => item.id} renderItem={renderEntry} contentContainerStyle={{ paddingBottom: 100 }} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#101511' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 },
  headerRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8, gap: 12 },
  header: { flex: 1, color: '#dfe4dd', fontFamily: 'Newsreader', fontSize: 24, fontStyle: 'italic' },
  count: { fontFamily: 'Manrope', fontSize: 13, color: '#bec9c1' },
  addRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingBottom: 12, gap: 8 },
  input: { backgroundColor: '#1c211c', borderWidth: 1, borderColor: '#3f4943', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, color: '#dfe4dd', fontFamily: 'Manrope', fontSize: 14 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#101511', alignItems: 'center', justifyContent: 'center' },
  name: { fontFamily: 'Manrope', fontSize: 14, fontWeight: '600', color: '#dfe4dd' },
  meta: { fontFamily: 'Manrope', fontSize: 12, color: '#bec9c1', marginTop: 2 },
  errorText: { color: '#bec9c1', fontFamily: 'Manrope', fontSize: 14 },
  emptyText: { color: '#bec9c1', fontFamily: 'Manrope', fontSize: 14 },
});
