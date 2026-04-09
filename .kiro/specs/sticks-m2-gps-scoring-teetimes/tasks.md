# Implementation Plan: Sticks M2 — GPS Scoring, Course Geometry & Tee Time Booking

## Overview

M2 hardens the GPS scoring pipeline and adds tee time booking and course geometry overlays. Implementation proceeds in order: schema changes first, then API services, then mobile services, then UI integration. Each task builds incrementally on the previous so there is no orphaned code.

## Tasks

- [x] 1. Prisma schema updates and migration
  - [x] 1.1 Add new enums and update TeeTime model in `apps/api/prisma/schema.prisma`
    - Add `BookingProvider` enum (`FOREUP`, `GOLFNOW`)
    - Add `ReminderType` enum (`TWENTY_FOUR_HOUR`, `TWO_HOUR`)
    - Add `ReminderStatus` enum (`SCHEDULED`, `DELIVERED`, `CANCELLED`, `FAILED`)
    - Add `RefundStatus` enum (`NONE`, `PENDING`, `COMPLETED`, `FAILED`)
    - Update `TeeTime` model with: `provider` (BookingProvider?), `providerRefId` (String?), `bookerId` (String?), `playerCount` (Int?), `paymentAmount` (Float?), `commissionAmount` (Float?), `refundStatus` (RefundStatus @default(NONE)), `cancelledAt` (DateTime?), `confirmationNumber` (String?), `courseId` (String?)
    - Add `booker` relation from TeeTime to User via `bookerId`
    - Add `bookings TeeTime[]` relation on User model
    - _Requirements: 9.1, 9.5_

  - [x] 1.2 Add Reminder model to `apps/api/prisma/schema.prisma`
    - Create `Reminder` model with: `id`, `teeTimeId`, `oneSignalId` (String?), `scheduledAt` (DateTime), `reminderType` (ReminderType), `status` (ReminderStatus @default(SCHEDULED)), `deliveredAt` (DateTime?), `createdAt`
    - Add foreign key from Reminder to TeeTime, add `reminders Reminder[]` on TeeTime
    - Add `@@index([teeTimeId])` on Reminder
    - _Requirements: 9.2, 9.6_

  - [x] 1.3 Add CourseGeometryCache model to `apps/api/prisma/schema.prisma`
    - Create `CourseGeometryCache` model with: `id`, `courseId` (String @unique), `providerSource` (String), `geometryData` (Json), `expiresAt` (DateTime), `createdAt`, `updatedAt`
    - _Requirements: 9.3_

  - [x] 1.4 Generate Prisma migration
    - Run `bunx prisma migrate dev --name m2_booking_reminders_geometry` to create and apply the migration
    - Regenerate Prisma client
    - _Requirements: 9.4_

- [x] 2. Checkpoint — Verify schema migration
  - Ensure migration applies cleanly and Prisma client regenerates without errors. Ask the user if questions arise.

