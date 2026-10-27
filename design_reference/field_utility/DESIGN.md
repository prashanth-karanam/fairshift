---
name: Field Utility
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#4f4633'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#817660'
  outline-variant: '#d3c5ac'
  surface-tint: '#785a00'
  primary: '#785a00'
  on-primary: '#ffffff'
  primary-container: '#eab308'
  on-primary-container: '#604700'
  inverse-primary: '#f7be1d'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#00658e'
  on-tertiary: '#ffffff'
  tertiary-container: '#60c5ff'
  on-tertiary-container: '#005072'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdf9a'
  primary-fixed-dim: '#f7be1d'
  on-primary-fixed: '#251a00'
  on-primary-fixed-variant: '#5a4300'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#c7e7ff'
  tertiary-fixed-dim: '#83cfff'
  on-tertiary-fixed: '#001e2e'
  on-tertiary-fixed-variant: '#004c6c'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '800'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 26px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 22px
    letterSpacing: 0em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 18px
    letterSpacing: 0.02em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.06em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 1.5rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1.25rem
  space-xl: 2rem
---

## Brand & Style

This design system delivers an industrial-grade, utilitarian interface built specifically for frontline, field, and shift-based environments. The design language emphasizes high contrast, instantaneous glanceability, and zero visual ambiguity under challenging operational conditions—such as direct sunlight, glare, moving vehicles, and rugged mobile usage.

Rooted in a Modern Utilitarian style, the aesthetic pairs crisp, pure white and pale slate work-surfaces with high-visibility safety yellow signaling accents. Heavy decorative elements, ambient atmospheric blurs, and low-contrast subtlety are eliminated in favor of bold typographic weights, solid structural dividers, and deliberate touch targets. The experience feels engineered, dependable, and instantly legible—delivering operational certainty with zero cognitive drag.

## Colors

The color palette is engineered around high luminance contrast, safety signaling, and strict readability compliance:

- **Primary (`#EAB308` / Amber-Yellow 500):** Represents active state signaling, high-priority actions, focus indicators, and essential highlights. In interactive button states, pair this with deep slate text (`#0F172A`) to ensure WCAG AAA contrast compliance.
- **Secondary (`#0F172A` / Slate 900):** Serves as the bedrock dark tone for critical text hierarchy, active state badges, and primary framing containers.
- **Surfaces (`#FFFFFF`, `#F8FAFC`, `#F1F5F9`):** Pure white acts as the primary card and container base, layered over crisp off-white canvas backgrounds to preserve distinct container edges without relying on diffuse drop shadows.
- **Dividers & Borders (`#E2E8F0`, `#CBD5E1`):** Structural borders create clean, unmistakable delineations across field forms, tables, and card lists.
- **Functional Semantics:**
  - Success: `#16A34A` (Verified, Completed, Checked-in)
  - Warning: `#D97706` (Schedule Conflict, Overtime Approaching)
  - Critical/Destructive: `#DC2626` (Incident, Mandatory Safety Alert, Missed Shift)
  - Info: `#0284C7` (System Note, Shift Brief)

## Typography

Typography prioritizes instant scanning and optical stability across dynamic lighting conditions. `Inter` provides neutral, machined clarity with robust tall x-heights and open apertures.

All headline levels employ medium-to-bold weights to guarantee structural visibility at arm's length. Labels utilize tightened line heights and subtle letter tracking to enhance scannability on dense dashboards, time clocks, and field badges. Numerical values, timestamps, and shift durations should systematically use tabular figures (`font-variant-numeric: tabular-nums`) to prevent optical jitter across live lists and tables.

## Layout & Spacing

Layouts follow an 8pt base grid with a 4pt sub-grid reserved for tight component spacing and compact data density.

- **Mobile (< 768px):** Single-column fluid stream with minimum 48px touch targets. Side canvas margin is 1rem (16px) with 0.75rem (12px) card gaps for maximized viewport efficiency.
- **Tablet (768px - 1024px):** Split master-detail grid with 1.5rem gutters and margins, facilitating side-by-side roster inspection and shift scheduling.
- **Desktop (> 1024px):** Fluid 12-column workspace bound by 2rem page padding, prioritizing dense data tables, schedule matrices, and shift analytics.

