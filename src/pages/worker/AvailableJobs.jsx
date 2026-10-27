import React, { useState, useMemo } from 'react';
import { MapPin, Search, Clock, ChevronDown, Check, Flame, Zap, ArrowUpDown, Bookmark, ShieldCheck, DollarSign, Sparkles } from 'lucide-react';

const MOCK_JOBS = [
  {
    id: 1,
    company: 'Apex Infra Site 4B',
    title: 'Welder / Helper Required',
    pay: 950,
    unit: '/ Day (8.5h)',
    location: 'MIDC Industrial Gate 2, Navi Mumbai',
    distance: 1.8,
    time: '08:00 AM – 04:30 PM',
    sector: 'CONSTRUCTION',
    status: 'URGENT',
    slots: 'Starts in 2h • 2 Spots Left',
    rating: 4.9,
    reviews: 142,
    overtime: '+₹120/h Overtime',
    perks: ['Guaranteed Escrow', 'Free Lunch & PPE', 'Daily Instant Cashout'],
    urgent: true,
  },
  {
    id: 2,
    company: 'Navi Mumbai Metro Pier #12',
    title: 'Steel Binding Helper',
    pay: 880,
    unit: '/ Day (8h)',
    location: 'Sanpada Rail Yard',
    distance: 2.4,
    time: '08:00 AM – 04:30 PM',
    sector: 'CONSTRUCTION',
    status: 'OPEN',
    slots: 'Instant Approval • 4 spots',
    rating: 4.8,
    reviews: 98,
    overtime: '+₹110/h Overtime',
    perks: ['Free Lunch & PPE', 'Aadhaar Bio-Check', 'Tea Breaks'],
    urgent: false,
  },
  {
    id: 3,
    company: 'SRM Logistics Hub Turbhe',
    title: 'Package Sorter & Loader',
    pay: 820,
    unit: '/ Shift (8h)',
    location: 'Turbhe MIDC Warehouse Zone',
    distance: 4.1,
    time: '09:00 PM – 05:00 AM (Night)',
    sector: 'WAREHOUSE',
    status: 'FILLING FAST',
    slots: '2 Spots Left',
    rating: 4.6,
    reviews: 76,
    overtime: '+₹100/h Overtime',
    perks: ['AC Environment', 'Daily Cashout', 'Night Differential'],
    urgent: false,
  },
  {
    id: 4,
    company: 'Phoenix Mall Facility Expansion',
    title: 'Deep Cleaning & Floor Maintenance',
    pay: 750,
    unit: '/ Day (8h)',
    location: 'Seawoods Grand Central',
    distance: 5.8,
    time: 'Tomorrow, 09:00 AM – 05:00 PM',
    sector: 'FACILITIES',
    status: 'OPEN',
    slots: '5 Spots Left',
    rating: 4.9,
    reviews: 110,
    overtime: '+₹95/h Overtime',
    perks: ['Clean Uniform Provided', 'Prompt UPI Settlement'],
    urgent: false,
  },
  {
    id: 5,
    company: 'SkyBridge Electrical Works',
    title: 'Electrician Helper & Conduit Laying',
    pay: 900,
    unit: '/ Day (8h)',
    location: 'CBD Belapur Sector 15',
    distance: 3.2,
    time: 'Tomorrow, 08:30 AM – 05:00 PM',
    sector: 'CONSTRUCTION',
    status: 'OPEN',
    slots: '3 Spots Left',
    rating: 4.7,
    reviews: 52,
    overtime: '+₹115/h Overtime',
    perks: ['Safety Harness Supplied', 'Escrow Locked'],
    urgent: false,
  }
];