- [x] 3. API booking provider and service
  - [x] 3.1 Create `apps/api/src/services/bookingProvider.ts`
    - Define `TeeTimeSearchParams` interface (date, courseId?, timeFrom?, timeTo?, players, lat?, lng?)
    - Define `TeeTimeResult` interface (providerRefId, provider, courseName, courseId, datetime, availableSpots, pricePerPlayer, totalPrice)
    - Define `BookingConfirmation` interface (providerRefId, confirmationNumber, provider, courseName, datetime, players, totalPrice)
    - Define `BookingProvider` interface with methods: `search`, `book`, `cancel`, `refund`
    - Implement `ForeUpProvider` class implementing `BookingProvider` — proxy calls to foreUP API using env var `FOREUP_API_KEY`
    - Implement `GolfNowProvider` class implementing `BookingProvider` — proxy calls to GolfNow API using env var `GOLFNOW_API_KEY`
    - _Requirements: 5.7, 7.1, 7.6_

  - [x] 3.2 Create `apps/api/src/services/bookingService.ts`
    - Implement `BookingService` class with `foreUp` and `golfNow` provider instances and `commissionRate = 0.08`
    - Implement `search(params)`: query foreUP first, fall back to GolfNow if foreUP returns empty results
    - Implement `book(providerRefId, provider, userId, players)`: route to correct provider, create TeeTime record with BOOKED status, compute and store commission
    - Implement `cancel(teeTimeId)`: look up TeeTime, route cancellation to correct provider, update status to CANCELLED, set cancelledAt, set refundStatus to PENDING
    - Implement `refund(teeTimeId)`: route refund to correct provider, update refundStatus
    - _Requirements: 5.1, 5.4, 5.8, 6.3, 6.4, 7.2, 7.3, 7.4_

  - [ ]* 3.3 Write property tests for BookingService in `apps/api/src/services/__tests__/bookingService.test.ts`
    - **Property 14: Booking creation with commission** — for any successful booking, TeeTime record has BOOKED status and commissionAmount = totalPrice * 0.08
    - **Validates: Requirements 5.4, 5.8**
    - **Property 15: Cancellation with refund initiation** — for any booked TeeTime where provider confirms cancel, status → CANCELLED, cancelledAt set, refundStatus → PENDING
    - **Validates: Requirements 6.3, 6.4**
    - **Property 16: GolfNow fallback on empty foreUP results** — for any search where foreUP returns [], GolfNow is queried with same params
    - **Validates: Requirements 7.2**
    - **Property 17: Provider-correct routing** — booking/cancellation routed to provider matching TeeTime.provider field
    - **Validates: Requirements 7.3, 7.4**

- [x] 4. API reminder service
  - [x] 4.1 Create `apps/api/src/services/reminderService.ts`
    - Implement `ReminderService` class with OneSignal app ID and API key from env vars
    - Implement `scheduleReminders(teeTimeId, userId, datetime, courseName, players)`: schedule 24-hour and 2-hour reminders via OneSignal REST API, persist Reminder records in DB, skip reminders whose scheduled time is in the past
    - Implement `cancelReminders(teeTimeId)`: fetch Reminder records, cancel each via OneSignal REST API, update status to CANCELLED
    - Implement retry-once logic: if OneSignal scheduling fails, retry after 30 seconds; if retry fails, mark Reminder as FAILED
    - 24-hour reminder body: course name, tee time, player count
    - 2-hour reminder body: course name, tee time, directions prompt
    - _Requirements: 8.1, 8.2, 8.3, 8.5, 8.6_

  - [ ]* 4.2 Write property tests for ReminderService in `apps/api/src/services/__tests__/reminderService.test.ts`
    - **Property 18: Reminder scheduling times** — for any booking with datetime T, exactly two reminders at T-24h and T-2h; past reminders skipped
    - **Validates: Requirements 8.1**
    - **Property 19: Reminder content by type** — 24h body contains course name + player count; 2h body contains course name + directions prompt
    - **Validates: Requirements 8.2, 8.3**
    - **Property 20: Reminder cancellation on booking cancel** — all Reminder records for cancelled TeeTime have status CANCELLED
    - **Validates: Requirements 8.5**

