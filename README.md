# Sticks — Golf with Stakes

A social golf platform built on two pillars: a white-label tournament/league engine for organizations, and a social feed that drives daily player engagement.

## Quick Start for Testers

### Option 1: Expo Go (fastest, no build required)

1. Install [Expo Go](https://apps.apple.com/app/expo-go/id982107779) on your iPhone
2. Clone this repo: `git clone https://github.com/TOTL-HERO/Sticks.git`
3. Set up the mobile app:
   ```bash
   cd apps/mobile
   npm install
   ```
4. Create `apps/mobile/.env` (ask Cody for the values):
   ```
   EXPO_PUBLIC_SUPABASE_URL=https://opawcbnhyzfdavuliuqo.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=<ask Cody>
   EXPO_PUBLIC_API_URL=https://sticks-api-production.up.railway.app
   ```
5. Start the app:
   ```bash
   npx expo start --tunnel
   ```
6. Scan the QR code in your terminal with your iPhone camera
7. Sign in with email (enter your email, get a code, enter the code)

The API server is already deployed on Railway at `https://sticks-api-production.up.railway.app` — you don't need to run it locally.

**Expo Go limitations:** No Google Maps (shows placeholder with distance numbers), no background GPS when screen locked. Everything else works.

### Option 2: Development Build (full experience with maps + background GPS)

1. Install EAS CLI: `npm install -g eas-cli`
2. Log in to Expo: `eas login`
3. Build the dev client:
   ```bash
   cd apps/mobile
   eas build --profile development --platform ios
   ```
4. Install the build on your device (EAS will give you a link)
5. Start the dev server:
   ```bash
   npx expo start --dev-client --tunnel
   ```
6. Open the installed Sticks app — it connects to the dev server automatically

### Environment Setup

The API is already deployed on Railway — testers only need the mobile `.env` file.

Create `apps/mobile/.env`:
```
EXPO_PUBLIC_SUPABASE_URL=https://opawcbnhyzfdavuliuqo.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=<ask Cody for the key>
EXPO_PUBLIC_API_URL=https://sticks-api-production.up.railway.app
```

For developers working on the API locally, create `apps/api/.env`:
```
DATABASE_URL=<ask Cody for the connection string>
SUPABASE_URL=https://opawcbnhyzfdavuliuqo.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<ask Cody for the key>
GOLF_COURSE_API_KEY=<ask Cody for the key>
PORT=3000
```

To run the API locally (optional — only needed if you're making API changes):
```bash
cd apps/api
bun install
bun run dev
```
Then change `EXPO_PUBLIC_API_URL` in the mobile `.env` to `http://YOUR_LOCAL_IP:3000`.

## What's Built (M1 Foundation + Scoring Overhaul)

### Auth & Onboarding
- Email OTP, Phone OTP, Google OAuth sign-in
- 5-step onboarding: profile, handicap (GHIN or manual), home course (30K+ real courses), play style, player discovery
- Apple Sign In ready (needs dev build)

### GPS Scoring with Shot Tracking
- Start a round from the Play tab — search and select a course
- Par-defaulted stepper (defaults to par, not zero) — one-thumb scoring
- Color-coded scorecard: gold (eagle), green (birdie), white (par), red (bogey)
- Auto-advance to next hole after confirming score
- Tap any hole row to correct a previous score (2 taps max)
- Optional putts, fairway hit, GIR toggles below the stepper
- Confirmation sheet slides up on score confirm with shot count

### Passive Shot Tracking (runs automatically)
- GPS stillness detection: when you stop moving for 5+ seconds, the app flags it as a shot
- Shot points recorded with start/end coordinates, timestamps, accuracy
- Syncs to Supabase in the background
- Track integrity score computed on round finalization (0.0–1.0)
- This is the proof-of-play chain for bet settlement and tournament disputes

### Social Feed
- Real-time feed on the Home tab (Following / Local / Global filters)
- Round completion events with player name, course, score
- Supabase Realtime push — no pull-to-refresh needed

### Leaderboard
- Ranked by best score relative to par
- Week / Month / All Time filters
- Real-time updates when rounds are finalized
- "My Position" sticky card

### Tee Time Search
- Date picker with 7-day range
- Course cards with time, slots, price
- Read-only for now (booking comes in M2)

### Profile
- Stats grid (avg putts computed from real data)
- Round history with GPS verification badges
- Drill-down scorecard for any round

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Mobile | Expo SDK 54 / React Native |
| State | Zustand + TanStack Query |
| API | Bun + Hono (deployed on Railway) |
| ORM | Prisma |
| Database | Supabase Postgres (15 tables + ShotTrack) |
| Auth | Supabase Auth |
| Realtime | Supabase Realtime |
| Course Data | GolfCourseAPI.com (30K+ courses) |
| Monitoring | Sentry |

## API Server

Deployed at: `https://sticks-api-production.up.railway.app`

Health check: `GET /health` → `{"status":"ok"}`

Key endpoints:
- `POST /rounds` — start a round
- `PUT /rounds/:id/holes/:num` — update hole score
- `POST /rounds/:id/shots` — batch upload shot tracking points
- `POST /rounds/:id/finalize` — end round, compute integrity score
- `GET /leaderboard?period=week|month|all` — leaderboard
- `GET /feed?scope=following|local|global` — social feed
- `GET /courses/search?query=...` — search 30K+ courses
- `GET /tee-times?date=YYYY-MM-DD` — tee time search

## Project Structure

```
apps/
  api/                    # Bun + Hono API server
    src/
      routes/             # API route handlers
      middleware/          # Auth middleware
      lib/                # Prisma client, Supabase client
    prisma/               # Schema + migrations
  mobile/                 # Expo React Native app
    src/
      screens/            # All app screens
        auth/             # Landing, SignUp, SignIn
        onboarding/       # 5-step wizard
        scoring/          # ScoringScreen + components
      components/         # Reusable UI (Card, Button, TopAppBar)
      hooks/              # useAuth
      stores/             # Zustand stores (roundStore, appStore)
      services/           # backgroundLocation, syncQueue, courseDataProvider
      utils/              # getScoreColor
      navigation/         # React Navigation setup
      lib/                # Supabase client, API helper
```

## Milestone Roadmap
- **M1** ✅ Foundation + Scoring Overhaul
- **M2** ✅ GPS Map Integration, Offline Sync Hardening, Tee Time Booking
- **M3** ✅ Tournament Engine + White Label Orgs
- **M4** Social Feed + Crews
- **M5** Bets + Game Formats
- **M6** Memberships + Polish
