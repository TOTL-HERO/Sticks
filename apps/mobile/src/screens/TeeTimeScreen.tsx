import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import { Card } from '../components/Card';
import { apiFetch } from '../lib/api';
import { colors, fonts, spacing, tabBar } from '../theme';

type TimeOfDay = 'morning' | 'afternoon' | 'twilight';

interface TeeTimeResult {
  providerRefId: string;
  provider: 'FOREUP' | 'GOLFNOW';
  courseName: string;
  courseId: string;
  courseDescription: string;
  datetime: string;
  availableSpots: number;
  pricePerPlayer: number;
  totalPrice: number;
}

// --- Helpers ---

function getNext14Days(): Date[] {
  const days: Date[] = [];
  const today = new Date();
  for (let i = 0; i < 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push(d);
  }
  return days;
}

function formatDateParam(d: Date): string {
  return d.toISOString().split('T')[0]!;
}

function formatDayLabel(d: Date, index: number): string {
  if (index === 0) return 'Today';
  if (index === 1) return 'Tomorrow';
  return d.toLocaleDateString('en-US', { weekday: 'short' });
}

function formatTime(isoStr: string): string {
  return new Date(isoStr).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

const TIME_OF_DAY_LABELS: Record<TimeOfDay, string> = {
  morning: '🌅 Morning',
  afternoon: '☀️ Afternoon',
  twilight: '🌆 Twilight',
};

export function TeeTimeScreen() {
  const navigation = useNavigation<any>();
  const days = useMemo(() => getNext14Days(), []);
  const [selectedDate, setSelectedDate] = useState(days[0]!);
  const [playerCount, setPlayerCount] = useState(2);
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('morning');

  const dateParam = formatDateParam(selectedDate);

  const { data, isLoading, error, refetch } = useQuery<{ teeTimes: TeeTimeResult[] }>({
    queryKey: ['tee-times-search', dateParam, playerCount, timeOfDay],
    queryFn: () => apiFetch(`/bookings/search?date=${dateParam}&players=${playerCount}&timeOfDay=${timeOfDay}`),
  });

  const teeTimes = data?.teeTimes ?? [];

  const handleSelectTeeTime = useCallback((teeTime: TeeTimeResult) => {
    navigation.navigate('CourseDetail', { teeTime, playerCount });
  }, [navigation, playerCount]);

  const renderTeeTime = useCallback(({ item }: { item: TeeTimeResult }) => (
    <TouchableOpacity onPress={() => handleSelectTeeTime(item)} activeOpacity={0.7}>
      <Card marginHorizontal={spacing.lg} marginBottom={spacing.md}>
        <View style={s.cardRow}>
          <View style={s.timeBox}>
            <Text style={s.timeText}>{formatTime(item.datetime)}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.courseName}>{item.courseName}</Text>
            <View style={s.metaRow}>
              <MaterialCommunityIcons name="account-group" size={13} color={colors.textMuted} />
              <Text style={s.meta}>{item.availableSpots} spots</Text>
              <Text style={s.meta}>·</Text>
              <Text style={s.price}>${item.pricePerPlayer}/player</Text>
            </View>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={20} color={colors.textMuted} />
        </View>
      </Card>
    </TouchableOpacity>
  ), [handleSelectTeeTime]);

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      {/* Header */}
      <View style={s.header}>
        <Text style={s.heading}>Tee Times</Text>
      </View>

      {/* Date picker */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={s.dateRow}
      >
        {days.map((day, i) => {
          const isSelected = formatDateParam(day) === dateParam;
          return (
            <TouchableOpacity key={formatDateParam(day)} onPress={() => setSelectedDate(day)} activeOpacity={0.7}>
              <View style={[s.dayChip, isSelected && s.dayChipActive]}>
                <Text style={[s.dayLabel, isSelected && s.dayLabelActive]}>{formatDayLabel(day, i)}</Text>
                <Text style={[s.dayNum, isSelected && s.dayNumActive]}>{day.getDate()}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Player count */}
      <View style={s.filterRow}>
        <Text style={s.filterLabel}>Players</Text>
        <View style={s.pillRow}>
          {[1, 2, 3, 4].map((n) => (
            <TouchableOpacity key={n} onPress={() => setPlayerCount(n)} activeOpacity={0.7}>
              <View style={[s.pill, playerCount === n && s.pillActive]}>
                <Text style={[s.pillText, playerCount === n && s.pillTextActive]}>{n}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Time of day filter */}
      <View style={s.filterRow}>
        <Text style={s.filterLabel}>Time</Text>
        <View style={s.pillRow}>
          {(['morning', 'afternoon', 'twilight'] as TimeOfDay[]).map((t) => (
            <TouchableOpacity key={t} onPress={() => setTimeOfDay(t)} activeOpacity={0.7}>
              <View style={[s.pill, timeOfDay === t && s.pillActive]}>
                <Text style={[s.pillText, timeOfDay === t && s.pillTextActive]}>
                  {TIME_OF_DAY_LABELS[t]}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Results */}
      {isLoading ? (
        <View style={s.center}>
          <ActivityIndicator size="large" color={colors.green} />
        </View>
      ) : error ? (
        <View style={s.center}>
          <MaterialCommunityIcons name="alert-circle-outline" size={48} color={colors.error} />
          <Text style={s.errorText}>Could not load tee times</Text>
          <TouchableOpacity onPress={() => refetch()} activeOpacity={0.7}>
            <View style={s.retryBtn}>
              <Text style={s.retryText}>Retry</Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : teeTimes.length === 0 ? (
        <View style={s.center}>
          <MaterialCommunityIcons name="calendar-blank" size={48} color={colors.textMuted} />
          <Text style={s.emptyTitle}>No tee times available</Text>
          <Text style={s.emptyDesc}>Try a different date, player count, or time of day</Text>
        </View>
      ) : (
        <FlatList
          data={teeTimes}
          keyExtractor={(item) => item.providerRefId}
          renderItem={renderTeeTime}
          contentContainerStyle={{ paddingBottom: tabBar.contentPadding }}
        />
      )}
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  header: { paddingHorizontal: spacing.lg, paddingTop: spacing.lg, paddingBottom: spacing.sm },
  heading: { fontFamily: fonts.heading, fontSize: 28, fontStyle: 'italic', color: colors.text },
  dateRow: { paddingHorizontal: spacing.lg, paddingBottom: spacing.sm, gap: spacing.sm },
  dayChip: { width: 58, paddingVertical: spacing.sm, borderRadius: 8, alignItems: 'center', backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border },
  dayChipActive: { backgroundColor: colors.greenDark, borderColor: colors.green },
  dayLabel: { fontFamily: fonts.body, fontSize: 11, color: colors.textSecondary },
  dayLabelActive: { color: colors.green },
  dayNum: { fontFamily: fonts.bodySemiBold, fontSize: 16, color: colors.text },
  dayNumActive: { color: colors.green },
  filterRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.lg, paddingVertical: spacing.xs, gap: spacing.md },
  filterLabel: { fontFamily: fonts.body, fontSize: 13, color: colors.textSecondary, width: 52 },
  pillRow: { flexDirection: 'row', gap: spacing.sm, flexWrap: 'wrap' },
  pill: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border },
  pillActive: { backgroundColor: colors.greenDark, borderColor: colors.green },
  pillText: { fontFamily: fonts.body, fontSize: 12, color: colors.textSecondary },
  pillTextActive: { color: colors.green, fontFamily: fonts.bodySemiBold },
  cardRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  timeBox: { width: 64, alignItems: 'center', paddingVertical: spacing.sm, backgroundColor: colors.bg, borderRadius: 8 },
  timeText: { fontFamily: fonts.bodySemiBold, fontSize: 15, color: colors.green },
  courseName: { fontFamily: fonts.bodySemiBold, fontSize: 14, color: colors.text },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
  meta: { fontFamily: fonts.body, fontSize: 12, color: colors.textSecondary },
  price: { fontFamily: fonts.bodySemiBold, fontSize: 12, color: colors.gold },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xxl, gap: spacing.lg },
  errorText: { fontFamily: fonts.body, fontSize: 14, color: colors.textSecondary, textAlign: 'center' },
  emptyTitle: { fontFamily: fonts.body, fontSize: 16, color: colors.textSecondary, textAlign: 'center' },
  emptyDesc: { fontFamily: fonts.body, fontSize: 13, color: colors.textSecondary, textAlign: 'center', opacity: 0.6 },
  retryBtn: { paddingHorizontal: 20, paddingVertical: 12, backgroundColor: colors.greenDark, borderRadius: 8 },
  retryText: { fontFamily: fonts.bodySemiBold, fontSize: 14, color: colors.green },
});
