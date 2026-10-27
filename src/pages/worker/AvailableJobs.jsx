import React, { useState, useMemo } from 'react';
import {
  MapPin,
  Search,
  Clock,
  Check,
  Flame,
  Zap,
  Bookmark,
  ShieldCheck,
  Star,
  HardHat,
  Package,
  Sparkles,
  SlidersHorizontal,
  X,
  BadgeCheck,
  CheckCircle2,
  Building2,
  Navigation
} from 'lucide-react';

const MOCK_JOBS = [
  {
    id: 1,
    company: 'Apex Infra Site 4B',
    title: 'Certified Scaffold Welder / Helper',
    pay: 950,
    unit: '/ 8.5h Shift',
    location: 'MIDC Industrial Gate 2, Navi Mumbai',
    distance: 1.8,
    time: '08:00 AM – 04:30 PM',
    sector: 'CONSTRUCTION',
    status: 'URGENT',
    spots: 'Starts in 2h • 2 Spots Left',
    rating: 4.9,
    reviews: 142,
    overtime: '+₹120/h Overtime',
    escrowAmount: '₹950',
    perks: ['Guaranteed Escrow', 'Free Lunch & PPE', 'Daily Instant Cashout'],
    urgent: true,
    sectorIcon: HardHat
  },
  {
    id: 2,
    company: 'Navi Mumbai Metro Pier #12',
    title: 'Steel Binding & Rebar Helper',
    pay: 880,
    unit: '/ 8h Shift',
    location: 'Sanpada Rail Yard Corridor',
    distance: 2.4,
    time: '08:00 AM – 04:30 PM',
    sector: 'CONSTRUCTION',
    status: 'INSTANT_APPROVAL',
    spots: 'Instant Approval • 4 spots',
    rating: 4.8,
    reviews: 98,
    overtime: '+₹110/h Overtime',
    escrowAmount: '₹880',
    perks: ['Free Lunch & PPE', 'Aadhaar Bio-Check', 'Tea Breaks'],
    urgent: false,
    sectorIcon: Building2
  },
  {
    id: 3,
    company: 'SRM Logistics Hub Turbhe',
    title: 'Package Sorter & High-Speed Loader',
    pay: 820,
    unit: '/ 8h Shift',
    location: 'Turbhe MIDC Logistics Zone',
    distance: 4.1,
    time: '09:00 PM – 05:00 AM (Night)',
    sector: 'WAREHOUSE',
    status: 'FILLING_FAST',
    spots: '2 Spots Left • Night Shift',
    rating: 4.6,
    reviews: 76,
    overtime: '+₹100/h Overtime',
    escrowAmount: '₹820',
    perks: ['AC Facility', 'Daily Instant UPI', 'Night Premium'],
    urgent: false,
    sectorIcon: Package
  },
  {
    id: 4,
    company: 'Phoenix Mall Facility Expansion',
    title: 'Deep Cleaning & Floor Maintenance Lead',
    pay: 750,
    unit: '/ 8h Shift',
    location: 'Seawoods Grand Central Plaza',
    distance: 5.8,
    time: 'Tomorrow, 09:00 AM – 05:00 PM',
    sector: 'SERVICES',
    status: 'OPEN',
    spots: '6 Spots Available',
    rating: 4.9,
    reviews: 110,
    overtime: '+₹95/h Overtime',
    escrowAmount: '₹750',
    perks: ['Uniform Provided', 'Clean Restrooms', 'Prompt UPI Transfer'],
    urgent: false,
    sectorIcon: Sparkles
  },
  {
    id: 5,
    company: 'SkyBridge Electrical Works',
    title: 'Electrician Helper & Conduit Laying',
    pay: 900,
    unit: '/ 8h Shift',
    location: 'Ghansoli Tech Park Zone',
    distance: 7.3,
    time: 'Tomorrow, 08:30 AM – 05:00 PM',
    sector: 'CONSTRUCTION',
    status: 'OPEN',
    spots: '3 Spots Available',
    rating: 4.7,
    reviews: 54,
    overtime: '+₹115/h Overtime',
    escrowAmount: '₹900',
    perks: ['Tools Provided', 'Overtime Double-Counted', 'Safety Insurance'],
    urgent: false,
    sectorIcon: HardHat
  }
];

