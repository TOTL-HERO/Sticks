-- ============================================================================
-- Row Level Security Policies for Sticks M1
-- Supabase uses auth.uid() to get the current user's auth ID
-- The User table has an "authId" column that maps to auth.uid()
-- ============================================================================

-- ─── Enable RLS on ALL tables ───────────────────────────────────────────────

ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Follow" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Organization" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Tournament" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "TournamentEntry" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Season" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Round" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "RoundPlayer" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Hole" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "FeedEvent" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Bet" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "BetPlayer" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Crew" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "CrewMember" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "TeeTime" ENABLE ROW LEVEL SECURITY;

-- ─── SELECT policies: authenticated users can read all tables ───────────────

CREATE POLICY "authenticated_select" ON "User"
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "authenticated_select" ON "Follow"
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "authenticated_select" ON "Organization"
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "authenticated_select" ON "Tournament"
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "authenticated_select" ON "TournamentEntry"
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "authenticated_select" ON "Season"
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "authenticated_select" ON "Round"
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "authenticated_select" ON "RoundPlayer"
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "authenticated_select" ON "Hole"
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "authenticated_select" ON "FeedEvent"
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "authenticated_select" ON "Bet"
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "authenticated_select" ON "BetPlayer"
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "authenticated_select" ON "Crew"
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "authenticated_select" ON "CrewMember"
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "authenticated_select" ON "TeeTime"
  FOR SELECT TO authenticated
  USING (true);

-- ─── User: users can UPDATE their own row ───────────────────────────────────

CREATE POLICY "users_update_own" ON "User"
  FOR UPDATE TO authenticated
  USING (auth.uid()::text = "authId")
  WITH CHECK (auth.uid()::text = "authId");

-- ─── Hole: round owner can INSERT/UPDATE ────────────────────────────────────
-- A user owns a hole if they are a player in the hole's round (via RoundPlayer)

CREATE POLICY "round_owner_insert_hole" ON "Hole"
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM "RoundPlayer" rp
      JOIN "User" u ON u."id" = rp."userId"
      WHERE rp."roundId" = "Hole"."roundId"
        AND u."authId" = auth.uid()::text
    )
  );

CREATE POLICY "round_owner_update_hole" ON "Hole"
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM "RoundPlayer" rp
      JOIN "User" u ON u."id" = rp."userId"
      WHERE rp."roundId" = "Hole"."roundId"
        AND u."authId" = auth.uid()::text
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM "RoundPlayer" rp
      JOIN "User" u ON u."id" = rp."userId"
      WHERE rp."roundId" = "Hole"."roundId"
        AND u."authId" = auth.uid()::text
    )
  );

-- ─── FeedEvent: only service_role can INSERT ────────────────────────────────

CREATE POLICY "service_role_insert_feed" ON "FeedEvent"
  FOR INSERT TO service_role
  WITH CHECK (true);

-- ─── Round: authenticated users can INSERT their own rounds ─────────────────

CREATE POLICY "authenticated_insert_round" ON "Round"
  FOR INSERT TO authenticated
  WITH CHECK (true);

-- ─── RoundPlayer: authenticated users can INSERT themselves into rounds ─────

CREATE POLICY "authenticated_insert_round_player" ON "RoundPlayer"
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM "User" u
      WHERE u."id" = "RoundPlayer"."userId"
        AND u."authId" = auth.uid()::text
    )
  );

-- ─── Service role bypass: allow service_role full access to all tables ──────
-- The API server connects with the service_role key and needs unrestricted access

CREATE POLICY "service_role_all" ON "User"
  FOR ALL TO service_role
  USING (true) WITH CHECK (true);

CREATE POLICY "service_role_all" ON "Follow"
  FOR ALL TO service_role
  USING (true) WITH CHECK (true);

CREATE POLICY "service_role_all" ON "Organization"
  FOR ALL TO service_role
  USING (true) WITH CHECK (true);

CREATE POLICY "service_role_all" ON "Tournament"
  FOR ALL TO service_role
  USING (true) WITH CHECK (true);

CREATE POLICY "service_role_all" ON "TournamentEntry"
  FOR ALL TO service_role
  USING (true) WITH CHECK (true);

CREATE POLICY "service_role_all" ON "Season"
  FOR ALL TO service_role
  USING (true) WITH CHECK (true);

CREATE POLICY "service_role_all" ON "Round"
  FOR ALL TO service_role
  USING (true) WITH CHECK (true);

CREATE POLICY "service_role_all" ON "RoundPlayer"
  FOR ALL TO service_role
  USING (true) WITH CHECK (true);

CREATE POLICY "service_role_all" ON "Hole"
  FOR ALL TO service_role
  USING (true) WITH CHECK (true);

CREATE POLICY "service_role_all" ON "Bet"
  FOR ALL TO service_role
  USING (true) WITH CHECK (true);

CREATE POLICY "service_role_all" ON "BetPlayer"
  FOR ALL TO service_role
  USING (true) WITH CHECK (true);

CREATE POLICY "service_role_all" ON "Crew"
  FOR ALL TO service_role
  USING (true) WITH CHECK (true);

CREATE POLICY "service_role_all" ON "CrewMember"
  FOR ALL TO service_role
  USING (true) WITH CHECK (true);

CREATE POLICY "service_role_all" ON "TeeTime"
  FOR ALL TO service_role
  USING (true) WITH CHECK (true);
