import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, type ViewStyle } from 'react-native';

interface SkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

export function Skeleton({ width = '100%', height = 16, borderRadius = 8, style }: SkeletonProps) {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.7, duration: 800, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.3, duration: 800, useNativeDriver: true }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        { width: width as any, height, borderRadius, backgroundColor: '#1c211c', opacity },
        style,
      ]}
    />
  );
}

export function SkeletonCard({ style }: { style?: ViewStyle }) {
  return (
    <View style={[styles.card, style]}>
      <View style={styles.cardRow}>
        <Skeleton width={44} height={44} borderRadius={8} />
        <View style={{ flex: 1, gap: 8 }}>
          <Skeleton width="70%" height={14} />
          <Skeleton width="40%" height={12} />
        </View>
      </View>
    </View>
  );
}

export function SkeletonProfile() {
  return (
    <View style={styles.profileWrap}>
      <Skeleton width={80} height={80} borderRadius={40} />
      <Skeleton width={160} height={24} style={{ marginTop: 16 }} />
      <Skeleton width={120} height={14} style={{ marginTop: 8 }} />
      <View style={styles.statsRow}>
        <Skeleton width="30%" height={60} borderRadius={12} />
        <Skeleton width="30%" height={60} borderRadius={12} />
        <Skeleton width="30%" height={60} borderRadius={12} />
      </View>
    </View>
  );
}

export function SkeletonList({ count = 4 }: { count?: number }) {
  return (
    <View style={{ gap: 12, paddingHorizontal: 16 }}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1c211c',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#3f4943',
    padding: 16,
  },
  cardRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  profileWrap: { alignItems: 'center', paddingVertical: 24, gap: 4 },
  statsRow: { flexDirection: 'row', gap: 12, marginTop: 20, width: '100%', paddingHorizontal: 16 },
});
