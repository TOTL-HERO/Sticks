# Implementation Plan: Sticks M1 Foundation

## Overview

This plan builds the Sticks M1 Foundation from the ground up: Prisma schema and API server first, then the mobile client's design system and navigation shell, followed by auth, onboarding, GPS scoring with offline-first sync, leaderboard, social feed, tee time search, and profile. Each task builds on the previous, and nothing is left unwired.

## Tasks

- [x] 1. Prisma schema and database foundation
  - [x] 1.1 Initialize Prisma project and configure Supabase Postgres connection
    - Install Prisma CLI and `@prisma/client` in the API server package
    - Create `prisma/schema.prisma` with the datasource pointing to Supabase Postgres via `DATABASE_URL` env var
    - Configure Prisma generator for the Bun runtime
    - _Requirements: 3.10_

  - [x] 1.2 Define all Prisma models and enums for the full app entity set
    - Create enums: `PlayStyle`, `MembershipTier`, `ScoringMode`, `FeedEventType`, `BetStatus`, `BookingStatus`, `TournamentStatus`
    - Create models: `User`, `Follow`, `Organization`, `Tournament`, `TournamentEntry`, `Season`, `Round`, `RoundPlayer`, `Hole`, `FeedEvent`, `Bet`, `BetPlayer`, `Crew`, `CrewMember`, `TeeTime`
    - Enforce all relationships per design: Organization 1→many Tournament/Season, Tournament 1→many TournamentEntry, Round many→many User via RoundPlayer, Round 1→many Hole, Round optionally references Tournament, FeedEvent optionally references Organization, Bet many→many User via BetPlayer, Crew many→many User via CrewMember
    - Add unique constraints: `[followerId, followingId]`, `[tournamentId, userId]`, `[roundId, userId]`, `[roundId, holeNumber]`, `[betId, userId]`, `[crewId, userId]`
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9_

  - [x] 1.3 Run initial Prisma migration against Supabase Postgres
    - Run `npx prisma migrate dev --name init` to generate and apply the migration
    - Verify all tables are created in Supabase dashboard
    - Generate Prisma client with `npx prisma generate`
    - _Requirements: 3.10_

  - [x] 1.4 Create SQL migration for Row Level Security policies
    - Write a Prisma-compatible SQL migration file that enables RLS on all tables
    - Implement policies per design: authenticated users can SELECT on User/Round/Hole/FeedEvent/TeeTime; users can UPDATE own User row; round owner can INSERT/UPDATE Hole; only service_role can INSERT FeedEvent
    - Apply migration via `npx prisma migrate dev`
    - _Requirements: 3.11_

