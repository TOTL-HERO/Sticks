// ─── Booking Provider Interfaces & Implementations ───────────────────────────
// Provider-pattern abstraction for tee time booking across foreUP and GolfNow.
// TODO: Replace mock implementations with real API calls when credentials are available.

export type TimeOfDay = 'morning' | 'afternoon' | 'twilight';

export interface TeeTimeSearchParams {
  date: string;           // YYYY-MM-DD
  courseId?: string;
  timeFrom?: string;      // HH:mm
  timeTo?: string;        // HH:mm
  timeOfDay?: TimeOfDay;  // morning | afternoon | twilight
  players: number;
  lat?: number;
  lng?: number;
}

export interface TeeTimeResult {
  providerRefId: string;
  provider: 'FOREUP' | 'GOLFNOW';
  courseName: string;
  courseId: string;
  courseDescription: string;
  datetime: string;       // ISO 8601
  availableSpots: number;
  pricePerPlayer: number;
  totalPrice: number;
}

export interface BookingConfirmation {
  providerRefId: string;
  confirmationNumber: string;
  provider: 'FOREUP' | 'GOLFNOW';
  courseName: string;
  datetime: string;
  players: number;
  totalPrice: number;
  splitDetails?: SplitDetails;
}

export interface SplitDetails {
  totalAmount: number;
  playerCount: number;
  perPlayerAmount: number;
  paymentRequests: { id: string; userId: string; amount: number; status: string; dueAt: string }[];
}

export interface BookingProvider {
  search(params: TeeTimeSearchParams): Promise<TeeTimeResult[]>;
  book(providerRefId: string, userId: string, players: number, paymentMethodId?: string): Promise<BookingConfirmation>;
  cancel(providerRefId: string): Promise<{ success: boolean; refundEligible: boolean }>;
  refund(providerRefId: string): Promise<{ success: boolean; refundAmount: number }>;
}

// ─── Time-of-day filter helper ────────────────────────────────────────────────

export function resolveTimeRange(timeOfDay?: TimeOfDay): { timeFrom?: string; timeTo?: string } {
  if (!timeOfDay) return {};
  if (timeOfDay === 'morning')   return { timeFrom: '00:00', timeTo: '11:59' };
  if (timeOfDay === 'afternoon') return { timeFrom: '12:00', timeTo: '15:59' };
  if (timeOfDay === 'twilight')  return { timeFrom: '16:00', timeTo: '23:59' };
  return {};
}

// ─── Static Utah mock course data ────────────────────────────────────────────

interface MockCourse {
  id: string;
  name: string;
  description: string;
  location: string;
  priceByTimeOfDay: { morning: number; afternoon: number; twilight: number };
  teeTimes: { time: string; availableSpots: number }[];
}

const UTAH_COURSES: MockCourse[] = [
  {
    id: 'bonneville-001',
    name: 'Bonneville Golf Course',
    description: 'A classic Salt Lake City municipal course with views of the Wasatch Front. 18 holes of tree-lined fairways and well-maintained greens.',
    location: 'Salt Lake City, UT',
    priceByTimeOfDay: { morning: 45, afternoon: 38, twilight: 28 },
    teeTimes: [
      { time: '07:00', availableSpots: 4 },
      { time: '08:30', availableSpots: 2 },
      { time: '10:00', availableSpots: 3 },
      { time: '13:00', availableSpots: 4 },
      { time: '15:30', availableSpots: 2 },
      { time: '17:00', availableSpots: 4 },
    ],
  },
  {
    id: 'soldier-hollow-002',
    name: 'Soldier Hollow Golf Course',
    description: 'Olympic venue turned public course in the Heber Valley with stunning mountain panoramas. Two 18-hole courses at 5,600 feet elevation.',
    location: 'Midway, UT',
    priceByTimeOfDay: { morning: 55, afternoon: 48, twilight: 35 },
    teeTimes: [
      { time: '07:30', availableSpots: 4 },
      { time: '09:00', availableSpots: 3 },
      { time: '10:30', availableSpots: 2 },
      { time: '12:00', availableSpots: 4 },
      { time: '14:30', availableSpots: 3 },
      { time: '17:30', availableSpots: 4 },
    ],
  },
  {
    id: 'east-bay-003',
    name: 'East Bay Golf Course',
    description: "Provo's premier public course along the shores of Utah Lake. Flat, walkable layout with wide fairways — great for all skill levels.",
    location: 'Provo, UT',
    priceByTimeOfDay: { morning: 40, afternoon: 35, twilight: 25 },
    teeTimes: [
      { time: '06:30', availableSpots: 4 },
      { time: '08:00', availableSpots: 2 },
      { time: '09:30', availableSpots: 4 },
      { time: '12:30', availableSpots: 3 },
      { time: '15:00', availableSpots: 4 },
      { time: '17:00', availableSpots: 2 },
    ],
  },
  {
    id: 'stonebridge-004',
    name: 'Stonebridge Golf Club',
    description: "West Valley City's championship layout with challenging water features on 12 of 18 holes. Host of multiple Utah State Amateur qualifiers.",
    location: 'West Valley City, UT',
    priceByTimeOfDay: { morning: 50, afternoon: 42, twilight: 30 },
    teeTimes: [
      { time: '07:00', availableSpots: 3 },
      { time: '08:30', availableSpots: 4 },
      { time: '10:00', availableSpots: 2 },
      { time: '13:30', availableSpots: 4 },
      { time: '15:00', availableSpots: 3 },
      { time: '18:00', availableSpots: 4 },
    ],
  },
];

