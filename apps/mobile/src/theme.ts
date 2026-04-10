/**
 * Sticks Design System — Single source of truth for colors, fonts, spacing.
 * Import from here instead of hardcoding values in components.
 */

export const colors = {
  // Backgrounds
  bg: '#101511',
  card: '#1c211c',
  cardHover: 'rgba(132,215,175,0.08)',

  // Borders
  border: '#3f4943',
  borderActive: '#84d7af',

  // Primary palette
  green: '#84d7af',
  greenDark: '#006747',
  greenDeep: '#003825',
  greenBg: 'rgba(132,215,175,0.15)',

  // Accent
  gold: '#e9c349',
  goldBg: 'rgba(233,195,73,0.1)',

  // Scoring colors
  eagle: '#e9c349',    // eagle or better
  birdie: '#84d7af',   // birdie
  par: '#dfe4dd',      // par
  bogey: '#ffb4ab',    // bogey
  doubleBogey: '#ff7961', // double bogey+

  // Text
  text: '#dfe4dd',
  textSecondary: '#bec9c1',
  textMuted: '#88938c',
  textPlaceholder: '#3f4943',

  // Status
  error: '#ffb4ab',
  errorBg: 'rgba(255,180,171,0.1)',
  warning: '#e9c349',
  success: '#84d7af',
  offline: '#ffb4ab',

  // Map
  fairwayFill: 'rgba(0, 103, 71, 0.25)',
  fairwayStroke: '#006747',
  greenFill: 'rgba(132, 215, 175, 0.35)',
  greenStroke: '#84d7af',
  bunkerFill: 'rgba(233, 195, 73, 0.3)',
  bunkerStroke: '#e9c349',
  waterFill: 'rgba(66, 133, 244, 0.3)',
  waterStroke: '#4285f4',
  playerDot: '#84d7af',
  targetCrosshair: '#e9c349',
} as const;

export const fonts = {
  heading: 'Newsreader',
  headingItalic: 'Newsreader-Italic',
  body: 'Manrope',
  bodyMedium: 'Manrope-Medium',
  bodySemiBold: 'Manrope-SemiBold',
  bodyBold: 'Manrope-Bold',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
} as const;

export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 999,
} as const;

export const tabBar = {
  height: 85,
  paddingBottom: 28,
  paddingTop: 8,
  bgColor: 'rgba(16, 21, 17, 0.7)',
  borderColor: 'rgba(63, 73, 67, 0.2)',
  activeColor: '#84d7af',
  inactiveColor: '#bec9c1',
  /** Content padding to clear the absolute-positioned tab bar (85 + ~34 safe area) */
  contentPadding: 120,
} as const;
