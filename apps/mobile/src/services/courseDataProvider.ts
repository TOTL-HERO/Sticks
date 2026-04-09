import { apiFetch } from '../lib/api';

// --- Types ---

export interface Course {
  id: string;
  name: string;
  location: { lat: number; lng: number; city: string; state: string };
  imageUrl?: string | null;
  holeCount: number;
  par: number;
}

export interface HoleLayout {
  holeNumber: number;
  par: number;
  yardage: number;
  greenCenter: { lat: number; lng: number };
  greenFront: { lat: number; lng: number };
  greenBack: { lat: number; lng: number };
}

export interface DistanceResult {
  front: number;
  center: number;
  back: number;
}

// --- Interface ---

export interface CourseDataProvider {
  searchCourses(query: string, lat?: number, lng?: number): Promise<Course[]>;
  getDistanceToPin(lat: number, lng: number, holeData: HoleLayout): DistanceResult;
}

// --- Haversine helper (meters) ---

function haversineMeters(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const R = 6371000;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function metersToYards(m: number): number {
  return Math.round(m * 1.09361);
}

// --- GolfCourseAPI.com provider ---

export class GolfCourseApiProvider implements CourseDataProvider {
  async searchCourses(query: string, lat?: number, lng?: number): Promise<Course[]> {
    const params = new URLSearchParams({ query });
    if (lat !== undefined) params.set('lat', String(lat));
    if (lng !== undefined) params.set('lng', String(lng));

    const res = await apiFetch<{ courses: Course[] }>(
      `/courses/search?${params.toString()}`,
    );
    return res.courses ?? [];
  }

  getDistanceToPin(lat: number, lng: number, holeData: HoleLayout): DistanceResult {
    return {
      front: metersToYards(haversineMeters(lat, lng, holeData.greenFront.lat, holeData.greenFront.lng)),
      center: metersToYards(haversineMeters(lat, lng, holeData.greenCenter.lat, holeData.greenCenter.lng)),
      back: metersToYards(haversineMeters(lat, lng, holeData.greenBack.lat, holeData.greenBack.lng)),
    };
  }
}

// --- Factory (swappable later to iGolf) ---

let activeProvider: CourseDataProvider = new GolfCourseApiProvider();

export function getCourseDataProvider(): CourseDataProvider {
  return activeProvider;
}

export function setCourseDataProvider(provider: CourseDataProvider): void {
  activeProvider = provider;
}
