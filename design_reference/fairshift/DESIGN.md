---
name: FairShift
colors:
  surface: '#131316'
  surface-dim: '#131316'
  surface-bright: '#39393c'
  surface-container-lowest: '#0e0e11'
  surface-container-low: '#1b1b1e'
  surface-container: '#1f1f22'
  surface-container-high: '#2a2a2d'
  surface-container-highest: '#353438'
  on-surface: '#e4e1e6'
  on-surface-variant: '#d1c6ab'
  inverse-surface: '#e4e1e6'
  inverse-on-surface: '#303033'
  outline: '#9a9078'
  outline-variant: '#4d4632'
  surface-tint: '#eec200'
  primary: '#ffecb9'
  on-primary: '#3c2f00'
  primary-container: '#facc15'
  on-primary-container: '#6c5700'
  inverse-primary: '#735c00'
  secondary: '#4edea3'
  on-secondary: '#003824'
  secondary-container: '#00a572'
  on-secondary-container: '#00311f'
  tertiary: '#cef4ff'
  on-tertiary: '#003640'
  tertiary-container: '#61e1ff'
  on-tertiary-container: '#006273'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffe083'
  primary-fixed-dim: '#eec200'
  on-primary-fixed: '#231b00'
  on-primary-fixed-variant: '#574500'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#acedff'
  tertiary-fixed-dim: '#4cd7f6'
  on-tertiary-fixed: '#001f26'
  on-tertiary-fixed-variant: '#004e5c'
  background: '#131316'
  on-background: '#e4e1e6'
  surface-variant: '#353438'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 52px
    letterSpacing: -0.03em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 22px
    letterSpacing: 0em
  body-lg:
    fontFamily: JetBrains Mono
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: -0.01em
  body-md:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0em
  body-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0em
  data-metric:
    fontFamily: JetBrains Mono
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.02em
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.08em
  code-inline:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-2xs: 0.125rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
  space-2xl: 2rem
  space-3xl: 3rem
---

## Brand & Style

This design system establishes an unapologetic, high-contrast industrial fintech aesthetic built for high-stakes operational accountability. Rooted in the mandate of UN SDG 8 (Decent Work & Economic Growth), the interface balances human equity with institutional-grade fiscal transparency. 

The aesthetic is functional brutalism refined for mission-critical software: anti-gradient, high-density, and structured. Drawing direct inspiration from financial instruments and algorithmic trading interfaces, it rejects decorative micro-illustrations in favor of razor-sharp data displays, monospaced tabular accounting, and deliberate contrast tiers.

Surfaces rely on deep zinc-black substrates, punctured by high-visibility hazard yellow accents and functional status metrics. The emotional tone is authoritative, incorruptible, and tactile—evoking physical industrial machinery, flight-deck telemetry, and ledger ledgers.

## Colors

The palette operates on strict functional segregation. Color is never applied ornamentally; it conveys machine status, compliance health, or immediate user focus.

### Surface System
- **Void Canvas (`#09090B`)**: Base background for system shells, side rails, and top-level boundaries.
- **Card / Surface Default (`#18181B`)**: Primary component surface for panels, tabular groups, and input backgrounds.
- **Surface Elevated (`#27272A`)**: Hover states, active list selections, and popover container backgrounds.
- **Surface Subtle (`#3F3F46`)**: High-contrast divider rules, explicit component borders, and disabled fills.

### Functional Accents
- **Primary Brand Amber (`#FACC15`)**: High-visibility indicator representing active focus, execution buttons, and monetary allocations. Text placed on `#FACC15` must strictly resolve to `#09090B` at `fontWeight: 700`.
- **Safety Emerald (`#10B981`)**: Verified compliance, wage disbursement confirmed, shift completed, legal limits met.
- **Alert Rose (`#F43F5E`)**: Wage non-compliance, over-shift violation, dispute flag, system error.
- **Tech Cyan (`#06B6D4`)**: Live telemetry, active GPS verification, smart contract state, algorithmic matching.
- **Foreground Primary (`#FAFAFA`)**: 100% white-slate for all primary tabular readouts and structural headers.
- **Foreground Muted (`#A1A1AA`)**: Metadata, field labels, inactive indicators.

## Typography

The typographic hierarchy enforces a strict duality between operational declarations and mathematical data.

- **Inter** is reserved strictly for high-level structure: macro page titles, section identifiers, and key navigational nodes. It is set tightly with negative letter-spacing for structural rigidity.
- **JetBrains Mono** governs the functional core of the platform: all financial figures, worker timestamps, rate multipliers, body copy, tables, and micro-labels. All numerical displays must enforce `font-variant-numeric: tabular-nums` to guarantee non-shifting layout updates in real-time streaming states.
- **Casing Rules**: Technical annotations, status pills, table headers, and metric identifiers must use uppercase transformations via `label-caps` to evoke instrument panel labeling.

## Layout & Spacing

The layout is built upon an uncompromising 8-point geometric scale (with 4-point micro-increments), designed for maximum information density without visual crowding.

