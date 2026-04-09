# Implementation Plan: Scoring UX Overhaul

## Overview

This plan implements the Sticks scoring UX overhaul in bottom-up order: utility functions → data model changes → store updates → API endpoints → UI components → integration and wiring. Each task builds on the previous, ensuring no orphaned code.

## Tasks

- [x] 1. Create `getScoreColor` utility function
  - [x] 1.1 Implement `getScoreColor(strokes, par)` pure function
    - Create `apps/mobile/src/utils/getScoreColor.ts`
    - Return color string based on `strokes - par` diff: `≤ -2` → `#e9c349`, `-1` → `#84d7af`, `0` → `#dfe4dd`, `+1` → `#ffb4ab`, `≥ +2` → `#ff7961`
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7_
  - [ ]* 1.2 Write property test for score color mapping (Property 3)
    - **Property 3: Score color mapping completeness**
    - For any strokes ≥ 1 and par ≥ 1, verify the function returns the correct color for all five diff buckets and is referentially transparent
    - **Validates: Requirements 4.2, 4.3, 4.4, 4.5, 4.6, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7, 6.3**

- [x] 2. Update Prisma schema and API data models
  - [x] 2.1 Add `ShotTrack` model and `ShotEventType` enum to Prisma schema
    - Add `ShotEventType` enum (`DETECTED`, `MANUAL`, `CORRECTED`, `ROUND_START`, `ROUND_END`) to `apps/api/prisma/schema.prisma`
    - Add `ShotTrack` model with fields: `id`, `roundId`, `holeNumber`, `shotNumber`, `startLatitude`, `startLongitude`, `endLatitude?`, `endLongitude?`, `timestamp`, `eventType`, `accuracy`, `altitude?`, `createdAt`
    - Add indexes on `[roundId]`, `[roundId, holeNumber]`, `[timestamp]`
    - Add `shots ShotTrack[]` relation to `Round` model
    - _Requirements: 14.1, 14.2, 14.4_
  - [x] 2.2 Add `trackIntegrity` field to `Round` model
    - Add `trackIntegrity Float?` to the existing `Round` model
    - _Requirements: 14.6, 15.1_
  - [x] 2.3 Add `fairwayHit` and `gir` fields to `Hole` model
    - Add `fairwayHit Boolean?` and `gir Boolean?` to the existing `Hole` model
    - _Requirements: 3.5, 3.6, 8.3_

- [x] 3. Checkpoint — Verify schema changes
  - Ensure schema is valid (`npx prisma validate`), ask the user if questions arise.

- [x] 4. Add shot tracking API endpoints
  - [x] 4.1 Implement `POST /rounds/:id/shots` batch upload endpoint
    - Add to `apps/api/src/routes/rounds.ts`
    - Validate round exists and is not finalized (reject with 409 if finalized)
    - Validate each shot has valid `holeNumber` (1–18)
    - Upsert by `id` to handle retries (idempotent)
    - _Requirements: 14.3, 14.5_
  - [x] 4.2 Implement `GET /rounds/:id/shots` endpoint
    - Return all `ShotTrack` records for the round ordered by `holeNumber` then `shotNumber`
    - Used for dispute resolution during the 15-minute Stripe settlement window
    - _Requirements: 15.3_
  - [x] 4.3 Update `POST /rounds/:id/finalize` to compute `trackIntegrity`
    - Implement `computeTrackIntegrity(shots, holes, totalHoles)` function
    - Compute coverage ratio (holes with shots / 18), shot match ratio (shots / strokes), time gap penalty (5% per gap > 10 min)
    - Store result as float 0.0–1.0 on the Round record
    - Include `trackIntegrity` in the finalize response
    - Update hole upsert to accept `fairwayHit` and `gir` fields
    - _Requirements: 14.6, 15.1, 15.4_
  - [ ]* 4.4 Write property test for track integrity computation (Property 15)
    - **Property 15: Track integrity computation**
    - For any set of shot points and hole strokes, verify result is in [0.0, 1.0], fewer shots than strokes yields < 1.0, full coverage with matching counts and no gaps yields ≥ 0.8
    - **Validates: Requirements 14.6, 15.1, 15.4**