export default function AvailableJobs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [appliedJobs, setAppliedJobs] = useState({});
  const [savedJobs, setSavedJobs] = useState({});
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleApply = (jobId, companyName) => {
    setAppliedJobs(prev => ({ ...prev, [jobId]: true }));
    showToast(`Slot Locked for ${companyName}! Escrow wage reserved on-chain.`);
  };

  const toggleSave = (jobId) => {
    setSavedJobs(prev => {
      const next = { ...prev, [jobId]: !prev[jobId] };
      showToast(next[jobId] ? 'Shift saved to bookmarks.' : 'Shift removed from bookmarks.');
      return next;
    });
  };

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
    <div className="flex flex-col gap-4 text-slate-800 pb-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-semibold animate-in fade-in border border-yellow-400">
          <Check className="w-4 h-4 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Live Shifts Pulse Bar */}
      <div className="flex items-center justify-between bg-yellow-50 border border-yellow-200/80 px-4 py-3 rounded-2xl shadow-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-xs font-bold text-slate-900 tracking-tight">
            38 Shifts Live Nearby (&lt;5km)
          </span>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-white px-2.5 py-0.5 rounded-full border border-yellow-200 shadow-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
          <span>Escrow Locked</span>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="relative w-full">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Role, sector, or contractor..."
          className="w-full bg-white border border-slate-200/90 text-slate-800 placeholder:text-slate-400 text-xs pl-11 pr-4 py-3 rounded-2xl focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-200 transition-all shadow-xs"
        />
      </div>

      {/* Filter Chips Horizontal Scroll */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none -mx-4 px-4">
        {[
          { id: 'ALL', label: 'All Shifts' },
          { id: '<5KM', label: '< 5KM' },
          { id: 'TODAY', label: 'TODAY' },
          { id: 'CONSTRUCTION', label: 'CONSTRUCTION' },
          { id: 'WAREHOUSE', label: 'WAREHOUSE' },
          { id: 'DAILY ₹800+', label: 'DAILY ₹800+' }
        ].map(chip => (
          <button
            key={chip.id}
            onClick={() => setActiveFilter(chip.id)}
            className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeFilter === chip.id
                ? 'bg-amber-400 text-slate-950 shadow-sm scale-105'
                : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Jobs Feed List */}
      <div className="flex flex-col gap-3.5 pb-8">
        {filteredJobs.map(job => (
          <div
            key={job.id}
            className={`bg-white rounded-3xl p-5 shadow-sm border transition-all duration-200 hover:shadow-md ${
              job.urgent ? 'border-2 border-amber-300 bg-gradient-to-b from-yellow-50/30 to-white' : 'border-slate-100'
            }`}
          >
            {/* Urgent Tag */}
            {job.urgent && (
              <div className="flex items-center justify-between pb-2 mb-1 border-b border-yellow-100">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-bold uppercase">
                  <Flame className="w-3.5 h-3.5 text-rose-500" />
                  URGENT CALLOUT
                </span>
                <span className="text-[11px] text-amber-800 font-extrabold bg-amber-100 px-3 py-0.5 rounded-full">
                  STARTS IN 2H
                </span>
              </div>
            )}

            {/* Header: Company & Wage */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-extrabold text-slate-900 truncate">
                  {job.company}
                </span>
                <span className="text-xs text-slate-500 font-medium truncate mt-0.5">
                  {job.title}
                </span>
              </div>

              <div className="flex flex-col items-end shrink-0">
                <div className="text-lg font-black text-slate-900 font-mono">
                  <span className="text-amber-500">₹</span>{job.pay}
                </div>
                <span className="text-[10px] text-slate-400 font-medium">
                  {job.unit}
                </span>
              </div>
            </div>

            {/* Telemetry Strip: Distance, Time, Rating */}
            <div className="grid grid-cols-3 gap-1 bg-slate-50 p-2.5 rounded-2xl text-center text-[10px] border border-slate-100 my-3">
              <div className="flex flex-col items-center">
                <span className="text-slate-400 font-semibold uppercase">Distance</span>
                <span className="font-bold text-slate-800 mt-0.5">{job.distance} km</span>
              </div>
              <div className="flex flex-col items-center border-x border-slate-200">
                <span className="text-slate-400 font-semibold uppercase">Shift Time</span>
                <span className="font-bold text-slate-800 mt-0.5 truncate px-1">{job.time.split('–')[0]}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-slate-400 font-semibold uppercase">Rating</span>
                <span className="font-extrabold text-amber-600 mt-0.5">★ {job.rating}</span>
              </div>
            </div>

            {/* Perks & Overtime Badges */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {job.perks.map((p, i) => (
                <span key={i} className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-medium">
                  {p}
                </span>
              ))}
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                {job.overtime}
              </span>
            </div>

            {/* Actions: Apply & Save */}
            <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => toggleSave(job.id)}
                className={`w-11 h-11 rounded-2xl border flex items-center justify-center transition-colors cursor-pointer ${
                  savedJobs[job.id]
                    ? 'bg-amber-400 text-slate-900 border-amber-400 shadow-sm'
                    : 'bg-slate-50 text-slate-400 border-slate-200 hover:text-slate-800'
                }`}
                title="Bookmark shift"
              >
                <Bookmark className="w-4 h-4" />
              </button>

              {appliedJobs[job.id] ? (
                <button
                  disabled
                  className="flex-1 h-11 bg-emerald-500 text-white font-bold text-xs uppercase rounded-2xl flex items-center justify-center gap-1.5 cursor-default shadow-sm"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Applied • Slot Locked ✓</span>
                </button>
              ) : (
                <button
                  onClick={() => handleApply(job.id, job.company)}
                  className="flex-1 h-11 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-2xl flex items-center justify-center gap-1.5 shadow-sm btn-smooth transition-all cursor-pointer"
                >
                  <Zap className="w-4 h-4 fill-current text-slate-950" />
                  <span>One-Tap Fast Apply</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
