# Requirements Document

## Introduction

The Sticks scoring UX overhaul replaces the current scoring screen with a streamlined, one-thumb-friendly experience. The existing `ScoringScreen.tsx` uses a basic +/- counter that starts at zero, mixes secondary stats inline with the primary score input, provides no visual feedback on submission, and requires manual navigation between holes. This overhaul introduces a par-defaulted stepper, optional stat toggles, instant color-coded feedback, automatic hole advancement, quick score correction, and a clean dark-themed layout matching the Sticks design system.

## Glossary

- **Scoring_Screen**: The primary React Native screen (`ScoringScreen.tsx`) where a player records strokes for each hole during an active round
- **Stepper**: A +/− button control for adjusting a numeric value by tap, requiring no keyboard input
- **Hole_Row**: A single row in the live scorecard representing one hole, displaying hole number, par, score, and color-coded background
- **Score_Color**: A background color applied to a Hole_Row based on the relationship between strokes and par for that hole
- **Secondary_Stats_Panel**: A collapsible area below the Stepper containing optional toggles for putts, fairway hit, and green in regulation (GIR)
- **Auto_Advance**: Automatic navigation from the current hole to the next hole after score confirmation
- **Round_Store**: The Zustand store (`roundStore.ts`) that persists active round state including hole-by-hole strokes, putts, penalties, and sync status
- **GPS_Section**: The map placeholder and distance-to-pin display at the top of the Scoring_Screen
- **Design_System**: The Sticks visual language — dark theme with surface `#101511`, primary `#84d7af`, gold `#e9c349`, Newsreader headlines, Manrope body text

## Requirements

### Requirement 1: Par-Defaulted Stepper Input

**User Story:** As a player, I want the score input to default to par for each hole, so that I can record my score with minimal taps.

#### Acceptance Criteria

1. WHEN a hole is loaded for the first time in a round, THE Stepper SHALL display the par value for that hole as the initial strokes value
2. WHEN the player taps the plus button on the Stepper, THE Stepper SHALL increment the displayed strokes value by one
3. WHEN the player taps the minus button on the Stepper, THE Stepper SHALL decrement the displayed strokes value by one
4. THE Stepper SHALL prevent the strokes value from being set below one
5. THE Scoring_Screen SHALL NOT display a text input field or numeric keyboard for score entry

### Requirement 2: One-Thumb Stepper Interaction

**User Story:** As a player on the course, I want to enter my score using only taps, so that I can score with one hand while walking.

#### Acceptance Criteria

1. THE Stepper plus and minus buttons SHALL each have a minimum touch target of 48 × 48 density-independent pixels
2. THE Stepper SHALL be positioned in the vertical center of the Scoring_Screen between the GPS_Section and the live scorecard
3. THE Stepper SHALL display the current strokes value in a font size of at least 40 points using the Manrope font family
4. WHEN the player taps a Stepper button, THE Scoring_Screen SHALL update the displayed strokes value within 100 milliseconds

### Requirement 3: Optional Secondary Stats

**User Story:** As a player, I want putts, fairway hit, and GIR to be optional, so that I can skip them and just save my strokes.

#### Acceptance Criteria

1. THE Secondary_Stats_Panel SHALL render below the Stepper as a row of toggle controls for putts, fairway hit, and GIR
2. THE Secondary_Stats_Panel SHALL default to a collapsed or minimal state on each hole
3. WHEN the player confirms a score without interacting with the Secondary_Stats_Panel, THE Round_Store SHALL save the hole with only the strokes value
4. WHEN the player taps the putts toggle, THE Secondary_Stats_Panel SHALL expand a putts counter using a small +/− stepper
5. WHEN the player taps the fairway toggle, THE Secondary_Stats_Panel SHALL record a boolean fairway-hit value for the current hole
6. WHEN the player taps the GIR toggle, THE Secondary_Stats_Panel SHALL record a boolean green-in-regulation value for the current hole
7. THE Secondary_Stats_Panel SHALL NOT block or delay score submission under any condition

