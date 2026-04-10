// ─── Booking Routes ──────────────────────────────────────────────────────────
// Tee time search, booking, cancellation, and refund endpoints.

import { Hono } from "hono";
import { prisma } from "../lib/prisma.ts";
import { bookingService } from "../services/bookingService.ts";

type Env = { Variables: { userId: string } };

const bookings = new Hono<Env>();

// GET /bookings/search — search tee times across foreUP + GolfNow
bookings.get("/search", async (c) => {
  const date = c.req.query("date");
  const players = parseInt(c.req.query("players") || "1", 10);
  const courseId = c.req.query("courseId");
  const timeFrom = c.req.query("timeFrom");
  const timeTo = c.req.query("timeTo");
  const timeOfDay = c.req.query("timeOfDay") as 'morning' | 'afternoon' | 'twilight' | undefined;
  const lat = c.req.query("lat") ? parseFloat(c.req.query("lat")!) : undefined;
  const lng = c.req.query("lng") ? parseFloat(c.req.query("lng")!) : undefined;

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return c.json({ error: "Missing or invalid date (YYYY-MM-DD)", statusCode: 400 }, 400);
  }

  if (isNaN(players) || players < 1 || players > 4) {
    return c.json({ error: "players must be between 1 and 4", statusCode: 400 }, 400);
  }

  if (timeOfDay && !['morning', 'afternoon', 'twilight'].includes(timeOfDay)) {
    return c.json({ error: "timeOfDay must be morning, afternoon, or twilight", statusCode: 400 }, 400);
  }

  const results = await bookingService.search({
    date,
    courseId: courseId || undefined,
    timeFrom: timeFrom || undefined,
    timeTo: timeTo || undefined,
    timeOfDay: timeOfDay || undefined,
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
    const confirmation = await bookingService.book(providerRefId, provider, user.id, players, body.paymentMethodId || 'mock_pm');

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
    include: { reminders: true, paymentRequests: true },
  });

  if (!teeTime) {
    return c.json({ error: "Booking not found", statusCode: 404 }, 404);
  }

  return c.json(teeTime);
});

// POST /bookings/:id/split-pay — group member pays their split portion
bookings.post("/:id/split-pay", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  const { paymentRequestId, paymentMethodId } = body;

  if (!paymentRequestId) {
    return c.json({ error: "Missing required field: paymentRequestId", statusCode: 400 }, 400);
  }

  const teeTime = await prisma.teeTime.findUnique({ where: { id } });
  if (!teeTime) {
    return c.json({ error: "Booking not found", statusCode: 404 }, 404);
  }

  try {
    const result = await bookingService.splitPay(paymentRequestId, paymentMethodId || 'mock_pm');
    return c.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Payment failed";
    if (message === 'Payment request not found') {
      return c.json({ error: message, statusCode: 404 }, 404);
    }
    return c.json({ error: message, statusCode: 500 }, 500);
  }
});

// GET /bookings/:id/split-status — get settlement status for a booking
bookings.get("/:id/split-status", async (c) => {
  const id = c.req.param("id");

  const teeTime = await prisma.teeTime.findUnique({
    where: { id },
    include: { paymentRequests: true },
  });

  if (!teeTime) {
    return c.json({ error: "Booking not found", statusCode: 404 }, 404);
  }

  const pendingCount = teeTime.paymentRequests.filter(
    (r) => r.status === 'PENDING' || r.status === 'PROCESSING',
  ).length;

  const overdueRequests = teeTime.paymentRequests.filter(
    (r) => r.status === 'PENDING' && new Date(r.dueAt) < new Date(),
  );

  return c.json({
    settlementStatus: teeTime.settlementStatus,
    settled: teeTime.settlementStatus === 'SETTLED',
    pendingCount,
    overdueCount: overdueRequests.length,
    paymentRequests: teeTime.paymentRequests,
  });
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
