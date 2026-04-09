import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card } from '../components/Card';
import { apiFetch } from '../lib/api';

// --- Types ---

interface TeeTimeResult {
  providerRefId: string;
  provider: 'FOREUP' | 'GOLFNOW';
  courseName: string;
  courseId: string;
  datetime: string;
  availableSpots: number;
  pricePerPlayer: number;
  totalPrice: number;
}

interface SearchResponse {
  teeTimes: TeeTimeResult[];
}

interface BookingConfirmation {
  providerRefId: string;
  confirmationNumber: string;
  provider: 'FOREUP' | 'GOLFNOW';
  courseName: string;
  datetime: string;
  players: number;
  totalPrice: number;
}

interface Booking {
  id: string;
  courseName: string;
  datetime: string;
  bookingStatus: string;
  provider: string | null;
  playerCount: number | null;
  paymentAmount: number | null;
  confirmationNumber: string | null;
}

interface BookingsResponse {
  bookings: Booking[];
}

// --- Helpers ---

function getNext7Days(): Date[] {
  const days: Date[] = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push(d);
  }
  return days;
}

function formatDateParam(d: Date): string {
  return d.toISOString().split('T')[0];
}

function formatDayLabel(d: Date, index: number): string {
  if (index === 0) return 'Today';
  if (index === 1) return 'Tomorrow';
  return d.toLocaleDateString('en-US', { weekday: 'short' });
}

function formatDayNumber(d: Date): string {
  return d.getDate().toString();
}

