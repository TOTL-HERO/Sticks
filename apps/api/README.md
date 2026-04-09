# Sticks API

Bun + Hono + Prisma API server for the Sticks golf platform.

## Local Development

```bash
bun install
bun run dev
```

## Railway Deployment

The API deploys to Railway using the included `Dockerfile` and `railway.toml`.

### Required Environment Variables

Set these in the Railway dashboard:

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Supabase Postgres connection string |
| `SUPABASE_URL` | Supabase project URL (e.g. `https://xxx.supabase.co`) |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-side only) |
| `SUPABASE_JWT_SECRET` | Supabase JWT secret for token verification |
| `FOREUP_API_KEY` | foreUP API key for tee time search proxy |
| `SENTRY_DSN` | Sentry DSN for error monitoring (optional) |

`PORT` is set automatically by Railway — the server defaults to 3000 if unset.

### Health Check

`GET /health` returns `{ "status": "ok" }` and is configured as the Railway health check endpoint.