### Requirement 4: Instant Score Color Feedback

**User Story:** As a player, I want to see my score color-coded immediately after confirming, so that I know my tap registered and can see my round at a glance.

#### Acceptance Criteria

1. WHEN the player confirms a score for a hole, THE Hole_Row for that hole SHALL display a Score_Color background within 100 milliseconds
2. WHEN the confirmed strokes are two or more under par, THE Hole_Row SHALL display Score_Color gold (`#e9c349`)
3. WHEN the confirmed strokes are exactly one under par, THE Hole_Row SHALL display Score_Color green (`#84d7af`)
4. WHEN the confirmed strokes equal par, THE Hole_Row SHALL display Score_Color neutral (`#dfe4dd`)
5. WHEN the confirmed strokes are exactly one over par, THE Hole_Row SHALL display Score_Color light red (`#ffb4ab`)
6. WHEN the confirmed strokes are two or more over par, THE Hole_Row SHALL display Score_Color darker red (`#ff7961`)
7. THE Hole_Row Score_Color SHALL be applied as a background tint at reduced opacity so that text remains legible against the `#101511` surface

### Requirement 5: Automatic Hole Advancement

**User Story:** As a player, I want to automatically move to the next hole after confirming my score, so that I spend zero time navigating between holes.

#### Acceptance Criteria

1. WHEN the player confirms a score on a hole that is not the final hole, THE Scoring_Screen SHALL advance to the next hole within 300 milliseconds
2. WHEN the player confirms a score on the final hole (hole 18), THE Scoring_Screen SHALL present the round finalization prompt instead of advancing
3. THE Scoring_Screen SHALL support a horizontal swipe gesture to manually navigate between holes as an alternative to Auto_Advance
4. WHILE the Scoring_Screen is displaying a hole, THE Scoring_Screen SHALL allow the player to swipe left to go to the next hole or swipe right to go to the previous hole

### Requirement 6: Quick Score Correction

**User Story:** As a player, I want to fix a score on any previous hole in two taps, so that correcting a mistake is fast and painless.

#### Acceptance Criteria

1. WHEN the player taps a Hole_Row on the live scorecard, THE Scoring_Screen SHALL navigate to that hole and display the Stepper pre-filled with the previously saved strokes value
2. WHEN the player adjusts the strokes on a previously scored hole and confirms, THE Round_Store SHALL update the strokes for that hole and recalculate the running score
3. WHEN the player confirms a corrected score, THE Hole_Row Score_Color SHALL update to reflect the new strokes-to-par relationship
4. THE score correction flow SHALL require no more than two taps from the scorecard view to reach the pre-filled Stepper

### Requirement 7: Clean Scoring Layout

**User Story:** As a player, I want the scoring screen to feel clean and uncluttered, so that I can focus on my round without visual noise.

#### Acceptance Criteria

1. THE Scoring_Screen layout SHALL follow this vertical order from top to bottom: GPS_Section, live scorecard with Hole_Rows, current-hole Stepper, Secondary_Stats_Panel, confirm button
2. THE GPS_Section SHALL display distance to pin (front, center, back) at the top of the Scoring_Screen
3. THE live scorecard SHALL display all 18 Hole_Rows with a minimum row height of 40 density-independent pixels and at least 8 pixels of vertical spacing between rows
4. THE Scoring_Screen SHALL NOT display modal popups, overlays, or interstitial dialogs during normal scoring flow
5. THE Scoring_Screen SHALL use the Design_System colors: surface `#101511`, primary `#84d7af`, gold `#e9c349`, text `#dfe4dd`, muted text `#bec9c1`
6. THE Scoring_Screen SHALL use Newsreader font for headline text and Manrope font for body and numeric text

### Requirement 8: Round Store State Updates

**User Story:** As a player, I want my scores to persist locally and sync reliably, so that I never lose data on the course.

#### Acceptance Criteria

