# Implementation Plan: Sticks M3 — Tournament Engine

## Overview

M3 delivers the tournament engine — the primary technical deliverable of the Sticks platform. Implementation proceeds in layers: schema extensions first, then API services (RBAC, bracket/pairing engine, tournament CRUD, commissioner endpoints, season/export services), then mobile screens (commissioner dashboard, tournament detail, live leaderboard, spectator web page), then integration and wiring.

All code is TypeScript. API uses Bun + Hono + Prisma. Mobile uses Expo SDK 54 / React Native.

## Tasks

- [-] 1. Prisma schema extensions and migration
  - [ ] 1.1 Add new enums to Prisma schema
    - Add `CHAPMAN` to existing `ScoringMode` enum
    - Add new enums: `HostingType` (STICKS_HOSTED, SELF_HOSTED), `BracketType` (SINGLE_ELIMINATION, DOUBLE_ELIMINATION, ROUND_ROBIN), `OrgRole` (COMMISSIONER, COACH, ADMIN, PLAYER), `DisputeStatus` (OPEN, RESOLVED, DISMISSED), `MatchResult` (WIN, LOSS, HALVED, BYE), `EliminationStatus` (ACTIVE, ELIMINATED, WITHDRAWN)
    - Add `TOURNAMENT_ANNOUNCEMENT` and `SCORE_DISPUTE_RESOLVED` to `FeedEventType` enum
    - _Requirements: 11.1, 11.2, 11.5, 11.9_

  - [ ] 1.2 Extend existing Tournament model with M3 columns
    - Add columns: `hostingType` (HostingType, default STICKS_HOSTED), `bracketType` (BracketType?), `handicapAllowance` (Float, default 100), `teeAssignment` (Json?), `multiRoundConfig` (Json?), `leaderboardFrozen` (Boolean, default false), `currentRound` (Int, default 1)
    - Add relations: `pairings Pairing[]`, `bracketMatches BracketMatch[]`, `scoreAuditLogs ScoreAuditLog[]`, `scoreDisputes ScoreDispute[]`
    - _Requirements: 11.1, 11.11_

  - [ ] 1.3 Extend existing TournamentEntry model with M3 columns
    - Add columns: `seedPosition` (Int?), `netScore` (Int?), `pointsEarned` (Float?), `matchResult` (MatchResult?), `eliminationStatus` (EliminationStatus, default ACTIVE), `thru` (Int, default 0), `scoreRelToPar` (Int, default 0)
    - Add relations: `pairingSlots PairingSlot[]`, `bracketAsPlayer1 BracketMatch[]`, `bracketAsPlayer2 BracketMatch[]`, `bracketAsWinner BracketMatch[]`, `scoreAuditLogs ScoreAuditLog[]`, `scoreDisputes ScoreDispute[]`
    - _Requirements: 11.2, 11.11_

  - [ ] 1.4 Create new Pairing and PairingSlot models
    - `Pairing`: id, tournamentId, roundNumber, groupNumber, createdAt; unique constraint on (tournamentId, roundNumber, groupNumber)
    - `PairingSlot`: id, pairingId, entryId, slotOrder; unique constraint on (pairingId, entryId)
    - _Requirements: 11.3_

  - [ ] 1.5 Create new BracketMatch model
    - Fields: id, tournamentId, roundNumber, matchNumber, entry1Id?, entry2Id?, winnerId?, isBye (default false), matchScore?, bracketSide?, createdAt, updatedAt
    - Unique constraint on (tournamentId, roundNumber, matchNumber)
    - Relations to TournamentEntry via "player1", "player2", "winner" relation names
    - _Requirements: 11.4_

  - [ ] 1.6 Create new OrgMembership model
    - Fields: id, organizationId, userId, role (OrgRole, default PLAYER), createdAt, updatedAt
    - Unique constraint on (organizationId, userId)
    - Add `memberships OrgMembership[]` relation to Organization model
    - Add `orgMemberships OrgMembership[]` relation to User model
    - _Requirements: 11.5_

  - [ ] 1.7 Create new ScoreAuditLog model
    - Fields: id, tournamentId, entryId, holeNumber, originalValue, newValue, editedById, createdAt
    - Indexes on tournamentId and entryId
    - Add `scoreEdits ScoreAuditLog[] @relation("scoreEdits")` to User model
    - _Requirements: 11.8_

  - [ ] 1.8 Create new ScoreDispute model
    - Fields: id, tournamentId, entryId, holeNumber, claimedScore, recordedScore, evidenceUrl?, status (DisputeStatus, default OPEN), resolvedById?, resolutionNotes?, createdAt, updatedAt
    - Indexes on tournamentId and entryId
    - Add `disputeResolutions ScoreDispute[] @relation("disputeResolutions")` to User model
    - _Requirements: 11.9_

  - [ ] 1.9 Extend Season model with M3 columns
    - Add columns: `finalized` (Boolean, default false), `standingsCache` (Json?)
    - _Requirements: 11.7, 11.11_

  - [ ] 1.10 Run Prisma migration and verify generated client
    - Run `npx prisma migrate dev --name m3_tournament_engine` from `apps/api`
    - Verify all new models and extended fields appear in generated Prisma client
    - Verify existing M1/M2 data and relationships are preserved without breaking changes
    - _Requirements: 11.10, 11.11_

