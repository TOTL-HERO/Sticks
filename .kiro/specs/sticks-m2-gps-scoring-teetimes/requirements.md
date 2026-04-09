# Requirements Document

## Introduction

Sticks M2 hardens the GPS scoring foundation laid in M1 and adds the two remaining revenue-critical features: real tee time booking and course geometry overlays. M1 shipped background location, offline scoring via Zustand/AsyncStorage, a Google Maps placeholder, and mock tee time search. M2 takes each of those to production quality: background location must survive iOS task termination and resume cleanly, offline sync must handle conflicts and corruption, the map must render real hole shapes and green outlines from a swappable course data provider (GolfCourseAPI.com now, iGolf later), foreUP booking must go end-to-end (search → book → confirm → cancel → refund) with GolfNow as a national fallback, and OneSignal push notifications must fire 24-hour and 2-hour reminders before booked tee times. The goal is a build where Utah testers can play a full round with the screen locked in a dead zone, see real hole geometry on the map, and book a tee time through the app — establishing the two pillars of free-tier revenue (tee time commission) and scoring integrity (GPS-verified rounds).

## Glossary

- **App**: The Sticks mobile application built with Expo SDK 54 / React Native
- **API_Server**: The Bun + Hono backend server hosted on Railway, using Prisma ORM against Supabase Postgres
- **Background_Location_Service**: The expo-task-manager + expo-location subsystem responsible for continuous GPS polling while the App is backgrounded or the screen is locked on iOS
- **Round_Session**: A GPS-tracked scoring session representing a single round of golf from start to finish, persisted in the Round_Store
- **Round_Store**: The Zustand store (`roundStore.ts`) that persists active round state including hole-by-hole strokes, putts, penalties, shot points, and sync status to AsyncStorage
- **Sync_Queue**: The service (`syncQueue.ts`) responsible for detecting network state changes and syncing locally persisted scoring data to Supabase
- **Course_Data_Provider**: An abstraction interface for hole-level course geometry (hole shapes, green outlines, pin positions, distances) — backed by GolfCourseAPI.com for dev/beta, designed to be swapped to iGolf without changing map rendering logic
- **GPS_Layer**: The Google Maps SDK base layer overlaid with course geometry from the Course_Data_Provider, rendering hole shapes, green outlines, and distance-to-pin readouts
- **Hole_Geometry**: The vector shape data for a single hole including tee box position, fairway outline, hazard boundaries, green outline, and pin position
- **Booking_Service**: The API_Server subsystem that orchestrates tee time search, reservation, confirmation, cancellation, and refund across foreUP and GolfNow providers
- **foreUP_API**: The third-party tee sheet software API used as the primary booking provider (Utah-dominant)
- **GolfNow_API**: The third-party tee time marketplace API used as a national fallback booking provider
- **Booking_Provider**: An abstraction interface that foreUP_API and GolfNow_API both implement, allowing the Booking_Service to route requests to either provider
- **TeeTime_Record**: A database record in the TeeTime table representing a booked or available tee time with provider reference, booking status, and payment details
- **OneSignal_Service**: The OneSignal push notification integration responsible for scheduling and delivering tee time reminders
- **Reminder**: A push notification sent to the User at a scheduled interval before a booked tee time
- **Conflict_Resolution**: The strategy applied when locally persisted scoring data differs from server-side data for the same hole during sync
- **Corruption_Recovery**: The process of detecting and recovering from malformed or incomplete round state in local storage
- **Exponential_Backoff**: A retry strategy where the delay between consecutive sync attempts increases exponentially after each failure

## Requirements

### Requirement 1: Production Background Location on iOS

**User Story:** As a golfer, I want GPS tracking to continue reliably with my screen locked for the entire round, so that my shot trail and distance-to-pin data are complete even if iOS kills the background task.

#### Acceptance Criteria

