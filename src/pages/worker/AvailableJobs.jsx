import React, { useState, useMemo } from 'react';
import { MapPin, Search, Clock, ChevronDown, Check, Flame, Zap, ArrowUpDown } from 'lucide-react';

const MOCK_JOBS = [
  {
    id: 1,
    company: 'Metro Construction Co.',
    title: 'General Laborer',
    pay: 28,
    location: 'Downtown Industrial Yard',
    distance: 2.4,
    date: 'Tomorrow',
    time: '6:00 AM – 2:00 PM',
    hours: 8,
    status: 'URGENT',
    slots: '2 of 8 left',
  },
  {
    id: 2,
    company: 'Harbor Logistics',
    title: 'Forklift Operator',
    pay: 35,
    location: 'Port District, Dock 12',
    distance: 5.1,
    date: 'Tomorrow',
    time: '7:00 AM – 3:00 PM',
    hours: 8,
    status: 'OPEN',
    slots: '5 of 5 left',
  },
  {
    id: 3,
    company: 'SkyBridge Electrical',
    title: 'Safety Inspector',
    pay: 42,
    location: 'Northside Tower Project',
    distance: 3.7,
    date: 'Dec 19',
    time: '8:00 AM – 4:00 PM',
    hours: 8,
    status: 'OPEN',
    slots: '3 of 3 left',
  },
  {
    id: 4,
    company: 'RiverWalk Demolition',
    title: 'Heavy Equipment Operator',
    pay: 38,
    location: 'Southbank Redevelopment',
    distance: 1.8,
    date: 'Tomorrow',
    time: '5:30 AM – 1:30 PM',
    hours: 8,
    status: 'FILLING FAST',
    slots: '1 of 6 left',
  },
  {
    id: 5,
    company: 'Titan Steel Fabricators',
    title: 'Welder – MIG/TIG',
    pay: 45,
    location: 'East Industrial Park',
    distance: 8.2,
    date: 'Dec 20',
    time: '6:00 AM – 6:00 PM',
    hours: 12,
    status: 'OPEN',
    slots: '4 of 4 left',
  },
  {
    id: 6,
    company: 'CleanSweep Services',
    title: 'Site Cleanup Crew',
    pay: 22,
    location: 'Midtown Mall Renovation',
    distance: 0.9,
    date: 'Today',
    time: '3:00 PM – 11:00 PM',
    hours: 8,
    status: 'URGENT',
    slots: '3 of 10 left',
  },
  {
    id: 7,
    company: 'Pacific Scaffolding',
    title: 'Scaffold Erector',
    pay: 33,
    location: 'Harbor Heights, Block C',
    distance: 4.5,
    date: 'Dec 21',
    time: '7:00 AM – 3:30 PM',
    hours: 8.5,
    status: 'OPEN',
    slots: '6 of 6 left',
  },
  {
    id: 8,
    company: 'Apex Concrete Solutions',
    title: 'Concrete Finisher',
    pay: 31,
    location: 'University District',
    distance: 6.3,
    date: 'Tomorrow',
    time: '5:00 AM – 1:00 PM',
    hours: 8,
    status: 'FILLING FAST',
    slots: '2 of 4 left',
  },
];

const FILTERS = ['All', 'Nearby', 'High Pay', 'Urgent'];
const SORT_OPTIONS = ['Highest Pay', 'Nearest', 'Soonest'];

const statusStyles = {
  'URGENT': { bg: 'bg-[#F43F5E]/15', text: 'text-[#F43F5E]', border: 'border-l-[#F43F5E]' },
  'OPEN': { bg: 'bg-[#10B981]/15', text: 'text-[#10B981]', border: 'border-l-[#10B981]' },
  'FILLING FAST': { bg: 'bg-[#FACC15]/15', text: 'text-[#FACC15]', border: 'border-l-[#FACC15]' },
};