- [x] 2. API server foundation (Bun + Hono + Prisma)
  - [x] 2.1 Scaffold the Hono API server with Bun runtime
    - Initialize a new Bun project in `apps/api` (or chosen directory)
    - Install `hono`, `@prisma/client`, `@supabase/supabase-js`
    - Create `src/index.ts` with a Hono app instance, health check route (`GET /health`), and Bun server listener
    - Export a singleton Prisma client instance from `src/lib/prisma.ts`
    - _Requirements: 11.1, 11.2_

  - [x] 2.2 Implement Supabase Auth JWT middleware
    - Create `src/middleware/auth.ts` that extracts `Authorization: Bearer <token>` header
    - Verify the JWT against Supabase Auth using `@supabase/supabase-js` or direct JWT verification with the Supabase JWT secret
    - Attach the authenticated user's `sub` (auth UID) to the Hono context (`c.set('userId', ...)`)
    - Return 401 JSON response if token is missing or invalid
    - Apply middleware to all routes except `GET /health`
    - _Requirements: 11.3_

  - [ ]* 2.3 Write unit tests for auth middleware
    - Test valid JWT passes and sets userId on context
    - Test missing Authorization header returns 401
    - Test invalid/expired JWT returns 401
    - _Requirements: 11.3_

  - [x] 2.4 Implement structured error handling and Sentry integration
    - Install `@sentry/node` (or Sentry Bun SDK)
    - Initialize Sentry in `src/index.ts` with DSN from env
    - Create a global Hono error handler that catches unhandled errors, logs to Sentry, and returns structured JSON `{ error: string, statusCode: number }`
    - _Requirements: 11.6, 11.7_

  - [x] 2.5 Configure Railway deployment
    - Create `Dockerfile` or `railway.toml` for Bun deployment
    - Define environment variables: `DATABASE_URL`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_JWT_SECRET`, `FOREUP_API_KEY`, `SENTRY_DSN`
    - Verify the server starts and health check responds on Railway
    - _Requirements: 11.5_

- [x] 3. Checkpoint — API server deploys and connects to Supabase
  - Ensure Prisma migrations are applied, API server is running on Railway, health check returns 200, and auth middleware rejects unauthenticated requests. Ask the user if questions arise.

- [x] 4. API server route implementations
  - [x] 4.1 Implement user profile endpoints
    - `GET /users/me` — fetch User by auth UID from context
    - `PUT /users/me` — update profile fields (firstName, lastName, avatarUrl, ghinIndex, homeCourseId, homeCourseName, playStyle, onboardingStep)
    - `POST /users/me/avatar` — accept multipart upload, store in Supabase Storage, update `avatarUrl` on User
    - Create User record on first `GET /users/me` if it doesn't exist (upsert by authId)
    - _Requirements: 11.4_

  - [x] 4.2 Implement round session lifecycle endpoints
    - `POST /rounds` — create Round + RoundPlayer records, return round ID
    - `PUT /rounds/:id/holes/:num` — upsert Hole record (strokes, putts, penalties, gpsTimestamp, par)
    - `POST /rounds/:id/finalize` — set `endedAt`, compute `totalScore` and `scoreRelToPar`, set `isFinalized = true`, emit FeedEvent of type `ROUND_COMPLETED`
    - `GET /rounds/me` — return current user's rounds with pagination (most recent first)
    - `GET /rounds/:id` — return round detail with all Hole records
    - _Requirements: 11.4, 5.8, 5.10, 5.11_

  - [ ]* 4.3 Write unit tests for round lifecycle endpoints
    - Test round creation returns valid round ID
    - Test hole upsert creates and updates correctly
    - Test finalize computes score and emits FeedEvent
    - Test unauthorized access returns 401
    - _Requirements: 5.10, 5.11_

  - [x] 4.4 Implement feed event endpoints
    - `GET /feed` — query FeedEvents with pagination (cursor-based), support scope filter query params: `scope=following|local|global`
    - For `following` scope: join on Follow table to filter by actors the current user follows
    - For `local` scope: filter by actors whose home course is in the same state/region as current user
    - For `global` scope: return all events
    - _Requirements: 7.9, 7.4, 7.5, 7.6, 7.7_

  - [x] 4.5 Implement leaderboard endpoint
    - `GET /leaderboard` — query best `scoreRelToPar` per user from finalized rounds, support `period=week|month|all` query param
    - Return ranked list: userId, firstName, lastName, avatarUrl, scoreRelToPar, totalScore, courseName, rank
    - _Requirements: 6.1, 6.5_

  - [x] 4.6 Implement tee time search proxy endpoint
    - `GET /tee-times` — accept `date` and optional `courseId` query params
    - Proxy the request to the foreUP API using server-side credentials
    - Transform foreUP response into the TeeTime shape: time, courseName, availableSpots, price
    - Return structured error if foreUP API fails
    - _Requirements: 8.2, 8.7_

  - [x] 4.7 Implement course search and GHIN lookup endpoints
    - `GET /courses/search` — proxy to GolfCourseAPI.com, return list of Course objects matching query + lat/lng
    - `POST /ghin/lookup` — accept GHIN number, query GHIN API, return handicap index
    - _Requirements: 5.4, 2.5_

- [x] 5. Checkpoint — All API endpoints functional
  - Ensure all API routes return correct responses. Test with curl or Postman. Ask the user if questions arise.

- [x] 6. Mobile app scaffold and design system
  - [x] 6.1 Initialize Expo SDK 53 project with TypeScript
    - Create the Expo project in `apps/mobile` (or chosen directory)
    - Install core dependencies: `tamagui`, `@tamagui/config`, `zustand`, `@tanstack/react-query`, `@supabase/supabase-js`, `react-native-maps`, `expo-location`, `expo-task-manager`
    - Configure `app.json` / `app.config.ts` with app name, bundle ID, and EAS project ID
    - _Requirements: 10.6_

  - [x] 6.2 Implement Tamagui theme configuration (Design System)
    - Create `src/theme/tamagui.config.ts` with all design tokens:
      - Colors: surface `#101511`, primary container `#006747`, primary `#84d7af`, tertiary `#e9c349`, secondary `#dfc29f`
      - Fonts: Newsreader/Playfair Display for headlines (serif, italic), Manrope for body (sans-serif)
      - Border radii, spacing scale
    - Load custom fonts via `expo-font`
    - Wrap the app root in `TamaguiProvider`
    - _Requirements: 10.1, 10.2, 10.6_

  - [x] 6.3 Create reusable UI primitives
    - Build a `Card` component with rounded corners, subtle border, surface-container background
    - Build a `Button` component (primary, secondary, ghost variants)
    - Build a `TopAppBar` component with avatar slot, wordmark, and notification icon
    - Build a topographic background pattern component for splash/landing screens
    - Use Material Symbols Outlined for all icons (install `@expo/vector-icons` or equivalent)
    - _Requirements: 10.3, 10.4, 10.5_

