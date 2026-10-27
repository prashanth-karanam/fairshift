import React, { useState, useMemo } from 'react';
import { MapPin, Search, Clock, ChevronDown, Check, Flame, Zap, ArrowUpDown, Bookmark, ShieldCheck, DollarSign } from 'lucide-react';

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
    <div className="flex flex-col gap-4 p-4 text-[#FAFAFA]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#27272A] border border-[#FACC15] text-[#FAFAFA] px-4 py-2 rounded-lg shadow-xl flex items-center gap-2 text-xs font-mono animate-in fade-in">
          <Check className="w-4 h-4 text-[#FACC15]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Live Pulse Bar */}
      <div className="flex items-center justify-between bg-[#18181B] border border-[#27272A] px-3.5 py-2.5 rounded-lg shadow-sm">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping" />
          <span className="text-xs font-mono font-bold text-[#34D399] uppercase tracking-wide">
            38 Shifts Live Nearby (&lt;5km)
          </span>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-mono text-[#FACC15]">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Escrow Locked</span>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A1A1AA]" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Role, sector, or contractor (e.g. Welder, Pier #12)..."
          className="w-full bg-[#18181B] border border-[#27272A] text-[#FAFAFA] placeholder:text-[#A1A1AA]/60 text-xs font-mono pl-9 pr-3 py-2.5 rounded-lg focus:outline-none focus:border-[#FACC15] transition-colors"
        />
      </div>

      {/* Filter Chips Horizontal Scroll */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none -mx-4 px-4">
        {[
          { id: 'ALL', label: 'All (38)' },
          { id: '<5KM', label: '< 5KM' },
          { id: 'TODAY', label: 'TODAY' },
          { id: 'CONSTRUCTION', label: 'CONSTRUCTION' },
          { id: 'WAREHOUSE', label: 'WAREHOUSE' },
          { id: 'DAILY ₹800+', label: 'DAILY ₹800+' }
        ].map(chip => (
          <button
            key={chip.id}
            onClick={() => setActiveFilter(chip.id)}
            className={`whitespace-nowrap px-3 py-1.5 rounded text-xs font-mono font-bold uppercase transition-all ${
              activeFilter === chip.id
                ? 'bg-[#FACC15] text-[#09090B] shadow-sm'
                : 'bg-[#18181B] text-[#A1A1AA] hover:text-[#FAFAFA] border border-[#27272A]'
            }`}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Jobs Feed List */}
      <div className="flex flex-col gap-3 pb-8">
        {filteredJobs.map(job => (
          <div
            key={job.id}
            className={`bg-[#18181B] border border-[#27272A] rounded-xl p-4 shadow-hard flex flex-col gap-3 relative overflow-hidden ${
              job.urgent ? 'border-l-4 border-l-[#FACC15]' : ''
            }`}
          >
            {/* Urgent Top Bar */}
            {job.urgent && (
              <div className="flex items-center justify-between pb-1">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#F43F5E]/20 text-[#FB7185] border border-[#F43F5E]/40 font-mono text-[10px] font-bold uppercase">
                  <Flame className="w-3 h-3" />
                  URGENT CALLOUT
                </span>
                <span className="text-[10px] font-mono text-[#FACC15] font-bold bg-[#27272A] px-2 py-0.5 rounded">
                  STARTS IN 2H
                </span>
              </div>
            )}

            {/* Header: Company & Wage */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold text-[#FAFAFA] truncate" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {job.company}
                </span>
                <span className="text-xs text-[#A1A1AA] font-mono truncate">
                  {job.title}
                </span>
              </div>

              <div className="flex flex-col items-end shrink-0">
                <div className="flex items-baseline gap-0.5 text-base font-extrabold text-[#FACC15] font-mono">
                  <span>₹{job.pay}</span>
                </div>
                <span className="text-[9px] font-mono text-[#A1A1AA]">
                  {job.unit}
                </span>
              </div>
            </div>

            {/* Telemetry Strip: Distance, Time, Rating */}
            <div className="grid grid-cols-3 gap-1 bg-[#27272A] p-2 rounded-lg text-center font-mono text-[10px] border border-[#3F3F46]/60">
              <div className="flex flex-col items-center">
                <span className="text-[#A1A1AA] uppercase">Distance</span>
                <span className="font-bold text-[#FAFAFA] mt-0.5">{job.distance} km</span>
              </div>
              <div className="flex flex-col items-center border-x border-[#3F3F46]">
                <span className="text-[#A1A1AA] uppercase">Shift Time</span>
                <span className="font-bold text-[#FAFAFA] mt-0.5 truncate max-w-full px-1">{job.time.split('–')[0]}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[#A1A1AA] uppercase">Rating</span>
                <span className="font-bold text-[#FACC15] mt-0.5">★ {job.rating}</span>
              </div>
            </div>

            {/* Perks & Overtime */}
            <div className="flex flex-wrap gap-1">
              {job.perks.map((p, i) => (
                <span key={i} className="px-2 py-0.5 rounded bg-[#27272A] text-[#FAFAFA] text-[9px] font-mono">
                  {p}
                </span>
              ))}
              <span className="px-2 py-0.5 rounded bg-[#10B981]/15 text-[#34D399] text-[9px] font-mono font-bold">
                {job.overtime}
              </span>
            </div>

            {/* Actions: Apply & Save */}
            <div className="flex items-center gap-2 pt-1 border-t border-[#27272A]">
              <button
                onClick={() => toggleSave(job.id)}
                className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors ${
                  savedJobs[job.id]
                    ? 'bg-[#FACC15] text-[#09090B] border-[#FACC15]'
                    : 'bg-[#27272A] text-[#A1A1AA] border-[#3F3F46] hover:text-[#FAFAFA]'
                }`}
                title="Bookmark shift"
              >
                <Bookmark className="w-4 h-4" />
              </button>

              {appliedJobs[job.id] ? (
                <button
                  disabled
                  className="flex-1 h-10 bg-[#10B981] text-[#09090B] font-mono text-xs font-bold uppercase rounded-lg flex items-center justify-center gap-1.5 cursor-default"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Applied • Slot Locked ✓</span>
                </button>
              ) : (
                <button
                  onClick={() => handleApply(job.id, job.company)}
                  className="flex-1 h-10 bg-[#FACC15] hover:bg-[#EAB308] text-[#09090B] font-mono text-xs font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 shadow-sm btn-press transition-all cursor-pointer"
                >
                  <Zap className="w-4 h-4 fill-current" />
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
