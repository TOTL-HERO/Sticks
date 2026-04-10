import { prisma } from "../lib/prisma.ts";

// ─── Payment Service ──────────────────────────────────────────────────────────
// Mock Stripe implementation. When real Stripe credentials are available,
// replace the internals of createPaymentIntent and confirmPayment only.
// All function signatures, return types, and calling code remain unchanged.

export interface PaymentIntent {
  intentId: string;
  clientSecret: string;
  amount: number;
  status: 'requires_payment_method' | 'processing' | 'succeeded' | 'failed';
}

export interface SplitDetails {
  totalAmount: number;
  playerCount: number;
  perPlayerAmount: number;
  paymentRequests: {
    id: string;
    teeTimeId: string;
    userId: string;
    amount: number;
    status: string;
    dueAt: string;
  }[];
}

export class PaymentService {
  /**
   * Create a mock Stripe payment intent.
   * TODO: Replace with real Stripe SDK call when credentials are available.
   */
  async createPaymentIntent(amount: number, currency = 'usd'): Promise<PaymentIntent> {
    const intentId = `pi_mock_${Date.now().toString(36)}`;
    const clientSecret = `${intentId}_secret_mock`;

    console.log(`[STRIPE_MOCK] createPaymentIntent: amount=${amount} currency=${currency} intentId=${intentId}`);

    return {
      intentId,
      clientSecret,
      amount,
      status: 'succeeded',
    };
  }

  /**
   * Confirm a mock payment intent.
   * TODO: Replace with real Stripe SDK confirmation when credentials are available.
   */
  async confirmPayment(intentId: string): Promise<{ success: boolean; status: string }> {
    console.log(`[STRIPE_MOCK] confirmPayment: intentId=${intentId}`);
    return { success: true, status: 'succeeded' };
  }

  /**
   * Calculate the per-player split amount.
   * Returns totalAmount / playerCount rounded to 2 decimal places.
   */
  calculateSplit(totalAmount: number, playerCount: number): number {
    return Math.round((totalAmount / playerCount) * 100) / 100;
  }

  /**
   * Create PaymentRequest records for all group members (excluding organizer).
   * Returns SplitDetails with the created records.
   */
  async createSplitRequests(
    teeTimeId: string,
    organizerId: string,
    playerCount: number,
    totalAmount: number,
  ): Promise<SplitDetails> {
    const perPlayerAmount = this.calculateSplit(totalAmount, playerCount);
    const dueAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now

    // Create playerCount - 1 payment requests (organizer already paid)
    // In a real app, we'd have the group member user IDs. For now we create
    // placeholder records that get associated when members pay via deep link.
    const createdRequests = [];

    for (let i = 0; i < playerCount - 1; i++) {
      const record = await prisma.paymentRequest.create({
        data: {
          teeTimeId,
          userId: organizerId, // placeholder — updated when member pays
          amount: perPlayerAmount,
          status: 'PENDING',
          dueAt,
        },
      });
      createdRequests.push(record);
    }

    return {
      totalAmount,
      playerCount,
      perPlayerAmount,
      paymentRequests: createdRequests.map((r) => ({
        id: r.id,
        teeTimeId: r.teeTimeId,
        userId: r.userId,
        amount: r.amount,
        status: r.status,
        dueAt: r.dueAt.toISOString(),
      })),
    };
  }

  /**
   * Process a group member's split payment.
   */
  async processGroupMemberPayment(paymentRequestId: string): Promise<{ success: boolean }> {
    const intent = await this.createPaymentIntent(0); // amount resolved from record

    const record = await prisma.paymentRequest.findUnique({ where: { id: paymentRequestId } });
    if (!record) throw new Error('Payment request not found');

    await this.createPaymentIntent(record.amount);

    await prisma.paymentRequest.update({
      where: { id: paymentRequestId },
      data: {
        status: 'PAID',
        paidAt: new Date(),
        paymentIntentId: intent.intentId,
      },
    });

    // Check if all members have paid and settle the booking
    await this.checkSettlement(record.teeTimeId);

    return { success: true };
  }

  /**
   * Check if all group members have paid and update settlement status.
   */
  async checkSettlement(teeTimeId: string): Promise<{ settled: boolean; pendingCount: number }> {
    const pendingRequests = await prisma.paymentRequest.count({
      where: { teeTimeId, status: { in: ['PENDING', 'PROCESSING'] } },
    });

    if (pendingRequests === 0) {
      await prisma.teeTime.update({
        where: { id: teeTimeId },
        data: { settlementStatus: 'SETTLED' },
      });
      return { settled: true, pendingCount: 0 };
    }

    return { settled: false, pendingCount: pendingRequests };
  }
}

export const paymentService = new PaymentService();
