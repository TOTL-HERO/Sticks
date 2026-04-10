import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors, fonts, spacing, radii, tabBar } from '../../theme';

function formatTime(isoStr: string): string {
  return new Date(isoStr).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

function formatDate(isoStr: string): string {
  return new Date(isoStr).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
}

export function SuccessScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { confirmation, splitDetails } = route.params;

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <ScrollView contentContainerStyle={{ paddingBottom: tabBar.contentPadding }}>
        {/* Success hero */}
        <View style={s.hero}>
          <View style={s.checkCircle}>
            <MaterialCommunityIcons name="check" size={40} color={colors.greenDeep} />
          </View>
          <Text style={s.successTitle}>Booking Confirmed!</Text>
          <Text style={s.successSub}>Your tee time is locked in</Text>
        </View>

        {/* Booking details */}
        <View style={s.section}>
          <View style={s.detailCard}>
            <Text style={s.courseName}>{confirmation.courseName}</Text>
            <View style={s.detailRow}>
              <MaterialCommunityIcons name="calendar" size={16} color={colors.green} />
              <Text style={s.detailText}>{formatDate(confirmation.datetime)}</Text>
            </View>
            <View style={s.detailRow}>
              <MaterialCommunityIcons name="clock-outline" size={16} color={colors.green} />
              <Text style={s.detailText}>{formatTime(confirmation.datetime)}</Text>
            </View>
            <View style={s.detailRow}>
              <MaterialCommunityIcons name="account-group" size={16} color={colors.green} />
              <Text style={s.detailText}>{confirmation.players} player{confirmation.players > 1 ? 's' : ''}</Text>
            </View>
            <View style={s.detailRow}>
              <MaterialCommunityIcons name="cash" size={16} color={colors.green} />
              <Text style={s.detailText}>${confirmation.totalPrice.toFixed(2)} total</Text>
            </View>
          </View>
        </View>

        {/* Confirmation number */}
        <View style={s.section}>
          <View style={s.confNumCard}>
            <Text style={s.confNumLabel}>Confirmation Number</Text>
            <Text style={s.confNum}>{confirmation.confirmationNumber}</Text>
          </View>
        </View>

        {/* Split payment status */}
        {splitDetails && splitDetails.paymentRequests.length > 0 && (
          <View style={s.section}>
            <Text style={s.sectionLabel}>GROUP PAYMENT REQUESTS</Text>
            <View style={s.splitCard}>
              <View style={s.splitRow}>
                <MaterialCommunityIcons name="send" size={16} color={colors.gold} />
                <Text style={s.splitText}>
                  Payment requests sent to {splitDetails.paymentRequests.length} player{splitDetails.paymentRequests.length > 1 ? 's' : ''}
                </Text>
              </View>
              <Text style={s.splitAmount}>${splitDetails.perPlayerAmount.toFixed(2)} each</Text>
              <Text style={s.splitNote}>They'll receive a notification to pay their share</Text>
            </View>
          </View>
        )}

        {/* Reminder note */}
        <View style={s.section}>
          <View style={s.reminderCard}>
            <MaterialCommunityIcons name="bell-outline" size={16} color={colors.textMuted} />
            <Text style={s.reminderText}>
              You'll receive reminders 24 hours and 2 hours before your tee time
            </Text>
          </View>
        </View>

        {/* Actions */}
        <View style={s.actions}>
          <TouchableOpacity
            onPress={() => navigation.navigate('TeeTimes')}
            activeOpacity={0.8}
          >
            <View style={s.primaryBtn}>
              <Text style={s.primaryBtnText}>Back to Tee Times</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('TeeTimes')}
            activeOpacity={0.7}
          >
            <View style={s.secondaryBtn}>
              <Text style={s.secondaryBtnText}>View My Bookings</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  hero: { alignItems: 'center', paddingVertical: spacing.xxl * 1.5, gap: spacing.md },
  checkCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: colors.green, alignItems: 'center', justifyContent: 'center' },
  successTitle: { fontFamily: fonts.heading, fontSize: 28, fontStyle: 'italic', color: colors.text },
  successSub: { fontFamily: fonts.body, fontSize: 14, color: colors.textSecondary },
  section: { paddingHorizontal: spacing.lg, marginBottom: spacing.xl },
  sectionLabel: { fontFamily: fonts.body, fontSize: 11, fontWeight: '700', color: colors.textMuted, letterSpacing: 1.5, marginBottom: spacing.sm },
  detailCard: { backgroundColor: colors.card, borderRadius: radii.md, borderWidth: 1, borderColor: colors.border, padding: spacing.lg, gap: spacing.md },
  courseName: { fontFamily: fonts.bodySemiBold, fontSize: 18, color: colors.text, marginBottom: spacing.xs },
  detailRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  detailText: { fontFamily: fonts.body, fontSize: 14, color: colors.textSecondary },
  confNumCard: { backgroundColor: colors.card, borderRadius: radii.md, borderWidth: 1, borderColor: colors.border, padding: spacing.lg, alignItems: 'center', gap: spacing.xs },
  confNumLabel: { fontFamily: fonts.body, fontSize: 12, color: colors.textMuted },
  confNum: { fontFamily: fonts.bodySemiBold, fontSize: 22, color: colors.gold, letterSpacing: 2 },
  splitCard: { backgroundColor: colors.goldBg, borderRadius: radii.md, borderWidth: 1, borderColor: colors.gold, padding: spacing.lg, gap: spacing.sm },
  splitRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  splitText: { fontFamily: fonts.bodySemiBold, fontSize: 14, color: colors.gold, flex: 1 },
  splitAmount: { fontFamily: fonts.bodySemiBold, fontSize: 18, color: colors.gold },
  splitNote: { fontFamily: fonts.body, fontSize: 12, color: colors.gold, opacity: 0.8 },
  reminderCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: colors.card, borderRadius: radii.md, borderWidth: 1, borderColor: colors.border, padding: spacing.md },
  reminderText: { fontFamily: fonts.body, fontSize: 13, color: colors.textMuted, flex: 1 },
  actions: { paddingHorizontal: spacing.lg, gap: spacing.md, paddingBottom: spacing.xxl },
  primaryBtn: { backgroundColor: colors.greenDark, borderRadius: radii.md, paddingVertical: 16, alignItems: 'center' },
  primaryBtnText: { fontFamily: fonts.bodySemiBold, fontSize: 16, color: colors.green },
  secondaryBtn: { borderRadius: radii.md, paddingVertical: 14, alignItems: 'center', borderWidth: 1, borderColor: colors.border },
  secondaryBtnText: { fontFamily: fonts.body, fontSize: 15, color: colors.textSecondary },
});
