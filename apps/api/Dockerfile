# Sticks API — Bun + Hono + Prisma
# v2 — CORS support
FROM oven/bun:1 AS base
WORKDIR /app

# Install dependencies
COPY package.json bun.lock ./
COPY prisma ./prisma/
COPY prisma.config.ts ./
RUN bun install --frozen-lockfile

# Generate Prisma client
RUN bun run prisma generate

# Copy source code
COPY src ./src/
COPY tsconfig.json ./

EXPOSE ${PORT:-3000}

CMD ["bun", "run", "src/index.ts"]