1. WHEN the player confirms a score, THE Round_Store SHALL persist the strokes value for that hole to local storage before triggering Auto_Advance
2. WHEN the Round_Store receives an updated strokes value for a hole, THE Round_Store SHALL mark that hole as unsynced and set the sync status to pending
3. WHEN the player records optional secondary stats (putts, fairway hit, GIR), THE Round_Store SHALL persist those values alongside the strokes for the same hole
4. IF the device loses network connectivity during a round, THEN THE Round_Store SHALL continue to accept and persist score entries locally without error
5. THE Round_Store SHALL initialize each hole with strokes equal to the par value for that hole instead of zero

### Requirement 9: Scorecard Color Mapping Function

**User Story:** As a developer, I want a pure function that maps strokes and par to a color, so that color logic is testable and consistent across the app.

#### Acceptance Criteria

1. THE Scoring_Screen SHALL use a pure function `getScoreColor(strokes: number, par: number): string` to determine the Score_Color for any hole
2. FOR ALL valid strokes and par combinations, calling `getScoreColor` with the same inputs SHALL return the same output (referential transparency)
3. WHEN strokes minus par is less than or equal to negative two, `getScoreColor` SHALL return `#e9c349`
4. WHEN strokes minus par equals negative one, `getScoreColor` SHALL return `#84d7af`
5. WHEN strokes minus par equals zero, `getScoreColor` SHALL return `#dfe4dd`
6. WHEN strokes minus par equals positive one, `getScoreColor` SHALL return `#ffb4ab`
7. WHEN strokes minus par is greater than or equal to positive two, `getScoreColor` SHALL return `#ff7961`

### Requirement 10: Passive Shot Detection via GPS Stillness

**User Story:** As a player, I want the app to automatically detect my shots by sensing when I stop moving, so that I get a complete shot trail without doing anything during my swing.

#### Acceptance Criteria

1. WHEN the player taps "Tee Off" to start a round, THE app SHALL immediately begin GPS polling in the background at high accuracy (best available)
2. WHEN the player is stationary (less than 2 meters of movement) for more than 5 seconds, THE app SHALL flag that coordinate as a potential shot location (Shot_Point)
3. EACH Shot_Point SHALL be written to local storage immediately upon detection, before any network sync
4. Shot_Points SHALL sync to Supabase in the background via the existing sync queue without any player interaction
5. THE player SHALL NOT see any modal, popup, or notification when a Shot_Point is detected — detection is fully invisible
6. WHEN the player's movement resumes after a Shot_Point is detected, THE app SHALL record the departure coordinate as the shot end position
7. THE GPS polling SHALL continue even when the phone screen is locked, using background location services

### Requirement 11: Shot Trail Visualization on Map

**User Story:** As a player, I want to see a faint trail of my movement and shot dots on the map, so that I have visual confirmation tracking is working without it being distracting.

#### Acceptance Criteria

1. THE map section SHALL display the player's movement path as a faint dotted line in a muted color (e.g., `#3f4943` at 40% opacity)
2. THE map section SHALL display detected Shot_Points as small solid dots in the primary color (`#84d7af`)
3. THE movement trail and shot dots SHALL update in real time as the player moves and shots are detected
4. THE visual feedback SHALL be subtle enough that it does not distract from gameplay — no animations, no labels on dots, no popups
5. IN Expo Go (where react-native-maps is unavailable), THE app SHALL show a text-based shot count indicator instead of the map trail (e.g., "3 shots detected")

### Requirement 12: Hole Confirmation Sheet

**User Story:** As a player finishing a hole, I want a quick confirmation sheet that shows my detected shots and lets me adjust in 5 seconds, so that scoring is fast and accurate.

#### Acceptance Criteria

1. WHEN the player confirms their score or advances to the next hole, THE app SHALL display a confirmation sheet that slides up from the bottom
2. THE confirmation sheet SHALL display: a mini map of the hole showing Shot_Point dots, a stepper for total strokes defaulting to the number of detected Shot_Points for that hole, a putts counter, and optional fairway hit and GIR toggles
3. IF the detected shot count differs from the player's actual strokes, THE player SHALL adjust the stepper with +/− taps
4. WHEN the player taps "Save" on the confirmation sheet, THE app SHALL persist the confirmed strokes, putts, fairway, GIR, and all Shot_Points for that hole
5. THE confirmation sheet interaction SHALL take no more than 5 seconds for a typical hole where the detected count matches actual strokes
6. AFTER saving, THE confirmation sheet SHALL dismiss and the app SHALL auto-advance to the next hole

