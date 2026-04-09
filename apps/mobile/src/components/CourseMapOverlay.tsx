import React, { useEffect, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { HoleGeometry, DistanceResult } from '../services/courseDataProvider';

// --- Haversine helper (meters) ---

function haversineMeters(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
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

// --- Try to load react-native-maps (fails gracefully in Expo Go) ---

let MapView: any = null;
let Polygon: any = null;
let Marker: any = null;
let MAPS_AVAILABLE = false;

try {
  const maps = require('react-native-maps');
  MapView = maps.default;
  Polygon = maps.Polygon;
  Marker = maps.Marker;
  MAPS_AVAILABLE = true;
} catch {
  // react-native-maps not available (Expo Go) — will use text fallback
}

// --- Props ---

interface CourseMapOverlayProps {
  holeGeometry: HoleGeometry | null;
  userLocation: { latitude: number; longitude: number } | null;
  distances: DistanceResult | null;
  onDistanceUpdate?: (distances: DistanceResult) => void;
}

export function CourseMapOverlay({
  holeGeometry,
  userLocation,
  distances,
  onDistanceUpdate,
}: CourseMapOverlayProps) {
  // Recalculate distances when user location changes
  useEffect(() => {
    if (!userLocation || !holeGeometry || !onDistanceUpdate) return;

    const front = metersToYards(
      haversineMeters(userLocation.latitude, userLocation.longitude, holeGeometry.greenFront.lat, holeGeometry.greenFront.lng),
    );
    const center = metersToYards(
      haversineMeters(userLocation.latitude, userLocation.longitude, holeGeometry.greenCenter.lat, holeGeometry.greenCenter.lng),
    );
    const back = metersToYards(
      haversineMeters(userLocation.latitude, userLocation.longitude, holeGeometry.greenBack.lat, holeGeometry.greenBack.lng),
    );

    onDistanceUpdate({ front, center, back });
  }, [userLocation?.latitude, userLocation?.longitude, holeGeometry, onDistanceUpdate]);

  // Map region centered on hole or user
  const region = useMemo(() => {
    if (holeGeometry) {
      return {
        latitude: holeGeometry.teeBox.lat,
        longitude: holeGeometry.teeBox.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      };
    }
    if (userLocation) {
      return {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      };
    }
    return null;
  }, [holeGeometry, userLocation]);

  // --- Text fallback for Expo Go ---
  if (!MAPS_AVAILABLE) {
    return (
      <View style={styles.fallbackContainer}>
        <MaterialCommunityIcons name="map-marker-radius" size={28} color="#006747" />
        <Text style={styles.fallbackTitle}>GPS Active</Text>
        {distances ? (
          <View style={styles.fallbackDistances}>
            <Text style={styles.fallbackDistText}>
              <Text style={{ color: '#84d7af' }}>{distances.front}</Text>
              {' / '}
              <Text style={{ color: '#e9c349' }}>{distances.center}</Text>
              {' / '}
              <Text style={{ color: '#84d7af' }}>{distances.back}</Text>
              {' yds'}
            </Text>
          </View>
        ) : null}
        <Text style={styles.fallbackNote}>Map requires dev build</Text>
      </View>
    );
  }

  // --- Real map for dev builds ---
  if (!region) {
    return (
      <View style={styles.fallbackContainer}>
        <MaterialCommunityIcons name="map-marker-question" size={28} color="#88938c" />
        <Text style={styles.fallbackTitle}>Waiting for location...</Text>
      </View>
    );
  }

  return (
    <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
        initialRegion={region}
        region={region}
        mapType="satellite"
        showsUserLocation={false}
        showsCompass={false}
        showsScale={false}
        rotateEnabled={false}
        pitchEnabled={false}
      >
        {/* Fairway polygon */}
        {holeGeometry && holeGeometry.fairwayOutline.length > 0 && (
          <Polygon
            coordinates={holeGeometry.fairwayOutline.map((p: { lat: number; lng: number }) => ({
              latitude: p.lat,
              longitude: p.lng,
            }))}
            fillColor="rgba(0, 103, 71, 0.25)"
            strokeColor="#006747"
            strokeWidth={1}
          />
        )}

        {/* Green polygon */}
        {holeGeometry && holeGeometry.greenOutline.length > 0 && (
          <Polygon
            coordinates={holeGeometry.greenOutline.map((p: { lat: number; lng: number }) => ({
              latitude: p.lat,
              longitude: p.lng,
            }))}
            fillColor="rgba(132, 215, 175, 0.35)"
            strokeColor="#84d7af"
            strokeWidth={1}
          />
        )}

        {/* Hazard polygons */}
        {holeGeometry?.hazards.map((hazard, idx) => {
          const isBunker = hazard.type === 'bunker';
          return (
            <Polygon
              key={`hazard-${idx}`}
              coordinates={hazard.outline.map((p: { lat: number; lng: number }) => ({
                latitude: p.lat,
                longitude: p.lng,
              }))}
              fillColor={isBunker ? 'rgba(233, 195, 73, 0.3)' : 'rgba(66, 133, 244, 0.3)'}
              strokeColor={isBunker ? '#e9c349' : '#4285f4'}
              strokeWidth={1}
            />
          );
        })}

        {/* Player marker */}
        {userLocation && (
          <Marker
            coordinate={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
            anchor={{ x: 0.5, y: 0.5 }}
          >
            <View style={styles.playerDot} />
          </Marker>
        )}

        {/* Pin marker */}
        {holeGeometry && (
          <Marker
            coordinate={{
              latitude: holeGeometry.greenCenter.lat,
              longitude: holeGeometry.greenCenter.lng,
            }}
            anchor={{ x: 0.5, y: 1 }}
          >
            <MaterialCommunityIcons name="flag-variant" size={20} color="#ffb4ab" />
          </Marker>
        )}
      </MapView>

      {/* Overlay message when no geometry */}
      {!holeGeometry && (
        <View style={styles.noGeomOverlay}>
          <Text style={styles.noGeomText}>Course overlay unavailable</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  // Text fallback (Expo Go)
  fallbackContainer: {
    height: 100,
    backgroundColor: '#0a1a10',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  fallbackTitle: {
    fontFamily: 'Manrope',
    fontSize: 12,
    color: '#bec9c1',
  },
  fallbackDistances: {
    flexDirection: 'row',
    gap: 8,
  },
  fallbackDistText: {
    fontFamily: 'Manrope',
    fontSize: 14,
    fontWeight: '700',
    color: '#bec9c1',
  },
  fallbackNote: {
    fontFamily: 'Manrope',
    fontSize: 10,
    color: '#88938c',
  },

  // Real map
  mapContainer: {
    height: 160,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
  playerDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#84d7af',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  noGeomOverlay: {
    position: 'absolute',
    bottom: 8,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  noGeomText: {
    fontFamily: 'Manrope',
    fontSize: 11,
    color: '#bec9c1',
    backgroundColor: 'rgba(16, 21, 17, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    overflow: 'hidden',
  },
});
