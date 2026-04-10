import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import { apiFetch } from '../../lib/api';
import { colors, fonts, spacing, radii, tabBar } from '../../theme';

function formatTime(isoStr: string): string {
  return new Date(isoStr).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

function formatDate(isoStr: string): string {
  return new Date(isoStr).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

export function ConfirmationScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { teeTime, playerCount } = route.params;

  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const totalPrice = teeTime.pricePerPlayer * playerCount;
  const perPlayerSplit = playerCount > 1 ? (totalPrice / playerCount).toFixed(2) : null;

  const bookMutation = useMutation({
    mutationFn: () => apiFetch('/bookings', {
      method: 'POST',
      body: JSON.stringify({
        providerRefId: teeTime.providerRefId,
        provider: teeTime.provider,
        players: playerCount,
        paymentMethodId: 'mock_pm',
      }),
    }),
    onSuccess: (data: any) => {
      setErrorMsg(null);
      navigation.navigate('Success', { confirmation: data, splitDetails: data.splitDetails });
    },
    onError: (err: Error) => {
      setErrorMsg(err.message || 'Payment failed. Please try again.');
    },
  });

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={s.headerTitle}>Confirm Booking</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: tabBar.contentPadding }}>
        {/* Booking summary */}
        <View style={s.section}>
          <Text style={s.sectionLabel}>BOOKING SUMMARY</Text>
          <View style={s.summaryCard}>
            <Text style={s.summaryCourseName}>{teeTime.courseName}</Text>
            <Text style={s.summaryDetail}>{formatDate(teeTime.datetime)} · {formatTime(teeTime.datetime)}</Text>
            <Text style={s.summaryDetail}>{playerCount} player{playerCount > 1 ? 's' : ''}</Text>

            <View style={s.divider} />

            <View style={s.priceRow}>
              <Text style={s.priceLabel}>Per player</Text>
              <Text style={s.priceValue}>${teeTime.pricePerPlayer.toFixed(2)}</Text>
            </View>
            <View style={s.priceRow}>
              <Text style={s.priceLabel}>Players</Text>
              <Text style={s.priceValue}>× {playerCount}</Text>
            </View>
            <View style={[s.priceRow, s.totalRow]}>
              <Text style={s.totalLabel}>Total</Text>
              <Text style={s.totalValue}>${totalPrice.toFixed(2)}</Text>
            </View>

            {perPlayerSplit && (
              <View style={s.splitBadge}>
                <MaterialCommunityIcons name="account-group" size={14} color={colors.gold} />
                <Text style={s.splitText}>
                  ${perPlayerSplit}/person · split requests sent to group
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Payment form */}
        <View style={s.section}>
          <Text style={s.sectionLabel}>PAYMENT</Text>
          <View style={s.paymentCard}>
            <View style={s.cardHeader}>
              <MaterialCommunityIcons name="credit-card" size={20} color={colors.green} />
              <Text style={s.cardHeaderText}>Card Details</Text>
              <View style={s.mockBadge}>
                <Text style={s.mockBadgeText}>DEMO</Text>
              </View>
            </View>

            <TextInput
              style={s.input}
              placeholder="Card number"
              placeholderTextColor={colors.textPlaceholder}
              value={cardNumber}
              onChangeText={setCardNumber}
              keyboardType="numeric"
              maxLength={19}
            />
            <View style={s.inputRow}>
              <TextInput
                style={[s.input, { flex: 1 }]}
                placeholder="MM/YY"
                placeholderTextColor={colors.textPlaceholder}
                value={expiry}
                onChangeText={setExpiry}
                keyboardType="numeric"
                maxLength={5}
              />
              <TextInput
                style={[s.input, { flex: 1 }]}
                placeholder="CVV"
                placeholderTextColor={colors.textPlaceholder}
                value={cvv}
                onChangeText={setCvv}
                keyboardType="numeric"
                maxLength={4}
                secureTextEntry
              />
            </View>
            <Text style={s.demoNote}>Demo mode — no real payment processed</Text>
          </View>
        </View>

        {/* Error message */}
        {errorMsg && (
          <View style={s.errorBox}>
            <MaterialCommunityIcons name="alert-circle" size={16} color={colors.error} />
            <Text style={s.errorText}>{errorMsg}</Text>
          </View>
        )}
      </ScrollView>

      {/* Pay button */}
      <View style={s.cta}>
        <TouchableOpacity
          onPress={() => bookMutation.mutate()}
          disabled={bookMutation.isPending}
          activeOpacity={0.8}
        >
          <View style={[s.payBtn, bookMutation.isPending && s.payBtnDisabled]}>
            {bookMutation.isPending ? (
              <ActivityIndicator size="small" color={colors.greenDeep} />
            ) : (
              <Text style={s.payBtnText}>Pay ${totalPrice.toFixed(2)}</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  headerTitle: { fontFamily: fonts.body, fontSize: 16, fontWeight: '600', color: colors.text },
  section: { paddingHorizontal: spacing.lg, marginBottom: spacing.xl },
  sectionLabel: { fontFamily: fonts.body, fontSize: 11, fontWeight: '700', color: colors.textMuted, letterSpacing: 1.5, marginBottom: spacing.sm },
  summaryCard: { backgroundColor: colors.card, borderRadius: radii.md, borderWidth: 1, borderColor: colors.border, padding: spacing.lg, gap: spacing.sm },
  summaryCourseName: { fontFamily: fonts.bodySemiBold, fontSize: 16, color: colors.text },
  summaryDetail: { fontFamily: fonts.body, fontSize: 13, color: colors.textSecondary },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: spacing.xs },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between' },
  priceLabel: { fontFamily: fonts.body, fontSize: 14, color: colors.textSecondary },
  priceValue: { fontFamily: fonts.body, fontSize: 14, color: colors.text },
  totalRow: { borderTopWidth: 1, borderTopColor: colors.border, paddingTop: spacing.sm, marginTop: spacing.xs },
  totalLabel: { fontFamily: fonts.bodySemiBold, fontSize: 16, color: colors.text },
  totalValue: { fontFamily: fonts.bodySemiBold, fontSize: 20, color: colors.gold },
  splitBadge: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, backgroundColor: colors.goldBg, borderRadius: radii.sm, padding: spacing.sm, marginTop: spacing.xs },
  splitText: { fontFamily: fonts.body, fontSize: 12, color: colors.gold, flex: 1 },
  paymentCard: { backgroundColor: colors.card, borderRadius: radii.md, borderWidth: 1, borderColor: colors.border, padding: spacing.lg, gap: spacing.md },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  cardHeaderText: { fontFamily: fonts.bodySemiBold, fontSize: 14, color: colors.text, flex: 1 },
  mockBadge: { backgroundColor: colors.goldBg, borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2 },
  mockBadgeText: { fontFamily: fonts.body, fontSize: 10, fontWeight: '700', color: colors.gold },
  input: { backgroundColor: colors.bg, borderRadius: radii.sm, borderWidth: 1, borderColor: colors.border, paddingHorizontal: spacing.md, paddingVertical: 12, color: colors.text, fontFamily: fonts.body, fontSize: 14 },
  inputRow: { flexDirection: 'row', gap: spacing.md },
  demoNote: { fontFamily: fonts.body, fontSize: 11, color: colors.textMuted, textAlign: 'center' },
  errorBox: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginHorizontal: spacing.lg, marginBottom: spacing.lg, backgroundColor: colors.errorBg, borderRadius: radii.sm, padding: spacing.md },
  errorText: { fontFamily: fonts.body, fontSize: 13, color: colors.error, flex: 1 },
  cta: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl, paddingTop: spacing.md, backgroundColor: colors.bg },
  payBtn: { backgroundColor: colors.greenDark, borderRadius: radii.md, paddingVertical: 16, alignItems: 'center' },
  payBtnDisabled: { opacity: 0.5 },
  payBtnText: { fontFamily: fonts.bodySemiBold, fontSize: 16, color: colors.green },
});
