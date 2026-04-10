# Requirements Document

## Introduction

Tee Time Booking V2 replaces the existing single-screen TeeTimeScreen with a full multi-screen booking flow that supports date/time/player search, course detail preview, Stripe-powered split payments for groups, and push notification reminders via OneSignal. All external integrations (foreUP, Stripe, OneSignal) are mocked at the service layer so the complete UI and business logic can be built and demoed now. When real API credentials arrive, only the mock response bodies inside the service layer change — no UI or route modifications required. The flow targets Utah golf courses (Bonneville Golf Course, Soldier Hollow, East Bay, Stonebridge) with hardcoded tee time data that feels realistic for investor and beta demos.

## Glossary

- **App**: The Sticks mobile application built with Expo SDK 54 / React Native, navigated via React Navigation
- **API_Server**: The Bun + Hono backend server hosted on Railway, using Prisma ORM against Supabase Postgres
- **Search_Screen**: The first screen in the booking flow where the User selects a date, player count, and time-of-day filter to find available tee times
- **Course_Detail_Screen**: The screen displayed after the User taps a tee time result, showing course information, selected time, price breakdown, and a Book Now button
- **Confirmation_Screen**: The screen displayed after the User taps Book Now, showing the full booking summary, payment form, and split payment details for multi-player groups
- **Success_Screen**: The screen displayed after the organizer completes payment, showing booking confirmation and triggering a reminder notification
- **Split_Payment_Screen**: The screen displayed to invited group members when they tap a payment request notification, allowing them to pay their portion
- **Organizer**: The User who initiates and pays for a tee time booking
- **Group_Member**: A User invited to a multi-player booking who owes a split portion of the total cost
- **Booking_Service**: The API_Server subsystem that orchestrates tee time search, reservation, and booking across providers, extended in V2 with split payment orchestration
- **Payment_Service**: The API_Server subsystem that handles Stripe payment intent creation, split calculations, payment status tracking, and settlement detection — mocked for now
- **Notification_Service**: The API_Server subsystem that handles OneSignal push notification delivery for booking confirmations, payment requests, and tee time reminders — mocked for now
- **TeeTime_Record**: A database record in the TeeTime table representing a booked tee time with provider reference, booking status, payment details, and settlement status
- **Payment_Request**: A record tracking an individual Group_Member's owed portion of a split booking, including amount, payment status, and deadline
- **Time_Of_Day_Filter**: A search filter with three options — Morning (before 12:00 PM), Afternoon (12:00 PM to 4:00 PM), Twilight (after 4:00 PM)
- **Mock_Course_Data**: Hardcoded Utah course and tee time data for Bonneville Golf Course, Soldier Hollow, East Bay, and Stonebridge used in place of live foreUP API responses
- **Stripe_Mock**: A mock implementation of Stripe payment intent creation and confirmation that simulates real payment flows without network calls
- **OneSignal_Mock**: A mock implementation of OneSignal push notification scheduling that logs notification payloads without delivering real pushes

## Requirements

### Requirement 1: Tee Time Search Screen

**User Story:** As a golfer, I want to search for available tee times by date, player count, and time of day, so that I can find a tee time that fits my schedule.

#### Acceptance Criteria

1. THE Search_Screen SHALL display a date picker allowing the User to select a date from today through 14 days in the future
2. THE Search_Screen SHALL display a player count selector with options for 1, 2, 3, or 4 players, defaulting to 2
3. THE Search_Screen SHALL display a Time_Of_Day_Filter with three options: Morning (tee times before 12:00 PM), Afternoon (tee times from 12:00 PM to 4:00 PM), and Twilight (tee times after 4:00 PM)
4. WHEN the User selects search criteria and initiates a search, THE App SHALL send a request to the API_Server with the selected date, player count, and time range parameters
5. WHEN the API_Server returns tee time results, THE Search_Screen SHALL display each result as a tappable card showing the course name, tee time, available spots, and price per player
6. WHEN the User taps a tee time result card, THE App SHALL navigate to the Course_Detail_Screen with the selected tee time data
7. WHILE the search request is in progress, THE Search_Screen SHALL display a loading indicator
8. IF the search returns zero results, THEN THE Search_Screen SHALL display an empty state message suggesting the User adjust the date, player count, or time filter
9. IF the search request fails, THEN THE Search_Screen SHALL display an error message with a retry option

### Requirement 2: Course Detail Screen