function getPriceForTime(course: MockCourse, time: string): number {
  const hour = parseInt(time.split(':')[0]!, 10);
  if (hour < 12) return course.priceByTimeOfDay.morning;
  if (hour < 16) return course.priceByTimeOfDay.afternoon;
  return course.priceByTimeOfDay.twilight;
}

// ─── ForeUP Provider ─────────────────────────────────────────────────────────

export class ForeUpProvider implements BookingProvider {
  async search(params: TeeTimeSearchParams): Promise<TeeTimeResult[]> {
    // TODO: Replace with real foreUP API call when FOREUP_API_KEY is available

    // Resolve time range from timeOfDay filter
    const timeRange = resolveTimeRange(params.timeOfDay);
    const effectiveFrom = params.timeFrom ?? timeRange.timeFrom;
    const effectiveTo = params.timeTo ?? timeRange.timeTo;

    const results: TeeTimeResult[] = [];

    for (const course of UTAH_COURSES) {
      if (params.courseId && course.id !== params.courseId) continue;

      for (const slot of course.teeTimes) {
        if (effectiveFrom && slot.time < effectiveFrom) continue;
        if (effectiveTo && slot.time > effectiveTo) continue;
        if (slot.availableSpots < params.players) continue;

        const price = getPriceForTime(course, slot.time);

        results.push({
          providerRefId: `foreup-${course.id}-${params.date}-${slot.time.replace(':', '')}`,
          provider: 'FOREUP',
          courseName: course.name,
          courseId: course.id,
          courseDescription: course.description,
          datetime: `${params.date}T${slot.time}:00`,
          availableSpots: slot.availableSpots,
          pricePerPlayer: price,
          totalPrice: price * params.players,
        });
      }
    }

    return results;
  }

  async book(providerRefId: string, userId: string, players: number, paymentMethodId?: string): Promise<BookingConfirmation> {
    // TODO: Replace with real foreUP API reservation call
    const confirmationNumber = `FU-${Date.now().toString(36).toUpperCase()}`;

    // Resolve course from providerRefId
    const courseId = providerRefId.split('-').slice(1, 3).join('-');
    const course = UTAH_COURSES.find((c) => providerRefId.includes(c.id)) ?? UTAH_COURSES[0]!;
    const timeStr = providerRefId.split('-').pop() ?? '0700';
    const time = `${timeStr.slice(0, 2)}:${timeStr.slice(2)}`;
    const price = getPriceForTime(course, time);

    return {
      providerRefId,
      confirmationNumber,
      provider: 'FOREUP',
      courseName: course.name,
      datetime: new Date().toISOString(),
      players,
      totalPrice: price * players,
    };
  }

  async cancel(providerRefId: string): Promise<{ success: boolean; refundEligible: boolean }> {
    return { success: true, refundEligible: true };
  }

  async refund(providerRefId: string): Promise<{ success: boolean; refundAmount: number }> {
    return { success: true, refundAmount: 45 };
  }
}

// ─── GolfNow Provider ────────────────────────────────────────────────────────

export class GolfNowProvider implements BookingProvider {
  async search(params: TeeTimeSearchParams): Promise<TeeTimeResult[]> {
    // TODO: Replace with real GolfNow API call when GOLFNOW_API_KEY is available
    // GolfNow is the national fallback — returns empty for Utah-specific searches
    return [];
  }

  async book(providerRefId: string, userId: string, players: number, paymentMethodId?: string): Promise<BookingConfirmation> {
    const confirmationNumber = `GN-${Date.now().toString(36).toUpperCase()}`;
    return {
      providerRefId,
      confirmationNumber,
      provider: 'GOLFNOW',
      courseName: 'Golf Course',
      datetime: new Date().toISOString(),
      players,
      totalPrice: 65 * players,
    };
  }

  async cancel(providerRefId: string): Promise<{ success: boolean; refundEligible: boolean }> {
    return { success: true, refundEligible: true };
  }

  async refund(providerRefId: string): Promise<{ success: boolean; refundAmount: number }> {
    return { success: true, refundAmount: 65 };
  }
}

// Export the static course data for testing
export { UTAH_COURSES };