- [-] 7. Navigation shell
  - [x] 7.1 Implement bottom tab navigator
    - Install `@react-navigation/native` and `@react-navigation/bottom-tabs`
    - Create `BottomTabNavigator` with 5 tabs: Home, Play, Leaderboard, Bets, Profile
    - Use Material Symbols Outlined icons: `home`, `golf_course`, `leaderboard`, `payments`, `person`
    - Highlight active tab with primary color `#84d7af`
    - _Requirements: 4.1, 4.2, 4.3_

  - [x] 7.2 Wire tab screens to real screen components
    - Create screen stubs: `HomeScreen` (Social Feed), `PlayScreen` (Round start), `LeaderboardScreen`, `BetsScreen` (coming soon placeholder), `ProfileScreen`
    - Bets tab renders a "Coming in M7" placeholder with styled messaging
    - _Requirements: 4.4, 4.5_

  - [x] 7.3 Implement tab bar visibility logic
    - Hide bottom tab bar during: auth screens, onboarding flow, active GPS scoring session
    - Use React Navigation's `tabBarStyle: { display: 'none' }` or navigation state listener
    - _Requirements: 4.6_

  - [x] 7.4 Implement Home screen top app bar
    - Render `TopAppBar` on Home screen with user's avatar (from profile), "STICKS" wordmark, and notifications icon
    - _Requirements: 4.7_

- [ ] 8. Authentication flow
  - [x] 8.1 Create auth screens (Landing, Sign Up, Sign In)
    - Build `LandingScreen` with "Get Started" and "Sign In" buttons, topographic background, Sticks branding
    - Build `SignUpScreen` with Apple, Google, Phone, Email auth option buttons, terms/privacy links
    - Build `SignInScreen` with the same four auth methods
    - _Requirements: 1.1, 1.2, 1.11_

  - [x] 8.2 Implement Supabase Auth integration
    - Create `src/lib/supabase.ts` — initialize Supabase client with `@supabase/supabase-js` and AsyncStorage for session persistence
    - Create `src/hooks/useAuth.ts` — expose `signInWithApple`, `signInWithGoogle`, `signInWithPhone`, `signInWithEmail`, `signOut`, `session` state
    - Implement Apple OAuth flow using `expo-apple-authentication` + Supabase
    - Implement Google OAuth flow using `expo-auth-session` + Supabase
    - Implement Phone OTP flow via Supabase `signInWithOtp`
    - Implement Email magic link / OTP flow via Supabase
    - _Requirements: 1.3, 1.4, 1.5, 1.6_

  - [x] 8.3 Implement auth routing and session persistence
    - Create `AuthGuard` component that checks for active Supabase session on app launch
    - If no session → show Landing screen
    - If session exists + onboardingStep < 5 → navigate to Onboarding at last step
    - If session exists + onboardingStep = 5 → navigate to Home tab
    - Persist session token via Supabase's built-in AsyncStorage adapter for auto-login across restarts
    - _Requirements: 1.7, 1.8, 1.10_

  - [x] 8.4 Implement auth error handling
    - Display descriptive error messages for failed auth attempts (invalid credentials, network errors)
    - Keep user on the auth screen after failure
    - _Requirements: 1.9_

