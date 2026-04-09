-- CreateEnum
CREATE TYPE "BookingProvider" AS ENUM ('FOREUP', 'GOLFNOW');

-- CreateEnum
CREATE TYPE "ReminderType" AS ENUM ('TWENTY_FOUR_HOUR', 'TWO_HOUR');

-- CreateEnum
CREATE TYPE "ReminderStatus" AS ENUM ('SCHEDULED', 'DELIVERED', 'CANCELLED', 'FAILED');

-- CreateEnum
CREATE TYPE "RefundStatus" AS ENUM ('NONE', 'PENDING', 'COMPLETED', 'FAILED');

-- AlterTable: TeeTime — add new columns, remove old foreupRefId
ALTER TABLE "TeeTime" ADD COLUMN "courseId" TEXT;
ALTER TABLE "TeeTime" ADD COLUMN "provider" "BookingProvider";
ALTER TABLE "TeeTime" ADD COLUMN "providerRefId" TEXT;
ALTER TABLE "TeeTime" ADD COLUMN "bookerId" TEXT;
ALTER TABLE "TeeTime" ADD COLUMN "playerCount" INTEGER;
ALTER TABLE "TeeTime" ADD COLUMN "paymentAmount" DOUBLE PRECISION;
ALTER TABLE "TeeTime" ADD COLUMN "commissionAmount" DOUBLE PRECISION;
ALTER TABLE "TeeTime" ADD COLUMN "refundStatus" "RefundStatus" NOT NULL DEFAULT 'NONE';
ALTER TABLE "TeeTime" ADD COLUMN "cancelledAt" TIMESTAMP(3);
ALTER TABLE "TeeTime" ADD COLUMN "confirmationNumber" TEXT;

-- Drop old foreupRefId column (replaced by providerRefId)
ALTER TABLE "TeeTime" DROP COLUMN IF EXISTS "foreupRefId";

-- CreateTable: Reminder
CREATE TABLE "Reminder" (
    "id" TEXT NOT NULL,
    "teeTimeId" TEXT NOT NULL,
    "oneSignalId" TEXT,
    "scheduledAt" TIMESTAMP(3) NOT NULL,
    "reminderType" "ReminderType" NOT NULL,
    "status" "ReminderStatus" NOT NULL DEFAULT 'SCHEDULED',
    "deliveredAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reminder_pkey" PRIMARY KEY ("id")
);

-- CreateTable: CourseGeometryCache
CREATE TABLE "CourseGeometryCache" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "providerSource" TEXT NOT NULL,
    "geometryData" JSONB NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CourseGeometryCache_pkey" PRIMARY KEY ("id")
);

-- CreateIndex: Reminder.teeTimeId
CREATE INDEX "Reminder_teeTimeId_idx" ON "Reminder"("teeTimeId");

-- CreateIndex: CourseGeometryCache.courseId unique
CREATE UNIQUE INDEX "CourseGeometryCache_courseId_key" ON "CourseGeometryCache"("courseId");

-- AddForeignKey: TeeTime.bookerId -> User.id
ALTER TABLE "TeeTime" ADD CONSTRAINT "TeeTime_bookerId_fkey" FOREIGN KEY ("bookerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey: Reminder.teeTimeId -> TeeTime.id
ALTER TABLE "Reminder" ADD CONSTRAINT "Reminder_teeTimeId_fkey" FOREIGN KEY ("teeTimeId") REFERENCES "TeeTime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
