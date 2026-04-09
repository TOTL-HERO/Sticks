import * as Sentry from "@sentry/bun";
import { Hono } from "hono";
import { authMiddleware } from "./middleware/auth.ts";
import usersRoutes from "./routes/users.ts";
import roundsRoutes from "./routes/rounds.ts";
import feedRoutes from "./routes/feed.ts";
import leaderboardRoutes from "./routes/leaderboard.ts";
import teeTimesRoutes from "./routes/tee-times.ts";
import coursesRoutes from "./routes/courses.ts";

// Initialize Sentry
if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 1.0,
  });
}

const app = new Hono();

// Health check — no auth required
app.get("/health", (c) => {
  return c.json({ status: "ok" });
});

// Apply auth middleware to all routes after /health
app.use("*", async (c, next) => {
  // Skip auth for health check
  if (c.req.path === "/health") {
    return next();
  }
  return authMiddleware(c, next);
});

// Mount route modules
app.route("/users", usersRoutes);
app.route("/rounds", roundsRoutes);
app.route("/feed", feedRoutes);
app.route("/leaderboard", leaderboardRoutes);
app.route("/tee-times", teeTimesRoutes);
app.route("/courses", coursesRoutes);

// Global error handler
app.onError((err, c) => {
  console.error("Unhandled error:", err);
  Sentry.captureException(err);

  const statusCode = "status" in err && typeof err.status === "number" ? err.status : 500;

  return c.json(
    { error: err.message || "Internal server error", statusCode },
    statusCode as 500,
  );
});

const port = parseInt(process.env.PORT || "3000", 10);

console.log(`Sticks API server running on port ${port}`);

export default {
  port,
  fetch: app.fetch,
};
