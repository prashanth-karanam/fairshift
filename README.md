# FairShift

FairShift is a web platform for daily-wage and frontline shift workers in India, focused on statutory pay guarantees, transparent overtime logging, and retaliation-free site safety reporting.

It is built around the practical realities of construction sites, warehouse docks, and campus maintenance facilities—where workers need simple, high-legibility interfaces with clear rupee totals, and site managers need verified headcount and compliance tracking.

---

## Why this exists

Informal and contract workers across construction, logistics, and facilities often face three recurring issues:

1. **Uncertain or delayed wages**: Workers finish 8 to 10 hours of manual labor with no formal record of overtime or promised allowances, leaving payouts subject to contractor disputes.
2. **Attendance friction**: Paper logs and fingerprint scanners frequently fail in dusty, outdoor environments, leading to disputed hours.
3. **Fear of reporting hazards**: Reporting damaged scaffolding, faulty wiring, or missing safety gear often risks immediate dismissal or lost work days.

FairShift addresses these directly:
- **Daily wage clarity**: Hourly and shift breakdowns calculate regular pay, overtime multipliers (1.5x under BOCW regulations), and hazard allowances in real time.
- **Smart escrow protection**: Available shifts show upfront guaranteed escrow amounts held for the shift.
- **GPS geofence check-ins**: Workers confirm site presence within a 50m radar geofence with one tap, including voice audio guidance.
- **Anonymous hazard reporting**: Field workers can log safety concerns without attaching their identity to the ticket, preventing retaliation.

---

## What's in the app

### Worker Interface
- **Available Shifts**: Nearby open work within 5 km across construction, warehousing, and facilities. Shows verified daily rate, start time, distance, and one-tap application.
- **Live Shift Tracker**: Active shift timer showing accrued earnings, overtime rate multipliers, and instant digital clock-out to UPI.
- **Site Check-In**: Geofenced radar verification confirming proximity to the physical site gate with voice feedback.
- **Worksite Reviews**: Peer-validated site conditions and transparent reviews from fellow workers.
- **Worker Profile**: Attendance record, verified trade certifications, and safety badges.

### Contractor & Employer Dashboard
- **Active Site Headcount**: Live on-site worker count, total shift hours logged, and real-time escrow liabilities.
- **Compliance & Rest Monitoring**: Shift timers flag workers approaching maximum consecutive shift limits to prevent fatigue-related accidents.
- **Safety Triage**: Immediate review of anonymous hazard tickets submitted from the ground.
- **Statutory Records**: Automatic BOCW Act compliance logging and daily shift summary exports.

---

## Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS v4, Plus Jakarta Sans, JetBrains Mono
- **Routing**: React Router v7 (HashRouter for zero-config routing on static hosts)
- **Icons**: Lucide React
- **Voice/Audio**: Web Speech API for multilingual voice summaries

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/prashanth-karanam/fairshift.git
   cd fairshift
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. Build for production:
   ```bash
   npm run build
   ```

---

## Project Structure

```
fairshift/
├── src/
│   ├── layouts/
│   │   └── WorkerLayout.jsx          # Mobile-first shell and navigation bar
│   ├── pages/
│   │   ├── RoleGateway.jsx           # Initial role selection (Worker / Employer)
│   │   ├── employer/
│   │   │   └── EmployerDashboard.jsx # Site command center & compliance roster
│   │   └── worker/
│   │       ├── AvailableJobs.jsx     # Live shift feed with proximity filters
│   │       ├── ShiftWageTracker.jsx  # Real-time earnings and clock-out
│   │       ├── LocationCheckIn.jsx   # Geofence radius check-in and checklist
│   │       ├── SiteReviews.jsx       # Anonymous community reviews
│   │       └── WorkerProfile.jsx     # Dual ratings and credentials
│   ├── App.jsx                       # Application routes
│   ├── index.css                     # Theme definitions and responsive utilities
│   └── main.jsx                      # Root mount with HashRouter
├── vercel.json                       # Static rewrite configuration for Vercel
└── vite.config.js                    # Vite build setup
```

---

## Deployment

FairShift uses `HashRouter`, making it directly hostable on any static hosting provider without server rewrites:

- **Vercel**: Pre-configured via `vercel.json`. Push to `main` to trigger builds.
- **GitHub Pages**: Build output in `dist` can be served directly from GitHub Actions.

---

## License

MIT