**User Story:** As a golfer, I want to see course details and a price breakdown before booking, so that I can make an informed decision about which tee time to book.

#### Acceptance Criteria

1. THE Course_Detail_Screen SHALL display the course name, a brief description placeholder, and the selected tee time
2. THE Course_Detail_Screen SHALL display a price breakdown showing the price per player, the number of players, and the total price
3. THE Course_Detail_Screen SHALL display a Book Now button that navigates the User to the Confirmation_Screen
4. THE Course_Detail_Screen SHALL display a back navigation control that returns the User to the Search_Screen
5. WHEN the User taps Book Now, THE App SHALL pass the selected tee time details, player count, and pricing to the Confirmation_Screen

### Requirement 3: Booking Confirmation and Organizer Payment

**User Story:** As a golfer booking a tee time, I want to review the full booking summary and pay upfront, so that my tee time is secured immediately.

#### Acceptance Criteria

1. THE Confirmation_Screen SHALL display the full booking summary including course name, date, time, player count, price per player, and total amount
2. THE Confirmation_Screen SHALL display a payment form where the Organizer enters payment details to pay the full booking amount through the Payment_Service
3. WHEN the Organizer submits payment, THE Payment_Service SHALL create a Stripe payment intent for the full booking amount and process the charge
4. WHEN the Payment_Service confirms the payment, THE Booking_Service SHALL create a TeeTime_Record with booking status BOOKED and record the payment amount and confirmation number
5. WHEN the booking is confirmed and payment succeeds, THE App SHALL navigate the Organizer to the Success_Screen
6. IF the payment fails, THEN THE Confirmation_Screen SHALL display a descriptive error message and allow the Organizer to retry payment
7. WHEN the booking involves more than one player, THE Confirmation_Screen SHALL display the per-player split amount alongside the total

### Requirement 4: Split Payment for Multi-Player Groups

**User Story:** As a golfer who booked for a group, I want the app to automatically split the cost and request payment from each player, so that I do not have to chase down money from my group.

#### Acceptance Criteria

1. WHEN a booking is confirmed for more than one player, THE Payment_Service SHALL calculate an even split of the total booking amount across all players in the group
2. WHEN the split is calculated, THE Payment_Service SHALL create a Payment_Request record for each Group_Member with the owed amount and a PENDING status
3. WHEN a Payment_Request is created, THE Notification_Service SHALL send a push notification to the Group_Member informing them that a tee time has been booked and their split portion is owed
4. WHEN a Group_Member taps the payment notification, THE App SHALL navigate to the Split_Payment_Screen showing the booking details and the amount owed
5. THE Split_Payment_Screen SHALL display the course name, tee time, total booking amount, the Group_Member's split amount, and a Pay Now button
6. WHEN a Group_Member taps Pay Now, THE Payment_Service SHALL create a Stripe payment intent for the Group_Member's split amount and process the charge
7. WHEN all Group_Members have paid their split portions, THE Payment_Service SHALL update the TeeTime_Record settlement status to SETTLED
8. IF a Group_Member has not paid within 24 hours of the booking, THEN THE App SHALL flag the unpaid Payment_Request in the Organizer's booking detail view with a visual indicator
9. WHEN a Group_Member's payment succeeds, THE Payment_Service SHALL update the corresponding Payment_Request status to PAID

### Requirement 5: Booking Success and Reminder Notification

**User Story:** As a golfer who just booked a tee time, I want to see a confirmation and receive a reminder before my round, so that I know the booking went through and do not forget about it.

#### Acceptance Criteria

1. THE Success_Screen SHALL display a success indicator, the course name, tee time, player count, total amount paid, and the confirmation number
2. WHEN the booking is confirmed, THE Notification_Service SHALL schedule a OneSignal reminder notification for the tee time using mock timing
3. THE Success_Screen SHALL display a button to return to the Search_Screen
4. THE Success_Screen SHALL display a button to view the booking in the Organizer's booking history
5. WHEN the Notification_Service schedules a reminder, THE Notification_Service SHALL log the notification payload including course name, tee time, and scheduled delivery time

### Requirement 6: Mock Course Data

**User Story:** As a product team member, I want realistic Utah course data with multiple tee times, so that the booking flow feels authentic during demos and testing.

#### Acceptance Criteria

