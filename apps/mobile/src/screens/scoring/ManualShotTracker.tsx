import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Platform,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useRoundStore } from '../../stores/roundStore';

// --- Constants ---

const CLUBS = [
  'Driver', '3W', '5W', 'Hybrid',
  '3i', '4i', '5i', '6i', '7i', '8i', '9i',
  'PW', 'GW', 'SW', 'LW', 'Putter',
];

const SHAPES = ['Straight', 'Draw', 'Fade', 'Slice', 'Hook'];
const LIES = ['Fairway', 'Rough', 'Sand', 'Tee', 'Green'];
const CONTACTS = ['Pure', 'Good', 'Thin', 'Fat', 'Topped', 'Shank'];

// --- Haversine ---

function haversineMeters(
  lat1: number, lng1: number, lat2: number, lng2: number,
): number {
  const R = 6371000;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function metersToYards(m: number): number {
  return Math.round(m * 1.09361);
}

function generateId(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

// --- Props ---

interface ManualShotTrackerProps {
  visible: boolean;
  onClose: () => void;
  onShotSaved: (summary: string) => void;
}

// --- Pill selector component ---

function PillSelector({
  label,
  options,
  selected,
  onSelect,
}: {
  label: string;
  options: string[];
  selected: string | null;
  onSelect: (val: string | null) => void;
}) {
  return (
    <View style={styles.pillSection}>
      <Text style={styles.pillLabel}>{label}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.pillRow}
      >
        {options.map((opt) => {
          const active = selected === opt;
          return (
            <TouchableOpacity
              key={opt}
              style={[styles.pill, active && styles.pillActive]}
              onPress={() => onSelect(active ? null : opt)}
              activeOpacity={0.7}
            >
              <Text style={[styles.pillText, active && styles.pillTextActive]}>
                {opt}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

// --- Main component ---

export function ManualShotTracker({ visible, onClose, onShotSaved }: ManualShotTrackerProps) {
  const [club, setClub] = useState<string | null>(null);
  const [shape, setShape] = useState<string | null>(null);
  const [lie, setLie] = useState<string | null>(null);
  const [contact, setContact] = useState<string | null>(null);
  const [startCoord, setStartCoord] = useState<{ lat: number; lng: number } | null>(null);
  const [currentCoord, setCurrentCoord] = useState<{ lat: number; lng: number } | null>(null);
  const [tracking, setTracking] = useState(false);
  const locationSub = useRef<Location.LocationSubscription | null>(null);
  const pulseAnim = useRef(new Animated.Value(0.4)).current;

  // Pulse animation for tracking indicator
  useEffect(() => {
    if (!tracking) return;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 0.4, duration: 800, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [tracking, pulseAnim]);

  // Pin start location when tracker opens
  useEffect(() => {
    if (!visible) return;
    let cancelled = false;
    (async () => {
      try {
        const loc = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        if (!cancelled) {
          setStartCoord({ lat: loc.coords.latitude, lng: loc.coords.longitude });
        }
      } catch {
        // Location unavailable
      }
    })();
    return () => { cancelled = true; };
  }, [visible]);

  // Watch position while tracking
  useEffect(() => {
    if (!tracking) {
      locationSub.current?.remove();
      locationSub.current = null;
      return;
    }
    (async () => {
      locationSub.current = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, distanceInterval: 2 },
        (loc) => setCurrentCoord({ lat: loc.coords.latitude, lng: loc.coords.longitude }),
      );
    })();
    return () => {
      locationSub.current?.remove();
      locationSub.current = null;
    };
  }, [tracking]);

  const liveDistance = startCoord && currentCoord
    ? metersToYards(haversineMeters(startCoord.lat, startCoord.lng, currentCoord.lat, currentCoord.lng))
    : 0;

  const handleStartTracking = useCallback(() => {
    if (!club) return;
    setTracking(true);
  }, [club]);

  const handleSaveShot = useCallback(async () => {
    if (!startCoord || !club) return;

    // Get final position
    let endLat: number;
    let endLng: number;
    try {
      const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      endLat = loc.coords.latitude;
      endLng = loc.coords.longitude;
    } catch {
      if (currentCoord) {
        endLat = currentCoord.lat;
        endLng = currentCoord.lng;
      } else {
        return;
      }
    }

    const distance = metersToYards(
      haversineMeters(startCoord.lat, startCoord.lng, endLat, endLng),
    );

    const { activeRound } = useRoundStore.getState();
    if (!activeRound) return;

    const holeNumber = activeRound.currentHole;
    const existingShots = activeRound.shotPoints.filter((sp) => sp.holeNumber === holeNumber);

    const shotMeta: { shape?: string; lie?: string; contact?: string } = {};
    if (shape) shotMeta.shape = shape;
    if (lie) shotMeta.lie = lie;
    if (contact) shotMeta.contact = contact;

    useRoundStore.getState().addShotPoint({
      id: generateId(),
      holeNumber,
      shotNumber: existingShots.length + 1,
      startLatitude: startCoord.lat,
      startLongitude: startCoord.lng,
      endLatitude: endLat,
      endLongitude: endLng,
      timestamp: new Date().toISOString(),
      eventType: 'MANUAL',
      accuracy: 0,
      altitude: null,
      club,
      shotMeta: Object.keys(shotMeta).length > 0 ? shotMeta : undefined,
    });

    const summary = `${club} • ${distance} yds`;
    onShotSaved(summary);
    resetState();
  }, [startCoord, currentCoord, club, shape, lie, contact, onShotSaved]);

  const resetState = () => {
    setClub(null);
    setShape(null);
    setLie(null);
    setContact(null);
    setStartCoord(null);
    setCurrentCoord(null);
    setTracking(false);
    locationSub.current?.remove();
    locationSub.current = null;
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Track Shot</Text>
          <TouchableOpacity onPress={handleClose} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
            <MaterialCommunityIcons name="close" size={24} color="#bec9c1" />
          </TouchableOpacity>
        </View>

        {/* Club selector (required) */}
        <PillSelector label="Club" options={CLUBS} selected={club} onSelect={setClub} />

        {/* Optional selectors */}
        <PillSelector label="Shot Shape" options={SHAPES} selected={shape} onSelect={setShape} />
        <PillSelector label="Lie" options={LIES} selected={lie} onSelect={setLie} />
        <PillSelector label="Contact" options={CONTACTS} selected={contact} onSelect={setContact} />

        {/* Tracking indicator */}
        {tracking && (
          <View style={styles.trackingRow}>
            <Animated.View style={[styles.trackingDot, { opacity: pulseAnim }]} />
            <Text style={styles.trackingText}>Tracking...</Text>
            <Text style={styles.trackingDist}>{liveDistance} yds</Text>
          </View>
        )}

        {/* Action buttons */}
        <View style={styles.actions}>
          {!tracking ? (
            <TouchableOpacity
              style={[styles.actionBtn, !club && styles.actionBtnDisabled]}
              onPress={handleStartTracking}
              disabled={!club}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons name="crosshairs-gps" size={18} color={club ? '#101511' : '#88938c'} />
              <Text style={[styles.actionBtnText, !club && styles.actionBtnTextDisabled]}>
                Start Tracking
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.saveBtn} onPress={handleSaveShot} activeOpacity={0.8}>
              <MaterialCommunityIcons name="check" size={18} color="#101511" />
              <Text style={styles.saveBtnText}>Save Shot</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

// --- Styles ---

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    zIndex: 100,
  },
  container: {
    backgroundColor: '#1c211c',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
    borderColor: '#3f4943',
    borderBottomWidth: 0,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontFamily: 'Newsreader',
    fontSize: 20,
    fontStyle: 'italic',
    color: '#dfe4dd',
  },
  pillSection: {
    marginBottom: 10,
  },
  pillLabel: {
    fontFamily: 'Manrope',
    fontSize: 11,
    color: '#88938c',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  pillRow: {
    flexDirection: 'row',
    gap: 6,
    paddingRight: 16,
  },
  pill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#101511',
    borderWidth: 1,
    borderColor: '#3f4943',
  },
  pillActive: {
    backgroundColor: '#006747',
    borderColor: '#84d7af',
  },
  pillText: {
    fontFamily: 'Manrope',
    fontSize: 13,
    color: '#bec9c1',
  },
  pillTextActive: {
    color: '#84d7af',
    fontWeight: '700',
  },
  trackingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
  },
  trackingDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#e9c349',
  },
  trackingText: {
    fontFamily: 'Manrope',
    fontSize: 14,
    color: '#e9c349',
    fontWeight: '600',
  },
  trackingDist: {
    fontFamily: 'Manrope',
    fontSize: 20,
    color: '#dfe4dd',
    fontWeight: '700',
  },
  actions: {
    marginTop: 8,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#84d7af',
    borderRadius: 12,
    paddingVertical: 14,
  },
  actionBtnDisabled: {
    backgroundColor: '#3f4943',
  },
  actionBtnText: {
    fontFamily: 'Manrope',
    fontSize: 15,
    fontWeight: '700',
    color: '#101511',
  },
  actionBtnTextDisabled: {
    color: '#88938c',
  },
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#e9c349',
    borderRadius: 12,
    paddingVertical: 14,
  },
  saveBtnText: {
    fontFamily: 'Manrope',
    fontSize: 15,
    fontWeight: '700',
    color: '#101511',
  },
});
