// ─── Booking Routes ──────────────────────────────────────────────────────────
// Tee time search, booking, cancellation, and refund endpoints.

import { Hono } from "hono";
import { prisma } from "../lib/prisma.ts";
import { bookingService } from "../services/bookingService.ts";
import { reminderService } from "../services/reminderService.ts";

type Env = { Variables: { userId: string } };

const bookings = new Hono<Env>();

// GET /bookings/search — search tee times across foreUP + GolfNow
bookings.get("/search", async (c) => {
  const date = c.req.query("date");
  const players = parseInt(c.req.query("players") || "1", 10);
  const courseId = c.req.query("courseId");
  const timeFrom = c.req.query("timeFrom");
  const timeTo = c.req.query("timeTo");
  const lat = c.req.query("lat") ? parseFloat(c.req.query("lat")!) : undefined;
  const lng = c.req.query("lng") ? parseFloat(c.req.query("lng")!) : undefined;

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return c.json({ error: "Missing or invalid date (YYYY-MM-DD)", statusCode: 400 }, 400);
  }

  if (isNaN(players) || players < 1 || players > 4) {
    return c.json({ error: "players must be between 1 and 4", statusCode: 400 }, 400);
  }

  const results = await bookingService.search({
    date,
    courseId: courseId || undefined,
    timeFrom: timeFrom || undefined,
    timeTo: timeTo || undefined,
    players,
    lat,
    lng,
  });

  return c.json({ teeTimes: results });
});

// POST /bookings — create a booking
bookings.post("/", async (c) => {
  const authId = c.get("userId") as string;
  const body = await c.req.json();

  const { providerRefId, provider, players } = body;

  if (!providerRefId || !provider || !players) {
    return c.json(
      { error: "Missing required fields: providerRefId, provider, players", statusCode: 400 },
      400,
    );
  }

  if (provider !== 'FOREUP' && provider !== 'GOLFNOW') {
    return c.json({ error: "provider must be FOREUP or GOLFNOW", statusCode: 400 }, 400);
  }

  const user = await prisma.user.findUnique({ where: { authId } });
  if (!user) {
    return c.json({ error: "User not found", statusCode: 404 }, 404);
  }

  try {
    const confirmation = await bookingService.book(providerRefId, provider, user.id, players);

    // Schedule push notification reminders
    const teeTime = await prisma.teeTime.findFirst({
      where: { providerRefId, bookerId: user.id },
      orderBy: { createdAt: 'desc' },
    });

    if (teeTime) {
      // Fire-and-forget — don't block the booking response on reminder scheduling
      reminderService
        .scheduleReminders(teeTime.id, user.id, teeTime.datetime, teeTime.courseName, players)
        .catch((err) => console.error('Failed to schedule reminders:', err));
    }

    return c.json(confirmation, 201);
  } catch (err) {
    console.error('Booking failed:', err);
    return c.json(
      { error: err instanceof Error ? err.message : "Booking failed", statusCode: 500 },
      500,
    );
  }
});

// GET /bookings/me — return current user's bookings
bookings.get("/me", async (c) => {
  const authId = c.get("userId") as string;

  const user = await prisma.user.findUnique({ where: { authId } });
  if (!user) {
    return c.json({ error: "User not found", statusCode: 404 }, 404);
  }

  const userBookings = await prisma.teeTime.findMany({
    where: { bookerId: user.id },
    orderBy: { datetime: 'desc' },
    include: { reminders: true },
  });

  return c.json({ bookings: userBookings });
});

// GET /bookings/:id — return single booking detail
bookings.get("/:id", async (c) => {
  const id = c.req.param("id");

  const teeTime = await prisma.teeTime.findUnique({
    where: { id },
    include: { reminders: true },
  });

  if (!teeTime) {
    return c.json({ error: "Booking not found", statusCode: 404 }, 404);
  }

  return c.json(teeTime);
});

// POST /bookings/:id/cancel — cancel a booking
bookings.post("/:id/cancel", async (c) => {
  const id = c.req.param("id");

  try {
    const result = await bookingService.cancel(id);

    // Cancel pending reminders
    await reminderService.cancelReminders(id);

    return c.json(result);
  } catch (err) {
    console.error('Cancellation failed:', err);
    const message = err instanceof Error ? err.message : "Cancellation failed";

    if (message === 'TeeTime not found') {
      return c.json({ error: message, statusCode: 404 }, 404);
    }

    return c.json({ error: message, statusCode: 500 }, 500);
  }
});

// POST /bookings/:id/refund — initiate refund for cancelled booking
bookings.post("/:id/refund", async (c) => {
  const id = c.req.param("id");

  try {
    const result = await bookingService.refund(id);
    return c.json(result);
  } catch (err) {
    console.error('Refund failed:', err);
    const message = err instanceof Error ? err.message : "Refund failed";

    if (message === 'TeeTime not found') {
      return c.json({ error: message, statusCode: 404 }, 404);
    }

    return c.json({ error: message, statusCode: 500 }, 500);
  }
});

export default bookings;
