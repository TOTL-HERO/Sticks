import { Hono } from "hono";
import { prisma } from "../lib/prisma.ts";

type Env = { Variables: { userId: string } };

const feed = new Hono<Env>();

// GET /feed — query FeedEvents with cursor-based pagination and scope filter
feed.get("/", async (c) => {
  const authId = c.get("userId") as string;
  const cursor = c.req.query("cursor");
  const limit = Math.min(parseInt(c.req.query("limit") || "20", 10), 100);
  const scope = c.req.query("scope") || "global";

  const user = await prisma.user.findUnique({ where: { authId } });
  if (!user) {
    return c.json({ error: "User not found", statusCode: 404 }, 404);
  }

  let actorFilter: object | undefined;

  if (scope === "following") {
    const following = await prisma.follow.findMany({
      where: { followerId: user.id },
      select: { followingId: true },
    });
    const followingIds = following.map((f) => f.followingId);
    actorFilter = { actorId: { in: followingIds } };
  } else if (scope === "local") {
    // Simple approach: match on homeCourseName for now
    // TODO: Refine geographic filtering with lat/lng or state extraction
    if (user.homeCourseName) {
      const localUsers = await prisma.user.findMany({
        where: { homeCourseName: user.homeCourseName },
        select: { id: true },
      });
      const localUserIds = localUsers.map((u) => u.id);
      actorFilter = { actorId: { in: localUserIds } };
    }
  }
  // global scope: no filter

  const events = await prisma.feedEvent.findMany({
    where: {
      ...actorFilter,
    },
    include: {
      actor: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          avatarUrl: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
    take: limit + 1,
    ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
  });

  const hasMore = events.length > limit;
  const items = hasMore ? events.slice(0, limit) : events;
  const lastItem = items[items.length - 1];
  const nextCursor = hasMore && lastItem ? lastItem.id : null;

  return c.json({ events: items, nextCursor });
});

export default feed;
