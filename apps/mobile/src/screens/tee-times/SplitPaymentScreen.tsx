import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '../../lib/api';
import { colors, fonts, spacing, radii, tabBar } from '../../theme';

function formatTime(isoStr: string): string {
  return new Date(isoStr).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

function formatDate(isoStr: string): string {
  return new Date(isoStr).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

const STATUS_COLORS: Record<string, string> = {
  PENDING: colors.gold,
  PROCESSING: colors.textSecondary,
  PAID: colors.green,
  FAILED: colors.error,
};

export function SplitPaymentScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { bookingId, paymentRequestId } = route.params;
  const queryClient = useQueryClient();

  const { data: booking, isLoading } = useQuery<any>({
    queryKey: ['booking-split', bookingId],
    queryFn: () => apiFetch(`/bookings/${bookingId}/split-status`),
  });

  const paymentRequest = booking?.paymentRequests?.find((r: any) => r.id === paymentRequestId);
  const isOverdue = paymentRequest && paymentRequest.status === 'PENDING' && new Date(paymentRequest.dueAt) < new Date();

  const payMutation = useMutation({
    mutationFn: () => apiFetch(`/bookings/${bookingId}/split-pay`, {
      method: 'POST',
      body: JSON.stringify({ paymentRequestId, paymentMethodId: 'mock_pm' }),
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['booking-split', bookingId] });
    },
  });

  if (isLoading) {
    return (
      <SafeAreaView style={s.safe} edges={['top']}>
        <View style={s.center}>
          <ActivityIndicator size="large" color={colors.green} />
        </View>
      </SafeAreaView>
    );
  }

  const status = paymentRequest?.status ?? 'PENDING';
  const isPaid = status === 'PAID';

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={s.headerTitle}>Pay Your Share</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: tabBar.contentPadding }}>
        {/* Status badge */}
        <View style={s.statusWrap}>
          <View style={[s.statusBadge, { borderColor: STATUS_COLORS[status] }]}>
            <Text style={[s.statusText, { color: STATUS_COLORS[status] }]}>{status}</Text>
          </View>
          {isOverdue && (
            <View style={s.overdueBadge}>
              <MaterialCommunityIcons name="clock-alert" size={14} color={colors.error} />
              <Text style={s.overdueText}>Overdue</Text>
            </View>
          )}
        </View>

        {/* Booking info */}
        {booking && (
          <View style={s.section}>
            <Text style={s.sectionLabel}>TEE TIME</Text>
            <View style={s.bookingCard}>
              <Text style={s.courseName}>{booking.courseName ?? 'Golf Course'}</Text>
              {booking.datetime && (
                <>
                  <Text style={s.bookingDetail}>{formatDate(booking.datetime)}</Text>
                  <Text style={s.bookingDetail}>{formatTime(booking.datetime)}</Text>
                </>
              )}
              {booking.playerCount && (
                <Text style={s.bookingDetail}>{booking.playerCount} players total</Text>
              )}
            </View>
          </View>
        )}

        {/* Amount owed */}
        <View style={s.section}>
          <Text style={s.sectionLabel}>YOUR SHARE</Text>
          <View style={s.amountCard}>
            <Text style={s.amountLabel}>Amount owed</Text>
            <Text style={s.amountValue}>${paymentRequest?.amount?.toFixed(2) ?? '—'}</Text>
            {booking?.paymentAmount && booking?.playerCount && (
              <Text style={s.amountNote}>
                ${booking.paymentAmount.toFixed(2)} total ÷ {booking.playerCount} players
              </Text>
            )}
          </View>
        </View>

        {/* Error */}
        {payMutation.isError && (
          <View style={s.errorBox}>
            <MaterialCommunityIcons name="alert-circle" size={16} color={colors.error} />
            <Text style={s.errorText}>Payment failed. Please try again.</Text>
          </View>
        )}

        {/* Success state */}
        {isPaid && (
          <View style={s.paidBox}>
            <MaterialCommunityIcons name="check-circle" size={20} color={colors.green} />
            <Text style={s.paidText}>Payment complete — you're all set!</Text>
          </View>
        )}
      </ScrollView>

      {/* Pay button */}
      {!isPaid && (
        <View style={s.cta}>
          <TouchableOpacity
            onPress={() => payMutation.mutate()}
            disabled={payMutation.isPending}
            activeOpacity={0.8}
          >
            <View style={[s.payBtn, payMutation.isPending && s.payBtnDisabled]}>
              {payMutation.isPending ? (
                <ActivityIndicator size="small" color={colors.greenDeep} />
              ) : (
                <Text style={s.payBtnText}>
                  Pay ${paymentRequest?.amount?.toFixed(2) ?? '—'}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  headerTitle: { fontFamily: fonts.body, fontSize: 16, fontWeight: '600', color: colors.text },
  statusWrap: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.lg },
  statusBadge: { borderWidth: 1, borderRadius: radii.sm, paddingHorizontal: 10, paddingVertical: 4 },
  statusText: { fontFamily: fonts.bodySemiBold, fontSize: 12 },
  overdueBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: colors.errorBg, borderRadius: radii.sm, paddingHorizontal: 8, paddingVertical: 4 },
  overdueText: { fontFamily: fonts.bodySemiBold, fontSize: 12, color: colors.error },
  section: { paddingHorizontal: spacing.lg, marginBottom: spacing.xl },
  sectionLabel: { fontFamily: fonts.body, fontSize: 11, fontWeight: '700', color: colors.textMuted, letterSpacing: 1.5, marginBottom: spacing.sm },
  bookingCard: { backgroundColor: colors.card, borderRadius: radii.md, borderWidth: 1, borderColor: colors.border, padding: spacing.lg, gap: spacing.xs },
  courseName: { fontFamily: fonts.bodySemiBold, fontSize: 16, color: colors.text },
  bookingDetail: { fontFamily: fonts.body, fontSize: 13, color: colors.textSecondary },
  amountCard: { backgroundColor: colors.card, borderRadius: radii.md, borderWidth: 1, borderColor: colors.border, padding: spacing.lg, alignItems: 'center', gap: spacing.xs },
  amountLabel: { fontFamily: fonts.body, fontSize: 13, color: colors.textMuted },
  amountValue: { fontFamily: fonts.bodySemiBold, fontSize: 36, color: colors.gold },
  amountNote: { fontFamily: fonts.body, fontSize: 12, color: colors.textMuted },
  errorBox: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginHorizontal: spacing.lg, marginBottom: spacing.lg, backgroundColor: colors.errorBg, borderRadius: radii.sm, padding: spacing.md },
  errorText: { fontFamily: fonts.body, fontSize: 13, color: colors.error, flex: 1 },
  paidBox: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginHorizontal: spacing.lg, marginBottom: spacing.lg, backgroundColor: colors.greenBg, borderRadius: radii.md, padding: spacing.lg },
  paidText: { fontFamily: fonts.bodySemiBold, fontSize: 14, color: colors.green, flex: 1 },
  cta: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl, paddingTop: spacing.md, backgroundColor: colors.bg },
  payBtn: { backgroundColor: colors.greenDark, borderRadius: radii.md, paddingVertical: 16, alignItems: 'center' },
  payBtnDisabled: { opacity: 0.5 },
  payBtnText: { fontFamily: fonts.bodySemiBold, fontSize: 16, color: colors.green },
});
