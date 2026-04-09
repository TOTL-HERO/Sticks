// ─── Booking Service ─────────────────────────────────────────────────────────
// Orchestrates tee time search, booking, cancellation, and refund across
// foreUP (primary) and GolfNow (fallback) providers.

import { prisma } from "../lib/prisma.ts";
import {
  ForeUpProvider,
  GolfNowProvider,
  type BookingProvider,
  type TeeTimeSearchParams,
  type TeeTimeResult,
  type BookingConfirmation,
} from "./bookingProvider.ts";

export class BookingService {
  private foreUp: BookingProvider;
  private golfNow: BookingProvider;
  private commissionRate: number = 0.08; // 8% commission

  constructor() {
    this.foreUp = new ForeUpProvider();
    this.golfNow = new GolfNowProvider();
  }

  /**
   * Search tee times — query foreUP first, fall back to GolfNow if empty.
   */
  async search(params: TeeTimeSearchParams): Promise<TeeTimeResult[]> {
    const foreUpResults = await this.foreUp.search(params);
    if (foreUpResults.length > 0) return foreUpResults;

    // Fallback to GolfNow when foreUP returns no results
    return this.golfNow.search(params);
  }

  /**
   * Book a tee time — route to correct provider, create TeeTime record,
   * compute commission.
   */
  async book(
    providerRefId: string,
    provider: 'FOREUP' | 'GOLFNOW',
    userId: string,
    players: number,
  ): Promise<BookingConfirmation> {
    const bp = provider === 'FOREUP' ? this.foreUp : this.golfNow;
    const confirmation = await bp.book(providerRefId, userId, players);

    const commissionAmount = confirmation.totalPrice * this.commissionRate;

    // Create TeeTime record in DB with BOOKED status
    await prisma.teeTime.create({
      data: {
        courseName: confirmation.courseName,
        datetime: new Date(confirmation.datetime),
        availableSpots: 0, // booked — no spots left for this reservation
        price: confirmation.totalPrice / players,
        bookingStatus: 'BOOKED',
        provider,
        providerRefId,
        bookerId: userId,
        playerCount: players,
        paymentAmount: confirmation.totalPrice,
        commissionAmount,
        confirmationNumber: confirmation.confirmationNumber,
      },
    });

    return confirmation;
  }

  /**
   * Cancel a booking — look up TeeTime, route to correct provider,
   * update status to CANCELLED, set refundStatus to PENDING.
   */
  async cancel(teeTimeId: string): Promise<{ success: boolean; refundEligible: boolean }> {
    const teeTime = await prisma.teeTime.findUnique({ where: { id: teeTimeId } });
    if (!teeTime) throw new Error('TeeTime not found');
    if (!teeTime.provider || !teeTime.providerRefId) {
      throw new Error('TeeTime has no provider information');
    }

    const bp = teeTime.provider === 'FOREUP' ? this.foreUp : this.golfNow;
    const result = await bp.cancel(teeTime.providerRefId);

    if (result.success) {
      await prisma.teeTime.update({
        where: { id: teeTimeId },
        data: {
          bookingStatus: 'CANCELLED',
          cancelledAt: new Date(),
          refundStatus: result.refundEligible ? 'PENDING' : 'NONE',
        },
      });
    }

    return result;
  }

  /**
   * Refund a cancelled booking — route to correct provider, update refundStatus.
   */
  async refund(teeTimeId: string): Promise<{ success: boolean; refundAmount: number }> {
    const teeTime = await prisma.teeTime.findUnique({ where: { id: teeTimeId } });
    if (!teeTime) throw new Error('TeeTime not found');
    if (!teeTime.provider || !teeTime.providerRefId) {
      throw new Error('TeeTime has no provider information');
    }

    const bp = teeTime.provider === 'FOREUP' ? this.foreUp : this.golfNow;
    const result = await bp.refund(teeTime.providerRefId);

    await prisma.teeTime.update({
      where: { id: teeTimeId },
      data: {
        refundStatus: result.success ? 'COMPLETED' : 'FAILED',
      },
    });

    return result;
  }
}

// Singleton instance
export const bookingService = new BookingService();