Component padding relies strictly on compact, predictable increments (`space-sm` to `space-lg`) to balance tap area precision with high vertical information density.

## Elevation & Depth

Visual hierarchy rejects fuzzy, diffused dropshadows that wash out under outdoor direct daylight. Depth is instead achieved through tonal surface stepping and crisp hairline borders:

- **Level 0 (Canvas Base):** Surface color `#F8FAFC` or `#F1F5F9`. Flat, non-interactive ground plane.
- **Level 1 (Card & Module Resting):** Surface color `#FFFFFF` bounded by a 1px solid border in `#E2E8F0`. No ambient shadow required.
- **Level 2 (Interactive Floating / Active State):** Surface color `#FFFFFF` with a 1px solid `#CBD5E1` border and a crisp, direct offset edge: `box-shadow: 0 2px 4px rgba(15, 23, 42, 0.08)`.
- **Level 3 (Modals, Overlays, Floating Action Banners):** Surface color `#FFFFFF` framed by a 1.5px border in `#0F172A` with a definitive utility drop: `box-shadow: 0 8px 16px -2px rgba(15, 23, 42, 0.16)`.
- **Focus & Selection Indication:** 2px high-visibility solid outline in primary `#EAB308` with a 1px outer ring in `#0F172A` for absolute contrast on any light background.

## Shapes

The shape vocabulary uses the `Soft` standard (`roundedness: 1`), implementing 0.25rem (4px) base corner radii across inputs, buttons, and chips. Larger grouping surfaces and cards scale to `rounded-lg` (0.5rem / 8px).

This subtle curvature softens industrial edges while retaining an unmistakable mechanical, tool-like posture. Pills and high-curvature radiuses are avoided, keeping cards and buttons compact, stackable, and space-efficient across dense handheld screens.

## Components

### Buttons
- **Primary:** Background `#EAB308`, text `#0F172A`, font-weight 700, border: 1px solid `#CA8A04`. Minimum touch height: 48px on mobile, 40px on desktop. Hover: `#CA8A04`.
- **Secondary:** Background `#0F172A`, text `#FFFFFF`, border: 1px solid `#0F172A`. Hover: `#1E293B`.
- **Outline / Utility:** Background `#FFFFFF`, text `#0F172A`, border: 1.5px solid `#CBD5E1`. Hover: `#F8FAFC` with `#0F172A` border.

### Chips & Badges
- **Status Badges:** Compact 24px height, uppercase `label-sm` tracking. Active/On-Duty: Light yellow `#FEF08A` background with `#854D0E` text and `#FACC15` border. Confirmed: `#DCFCE7` background with `#166534` text.
- **Filter Chips:** 32px height, 1px `#E2E8F0` border, resting on `#FFFFFF`. Selected state fills with `#0F172A` text `#FFFFFF`.

### Form Inputs & Selectors
- **Input Fields:** Background `#FFFFFF`, height 44px (48px for touch modes), border: 1.5px solid `#CBD5E1`, text `#0F172A`, placeholder `#94A3B8`.
- **Active Focus:** Border shifts to 2px solid `#0F172A` with an adjacent 2px `#EAB308` halo.
- **Labels:** Positioned outside/above inputs using `label-md` in `#334155`.

### Checkboxes & Radios
- Size: 20px x 20px (with 44px transparent touch target hit-box).
- Unchecked: `#FFFFFF` fill, 2px solid `#94A3B8` border.
- Checked: `#0F172A` fill with a sharp `#EAB308` tick mark, or `#EAB308` fill with `#0F172A` mark for high-visibility toggles.

### Cards & Shift Tiles
- Structural containers with `#FFFFFF` background, 1px solid `#E2E8F0` border, and 0.5rem (8px) radius.
- **Active / Assigned Indicator:** Left-border accent strip measuring 4px in width, using `#EAB308` for in-progress tasks or shifts, and `#16A34A` for verified handoffs.

### Emergency & Priority Callouts
- Banners utilizing 2px solid borders in `#DC2626` (Safety Halt) or `#EAB308` (Immediate Action Required), paired with bold, unyielding dark slate typography for zero-latency comprehension.