- [x] 5. Update Round Store with new interfaces and actions
  - [x] 5.1 Update `LocalHoleState` interface and `createDefaultHoles`
    - Add `fairwayHit: boolean | null`, `gir: boolean | null` to `LocalHoleState`; make `putts` nullable (`number | null`)
    - Change `createDefaultHoles` to initialize `strokes` to par value (not zero)
    - _Requirements: 1.1, 8.5, 3.3_
  - [ ]* 5.2 Write property test for par-defaulted hole initialization (Property 1)
    - **Property 1: Par-defaulted hole initialization**
    - For any course par value, verify all 18 holes have `strokes` equal to their par value
    - **Validates: Requirements 1.1, 8.5**
  - [x] 5.3 Add `ShotPoint` interface and `shotPoints` array to `ActiveRound`
    - Define `ShotPoint` interface with all fields from design (`id`, `holeNumber`, `shotNumber`, `startLatitude`, `startLongitude`, `endLatitude`, `endLongitude`, `timestamp`, `eventType`, `accuracy`, `altitude`, `synced`)
    - Add `shotPoints: ShotPoint[]` to `ActiveRound`
    - _Requirements: 14.1, 14.2_
  - [x] 5.4 Implement new store actions: `goToHole`, `addShotPoint`, `updateShotPoint`, `removeShotPoint`, `markShotsSynced`
    - `goToHole(n)`: set `currentHole` to n (1–18)
    - `addShotPoint`: append to `shotPoints` with `synced: false`
    - `updateShotPoint`: update a shot point by id (for corrections and end-position recording)
    - `removeShotPoint`: remove a shot point by id
    - `markShotsSynced`: set `synced: true` for given ids
    - _Requirements: 6.1, 10.3, 13.2, 13.3, 13.4_
  - [ ]* 5.5 Write property tests for store actions (Properties 2, 4, 5, 6, 7, 8, 11, 13)
    - **Property 2: Stepper arithmetic with floor constraint** — for any strokes and deltas, result = max(1, strokes + sum_of_deltas)
    - **Validates: Requirements 1.2, 1.3, 1.4**
    - **Property 4: Auto-advance on non-final hole** — holes 1–17 advance, hole 18 stays
    - **Validates: Requirements 5.1, 5.2, 12.6**
    - **Property 5: Score correction preserves store consistency** — goToHole + updateHole keeps running total consistent
    - **Validates: Requirements 6.1, 6.2**
    - **Property 6: Hole update marks unsynced and pending** — any updateHole sets synced=false, syncStatus=pending
    - **Validates: Requirements 8.2, 8.3**
    - **Property 7: Untouched secondary stats default to null** — putts, fairwayHit, gir remain null when not set
    - **Validates: Requirements 3.3**
    - **Property 8: Boolean stat toggles record values** — fairwayHit and gir toggle correctly
    - **Validates: Requirements 3.5, 3.6**
    - **Property 11: Shot points written to store immediately** — addShotPoint adds with synced=false
    - **Validates: Requirements 10.3, 13.4, 16.4**
    - **Property 13: Shot point add/remove round trip** — add then remove returns to original state
    - **Validates: Requirements 13.2, 13.3**
    - **Property 17: Offline scoring resilience** — updateHole succeeds when syncStatus is offline
    - **Validates: Requirements 8.4**

- [x] 6. Checkpoint — Verify store and API changes
  - Ensure all tests pass, ask the user if questions arise.

- [x] 7. Add stillness detection to background location service
  - [x] 7.1 Implement stillness detector in `backgroundLocation.ts`
    - Maintain a rolling buffer of the last 5 location samples in the background task callback
    - On each location update, check if all samples are within 2 meters of each other and span ≥ 5 seconds
    - If stillness detected and no shot already flagged at this position, call `useRoundStore.getState().addShotPoint(...)` with `DETECTED` event type
    - When subsequent movement exceeds 2 meters, update the most recent shot point's `endLatitude`/`endLongitude` via `updateShotPoint`
    - Update GPS config: `accuracy: Location.Accuracy.High`, `distanceInterval: 5`, `timeInterval: 10000`
    - _Requirements: 10.1, 10.2, 10.5, 10.6, 10.7, 16.1, 16.2_
  - [ ]* 7.2 Write property tests for stillness detection (Properties 9, 10)
    - **Property 9: Stillness detection algorithm** — coordinates within 2m for > 5s emit exactly one DETECTED shot; movement > 2m within 5s emits none
    - **Validates: Requirements 10.2**
    - **Property 10: Shot departure coordinate recording** — when movement exceeds 2m, endLatitude/endLongitude are set to the first coordinate past the threshold
    - **Validates: Requirements 10.6**

- [x] 8. Update sync queue for shot point syncing
  - [x] 8.1 Add `syncPendingShots` to `syncQueue.ts`
    - Filter `shotPoints` where `synced === false`, batch them into `POST /rounds/:id/shots`
    - On success, call `markShotsSynced` with the synced ids
    - Integrate into the existing `handleNetworkChange` flow alongside `syncPendingHoles`
    - _Requirements: 10.4, 14.3_