- [-] 9. Onboarding flow
  - [x] 9.1 Build OnboardingWizard with 5-step progress bar
    - Create `OnboardingWizard` component with step indicator (1–5)
    - Step navigation: next, back, skip (where applicable)
    - Track current step in Zustand store and persist to User.onboardingStep via API on each step completion
    - Resume at last incomplete step on relaunch (read onboardingStep from user profile)
    - _Requirements: 2.1, 2.12_

  - [x] 9.2 Implement Step 1 — Profile Basics
    - First name and last name as required text inputs with validation
    - Avatar upload: camera or photo library picker via `expo-image-picker`, upload to Supabase Storage via `POST /users/me/avatar`
    - _Requirements: 2.2, 2.3_

  - [x] 9.3 Implement Step 2 — Handicap Setup
    - Three options: "Link GHIN", "Enter Manually", "No handicap yet"
    - Link GHIN: input GHIN number, call `POST /ghin/lookup`, store result on User
    - Manual entry: numeric input validated between 0 and 54
    - _Requirements: 2.4, 2.5, 2.6_

  - [x] 9.4 Implement Step 3 — Home Course Selection
    - Search bar that queries `GET /courses/search` with text + device location
    - Display list of courses with name, city/state, image
    - Selected course gets a checkmark; selection saved to User record
    - _Requirements: 2.7, 2.8_

  - [x] 9.5 Implement Step 4 — Play Style Selection
    - Three selectable cards: Competitive, Casual, Social
    - Save selection to User.playStyle
    - _Requirements: 2.9_

  - [x] 9.6 Implement Step 5 — Player Discovery
    - Contacts sync option (request permission, skippable)
    - Instagram connect option (skippable)
    - X/Twitter connect option (skippable)
    - All options are skippable — user can proceed without connecting any
    - _Requirements: 2.10_

  - [x] 9.7 Finalize onboarding and navigate to Home
    - On final step completion, persist all profile data to Supabase via `PUT /users/me`
    - Set onboardingStep = 5
    - Navigate to Home tab
    - _Requirements: 2.11_

- [x] 10. Checkpoint — Auth and onboarding complete
  - Ensure sign-up, sign-in, all onboarding steps, and navigation to Home work end-to-end. Ask the user if questions arise.