- [x] 2. Checkpoint — Schema migration
  - Ensure Prisma migration runs cleanly, generated client compiles, and no existing model relations are broken. Ask the user if questions arise.


- [x] 3. RBAC middleware and OrgMembership API
  - [x] 3.1 Implement orgRoleMiddleware
    - Create `apps/api/src/middleware/orgRole.ts`
    - Middleware resolves `organizationId` from route params, query, or request body
    - Looks up `OrgMembership` for the authenticated user and the resolved org
    - Accepts a `requiredRoles: OrgRole[]` parameter; returns 403 if user's role is not in the list
    - Attaches `orgRole` to Hono context via `c.set('orgRole', membership.role)`
    - _Requirements: 9.1, 9.7_

  - [ ]* 3.2 Write unit tests for orgRoleMiddleware
    - Test that COMMISSIONER and ADMIN pass for management endpoints
    - Test that COACH passes for read-only endpoints but fails for write endpoints
    - Test that PLAYER is rejected from management endpoints
    - Test that missing membership returns 403
    - _Requirements: 9.7_

  - [x] 3.3 Implement OrgMembership CRUD endpoints
    - `POST /organizations/:id/members` — Commissioner invites a user with a role (creates OrgMembership record)
    - `PUT /organizations/:id/members/:memberId` — Commissioner updates a member's role
    - `GET /organizations/:id/roster` — List all members (COMMISSIONER, ADMIN, COACH access)
    - Apply `orgRoleMiddleware` with appropriate required roles to each endpoint
    - _Requirements: 9.5, 9.6, 2.7_

- [x] 4. Tournament CRUD API
  - [x] 4.1 Create tournament routes file and implement Create Tournament endpoint
    - Create `apps/api/src/routes/tournaments.ts`
    - `POST /tournaments` — accepts `CreateTournamentBody` (name, format, handicapMode, handicapAllowance, startDate, endDate, prizePool, hostingType, bracketType, flightConfig, multiRoundConfig, teeAssignment, seasonId, organizationId)
    - Creates Tournament record with status DRAFT and all config fields persisted
    - Protected by `orgRoleMiddleware(['COMMISSIONER', 'ADMIN'])`
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.11_

  - [x] 4.2 Implement Get/List/Update Tournament endpoints
    - `GET /tournaments/:id` — return tournament detail with org branding
    - `GET /tournaments?organizationId=X&status=Y` — list tournaments filtered by org and status
    - `PUT /tournaments/:id` — update tournament; enforce status restrictions (DRAFT/REGISTRATION_OPEN: all fields editable; IN_PROGRESS: only name, prizePool, endDate editable with warning)
    - _Requirements: 1.9, 1.10_

  - [x] 4.3 Implement Tournament status transition endpoint
    - `POST /tournaments/:id/status` — transitions tournament status (DRAFT → REGISTRATION_OPEN → IN_PROGRESS → COMPLETED, or any → CANCELLED)
    - Validate legal transitions per the lifecycle state machine in the design
    - Protected by `orgRoleMiddleware(['COMMISSIONER', 'ADMIN'])`
    - _Requirements: 1.8, 4.4_

  - [ ]* 4.4 Write unit tests for Tournament CRUD
    - Test creation with all format types (STROKE_PLAY, MATCH_PLAY, STABLEFORD, SCRAMBLE, BEST_BALL, CHAPMAN)
    - Test status transition validation (legal and illegal transitions)
    - Test edit restrictions when tournament is IN_PROGRESS
    - _Requirements: 1.1, 1.2, 1.8, 1.9, 1.10_

