# Requirements Document

## Introduction

Sticks M1 Foundation is the first milestone of the Sticks golf app — a social golf platform built on two pillars: a white-label tournament/league engine for organizations, and a social feed that drives daily player engagement. M1 delivers the foundational layer: authentication, onboarding, the full Supabase data model, navigation shell, GPS-assisted scoring, a basic leaderboard, a basic social feed, and read-only tee time search via foreUP. The goal is a testable build that Utah-based testers can use to play rounds, compete on a leaderboard, and see activity in a social feed — establishing the core loop before tournament and betting features arrive in later milestones.

## Glossary

- **App**: The Sticks mobile application built with Expo SDK 53 / React Native 0.76.7
- **Auth_Service**: The Supabase Auth module responsible for user authentication and session management
- **Onboarding_Flow**: The multi-step profile setup sequence presented to new users after initial sign-up
- **User**: A registered player on the Sticks platform with an auth record and profile in Supabase
- **Profile**: The User's stored personal data including name, avatar, handicap, home course, and play style
- **GHIN_Index**: The official golf handicap index maintained by the USGA through the GHIN system
- **Home_Course**: The golf course a User designates as their primary course during onboarding
- **Play_Style**: A self-reported classification (Competitive, Casual, or Social) selected during onboarding
- **Supabase_Schema**: The complete Postgres database schema in Supabase covering all core entities for the full app
- **Nav_Shell**: The bottom tab navigation bar and screen routing structure of the App
- **Round_Session**: A GPS-tracked scoring session representing a single round of golf from start to finish
- **Scorecard**: The hole-by-hole record of strokes, putts, and penalties for a Round_Session
- **GPS_Layer**: The map and distance display powered by Google Maps SDK with a swappable course data provider interface
- **Course_Data_Provider**: An abstraction layer for course-specific data (hole layouts, pin positions, distances) — initially backed by GolfCourseAPI.com, designed to be swapped to iGolf without changing rendering logic
- **Leaderboard**: A ranked list of Users by score, updated in real time via Supabase Realtime
- **Social_Feed**: A chronological stream of FeedEvent records surfacing round completions, scores, and platform activity
- **FeedEvent**: A database record representing a discrete platform action (round completed, score posted, leaderboard move) emitted to the Social_Feed
- **Tee_Time_Search**: A read-only search interface for available tee times sourced from the foreUP API
- **foreUP_API**: The third-party tee sheet software API used to query tee time availability (Utah-dominant provider)
- **API_Server**: The Bun + Hono backend server hosted on Railway
- **Design_System**: The Sticks visual identity — dark theme, augusta green (#006747) primary container, #84d7af primary, #e9c349 tertiary/gold, Newsreader/Playfair Display headlines, Manrope body, Material Symbols Outlined icons, topographic background patterns

## Requirements

### Requirement 1: Authentication

**User Story:** As a new or returning golfer, I want to sign up or sign in using my preferred auth method, so that I can access the Sticks platform securely.

#### Acceptance Criteria

1. WHEN a user taps "Get Started" on the landing screen, THE App SHALL navigate to the sign-up screen displaying Apple, Google, Phone, and Email authentication options
2. WHEN a user taps "Sign In" on the landing screen, THE App SHALL navigate to the sign-in screen supporting the same four authentication methods
3. WHEN a user selects Apple authentication, THE Auth_Service SHALL complete the OAuth flow via Supabase Auth and create or retrieve the User record
4. WHEN a user selects Google authentication, THE Auth_Service SHALL complete the OAuth flow via Supabase Auth and create or retrieve the User record
5. WHEN a user selects Phone authentication, THE Auth_Service SHALL send an OTP to the provided phone number and verify the code before creating or retrieving the User record
6. WHEN a user selects Email authentication, THE Auth_Service SHALL send a magic link or OTP to the provided email address and verify it before creating or retrieving the User record
7. WHEN authentication succeeds for a new user, THE App SHALL redirect to the Onboarding_Flow step 1
8. WHEN authentication succeeds for a returning user with a completed Profile, THE App SHALL redirect to the Home tab of the Nav_Shell
9. IF authentication fails due to invalid credentials or network error, THEN THE App SHALL display a descriptive error message and remain on the authentication screen
10. THE Auth_Service SHALL persist a session token locally so that returning users remain signed in across app restarts
11. WHEN a user taps the terms or privacy links on the sign-up screen, THE App SHALL open the corresponding document in an in-app browser

### Requirement 2: Onboarding Profile Setup

**User Story:** As a new user, I want to complete my profile with my name, avatar, handicap, home course, and play style, so that my identity is established for scoring, leaderboards, and social features.

#### Acceptance Criteria

1. WHEN a new user enters the Onboarding_Flow, THE App SHALL present a 5-step sequential wizard with a progress bar indicating the current step
2. THE App SHALL collect first name and last name as required text fields in step 1 (Profile Basics)
3. THE App SHALL provide an avatar upload control in step 1 that accepts an image from the device camera or photo library
4. WHEN the user reaches step 2 (Handicap Setup), THE App SHALL offer three options: link GHIN account, enter handicap manually via numeric input, or select "No handicap yet"
5. WHEN the user selects "Link GHIN", THE App SHALL attempt to retrieve the GHIN_Index from the GHIN API and store it on the User record
6. WHEN the user enters a manual handicap, THE App SHALL validate that the value is a number between 0 and 54 before saving
7. WHEN the user reaches step 3 (Home Course Selection), THE App SHALL display a search bar and a list of nearby courses with name, location, and image
8. WHEN the user selects a course from the list, THE App SHALL mark the selected Home_Course with a visible checkmark and store the selection on the User record
9. THE App SHALL collect the Play_Style selection (Competitive, Casual, or Social) during the onboarding steps
10. WHEN the user reaches step 5 (Player Discovery), THE App SHALL offer options to sync contacts, connect Instagram, and connect X/Twitter, each with a skip option
11. WHEN the user completes the final onboarding step, THE App SHALL persist all collected Profile data to Supabase and navigate to the Home tab of the Nav_Shell
12. IF the user closes the App mid-onboarding, THEN THE App SHALL resume at the last incomplete step on next launch

### Requirement 3: Supabase Database Schema

**User Story:** As a developer, I want the full Supabase Postgres schema seeded for the entire app data model, so that all M1 features have the tables they need and future milestones can build on the same foundation without migrations that restructure core entities.

#### Acceptance Criteria

1. THE Supabase_Schema SHALL include tables for all core entities: User, Organization, Tournament, TournamentEntry, Season, Round, Hole, Bet, FeedEvent, Crew, and TeeTime
2. THE Supabase_Schema SHALL enforce the following relationships: Organization 1-to-many Tournament, Organization 1-to-many Season, Tournament 1-to-many TournamentEntry, TournamentEntry many-to-one User, Season 1-to-many Tournament, Round many-to-many User, Round 1-to-many Hole, Bet many-to-many User, FeedEvent many-to-one User, Crew many-to-many User
3. THE Supabase_Schema SHALL allow Round to optionally reference a Tournament (casual rounds have no tournament association)
4. THE Supabase_Schema SHALL allow FeedEvent to optionally reference an Organization for org-scoped feed filtering
5. THE User table SHALL include columns for auth ID, first name, last name, avatar URL, GHIN index, home course reference, play style enum, and membership tier enum
6. THE Round table SHALL include columns for course reference, start timestamp, end timestamp, scoring mode, and optional tournament reference
7. THE Hole table SHALL include columns for round reference, hole number, strokes, putts, penalties, and GPS timestamp
8. THE FeedEvent table SHALL include columns for event type enum, actor (User reference), JSON payload, optional Organization scope, and created-at timestamp
9. THE TeeTime table SHALL include columns for course name, datetime, available spots, price, booking status, and foreUP reference ID
10. THE Supabase_Schema SHALL be managed through Prisma migrations so that schema changes are version-controlled and reproducible
11. THE Supabase_Schema SHALL include Row Level Security policies on all tables to restrict data access to authenticated users

### Requirement 4: Navigation Shell

**User Story:** As a user, I want a bottom tab navigation bar with all main sections wired to real screens, so that I can move between features of the app.

#### Acceptance Criteria

1. THE Nav_Shell SHALL display a fixed bottom tab bar with five tabs: Home, Play, Leaderboard, Bets, and Profile
2. THE Nav_Shell SHALL use Material Symbols Outlined icons: home, golf_course, leaderboard, payments, and person for the respective tabs
3. WHEN a user taps a tab, THE Nav_Shell SHALL navigate to the corresponding screen and visually highlight the active tab using the primary color (#84d7af)
4. THE Nav_Shell SHALL render each tab screen as a real, functional screen (not a placeholder) for all M1-scoped features: Home (Social_Feed), Play (Round_Session start), Leaderboard, and Profile
5. THE Nav_Shell SHALL render the Bets tab as a coming-soon placeholder screen since betting is scoped to M7
6. THE Nav_Shell SHALL suppress the bottom tab bar during focus journeys: authentication screens, Onboarding_Flow, and active GPS scoring
7. THE App SHALL display a top app bar on the Home screen with the user's profile avatar, the "STICKS" wordmark, and a notifications icon

### Requirement 5: GPS Scoring — Round Session

**User Story:** As a golfer on the course, I want to start a round session that tracks my score hole by hole with GPS distance to the pin, so that I have a verified digital scorecard.

#### Acceptance Criteria

1. WHEN a user starts a new round from the Play tab, THE App SHALL create a Round_Session record in Supabase with the current timestamp and selected course
2. WHEN a Round_Session is active, THE GPS_Layer SHALL display a map view of the current hole using Google Maps SDK as the base layer
3. WHEN a Round_Session is active, THE GPS_Layer SHALL display distance to pin readouts for front, center, and back of the green in yards, sourced from the Course_Data_Provider
4. THE Course_Data_Provider SHALL be implemented behind an abstraction interface so that the data source can be swapped from GolfCourseAPI.com to iGolf without modifying the GPS_Layer rendering logic
5. WHEN a user is on a hole, THE Scorecard SHALL display stroke counter controls (increment/decrement) for recording strokes on the current hole
6. WHEN a user is on a hole, THE Scorecard SHALL display a putts counter (increment/decrement) for recording putts on the current hole
7. WHEN a user is on a hole, THE Scorecard SHALL display a penalty button for recording penalty strokes on the current hole
8. WHEN a user advances to the next hole, THE App SHALL save the current hole's strokes, putts, penalties, and a GPS timestamp to the Hole record in Supabase
9. THE App SHALL display the user's running score relative to par (e.g., "-1", "+3") and the number of holes completed during the Round_Session
10. WHEN the user completes the final hole or manually ends the round, THE App SHALL finalize the Round_Session with an end timestamp and compute the total score
11. WHEN a Round_Session is finalized, THE App SHALL emit a FeedEvent of type "round_completed" containing the User, course, total score, and score relative to par
12. WHILE a Round_Session is active on iOS, THE App SHALL maintain background location tracking using expo-task-manager and expo-location so that the session continues with the screen locked
13. IF the device loses network connectivity during a Round_Session, THEN THE App SHALL persist all scoring data locally and sync to Supabase when connectivity returns
14. THE App SHALL request location permissions with a clear explanation that GPS is used for distance-to-pin calculations during golf rounds

### Requirement 6: Basic Leaderboard

**User Story:** As a tester, I want to see a leaderboard ranking players by their scores, so that I have something to compete on during the beta.

#### Acceptance Criteria

1. THE Leaderboard SHALL display a ranked list of Users ordered by their best score relative to par from completed rounds
2. THE Leaderboard SHALL display each entry with the player's name, avatar, score relative to par, total score, course name, and rank position
3. WHEN a new Round_Session is finalized, THE Leaderboard SHALL update in real time via Supabase Realtime without requiring a manual refresh
4. THE Leaderboard SHALL highlight the current user's position with a sticky "My Position" card that remains visible while scrolling a large list
5. THE Leaderboard SHALL support a time-based filter allowing users to view rankings for the current week, current month, or all time
6. IF no completed rounds exist for the selected time filter, THEN THE Leaderboard SHALL display an empty state message encouraging the user to play a round

### Requirement 7: Basic Social Feed

**User Story:** As a user, I want to see a social feed showing round completions and scores from other players, so that I have a reason to open the app between my own rounds.

#### Acceptance Criteria

1. THE Social_Feed SHALL display FeedEvent records in reverse chronological order on the Home tab
2. THE Social_Feed SHALL render round completion events as cards showing the player's name, avatar, course name, total score, score relative to par, and timestamp
3. WHEN a new FeedEvent is created, THE Social_Feed SHALL push the event to connected clients in real time via Supabase Realtime without requiring pull-to-refresh
4. THE Social_Feed SHALL support tab filters for Following, Local, and Global scopes as shown in the design mockups
5. WHEN the Following filter is active, THE Social_Feed SHALL display only FeedEvents from Users the current user follows
6. WHEN the Local filter is active, THE Social_Feed SHALL display FeedEvents from Users whose Home_Course is in the same geographic region as the current user
7. WHEN the Global filter is active, THE Social_Feed SHALL display all FeedEvents across the platform
8. THE Social_Feed SHALL display a live match ticker as a horizontally scrollable section above the feed showing active Round_Sessions in progress with course name, player names, and current score
9. THE API_Server SHALL expose endpoints for creating, querying, and paginating FeedEvent records
10. THE FeedEvent architecture SHALL be designed as a first-class event bus where every scorable platform action (round completion, leaderboard position change) emits a FeedEvent record, establishing the pattern for all future event types in later milestones

### Requirement 8: Tee Time Search (Read-Only)

**User Story:** As a tester, I want to search for available tee times at nearby courses, so that I can see the booking feature working even though full booking is deferred to M2.

#### Acceptance Criteria

1. WHEN a user navigates to the tee time search screen, THE App SHALL display a horizontal date picker for selecting a date
2. WHEN a date is selected, THE API_Server SHALL query the foreUP_API for available tee times on that date and return the results to the App
3. THE App SHALL display available tee times as a list of cards, each showing the time, course name, available slots, and price per player
4. THE App SHALL display a "Book" button on each tee time card that is visually present but triggers a "Coming in M2" informational message when tapped
5. IF the foreUP_API returns no results for the selected date, THEN THE App SHALL display an empty state message indicating no tee times are available
6. IF the foreUP_API request fails due to network error or API error, THEN THE App SHALL display an error message and offer a retry option
7. THE API_Server SHALL proxy all foreUP_API requests so that API keys are not exposed to the mobile client

### Requirement 9: Member Profile Screen

**User Story:** As a user, I want to view my profile with my stats, handicap, home course, and round history, so that I can track my progress and share my golf identity.

#### Acceptance Criteria

1. THE Profile screen SHALL display the user's name, Home_Course name, and GHIN_Index (or manually entered handicap) in a hero section
2. THE Profile screen SHALL display a stats bento grid showing Fairways Hit %, Greens in Regulation %, and Average Putts per round, computed from the user's completed Round_Sessions
3. THE Profile screen SHALL display a round history list showing each completed round with the course name, date, total score, score relative to par, and a verification badge if GPS timestamps are present
4. WHEN the user taps a round in the history list, THE App SHALL navigate to a detailed scorecard view for that round
5. IF the user has no completed rounds, THEN THE Profile screen SHALL display an empty state encouraging the user to play a round

### Requirement 10: Design System Implementation

**User Story:** As a user, I want the app to match the premium dark-theme aesthetic from the Stitch designs, so that the experience feels polished and consistent from M1.

#### Acceptance Criteria

1. THE App SHALL use the dark theme with surface color #101511, primary container #006747, primary #84d7af, tertiary #e9c349, and secondary #dfc29f as defined in the Design_System
2. THE App SHALL use Newsreader or Playfair Display (serif, italic) for headlines and Manrope (sans-serif) for body text and labels
3. THE App SHALL use Material Symbols Outlined for all iconography
4. THE App SHALL render topographic background patterns on splash and landing screens as shown in the Stitch mockups
5. THE App SHALL apply rounded cards with subtle borders and surface-container background tones for content cards throughout the interface
6. THE Design_System SHALL be implemented as a Tamagui theme configuration so that all tokens (colors, fonts, radii, spacing) are centralized and reusable across all screens

### Requirement 11: API Server Foundation

**User Story:** As a developer, I want a Bun + Hono API server deployed on Railway with Prisma ORM connected to Supabase Postgres, so that the mobile app has a backend to call for all data operations.

#### Acceptance Criteria

1. THE API_Server SHALL be built with Bun runtime and Hono framework
2. THE API_Server SHALL use Prisma ORM for all database operations against Supabase Postgres
3. THE API_Server SHALL validate all incoming requests with authentication by verifying Supabase Auth JWT tokens
4. THE API_Server SHALL expose RESTful endpoints for: user profile CRUD, round session lifecycle (create, update holes, finalize), feed event queries with pagination, leaderboard queries with time filters, and tee time search proxying to foreUP
5. THE API_Server SHALL be deployed to Railway with environment-based configuration for database URL, Supabase keys, and foreUP API credentials
6. IF an API request fails due to an unhandled error, THEN THE API_Server SHALL return a structured JSON error response with an appropriate HTTP status code and log the error to Sentry
7. THE API_Server SHALL integrate Sentry for error monitoring from the initial deployment

### Requirement 12: Offline-First Scoring

**User Story:** As a golfer playing in an area with poor cell coverage, I want my scoring data to persist locally and sync when I regain connectivity, so that I never lose a round's data.

#### Acceptance Criteria

1. WHEN a Round_Session is active, THE App SHALL write all hole scoring data (strokes, putts, penalties, GPS timestamps) to local device storage immediately upon entry
2. WHILE the device has network connectivity, THE App SHALL sync locally stored scoring data to Supabase in near real time
3. WHEN the device transitions from offline to online, THE App SHALL automatically sync all pending local scoring data to Supabase without user intervention
4. IF a sync conflict occurs (local data differs from server data for the same hole), THEN THE App SHALL treat the local data as the source of truth since the player on the course has the authoritative score
5. THE App SHALL display a visual indicator (e.g., a sync status icon) showing whether scoring data is synced, pending sync, or offline
