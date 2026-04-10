# Implementation Plan: Tee Time Booking V2

## Overview

Replace the single-file `TeeTimeScreen.tsx` state-machine with a proper multi-screen booking flow wired into the `PlayStack` navigator. Extend the API with `PaymentService` and `NotificationService`, add the `PaymentRequest` Prisma model, and replace the random mock data with deterministic Utah course data.

## Tasks

- [x] 1. Database schema and migration
  - Add `settlementStatus` and `paymentIntentId` fields to the `TeeTime` model in `apps/api/prisma/schema.prisma`
  - Add `PaymentRequest` model with `id`, `teeTimeId`, `userId`, `amount`, `status` (enum), `paymentIntentId`, `dueAt`, `paidAt`, `createdAt`, `updatedAt` fields and relations to `TeeTime` and `User`
  - Add `PaymentRequestStatus` enum (`PENDING`, `PROCESSING`, `PAID`, `FAILED`) and `SettlementStatus` enum (`UNSETTLED`, `SETTLED`, `NA`)
  - Create migration file `apps/api/prisma/migrations/20260612000000_tee_time_booking_v2/migration.sql`
  - _Requirements: 3.4, 4.2, 4.7, 4.9, 8.4_

- [x] 2. Mock course data and updated BookingProvider
  - Replace the random `Math.random()` mock in `ForeUpProvider` inside `apps/api/src/services/bookingProvider.ts` with the static `UTAH_COURSES` array (Bonneville, Soldier Hollow, East Bay, Stonebridge)
  - Add `courseDescription` field to the `TeeTimeResult` interface and populate it from `MockCourse.description`
  - Implement `timeOfDay` filter logic in `ForeUpProvider.search()` mapping `morning` → before 12:00, `afternoon` → 12:00–15:59, `twilight` → 16:00+
  - Add `timeOfDay` optional field to `TeeTimeSearchParams` interface
  - _Requirements: 1.3, 6.1, 6.2, 6.3, 6.4, 6.5, 7.2, 7.6_

  - [ ]* 2.1 Write property test for mock course data invariants
    - **Property 14: Mock course data invariants**
    - **Validates: Requirements 6.2, 6.3, 6.4, 6.5**
    - File: `apps/api/src/services/__tests__/mockCourseData.test.ts`

  - [ ]* 2.2 Write property test for search results schema conformance
    - **Property 15: Search results conform to TeeTimeResult schema**
    - **Validates: Requirements 7.2**
    - File: `apps/api/src/services/__tests__/bookingService.test.ts`

  - [ ]* 2.3 Write property test for time-of-day filter scoping
    - **Property 16: Time-of-day filter correctly scopes results**
    - **Validates: Requirements 1.3, 7.6**
    - File: `apps/api/src/services/__tests__/bookingService.test.ts`