- [x] 5. API booking and geometry routes
  - [x] 5.1 Create `apps/api/src/routes/bookings.ts`
    - `GET /bookings/search` — accept date, courseId?, timeFrom?, timeTo?, players, lat?, lng? query params; call BookingService.search; return tee time list
    - `POST /bookings` — accept providerRefId, provider, players in body; call BookingService.book with authenticated userId; call ReminderService.scheduleReminders; return booking confirmation
    - `GET /bookings/me` — return current user's bookings from TeeTime table
    - `GET /bookings/:id` — return single booking detail
    - `POST /bookings/:id/cancel` — call BookingService.cancel; call ReminderService.cancelReminders; return cancellation result
    - `POST /bookings/:id/refund` — call BookingService.refund; return refund result
    - Wire into main Hono router in `apps/api/src/index.ts`
    - _Requirements: 5.1, 5.2, 5.4, 5.5, 5.6, 5.7, 6.1, 6.2, 6.3, 6.4, 6.5, 6.6_

  - [x] 5.2 Add geometry endpoint to `apps/api/src/routes/courses.ts`
    - `GET /courses/:id/geometry` — fetch course detail from GolfCourseAPI.com, extract hole-level geometry, check CourseGeometryCache first (return cached if not expired), normalize into HoleGeometry[] schema, cache result with 7-day TTL, return CourseGeometry response
    - If GolfCourseAPI.com doesn't provide hole-level data, return mock overlay data with representative hole shapes
    - _Requirements: 3.1, 3.5, 3.6, 3.7, 9.3_

  - [x] 5.3 Update `PUT /rounds/:id/holes/:num` in `apps/api/src/routes/rounds.ts`
    - Accept `force` header for conflict resolution — when present, overwrite server data with request body unconditionally
    - _Requirements: 2.4_

- [x] 6. Checkpoint — Verify API services and routes
  - Ensure all tests pass, ask the user if questions arise.

- [x] 7. Mobile sync queue hardening
  - [x] 7.1 Rewrite `apps/mobile/src/services/syncQueue.ts` with exponential backoff
    - Add `SyncOperation` interface with id, type ('hole' | 'shot-batch'), payload, attempts, lastAttempt, status ('pending' | 'in-flight' | 'failed')
    - Add `SyncQueueState` with operations array, maxRetries (10), baseDelayMs (1000), maxDelayMs (60000), jitterFactor (0.25)
    - Implement `getBackoffDelay(attempt, base, max, jitter)` — `min(base * 2^attempt, max)` ± jitter
    - Persist queue state to AsyncStorage key `sync-queue-state`
    - Process hole syncs and shot-batch syncs in independent pipelines
    - Process operations in chronological order
    - After 10 failures, mark operation as `failed` and surface manual retry option
    - On 409 conflict from server, re-send with `force: true` header; log conflict to `sync-conflicts` AsyncStorage key
    - On connectivity restoration, process all pending ops within 5 seconds
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.8, 2.9, 2.10_

  - [ ]* 7.2 Write property tests for sync queue in `apps/mobile/src/services/__tests__/syncQueue.test.ts`
    - **Property 5: Exponential backoff delay formula** — for attempt N (0 ≤ N < 10), delay = min(1000 * 2^N, 60000) ± 25% jitter, never exceeds 60000, never < 0
    - **Validates: Requirements 2.1**
    - **Property 6: Sync operations processed in chronological order** — pending ops with distinct timestamps processed in ascending order
    - **Validates: Requirements 2.3**
    - **Property 7: Conflict resolution — local wins with logging** — on conflict, server overwritten with local data, conflict entry logged with hole number, local values, server values, timestamp
    - **Validates: Requirements 2.4, 2.5**
    - **Property 9: Independent sync pipelines** — hole sync failure does not block shot-batch sync (and vice versa)
    - **Validates: Requirements 2.8**
    - **Property 10: Sync on launch with pending data** — on launch with active round + pending data + connectivity, sync initiates within 5 seconds
    - **Validates: Requirements 2.10**

- [x] 8. Mobile round store corruption recovery
  - [x] 8.1 Add corruption recovery to `apps/mobile/src/stores/roundStore.ts`
    - Add `validateRoundState(state)` function that checks: state is object, has string id, string courseName, holes array of length 18, number currentHole
    - Add `SNAPSHOT_KEY = 'sticks-round-snapshot'` and `CORRUPT_KEY = 'sticks-round-corrupt'`
    - Write snapshot to `SNAPSHOT_KEY` every 3 holes (on advanceHole when currentHole % 3 === 0)
    - On store rehydration, if persisted state fails validation: attempt to load from SNAPSHOT_KEY; if snapshot valid, use it; if snapshot also invalid, move raw data to CORRUPT_KEY and clear active round
    - Present error to user when corruption is detected and recovery fails
    - _Requirements: 2.6, 2.7_

  - [ ]* 8.2 Write property tests for corruption recovery in `apps/mobile/src/stores/__tests__/roundStore.test.ts`
    - **Property 8: Corruption recovery from snapshot** — for any corrupted state failing validateRoundState, store loads from snapshot; if snapshot also invalid, raw data preserved in CORRUPT_KEY
    - **Validates: Requirements 2.6, 2.7**
    - **Property 3: Round state persistence round-trip** — for any valid ActiveRound, rehydrating produces equivalent state
    - **Validates: Requirements 1.4**