- [x] 5. Player registration and roster API
  - [x] 5.1 Implement player registration endpoints
    - `POST /tournaments/:id/register` — player self-registration; creates TournamentEntry with paymentStatus PENDING; auto-assigns flight based on GHIN index and flightConfig ranges
    - `DELETE /tournaments/:id/register` — player withdrawal
    - Enforce unique constraint (tournamentId, userId) — reject duplicate registration
    - Only allowed when tournament status is REGISTRATION_OPEN
    - _Requirements: 2.1, 2.2, 2.5, 2.8_

  - [x] 5.2 Implement commissioner registration management endpoints
    - `POST /tournaments/:id/entries` — commissioner manually adds a player
    - `DELETE /tournaments/:id/entries/:entryId` — commissioner removes a player
    - `GET /tournaments/:id/entries` — list entries with name, handicap, flight, payment status
    - `PUT /tournaments/:id/entries/:entryId` — commissioner overrides flight assignment
    - Protected by `orgRoleMiddleware(['COMMISSIONER', 'ADMIN'])`
    - _Requirements: 2.3, 2.4, 2.6_

  - [ ]* 5.3 Write unit tests for registration
    - Test auto-flight assignment based on GHIN index ranges
    - Test duplicate registration rejection
    - Test registration only allowed when REGISTRATION_OPEN
    - _Requirements: 2.1, 2.2, 2.5, 2.8_

- [x] 6. Checkpoint — Core API layer
  - Ensure all tournament CRUD, registration, RBAC, and membership endpoints compile and pass tests. Ask the user if questions arise.


- [x] 7. Bracket and pairing generation engine
  - [x] 7.1 Implement stroke play pairing generator
    - Create `apps/api/src/services/pairingEngine.ts`
    - `generateStrokePlayPairings(entries: SeedEntry[], groupSize: number): PairingResult` — groups registered players into pairings of 2–4 ordered by seed (GHIN index ascending by default)
    - Support seeding methods: by GHIN index, by previous event results, or manual ordering
    - _Requirements: 3.1, 3.6_

  - [x] 7.2 Implement single-elimination bracket generator
    - `generateBracket(entries: SeedEntry[], bracketType)` for SINGLE_ELIMINATION
    - Sort entries by seed; compute next power of 2 ≥ entry count; assign byes to top seeds
    - Pair seeds using standard tournament seeding (1 vs N, 2 vs N-1, etc.)
    - Return `BracketMatchResult[]` for round 1
    - _Requirements: 3.2, 3.3, 3.4_

  - [x] 7.3 Implement double-elimination bracket generator
    - Extend `generateBracket` for DOUBLE_ELIMINATION
    - Create winners bracket and losers bracket structures with `bracketSide` field
    - Handle bye assignment for non-power-of-2 counts
    - _Requirements: 3.4_

  - [x] 7.4 Implement round-robin group generator
    - `generateRoundRobinGroups(entries: SeedEntry[], groupCount: number): PairingResult` — divides players into balanced groups
    - _Requirements: 3.5_

  - [x] 7.5 Implement re-seeding between rounds
    - `reseedFromStandings(entries, standings)` — updates seed positions based on current standings for multi-round tournaments
    - _Requirements: 3.10_

  - [ ]* 7.6 Write property tests for bracket generation
    - **Property 1: Bye count correctness** — for N entries, byes = nextPowerOf2(N) - N; top seeds receive byes
    - **Validates: Requirements 3.3**
  
  - [ ]* 7.7 Write property tests for pairing generation
    - **Property 2: Group size bounds** — all generated groups have between 2 and groupSize players
    - **Property 3: All entries assigned** — every registered entry appears in exactly one pairing group
    - **Validates: Requirements 3.1, 3.11**

  - [x] 7.8 Implement pairing/bracket API endpoints
    - `POST /tournaments/:id/pairings` — generate stroke play pairings; persist Pairing + PairingSlot records
    - `POST /tournaments/:id/bracket` — generate bracket; persist BracketMatch records
    - `PUT /tournaments/:id/pairings` — swap players between pairings (commissioner review)
    - `POST /tournaments/:id/pairings/publish` — confirm and publish the draw
    - `POST /tournaments/:id/bracket/publish` — confirm and publish the bracket
    - All endpoints return preview data for commissioner review before publish
    - Protected by `orgRoleMiddleware(['COMMISSIONER', 'ADMIN'])`
    - _Requirements: 3.8, 3.9, 3.11_