export default function AvailableJobs() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Highest Pay');
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState(new Set());

  const handleApply = (jobId) => {
    setAppliedJobs(prev => new Set([...prev, jobId]));
  };

  const filteredJobs = useMemo(() => {
    let jobs = [...MOCK_JOBS];

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      jobs = jobs.filter(j =>
        j.company.toLowerCase().includes(q) ||
        j.title.toLowerCase().includes(q) ||
        j.location.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (activeFilter === 'Nearby') {
      jobs = jobs.filter(j => j.distance <= 3);
    } else if (activeFilter === 'High Pay') {
      jobs = jobs.filter(j => j.pay >= 35);
    } else if (activeFilter === 'Urgent') {
      jobs = jobs.filter(j => j.status === 'URGENT');
    }

    // Sort
    if (sortBy === 'Highest Pay') {
      jobs.sort((a, b) => b.pay - a.pay);
    } else if (sortBy === 'Nearest') {
      jobs.sort((a, b) => a.distance - b.distance);
    } else if (sortBy === 'Soonest') {
      const dateOrder = { 'Today': 0, 'Tomorrow': 1 };
      jobs.sort((a, b) => (dateOrder[a.date] ?? 2) - (dateOrder[b.date] ?? 2));
    }

    return jobs;
  }, [activeFilter, searchQuery, sortBy]);

  return (
    <div className="px-4 py-5">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-[#FAFAFA] tracking-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
          Available Shifts
        </h2>
        <p className="text-xs text-[#A1A1AA] mt-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          {filteredJobs.length} shift{filteredJobs.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A1A1AA]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search jobs, companies, locations..."
          className="w-full bg-[#18181B] border border-[#27272A] rounded-[3px] pl-9 pr-4 py-2.5 text-sm text-[#FAFAFA] placeholder-[#A1A1AA]/50 outline-none focus:border-[#FACC15]/50 transition-colors"
          style={{ fontFamily: 'JetBrains Mono, monospace' }}
        />
      </div>

      {/* Filters + Sort Row */}
      <div className="flex items-center justify-between gap-2 mb-4">
        {/* Filter Chips */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
          {FILTERS.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`shrink-0 px-3 py-1.5 rounded-[3px] text-xs font-medium transition-all ${
                activeFilter === filter
                  ? 'bg-[#FACC15] text-[#09090B]'
                  : 'bg-[#27272A] text-[#A1A1AA] hover:text-[#FAFAFA]'
              }`}
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="relative shrink-0">
          <button
            onClick={() => setShowSortMenu(!showSortMenu)}
            className="flex items-center gap-1 bg-[#27272A] px-2.5 py-1.5 rounded-[3px] text-[10px] text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            <ArrowUpDown className="w-3 h-3" />
            <span className="hidden sm:inline">Sort:</span> {sortBy}
            <ChevronDown className={`w-3 h-3 transition-transform ${showSortMenu ? 'rotate-180' : ''}`} />
          </button>

          {showSortMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowSortMenu(false)} />
              <div className="absolute right-0 top-full mt-1 z-50 bg-[#18181B] border border-[#27272A] rounded-[3px] py-1 min-w-[140px]"
                style={{ boxShadow: '4px 4px 0 0 #000' }}>
                {SORT_OPTIONS.map(opt => (
                  <button
                    key={opt}
                    onClick={() => { setSortBy(opt); setShowSortMenu(false); }}
                    className={`w-full text-left px-3 py-2 text-xs transition-colors ${
                      sortBy === opt ? 'text-[#FACC15] bg-[#FACC15]/5' : 'text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#27272A]'
                    }`}
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Job Cards */}
      <div className="flex flex-col gap-3">
        {filteredJobs.map(job => {
          const style = statusStyles[job.status];
          const applied = appliedJobs.has(job.id);

          return (
            <div
              key={job.id}
              className={`bg-[#18181B] border border-[#27272A] border-l-4 ${style.border} rounded-[4px] p-4 transition-all hover:bg-[#1a1a1f]`}
            >
              {/* Top row: Company + Status */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="min-w-0">
                  <p className="text-[10px] text-[#A1A1AA] uppercase tracking-wider truncate" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    {job.company}
                  </p>
                  <h3 className="text-sm font-bold text-[#FAFAFA] mt-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {job.title}
                  </h3>
                </div>
                <span className={`shrink-0 ${style.bg} ${style.text} text-[10px] font-bold px-2 py-0.5 rounded-[2px] flex items-center gap-1`}
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  {job.status === 'URGENT' && <Flame className="w-3 h-3" />}
                  {job.status === 'FILLING FAST' && <Zap className="w-3 h-3" />}
                  {job.status}
                </span>
              </div>

              {/* Pay */}
              <div className="mb-3">
                <span className="text-2xl font-bold text-[#FACC15]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  ${job.pay}
                </span>
                <span className="text-xs text-[#A1A1AA] ml-0.5" style={{ fontFamily: 'JetBrains Mono, monospace' }}>/HR</span>
              </div>

              {/* Details row */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-3 text-xs text-[#A1A1AA]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {job.location}
                </span>
                <span className="bg-[#27272A] text-[#FAFAFA] px-1.5 py-0.5 rounded-[2px] text-[10px] font-semibold">
                  {job.distance} MI
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-4 text-xs text-[#A1A1AA]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {job.date}, {job.time}
                </span>
                <span className="bg-[#27272A] text-[#FAFAFA] px-1.5 py-0.5 rounded-[2px] text-[10px] font-semibold">
                  {job.hours}H SHIFT
                </span>
                <span className="text-[10px] text-[#A1A1AA]/70">
                  {job.slots}
                </span>
              </div>

              {/* Apply Button */}
              {applied ? (
                <button
                  disabled
                  className="w-full flex items-center justify-center gap-2 bg-[#10B981]/15 text-[#10B981] font-bold text-xs py-2.5 rounded-[3px] cursor-default"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                >
                  <Check className="w-4 h-4" />
                  APPLICATION SENT ✓
                </button>
              ) : (
                <button
                  onClick={() => handleApply(job.id)}
                  className="w-full bg-[#FACC15] hover:bg-[#EAB308] text-[#09090B] font-bold text-xs py-2.5 rounded-[3px] transition-colors cursor-pointer active:translate-y-px"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                >
                  APPLY NOW
                </button>
              )}
            </div>
          );
        })}

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-8 h-8 text-[#27272A] mx-auto mb-3" />
            <p className="text-sm text-[#A1A1AA]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              No shifts match your search
            </p>
            <button
              onClick={() => { setSearchQuery(''); setActiveFilter('All'); }}
              className="mt-2 text-xs text-[#FACC15] hover:underline"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Bottom spacer */}
      <div className="h-4" />
    </div>
  );
}
