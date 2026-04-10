import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet, Alert, Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigation, useRoute } from '@react-navigation/native';
import { apiFetch } from '../../lib/api';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';

const FORMATS = ['STROKE_PLAY', 'MATCH_PLAY', 'STABLEFORD', 'SCRAMBLE', 'BEST_BALL', 'CHAPMAN'] as const;
const FORMAT_LABELS: Record<string, string> = {
  STROKE_PLAY: 'Stroke Play', MATCH_PLAY: 'Match Play', STABLEFORD: 'Stableford',
  SCRAMBLE: 'Scramble', BEST_BALL: 'Best Ball', CHAPMAN: 'Chapman',
};
const HANDICAP_MODES = ['gross', 'net', 'both'] as const;
const BRACKET_TYPES = ['SINGLE_ELIMINATION', 'DOUBLE_ELIMINATION'] as const;

interface FlightDef { name: string; minHandicap: string; maxHandicap: string }

export function TournamentConfigScreen() {
  const nav = useNavigation<any>();
  const route = useRoute<any>();
  const queryClient = useQueryClient();
  const tournamentId = route.params?.tournamentId;
  const isEdit = !!tournamentId;

  const [name, setName] = useState('');
  const [format, setFormat] = useState<string>('STROKE_PLAY');
  const [handicapMode, setHandicapMode] = useState<string>('gross');
  const [handicapAllowance, setHandicapAllowance] = useState('100');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [prizePool, setPrizePool] = useState('');
  const [bracketType, setBracketType] = useState<string>('SINGLE_ELIMINATION');
  const [flights, setFlights] = useState<FlightDef[]>([]);
  const [enableFlights, setEnableFlights] = useState(false);
  const [numberOfRounds, setNumberOfRounds] = useState('1');
  const [cutThreshold, setCutThreshold] = useState('');
  const [cutAfterRound, setCutAfterRound] = useState('');
  const [carryForward, setCarryForward] = useState(true);
  const [seasonId, setSeasonId] = useState('');

  const { data: existing, isLoading: loadingExisting } = useQuery({
    queryKey: ['tournament', tournamentId],
    queryFn: () => apiFetch<any>(`/tournaments/${tournamentId}`),
    enabled: isEdit,
  });

  useEffect(() => {
    if (!existing) return;
    setName(existing.name ?? '');
    setFormat(existing.format ?? 'STROKE_PLAY');
    setHandicapMode(existing.handicapMode ?? 'gross');
    setHandicapAllowance(String(existing.handicapAllowance ?? 100));
    setStartDate(existing.startDate?.split('T')[0] ?? '');
    setEndDate(existing.endDate?.split('T')[0] ?? '');
    setPrizePool(existing.prizePool ? String(existing.prizePool) : '');
    setBracketType(existing.bracketType ?? 'SINGLE_ELIMINATION');
    if (existing.flightConfig?.flights?.length) {
      setEnableFlights(true);
      setFlights(existing.flightConfig.flights.map((f: any) => ({
        name: f.name, minHandicap: String(f.minHandicap), maxHandicap: String(f.maxHandicap),
      })));
    }
    if (existing.multiRoundConfig) {
      setNumberOfRounds(String(existing.multiRoundConfig.numberOfRounds ?? 1));
      setCutThreshold(existing.multiRoundConfig.cutRule?.threshold ? String(existing.multiRoundConfig.cutRule.threshold) : '');
      setCutAfterRound(existing.multiRoundConfig.cutRule?.afterRound ? String(existing.multiRoundConfig.cutRule.afterRound) : '');
      setCarryForward(existing.multiRoundConfig.carryForward ?? true);
    }
    setSeasonId(existing.seasonId ?? '');
  }, [existing]);

  const isLocked = isEdit && existing?.status === 'IN_PROGRESS';

  const saveMutation = useMutation({
    mutationFn: (body: any) =>
      isEdit
        ? apiFetch(`/tournaments/${tournamentId}`, { method: 'PUT', body: JSON.stringify(body) })
        : apiFetch('/tournaments', { method: 'POST', body: JSON.stringify(body) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['commissioner-tournaments'] });
      nav.goBack();
    },
    onError: (err: Error) => Alert.alert('Error', err.message),
  });

  const handleSave = () => {
    if (!name.trim()) { Alert.alert('Validation', 'Tournament name is required'); return; }
    const body: any = {
      name: name.trim(),
      format,
      handicapMode,
      handicapAllowance: parseFloat(handicapAllowance) || 100,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      prizePool: prizePool ? parseFloat(prizePool) : undefined,
      seasonId: seasonId || undefined,
    };
    if (format === 'MATCH_PLAY') body.bracketType = bracketType;
    if (enableFlights && flights.length > 0) {
      body.flightConfig = {
        flights: flights.map((f) => ({
          name: f.name, minHandicap: parseFloat(f.minHandicap) || 0, maxHandicap: parseFloat(f.maxHandicap) || 99,
        })),
      };
    }
    const rounds = parseInt(numberOfRounds, 10);
    if (rounds > 1) {
      body.multiRoundConfig = {
        numberOfRounds: rounds,
        carryForward,
        cutRule: cutThreshold ? { threshold: parseInt(cutThreshold, 10), afterRound: parseInt(cutAfterRound, 10) || 1 } : undefined,
      };
    }
    saveMutation.mutate(body);
  };

  const addFlight = () => setFlights([...flights, { name: `${String.fromCharCode(65 + flights.length)} Flight`, minHandicap: '', maxHandicap: '' }]);
  const removeFlight = (i: number) => setFlights(flights.filter((_, idx) => idx !== i));

  if (isEdit && loadingExisting) {
    return <SafeAreaView style={styles.safe}><View style={styles.center}><ActivityIndicator size="large" color="#84d7af" /></View></SafeAreaView>;
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => nav.goBack()} hitSlop={12}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#dfe4dd" />
        </TouchableOpacity>
        <Text style={styles.header}>{isEdit ? 'Edit Tournament' : 'Create Tournament'}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 120 }}>
        {isLocked && (
          <Card marginBottom={12}>
            <View style={styles.warningRow}>
              <MaterialCommunityIcons name="lock" size={16} color="#e9c349" />
              <Text style={styles.warningText}>Tournament is in progress — format and flights are locked</Text>
            </View>
          </Card>
        )}

        <Text style={styles.label}>Tournament Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="e.g. Spring Championship" placeholderTextColor="#88938c" />

        <Text style={styles.label}>Format</Text>
        <View style={styles.chipRow}>
          {FORMATS.map((f) => (
            <TouchableOpacity key={f} onPress={() => !isLocked && setFormat(f)} activeOpacity={0.7}
              style={[styles.chip, format === f && styles.chipActive, isLocked && styles.chipDisabled]}>
              <Text style={[styles.chipText, format === f && styles.chipTextActive]}>{FORMAT_LABELS[f]}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {format === 'MATCH_PLAY' && (
          <>
            <Text style={styles.label}>Bracket Type</Text>
            <View style={styles.chipRow}>
              {BRACKET_TYPES.map((b) => (
                <TouchableOpacity key={b} onPress={() => !isLocked && setBracketType(b)} activeOpacity={0.7}
                  style={[styles.chip, bracketType === b && styles.chipActive]}>
                  <Text style={[styles.chipText, bracketType === b && styles.chipTextActive]}>{b.replace(/_/g, ' ')}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        <Text style={styles.label}>Handicap Mode</Text>
        <View style={styles.chipRow}>
          {HANDICAP_MODES.map((m) => (
            <TouchableOpacity key={m} onPress={() => setHandicapMode(m)} activeOpacity={0.7}
              style={[styles.chip, handicapMode === m && styles.chipActive]}>
              <Text style={[styles.chipText, handicapMode === m && styles.chipTextActive]}>{m.charAt(0).toUpperCase() + m.slice(1)}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {(handicapMode === 'net' || handicapMode === 'both') && (
          <>
            <Text style={styles.label}>Handicap Allowance (%)</Text>
            <TextInput style={styles.input} value={handicapAllowance} onChangeText={setHandicapAllowance} keyboardType="numeric" placeholderTextColor="#88938c" />
          </>
        )}

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

        <Text style={styles.label}>Prize Pool ($)</Text>
        <TextInput style={styles.input} value={prizePool} onChangeText={setPrizePool} keyboardType="numeric" placeholder="Optional" placeholderTextColor="#88938c" />

        <Text style={styles.label}>Season ID (optional)</Text>
        <TextInput style={styles.input} value={seasonId} onChangeText={setSeasonId} placeholder="Link to season" placeholderTextColor="#88938c" />

        {/* Flights */}
        <View style={styles.switchRow}>
          <Text style={styles.label}>Enable Flights</Text>
          <Switch value={enableFlights} onValueChange={(v) => !isLocked && setEnableFlights(v)} trackColor={{ true: '#006747', false: '#3f4943' }} thumbColor="#dfe4dd" />
        </View>
        {enableFlights && (
          <View style={{ gap: 8, marginBottom: 16 }}>
            {flights.map((f, i) => (
              <Card key={i}>
                <View style={styles.flightRow}>
                  <TextInput style={[styles.input, { flex: 1, marginBottom: 0 }]} value={f.name} onChangeText={(v) => { const c = [...flights]; c[i].name = v; setFlights(c); }} placeholderTextColor="#88938c" />
                  <TextInput style={[styles.input, { width: 60, marginBottom: 0 }]} value={f.minHandicap} onChangeText={(v) => { const c = [...flights]; c[i].minHandicap = v; setFlights(c); }} placeholder="Min" keyboardType="numeric" placeholderTextColor="#88938c" />
                  <Text style={styles.flightDash}>–</Text>
                  <TextInput style={[styles.input, { width: 60, marginBottom: 0 }]} value={f.maxHandicap} onChangeText={(v) => { const c = [...flights]; c[i].maxHandicap = v; setFlights(c); }} placeholder="Max" keyboardType="numeric" placeholderTextColor="#88938c" />
                  <TouchableOpacity onPress={() => removeFlight(i)} hitSlop={8}>
                    <MaterialCommunityIcons name="close-circle" size={20} color="#ffb4ab" />
                  </TouchableOpacity>
                </View>
              </Card>
            ))}
            <Button variant="secondary" onPress={addFlight}>Add Flight</Button>
          </View>
        )}

        {/* Multi-round */}
        <Text style={styles.label}>Number of Rounds</Text>
        <TextInput style={styles.input} value={numberOfRounds} onChangeText={setNumberOfRounds} keyboardType="numeric" placeholderTextColor="#88938c" />
        {parseInt(numberOfRounds, 10) > 1 && (
          <Card marginBottom={16}>
            <View style={styles.switchRow}>
              <Text style={styles.sublabel}>Carry scores forward</Text>
              <Switch value={carryForward} onValueChange={setCarryForward} trackColor={{ true: '#006747', false: '#3f4943' }} thumbColor="#dfe4dd" />
            </View>
            <Text style={styles.sublabel}>Cut threshold (optional)</Text>
            <View style={styles.dateRow}>
              <TextInput style={[styles.input, { flex: 1 }]} value={cutThreshold} onChangeText={setCutThreshold} placeholder="Score" keyboardType="numeric" placeholderTextColor="#88938c" />
              <TextInput style={[styles.input, { flex: 1 }]} value={cutAfterRound} onChangeText={setCutAfterRound} placeholder="After round #" keyboardType="numeric" placeholderTextColor="#88938c" />
            </View>
          </Card>
        )}

        <Button variant="primary" fullWidth onPress={handleSave}>
          {saveMutation.isPending ? 'Saving...' : isEdit ? 'Update Tournament' : 'Create Tournament'}
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
  sublabel: { fontFamily: 'Manrope', fontSize: 12, color: '#bec9c1', marginBottom: 4 },
  input: { backgroundColor: '#1c211c', borderWidth: 1, borderColor: '#3f4943', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, color: '#dfe4dd', fontFamily: 'Manrope', fontSize: 14, marginBottom: 8 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 8 },
  chip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, backgroundColor: '#1c211c', borderWidth: 1, borderColor: '#3f4943' },
  chipActive: { backgroundColor: '#006747', borderColor: '#84d7af' },
  chipDisabled: { opacity: 0.5 },
  chipText: { fontFamily: 'Manrope', fontSize: 12, fontWeight: '600', color: '#bec9c1' },
  chipTextActive: { color: '#84d7af' },
  dateRow: { flexDirection: 'row', gap: 12 },
  switchRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  flightRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  flightDash: { color: '#bec9c1', fontFamily: 'Manrope' },
  warningRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  warningText: { fontFamily: 'Manrope', fontSize: 12, color: '#e9c349', flex: 1 },
});