1. WHILE a Round_Session is active on iOS, THE Background_Location_Service SHALL maintain GPS polling using expo-task-manager and expo-location with high accuracy mode, a distance interval of 5 meters, and a time interval of 10 seconds
2. WHEN iOS terminates the Background_Location_Service due to memory pressure or system policy, THE App SHALL detect the termination on next foreground entry and restart the Background_Location_Service within 3 seconds
3. WHEN the App returns to the foreground after the Background_Location_Service was terminated, THE App SHALL reconcile any gap in location data by logging a time-gap marker in the Round_Store
4. WHEN the User opens the App and a Round_Session was previously active, THE App SHALL resume the Round_Session from the last persisted state in the Round_Store and restart the Background_Location_Service
5. THE App SHALL include an Info.plist location usage description that frames background location as a GPS golf distance tool for App Store review compliance
6. WHILE the Background_Location_Service is active, THE App SHALL display a persistent iOS status bar indicator showing that location tracking is in use
7. IF the User denies background location permission, THEN THE App SHALL allow manual scoring but display a warning that shot tracking integrity will be reduced and the round will be marked as unverified
8. WHEN the Background_Location_Service receives a location update, THE Background_Location_Service SHALL forward the update to the stillness detection algorithm and the GPS_Layer distance calculator

### Requirement 2: Offline-First Sync Hardening

**User Story:** As a golfer playing in a dead zone, I want my scores to persist locally and sync reliably when signal returns, so that no data is ever lost or corrupted regardless of network conditions.

#### Acceptance Criteria

1. WHEN the Sync_Queue attempts to sync a hole or shot batch and the request fails, THE Sync_Queue SHALL retry with Exponential_Backoff starting at 1 second, doubling on each failure, up to a maximum interval of 60 seconds
2. WHEN the Sync_Queue has retried a sync operation 10 times without success, THE Sync_Queue SHALL mark the operation as failed and surface a manual retry option to the User
3. WHEN the device transitions from offline to online, THE Sync_Queue SHALL process all pending sync operations in chronological order within 5 seconds of connectivity restoration
4. WHEN a Conflict_Resolution scenario occurs (local data differs from server data for the same hole), THE Sync_Queue SHALL treat the local data as the source of truth and overwrite the server record
5. WHEN the Sync_Queue detects a conflict, THE Sync_Queue SHALL log the conflict details (hole number, local values, server values, timestamp) for debugging
6. WHEN the Round_Store detects corrupted or malformed round state during initialization, THE Round_Store SHALL attempt Corruption_Recovery by loading the last valid snapshot from AsyncStorage
7. IF Corruption_Recovery fails to restore a valid round state, THEN THE Round_Store SHALL preserve the raw corrupted data in a separate AsyncStorage key for manual recovery and present an error to the User
8. THE Sync_Queue SHALL process hole syncs and shot batch syncs independently so that a failure in one category does not block the other
9. THE App SHALL display a sync status indicator showing one of three states: synced (checkmark), pending (spinner), or offline (cloud-off icon)
10. WHEN the App launches with a previously active Round_Session, THE Sync_Queue SHALL immediately attempt to sync all pending data if the device has network connectivity

### Requirement 3: Course Geometry Data Provider

**User Story:** As a golfer, I want to see real hole shapes, green outlines, and accurate front/center/back distances on the map, so that I have useful course data during my round.

#### Acceptance Criteria