- [x] 9. Mobile background location recovery
  - [x] 9.1 Add task recovery to `apps/mobile/src/services/backgroundLocation.ts`
    - Implement `checkAndRecoverTask()` — check `isTaskRegisteredAsync()`, if not registered and activeRound exists: calculate gap from last shot timestamp, log time-gap marker (shotNumber 0, eventType ROUND_START, zero coords) if gap > 30s, call `registerBackgroundLocationTask()`, return `{ recovered, gapMs }`
    - Export `checkAndRecoverTask`
    - _Requirements: 1.2, 1.3, 1.4_

  - [x] 9.2 Add AppState listener for recovery in `apps/mobile/src/screens/scoring/ScoringScreen.tsx`
    - Import `AppState` from react-native and `checkAndRecoverTask` from backgroundLocation
    - On AppState transition to 'active', call `checkAndRecoverTask()`; if recovered, trigger sync queue flush
    - Display warning when background permission denied (round marked unverified)
    - _Requirements: 1.2, 1.3, 1.7_

  - [ ]* 9.3 Write property tests for background location recovery in `apps/mobile/src/services/__tests__/backgroundLocation.test.ts`
    - **Property 1: Background location task configuration** — for any round start, task registered with High accuracy, distanceInterval 5, timeInterval 10000
    - **Validates: Requirements 1.1**
    - **Property 2: Background task recovery with gap marker** — for any terminated task with active round, checkAndRecoverTask restarts task and logs gap marker when gap > 30s
    - **Validates: Requirements 1.2, 1.3**
    - **Property 4: Location update forwarding** — for any location update during active round, update forwarded to handleLocationUpdate
    - **Validates: Requirements 1.8**

- [x] 10. Checkpoint — Verify mobile services
  - Ensure all tests pass, ask the user if questions arise.

- [x] 11. Course geometry data provider extension
  - [x] 11.1 Extend `apps/mobile/src/services/courseDataProvider.ts` with geometry support
    - Add `HoleGeometry` interface (holeNumber, par, yardage, teeBox, fairwayOutline, greenOutline, hazards, greenCenter, greenFront, greenBack)
    - Add `HazardZone` interface (type: 'bunker' | 'water' | 'lateral_water' | 'out_of_bounds', outline)
    - Add `CourseGeometry` interface (courseId, holes, cachedAt, provider)
    - Add `getCourseGeometry(courseId)` to `CourseDataProvider` interface
    - Implement in `GolfCourseApiProvider`: check AsyncStorage cache (`course-geometry-{courseId}`) with 7-day TTL, fetch from `/courses/:id/geometry` API on miss, normalize response, cache result
    - On fetch failure: return stale cache if available, otherwise return null with warning flag
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7_

  - [ ]* 11.2 Write property tests for course geometry in `apps/mobile/src/services/__tests__/courseDataProvider.test.ts`
    - **Property 11: Geometry cache round-trip** — cached geometry retrieved within TTL matches original without network request
    - **Validates: Requirements 3.5**
    - **Property 12: Geometry normalization across providers** — raw responses normalized into CourseGeometry schema; missing hole data substituted with mock geometry
    - **Validates: Requirements 3.6, 3.7**
    - **Property 13: Distance-to-pin computation** — for any (lat, lng) and HoleGeometry, distance = round(haversineMeters * 1.09361) for front/center/back
    - **Validates: Requirements 4.4**

