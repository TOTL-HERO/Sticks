-- M3 Tournament Engine Schema Extensions
-- Extends existing M1/M2 models, adds new enums and models for tournament engine

-- ─── New Enums ───────────────────────────────────────────────────────────────

-- Add CHAPMAN to ScoringMode
ALTER TYPE "ScoringMode" ADD VALUE 'CHAPMAN';

-- Add new values to FeedEventType
ALTER TYPE "FeedEventType" ADD VALUE 'TOURNAMENT_ANNOUNCEMENT';
ALTER TYPE "FeedEventType" ADD VALUE 'SCORE_DISPUTE_RESOLVED';

-- Create new enums
CREATE TYPE "HostingType" AS ENUM ('STICKS_HOSTED', 'SELF_HOSTED');
CREATE TYPE "BracketType" AS ENUM ('SINGLE_ELIMINATION', 'DOUBLE_ELIMINATION', 'ROUND_ROBIN');
CREATE TYPE "OrgRole" AS ENUM ('COMMISSIONER', 'COACH', 'ADMIN', 'PLAYER');
CREATE TYPE "DisputeStatus" AS ENUM ('OPEN', 'RESOLVED', 'DISMISSED');
CREATE TYPE "MatchResult" AS ENUM ('WIN', 'LOSS', 'HALVED', 'BYE');
CREATE TYPE "EliminationStatus" AS ENUM ('ACTIVE', 'ELIMINATED', 'WITHDRAWN');

-- ─── Extend Tournament ───────────────────────────────────────────────────────

ALTER TABLE "Tournament" ADD COLUMN "hostingType" "HostingType" NOT NULL DEFAULT 'STICKS_HOSTED';
ALTER TABLE "Tournament" ADD COLUMN "bracketType" "BracketType";
ALTER TABLE "Tournament" ADD COLUMN "handicapAllowance" DOUBLE PRECISION NOT NULL DEFAULT 100;
ALTER TABLE "Tournament" ADD COLUMN "teeAssignment" JSONB;
ALTER TABLE "Tournament" ADD COLUMN "multiRoundConfig" JSONB;
ALTER TABLE "Tournament" ADD COLUMN "leaderboardFrozen" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Tournament" ADD COLUMN "currentRound" INTEGER NOT NULL DEFAULT 1;

-- ─── Extend TournamentEntry ──────────────────────────────────────────────────

ALTER TABLE "TournamentEntry" ADD COLUMN "seedPosition" INTEGER;
ALTER TABLE "TournamentEntry" ADD COLUMN "netScore" INTEGER;
ALTER TABLE "TournamentEntry" ADD COLUMN "pointsEarned" DOUBLE PRECISION;
ALTER TABLE "TournamentEntry" ADD COLUMN "matchResult" "MatchResult";
ALTER TABLE "TournamentEntry" ADD COLUMN "eliminationStatus" "EliminationStatus" NOT NULL DEFAULT 'ACTIVE';
ALTER TABLE "TournamentEntry" ADD COLUMN "thru" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "TournamentEntry" ADD COLUMN "scoreRelToPar" INTEGER NOT NULL DEFAULT 0;

-- ─── Extend Season ───────────────────────────────────────────────────────────

ALTER TABLE "Season" ADD COLUMN "finalized" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Season" ADD COLUMN "standingsCache" JSONB;

-- ─── Create Pairing ──────────────────────────────────────────────────────────

