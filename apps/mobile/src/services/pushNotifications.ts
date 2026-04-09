/**
 * Push notification service — mock implementation for Expo Go.
 *
 * OneSignal SDK requires a dev build (native module). These are no-ops
 * that log to console so the wiring is in place for when we switch to
 * a dev build with the real OneSignal plugin.
 */

// TODO: Replace with real OneSignal SDK import when dev build is ready
// import { OneSignal } from 'react-native-onesignal';

/**
 * Initialize OneSignal with the given app ID.
 * No-op in Expo Go — real init happens in the dev build.
 */
export function initOneSignal(appId: string): void {
  // TODO: OneSignal.initialize(appId);
  // TODO: OneSignal.Notifications.requestPermission(true);
  console.log('[PushNotifications] initOneSignal called (no-op)', appId);
}

/**
 * Associate the current user with their OneSignal external user ID.
 * No-op in Expo Go.
 */
export function setOneSignalExternalUserId(userId: string): void {
  // TODO: OneSignal.login(userId);
  console.log('[PushNotifications] setOneSignalExternalUserId called (no-op)', userId);
}

/**
 * Register a callback for when the user taps a push notification.
 * No-op in Expo Go.
 */
export function handleNotificationOpened(
  callback: (data: { teeTimeId: string; screen: string }) => void,
): void {
  // TODO: OneSignal.Notifications.addEventListener('click', (event) => {
  //   const data = event.notification.additionalData as { teeTimeId: string; screen: string };
  //   if (data) callback(data);
  // });
  console.log('[PushNotifications] handleNotificationOpened registered (no-op)');
}