1. THE Mock_Course_Data SHALL include tee time data for four Utah courses: Bonneville Golf Course, Soldier Hollow, East Bay, and Stonebridge
2. THE Mock_Course_Data SHALL include a minimum of five tee times per course spread across morning, afternoon, and twilight time slots
3. THE Mock_Course_Data SHALL include realistic pricing between $25 and $75 per player varying by course and time of day
4. THE Mock_Course_Data SHALL include available spot counts between 1 and 4 for each tee time
5. THE Mock_Course_Data SHALL include a brief description placeholder for each course

### Requirement 7: API Service Layer with Provider Abstraction

**User Story:** As a developer, I want the API service layer built as if foreUP is connected so that swapping mock responses for real API calls requires no UI or route changes.

#### Acceptance Criteria

1. THE Booking_Service SHALL expose functions for searching tee times and creating bookings that accept the same parameters regardless of whether the underlying provider is mocked or live
2. THE Booking_Service search function SHALL accept date, player count, and time range parameters and return an array of tee time results in a consistent schema
3. THE Booking_Service book function SHALL accept a provider reference ID, provider type, user ID, and player count and return a booking confirmation in a consistent schema
4. WHEN foreUP API access becomes available, THE Booking_Service SHALL require changes only to the provider implementation internals — the function signatures, return types, route handlers, and mobile client code SHALL remain unchanged
5. THE API_Server SHALL expose search and booking endpoints that the App consumes via the existing apiFetch helper, following the same authentication and routing patterns as existing endpoints
6. THE Booking_Service search function SHALL support a time-of-day filter parameter that maps Morning to times before 12:00, Afternoon to times from 12:00 to 16:00, and Twilight to times after 16:00

### Requirement 8: Mock Stripe Payment Flow

**User Story:** As a developer, I want the Stripe payment integration mocked with realistic UI and data flow, so that the payment experience is demo-ready and only the Stripe SDK swap is needed later.

#### Acceptance Criteria

1. THE Payment_Service SHALL expose a function to create a mock Stripe payment intent that accepts an amount and returns a payment intent ID, client secret, and status
2. THE Payment_Service SHALL expose a function to confirm a mock payment that accepts a payment intent ID and returns a success or failure status
3. THE Payment_Service SHALL expose a function to calculate split amounts given a total amount and player count, returning the per-player amount
4. THE Payment_Service SHALL track payment status for each Payment_Request with states: PENDING, PROCESSING, PAID, and FAILED
5. THE App SHALL render payment form UI elements (card input placeholder, pay button, amount display) that match the production Stripe integration layout
6. WHEN foreUP and Stripe credentials become available, THE Payment_Service SHALL require changes only to the payment intent creation and confirmation internals — the function signatures, return types, and mobile client code SHALL remain unchanged

### Requirement 9: Mock OneSignal Notification Flow

**User Story:** As a developer, I want OneSignal push notifications mocked with logged payloads, so that the notification flow is validated end-to-end and only the OneSignal SDK swap is needed later.

#### Acceptance Criteria

1. THE Notification_Service SHALL expose a function to send a booking confirmation notification that accepts a user ID, course name, tee time, and amount owed
2. THE Notification_Service SHALL expose a function to send a payment request notification that accepts a user ID, booking ID, and split amount
3. THE Notification_Service SHALL expose a function to schedule a tee time reminder notification that accepts a user ID, course name, tee time, and reminder timing
4. WHEN any notification function is called, THE Notification_Service SHALL log the full notification payload to the server console with a [ONESIGNAL_MOCK] prefix instead of making a real network call
5. WHEN OneSignal credentials become available, THE Notification_Service SHALL require changes only to the delivery internals — the function signatures and calling code SHALL remain unchanged

### Requirement 10: Navigation Integration

**User Story:** As a golfer, I want the tee time booking flow integrated into the existing app navigation, so that I can access it from the Play tab without disruption to other features.

#### Acceptance Criteria

1. THE App SHALL add the Course_Detail_Screen, Confirmation_Screen, Success_Screen, and Split_Payment_Screen to the PlayStack navigator alongside the existing TeeTimes screen
2. WHEN the User navigates to TeeTimes from the Play tab, THE App SHALL display the updated Search_Screen with date picker, player count, and time-of-day filter
3. THE App SHALL support deep linking from a payment request notification to the Split_Payment_Screen with the relevant booking and payment data
4. THE App SHALL maintain back navigation through the entire booking flow: Search_Screen → Course_Detail_Screen → Confirmation_Screen, with the ability to return to any previous step
