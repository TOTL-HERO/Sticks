import { Hono } from "hono";
import { prisma } from "../lib/prisma.ts";

const GOLF_API_KEY = process.env.GOLF_COURSE_API_KEY || "QOXQMJCWW6GXNV46I4KR6PNCFA";
const GOLF_API_BASE = "https://api.golfcourseapi.com/v1";

// 7-day TTL for geometry cache
const GEOMETRY_CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000;

// ─── Geometry Types ──────────────────────────────────────────────────────────

interface HoleGeometry {
  holeNumber: number;
  par: number;
  yardage: number;
  teeBox: { lat: number; lng: number };
  fairwayOutline: { lat: number; lng: number }[];
  greenOutline: { lat: number; lng: number }[];
  hazards: { type: string; outline: { lat: number; lng: number }[] }[];
  greenCenter: { lat: number; lng: number };
  greenFront: { lat: number; lng: number };
  greenBack: { lat: number; lng: number };
}

interface CourseGeometryResponse {
  courseId: string;
  holes: HoleGeometry[];
  provider: string;
  cachedAt: number;
}

const courses = new Hono();

courses.get("/search", async (c) => {
  const query = c.req.query("query") || "";

  if (!query || query.length < 1) {
    return c.json({ courses: [] });
  }

  try {
    const res = await fetch(
      `${GOLF_API_BASE}/search?search_query=${encodeURIComponent(query)}`,
      { headers: { Authorization: `Key ${GOLF_API_KEY}` } },
    );

    if (!res.ok) {
      return c.json({ courses: [], error: "Golf course API error" });
    }

    const data = (await res.json()) as {
      courses: Array<{
        id: number;
        club_name: string;
        city: string;
        state: string;
        country: string;
        num_holes: number;
        latitude: number;
        longitude: number;
      }>;
    };

    const mapped = (data.courses || []).map((course) => ({
      id: String(course.id),
      name: course.club_name,
      location: {
        lat: course.latitude,
        lng: course.longitude,
        city: course.city || "",
        state: course.state || "",
      },
      imageUrl: null,
      holeCount: course.num_holes || 18,
      par: 72,
    }));

    return c.json({ courses: mapped });
  } catch (err) {
    console.error("Golf course search error:", err);
    return c.json({ courses: [], error: "Failed to search courses" });
  }
});

courses.post("/ghin/lookup", async (c) => {
  const body = await c.req.json();
  if (!body.ghinNumber) {
    return c.json({ error: "Missing required field: ghinNumber", statusCode: 400 }, 400);
  }
  // TODO: Replace with real GHIN API when USGA developer agreement is approved
  return c.json({
    ghinNumber: body.ghinNumber,
    handicapIndex: 12.4,
    firstName: "John",
    lastName: "Doe",
    club: "Thanksgiving Point Golf Club",
    state: "UT",
  });
});

// ─── GET /courses/:id/geometry ───────────────────────────────────────────────
// Returns hole-level geometry for a course. Checks cache first, fetches from
// GolfCourseAPI.com on miss, falls back to mock geometry if no hole data.

courses.get("/:id/geometry", async (c) => {
  const courseId = c.req.param("id");

  // 1. Check CourseGeometryCache
  const cached = await prisma.courseGeometryCache.findUnique({
    where: { courseId },
  });

  if (cached && new Date(cached.expiresAt).getTime() > Date.now()) {
    return c.json({
      courseId,
      holes: cached.geometryData as unknown as HoleGeometry[],
      provider: cached.providerSource,
      cachedAt: cached.updatedAt.getTime(),
    } satisfies CourseGeometryResponse);
  }

  // 2. Fetch from GolfCourseAPI.com course detail endpoint
  let holes: HoleGeometry[] | null = null;
  let providerSource = 'golfcourseapi';

  try {
    const res = await fetch(`${GOLF_API_BASE}/courses/${courseId}`, {
      headers: { Authorization: `Key ${GOLF_API_KEY}` },
    });

    if (res.ok) {
      const data = await res.json() as Record<string, unknown>;
      holes = normalizeGolfCourseApiGeometry(courseId, data);
    }
  } catch (err) {
    console.error(`Failed to fetch geometry for course ${courseId}:`, err);
  }

  // 3. Fall back to mock geometry if no hole-level data
  if (!holes || holes.length === 0) {
    holes = generateMockGeometry(courseId);
    providerSource = 'mock';
  }

  // 4. Cache with 7-day TTL
  const expiresAt = new Date(Date.now() + GEOMETRY_CACHE_TTL_MS);

  await prisma.courseGeometryCache.upsert({
    where: { courseId },
    update: {
      geometryData: JSON.parse(JSON.stringify(holes)),
      providerSource,
      expiresAt,
    },
    create: {
      courseId,
      geometryData: JSON.parse(JSON.stringify(holes)),
      providerSource,
      expiresAt,
    },
  });

  return c.json({
    courseId,
    holes,
    provider: providerSource,
    cachedAt: Date.now(),
  } satisfies CourseGeometryResponse);
});

// ─── Geometry Helpers ────────────────────────────────────────────────────────

/**
 * Normalize GolfCourseAPI.com course detail response into HoleGeometry[].
 * Returns null if the response doesn't contain hole-level geometry data.
 */