export default function AvailableJobs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [savedJobs, setSavedJobs] = useState({ 1: true });
  const [appliedJobs, setAppliedJobs] = useState({});
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleApply = (id, company, escrow) => {
    setAppliedJobs(prev => ({ ...prev, [id]: true }));
    showToast(`Slot reserved at ${company}! ${escrow} locked in Smart Escrow.`);
  };

  const toggleSave = (id) => {
    setSavedJobs(prev => ({ ...prev, [id]: !prev[id] }));
    const isNowSaved = !savedJobs[id];
    showToast(isNowSaved ? 'Shift saved to bookmarks' : 'Shift removed from bookmarks');
  };

  const filterChips = [
    { id: 'ALL', label: 'All Shifts', icon: Sparkles },
    { id: '<5KM', label: '< 5km Radius', icon: Navigation },
    { id: 'TODAY', label: 'Today', icon: Clock },
    { id: 'CONSTRUCTION', label: 'Construction', icon: HardHat },
    { id: 'WAREHOUSE', label: 'Warehouse', icon: Package },
    { id: 'DAILY ₹800+', label: '₹800+ / Day', icon: Zap }
  ];

  const filteredJobs = useMemo(() => {
    return MOCK_JOBS.filter(job => {
      const matchesSearch =
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase());

      if (!matchesSearch) return false;

      if (activeFilter === '<5KM') return job.distance <= 5.0;
      if (activeFilter === 'TODAY') return job.time.includes('AM') || job.urgent;
      if (activeFilter === 'CONSTRUCTION') return job.sector === 'CONSTRUCTION';
      if (activeFilter === 'WAREHOUSE') return job.sector === 'WAREHOUSE';
      if (activeFilter === 'DAILY ₹800+') return job.pay >= 800;

      return true;
    });
  }, [searchTerm, activeFilter]);

  return (
    <div className="flex flex-col gap-6 text-slate-800 pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 backdrop-blur-md text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-xs font-semibold animate-in fade-in slide-in-from-top-2 border border-amber-400 max-w-[90vw]">
          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="truncate">{toastMessage}</span>
        </div>
      )}

      {/* Top Real-time Escrow Pulse Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-emerald-500/10 border border-amber-300/40 p-4 sm:p-5 rounded-3xl shadow-xs gap-3">
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <div className="flex flex-col">
            <span className="text-sm font-black text-slate-900 tracking-tight">
              38 Shifts Live Nearby (&lt;5km)
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Verified Statutory Escrow • Instant Post-Shift UPI Disbursal
            </span>
          </div>
        </div>

        <div className="self-start sm:self-auto flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-extrabold border border-emerald-200/80 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Escrow Locked</span>
          </span>
          <span className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-mono font-bold border border-slate-200">
            BOCW SEC-28
          </span>
        </div>
      </div>

      {/* Modern Search Input Bar (Spacious with Generous Icon Clearance - Never Overlaps) */}
      <div className="relative w-full">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center pointer-events-none text-slate-400">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search role, sector, or contractor..."
          className="w-full h-13 bg-white border border-slate-200/90 text-slate-900 placeholder:text-slate-400 text-sm pl-12 pr-12 rounded-2xl focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-200/60 transition-all shadow-xs"
        />
        {searchTerm ? (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        ) : (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
        )}
      </div>

      {/* Filter Chips Horizontal Carousel with Comfortable Spacing */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none -mx-2 px-2">
        {filterChips.map(chip => {
          const Icon = chip.icon;
          const isSelected = activeFilter === chip.id;
          return (
            <button
              key={chip.id}
              onClick={() => setActiveFilter(chip.id)}
              className={`flex items-center gap-2 whitespace-nowrap px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                isSelected
                  ? 'bg-amber-400 text-slate-950 shadow-sm border border-amber-500/40 scale-[1.02]'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200/80 shadow-xs'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-slate-950' : 'text-slate-400'}`} />
              <span>{chip.label}</span>
            </button>
          );
        })}
      </div>

      {/* Jobs Feed Grid: 1 Column on Mobile, 2 Columns on Desktop with Generous Breathing Room */}
      <div className="pt-1">
        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-slate-100 shadow-sm flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center mb-3">
              <Search className="w-7 h-7" />
            </div>
            <h3 className="font-extrabold text-base text-slate-900">No shifts match criteria</h3>
            <p className="text-xs text-slate-400 mt-1.5 max-w-sm">
              Try resetting your search filter or clear your keywords to see all 38 available shifts nearby.
            </p>
            <button
              onClick={() => { setActiveFilter('ALL'); setSearchTerm(''); }}
              className="mt-5 px-5 py-2.5 bg-slate-900 text-white rounded-2xl text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredJobs.map(job => {
              const SectorIcon = job.sectorIcon;
              const isApplied = appliedJobs[job.id];
              const isSaved = savedJobs[job.id];

              return (
                <div
                  key={job.id}
                  className={`bg-white rounded-3xl p-6 sm:p-7 shadow-smooth hover:shadow-smooth-lg border transition-all duration-200 flex flex-col justify-between relative overflow-hidden ${
                    job.urgent
                      ? 'border-amber-400/90 ring-2 ring-amber-400/20 bg-gradient-to-b from-amber-50/40 via-white to-white'
                      : 'border-slate-200/80 hover:border-slate-300'
                  }`}
                >
                  <div>
                    {/* Urgent Callout Header Banner */}
                    {job.urgent && (
                      <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-amber-200/50">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200/80 text-[10px] font-extrabold uppercase tracking-wider">
                          <Flame className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
                          URGENT CALLOUT
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs text-amber-900 font-extrabold bg-amber-100/90 border border-amber-300/60 px-3 py-1 rounded-full">
                          <Clock className="w-3.5 h-3.5 text-amber-700" />
                          {job.spots}
                        </span>
                      </div>
                    )}

                    {/* Company, Role & Wage Card Header */}
                    <div className="flex items-start gap-3.5 justify-between">
                      {/* Left: Avatar & Role */}
                      <div className="flex items-start gap-3.5 min-w-0">
                        <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200/80 shrink-0 flex items-center justify-center shadow-xs">
                          <SectorIcon className="w-6 h-6 text-amber-600" />
                        </div>

                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-1.5">
                            <h3 className="text-base font-black text-slate-900 truncate">
                              {job.company}
                            </h3>
                            <BadgeCheck className="w-4 h-4 text-emerald-600 shrink-0" title="Verified Employer" />
                          </div>
                          <p className="text-xs sm:text-sm text-slate-700 font-bold truncate mt-0.5">
                            {job.title}
                          </p>
                          <div className="flex items-center gap-1.5 mt-1.5 text-xs text-slate-500 font-medium">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span className="truncate">{job.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: High-Impact Wage Block */}
                      <div className="flex flex-col items-end shrink-0 pl-2">
                        <div className="flex items-baseline gap-0.5 font-mono">
                          <span className="text-xs font-bold text-amber-600">₹</span>
                          <span className="text-2xl font-black text-slate-900 tracking-tight leading-none">
                            {job.pay}
                          </span>
                        </div>
                        <span className="text-xs text-slate-400 font-medium mt-1">
                          {job.unit}
                        </span>
                        <span className="mt-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200/70">
                          {job.overtime}
                        </span>
                      </div>
                    </div>

                    {/* Telemetry Metric Pill Strip (Airy, Spacious, Zero-Cramping) */}
                    <div className="grid grid-cols-3 gap-2.5 bg-slate-50/90 border border-slate-200/70 rounded-2xl p-3 my-4 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                          Distance
                        </span>
                        <div className="flex items-center gap-1 mt-1">
                          <Navigation className="w-3.5 h-3.5 text-amber-600" />
                          <span className="text-xs font-extrabold text-slate-800">
                            {job.distance} km
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col items-center justify-center border-x border-slate-200/80 px-1">
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                          Shift Time
                        </span>
                        <div className="flex items-center gap-1 mt-1 truncate max-w-full">
                          <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                          <span className="text-xs font-extrabold text-slate-800 truncate">
                            {job.time.split('–')[0].trim()}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col items-center justify-center">
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                          Rating
                        </span>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                          <span className="text-xs font-extrabold text-slate-800">
                            {job.rating}
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium">
                            ({job.reviews})
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Perks Badges Row */}
                    <div className="flex flex-wrap items-center gap-2 mb-5">
                      {job.perks.map((perk, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200/50"
                        >
                          <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                          <span>{perk}</span>
                        </span>
                      ))}
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 text-amber-900 text-xs font-bold border border-amber-200/70">
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                        <span>₹{job.pay} In Escrow</span>
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons: Bookmark & One-Tap Apply */}
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-100 mt-2">
                    <button
                      onClick={() => toggleSave(job.id)}
                      className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                        isSaved
                          ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-sm'
                          : 'bg-slate-50 text-slate-400 border-slate-200 hover:text-slate-800 hover:bg-slate-100'
                      }`}
                      title={isSaved ? "Remove bookmark" : "Save shift"}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                    </button>

                    {isApplied ? (
                      <div className="flex-1 h-12 bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2 shadow-sm animate-in fade-in">
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>Slot Reserved • Escrow Locked ✓</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleApply(job.id, job.company, job.escrowAmount)}
                        className="flex-1 h-12 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 active:scale-[0.98] text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer border border-amber-500/20"
                      >
                        <Zap className="w-4 h-4 fill-slate-950 text-slate-950" />
                        <span>One-Tap Fast Apply</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}