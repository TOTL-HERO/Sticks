import React, { useMemo } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet, Alert, Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigation, useRoute } from '@react-navigation/native';
import { apiFetch } from '../../lib/api';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';

interface OrgBranding { primary?: string; secondary?: string; accent?: string }
interface Tournament {
  id: string;
  name: string;
  format: string;
  status: string;
  handicapMode: string | null;
  startDate: string | null;
  endDate: string | null;
  prizePool: number | null;
  flightConfig: { flights: { name: string; minHandicap: number; maxHandicap: number }[] } | null;
  currentRound: number;
  organization: { id: string; name: string; logoUrl: string | null; colorScheme: OrgBranding | null };
  isRegistered?: boolean;
  registeredFlight?: string | null;
  pairingsPublished?: boolean;
  bracketPublished?: boolean;
}

const FORMAT_LABELS: Record<string, string> = {
  STROKE_PLAY: 'Stroke Play', MATCH_PLAY: 'Match Play', STABLEFORD: 'Stableford',
  SCRAMBLE: 'Scramble', BEST_BALL: 'Best Ball', CHAPMAN: 'Chapman',
};

function formatDate(d: string | null): string {
  if (!d) return '';
  return new Date(d).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

export function TournamentDetailScreen() {
  const nav = useNavigation<any>();
  const route = useRoute<any>();
  const tournamentId = route.params?.tournamentId;
  const queryClient = useQueryClient();

  const { data: tournament, isLoading, error } = useQuery<Tournament>({
    queryKey: ['tournament-detail', tournamentId],
    queryFn: () => apiFetch<Tournament>(`/tournaments/${tournamentId}`),
    enabled: !!tournamentId,
  });

  const registerMutation = useMutation({
    mutationFn: () => apiFetch(`/tournaments/${tournamentId}/register`, { method: 'POST' }),
    onSuccess: (res: any) => {
      Alert.alert('Registered!', res?.flight ? `You've been assigned to ${res.flight}` : 'You are registered');
      queryClient.invalidateQueries({ queryKey: ['tournament-detail', tournamentId] });
    },
    onError: (err: Error) => Alert.alert('Registration Error', err.message),
  });

  const org = tournament?.organization;
  const branding = org?.colorScheme;
  const primary = branding?.primary || '#84d7af';
  const secondary = branding?.secondary || '#006747';

  const dynamicStyles = useMemo(() => StyleSheet.create({
    accentBg: { backgroundColor: secondary },
    accentText: { color: primary },
  }), [primary, secondary]);

  if (isLoading) {
    return <SafeAreaView style={styles.safe}><View style={styles.center}><ActivityIndicator size="large" color="#84d7af" /></View></SafeAreaView>;
  }

  if (error || !tournament) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <MaterialCommunityIcons name="alert-circle-outline" size={48} color="#ffb4ab" />
          <Text style={styles.errorText}>Could not load tournament</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Org branding header */}
        <View style={[styles.brandingHeader, dynamicStyles.accentBg]}>
          <TouchableOpacity onPress={() => nav.goBack()} hitSlop={12} style={styles.backBtn}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="#dfe4dd" />
          </TouchableOpacity>
          {org?.logoUrl ? (
            <Image source={{ uri: org.logoUrl }} style={styles.orgLogo} resizeMode="contain" />
          ) : (
            <MaterialCommunityIcons name="trophy" size={32} color={primary} />
          )}
          <Text style={styles.orgName}>{org?.name}</Text>
        </View>

        <View style={styles.body}>
          <Text style={styles.tournName}>{tournament.name}</Text>
          <View style={styles.metaRow}>
            <View style={[styles.statusBadge, dynamicStyles.accentBg]}>
              <Text style={[styles.statusText, dynamicStyles.accentText]}>{tournament.status.replace(/_/g, ' ')}</Text>
            </View>
            <Text style={styles.metaText}>{FORMAT_LABELS[tournament.format] ?? tournament.format}</Text>
            {tournament.handicapMode && <Text style={styles.metaText}>· {tournament.handicapMode}</Text>}
          </View>

          <Card marginBottom={12}>
            <View style={styles.infoGrid}>
              <View style={styles.infoItem}>
                <MaterialCommunityIcons name="calendar" size={16} color="#bec9c1" />
                <Text style={styles.infoText}>{formatDate(tournament.startDate)}{tournament.endDate ? ` – ${formatDate(tournament.endDate)}` : ''}</Text>
              </View>
              <View style={styles.infoItem}>
                <MaterialCommunityIcons name="flag-checkered" size={16} color="#bec9c1" />
                <Text style={styles.infoText}>Round {tournament.currentRound}</Text>
              </View>
              {tournament.prizePool != null && (
                <View style={styles.infoItem}>
                  <MaterialCommunityIcons name="cash" size={16} color="#e9c349" />
                  <Text style={styles.infoText}>${tournament.prizePool.toLocaleString()}</Text>
                </View>
              )}
            </View>
          </Card>

          {/* Flights */}
          {tournament.flightConfig?.flights && tournament.flightConfig.flights.length > 0 && (
            <Card marginBottom={12}>
              <Text style={styles.sectionTitle}>Flights</Text>
              {tournament.flightConfig.flights.map((f) => (
                <View key={f.name} style={styles.flightRow}>
                  <Text style={styles.flightName}>{f.name}</Text>
                  <Text style={styles.flightRange}>Handicap {f.minHandicap}–{f.maxHandicap}</Text>
                </View>
              ))}
            </Card>
          )}

          {/* Registration (19.2) */}
          {tournament.status === 'REGISTRATION_OPEN' && !tournament.isRegistered && (
            <Button variant="primary" fullWidth onPress={() => registerMutation.mutate()}>
              {registerMutation.isPending ? 'Registering...' : 'Register for Tournament'}
            </Button>
          )}
          {tournament.isRegistered && (
            <Card marginBottom={12}>
              <View style={styles.registeredRow}>
                <MaterialCommunityIcons name="check-circle" size={20} color="#84d7af" />
                <Text style={styles.registeredText}>
                  You're registered{tournament.registeredFlight ? ` · ${tournament.registeredFlight}` : ''}
                </Text>
              </View>
            </Card>
          )}

          {/* Pairings / Bracket link */}
          {(tournament.pairingsPublished || tournament.bracketPublished) && (
            <TouchableOpacity
              onPress={() => nav.navigate('PairingPreview', { tournamentId: tournament.id, format: tournament.format })}
              activeOpacity={0.7}
            >
              <Card marginBottom={12}>
                <View style={styles.linkRow}>
                  <MaterialCommunityIcons name="account-group" size={20} color={primary} />
                  <Text style={[styles.linkText, dynamicStyles.accentText]}>
                    View {tournament.format === 'MATCH_PLAY' ? 'Bracket' : 'Pairings'}
                  </Text>
                  <MaterialCommunityIcons name="chevron-right" size={20} color={primary} />
                </View>
              </Card>
            </TouchableOpacity>
          )}

          {/* Leaderboard link */}
          {tournament.status === 'IN_PROGRESS' && (
            <TouchableOpacity
              onPress={() => nav.navigate('TournamentLeaderboard', { tournamentId: tournament.id })}
              activeOpacity={0.7}
            >
              <Card marginBottom={12}>
                <View style={styles.linkRow}>
                  <MaterialCommunityIcons name="podium" size={20} color="#e9c349" />
                  <Text style={[styles.linkText, { color: '#e9c349' }]}>Live Leaderboard</Text>
                  <MaterialCommunityIcons name="chevron-right" size={20} color="#e9c349" />
                </View>
              </Card>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#101511' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 },
  brandingHeader: { paddingTop: 16, paddingBottom: 20, paddingHorizontal: 16, alignItems: 'center', gap: 8 },
  backBtn: { position: 'absolute', top: 16, left: 16, zIndex: 1 },
  orgLogo: { width: 48, height: 48, borderRadius: 8 },
  orgName: { fontFamily: 'Manrope', fontSize: 13, fontWeight: '600', color: '#dfe4dd' },
  body: { padding: 16 },
  tournName: { fontFamily: 'Newsreader', fontSize: 28, fontStyle: 'italic', color: '#dfe4dd', marginBottom: 8 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
  statusBadge: { borderRadius: 6, paddingHorizontal: 10, paddingVertical: 3 },
  statusText: { fontFamily: 'Manrope', fontSize: 11, fontWeight: '700' },
  metaText: { fontFamily: 'Manrope', fontSize: 13, color: '#bec9c1' },
  infoGrid: { gap: 8 },
  infoItem: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  infoText: { fontFamily: 'Manrope', fontSize: 13, color: '#dfe4dd' },
  sectionTitle: { fontFamily: 'Manrope', fontSize: 13, fontWeight: '700', color: '#bec9c1', marginBottom: 8 },
  flightRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
  flightName: { fontFamily: 'Manrope', fontSize: 13, fontWeight: '600', color: '#dfe4dd' },
  flightRange: { fontFamily: 'Manrope', fontSize: 12, color: '#bec9c1' },
  registeredRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  registeredText: { fontFamily: 'Manrope', fontSize: 14, color: '#84d7af' },
  linkRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  linkText: { fontFamily: 'Manrope', fontSize: 14, fontWeight: '600', flex: 1 },
  errorText: { color: '#bec9c1', fontFamily: 'Manrope', fontSize: 14 },
});
