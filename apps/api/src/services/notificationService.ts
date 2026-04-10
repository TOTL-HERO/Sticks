// ─── Notification Service ─────────────────────────────────────────────────────
// Mock OneSignal implementation. When real OneSignal credentials are available,
// replace the internals of each function only.
// All function signatures, return types, and calling code remain unchanged.

export class NotificationService {
  /**
   * Send a booking confirmation notification to the organizer.
   * TODO: Replace with real OneSignal API call when credentials are available.
   */
  async sendBookingConfirmation(
    userId: string,
    courseName: string,
    datetime: string,
    amount: number,
  ): Promise<void> {
    try {
      console.log('[ONESIGNAL_MOCK] sendBookingConfirmation', {
        userId,
        courseName,
        datetime,
        amount,
        title: 'Tee Time Confirmed!',
        body: `Your tee time at ${courseName} is confirmed. Total: $${amount.toFixed(2)}`,
        scheduledAt: new Date().toISOString(),
      });
    } catch (err) {
      console.error('[ONESIGNAL_MOCK] sendBookingConfirmation failed:', err);
    }
  }

  /**
   * Send a payment request notification to a group member.
   * TODO: Replace with real OneSignal API call when credentials are available.
   */
  async sendPaymentRequest(
    userId: string,
    bookingId: string,
    paymentRequestId: string,
    splitAmount: number,
  ): Promise<void> {
    try {
      console.log('[ONESIGNAL_MOCK] sendPaymentRequest', {
        userId,
        bookingId,
        paymentRequestId,
        splitAmount,
        title: 'Tee Time Payment Request',
        body: `You owe $${splitAmount.toFixed(2)} for a tee time booking. Tap to pay.`,
        deepLink: `sticks://split-payment/${bookingId}/${paymentRequestId}`,
        scheduledAt: new Date().toISOString(),
      });
    } catch (err) {
      console.error('[ONESIGNAL_MOCK] sendPaymentRequest failed:', err);
    }
  }

  /**
   * Schedule a tee time reminder notification.
   * TODO: Replace with real OneSignal scheduled notification when credentials are available.
   */
  async scheduleReminder(
    userId: string,
    teeTimeId: string,
    courseName: string,
    datetime: string,
  ): Promise<void> {
    try {
      const teeTimeDate = new Date(datetime);
      const reminderAt24h = new Date(teeTimeDate.getTime() - 24 * 60 * 60 * 1000);
      const reminderAt2h = new Date(teeTimeDate.getTime() - 2 * 60 * 60 * 1000);

      console.log('[ONESIGNAL_MOCK] scheduleReminder', {
        userId,
        teeTimeId,
        courseName,
        datetime,
        reminders: [
          {
            title: 'Tee Time Tomorrow',
            body: `Your tee time at ${courseName} is tomorrow. Don't forget!`,
            scheduledAt: reminderAt24h.toISOString(),
          },
          {
            title: 'Tee Time in 2 Hours',
            body: `Your tee time at ${courseName} is in 2 hours. Get ready!`,
            scheduledAt: reminderAt2h.toISOString(),
          },
        ],
      });
    } catch (err) {
      console.error('[ONESIGNAL_MOCK] scheduleReminder failed:', err);
    }
  }
}

export const notificationService = new NotificationService();