- [x] 3. PaymentService implementation
  - Create `apps/api/src/services/paymentService.ts` implementing the `PaymentService` interface
  - Implement `createPaymentIntent(amount, currency?)` returning mock `intentId`, `clientSecret`, `amount`, and `status: 'succeeded'`
  - Implement `confirmPayment(intentId)` returning `{ success: true, status: 'succeeded' }` in mock mode
  - Implement `calculateSplit(totalAmount, playerCount)` returning `totalAmount / playerCount` rounded to 2 decimal places
  - Implement `createSplitRequests(teeTimeId, organizerId, playerCount, totalAmount)` inserting `playerCount - 1` `PaymentRequest` records with `status: 'PENDING'` and `dueAt` 24 hours from now, returning `SplitDetails`
  - Implement `processGroupMemberPayment(paymentRequestId)` updating `PaymentRequest` status to `PAID` and `paidAt` to now
  - Implement `checkSettlement(teeTimeId)` counting pending requests and updating `TeeTime.settlementStatus` to `SETTLED` when `pendingCount === 0`
  - Export a singleton `paymentService` instance
  - _Requirements: 3.3, 4.1, 4.2, 4.7, 4.9, 8.1, 8.2, 8.3, 8.4, 8.6_

  - [ ]* 3.1 Write property test for payment intent round-trip
    - **Property 5: Payment intent creation and confirmation round-trip**
    - **Validates: Requirements 3.3, 8.1, 8.2**
    - File: `apps/api/src/services/__tests__/paymentService.test.ts`

  - [ ]* 3.2 Write property test for split calculation math
    - **Property 7: Split calculation math**
    - **Validates: Requirements 4.1, 8.3**
    - File: `apps/api/src/services/__tests__/paymentService.test.ts`

  - [ ]* 3.3 Write property test for PaymentRequest creation count and status
    - **Property 8: PaymentRequest records created with correct count and PENDING status**
    - **Validates: Requirements 4.2**
    - File: `apps/api/src/services/__tests__/paymentService.test.ts`

  - [ ]* 3.4 Write property test for settlement status update
    - **Property 10: Settlement status updates when all members paid**
    - **Validates: Requirements 4.7**
    - File: `apps/api/src/services/__tests__/paymentService.test.ts`

  - [ ]* 3.5 Write property test for PaymentRequest status transition to PAID
    - **Property 12: PaymentRequest status transitions to PAID on success**
    - **Validates: Requirements 4.9**
    - File: `apps/api/src/services/__tests__/paymentService.test.ts`

  - [ ]* 3.6 Write property test for PaymentRequest status enum validity
    - **Property 17: PaymentRequest status is always a valid enum value**
    - **Validates: Requirements 8.4**
    - File: `apps/api/src/services/__tests__/paymentService.test.ts`

- [x] 4. NotificationService implementation
  - Create `apps/api/src/services/notificationService.ts` implementing the `NotificationService` interface
  - Implement `sendBookingConfirmation(userId, courseName, datetime, amount)` logging `[ONESIGNAL_MOCK]` payload to console
  - Implement `sendPaymentRequest(userId, bookingId, paymentRequestId, splitAmount)` logging `[ONESIGNAL_MOCK]` payload to console
  - Implement `scheduleReminder(userId, teeTimeId, courseName, datetime)` logging `[ONESIGNAL_MOCK]` payload to console
  - All functions are fire-and-forget — catch and log errors without rethrowing
  - Export a singleton `notificationService` instance
  - _Requirements: 4.3, 5.2, 5.5, 9.1, 9.2, 9.3, 9.4, 9.5_

  - [ ]* 4.1 Write property test for notification logging with ONESIGNAL_MOCK prefix
    - **Property 9: Notification logging with ONESIGNAL_MOCK prefix**
    - **Validates: Requirements 4.3, 5.2, 9.4**
    - File: `apps/api/src/services/__tests__/notificationService.test.ts`

- [x] 5. Extend BookingService and booking routes
  - Update `BookingService.book()` in `apps/api/src/services/bookingService.ts` to accept `paymentMethodId` parameter, call `paymentService.createPaymentIntent()`, store `paymentIntentId` on the `TeeTime` record, call `paymentService.createSplitRequests()` when `players > 1`, call `notificationService.sendPaymentRequest()` for each group member, call `notificationService.scheduleReminder()`, and return `BookingConfirmation & { splitDetails? }` 
  - Add `BookingService.splitPay(paymentRequestId, paymentMethodId)` method that calls `paymentService.processGroupMemberPayment()` and then `paymentService.checkSettlement()`
  - Update `POST /bookings` route in `apps/api/src/routes/bookings.ts` to accept `paymentMethodId` in request body and return `splitDetails` in response
  - Add `POST /bookings/:id/split-pay` route that calls `bookingService.splitPay()` and returns `{ success: boolean }`
  - Add `GET /bookings/:id/split-status` route that calls `paymentService.checkSettlement()` and returns settlement state
  - Update `GET /bookings/search` route to accept and forward `timeOfDay` query parameter, validate it is one of `morning | afternoon | twilight`, and return 400 for invalid values
  - _Requirements: 3.3, 3.4, 4.1, 4.2, 4.3, 5.2, 7.1, 7.3, 7.4, 7.5_

  - [ ]* 5.1 Write property test for booking record created with BOOKED status
    - **Property 6: Booking record created with BOOKED status**
    - **Validates: Requirements 3.4**
    - File: `apps/api/src/services/__tests__/bookingService.test.ts`

  - [ ]* 5.2 Write unit tests for booking routes
    - Test `GET /bookings/search` returns 400 for missing date, players out of range, and invalid `timeOfDay`
    - Test `POST /bookings` returns 201 with `splitDetails` when `players > 1`
    - Test `POST /bookings/:id/split-pay` returns 200 on success and 404 for unknown booking
    - Test `GET /bookings/:id/split-status` returns settlement state
    - File: `apps/api/src/routes/__tests__/bookings.test.ts`