- [x] 8. Commissioner dashboard API endpoints
  - [x] 8.1 Implement announcement endpoint
    - `POST /tournaments/:id/announce` — accepts announcement text, sends push notification to all registered players via push notification service
    - Emits `FeedEvent` of type `TOURNAMENT_ANNOUNCEMENT`
    - Protected by `orgRoleMiddleware(['COMMISSIONER', 'ADMIN'])`
    - _Requirements: 4.3_

  - [x] 8.2 Implement results finalization endpoint
    - `POST /tournaments/:id/finalize` — locks all scores, computes final standings (rank by scoreRelToPar), updates tournament status to COMPLETED
    - Emits `FeedEvent` of type `TOURNAMENT_RESULT` with tournament name, top finishers, and final standings
    - If tournament is associated with a season, triggers season standings recomputation
    - Protected by `orgRoleMiddleware(['COMMISSIONER', 'ADMIN'])`
    - _Requirements: 4.4, 4.5_

  - [x] 8.3 Implement score dispute endpoints
    - `POST /tournaments/:id/disputes` — player submits dispute (holeNumber, claimedScore, recordedScore, evidenceUrl); creates ScoreDispute record with status OPEN
    - `GET /tournaments/:id/disputes` — list disputes for a tournament (commissioner view)
    - `PUT /tournaments/:id/disputes/:disputeId` — commissioner resolves dispute (updates status, resolution notes, resolvedById); notifies player
    - _Requirements: 4.6, 4.7_

  - [x] 8.4 Implement manual score edit endpoint with audit logging
    - `PUT /tournaments/:id/entries/:entryId/scores` — commissioner edits hole-by-hole scores
    - Creates `ScoreAuditLog` record with commissioner identity, timestamp, original value, new value
    - Updates the player's TournamentEntry running totals (score, scoreRelToPar, netScore)
    - Protected by `orgRoleMiddleware(['COMMISSIONER', 'ADMIN'])`
    - _Requirements: 4.8, 4.9_

  - [x] 8.5 Implement tournament leaderboard data endpoint
    - `GET /tournaments/:id/leaderboard` — returns ranked entries with: rank, playerName, avatar, scoreRelToPar, grossScore, netScore, thru, movement indicator, flight
    - Support query params: `flight` filter, `scoring` (net/gross) toggle
    - For MATCH_PLAY: include bracket progression, match status, hole-by-hole match results
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.10_

  - [x] 8.6 Implement leaderboard freeze/unfreeze endpoints
    - `POST /tournaments/:id/leaderboard/freeze` — sets `leaderboardFrozen = true` on Tournament
    - `POST /tournaments/:id/leaderboard/unfreeze` — sets `leaderboardFrozen = false`; reconciles all score changes that occurred during freeze
    - Protected by `orgRoleMiddleware(['COMMISSIONER', 'ADMIN'])`
    - _Requirements: 5.7, 5.8_

- [x] 9. Checkpoint — Bracket engine and commissioner API
  - Ensure pairing/bracket generation, commissioner endpoints, disputes, score edits, and leaderboard data all compile and pass tests. Ask the user if questions arise.


- [x] 10. Season management API and standings service
  - [x] 10.1 Implement season standings computation service
    - Create `apps/api/src/services/seasonService.ts`
    - `computeSeasonStandings(tournaments, pointsSystem, dropWorstRounds): StandingsEntry[]` — maps finishing positions to points, applies drop-worst-round rule, ranks by total points descending
    - Cache computed standings as JSON on `Season.standingsCache`
    - _Requirements: 8.4, 8.5, 8.6_

  - [x] 10.2 Implement season CRUD endpoints
    - `POST /seasons` — create season (name, startDate, endDate, organizationId, pointsSystem config, dropWorstRounds)
    - `GET /seasons/:id` — get season detail with tournament schedule
    - `PUT /seasons/:id` — update season config
    - `GET /seasons/:id/standings` — return cached standings (or compute on-demand if cache is stale)
    - `POST /seasons/:id/finalize` — lock standings, set `finalized = true`
    - Protected by `orgRoleMiddleware(['COMMISSIONER', 'ADMIN'])` for write operations
    - _Requirements: 8.1, 8.2, 8.3, 8.5, 8.7, 8.9, 8.10_

  - [x] 10.3 Implement season roster management endpoints
    - `POST /seasons/:id/roster` — add player to season roster
    - `DELETE /seasons/:id/roster/:userId` — remove player from season roster
    - Protected by `orgRoleMiddleware(['COMMISSIONER', 'ADMIN'])`
    - _Requirements: 8.8_

  - [ ]* 10.4 Write unit tests for season standings computation
    - Test points assignment from position mapping
    - Test drop-worst-round exclusion logic
    - Test ranking with tied points
    - _Requirements: 8.4, 8.5, 8.6_