1. THE Course_Data_Provider SHALL expose a typed interface with methods for: fetching hole-level geometry for a course, fetching green outline coordinates for a specific hole, and fetching front/center/back pin distances for a specific hole from a given GPS coordinate
2. THE Course_Data_Provider interface SHALL be implemented as a swappable module so that the data source can be changed from GolfCourseAPI.com to iGolf without modifying the GPS_Layer rendering logic or any screen-level code
3. WHEN the App starts a Round_Session, THE Course_Data_Provider SHALL fetch and cache all Hole_Geometry for the selected course before the first hole is displayed
4. IF the Course_Data_Provider fails to fetch geometry data, THEN THE App SHALL fall back to displaying the Google Maps base layer without course overlays and show a warning to the User
5. THE Course_Data_Provider SHALL cache fetched Hole_Geometry locally so that subsequent rounds at the same course do not require a network request
6. WHEN GolfCourseAPI.com course detail endpoint provides hole-level data, THE Course_Data_Provider SHALL use that data to populate Hole_Geometry; WHERE GolfCourseAPI.com does not provide hole-level data for a course, THE Course_Data_Provider SHALL use mock overlay data with representative hole shapes
7. THE Course_Data_Provider SHALL normalize all geometry data into a common schema regardless of the upstream provider (GolfCourseAPI.com or iGolf) so that the GPS_Layer consumes a single data format

### Requirement 4: Course Geometry Map Overlay

**User Story:** As a golfer on the course, I want to see hole shapes and green outlines overlaid on Google Maps with accurate distance readouts, so that I can make informed club selections.

#### Acceptance Criteria

1. WHEN a Round_Session is active, THE GPS_Layer SHALL render the current hole's fairway outline as a semi-transparent polygon on the Google Maps base layer
2. WHEN a Round_Session is active, THE GPS_Layer SHALL render the current hole's green outline as a distinct semi-transparent polygon with a different color from the fairway
3. WHEN a Round_Session is active, THE GPS_Layer SHALL render hazard boundaries (bunkers, water) as semi-transparent polygons with hazard-specific colors
4. WHEN a Round_Session is active, THE GPS_Layer SHALL display distance-to-pin readouts for front, center, and back of the green in yards, computed from the User's current GPS position and the Hole_Geometry pin coordinates
5. WHEN the User's GPS position updates, THE GPS_Layer SHALL recalculate and update the distance-to-pin readouts within 500 milliseconds
6. WHEN the User advances to the next hole, THE GPS_Layer SHALL transition the map view to center on the next hole's tee box position from the Hole_Geometry data
7. THE GPS_Layer SHALL render a player position marker on the map showing the User's current GPS location
8. IF Hole_Geometry is unavailable for the current hole, THEN THE GPS_Layer SHALL display the Google Maps base layer with the player position marker and a message indicating course overlay data is unavailable

### Requirement 5: foreUP Booking Flow

**User Story:** As a golfer, I want to search for, book, and confirm a tee time through the app, so that I can reserve my round without leaving Sticks.

#### Acceptance Criteria

1. WHEN a User searches for tee times on the TeeTime screen, THE API_Server SHALL query the foreUP_API for available tee times matching the selected date, time range, course, and player count
2. THE App SHALL display available tee times as a list of cards showing time, course name, available spots, price per player, and a Book button
3. WHEN a User taps the Book button on a tee time card, THE App SHALL display a booking confirmation screen showing the tee time details, total price, and a Confirm Booking button
4. WHEN a User taps Confirm Booking, THE Booking_Service SHALL create a reservation through the foreUP_API and create a TeeTime_Record in the database with booking status BOOKED
5. WHEN the foreUP_API confirms the booking, THE App SHALL display a booking confirmation view with the tee time details and a confirmation number
6. IF the foreUP_API rejects the booking (time no longer available, payment failure), THEN THE App SHALL display a descriptive error message and return the User to the tee time search results
7. THE API_Server SHALL proxy all foreUP_API requests so that API keys and credentials are not exposed to the mobile client
8. THE Booking_Service SHALL record the Sticks commission amount on each TeeTime_Record for revenue tracking

### Requirement 6: Booking Cancellation and Refund

**User Story:** As a golfer, I want to cancel a booked tee time and receive a refund according to the cancellation policy, so that I am not locked into a booking I cannot make.

#### Acceptance Criteria

