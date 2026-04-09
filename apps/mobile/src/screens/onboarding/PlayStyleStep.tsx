import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type PlayStyle = 'COMPETITIVE' | 'CASUAL' | 'SOCIAL' | null;

interface PlayStyleStepProps {
  data: { playStyle: PlayStyle };
  onChange: (data: { playStyle: PlayStyle }) => void;
}

const PLAY_STYLES: { value: PlayStyle; label: string; icon: string; description: string }[] = [
  { value: 'COMPETITIVE', label: 'Competitive', icon: 'trophy', description: 'You play to win. Handicap tracking, tournaments, and leaderboards are your thing.' },
  { value: 'CASUAL', label: 'Casual', icon: 'golf', description: 'You enjoy a good round without the pressure. Score tracking at your own pace.' },
  { value: 'SOCIAL', label: 'Social', icon: 'account-group', description: "Golf is about the crew. You're here for the vibes, bets, and post-round drinks." },
];

export function PlayStyleStep({ data, onChange }: PlayStyleStepProps) {
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.heading}>How do you play?</Text>
      <Text style={styles.subheading}>This helps us personalize your experience</Text>

      <View style={{ gap: 16 }}>
        {PLAY_STYLES.map((style) => {
          const isSelected = data.playStyle === style.value;
          return (
            <TouchableOpacity key={style.value} onPress={() => onChange({ playStyle: style.value })} activeOpacity={0.8}>
              <View style={[styles.card, isSelected && styles.cardSelected]}>
                <View style={styles.cardHeader}>
                  <View style={[styles.iconWrap, isSelected && styles.iconWrapSelected]}>
                    <MaterialCommunityIcons name={style.icon as any} size={24} color={isSelected ? '#84d7af' : '#88938c'} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.label, isSelected && { color: '#84d7af' }]}>{style.label}</Text>
                  </View>
                  {isSelected && <MaterialCommunityIcons name="check-circle" size={22} color="#84d7af" />}
                </View>
                <Text style={styles.desc}>{style.description}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: { fontFamily: 'Newsreader', fontSize: 32, fontStyle: 'italic', color: '#dfe4dd', marginBottom: 8 },
  subheading: { fontFamily: 'Manrope', fontSize: 13, color: '#bec9c1', marginBottom: 24 },
  card: { backgroundColor: '#1c211c', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#3f4943' },
  cardSelected: { backgroundColor: 'rgba(132,215,175,0.08)', borderWidth: 2, borderColor: '#84d7af' },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 8 },
  iconWrap: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#101511', alignItems: 'center', justifyContent: 'center' },
  iconWrapSelected: { backgroundColor: 'rgba(132,215,175,0.15)' },
  label: { fontFamily: 'Manrope', fontSize: 16, fontWeight: '700', color: '#dfe4dd' },
  desc: { fontFamily: 'Manrope', fontSize: 13, color: '#bec9c1', lineHeight: 18 },
});
