import { apiFetch } from '../lib/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

// --- Geometry types ---

export interface HazardZone {
  type: 'bunker' | 'water' | 'lateral_water' | 'out_of_bounds';
  outline: { lat: number; lng: number }[];
}

export interface HoleGeometry {
  holeNumber: number;
  par: number;
  yardage: number;
  teeBox: { lat: number; lng: number };
  fairwayOutline: { lat: number; lng: number }[];
  greenOutline: { lat: number; lng: number }[];
  hazards: HazardZone[];
  greenCenter: { lat: number; lng: number };
  greenFront: { lat: number; lng: number };
  greenBack: { lat: number; lng: number };
}

export interface CourseGeometry {
  courseId: string;
  holes: HoleGeometry[];
  cachedAt: number; // Date.now() timestamp
  provider: 'golfcourseapi' | 'igolf';
}

const GEOMETRY_CACHE_PREFIX = 'course-geometry-';
const GEOMETRY_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

// --- Interface ---

export interface CourseDataProvider {
  searchCourses(query: string, lat?: number, lng?: number): Promise<Course[]>;
  getDistanceToPin(lat: number, lng: number, holeData: HoleLayout): DistanceResult;
  getCourseGeometry(courseId: string): Promise<CourseGeometry | null>;
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

  async getCourseGeometry(courseId: string): Promise<CourseGeometry | null> {
    const cacheKey = `${GEOMETRY_CACHE_PREFIX}${courseId}`;

    // Check local cache first
    try {
      const cached = await AsyncStorage.getItem(cacheKey);
      if (cached) {
        const parsed: CourseGeometry = JSON.parse(cached);
        const age = Date.now() - parsed.cachedAt;
        if (age < GEOMETRY_TTL_MS) {
          return parsed;
        }
        // Cache expired — will try to fetch fresh, but keep stale as fallback
      }
    } catch {
      // Cache read failed — proceed to fetch
    }

    // Fetch from API
    try {
      const res = await apiFetch<CourseGeometry>(`/courses/${courseId}/geometry`);
      const geometry: CourseGeometry = {
        ...res,
        courseId,
        cachedAt: Date.now(),
        provider: res.provider ?? 'golfcourseapi',
      };

      // Cache the result
      try {
        await AsyncStorage.setItem(cacheKey, JSON.stringify(geometry));
      } catch {
        // Cache write failure — geometry still usable in memory
      }

      return geometry;
    } catch {
      // Fetch failed — try returning stale cache
      try {
        const stale = await AsyncStorage.getItem(cacheKey);
        if (stale) {
          return JSON.parse(stale) as CourseGeometry;
        }
      } catch {
        // Stale cache also unavailable
      }

      return null;
    }
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