- [x] 6. Checkpoint — API layer complete
  - Ensure all API tests pass, ask the user if questions arise.

- [x] 7. Navigation types and PlayStack wiring
  - Define `PlayStackParamList` type in `apps/mobile/src/navigation/BottomTabNavigator.tsx` (or a new `apps/mobile/src/navigation/types.ts`) with entries for `PlayHome`, `Scoring`, `TeeTimes`, `CourseDetail`, `Confirmation`, `Success`, and `SplitPayment`
  - Add `CourseDetailScreen`, `ConfirmationScreen`, `SuccessScreen`, and `SplitPaymentScreen` screens to `PlayStackNavigator` in `BottomTabNavigator.tsx`
  - Register deep link path `sticks://split-payment/:bookingId/:paymentRequestId` in `app.json` linking config
  - _Requirements: 10.1, 10.3, 10.4_

- [x] 8. Refactor SearchScreen (TeeTimeScreen.tsx)
  - Remove the `ScreenMode` state machine and the confirm/success/history render branches from `apps/mobile/src/screens/TeeTimeScreen.tsx`
  - Add `timeOfDay` state (`'morning' | 'afternoon' | 'twilight'`) with a segmented control UI (three pill buttons)
  - Expand the date picker from 7 days to 14 days (today + 13)
  - Update the search query to include `timeOfDay` parameter
  - On tee time card tap, navigate to `CourseDetail` screen passing `{ teeTime, playerCount }` instead of entering confirm mode
  - Replace all hardcoded hex colors with `colors.*` and font names with `fonts.*` from `../../theme`
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 10.2_

  - [ ]* 8.1 Write property test for date range generation invariant
    - **Property 1: Date range generation invariant**
    - **Validates: Requirements 1.1**
    - File: `apps/mobile/src/screens/__tests__/SearchScreen.test.ts`

  - [ ]* 8.2 Write property test for search params completeness
    - **Property 2: Search params completeness**
    - **Validates: Requirements 1.4, 7.6**
    - File: `apps/mobile/src/screens/__tests__/SearchScreen.test.ts`

  - [ ]* 8.3 Write property test for search results list length
    - **Property 3: Search results list length matches data**
    - **Validates: Requirements 1.5**
    - File: `apps/mobile/src/screens/__tests__/SearchScreen.test.ts`

  - [ ]* 8.4 Write unit tests for SearchScreen states
    - Test empty state renders when results array is empty (Req 1.8)
    - Test error state with retry button renders on fetch failure (Req 1.9)

- [x] 9. Create CourseDetailScreen
  - Create `apps/mobile/src/screens/CourseDetailScreen.tsx`
  - Display course name (heading font), `courseDescription`, selected tee time and date
  - Display price breakdown: per-player price × player count = total, using `colors.gold` for the total
  - Render "Book Now" CTA button that navigates to `Confirmation` screen with `{ teeTime, playerCount }`
  - Render back chevron that pops to `SearchScreen`
  - Use `colors.*`, `fonts.*`, `spacing.*`, `radii.*` from theme throughout
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

  - [ ]* 9.1 Write property test for price breakdown calculation correctness
    - **Property 4: Price breakdown calculation correctness**
    - **Validates: Requirements 2.2, 3.7**
    - File: `apps/mobile/src/screens/__tests__/CourseDetailScreen.test.ts`

