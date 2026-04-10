-- Tee Time Booking V2 Migration
-- Adds SettlementStatus, PaymentRequestStatus enums, extends TeeTime, adds PaymentRequest model

-- Create enums
CREATE TYPE "SettlementStatus" AS ENUM ('UNSETTLED', 'SETTLED', 'NA');
CREATE TYPE "PaymentRequestStatus" AS ENUM ('PENDING', 'PROCESSING', 'PAID', 'FAILED');

-- Extend TeeTime with settlement fields
ALTER TABLE "TeeTime" ADD COLUMN "settlementStatus" "SettlementStatus" NOT NULL DEFAULT 'NA';
ALTER TABLE "TeeTime" ADD COLUMN "paymentIntentId" TEXT;

-- Create PaymentRequest table
CREATE TABLE "PaymentRequest" (
    "id" TEXT NOT NULL,
    "teeTimeId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" "PaymentRequestStatus" NOT NULL DEFAULT 'PENDING',
    "paymentIntentId" TEXT,
    "dueAt" TIMESTAMP(3) NOT NULL,
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaymentRequest_pkey" PRIMARY KEY ("id")
);

-- Indexes
CREATE INDEX "PaymentRequest_teeTimeId_idx" ON "PaymentRequest"("teeTimeId");
CREATE INDEX "PaymentRequest_userId_idx" ON "PaymentRequest"("userId");

-- Foreign keys
ALTER TABLE "PaymentRequest" ADD CONSTRAINT "PaymentRequest_teeTimeId_fkey"
    FOREIGN KEY ("teeTimeId") REFERENCES "TeeTime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "PaymentRequest" ADD CONSTRAINT "PaymentRequest_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