### Grid Rules
- **Desktop (1024px+)**: 12-column rigid fluid grid, `2rem` external margins, `1rem` internal gutters. Sidebar docks are pinned at fixed widths (`240px` or `280px`), with data canvases flexing across remaining space.
- **Tablet (768px - 1023px)**: 8-column layout, `1.5rem` external margins, `1rem` gutters. Split screens collapse into vertically stacked modular panels.
- **Mobile (<768px)**: 4-column layout, `1rem` external margins, `0.75rem` gutters. Metric strips transform into horizontally swipeable cards or single-column data stacks.

### Density Philosophy
Layouts avoid open, wasteful negative space. Padding within components uses compact units (`space-sm` to `space-md`) to ensure dense operational visibility. Complex financial dashboards must allow operators to view audit logs, active worker pools, and shift budgets within a single unscrollable viewport on typical desktop hardware.

## Elevation & Depth

This design system completely rejects soft, blurred, ambient shadows and skeuomorphic lighting drop-offs. In an industrial environment, simulated atmospheric depth obscures clarity. Depth is communicated strictly through tonal step-ups, border contrast, and tactile mechanical offset shadows.

### Elevation Tiers
1. **Level 0 (Base / Recessed)**: `#09090B`. Main canvas background, data table header baselines, inactive tab slots.
2. **Level 1 (Card / Shell)**: Surface `#18181B` bordered by `1px solid #27272A`. Zero blur shadow. Visual demarcation is 100% border-driven.
3. **Level 2 (Hover / Interactive)**: Surface transitions to `#27272A` with border `#3F3F46`.
4. **Level 3 (Tactile Elevated / Floating Modules & Menus)**: Surface `#18181B`, border `1px solid #3F3F46`, combined with a hard, mechanical 2D drop-shadow: `box-shadow: 4px 4px 0px 0px #000000`. No blur radius.
5. **Level 4 (Critical Modal / Operational Lockout)**: Surface `#18181B`, border `2px solid #FACC15`, accompanied by `box-shadow: 8px 8px 0px 0px #000000`. Backdrop is flattened with `#09090B` at 85% opacity without blur filters.

## Shapes

The geometry reflects precise metal milling. Roundedness is strictly constrained to Level 1 (`0.25rem` / `4px`).

- **Base Radius (`0.25rem`)**: Applied universally to buttons, input controls, card containers, tags, and data cells. Soft, circular UI is prohibited.
- **Extended Radius (`rounded-lg: 0.5rem`)**: Reserved strictly for top-level operational drawers or primary dialog boundaries.
- **Pills / Circles (`rounded-full`)**: Prohibited for buttons and containers. Permitted exclusively for miniature inline status pips (e.g., a `6px` live-connection green dot).

## Components

### Buttons
- **Primary / Tactical**: Background `#FACC15`, text `#09090B` (`fontWeight: 700`, JetBrains Mono), `border: 1px solid #EAB308`. Active click behavior applies a tactile press down: `transform: translate(1px, 1px)`.
- **Secondary / Technical**: Background `#18181B`, text `#FAFAFA`, border `1px solid #3F3F46`. Hover state highlights border to `#A1A1AA` and shifts background to `#27272A`.
- **Destructive**: Background `#18181B`, text `#F43F5E`, border `1px solid #F43F5E`. On active/hover: fills `#F43F5E` with `#FAFAFA` text.
- **Size Specs**: Padding `8px 16px` (sm) or `12px 20px` (md). Always uppercase monospaced labels.

### Input Fields
- Monospaced input values (`JetBrains Mono`, 13px).
- Surface `#18181B`, border `1px solid #27272A`, placeholder `#71717A`.
- **Focus State**: Non-blurred, sharp highlight: `border: 1px solid #FACC15; outline: 1px solid #FACC15;`.
- Prefix/Suffix slots display fixed gray currency symbols or units (e.g., `USD/HR`, `ETH`, `HRS`) encased in a `#27272A` divider box.

### Data Cards & Metrics
- Background `#18181B`, border `1px solid #27272A`, internal padding `16px`.
- Structure: Top row features a micro-label (`label-caps`, color `#A1A1AA`) paired with a functional status pip. Middle row features high-impact `data-metric` typography. Bottom row houses trend delta in `#10B981` (positive/compliant) or `#F43F5E` (overage/non-compliant).

### Status Badges & Chips
- Chunky, squared profile with `roundedness: 1`.
- Height: `22px`. Padding: `2px 8px`.
- Composition: Dark-tinted background with a high-contrast `1px` border matching the functional color. Text is always uppercase `10px` monospaced.
  - Success: BG `#064E3B` at 30%, Border `#10B981`, Text `#34D399`.
  - Alert: BG `#881337` at 30%, Border `#F43F5E`, Text `#FB7185`.
  - Amber/Caution: BG `#78350F` at 30%, Border `#FACC15`, Text `#FDE047`.

### Tables & Ledgers
- Table headers set to `11px` monospaced uppercase, sticky, bordered with bottom edge `2px solid #27272A`.
- Row height fixed at `40px` for optimal data density. Alternating subtle zebra striping optional; preferred pattern is `1px solid #1F1F23` horizontal border per row. Hover state triggers `#27272A` fill across the full row.

### Checkboxes & Selectors
- Rigid `16px x 16px` squares with `roundedness: 1` (`2px` border radius).
- Unchecked: `#18181B` with `1px solid #3F3F46`. Checked: `#FACC15` fill with a `#09090B` solid check icon.