CREATE TABLE "Pairing" (
    "id" TEXT NOT NULL,
    "tournamentId" TEXT NOT NULL,
    "roundNumber" INTEGER NOT NULL,
    "groupNumber" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pairing_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Pairing_tournamentId_roundNumber_groupNumber_key" ON "Pairing"("tournamentId", "roundNumber", "groupNumber");

ALTER TABLE "Pairing" ADD CONSTRAINT "Pairing_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- ─── Create PairingSlot ──────────────────────────────────────────────────────

CREATE TABLE "PairingSlot" (
    "id" TEXT NOT NULL,
    "pairingId" TEXT NOT NULL,
    "entryId" TEXT NOT NULL,
    "slotOrder" INTEGER NOT NULL,

    CONSTRAINT "PairingSlot_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "PairingSlot_pairingId_entryId_key" ON "PairingSlot"("pairingId", "entryId");

ALTER TABLE "PairingSlot" ADD CONSTRAINT "PairingSlot_pairingId_fkey" FOREIGN KEY ("pairingId") REFERENCES "Pairing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "PairingSlot" ADD CONSTRAINT "PairingSlot_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "TournamentEntry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- ─── Create BracketMatch ─────────────────────────────────────────────────────

CREATE TABLE "BracketMatch" (
    "id" TEXT NOT NULL,
    "tournamentId" TEXT NOT NULL,
    "roundNumber" INTEGER NOT NULL,
    "matchNumber" INTEGER NOT NULL,
    "entry1Id" TEXT,
    "entry2Id" TEXT,
    "winnerId" TEXT,
    "isBye" BOOLEAN NOT NULL DEFAULT false,
    "matchScore" TEXT,
    "bracketSide" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BracketMatch_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "BracketMatch_tournamentId_roundNumber_matchNumber_key" ON "BracketMatch"("tournamentId", "roundNumber", "matchNumber");

ALTER TABLE "BracketMatch" ADD CONSTRAINT "BracketMatch_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "BracketMatch" ADD CONSTRAINT "BracketMatch_entry1Id_fkey" FOREIGN KEY ("entry1Id") REFERENCES "TournamentEntry"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "BracketMatch" ADD CONSTRAINT "BracketMatch_entry2Id_fkey" FOREIGN KEY ("entry2Id") REFERENCES "TournamentEntry"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "BracketMatch" ADD CONSTRAINT "BracketMatch_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "TournamentEntry"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- ─── Create OrgMembership ────────────────────────────────────────────────────

CREATE TABLE "OrgMembership" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "OrgRole" NOT NULL DEFAULT 'PLAYER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrgMembership_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "OrgMembership_organizationId_userId_key" ON "OrgMembership"("organizationId", "userId");

ALTER TABLE "OrgMembership" ADD CONSTRAINT "OrgMembership_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "OrgMembership" ADD CONSTRAINT "OrgMembership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- ─── Create ScoreAuditLog ────────────────────────────────────────────────────

CREATE TABLE "ScoreAuditLog" (
    "id" TEXT NOT NULL,
    "tournamentId" TEXT NOT NULL,
    "entryId" TEXT NOT NULL,
    "holeNumber" INTEGER NOT NULL,
    "originalValue" INTEGER NOT NULL,
    "newValue" INTEGER NOT NULL,
    "editedById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ScoreAuditLog_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "ScoreAuditLog_tournamentId_idx" ON "ScoreAuditLog"("tournamentId");
CREATE INDEX "ScoreAuditLog_entryId_idx" ON "ScoreAuditLog"("entryId");

ALTER TABLE "ScoreAuditLog" ADD CONSTRAINT "ScoreAuditLog_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "ScoreAuditLog" ADD CONSTRAINT "ScoreAuditLog_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "TournamentEntry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "ScoreAuditLog" ADD CONSTRAINT "ScoreAuditLog_editedById_fkey" FOREIGN KEY ("editedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- ─── Create ScoreDispute ─────────────────────────────────────────────────────

CREATE TABLE "ScoreDispute" (
    "id" TEXT NOT NULL,
    "tournamentId" TEXT NOT NULL,
    "entryId" TEXT NOT NULL,
    "holeNumber" INTEGER NOT NULL,
    "claimedScore" INTEGER NOT NULL,
    "recordedScore" INTEGER NOT NULL,
    "evidenceUrl" TEXT,
    "status" "DisputeStatus" NOT NULL DEFAULT 'OPEN',
    "resolvedById" TEXT,
    "resolutionNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ScoreDispute_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "ScoreDispute_tournamentId_idx" ON "ScoreDispute"("tournamentId");
CREATE INDEX "ScoreDispute_entryId_idx" ON "ScoreDispute"("entryId");

ALTER TABLE "ScoreDispute" ADD CONSTRAINT "ScoreDispute_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "ScoreDispute" ADD CONSTRAINT "ScoreDispute_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "TournamentEntry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "ScoreDispute" ADD CONSTRAINT "ScoreDispute_resolvedById_fkey" FOREIGN KEY ("resolvedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