function formatTime(isoStr: string): string {
  return new Date(isoStr).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

function formatDate(isoStr: string): string {
  return new Date(isoStr).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

function providerLabel(p: string | null): string {
  if (p === 'FOREUP') return 'foreUP';
  if (p === 'GOLFNOW') return 'GolfNow';
  return '';
}

function statusColor(status: string): string {
  if (status === 'BOOKED') return '#84d7af';
  if (status === 'CANCELLED') return '#ffb4ab';
  return '#e9c349';
}

// --- Main Component ---

type ScreenMode = 'search' | 'confirm' | 'success' | 'history';

export function TeeTimeScreen() {
  const queryClient = useQueryClient();
  const days = useMemo(() => getNext7Days(), []);
  const [selectedDate, setSelectedDate] = useState(days[0]);
  const [playerCount, setPlayerCount] = useState(2);
  const [mode, setMode] = useState<ScreenMode>('search');
  const [selectedTeeTime, setSelectedTeeTime] = useState<TeeTimeResult | null>(null);
  const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(null);

  const dateParam = formatDateParam(selectedDate);

  // --- Search query ---
  const { data: searchData, isLoading: searchLoading, error: searchError, refetch } = useQuery<SearchResponse>({
    queryKey: ['booking-search', dateParam, playerCount],
    queryFn: () => apiFetch<SearchResponse>(`/bookings/search?date=${dateParam}&players=${playerCount}`),
    enabled: mode === 'search',
  });

  const teeTimes = searchData?.teeTimes ?? [];

  // --- Booking history query ---
  const { data: historyData, isLoading: historyLoading } = useQuery<BookingsResponse>({
    queryKey: ['my-bookings'],
    queryFn: () => apiFetch<BookingsResponse>('/bookings/me'),
    enabled: mode === 'history',
  });

  const bookings = historyData?.bookings ?? [];

  // --- Book mutation ---
  const bookMutation = useMutation({
    mutationFn: (teeTime: TeeTimeResult) =>
      apiFetch<BookingConfirmation>('/bookings', {
        method: 'POST',
        body: JSON.stringify({
          providerRefId: teeTime.providerRefId,
          provider: teeTime.provider,
          players: playerCount,
        }),
      }),
    onSuccess: (data) => {
      setConfirmation(data);
      setMode('success');
      queryClient.invalidateQueries({ queryKey: ['my-bookings'] });
    },
    onError: (err: Error) => {
      Alert.alert('Booking Failed', err.message || 'Could not complete booking. Please try again.');
      setMode('search');
    },
  });

  // --- Cancel mutation ---
  const cancelMutation = useMutation({
    mutationFn: (bookingId: string) =>
      apiFetch(`/bookings/${bookingId}/cancel`, { method: 'POST' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-bookings'] });
      Alert.alert('Cancelled', 'Your booking has been cancelled.');
    },
    onError: (err: Error) => {
      Alert.alert('Cancel Failed', err.message || 'Could not cancel booking.');
    },
  });

  // --- Handlers ---
  const handleBook = useCallback((teeTime: TeeTimeResult) => {
    setSelectedTeeTime(teeTime);
    setMode('confirm');
  }, []);

  const handleConfirmBooking = useCallback(() => {
    if (!selectedTeeTime) return;
    bookMutation.mutate(selectedTeeTime);
  }, [selectedTeeTime, bookMutation]);

  const handleCancelBooking = useCallback((booking: Booking) => {
    Alert.alert(
      'Cancel Booking',
      `Cancel your ${formatTime(booking.datetime)} tee time at ${booking.courseName}? Refund eligibility depends on the cancellation policy.`,
      [
        { text: 'Keep Booking', style: 'cancel' },
        {
          text: 'Cancel Booking',
          style: 'destructive',
          onPress: () => cancelMutation.mutate(booking.id),
        },
      ],
    );
  }, [cancelMutation]);

  const handleBackToSearch = useCallback(() => {
    setMode('search');
    setSelectedTeeTime(null);
    setConfirmation(null);
  }, []);

  // --- Player count selector ---
  const renderPlayerSelector = () => (
    <View style={styles.playerRow}>
      <Text style={styles.playerLabel}>Players</Text>
      <View style={styles.playerBtns}>
        {[1, 2, 3, 4].map((n) => (
          <TouchableOpacity
            key={n}
            onPress={() => setPlayerCount(n)}
            activeOpacity={0.7}
          >
            <View style={[styles.playerBtn, n === playerCount && styles.playerBtnActive]}>
              <Text style={[styles.playerBtnText, n === playerCount && { color: '#84d7af' }]}>
                {n}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  // --- Tee time card ---
  const renderTeeTime = useCallback(
    ({ item }: { item: TeeTimeResult }) => (
      <Card marginHorizontal={16} marginBottom={12}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <View style={styles.timeBox}>
            <Text style={styles.timeText}>{formatTime(item.datetime)}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.courseName}>{item.courseName}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 }}>
              <MaterialCommunityIcons name="account-group" size={14} color="#88938c" />
              <Text style={styles.meta}>{item.availableSpots} spots</Text>
              <Text style={styles.meta}>•</Text>
              <Text style={styles.price}>${item.pricePerPlayer.toFixed(0)}/player</Text>
            </View>
            <Text style={styles.providerTag}>{providerLabel(item.provider)}</Text>
          </View>
          <TouchableOpacity onPress={() => handleBook(item)} activeOpacity={0.7}>
            <View style={styles.bookBtn}>
              <Text style={styles.bookText}>Book</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Card>
    ),
    [handleBook],
  );

  // --- Booking history card ---
  const renderBooking = useCallback(
    ({ item }: { item: Booking }) => (
      <Card marginHorizontal={16} marginBottom={12}>
        <View style={{ gap: 8 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={styles.courseName}>{item.courseName}</Text>
            <View style={[styles.statusBadge, { borderColor: statusColor(item.bookingStatus) }]}>
              <Text style={[styles.statusText, { color: statusColor(item.bookingStatus) }]}>
                {item.bookingStatus}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Text style={styles.meta}>{formatDate(item.datetime)}</Text>
            <Text style={styles.meta}>{formatTime(item.datetime)}</Text>
            {item.playerCount && (
              <>
                <Text style={styles.meta}>•</Text>
                <Text style={styles.meta}>{item.playerCount} player{item.playerCount > 1 ? 's' : ''}</Text>
              </>
            )}
          </View>
          {item.confirmationNumber && (
            <Text style={styles.confNum}>Conf# {item.confirmationNumber}</Text>
          )}
          {item.provider && (
            <Text style={styles.providerTag}>{providerLabel(item.provider)}</Text>
          )}
          {item.bookingStatus === 'BOOKED' && (
            <TouchableOpacity onPress={() => handleCancelBooking(item)} activeOpacity={0.7}>
              <View style={styles.cancelBtn}>
                <Text style={styles.cancelText}>Cancel Booking</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </Card>
    ),
    [handleCancelBooking],
  );

  // --- Confirmation screen ---
  if (mode === 'confirm' && selectedTeeTime) {
    const total = selectedTeeTime.pricePerPlayer * playerCount;
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.headerWrap}>
          <TouchableOpacity onPress={handleBackToSearch} activeOpacity={0.7}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="#dfe4dd" />
          </TouchableOpacity>
          <Text style={[styles.header, { marginLeft: 12 }]}>Confirm Booking</Text>
        </View>
        <View style={styles.confirmCard}>
          <Text style={styles.confirmCourse}>{selectedTeeTime.courseName}</Text>
          <Text style={styles.confirmDetail}>
            {formatDate(selectedTeeTime.datetime)} at {formatTime(selectedTeeTime.datetime)}
          </Text>
          <Text style={styles.confirmDetail}>
            {playerCount} player{playerCount > 1 ? 's' : ''} • {providerLabel(selectedTeeTime.provider)}
          </Text>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Per player</Text>
            <Text style={styles.priceValue}>${selectedTeeTime.pricePerPlayer.toFixed(2)}</Text>
          </View>
          <View style={[styles.priceRow, { borderTopWidth: 1, borderTopColor: '#3f4943', paddingTop: 12 }]}>
            <Text style={[styles.priceLabel, { fontWeight: '700' }]}>Total</Text>
            <Text style={[styles.priceValue, { color: '#e9c349', fontSize: 20 }]}>${total.toFixed(2)}</Text>
          </View>
        </View>
        <View style={{ paddingHorizontal: 16, marginTop: 24 }}>
          <TouchableOpacity
            onPress={handleConfirmBooking}
            activeOpacity={0.8}
            disabled={bookMutation.isPending}
          >
            <View style={[styles.confirmBtn, bookMutation.isPending && { opacity: 0.6 }]}>
              {bookMutation.isPending ? (
                <ActivityIndicator size="small" color="#84d7af" />
              ) : (
                <Text style={styles.confirmBtnText}>Confirm Booking</Text>
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleBackToSearch} activeOpacity={0.7} style={{ marginTop: 12 }}>
            <Text style={styles.backText}>Back to search</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // --- Success screen ---
  if (mode === 'success' && confirmation) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.center}>
          <MaterialCommunityIcons name="check-circle" size={64} color="#84d7af" />
          <Text style={styles.successTitle}>Booking Confirmed!</Text>
          <Text style={styles.confirmDetail}>{confirmation.courseName}</Text>
          <Text style={styles.confirmDetail}>
            {formatDate(confirmation.datetime)} at {formatTime(confirmation.datetime)}
          </Text>
          <Text style={styles.confirmDetail}>
            {confirmation.players} player{confirmation.players > 1 ? 's' : ''} • ${confirmation.totalPrice.toFixed(2)}
          </Text>
          <View style={styles.confNumBox}>
            <Text style={styles.confNumLabel}>Confirmation Number</Text>
            <Text style={styles.confNumValue}>{confirmation.confirmationNumber}</Text>
          </View>
          <TouchableOpacity onPress={handleBackToSearch} activeOpacity={0.7} style={{ marginTop: 24 }}>
            <View style={styles.bookBtn}>
              <Text style={styles.bookText}>Back to Tee Times</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // --- History screen ---
  if (mode === 'history') {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.headerWrap}>
          <TouchableOpacity onPress={handleBackToSearch} activeOpacity={0.7}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="#dfe4dd" />
          </TouchableOpacity>
          <Text style={[styles.header, { marginLeft: 12 }]}>My Bookings</Text>
        </View>
        {historyLoading ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#84d7af" />
          </View>
        ) : bookings.length === 0 ? (
          <View style={styles.center}>
            <MaterialCommunityIcons name="calendar-blank" size={48} color="#88938c" />
            <Text style={styles.emptyTitle}>No bookings yet</Text>
          </View>
        ) : (
          <FlatList
            data={bookings}
            keyExtractor={(item) => item.id}
            renderItem={renderBooking}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        )}
      </SafeAreaView>
    );
  }

  // --- Search screen (default) ---
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.headerWrap}>
        <View style={{ flex: 1 }}>
          <Text style={styles.header}>Tee Times</Text>
        </View>
        <TouchableOpacity onPress={() => setMode('history')} activeOpacity={0.7}>
          <MaterialCommunityIcons name="history" size={24} color="#bec9c1" />
        </TouchableOpacity>
      </View>

      {/* Date selector */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 8, gap: 8 }}
      >
        {days.map((day, index) => {
          const isSelected = formatDateParam(day) === dateParam;
          return (
            <TouchableOpacity key={formatDateParam(day)} onPress={() => setSelectedDate(day)} activeOpacity={0.7}>
              <View style={[styles.dayBtn, isSelected && styles.dayBtnActive]}>
                <Text style={[styles.dayLabel, isSelected && { color: '#84d7af' }]}>
                  {formatDayLabel(day, index)}
                </Text>
                <Text style={[styles.dayNum, isSelected && { color: '#84d7af' }]}>
                  {formatDayNumber(day)}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Player count selector */}
      {renderPlayerSelector()}

      {/* Results */}
      {searchLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#84d7af" />
        </View>
      ) : searchError ? (
        <View style={styles.center}>
          <MaterialCommunityIcons name="alert-circle-outline" size={48} color="#ffb4ab" />
          <Text style={styles.errorText}>Could not load tee times</Text>
          <TouchableOpacity onPress={() => refetch()} activeOpacity={0.7}>
            <View style={styles.retryBtn}>
              <Text style={styles.retryText}>Retry</Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : teeTimes.length === 0 ? (
        <View style={styles.center}>
          <MaterialCommunityIcons name="calendar-blank" size={48} color="#88938c" />
          <Text style={styles.emptyTitle}>No tee times available</Text>
          <Text style={styles.emptyDesc}>Try selecting a different date or player count</Text>
        </View>
      ) : (
        <FlatList
          data={teeTimes}
          keyExtractor={(item) => item.providerRefId}
          renderItem={renderTeeTime}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#101511' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 16 },
  headerWrap: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8, flexDirection: 'row', alignItems: 'center' },
  header: { color: '#dfe4dd', fontFamily: 'Newsreader', fontSize: 28, fontStyle: 'italic' },

  // Day selector
  dayBtn: { width: 60, paddingVertical: 8, borderRadius: 8, alignItems: 'center', backgroundColor: '#1c211c', borderWidth: 1, borderColor: '#3f4943' },
  dayBtnActive: { backgroundColor: '#006747', borderColor: '#84d7af' },
  dayLabel: { fontFamily: 'Manrope', fontSize: 12, color: '#bec9c1' },
  dayNum: { fontFamily: 'Manrope', fontSize: 16, fontWeight: '700', color: '#dfe4dd' },

  // Player selector
  playerRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 8, gap: 12 },
  playerLabel: { fontFamily: 'Manrope', fontSize: 13, color: '#bec9c1' },
  playerBtns: { flexDirection: 'row', gap: 8 },
  playerBtn: { width: 36, height: 36, borderRadius: 8, backgroundColor: '#1c211c', borderWidth: 1, borderColor: '#3f4943', alignItems: 'center', justifyContent: 'center' },
  playerBtnActive: { backgroundColor: '#006747', borderColor: '#84d7af' },
  playerBtnText: { fontFamily: 'Manrope', fontSize: 14, fontWeight: '700', color: '#dfe4dd' },

  // Tee time card
  timeBox: { width: 64, alignItems: 'center', paddingVertical: 8, backgroundColor: '#101511', borderRadius: 8 },
  timeText: { fontFamily: 'Manrope', fontSize: 16, fontWeight: '700', color: '#84d7af' },
  courseName: { fontFamily: 'Manrope', fontSize: 14, fontWeight: '600', color: '#dfe4dd' },
  meta: { fontFamily: 'Manrope', fontSize: 12, color: '#bec9c1' },
  price: { fontFamily: 'Manrope', fontSize: 12, color: '#e9c349', fontWeight: '600' },
  providerTag: { fontFamily: 'Manrope', fontSize: 10, color: '#88938c', marginTop: 2 },
  bookBtn: { paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#006747', borderRadius: 8 },
  bookText: { fontFamily: 'Manrope', fontSize: 13, fontWeight: '600', color: '#84d7af' },

  // Confirmation screen
  confirmCard: { marginHorizontal: 16, marginTop: 16, backgroundColor: '#1c211c', borderRadius: 12, borderWidth: 1, borderColor: '#3f4943', padding: 20, gap: 12 },
  confirmCourse: { fontFamily: 'Manrope', fontSize: 18, fontWeight: '700', color: '#dfe4dd' },
  confirmDetail: { fontFamily: 'Manrope', fontSize: 14, color: '#bec9c1' },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  priceLabel: { fontFamily: 'Manrope', fontSize: 14, color: '#bec9c1' },
  priceValue: { fontFamily: 'Manrope', fontSize: 16, fontWeight: '700', color: '#dfe4dd' },
  confirmBtn: { backgroundColor: '#006747', borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
  confirmBtnText: { fontFamily: 'Manrope', fontSize: 16, fontWeight: '700', color: '#84d7af' },
  backText: { fontFamily: 'Manrope', fontSize: 14, color: '#bec9c1', textAlign: 'center' },

  // Success screen
  successTitle: { fontFamily: 'Manrope', fontSize: 22, fontWeight: '700', color: '#84d7af', marginTop: 12 },
  confNumBox: { backgroundColor: '#1c211c', borderRadius: 12, borderWidth: 1, borderColor: '#3f4943', padding: 16, alignItems: 'center', marginTop: 16, width: '100%' },
  confNumLabel: { fontFamily: 'Manrope', fontSize: 12, color: '#88938c' },
  confNumValue: { fontFamily: 'Manrope', fontSize: 18, fontWeight: '700', color: '#e9c349', marginTop: 4 },

  // History
  statusBadge: { borderWidth: 1, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 2 },
  statusText: { fontFamily: 'Manrope', fontSize: 10, fontWeight: '700' },
  confNum: { fontFamily: 'Manrope', fontSize: 11, color: '#88938c' },
  cancelBtn: { paddingVertical: 8, alignItems: 'center', backgroundColor: 'rgba(255, 180, 171, 0.1)', borderRadius: 8, marginTop: 4 },
  cancelText: { fontFamily: 'Manrope', fontSize: 13, fontWeight: '600', color: '#ffb4ab' },

  // Shared
  retryBtn: { paddingHorizontal: 20, paddingVertical: 12, backgroundColor: '#006747', borderRadius: 8, marginTop: 8 },
  retryText: { fontFamily: 'Manrope', fontSize: 14, fontWeight: '600', color: '#84d7af' },
  errorText: { color: '#bec9c1', fontFamily: 'Manrope', fontSize: 14, textAlign: 'center' },
  emptyTitle: { color: '#bec9c1', fontFamily: 'Manrope', fontSize: 16, textAlign: 'center' },
  emptyDesc: { color: '#bec9c1', fontFamily: 'Manrope', fontSize: 13, textAlign: 'center', opacity: 0.6 },
});