- [-] 9. Build `HoleRow` component
  - [x] 9.1 Implement `HoleRow` component
    - Create `apps/mobile/src/screens/scoring/HoleRow.tsx`
    - Display hole number, par, strokes, and `getScoreColor`-derived background tint at reduced opacity
    - Tappable — calls `goToHole(holeNumber)` for score correction
    - Minimum height 40dp, 8dp vertical spacing
    - Use Manrope font, Design_System colors
    - _Requirements: 4.1, 4.7, 6.1, 6.4, 7.3, 7.5, 7.6_

- [-] 10. Build `ScoreStepperCard` component
  - [x] 10.1 Implement `ScoreStepperCard` component
    - Create `apps/mobile/src/screens/scoring/ScoreStepperCard.tsx`
    - Display current hole label ("Hole N · Par N") and +/− stepper
    - Initialize strokes to par value; minimum strokes = 1
    - Plus/minus buttons with 48×48dp touch targets
    - Strokes value displayed at 40pt+ Manrope bold
    - Respond to taps within 100ms (no artificial delays)
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 2.1, 2.2, 2.3, 2.4_

- [-] 11. Build `SecondaryStatsPanel` component
  - [x] 11.1 Implement `SecondaryStatsPanel` component
    - Create `apps/mobile/src/screens/scoring/SecondaryStatsPanel.tsx`
    - Render below the stepper as a row of toggle controls for putts, fairway hit, and GIR
    - Default to collapsed/minimal state on each hole
    - Putts: small +/− stepper; Fairway Hit: boolean toggle chip; GIR: boolean toggle chip
    - Does not block or delay score submission
    - Values default to null when untouched
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7_

- [-] 12. Build `HoleConfirmationSheet` component
  - [x] 12.1 Implement `HoleConfirmationSheet` bottom sheet
    - Create `apps/mobile/src/screens/scoring/HoleConfirmationSheet.tsx`
    - Slides up from bottom on score confirm
    - Shows mini map with shot dots (or text fallback "N shots detected" in Expo Go)
    - Strokes stepper defaults to detected shot count for the current hole
    - Includes putts counter, fairway toggle, GIR toggle, Save button
    - On Save: persist all data, dismiss sheet, auto-advance to next hole
    - Support long-press to drag shot dots, tap empty area to add, tap dot to delete
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.6, 13.1, 13.2, 13.3, 13.5_
  - [ ]* 12.2 Write property test for confirmation sheet defaults (Property 12)
    - **Property 12: Confirmation sheet defaults strokes to detected shot count**
    - For any hole with N shot points of type DETECTED/MANUAL/CORRECTED, the default strokes value equals N
    - **Validates: Requirements 12.2**

- [x] 13. Checkpoint — Verify all components build
  - Ensure all tests pass, ask the user if questions arise.

- [-] 14. Rewrite `ScoringScreen` and wire everything together
  - [x] 14.1 Rewrite `ScoringScreen.tsx` with new layout and components
    - Replace existing `apps/mobile/src/screens/scoring/ScoringScreen.tsx`
    - Layout order: GPS section (with shot trail overlay or text fallback) → live scorecard (scrollable list of `HoleRow` components) → `ScoreStepperCard` → `SecondaryStatsPanel` → confirm button
    - Add horizontal swipe gesture (PanResponder or pager) for hole navigation (left = next, right = previous)
    - On confirm: show `HoleConfirmationSheet`, then auto-advance (300ms) to next hole for holes 1–17; show finalization prompt on hole 18
    - Persist strokes to local store before auto-advance
    - Display GPS permission warning banner if background location denied (round marked "unverified")
    - Use Design_System colors, Newsreader headlines, Manrope body text
    - No modal popups, overlays, or interstitial dialogs during normal scoring flow
    - _Requirements: 1.1, 2.2, 4.1, 5.1, 5.2, 5.3, 5.4, 6.1, 6.4, 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 8.1, 11.1, 11.2, 11.3, 11.4, 11.5, 16.3, 16.5_
  - [ ]* 14.2 Write property test for shot point immutability after finalization (Property 14)
    - **Property 14: Shot point immutability after finalization**
    - For any finalized round, POST /rounds/:id/shots returns an error and shot data is unchanged
    - **Validates: Requirements 14.5**
  - [ ]* 14.3 Write property test for shot point schema completeness (Property 16)
    - **Property 16: Shot point schema completeness**
    - For any shot point, all required fields are present: id, holeNumber (1–18), shotNumber (≥ 1), startLatitude, startLongitude, timestamp, eventType, accuracy
    - **Validates: Requirements 14.1, 14.2**

- [x] 15. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- The design uses TypeScript throughout — all code examples and implementations use TypeScript/React Native