### Requirement 13: Shot Point Correction

**User Story:** As a player, I want to drag a misplaced shot dot or add a missed one, so that my shot trail is accurate without starting over.

#### Acceptance Criteria

1. WHEN the player long-presses a Shot_Point dot on the confirmation sheet mini map, THE dot SHALL become draggable to a corrected position
2. WHEN the player taps an empty area on the confirmation sheet mini map, THE app SHALL add a new Shot_Point at that location
3. WHEN the player taps an existing Shot_Point dot, THE app SHALL offer a delete option to remove a false detection
4. ALL Shot_Point corrections SHALL update the local store immediately and sync to the server on the next sync cycle
5. THE correction interactions SHALL follow the same patterns used by 18Birdies so that golfers familiar with that app have zero learning curve

### Requirement 14: Shot Track Data Model

**User Story:** As a developer, I want a structured data model for shot-level GPS data, so that it can power strokes gained analysis, AI caddy features, and dispute resolution.

#### Acceptance Criteria

1. EACH Shot_Point SHALL contain: id, roundId, holeNumber, shotNumber (within the hole), startLatitude, startLongitude, endLatitude, endLongitude, timestamp, eventType, accuracy, altitude
2. THE eventType SHALL be an enum: `DETECTED` (auto-detected via stillness), `MANUAL` (player-added), `CORRECTED` (player-dragged), `ROUND_START`, `ROUND_END`
3. THE API server SHALL accept batch uploads of Shot_Points via `POST /rounds/:id/shots` to minimize network requests
4. THE API server SHALL store Shot_Points in a dedicated `ShotTrack` database table with indexes on roundId, holeNumber, and timestamp
5. Shot_Points SHALL be immutable after round finalization — no points can be added, modified, or deleted after the round is finalized
6. THE Round record SHALL include a `trackIntegrity` score computed from: total Shot_Points recorded, coverage across all 18 holes, and time gaps between consecutive points

### Requirement 15: Shot Track Integrity for Disputes

**User Story:** As a platform operator, I want every round to have a verifiable GPS shot trail, so that disputes during the 15-minute Stripe settlement window can be resolved with data.

#### Acceptance Criteria

1. WHEN a round is finalized, THE API server SHALL compute the `trackIntegrity` score and store it on the Round record
2. THE `trackIntegrity` score SHALL be visible on the round detail screen and on leaderboard entries as a verification badge
3. WHEN a dispute is raised, THE API server SHALL provide the full Shot_Point trail via `GET /rounds/:id/shots`
4. IF a round has fewer Shot_Points than the total confirmed strokes, THE `trackIntegrity` score SHALL reflect the gap and the round SHALL display a "partially verified" badge instead of "verified"
5. THE Shot_Point trail SHALL serve as the primary evidence source during the 15-minute dispute window before Stripe auto-settles

### Requirement 16: Background GPS Collection

**User Story:** As a player, I want GPS tracking to continue with my screen locked, so that the shot trail is complete for the entire round.

#### Acceptance Criteria

1. ON iOS, THE app SHALL use `expo-task-manager` and `expo-location` background location services to continue GPS polling and shot detection with the screen locked
2. THE background GPS collection SHALL use high accuracy mode with a distance interval of 5 meters or a time interval of 10 seconds, whichever triggers first
3. THE app SHALL display a persistent status bar indicator while background GPS tracking is active
4. WHEN the player returns to the app from the background, THE Scoring_Screen SHALL reflect all Shot_Points collected while backgrounded
5. IF background location permission is denied, THE app SHALL still function for manual scoring but SHALL display a warning that shot tracking integrity will be reduced and the round will be marked as "unverified"