1. WHEN a User views a booked tee time in the App, THE App SHALL display a Cancel Booking button
2. WHEN a User taps Cancel Booking, THE App SHALL display the cancellation policy and ask for confirmation before proceeding
3. WHEN a User confirms cancellation, THE Booking_Service SHALL send a cancellation request to the foreUP_API and update the TeeTime_Record booking status to CANCELLED
4. WHEN the foreUP_API confirms the cancellation, THE Booking_Service SHALL initiate a refund through the payment provider and update the TeeTime_Record with the refund status
5. IF the foreUP_API rejects the cancellation (past cancellation window), THEN THE App SHALL display a message explaining that the booking can no longer be cancelled
6. THE App SHALL display the booking status (BOOKED, CANCELLED, REFUNDED) on the User's booking history

### Requirement 7: GolfNow Fallback Booking Provider

**User Story:** As a golfer at a course not on foreUP, I want to still book a tee time through Sticks via GolfNow, so that booking works at courses nationwide.

#### Acceptance Criteria

1. THE Booking_Provider interface SHALL define a common contract for search, book, confirm, cancel, and refund operations that both foreUP_API and GolfNow_API implement
2. WHEN the foreUP_API returns no results for a tee time search, THE Booking_Service SHALL automatically query the GolfNow_API as a fallback and merge results into the response
3. WHEN a User books a tee time sourced from GolfNow, THE Booking_Service SHALL route the booking request through the GolfNow_API and store the GolfNow reference ID on the TeeTime_Record
4. WHEN a User cancels a GolfNow-sourced booking, THE Booking_Service SHALL route the cancellation through the GolfNow_API following the same flow as foreUP cancellations
5. THE App SHALL display the booking provider source (foreUP or GolfNow) on each tee time card so the User knows which system is handling the booking
6. THE API_Server SHALL proxy all GolfNow_API requests so that API keys and credentials are not exposed to the mobile client

### Requirement 8: Push Notification Reminders for Tee Times

**User Story:** As a golfer with a booked tee time, I want to receive push reminders at 24 hours and 2 hours before my tee time, so that I do not forget or arrive late.

#### Acceptance Criteria

1. WHEN a tee time booking is confirmed, THE API_Server SHALL schedule two Reminders via the OneSignal_Service: one at 24 hours before the tee time and one at 2 hours before the tee time
2. THE Reminder at 24 hours SHALL include the course name, tee time, and number of players in the notification body
3. THE Reminder at 2 hours SHALL include the course name, tee time, and a prompt to check directions
4. WHEN a User taps a Reminder notification, THE App SHALL navigate to the booking detail screen for that tee time
5. WHEN a booking is cancelled, THE API_Server SHALL cancel all pending Reminders for that TeeTime_Record via the OneSignal_Service
6. IF the OneSignal_Service fails to schedule a Reminder, THEN THE API_Server SHALL log the failure and retry once after 30 seconds
7. THE App SHALL request push notification permission during onboarding or before the first booking, with a clear explanation that notifications are used for tee time reminders

### Requirement 9: Database Schema Updates for M2

**User Story:** As a developer, I want the Prisma schema extended with booking provider fields, push notification references, and course geometry caching, so that all M2 features have the data model they need.

#### Acceptance Criteria

1. THE TeeTime table SHALL include additional columns for: booking provider enum (FOREUP, GOLFNOW), provider-specific reference ID, User reference (booker), payment amount, commission amount, refund status, and cancellation timestamp
2. THE API_Server SHALL include a Prisma model for scheduled Reminders with fields for: TeeTime reference, OneSignal notification ID, scheduled delivery time, delivery status, and reminder type (24_HOUR, 2_HOUR)
3. THE API_Server SHALL include a Prisma model or JSON column for cached course geometry with fields for: course ID, provider source, hole-level geometry data, and cache expiration timestamp
4. THE schema changes SHALL be managed through Prisma migrations so that they are version-controlled and reproducible
5. THE TeeTime table SHALL enforce a foreign key relationship to the User table for the booker field
6. THE Reminder model SHALL enforce a foreign key relationship to the TeeTime table

