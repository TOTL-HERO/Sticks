import React, { useCallback } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, SectionList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import { apiFetch } from '../../lib/api';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';

interface Tournament {
  id: string;
  name: string;
  format: string;
  status: string;
  startDate: string | null;
  endDate: string | null;
  organization?: { name: string };
}

const STATUS_ORDER = ['DRAFT', 'REGISTRATION_OPEN', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'];
const STATUS_LABELS: Record<string, string> = {
  DRAFT: 'Draft',
  REGISTRATION_OPEN: 'Registration Open',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
};
const STATUS_COLORS: Record<string, string> = {
  DRAFT: '#bec9c1',
  REGISTRATION_OPEN: '#84d7af',
  IN_PROGRESS: '#e9c349',
  COMPLETED: '#c0c0c0',
  CANCELLED: '#ffb4ab',
};

function formatDate(d: string | null): string {
  if (!d) return '';
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function CommissionerHomeScreen() {
  const nav = useNavigation<any>();

  const { data, isLoading, error } = useQuery<Tournament[]>({
    queryKey: ['commissioner-tournaments'],
    queryFn: () => apiFetch<Tournament[]>('/tournaments?role=commissioner'),
  });

  const sections = React.useMemo(() => {
    if (!data) return [];
    const grouped: Record<string, Tournament[]> = {};
    for (const t of data) {
      if (!grouped[t.status]) grouped[t.status] = [];
      grouped[t.status].push(t);
    }
    return STATUS_ORDER
      .filter((s) => grouped[s]?.length)
      .map((s) => ({ title: STATUS_LABELS[s] ?? s, status: s, data: grouped[s] }));
  }, [data]);

  const renderTournament = useCallback(({ item }: { item: Tournament }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => nav.navigate('TournamentConfig', { tournamentId: item.id })}
    >
      <Card marginHorizontal={16} marginBottom={8}>
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.tournName}>{item.name}</Text>
            <Text style={styles.tournMeta}>
              {item.format.replace(/_/g, ' ')} · {formatDate(item.startDate)}
              {item.endDate ? ` – ${formatDate(item.endDate)}` : ''}
            </Text>
          </View>
          <View style={[styles.badge, { borderColor: STATUS_COLORS[item.status] ?? '#bec9c1' }]}>
            <Text style={[styles.badgeText, { color: STATUS_COLORS[item.status] ?? '#bec9c1' }]}>
              {STATUS_LABELS[item.status] ?? item.status}
            </Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  ), [nav]);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.headerRow}>
        <Text style={styles.header}>Tournaments</Text>
        <Button variant="primary" onPress={() => nav.navigate('TournamentConfig', {})}>
          Create Tournament
        </Button>
      </View>

      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#84d7af" />
        </View>
      ) : error ? (
        <View style={styles.center}>
          <MaterialCommunityIcons name="alert-circle-outline" size={48} color="#ffb4ab" />
          <Text style={styles.errorText}>Could not load tournaments</Text>
        </View>
      ) : sections.length === 0 ? (
        <View style={styles.center}>
          <MaterialCommunityIcons name="trophy-outline" size={48} color="#88938c" />
          <Text style={styles.emptyTitle}>No tournaments yet</Text>
          <Text style={styles.emptyDesc}>Create your first tournament to get started</Text>
        </View>
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          renderItem={renderTournament}
          renderSectionHeader={({ section }) => (
            <View style={styles.sectionHeader}>
              <View style={[styles.dot, { backgroundColor: STATUS_COLORS[section.status] }]} />
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.sectionCount}>{section.data.length}</Text>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#101511' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 16, paddingBottom: 12 },
  header: { color: '#dfe4dd', fontFamily: 'Newsreader', fontSize: 28, fontStyle: 'italic' },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8, gap: 8 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  sectionTitle: { fontFamily: 'Manrope', fontSize: 13, fontWeight: '600', color: '#bec9c1', flex: 1 },
  sectionCount: { fontFamily: 'Manrope', fontSize: 12, color: '#88938c' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  tournName: { fontFamily: 'Manrope', fontSize: 15, fontWeight: '600', color: '#dfe4dd' },
  tournMeta: { fontFamily: 'Manrope', fontSize: 12, color: '#bec9c1', marginTop: 2 },
  badge: { borderWidth: 1, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  badgeText: { fontFamily: 'Manrope', fontSize: 11, fontWeight: '600' },
  errorText: { color: '#bec9c1', fontFamily: 'Manrope', fontSize: 14, textAlign: 'center' },
  emptyTitle: { color: '#bec9c1', fontFamily: 'Manrope', fontSize: 16, textAlign: 'center' },
  emptyDesc: { color: '#bec9c1', fontFamily: 'Manrope', fontSize: 13, textAlign: 'center', opacity: 0.6 },
});