- [-] 11. GPS scoring and offline-first sync
  - [x] 11.1 Implement Course Data Provider abstraction
    - Create `src/services/courseDataProvider.ts` with the `CourseDataProvider` interface: `searchCourses`, `getCourseDetails`, `getHoleLayout`, `getDistanceToPin`
    - Implement `GolfCourseApiProvider` class that calls GolfCourseAPI.com endpoints
    - Export a factory function that returns the active provider (swappable to iGolf later)
    - _Requirements: 5.4_

  - [x] 11.2 Implement local storage for offline scoring
    - Create `src/stores/roundStore.ts` (Zustand) with `LocalRoundState` and `LocalHoleState` types per design
    - Persist store to AsyncStorage (or expo-secure-store) using Zustand persist middleware
    - Implement `syncStatus` tracking: `synced`, `pending`, `offline`
    - _Requirements: 12.1, 12.5_

  - [x] 11.3 Implement offline sync queue
    - Create `src/services/syncQueue.ts` that watches network state via `@react-native-community/netinfo`
    - When online: batch-sync all pending holes to `PUT /rounds/:id/holes/:num`
    - When transitioning offline→online: trigger automatic sync of all pending data
    - On conflict: local data wins (source of truth)
    - _Requirements: 12.2, 12.3, 12.4_

  - [x] 11.4 Build Round Session start flow
    - On Play tab, show course selection (search or use home course)
    - Call `POST /rounds` to create the round on the server
    - Initialize local round state in Zustand store
    - Hide bottom tab bar when round session begins
    - _Requirements: 5.1, 4.6_

  - [x] 11.5 Build GPS map view with distance to pin
    - Render Google Maps SDK view with `react-native-maps`
    - Overlay course data from `CourseDataProvider.getHoleLayout`
    - Display distance to pin: front, center, back in yards using `getDistanceToPin` with player's current GPS coordinates
    - Request location permissions with clear explanation string
    - _Requirements: 5.2, 5.3, 5.14_

  - [x] 11.6 Build scorecard controls UI
    - Stroke counter: increment/decrement buttons for current hole
    - Putts counter: increment/decrement buttons
    - Penalty button: adds penalty strokes
    - Running score display: score relative to par (e.g., "-1", "+3") and holes completed count
    - _Requirements: 5.5, 5.6, 5.7, 5.9_

  - [x] 11.7 Implement hole advancement and round finalization
    - "Next Hole" button saves current hole data to local store + syncs to API if online
    - GPS timestamp recorded per hole
    - On final hole or manual end: call `POST /rounds/:id/finalize`
    - Server computes totals and emits `ROUND_COMPLETED` FeedEvent
    - Navigate back to Play tab, restore bottom tab bar
    - _Requirements: 5.8, 5.10, 5.11_

  - [x] 11.8 Implement background location tracking (iOS)
    - Configure `expo-task-manager` + `expo-location` for background location updates
    - Register a background task that continues GPS tracking with screen locked
    - Add `Info.plist` location usage descriptions
    - _Requirements: 5.12_

  - [x] 11.9 Implement sync status indicator UI
    - Show a small icon/badge on the scoring screen: green checkmark (synced), yellow spinner (pending), red offline indicator (offline)
    - _Requirements: 12.5, 5.13_

- [x] 12. Checkpoint — GPS scoring with offline sync works end-to-end
  - Ensure a full round can be played: start round, score holes, see distances, finish round, and data syncs. Test offline by toggling airplane mode. Ask the user if questions arise.

- [-] 13. Leaderboard screen
  - [x] 13.1 Build leaderboard UI
    - Ranked list of players: rank, avatar, name, score relative to par, total score, course name
    - Time filter toggle: Week / Month / All Time
    - Empty state when no rounds exist for selected filter
    - Fetch data from `GET /leaderboard?period=week|month|all`
    - _Requirements: 6.1, 6.2, 6.5, 6.6_

  - [x] 13.2 Implement "My Position" sticky card
    - Sticky card at bottom of leaderboard showing current user's rank, score, and position
    - Remains visible while scrolling through the full list
    - _Requirements: 6.4_

  - [x] 13.3 Implement real-time leaderboard updates
    - Subscribe to Supabase Realtime on the `Round` table (or `FeedEvent` table for `ROUND_COMPLETED` events)
    - When a new finalized round arrives, invalidate TanStack Query cache and re-fetch leaderboard
    - _Requirements: 6.3_