function normalizeGolfCourseApiGeometry(
  courseId: string,
  data: Record<string, unknown>,
): HoleGeometry[] | null {
  // GolfCourseAPI.com returns hole data under `holes` or `course.holes`
  const courseData = (data.course || data) as Record<string, unknown>;
  const rawHoles = courseData.holes as Array<Record<string, unknown>> | undefined;

  if (!rawHoles || !Array.isArray(rawHoles) || rawHoles.length === 0) {
    return null;
  }

  const holes: HoleGeometry[] = [];

  for (const hole of rawHoles) {
    const holeNumber = (hole.hole_number || hole.number || holes.length + 1) as number;
    const par = (hole.par || 4) as number;
    const yardage = (hole.yardage || hole.yards || 400) as number;

    // Extract coordinates if available
    const teeBox = extractCoord(hole.tee_box || hole.tee) || { lat: 0, lng: 0 };
    const greenCenter = extractCoord(hole.green_center || hole.pin) || { lat: 0, lng: 0 };

    // Approximate green front/back from center if not provided
    const greenFront = extractCoord(hole.green_front) || offsetCoord(greenCenter, -0.0001);
    const greenBack = extractCoord(hole.green_back) || offsetCoord(greenCenter, 0.0001);

    // Extract outlines if available, otherwise generate simple shapes
    const fairwayOutline = extractPolygon(hole.fairway_outline || hole.fairway) || [];
    const greenOutline = extractPolygon(hole.green_outline || hole.green) || [];

    // Extract hazards
    const hazards: { type: string; outline: { lat: number; lng: number }[] }[] = [];
    const rawHazards = hole.hazards as Array<Record<string, unknown>> | undefined;
    if (Array.isArray(rawHazards)) {
      for (const h of rawHazards) {
        hazards.push({
          type: (h.type as string) || 'bunker',
          outline: extractPolygon(h.outline || h.coordinates) || [],
        });
      }
    }

    holes.push({
      holeNumber,
      par,
      yardage,
      teeBox,
      fairwayOutline,
      greenOutline,
      hazards,
      greenCenter,
      greenFront,
      greenBack,
    });
  }

  return holes.length > 0 ? holes : null;
}

function extractCoord(raw: unknown): { lat: number; lng: number } | null {
  if (!raw || typeof raw !== 'object') return null;
  const obj = raw as Record<string, unknown>;
  const lat = (obj.lat || obj.latitude) as number | undefined;
  const lng = (obj.lng || obj.longitude || obj.lon) as number | undefined;
  if (typeof lat === 'number' && typeof lng === 'number') return { lat, lng };
  return null;
}

function extractPolygon(raw: unknown): { lat: number; lng: number }[] | null {
  if (!Array.isArray(raw)) return null;
  const coords: { lat: number; lng: number }[] = [];
  for (const point of raw) {
    const c = extractCoord(point);
    if (c) coords.push(c);
  }
  return coords.length > 0 ? coords : null;
}

function offsetCoord(coord: { lat: number; lng: number }, offset: number): { lat: number; lng: number } {
  return { lat: coord.lat + offset, lng: coord.lng };
}

/**
 * Generate mock geometry for courses without hole-level data.
 * Uses a Utah-area base coordinate and generates 18 holes with realistic shapes.
 */
function generateMockGeometry(courseId: string): HoleGeometry[] {
  // Base coordinates near Thanksgiving Point, Utah
  const baseLat = 40.5447;
  const baseLng = -111.8955;

  const holes: HoleGeometry[] = [];
  const pars = [4, 4, 3, 5, 4, 4, 3, 4, 5, 4, 4, 3, 5, 4, 4, 3, 4, 5];
  const yardages = [380, 410, 175, 520, 395, 365, 190, 430, 545, 400, 385, 165, 510, 370, 420, 200, 405, 530];

  for (let i = 0; i < 18; i++) {
    const holeNum = i + 1;
    // Offset each hole slightly
    const latOff = (i % 6) * 0.002;
    const lngOff = Math.floor(i / 6) * 0.003;

    const teeLat = baseLat + latOff;
    const teeLng = baseLng + lngOff;
    const greenLat = teeLat + 0.0015;
    const greenLng = teeLng + 0.0005;

    holes.push({
      holeNumber: holeNum,
      par: pars[i]!,
      yardage: yardages[i]!,
      teeBox: { lat: teeLat, lng: teeLng },
      fairwayOutline: [
        { lat: teeLat + 0.0002, lng: teeLng - 0.0003 },
        { lat: teeLat + 0.0002, lng: teeLng + 0.0003 },
        { lat: greenLat - 0.0001, lng: greenLng + 0.0003 },
        { lat: greenLat - 0.0001, lng: greenLng - 0.0003 },
      ],
      greenOutline: [
        { lat: greenLat - 0.0001, lng: greenLng - 0.0002 },
        { lat: greenLat + 0.0001, lng: greenLng - 0.0002 },
        { lat: greenLat + 0.0001, lng: greenLng + 0.0002 },
        { lat: greenLat - 0.0001, lng: greenLng + 0.0002 },
      ],
      hazards: holeNum % 3 === 0
        ? [
            {
              type: 'bunker',
              outline: [
                { lat: greenLat - 0.0002, lng: greenLng + 0.0003 },
                { lat: greenLat - 0.0001, lng: greenLng + 0.0004 },
                { lat: greenLat, lng: greenLng + 0.0003 },
              ],
            },
          ]
        : [],
      greenCenter: { lat: greenLat, lng: greenLng },
      greenFront: { lat: greenLat - 0.0001, lng: greenLng },
      greenBack: { lat: greenLat + 0.0001, lng: greenLng },
    });
  }

  return holes;
}

export default courses;
