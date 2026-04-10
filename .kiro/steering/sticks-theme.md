---
inclusion: fileMatch
fileMatchPattern: "apps/mobile/src/**/*.tsx"
---

# Sticks Theme Guide

When writing or modifying React Native components in the Sticks mobile app, use the centralized theme from `apps/mobile/src/theme.ts`.

## Import pattern
```typescript
import { colors, fonts, spacing, radii, tabBar } from '../theme';
// or from deeper paths:
import { colors, fonts } from '../../theme';
```

## Key values
- Background: `colors.bg` (#101511)
- Card background: `colors.card` (#1c211c)
- Border: `colors.border` (#3f4943)
- Primary green: `colors.green` (#84d7af)
- Dark green (buttons): `colors.greenDark` (#006747)
- Gold accent: `colors.gold` (#e9c349)
- Text primary: `colors.text` (#dfe4dd)
- Text secondary: `colors.textSecondary` (#bec9c1)
- Text muted: `colors.textMuted` (#88938c)
- Heading font: `fonts.heading` (Newsreader)
- Body font: `fonts.body` (Manrope)
- Tab bar content padding: `tabBar.contentPadding` (100px)

## Scoring colors
- Eagle or better: `colors.eagle` (gold)
- Birdie: `colors.birdie` (green)
- Par: `colors.par` (neutral)
- Bogey: `colors.bogey` (light red)
- Double bogey+: `colors.doubleBogey` (darker red)

## Rules
- Never hardcode color hex values in components — always reference `colors.*`
- Use `fonts.heading` for screen titles, `fonts.body` for everything else
- All scrollable content should have `paddingBottom: tabBar.contentPadding` to clear the tab bar
- Card components use `colors.card` background with `colors.border` border and `radii.md` border radius