- [x] 12. Course map overlay component
  - [x] 12.1 Create `apps/mobile/src/components/CourseMapOverlay.tsx`
    - Accept props: `holeGeometry` (HoleGeometry | null), `userLocation`, `distances`, `onDistanceUpdate`
    - Render `<MapView>` with Google Maps provider
    - Render fairway `<Polygon>` (fill: rgba(0,103,71,0.25), stroke: #006747)
    - Render green `<Polygon>` (fill: rgba(132,215,175,0.35), stroke: #84d7af)
    - Render bunker `<Polygon>` (fill: rgba(233,195,73,0.3), stroke: #e9c349)
    - Render water `<Polygon>` (fill: rgba(66,133,244,0.3), stroke: #4285f4)
    - Render player position `<Marker>` (custom green dot)
    - Render pin position `<Marker>`
    - Recalculate distances on location update using haversineMeters, call `onDistanceUpdate`
    - If holeGeometry is null, show base map with player marker and "Course overlay unavailable" message
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.7, 4.8_

  - [x] 12.2 Integrate CourseMapOverlay into `apps/mobile/src/screens/scoring/ScoringScreen.tsx`
    - Replace the `mapPlaceholder` view with `<CourseMapOverlay>`
    - Fetch course geometry on round start via `getCourseGeometry(courseId)`
    - Pass current hole's geometry, user location, and distances to overlay
    - On hole advance, transition map to next hole's tee box position
    - Update distance readouts from `onDistanceUpdate` callback (replace MOCK_DISTANCES)
    - Show fallback warning if geometry fetch fails
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 3.3, 3.4_

- [x] 13. Push notification mobile integration
  - [x] 13.1 Create `apps/mobile/src/services/pushNotifications.ts`
    - Implement `initOneSignal(appId)` — initialize OneSignal SDK
    - Implement `setOneSignalExternalUserId(userId)` — call `OneSignal.login(userId)`
    - Implement `handleNotificationOpened(callback)` — listen for notification clicks, extract teeTimeId and screen from additionalData, invoke callback
    - Add `onesignal-expo-plugin` to `app.json` plugins array
    - _Requirements: 8.4, 8.7_

  - [x] 13.2 Wire OneSignal initialization into app startup
    - Call `initOneSignal` in `App.tsx` or `RootNavigator.tsx` on mount
    - Call `setOneSignalExternalUserId` after authentication
    - Wire `handleNotificationOpened` to navigate to booking detail screen
    - Request push notification permission during onboarding or before first booking
    - _Requirements: 8.4, 8.7_

- [x] 14. Tee time booking UI
  - [x] 14.1 Update `apps/mobile/src/screens/TeeTimeScreen.tsx` with real booking flow
    - Replace mock tee time search with `GET /bookings/search` API call (pass date, players)
    - Add player count selector to search UI
    - Display provider source (foreUP or GolfNow) on each tee time card
    - On Book tap, navigate to booking confirmation screen showing tee time details, total price, and Confirm Booking button
    - On Confirm Booking, call `POST /bookings`; on success show confirmation with confirmation number; on failure show error and return to search
    - Add Cancel Booking button on booked tee times; show cancellation policy, confirm, call `POST /bookings/:id/cancel`
    - Display booking status (BOOKED, CANCELLED, REFUNDED) on booking history
    - Add booking history view via `GET /bookings/me`
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 7.5_

- [x] 15. iOS configuration and permissions
  - [x] 15.1 Update `apps/mobile/app.json` with required iOS permissions
    - Add Info.plist `NSLocationAlwaysAndWhenInUseUsageDescription` framing background location as GPS golf distance tool
    - Ensure `UIBackgroundModes` includes `location`
    - Verify `onesignal-expo-plugin` is in plugins array
    - _Requirements: 1.5, 1.6_

- [x] 16. Final checkpoint — Verify all M2 features
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- Schema changes (task 1) must be completed before any API service tasks
- API services (tasks 3-5) must be completed before mobile UI integration (tasks 12-14)
