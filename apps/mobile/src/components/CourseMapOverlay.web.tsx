import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { HoleGeometry, DistanceResult } from '../services/courseDataProvider';

function haversineMeters(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371000;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function metersToYards(m: number): number {
  return Math.round(m * 1.09361);
}

interface CourseMapOverlayProps {
  holeGeometry: HoleGeometry | null;
  userLocation: { latitude: number; longitude: number } | null;
  distances: DistanceResult | null;
  onDistanceUpdate?: (distances: DistanceResult) => void;
}

export function CourseMapOverlay({ holeGeometry, userLocation, distances, onDistanceUpdate }: CourseMapOverlayProps) {
  useEffect(() => {
    if (!userLocation || !holeGeometry || !onDistanceUpdate) return;
    const front = metersToYards(haversineMeters(userLocation.latitude, userLocation.longitude, holeGeometry.greenFront.lat, holeGeometry.greenFront.lng));
    const center = metersToYards(haversineMeters(userLocation.latitude, userLocation.longitude, holeGeometry.greenCenter.lat, holeGeometry.greenCenter.lng));
    const back = metersToYards(haversineMeters(userLocation.latitude, userLocation.longitude, holeGeometry.greenBack.lat, holeGeometry.greenBack.lng));
    onDistanceUpdate({ front, center, back });
  }, [userLocation?.latitude, userLocation?.longitude, holeGeometry, onDistanceUpdate]);

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="map-marker-radius" size={28} color="#006747" />
      <Text style={styles.title}>GPS Active</Text>
      {distances ? (
        <Text style={styles.dist}>
          <Text style={{ color: '#84d7af' }}>{distances.front}</Text>
          {' / '}
          <Text style={{ color: '#e9c349' }}>{distances.center}</Text>
          {' / '}
          <Text style={{ color: '#84d7af' }}>{distances.back}</Text>
          {' yds'}
        </Text>
      ) : null}
      <Text style={styles.note}>Map requires native build</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { height: 100, backgroundColor: '#0a1a10', alignItems: 'center', justifyContent: 'center', gap: 4 },
  title: { fontFamily: 'Manrope', fontSize: 12, color: '#bec9c1' },
  dist: { fontFamily: 'Manrope', fontSize: 14, fontWeight: '700', color: '#bec9c1' },
  note: { fontFamily: 'Manrope', fontSize: 10, color: '#88938c' },
});
