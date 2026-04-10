import { Platform } from 'react-native';
import { useRoundStore } from '../stores/roundStore';

// Only import native modules on non-web platforms
let TaskManager: typeof import('expo-task-manager') | null = null;
let Location: typeof import('expo-location') | null = null;

if (Platform.OS !== 'web') {
  TaskManager = require('expo-task-manager');
  Location = require('expo-location');
}

const BACKGROUND_LOCATION_TASK = 'sticks-background-location';

// --- Helpers ---

function haversineMeters(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371000;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function generateId(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

// --- Stillness detector state ---

interface LocationSample {
  lat: number;
  lng: number;
  timestamp: number;
  accuracy: number;
  altitude: number | null;
}

const locationBuffer: LocationSample[] = [];
const BUFFER_SIZE = 5;
const STILLNESS_DISTANCE_M = 2;
const STILLNESS_DURATION_MS = 5000;

/** ID of the last shot point we created (so we can set its end coords on departure) */
let lastDetectedShotId: string | null = null;
/** Position of the last detected shot (for departure check) */
let lastShotPosition: { lat: number; lng: number } | null = null;

/**
 * Check whether every sample in the buffer is within `STILLNESS_DISTANCE_M`
 * of every other sample.
 */
function allSamplesWithinThreshold(buffer: LocationSample[]): boolean {
  for (let i = 0; i < buffer.length; i++) {
    for (let j = i + 1; j < buffer.length; j++) {
      if (
        haversineMeters(buffer[i].lat, buffer[i].lng, buffer[j].lat, buffer[j].lng) >
        STILLNESS_DISTANCE_M
      ) {
        return false;
      }
    }
  }
  return true;
}

/**
 * Check if a shot was already flagged near the given position.
 * Looks at the most recent shot point in the store.
 */
function shotAlreadyFlaggedNearby(lat: number, lng: number): boolean {
  const { activeRound } = useRoundStore.getState();
  if (!activeRound || activeRound.shotPoints.length === 0) return false;

  const lastShot = activeRound.shotPoints[activeRound.shotPoints.length - 1];
  return (
    haversineMeters(lat, lng, lastShot.startLatitude, lastShot.startLongitude) <=
    STILLNESS_DISTANCE_M
  );
}

function handleLocationUpdate(sample: LocationSample): void {
  // --- Departure detection ---
  // If we have a pending shot, check if we've moved away from it
  if (lastDetectedShotId && lastShotPosition) {
    const distFromShot = haversineMeters(
      sample.lat,
      sample.lng,
      lastShotPosition.lat,
      lastShotPosition.lng,
    );
    if (distFromShot > STILLNESS_DISTANCE_M) {
      useRoundStore.getState().updateShotPoint(lastDetectedShotId, {
        endLatitude: sample.lat,
        endLongitude: sample.lng,
      });
      lastDetectedShotId = null;
      lastShotPosition = null;
    }
  }

  // --- Buffer management ---
  locationBuffer.push(sample);
  if (locationBuffer.length > BUFFER_SIZE) {
    locationBuffer.shift();
  }

  // Need a full buffer to evaluate stillness
  if (locationBuffer.length < BUFFER_SIZE) return;

  // --- Stillness check ---
  const timeSpan =
    locationBuffer[locationBuffer.length - 1].timestamp - locationBuffer[0].timestamp;
  if (timeSpan < STILLNESS_DURATION_MS) return;

  if (!allSamplesWithinThreshold(locationBuffer)) return;

  // Compute average position from the buffer
  const avgLat = locationBuffer.reduce((s, p) => s + p.lat, 0) / locationBuffer.length;
  const avgLng = locationBuffer.reduce((s, p) => s + p.lng, 0) / locationBuffer.length;

  // Don't double-flag the same spot
  if (shotAlreadyFlaggedNearby(avgLat, avgLng)) return;

  const { activeRound } = useRoundStore.getState();
  if (!activeRound) return;

  const holeNumber = activeRound.currentHole;
  const existingShotsForHole = activeRound.shotPoints.filter(
    (sp) => sp.holeNumber === holeNumber,
  );

  const shotId = generateId();

  useRoundStore.getState().addShotPoint({
    id: shotId,
    holeNumber,
    shotNumber: existingShotsForHole.length + 1,
    startLatitude: avgLat,
    startLongitude: avgLng,
    endLatitude: null,
    endLongitude: null,
    timestamp: new Date(sample.timestamp).toISOString(),
    eventType: 'DETECTED',
    accuracy: sample.accuracy,
    altitude: sample.altitude,
  });

  lastDetectedShotId = shotId;
  lastShotPosition = { lat: avgLat, lng: avgLng };

  // Clear buffer after detection so we don't re-trigger immediately
  locationBuffer.length = 0;
}

// --- Background task definition (native only) ---

if (Platform.OS !== 'web' && TaskManager) {
  TaskManager.defineTask(BACKGROUND_LOCATION_TASK, async ({ data, error }: any) => {
    if (error) {
      console.error('[BackgroundLocation] Error:', error.message);
      return;
    }
    if (data) {
      const { locations } = data as { locations: any[] };
      if (locations?.length) {
        for (const loc of locations) {
          handleLocationUpdate({
            lat: loc.coords.latitude,
            lng: loc.coords.longitude,
            timestamp: loc.timestamp,
            accuracy: loc.coords.accuracy ?? 0,
            altitude: loc.coords.altitude,
          });
        }
        if (__DEV__) {
          console.log('[BackgroundLocation] Processed', locations.length, 'location(s)');
        }
      }
    }
  });
}

export async function registerBackgroundLocationTask(): Promise<void> {
  if (!Location || !TaskManager) return;
  const { status } = await Location.requestBackgroundPermissionsAsync();
  if (status !== 'granted') {
    console.warn('[BackgroundLocation] Background permission not granted');
    return;
  }

  const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_LOCATION_TASK);
  if (isRegistered) return;

  await Location.startLocationUpdatesAsync(BACKGROUND_LOCATION_TASK, {
    accuracy: Location.Accuracy.High,
    distanceInterval: 5,
    timeInterval: 10000,
    showsBackgroundLocationIndicator: true,
    foregroundService: {
      notificationTitle: 'Sticks — Round in Progress',
      notificationBody: 'GPS tracking is active for your round.',
    },
  });
}

export async function stopBackgroundLocationTask(): Promise<void> {
  if (!Location || !TaskManager) return;
  const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_LOCATION_TASK);
  if (isRegistered) {
    await Location.stopLocationUpdatesAsync(BACKGROUND_LOCATION_TASK);
  }
}

