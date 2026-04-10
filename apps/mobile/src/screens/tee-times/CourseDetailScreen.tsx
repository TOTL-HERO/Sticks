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

export function CourseDetailScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { teeTime, playerCount } = route.params;

  const totalPrice = teeTime.pricePerPlayer * playerCount;
  const perPlayerSplit = playerCount > 1 ? (totalPrice / playerCount).toFixed(2) : null;

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={s.headerTitle}>Course Details</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: tabBar.contentPadding }}>
        {/* Course hero */}
        <View style={s.hero}>
          <View style={s.courseIcon}>
            <MaterialCommunityIcons name="golf" size={32} color={colors.greenDark} />
          </View>
          <Text style={s.courseName}>{teeTime.courseName}</Text>
          <Text style={s.courseDesc}>{teeTime.courseDescription}</Text>
        </View>

        {/* Tee time info */}
        <View style={s.section}>
          <Text style={s.sectionLabel}>YOUR TEE TIME</Text>
          <View style={s.infoCard}>
            <View style={s.infoRow}>
              <MaterialCommunityIcons name="calendar" size={18} color={colors.green} />
              <Text style={s.infoText}>{formatDate(teeTime.datetime)}</Text>
            </View>
            <View style={s.infoRow}>
              <MaterialCommunityIcons name="clock-outline" size={18} color={colors.green} />
              <Text style={s.infoText}>{formatTime(teeTime.datetime)}</Text>
            </View>
            <View style={s.infoRow}>
              <MaterialCommunityIcons name="account-group" size={18} color={colors.green} />
              <Text style={s.infoText}>{playerCount} player{playerCount > 1 ? 's' : ''}</Text>
            </View>
          </View>
        </View>

        {/* Price breakdown */}
        <View style={s.section}>
          <Text style={s.sectionLabel}>PRICE BREAKDOWN</Text>
          <View style={s.priceCard}>
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
              <Text style={s.splitNote}>
                ${perPlayerSplit} per person when split evenly
              </Text>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Book Now CTA */}
      <View style={s.cta}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Confirmation', { teeTime, playerCount })}
          activeOpacity={0.8}
        >
          <View style={s.ctaBtn}>
            <Text style={s.ctaBtnText}>Book Now · ${totalPrice.toFixed(2)}</Text>
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
  hero: { alignItems: 'center', paddingHorizontal: spacing.xl, paddingVertical: spacing.xxl, gap: spacing.md },
  courseIcon: { width: 72, height: 72, borderRadius: radii.full, backgroundColor: colors.card, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: colors.greenDark },
  courseName: { fontFamily: fonts.heading, fontSize: 26, fontStyle: 'italic', color: colors.text, textAlign: 'center' },
  courseDesc: { fontFamily: fonts.body, fontSize: 14, color: colors.textSecondary, textAlign: 'center', lineHeight: 20 },
  section: { paddingHorizontal: spacing.lg, marginBottom: spacing.xl },
  sectionLabel: { fontFamily: fonts.body, fontSize: 11, fontWeight: '700', color: colors.textMuted, letterSpacing: 1.5, marginBottom: spacing.sm },
  infoCard: { backgroundColor: colors.card, borderRadius: radii.md, borderWidth: 1, borderColor: colors.border, padding: spacing.lg, gap: spacing.md },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  infoText: { fontFamily: fonts.body, fontSize: 15, color: colors.text },
  priceCard: { backgroundColor: colors.card, borderRadius: radii.md, borderWidth: 1, borderColor: colors.border, padding: spacing.lg, gap: spacing.sm },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  priceLabel: { fontFamily: fonts.body, fontSize: 14, color: colors.textSecondary },
  priceValue: { fontFamily: fonts.body, fontSize: 14, color: colors.text },
  totalRow: { borderTopWidth: 1, borderTopColor: colors.border, paddingTop: spacing.sm, marginTop: spacing.xs },
  totalLabel: { fontFamily: fonts.bodySemiBold, fontSize: 16, color: colors.text },
  totalValue: { fontFamily: fonts.bodySemiBold, fontSize: 20, color: colors.gold },
  splitNote: { fontFamily: fonts.body, fontSize: 12, color: colors.textMuted, textAlign: 'center', marginTop: spacing.xs },
  cta: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl, paddingTop: spacing.md, backgroundColor: colors.bg },
  ctaBtn: { backgroundColor: colors.greenDark, borderRadius: radii.md, paddingVertical: 16, alignItems: 'center' },
  ctaBtnText: { fontFamily: fonts.bodySemiBold, fontSize: 16, color: colors.green },
});