- [x] 11. Scoring export service
  - [x] 11.1 Implement CSV export
    - Create `apps/api/src/services/exportService.ts`
    - `generateCSV(tournament, fieldMapping): string` — generates CSV with configurable columns (player name, handicap, flight, gross score, net score, hole 1–18, final rank)
    - Support configurable field mapping so commissioner can select columns and define header names
    - _Requirements: 10.1, 10.2, 10.4_

  - [x] 11.2 Implement PDF export
    - `generatePDF(tournament, orgConfig): Promise<Buffer>` — generates branded scorecard PDF using `@react-pdf/renderer`
    - Header: org logo + name, tournament name, date range
    - Table: rank, player name, handicap, flight, gross, net, hole-by-hole scores
    - Support state association export template for high school programs
    - _Requirements: 10.1, 10.3, 10.5, 10.6_

  - [x] 11.3 Implement export API endpoints
    - `GET /tournaments/:id/export/csv` — generate CSV, upload to Supabase Storage `exports` bucket, return signed download URL (24-hour expiry)
    - `GET /tournaments/:id/export/pdf` — generate PDF, upload to Supabase Storage, return signed download URL (24-hour expiry)
    - Only available for finalized tournaments
    - Protected by `orgRoleMiddleware(['COMMISSIONER', 'ADMIN'])`
    - _Requirements: 10.7, 10.8_

- [x] 12. White label branding API
  - [x] 12.1 Implement logo upload endpoint
    - `POST /organizations/:id/logo` — accepts multipart file upload
    - Validate: PNG or JPEG format, file size < 2 MB
    - Upload to Supabase Storage bucket `org-logos`
    - Update `Organization.logoUrl` with the storage URL
    - Protected by `orgRoleMiddleware(['COMMISSIONER'])`
    - _Requirements: 7.1, 7.4, 7.6_

  - [x] 12.2 Implement branding update endpoint
    - `PUT /organizations/:id/branding` — accepts `{ primary: string, secondary: string, accent: string }` color hex values
    - Updates `Organization.colorScheme` JSON field
    - Protected by `orgRoleMiddleware(['COMMISSIONER'])`
    - _Requirements: 7.1, 7.4_

- [x] 13. Live leaderboard Supabase Realtime integration
  - [x] 13.1 Implement real-time score broadcast on hole submission
    - Extend the existing `PUT /rounds/:id/holes/:num` endpoint in `apps/api/src/routes/rounds.ts`
    - After upserting the Hole record, update the player's TournamentEntry (running score, scoreRelToPar, thru)
    - Broadcast updated leaderboard position to Supabase Realtime channel `tournament:{tournamentId}` with event `leaderboard_update`
    - Respect `leaderboardFrozen` flag — if frozen, still update DB but do not broadcast
    - _Requirements: 5.1, 5.9, 5.7_

  - [ ]* 13.2 Write integration tests for real-time broadcast
    - Test that score submission triggers broadcast on the correct tournament channel
    - Test that frozen leaderboard suppresses broadcast
    - Test that unfreeze reconciles pending updates
    - _Requirements: 5.7, 5.8, 5.9_

- [x] 14. Spectator leaderboard web page
  - [x] 14.1 Implement spectator leaderboard route
    - Create `apps/api/src/routes/spectator.ts`
    - `GET /leaderboard/:tournamentId` — public endpoint, no auth required (exclude from auth middleware)
    - Server-renders a self-contained HTML page with inline CSS and Supabase Realtime JS client from CDN
    - Fetches tournament data, entries, and org branding; renders initial leaderboard table
    - Applies org branding colors as CSS custom properties (fallback to Sticks defaults: `#84d7af`, `#006747`, `#e9c349`)
    - Displays org logo in header, tournament name, round number, date range
    - Includes Supabase Realtime subscription to `tournament:{id}` channel for live updates without page refresh
    - Shows "Leaderboard paused" indicator when `leaderboardFrozen = true`
    - Returns "Leaderboard not available" page for DRAFT status or non-existent tournaments
    - Responsive layout: mobile-first, works on phones, tablets, and desktop
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8, 6.9_

