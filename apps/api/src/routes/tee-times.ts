import { Hono } from "hono";

const teeTimes = new Hono();

// GET /tee-times — search tee times by date
// TODO: Replace mock data with real foreUP API integration when credentials are available
teeTimes.get("/", async (c) => {
  const date = c.req.query("date");

  if (!date) {
    return c.json(
      { error: "Missing required query parameter: date (YYYY-MM-DD)", statusCode: 400 },
      400,
    );
  }

  // Validate date format
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return c.json(
      { error: "Invalid date format. Use YYYY-MM-DD", statusCode: 400 },
      400,
    );
  }

  // TODO: Replace with real foreUP API call:
  // const response = await fetch(`https://foreupsoftware.com/api/...?date=${date}`, {
  //   headers: { Authorization: `Bearer ${process.env.FOREUP_API_KEY}` },
  // });

  const mockTeeTimes = [
    {
      id: "tt-001",
      time: `${date}T07:00:00`,
      courseName: "Thanksgiving Point Golf Club",
      availableSpots: 4,
      price: 55.0,
    },
    {
      id: "tt-002",
      time: `${date}T07:30:00`,
      courseName: "Thanksgiving Point Golf Club",
      availableSpots: 2,
      price: 55.0,
    },
    {
      id: "tt-003",
      time: `${date}T08:00:00`,
      courseName: "Soldier Hollow Golf Course",
      availableSpots: 4,
      price: 45.0,
    },
    {
      id: "tt-004",
      time: `${date}T09:15:00`,
      courseName: "Hobble Creek Golf Course",
      availableSpots: 3,
      price: 38.0,
    },
    {
      id: "tt-005",
      time: `${date}T10:00:00`,
      courseName: "Fox Hollow Golf Club",
      availableSpots: 4,
      price: 42.0,
    },
  ];

  return c.json({ teeTimes: mockTeeTimes });
});

export default teeTimes;
