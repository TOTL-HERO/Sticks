// ─── Booking Provider Interfaces & Implementations ───────────────────────────
// Provider-pattern abstraction for tee time booking across foreUP and GolfNow.
// TODO: Replace mock implementations with real API calls when credentials are available.

export interface TeeTimeSearchParams {
  date: string;           // YYYY-MM-DD
  courseId?: string;
  timeFrom?: string;      // HH:mm
  timeTo?: string;        // HH:mm
  players: number;
  lat?: number;
  lng?: number;
}

export interface TeeTimeResult {
  providerRefId: string;
  provider: 'FOREUP' | 'GOLFNOW';
  courseName: string;
  courseId: string;
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
}

export interface BookingProvider {
  search(params: TeeTimeSearchParams): Promise<TeeTimeResult[]>;
  book(providerRefId: string, userId: string, players: number): Promise<BookingConfirmation>;
  cancel(providerRefId: string): Promise<{ success: boolean; refundEligible: boolean }>;
  refund(providerRefId: string): Promise<{ success: boolean; refundAmount: number }>;
}

// ─── ForeUP Provider ─────────────────────────────────────────────────────────
// TODO: Replace mock data with real foreUP API calls using FOREUP_API_KEY env var.
// foreUP is the primary provider — dominant in Utah market.

export class ForeUpProvider implements BookingProvider {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.FOREUP_API_KEY || '';
  }

  async search(params: TeeTimeSearchParams): Promise<TeeTimeResult[]> {
    // TODO: Replace with real foreUP API call:
    // const res = await fetch(`https://foreupsoftware.com/api/booking/times?date=${params.date}&course_id=${params.courseId}`, {
    //   headers: { Authorization: `Bearer ${this.apiKey}` },
    // });

    // Mock realistic Utah course data
    const utahCourses = [
      { name: 'Thanksgiving Point Golf Club', id: 'foreup-tp-001', price: 55 },
      { name: 'Soldier Hollow Golf Course', id: 'foreup-sh-002', price: 45 },
      { name: 'Hobble Creek Golf Course', id: 'foreup-hc-003', price: 38 },
      { name: 'Fox Hollow Golf Club', id: 'foreup-fh-004', price: 42 },
      { name: 'Alpine Country Club', id: 'foreup-ac-005', price: 65 },
    ];

    const times = ['07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00'];
    const results: TeeTimeResult[] = [];

    for (const course of utahCourses) {
      if (params.courseId && course.id !== params.courseId) continue;

      for (const time of times) {
        if (params.timeFrom && time < params.timeFrom) continue;
        if (params.timeTo && time > params.timeTo) continue;

        const spots = Math.floor(Math.random() * 4) + 1;
        if (spots < params.players) continue;

        results.push({
          providerRefId: `foreup-${course.id}-${params.date}-${time}`,
          provider: 'FOREUP',
          courseName: course.name,
          courseId: course.id,
          datetime: `${params.date}T${time}:00`,
          availableSpots: spots,
          pricePerPlayer: course.price,
          totalPrice: course.price * params.players,
        });
      }
    }

    return results;
  }

  async book(providerRefId: string, userId: string, players: number): Promise<BookingConfirmation> {
    // TODO: Replace with real foreUP API reservation call
    // const res = await fetch('https://foreupsoftware.com/api/booking/reserve', {
    //   method: 'POST',
    //   headers: { Authorization: `Bearer ${this.apiKey}`, 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ tee_time_id: providerRefId, players }),
    // });

    const confirmationNumber = `FU-${Date.now().toString(36).toUpperCase()}`;
    const parts = providerRefId.split('-');
    const datetime = parts.slice(-2).join('T') + ':00';

    return {
      providerRefId,
      confirmationNumber,
      provider: 'FOREUP',
      courseName: 'Thanksgiving Point Golf Club', // TODO: resolve from providerRefId
      datetime,
      players,
      totalPrice: 55 * players, // TODO: resolve real price from foreUP
    };
  }

  async cancel(providerRefId: string): Promise<{ success: boolean; refundEligible: boolean }> {
    // TODO: Replace with real foreUP API cancellation call
    return { success: true, refundEligible: true };
  }

  async refund(providerRefId: string): Promise<{ success: boolean; refundAmount: number }> {
    // TODO: Replace with real foreUP API refund call
    return { success: true, refundAmount: 55 }; // TODO: resolve real amount
  }
}

// ─── GolfNow Provider ────────────────────────────────────────────────────────
// TODO: Replace mock data with real GolfNow API calls using GOLFNOW_API_KEY env var.
// GolfNow is the national fallback when foreUP returns no results.

export class GolfNowProvider implements BookingProvider {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.GOLFNOW_API_KEY || '';
  }

  async search(params: TeeTimeSearchParams): Promise<TeeTimeResult[]> {
    // TODO: Replace with real GolfNow API call:
    // const res = await fetch(`https://api.golfnow.com/teetimes?date=${params.date}&players=${params.players}`, {
    //   headers: { 'X-Api-Key': this.apiKey },
    // });

    // Mock realistic Utah + national course data
    const courses = [
      { name: 'The Ledges Golf Club', id: 'golfnow-lg-001', price: 75 },
      { name: 'Entrada at Snow Canyon', id: 'golfnow-ec-002', price: 89 },
      { name: 'Sand Hollow Resort', id: 'golfnow-sh-003', price: 69 },
      { name: 'Coral Canyon Golf Course', id: 'golfnow-cc-004', price: 59 },
    ];

    const times = ['07:15', '08:15', '09:15', '10:15', '11:00'];
    const results: TeeTimeResult[] = [];

    for (const course of courses) {
      if (params.courseId && course.id !== params.courseId) continue;

      for (const time of times) {
        if (params.timeFrom && time < params.timeFrom) continue;
        if (params.timeTo && time > params.timeTo) continue;

        const spots = Math.floor(Math.random() * 4) + 1;
        if (spots < params.players) continue;

        results.push({
          providerRefId: `golfnow-${course.id}-${params.date}-${time}`,
          provider: 'GOLFNOW',
          courseName: course.name,
          courseId: course.id,
          datetime: `${params.date}T${time}:00`,
          availableSpots: spots,
          pricePerPlayer: course.price,
          totalPrice: course.price * params.players,
        });
      }
    }

    return results;
  }

  async book(providerRefId: string, userId: string, players: number): Promise<BookingConfirmation> {
    // TODO: Replace with real GolfNow API reservation call
    const confirmationNumber = `GN-${Date.now().toString(36).toUpperCase()}`;

    return {
      providerRefId,
      confirmationNumber,
      provider: 'GOLFNOW',
      courseName: 'The Ledges Golf Club', // TODO: resolve from providerRefId
      datetime: new Date().toISOString(),
      players,
      totalPrice: 75 * players, // TODO: resolve real price from GolfNow
    };
  }

  async cancel(providerRefId: string): Promise<{ success: boolean; refundEligible: boolean }> {
    // TODO: Replace with real GolfNow API cancellation call
    return { success: true, refundEligible: true };
  }

  async refund(providerRefId: string): Promise<{ success: boolean; refundAmount: number }> {
    // TODO: Replace with real GolfNow API refund call
    return { success: true, refundAmount: 75 }; // TODO: resolve real amount
  }
}