- [x] 15. Checkpoint — All API services complete
  - Ensure season management, export, branding, real-time broadcast, and spectator page all compile and pass tests. Ask the user if questions arise.


- [x] 16. Register API routes in Hono server
  - [x] 16.1 Wire all new route files into the Hono app
    - Import and mount `tournaments.ts`, `spectator.ts` routes in `apps/api/src/index.ts`
    - Ensure spectator route (`/leaderboard/:tournamentId`) is mounted BEFORE the auth middleware so it remains public
    - Ensure all other tournament/season/org routes are mounted AFTER auth middleware
    - Add season routes and org membership/branding routes
    - _Requirements: 1.8, 6.1, 9.7_

- [-] 17. Commissioner dashboard mobile screens
  - [ ] 17.1 Create CommissionerHomeScreen
    - Create `apps/mobile/src/screens/commissioner/CommissionerHomeScreen.tsx`
    - Display list of commissioner's tournaments grouped by status (DRAFT, REGISTRATION_OPEN, IN_PROGRESS, COMPLETED)
    - "Create Tournament" button navigates to TournamentConfigScreen
    - Fetch tournaments via `GET /tournaments?organizationId=X`
    - _Requirements: 4.1_

  - [ ] 17.2 Create TournamentConfigScreen
    - Create `apps/mobile/src/screens/commissioner/TournamentConfigScreen.tsx`
    - Tournament creation/edit form: name, format picker (6 formats), handicap mode (gross/net/both), handicap allowance percentage input, start/end dates, prize pool, hosting type
    - Conditional fields: bracket type selector when MATCH_PLAY selected; flight config editor (add/remove flights with handicap ranges); multi-round config (number of rounds, cut rule, carry-forward toggle); tee assignment per flight or player
    - Season association picker
    - Enforce edit restrictions for IN_PROGRESS tournaments (lock format, flights; allow name, prize pool, end date)
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.9, 1.10, 1.11_

  - [ ] 17.3 Create RegistrationListScreen
    - Create `apps/mobile/src/screens/commissioner/RegistrationListScreen.tsx`
    - Display registered players with name, handicap, flight assignment, payment status
    - Commissioner controls: add player, remove player, override flight assignment
    - Fetch via `GET /tournaments/:id/entries`
    - _Requirements: 2.3, 2.4, 2.6, 4.2_

  - [ ] 17.4 Create PairingPreviewScreen
    - Create `apps/mobile/src/screens/commissioner/PairingPreviewScreen.tsx`
    - Display generated pairings or bracket for commissioner review
    - Seeding method selector: by GHIN index, by previous results, manual ordering
    - Drag-and-drop interface for manual seed ordering and player swaps between pairings/bracket positions
    - "Generate" button calls pairing/bracket API; "Publish" button confirms the draw
    - _Requirements: 3.6, 3.7, 3.8, 3.9, 4.2_

  - [ ] 17.5 Create AnnouncementScreen
    - Create `apps/mobile/src/screens/commissioner/AnnouncementScreen.tsx`
    - Text input for announcement message
    - "Send" button calls `POST /tournaments/:id/announce`
    - _Requirements: 4.3_

  - [ ] 17.6 Create ResultsScreen
    - Create `apps/mobile/src/screens/commissioner/ResultsScreen.tsx`
    - Display final standings for a completed tournament
    - "Finalize Results" button calls `POST /tournaments/:id/finalize`
    - Export buttons for CSV and PDF; trigger native share sheet with download URL
    - _Requirements: 4.4, 4.5, 10.1, 10.8_

  - [ ] 17.7 Create DisputeListScreen and dispute resolution UI
    - Create `apps/mobile/src/screens/commissioner/DisputeListScreen.tsx`
    - List score disputes with player name, hole number, claimed score, recorded score, evidence
    - Resolution controls: accept claimed score, dismiss dispute, add resolution notes
    - _Requirements: 4.6, 4.7_

  - [ ] 17.8 Create ScoreEditScreen with audit trail display
    - Create `apps/mobile/src/screens/commissioner/ScoreEditScreen.tsx`
    - Hole-by-hole score editor for any player in a tournament round
    - Display audit log of previous edits (editor name, timestamp, old/new values)
    - _Requirements: 4.8, 4.9_

  - [ ] 17.9 Create ScoringProgressScreen
    - Create `apps/mobile/src/screens/commissioner/ScoringProgressScreen.tsx`
    - Real-time view of scoring progress during active round
    - Show which players have submitted scores for each hole (grid: players × holes)
    - Subscribe to Supabase Realtime channel `tournament:{id}` for live updates
    - _Requirements: 4.10_