- [x] 10. Create ConfirmationScreen
  - Create `apps/mobile/src/screens/ConfirmationScreen.tsx`
  - Display full booking summary card: course name, date, time, player count, per-player price, total
  - When `playerCount > 1`, display per-player split amount below the total
  - Render mock card input placeholder (static `TextInput` styled as a card field — no real Stripe SDK)
  - Render "Pay $XX.XX" button that calls `POST /bookings` with `{ providerRefId, provider, players, paymentMethodId: 'mock_pm' }`
  - Show loading indicator while `bookMutation.isPending`
  - On success, navigate to `Success` screen with `{ confirmation, splitDetails }`
  - On failure, display error message inline with a retry option (do not navigate away)
  - Use `colors.*`, `fonts.*`, `spacing.*`, `radii.*` from theme throughout
  - _Requirements: 3.1, 3.2, 3.3, 3.5, 3.6, 3.7, 8.5_

  - [ ]* 10.1 Write unit tests for ConfirmationScreen
    - Test payment form elements render (Req 3.2, 8.5)
    - Test error message renders inline on payment failure (Req 3.6)
    - Test split amount displays when `playerCount > 1` (Req 3.7)

- [x] 11. Create SuccessScreen
  - Create `apps/mobile/src/screens/SuccessScreen.tsx`
  - Display check-circle icon in `colors.green`, success title
  - Display course name, formatted date/time, player count, total paid formatted as `$XX.XX`, and confirmation number badge
  - Render "Back to Tee Times" button that pops to `TeeTimes` (SearchScreen)
  - Render "View My Bookings" button that navigates to booking history (push `TeeTimes` with history param or navigate to a dedicated history route)
  - Use `colors.*`, `fonts.*`, `spacing.*`, `radii.*` from theme throughout
  - _Requirements: 5.1, 5.3, 5.4_

  - [ ]* 11.1 Write property test for success screen required fields
    - **Property 13: Success screen renders all required fields**
    - **Validates: Requirements 5.1**
    - File: `apps/mobile/src/screens/__tests__/SuccessScreen.test.ts`

  - [ ]* 11.2 Write unit tests for SuccessScreen buttons
    - Test "Back to Tee Times" and "View My Bookings" buttons render (Req 5.3, 5.4)

- [x] 12. Create SplitPaymentScreen
  - Create `apps/mobile/src/screens/SplitPaymentScreen.tsx`
  - On mount, fetch booking and payment request details via `GET /bookings/:id` and derive split amount from `splitDetails`
  - Display course name, tee time, total booking amount, and the group member's split amount prominently
  - Display status badge (`PENDING` / `PAID` / `FAILED`) using appropriate `colors.*` values
  - Render "Pay $XX.XX" button that calls `POST /bookings/:id/split-pay` with `{ paymentRequestId, paymentMethodId: 'mock_pm' }`
  - On success, update status badge to `PAID`
  - On failure, display error message with retry
  - Handle deep link entry: read `bookingId` and `paymentRequestId` from route params
  - Use `colors.*`, `fonts.*`, `spacing.*`, `radii.*` from theme throughout
  - _Requirements: 4.4, 4.5, 4.6, 4.8, 10.3_

  - [ ]* 12.1 Write property test for overdue payment request flagging
    - **Property 11: Overdue payment request flagging**
    - **Validates: Requirements 4.8**
    - File: `apps/mobile/src/screens/__tests__/SplitPaymentScreen.test.ts`

- [x] 13. Checkpoint — all screens wired and tests passing
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests use `fast-check` with `numRuns: 100` (500 for Properties 5 and 7)
- All components must use `colors.*`, `fonts.*`, `spacing.*`, and `radii.*` from `apps/mobile/src/theme.ts` — no hardcoded hex values
