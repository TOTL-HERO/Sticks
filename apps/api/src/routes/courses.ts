import { Hono } from "hono";

const GOLF_API_KEY = process.env.GOLF_COURSE_API_KEY || "QOXQMJCWW6GXNV46I4KR6PNCFA";
const GOLF_API_BASE = "https://api.golfcourseapi.com/v1";

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

export default courses;
