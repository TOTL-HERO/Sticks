# Sticks — Golf with Stakes

A social golf platform built on two pillars: a white-label tournament/league engine for organizations, and a social feed that drives daily player engagement.

## M1 Foundation — What's Built

### Mobile App (`apps/mobile/`)
- **Auth**: Email OTP, Phone OTP, Google OAuth, Apple (native build required)
- **Onboarding**: 5-step wizard — profile basics, handicap (GHIN or manual), home course search (30K+ courses via GolfCourseAPI), play style, player discovery
- **Navigation**: 5-tab bottom bar — Home, Play, Leaderboard, Bets, Profile
- **GPS Scoring**: Round sessions with hole-by-hole scorecard, stroke/putt/penalty counters, distance to pin, offline-first sync
- **Social Feed**: Real-time feed with Following/Local/Global filters, live match ticker
- **Leaderboard**: Ranked by best score, Week/Month/All Time filters, real-time updates via Supabase Realtime
- **Tee Time Search**: Date picker, course cards with pricing (read-only, booking in M2)
- **Profile**: Stats grid, round history with GPS verification badges, drill-down scorecard

### API Server (`apps/api/`)
- **Runtime**: Bun + Hono
- **Database**: Supabase Postgres via Prisma ORM (15 tables, 7 enums, RLS policies)
- **Auth**: Supabase Auth JWT middleware
- **Routes**: Users, Rounds, Feed, Leaderboard, Tee Times, Courses (GolfCourseAPI.com)
- **Deployed**: Railway at `https://sticks-api-production.up.railway.app`
- **Monitoring**: Sentry integration

### Tech Stack
| Layer | Technology |
|-------|-----------|
| Mobile | Expo SDK 54 / React Native |
| State | Zustand + TanStack Query |
| API | Bun + Hono |
| ORM | Prisma |
| Database | Supabase Postgres |
| Auth | Supabase Auth |
| Realtime | Supabase Realtime |
| Hosting | Railway |
| Course Data | GolfCourseAPI.com (30K+ courses) |

## Getting Started

### API Server
```bash
cd apps/api
cp .env.example .env  # fill in your Supabase credentials
bun install
bun run dev
```

### Mobile App
```bash
cd apps/mobile
cp .env.example .env  # fill in Supabase + API URL
npm install
npx expo start --tunnel
```

Scan the QR code with Expo Go on your phone.

### Database
Tables are created via Prisma migrations. Run against your Supabase instance:
```bash
cd apps/api
bunx prisma migrate deploy
```

## Environment Variables

### API (`apps/api/.env`)
- `DATABASE_URL` — Supabase Postgres connection string
- `SUPABASE_URL` — Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` — Supabase service role key
- `GOLF_COURSE_API_KEY` — GolfCourseAPI.com API key
- `PORT` — Server port (default 3000)

### Mobile (`apps/mobile/.env`)
- `EXPO_PUBLIC_SUPABASE_URL` — Supabase project URL
- `EXPO_PUBLIC_SUPABASE_ANON_KEY` — Supabase anon key
- `EXPO_PUBLIC_API_URL` — API server URL

## Milestone Roadmap
- **M1** ✅ Foundation (auth, onboarding, schema, GPS scoring, feed, leaderboard)
- **M2** GPS + Scoring enhancements, offline sync, GHIN integration
- **M3** Tournament Engine
- **M4** White Label + Orgs
- **M5** Social Feed + Crews
- **M6** Tee Times (foreUP booking)
- **M7** Bets + Game Formats
- **M8** Memberships + Polish