- [ ] 18. Checkpoint — Commissioner dashboard screens
  - Ensure all commissioner screens render, navigate correctly, and connect to API endpoints. Ask the user if questions arise.


- [ ] 19. Tournament detail and registration mobile screens
  - [ ] 19.1 Create TournamentDetailScreen
    - Create `apps/mobile/src/screens/tournament/TournamentDetailScreen.tsx`
    - Display tournament info: name, format, dates, org branding (logo, colors), flights, prize pool
    - Apply org's `colorScheme` to screen styling (dynamic StyleSheet); fallback to Sticks defaults when no branding set
    - Registration button visible when status is REGISTRATION_OPEN and user is a PLAYER
    - Show pairings/bracket when published
    - Link to live leaderboard when IN_PROGRESS
    - _Requirements: 2.1, 7.2, 7.5_

  - [ ] 19.2 Implement player self-registration flow
    - Registration button calls `POST /tournaments/:id/register`
    - Show confirmation with auto-assigned flight
    - Handle duplicate registration error gracefully
    - _Requirements: 2.1, 2.2, 2.5_

- [ ] 20. Live tournament leaderboard mobile screen
  - [ ] 20.1 Extend LeaderboardScreen with tournament mode
    - Extend `apps/mobile/src/screens/LeaderboardScreen.tsx` (or create `TournamentLeaderboardScreen.tsx`)
    - Display ranked entries: rank, player name, avatar, scoreRelToPar, total score, thru, movement indicator (up/down/unchanged)
    - Top 3 podium treatment with gold (#e9c349), silver (#c0c0c0), bronze (#cd7f32) visual indicators
    - "My Position" sticky card that remains visible while scrolling
    - Flight filter tabs (All, A Flight, B Flight, C Flight)
    - Net/Gross toggle when handicapMode is "both"
    - "Leaderboard paused" banner when `leaderboardFrozen = true`
    - Apply org branding colors to leaderboard styling
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7_

  - [ ] 20.2 Implement Supabase Realtime subscription for live updates
    - Subscribe to `tournament:{tournamentId}` channel on mount
    - Handle `leaderboard_update` broadcast events to update local state
    - Unsubscribe on unmount
    - Ensure updates arrive within 2 seconds of score submission
    - _Requirements: 5.1, 5.8, 5.9_

  - [ ] 20.3 Implement match play bracket view
    - Display bracket progression for MATCH_PLAY tournaments
    - Show current match status (e.g., "2 UP", "AS", "3 & 2"), hole-by-hole match results
    - Support single and double elimination bracket visualization
    - _Requirements: 5.10_

- [ ] 21. Season management mobile screens
  - [ ] 21.1 Create SeasonConfigScreen
    - Create `apps/mobile/src/screens/commissioner/SeasonConfigScreen.tsx`
    - Season creation/edit form: name, start/end dates, organization, points system config (position → points mapping or predefined template), drop-worst-rounds count
    - _Requirements: 8.1, 8.2_

  - [ ] 21.2 Create SeasonStandingsScreen
    - Create `apps/mobile/src/screens/commissioner/SeasonStandingsScreen.tsx`
    - Display cumulative standings: rank, player name, total points, events played, events counted
    - Season roster management: add/remove players
    - Tournament schedule list with dates, status, and links to tournament detail
    - "Finalize Season" button for locking standings
    - _Requirements: 8.5, 8.7, 8.8, 8.9, 8.10_

- [ ] 22. Organization settings and branding mobile screens
  - [ ] 22.1 Create OrgSettingsScreen
    - Create `apps/mobile/src/screens/commissioner/OrgSettingsScreen.tsx`
    - Logo upload with image picker (validate PNG/JPEG, < 2 MB)
    - Organization name editor
    - Color scheme picker: primary, secondary, accent color inputs (hex)
    - Preview of branding applied to a sample tournament card
    - _Requirements: 7.1, 7.6_

  - [ ] 22.2 Create RoleManagementScreen
    - Create `apps/mobile/src/screens/commissioner/RoleManagementScreen.tsx`
    - List organization members with current roles
    - Invite user flow: search by name/email, assign role (COMMISSIONER, COACH, ADMIN, PLAYER)
    - Edit existing member roles
    - _Requirements: 9.5_

- [ ] 23. Coach view screens
  - [ ] 23.1 Implement coach read-only access screens
    - When user's org role is COACH, show read-only views of: roster, season standings, tournament results, individual player scoring data (hole-by-hole scores, round history, performance trends)
    - Exclude coach from tournament registration and leaderboard rankings
    - Reuse existing screens with conditional rendering based on `orgRole`
    - _Requirements: 9.2, 9.3, 9.8_

- [ ] 24. Score dispute submission from player
  - [ ] 24.1 Implement player dispute submission UI
    - Add "Dispute Score" option on the player's round detail or leaderboard entry
    - Form: hole number, claimed score, optional evidence (photo upload)
    - Calls `POST /tournaments/:id/disputes`
    - _Requirements: 4.6_

- [ ] 25. Navigation integration
  - [ ] 25.1 Add commissioner and tournament navigation routes
    - Update `apps/mobile/src/navigation/BottomTabNavigator.tsx` or create a `CommissionerStack` navigator
    - Add routes for all new commissioner screens, tournament detail, season screens, org settings
    - Conditionally show commissioner tab/section based on user's org role (COMMISSIONER or ADMIN)
    - Wire tournament detail and leaderboard screens into existing navigation
    - _Requirements: 4.1, 4.2, 9.2, 9.3, 9.4_

- [x] 26. Checkpoint — All mobile screens complete
  - Ensure all mobile screens render, navigate correctly, connect to API endpoints, and apply org branding. Ask the user if questions arise.


- [ ] 27. End-to-end integration and wiring
  - [ ] 27.1 Wire tournament finalization to season standings update
    - When `POST /tournaments/:id/finalize` is called and the tournament belongs to a season, invoke `computeSeasonStandings` and update `Season.standingsCache`
    - Ensure `pointsEarned` is written to each TournamentEntry based on finishing position and the season's points system
    - _Requirements: 8.4_

  - [ ] 27.2 Wire score submission to leaderboard broadcast end-to-end
    - Verify the full flow: player submits hole score → Hole upserted → TournamentEntry updated (score, scoreRelToPar, thru) → Supabase Realtime broadcast → in-app leaderboard updates → spectator page updates
    - Ensure frozen leaderboard suppresses broadcast but still updates DB
    - _Requirements: 5.1, 5.7, 5.8, 5.9, 6.3_

  - [ ] 27.3 Wire commissioner announcement to push notifications
    - Integrate `POST /tournaments/:id/announce` with push notification service (OneSignal or equivalent)
    - Send push to all registered players' devices
    - Emit `TOURNAMENT_ANNOUNCEMENT` FeedEvent
    - _Requirements: 4.3_

  - [ ] 27.4 Wire dispute resolution to player notification
    - When commissioner resolves a dispute, update the player's score if accepted
    - Send push notification to the disputing player with resolution outcome
    - Emit `SCORE_DISPUTE_RESOLVED` FeedEvent
    - _Requirements: 4.7_

  - [ ]* 27.5 Write integration tests for tournament lifecycle
    - Test full lifecycle: create tournament → open registration → register players → generate pairings → start tournament → submit scores → finalize results → verify standings and feed events
    - Test match play lifecycle: create → register → generate bracket with byes → advance winners → finalize
    - _Requirements: 1.8, 2.1, 3.1, 3.2, 4.4, 4.5_

- [x] 28. Final checkpoint — M3 Tournament Engine complete
  - Ensure all tests pass, all 11 requirements are covered, all API endpoints respond correctly, all mobile screens render and navigate, real-time leaderboard updates work, spectator page renders with org branding, and exports generate correctly. Ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at each layer boundary
- Schema changes (task 1) must be completed before any API work begins
- RBAC middleware (task 3) must be in place before commissioner-protected endpoints
- The bracket/pairing engine (task 7) is the most algorithmically complex piece — property tests help catch edge cases
- All mobile screens should apply org branding via dynamic StyleSheet when available
- The spectator leaderboard (task 14) is a server-rendered HTML page, not a React Native screen
