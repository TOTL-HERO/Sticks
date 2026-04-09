import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';

const BACKGROUND_LOCATION_TASK = 'sticks-background-location';

// Define the background task
TaskManager.defineTask(BACKGROUND_LOCATION_TASK, async ({ data, error }) => {
  if (error) {
    console.error('[BackgroundLocation] Error:', error.message);
    return;
  }
  if (data) {
    const { locations } = data as { locations: Location.LocationObject[] };
    // Location data is available here for future use (e.g., route tracking)
    // For M1, we just keep the task alive so GPS stays active with screen locked
    if (__DEV__ && locations?.length) {
      console.log('[BackgroundLocation] Got', locations.length, 'location(s)');
    }
  }
});

export async function registerBackgroundLocationTask(): Promise<void> {
  const { status } = await Location.requestBackgroundPermissionsAsync();
  if (status !== 'granted') {
    console.warn('[BackgroundLocation] Background permission not granted');
    return;
  }

  const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_LOCATION_TASK);
  if (isRegistered) return;

  await Location.startLocationUpdatesAsync(BACKGROUND_LOCATION_TASK, {
    accuracy: Location.Accuracy.High,
    distanceInterval: 10,
    showsBackgroundLocationIndicator: true,
    foregroundService: {
      notificationTitle: 'Sticks — Round in Progress',
      notificationBody: 'GPS tracking is active for your round.',
    },
  });
}

export async function stopBackgroundLocationTask(): Promise<void> {
  const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_LOCATION_TASK);
  if (isRegistered) {
    await Location.stopLocationUpdatesAsync(BACKGROUND_LOCATION_TASK);
  }
}
