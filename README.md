# ⚡ FairShift — Frontline Workforce Platform

[![React](https://img.shields.io/badge/React-19.3-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![UN SDG 8](https://img.shields.io/badge/UN%20SDG%208-Decent%20Work%20%26%20Economic%20Growth-A21942?logo=united-nations&logoColor=white)](https://sdgs.un.org/goals/goal8)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **Fair Shifts. Fair Pay. Full Transparency.**  
> An industrial-grade, mission-critical frontline workforce platform engineered to enforce labor standards, provide real-time wage escrow transparency, and protect worker safety through zero-retaliation reporting. Rooted in the mandate of **UN Sustainable Development Goal 8 (Decent Work & Economic Growth)**.

---

## 🌟 Key Capabilities

### 👷 1. Frontline Worker Hub (Mobile-Optimized)
- **⚡ Available Shifts Marketplace**: Filter by proximity (<5km), urgent callouts, high pay, and sector (Construction, Logistics, Facilities). One-tap application with guaranteed smart wage escrow.
- **⏱️ Live Shift & Wage Tracker**: Real-time earnings counter, active clock-in status, overtime multiplier breakdown (1.5x/2.0x), and immutable settlement history.
- **📍 GPS Geofence & Biometric Check-In**: High-accuracy radar check-in (±2m accuracy), automated route navigation, audio voice assistant announcement, and geofence clearance verification.
- **🛡️ Community Site Intel & Anonymous Reviews**: ZK-Shield identity obfuscation protecting workers against contractor retaliation. Peer truth consensus voting (True/False peer validation).
- **⭐ Dual Reputation Engine**: Symmetric credibility system tracking both contractor ratings of worker craftsmanship and peer worker ratings of worksite safety.

### 🏢 2. Employer Command Hub (Desktop Dashboard)
- **📡 Real-Time Operational Telemetry**: Live frontline headcount, accrued payroll vs. locked escrow pool (e.g., ₹4.2L), and statutory compliance index (98.4%).
- **❤️ Algorithmic Fatigue Radar**: Predictive fatigue monitoring flagging shifts exceeding safety thresholds (>9h / >11h) with supervisory rest nudges and emergency lockout.
- **📋 Live Workforce Roster**: Searchable and filterable roster (All, Overtime, Stand-down Risk, Completed) with supervisory actions (*Nudge Rest*, *Force Stand-down*, *Clockout Ready*).
- **⚠️ Zero-Retaliation Hazard Triage Queue**: Real-time feed of anonymous frontline hazard reports with peer validation percentages, severity classification, and one-click mitigation.
- **📜 BOCW Act (1996) Statutory Audit**: Automated compliance attestation with statutory cess accrual (1.0%) and labor inspector dossier export (PDF/CSV).

---

## 🛠️ Tech Stack & Design System

- **Frontend Framework**: [React 19](https://react.dev) with [Vite](https://vitejs.dev)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com) with CSS custom properties
- **Icons**: [Lucide React](https://lucide.dev)
- **Routing**: [React Router v7](https://reactrouter.com) (configured with `HashRouter` for zero-configuration GitHub Pages & static hosting compatibility)
- **Typography**: 
  - `Inter` for structured headings and labels
  - `JetBrains Mono` for tabular metrics, timestamps, and financial data
- **Design Aesthetic**: Industrial high-contrast brutalism (Dark Zinc substrate `#09090B`, Safety Yellow `#FACC15`, Emerald `#10B981`, Alert Rose `#F43F5E`)

---

## 🚀 Getting Started (Run Locally)

### Prerequisites
- [Node.js](https://nodejs.org) (v18 or higher recommended)
- `npm`, `pnpm`, or `yarn`

### 1. Clone the repository
```bash
git clone https://github.com/your-username/fairshift.git
cd fairshift
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production
```bash
npm run build
```
The optimized production bundle will be generated in the `dist/` directory.

To preview the production build locally:
```bash
npm run preview
```

---

## 🌐 GitHub Pages & Cloud Deployment

### Option A: Automatic GitHub Pages Deployment (Included!)
A GitHub Actions workflow is pre-configured at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "feat: initial commit of FairShift platform"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```
2. In your GitHub repository:
   - Navigate to **Settings** > **Pages**
   - Under **Build and deployment** > **Source**, select **GitHub Actions**
3. The workflow will automatically build and deploy the app to `https://<your-username>.github.io/<your-repo>/`.

### Option B: Deploy to Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)
1. Import the repository into [Vercel](https://vercel.com).
2. Framework Preset: **Vite**.
3. Root Directory: `./`.
4. Click **Deploy**.

### Option C: Deploy to Netlify
1. Connect your repository on [Netlify](https://netlify.com).
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Click **Deploy Site**.

---

## 📂 Project Architecture

```
fairshift/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Pages CI/CD workflow
├── design_reference/           # Original extracted Stitch mockups & design docs
│   ├── fairshift/DESIGN.md     # Industrial dark design tokens
│   ├── field_utility/DESIGN.md # Utilitarian field light design tokens
│   ├── glacier/DESIGN.md       # Glassmorphism design tokens
│   └── */                      # Screen mockups (HTML & PNG previews)
├── public/                     # Static assets
├── src/
│   ├── assets/                 # Icons and imagery
│   ├── layouts/
│   │   └── WorkerLayout.jsx    # Mobile worker shell with 5-tab sticky bottom navigation
│   ├── pages/
│   │   ├── RoleGateway.jsx     # Landing / Role Gateway (Worker vs Employer)
│   │   ├── employer/
│   │   │   └── EmployerDashboard.jsx  # Desktop command hub with roster & hazard triage
│   │   └── worker/
│   │       ├── AvailableJobs.jsx      # Shift marketplace & 1-tap apply
│   │       ├── ShiftWageTracker.jsx   # Real-time earnings & overtime telemetry
│   │       ├── LocationCheckIn.jsx    # GPS geofence, radar map & audio check-in
│   │       ├── SiteReviews.jsx        # ZK-anonymous reviews & peer truth voting
│   │       └── WorkerProfile.jsx      # Dual ratings & certifications profile
│   ├── App.jsx                 # Route definitions
│   ├── index.css               # Design system tokens & utility classes
│   └── main.jsx                # App bootstrap (HashRouter)
├── index.html                  # HTML entry point with meta tags & Google fonts
├── package.json                # Project dependencies and build scripts
└── vite.config.js              # Vite configuration (React, Tailwind v4, relative base)
```

---

## ⚖️ License & Compliance

Distributed under the **MIT License**.  
Engineered in compliance with **UN SDG 8** (Target 8.5 & 8.8: Protection of labor rights and safe, secure working environments for all workers).
