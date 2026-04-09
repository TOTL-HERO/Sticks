import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { Card } from '../components/Card';
import { apiFetch } from '../lib/api';

interface TeeTime { id: string; time: string; courseName: string; availableSpots: number; price: number; }
interface TeeTimeResponse { teeTimes: TeeTime[]; }

function getNext7Days(): Date[] { const days: Date[] = []; const today = new Date(); for (let i = 0; i < 7; i++) { const d = new Date(today); d.setDate(today.getDate() + i); days.push(d); } return days; }
function formatDateParam(d: Date): string { return d.toISOString().split('T')[0]; }
function formatDayLabel(d: Date, index: number): string { if (index === 0) return 'Today'; if (index === 1) return 'Tomorrow'; return d.toLocaleDateString('en-US', { weekday: 'short' }); }
function formatDayNumber(d: Date): string { return d.getDate().toString(); }
function formatTime(isoStr: string): string { return new Date(isoStr).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }); }

export function TeeTimeScreen() {
  const days = useMemo(() => getNext7Days(), []);
  const [selectedDate, setSelectedDate] = useState(days[0]);
  const dateParam = formatDateParam(selectedDate);

  const { data, isLoading, error, refetch } = useQuery<TeeTimeResponse>({
    queryKey: ['tee-times', dateParam],
    queryFn: () => apiFetch<TeeTimeResponse>(`/tee-times?date=${dateParam}`),
  });

  const teeTimes = data?.teeTimes ?? [];
  const handleBook = useCallback(() => { Alert.alert('Coming in M2', 'Tee time booking will be available in the next milestone.'); }, []);

  const renderTeeTime = useCallback(({ item }: { item: TeeTime }) => (
    <Card marginHorizontal={16} marginBottom={12}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <View style={styles.timeBox}><Text style={styles.timeText}>{formatTime(item.time)}</Text></View>
        <View style={{ flex: 1 }}>
          <Text style={styles.courseName}>{item.courseName}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 }}>
            <MaterialCommunityIcons name="account-group" size={14} color="#88938c" />
            <Text style={styles.meta}>{item.availableSpots} spots</Text>
            <Text style={styles.meta}>•</Text>
            <Text style={styles.price}>${item.price.toFixed(0)}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleBook} activeOpacity={0.7}>
          <View style={styles.bookBtn}><Text style={styles.bookText}>Book</Text></View>
        </TouchableOpacity>
      </View>
    </Card>
  ), [handleBook]);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.headerWrap}><Text style={styles.header}>Tee Times</Text></View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 12, gap: 8 }}>
        {days.map((day, index) => {
          const isSelected = formatDateParam(day) === dateParam;
          return (
            <TouchableOpacity key={formatDateParam(day)} onPress={() => setSelectedDate(day)} activeOpacity={0.7}>
              <View style={[styles.dayBtn, isSelected && styles.dayBtnActive]}>
                <Text style={[styles.dayLabel, isSelected && { color: '#84d7af' }]}>{formatDayLabel(day, index)}</Text>
                <Text style={[styles.dayNum, isSelected && { color: '#84d7af' }]}>{formatDayNumber(day)}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {isLoading ? (
        <View style={styles.center}><ActivityIndicator size="large" color="#84d7af" /></View>
      ) : error ? (
        <View style={styles.center}>
          <MaterialCommunityIcons name="alert-circle-outline" size={48} color="#ffb4ab" />
          <Text style={styles.errorText}>Could not load tee times</Text>
          <TouchableOpacity onPress={() => refetch()} activeOpacity={0.7}>
            <View style={styles.retryBtn}><Text style={styles.retryText}>Retry</Text></View>
          </TouchableOpacity>
        </View>
      ) : teeTimes.length === 0 ? (
        <View style={styles.center}>
          <MaterialCommunityIcons name="calendar-blank" size={48} color="#88938c" />
          <Text style={styles.emptyTitle}>No tee times available</Text>
          <Text style={styles.emptyDesc}>Try selecting a different date</Text>
        </View>
      ) : (
        <FlatList data={teeTimes} keyExtractor={(item) => item.id} renderItem={renderTeeTime} contentContainerStyle={{ paddingBottom: 100 }} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#101511' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 16 },
  headerWrap: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 },
  header: { color: '#dfe4dd', fontFamily: 'Newsreader', fontSize: 28, fontStyle: 'italic' },
  dayBtn: { width: 60, paddingVertical: 8, borderRadius: 8, alignItems: 'center', backgroundColor: '#1c211c', borderWidth: 1, borderColor: '#3f4943' },
  dayBtnActive: { backgroundColor: '#006747', borderColor: '#84d7af' },
  dayLabel: { fontFamily: 'Manrope', fontSize: 12, color: '#bec9c1' },
  dayNum: { fontFamily: 'Manrope', fontSize: 16, fontWeight: '700', color: '#dfe4dd' },
  timeBox: { width: 64, alignItems: 'center', paddingVertical: 8, backgroundColor: '#101511', borderRadius: 8 },
  timeText: { fontFamily: 'Manrope', fontSize: 16, fontWeight: '700', color: '#84d7af' },
  courseName: { fontFamily: 'Manrope', fontSize: 14, fontWeight: '600', color: '#dfe4dd' },
  meta: { fontFamily: 'Manrope', fontSize: 12, color: '#bec9c1' },
  price: { fontFamily: 'Manrope', fontSize: 12, color: '#e9c349', fontWeight: '600' },
  bookBtn: { paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#006747', borderRadius: 8 },
  bookText: { fontFamily: 'Manrope', fontSize: 13, fontWeight: '600', color: '#84d7af' },
  retryBtn: { paddingHorizontal: 20, paddingVertical: 12, backgroundColor: '#006747', borderRadius: 8, marginTop: 8 },
  retryText: { fontFamily: 'Manrope', fontSize: 14, fontWeight: '600', color: '#84d7af' },
  errorText: { color: '#bec9c1', fontFamily: 'Manrope', fontSize: 14, textAlign: 'center' },
  emptyTitle: { color: '#bec9c1', fontFamily: 'Manrope', fontSize: 16, textAlign: 'center' },
  emptyDesc: { color: '#bec9c1', fontFamily: 'Manrope', fontSize: 13, textAlign: 'center', opacity: 0.6 },
});