- [-] 14. Social feed
  - [x] 14.1 Build feed UI on Home screen
    - Reverse-chronological list of FeedEvent cards
    - Round completion card: player avatar, name, course, total score, score relative to par, timestamp
    - Tab filters: Following / Local / Global
    - Pagination via TanStack Query infinite scroll
    - _Requirements: 7.1, 7.2, 7.4_

  - [x] 14.2 Implement live match ticker
    - Horizontal scrollable section above the feed
    - Shows active (non-finalized) rounds: course name, player name, current score
    - Query active rounds from API or Supabase Realtime subscription
    - _Requirements: 7.8_

  - [x] 14.3 Implement real-time feed updates
    - Subscribe to Supabase Realtime on the `FeedEvent` table
    - Push new events to the top of the feed without pull-to-refresh
    - _Requirements: 7.3_

  - [x] 14.4 Implement feed scope filtering logic
    - Following: filter by actors the current user follows (use Follow table)
    - Local: filter by actors with home course in same region
    - Global: show all events
    - Pass scope param to `GET /feed?scope=following|local|global`
    - _Requirements: 7.5, 7.6, 7.7_

  - [x] 14.5 Verify FeedEvent emission pattern
    - Confirm round finalization emits `ROUND_COMPLETED` FeedEvent
    - Ensure the FeedEvent payload includes actor, course, score, scoreRelToPar
    - This establishes the event bus pattern for all future event types
    - _Requirements: 7.10_

- [-] 15. Tee time search (read-only)
  - [x] 15.1 Build tee time search screen
    - Horizontal scrollable date picker
    - List of tee time cards: time, course name, available slots, price
    - "Book" button on each card triggers "Coming in M2" toast/modal
    - Empty state when no tee times available
    - Error state with retry button on API failure
    - _Requirements: 8.1, 8.3, 8.4, 8.5, 8.6_

  - [x] 15.2 Wire tee time search to API proxy
    - Call `GET /tee-times?date=YYYY-MM-DD` on date selection
    - Display loading state while fetching
    - Handle error responses gracefully
    - _Requirements: 8.2, 8.7_

- [-] 16. Profile screen
  - [x] 16.1 Build profile hero section and stats grid
    - Hero: user name, home course name, handicap index
    - Stats bento grid: Fairways Hit %, GIR %, Average Putts — computed client-side from completed rounds (or via a dedicated API endpoint)
    - Empty state if no completed rounds
    - _Requirements: 9.1, 9.2, 9.5_

  - [x] 16.2 Build round history list
    - List of completed rounds: course name, date, total score, score relative to par, GPS verification badge (present if GPS timestamps exist on holes)
    - Fetch from `GET /rounds/me`
    - _Requirements: 9.3_

  - [x] 16.3 Build round detail screen
    - Full hole-by-hole scorecard view: hole number, par, strokes, putts, penalties
    - Navigate here when user taps a round in history list
    - Fetch from `GET /rounds/:id`
    - _Requirements: 9.4_

- [x] 17. Checkpoint — All screens functional and wired
  - Ensure leaderboard, social feed, tee time search, and profile screens all render real data. Verify real-time updates on leaderboard and feed. Ask the user if questions arise.

- [-] 18. Final integration and polish
  - [x] 18.1 End-to-end flow verification
    - Verify the complete user journey: sign up → onboard → start round → score holes → finish round → see round on feed → see rank on leaderboard → view profile stats → search tee times
    - Ensure FeedEvent is emitted on round finalization and appears in feed
    - Ensure leaderboard updates in real time
    - _Requirements: 1.1–1.10, 2.1–2.12, 5.1–5.14, 6.1–6.6, 7.1–7.10, 8.1–8.7, 9.1–9.5, 12.1–12.5_

  - [x] 18.2 Configure EAS Build
    - Set up `eas.json` with development, preview, and production build profiles
    - Configure iOS and Android build settings
    - Verify a development build compiles successfully
    - _Requirements: 11.5_

- [x] 19. Final checkpoint — M1 Foundation complete
  - All 12 requirements are covered. Full round lifecycle works with offline sync. Leaderboard and feed update in real time. Tee time search proxies through API. Profile shows stats and history. Ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirement acceptance criteria for traceability
- Checkpoints ensure incremental validation at natural breakpoints
- The Prisma schema seeds all tables (including Tournament, Bet, Crew) so future milestones build without restructuring
- foreUP integration may require sandbox/test credentials — coordinate with the foreUP partner contact early
- GHIN API requires a USGA developer agreement — start the approval process in parallel with development
