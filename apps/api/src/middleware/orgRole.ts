import type { Context, Next } from "hono";
import { prisma } from "../lib/prisma.ts";

type OrgRole = "COMMISSIONER" | "COACH" | "ADMIN" | "PLAYER";

/**
 * Resolves organizationId from route params, query string, or request body.
 */
async function resolveOrgId(c: Context): Promise<string | null> {
  // 1. Route param :id on /organizations/:id/* paths
  const paramId = c.req.param("id");
  if (paramId && c.req.path.includes("/organizations/")) return paramId;

  // 2. Query param
  const queryOrgId = c.req.query("organizationId");
  if (queryOrgId) return queryOrgId;

  // 3. For tournament/season routes, look up the resource's organizationId
  const tournamentId = c.req.param("id");
  if (tournamentId && c.req.path.includes("/tournaments")) {
    const tournament = await prisma.tournament.findUnique({
      where: { id: tournamentId },
      select: { organizationId: true },
    });
    return tournament?.organizationId ?? null;
  }

  const seasonPath = c.req.path.includes("/seasons");
  if (seasonPath) {
    const seasonId = c.req.param("id");
    if (seasonId) {
      const season = await prisma.season.findUnique({
        where: { id: seasonId },
        select: { organizationId: true },
      });
      return season?.organizationId ?? null;
    }
  }

  // 4. Request body (for POST endpoints creating new resources)
  try {
    const body = await c.req.json();
    if (body?.organizationId) return body.organizationId;
  } catch {
    // body may not be JSON or already consumed
  }

  return null;
}

/**
 * RBAC middleware that checks the authenticated user's org membership role.
 * Attaches `orgRole` to context on success.
 */
export function orgRoleMiddleware(requiredRoles: OrgRole[]) {
  return async (c: Context, next: Next) => {
    const authId = c.get("userId") as string;
    if (!authId) {
      return c.json({ error: "Unauthorized", statusCode: 401 }, 401);
    }

    // Resolve the internal user id from authId
    const user = await prisma.user.findUnique({ where: { authId } });
    if (!user) {
      return c.json({ error: "User not found", statusCode: 404 }, 404);
    }

    const orgId = await resolveOrgId(c);
    if (!orgId) {
      return c.json({ error: "Organization context required", statusCode: 400 }, 400);
    }

    const membership = await prisma.orgMembership.findUnique({
      where: {
        organizationId_userId: { organizationId: orgId, userId: user.id },
      },
    });

    if (!membership || !requiredRoles.includes(membership.role as OrgRole)) {
      return c.json({ error: "Insufficient permissions", statusCode: 403 }, 403);
    }

    c.set("orgRole", membership.role);
    c.set("internalUserId", user.id);
    await next();
  };
}
