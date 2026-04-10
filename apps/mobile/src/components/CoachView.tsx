import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useOrgRole } from '../hooks/useOrgRole';

interface CoachViewProps {
  organizationId?: string;
  children: React.ReactNode;
  /** Content shown to coaches (read-only) instead of the default children */
  coachContent?: React.ReactNode;
  /** If true, hide entirely from coaches */
  hideFromCoach?: boolean;
  /** If true, hide from non-competing roles (coach/admin) */
  competitorsOnly?: boolean;
}

/**
 * Conditional rendering based on org role.
 * - COMMISSIONER/ADMIN: see full management children
 * - COACH: see read-only coachContent (or children with a read-only banner)
 * - PLAYER: see children (competition UI)
 *
 * Coaches are excluded from tournament registration and leaderboard rankings.
 * Coaches can view rosters, standings, and player scoring data.
 */
export function CoachView({
  organizationId,
  children,
  coachContent,
  hideFromCoach,
  competitorsOnly,
}: CoachViewProps) {
  const { isCoach, canCompete } = useOrgRole(organizationId);

  // Hide from coach if explicitly requested
  if (isCoach && hideFromCoach) return null;

  // Competitors-only content (registration, leaderboard entry)
  if (competitorsOnly && !canCompete) return null;

  // Coach gets read-only view
  if (isCoach) {
    return (
      <View>
        <View style={styles.coachBanner}>
          <MaterialCommunityIcons name="eye" size={14} color="#bec9c1" />
          <Text style={styles.coachText}>Coach View — Read Only</Text>
        </View>
        {coachContent ?? children}
      </View>
    );
  }

  return <>{children}</>;
}

const styles = StyleSheet.create({
  coachBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(190,201,193,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginBottom: 8,
  },
  coachText: {
    fontFamily: 'Manrope',
    fontSize: 11,
    fontWeight: '600',
    color: '#bec9c1',
  },
});
