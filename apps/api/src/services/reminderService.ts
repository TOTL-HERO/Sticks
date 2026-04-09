// ─── Reminder Service ────────────────────────────────────────────────────────
// Schedules and manages push notification reminders for tee time bookings
// via OneSignal REST API. Persists Reminder records in DB.
// TODO: Replace mock OneSignal calls with real API integration when credentials are available.

import { prisma } from "../lib/prisma.ts";

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

export class ReminderService {
  private oneSignalAppId: string;
  private oneSignalApiKey: string;

  constructor() {
    this.oneSignalAppId = process.env.ONESIGNAL_APP_ID || '';
    this.oneSignalApiKey = process.env.ONESIGNAL_API_KEY || '';
  }

  /**
   * Schedule 24-hour and 2-hour reminders for a booked tee time.
   * Skips reminders whose scheduled time is already in the past.
   */
  async scheduleReminders(
    teeTimeId: string,
    userId: string,
    datetime: Date,
    courseName: string,
    players: number,
  ): Promise<void> {
    const reminders = [
      {
        type: 'TWENTY_FOUR_HOUR' as const,
        sendAt: new Date(datetime.getTime() - 24 * 60 * 60 * 1000),
        title: 'Tee Time Tomorrow',
        body: `${courseName} — ${players} player${players > 1 ? 's' : ''} at ${formatTime(datetime)}`,
      },
      {
        type: 'TWO_HOUR' as const,
        sendAt: new Date(datetime.getTime() - 2 * 60 * 60 * 1000),
        title: 'Tee Time in 2 Hours',
        body: `${courseName} at ${formatTime(datetime)} — check directions`,
      },
    ];

    for (const reminder of reminders) {
      // Skip reminders whose scheduled time is in the past
      if (reminder.sendAt.getTime() <= Date.now()) continue;

      let oneSignalId: string | null = null;

      try {
        oneSignalId = await this.createOneSignalNotification({
          userId,
          sendAt: reminder.sendAt,
          title: reminder.title,
          body: reminder.body,
          data: { teeTimeId, screen: 'BookingDetail' },
        });
      } catch (err) {
        console.error(`Failed to schedule ${reminder.type} reminder, retrying in 30s...`, err);

        // Retry once after 30 seconds
        // TODO: In production, use a proper job queue instead of setTimeout
        try {
          await new Promise((resolve) => setTimeout(resolve, 30_000));
          oneSignalId = await this.createOneSignalNotification({
            userId,
            sendAt: reminder.sendAt,
            title: reminder.title,
            body: reminder.body,
            data: { teeTimeId, screen: 'BookingDetail' },
          });
        } catch (retryErr) {
          console.error(`Retry failed for ${reminder.type} reminder`, retryErr);

          // Create Reminder record with FAILED status
          await prisma.reminder.create({
            data: {
              teeTimeId,
              scheduledAt: reminder.sendAt,
              reminderType: reminder.type,
              status: 'FAILED',
            },
          });
          continue;
        }
      }

      // Persist Reminder record in DB
      await prisma.reminder.create({
        data: {
          teeTimeId,
          oneSignalId,
          scheduledAt: reminder.sendAt,
          reminderType: reminder.type,
          status: 'SCHEDULED',
        },
      });
    }
  }

  /**
   * Cancel all pending reminders for a tee time.
   * Fetches Reminder records, cancels via OneSignal, updates status.
   */
  async cancelReminders(teeTimeId: string): Promise<void> {
    const reminders = await prisma.reminder.findMany({
      where: {
        teeTimeId,
        status: 'SCHEDULED',
      },
    });

    for (const reminder of reminders) {
      if (reminder.oneSignalId) {
        try {
          await this.cancelOneSignalNotification(reminder.oneSignalId);
        } catch (err) {
          console.error(`Failed to cancel OneSignal notification ${reminder.oneSignalId}`, err);
          // Continue — update DB status even if OneSignal cancel fails
        }
      }

      await prisma.reminder.update({
        where: { id: reminder.id },
        data: { status: 'CANCELLED' },
      });
    }
  }

  /**
   * Create a scheduled notification via OneSignal REST API.
   * TODO: Replace mock with real OneSignal API call when credentials are available.
   */
  private async createOneSignalNotification(params: {
    userId: string;
    sendAt: Date;
    title: string;
    body: string;
    data: Record<string, string>;
  }): Promise<string> {
    // TODO: Uncomment when OneSignal credentials are available:
    // const response = await fetch('https://onesignal.com/api/v1/notifications', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Basic ${this.oneSignalApiKey}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     app_id: this.oneSignalAppId,
    //     include_external_user_ids: [params.userId],
    //     send_after: params.sendAt.toISOString(),
    //     headings: { en: params.title },
    //     contents: { en: params.body },
    //     data: params.data,
    //   }),
    // });
    // const result = await response.json();
    // return result.id;

    // Mock: generate a fake OneSignal notification ID
    const mockId = `onesignal-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
    console.log(`[ReminderService] Mock scheduled notification: ${params.title} at ${params.sendAt.toISOString()}`);
    return mockId;
  }

  /**
   * Cancel a scheduled notification via OneSignal REST API.
   * TODO: Replace mock with real OneSignal API call when credentials are available.
   */
  private async cancelOneSignalNotification(notificationId: string): Promise<void> {
    // TODO: Uncomment when OneSignal credentials are available:
    // await fetch(`https://onesignal.com/api/v1/notifications/${notificationId}?app_id=${this.oneSignalAppId}`, {
    //   method: 'DELETE',
    //   headers: { 'Authorization': `Basic ${this.oneSignalApiKey}` },
    // });

    console.log(`[ReminderService] Mock cancelled notification: ${notificationId}`);
  }
}

// Singleton instance
export const reminderService = new ReminderService();