/** Check if the background task is still alive and restart if needed */
export async function checkAndRecoverTask(): Promise<{ recovered: boolean; gapMs: number | null }> {
  if (!TaskManager) return { recovered: false, gapMs: null };
  const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_LOCATION_TASK);
  if (isRegistered) return { recovered: false, gapMs: null };

  const { activeRound } = useRoundStore.getState();
  if (!activeRound) return { recovered: false, gapMs: null };

  // Calculate gap from last known shot timestamp
  const lastShot = activeRound.shotPoints[activeRound.shotPoints.length - 1];
  const gapMs = lastShot ? Date.now() - new Date(lastShot.timestamp).getTime() : null;

  // Log time-gap marker if gap exceeds 30 seconds
  if (gapMs && gapMs > 30_000) {
    useRoundStore.getState().addShotPoint({
      id: generateId(),
      holeNumber: activeRound.currentHole,
      shotNumber: 0,
      startLatitude: 0,
      startLongitude: 0,
      endLatitude: null,
      endLongitude: null,
      timestamp: new Date().toISOString(),
      eventType: 'ROUND_START', // reused as gap marker
      accuracy: 0,
      altitude: null,
    });
  }

  await registerBackgroundLocationTask();
  return { recovered: true, gapMs };
}

// Exported for testing
export { haversineMeters, generateId, handleLocationUpdate, locationBuffer, allSamplesWithinThreshold, STILLNESS_DISTANCE_M, STILLNESS_DURATION_MS, BUFFER_SIZE };
