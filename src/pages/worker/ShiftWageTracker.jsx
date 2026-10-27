import React, { useState, useEffect } from 'react';
import {
  Clock, DollarSign, TrendingUp, AlertCircle, ChevronDown, ChevronUp,
  Timer, Building2, HardHat, CheckCircle2, ShieldCheck, ArrowUpRight,
  ArrowDownRight, Banknote, CircleDot, CalendarDays, BarChart3,
  ChevronRight, Wallet, Hourglass
} from 'lucide-react';

const summaryCards = [
  {
    label: 'THIS WEEK',
    amount: '$1,247.50',
    sub: '32.5 HRS',
    trend: '+12% vs last week',
    trendDir: 'up',
    icon: Wallet,
    accent: '#10B981',
  },
  {
    label: 'PENDING PAY',
    amount: '$485.00',
    sub: '2 SHIFTS',
    badge: 'PROCESSING',
    icon: Hourglass,
    accent: '#FACC15',
  },
  {
    label: 'OVERTIME',
    amount: '4.5 HRS',
    sub: '$168.75 OT PAY',
    trend: '+1.5 vs avg',
    trendDir: 'up',
    icon: TrendingUp,
    accent: '#06B6D4',
  },
];

const shiftHistory = {
  'This Week': [
    { id: 1, date: 'Mon, Oct 21', company: 'Metro Construction Co.', hours: 8.0, otHours: 0, basePay: 224.00, otPay: 0, total: 224.00, status: 'PAID', role: 'General Laborer', rate: 28.00 },
    { id: 2, date: 'Tue, Oct 22', company: 'Apex Roofing LLC', hours: 8.0, otHours: 2.0, basePay: 224.00, otPay: 84.00, total: 308.00, status: 'PAID', role: 'Roofing Installer', rate: 28.00 },
    { id: 3, date: 'Wed, Oct 23', company: 'Metro Construction Co.', hours: 8.0, otHours: 1.5, basePay: 224.00, otPay: 63.00, total: 287.00, status: 'PENDING', role: 'General Laborer', rate: 28.00 },
    { id: 4, date: 'Thu, Oct 24', company: 'Summit Builders Inc.', hours: 8.0, otHours: 1.0, basePay: 240.00, otPay: 45.00, total: 285.00, status: 'PENDING', role: 'Steel Framer', rate: 30.00 },
  ],
  'Last Week': [
    { id: 5, date: 'Mon, Oct 14', company: 'Metro Construction Co.', hours: 8.0, otHours: 0, basePay: 224.00, otPay: 0, total: 224.00, status: 'PAID', role: 'General Laborer', rate: 28.00 },
    { id: 6, date: 'Tue, Oct 15', company: 'Metro Construction Co.', hours: 8.0, otHours: 0, basePay: 224.00, otPay: 0, total: 224.00, status: 'PAID', role: 'General Laborer', rate: 28.00 },
    { id: 7, date: 'Wed, Oct 16', company: 'BrightPath Solar', hours: 6.5, otHours: 0, basePay: 195.00, otPay: 0, total: 195.00, status: 'PAID', role: 'Panel Installer', rate: 30.00 },
    { id: 8, date: 'Thu, Oct 17', company: 'Apex Roofing LLC', hours: 8.0, otHours: 0, basePay: 224.00, otPay: 0, total: 224.00, status: 'DISPUTED', role: 'Roofing Installer', rate: 28.00 },
    { id: 9, date: 'Fri, Oct 18', company: 'Metro Construction Co.', hours: 8.0, otHours: 0.5, basePay: 224.00, otPay: 21.00, total: 245.00, status: 'PAID', role: 'General Laborer', rate: 28.00 },
  ],
  'All': [
    { id: 10, date: 'Fri, Oct 11', company: 'Summit Builders Inc.', hours: 8.0, otHours: 0, basePay: 240.00, otPay: 0, total: 240.00, status: 'PAID', role: 'Steel Framer', rate: 30.00 },
    { id: 11, date: 'Mon, Oct 7', company: 'Metro Construction Co.', hours: 8.0, otHours: 1.0, basePay: 224.00, otPay: 42.00, total: 266.00, status: 'PAID', role: 'General Laborer', rate: 28.00 },
    { id: 12, date: 'Wed, Oct 2', company: 'BrightPath Solar', hours: 7.5, otHours: 0, basePay: 225.00, otPay: 0, total: 225.00, status: 'PAID', role: 'Panel Installer', rate: 30.00 },
  ],
};

const statusStyles = {
  PAID: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
  PENDING: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
  DISPUTED: 'bg-rose-500/15 text-rose-400 border border-rose-500/30',
  PROCESSING: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
};

export default function ShiftWageTracker() {
  const [activeTab, setActiveTab] = useState('This Week');
  const [expandedRow, setExpandedRow] = useState(null);
  const [elapsed, setElapsed] = useState({ h: 4, m: 23 });

  // Simulate ticking clock for active shift
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(prev => {
        const newM = prev.m + 1;
        if (newM >= 60) return { h: prev.h + 1, m: 0 };
        return { ...prev, m: newM };
      });
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const currentEarned = (elapsed.h + elapsed.m / 60) * 28;
  const tabs = ['This Week', 'Last Week', 'All'];

  return (
    <div className="min-h-screen bg-[#09090B] text-[#FAFAFA] pb-24">
      {/* Page Header */}
      <div className="px-4 pt-6 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <BarChart3 size={20} className="text-[#FACC15]" />
          <h1 className="text-xl font-bold tracking-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
            Shift & Wage Tracker
          </h1>
        </div>
        <p className="text-sm text-[#A1A1AA]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          Week of Oct 21 – Oct 27, 2024
        </p>
      </div>

      {/* Summary Cards – horizontal scroll */}
      <div className="flex gap-3 px-4 pb-4 overflow-x-auto scrollbar-none">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="min-w-[200px] flex-shrink-0 bg-[#18181B] border border-[#27272A] rounded-[4px] p-4"
              style={{ boxShadow: '4px 4px 0 0 #000' }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-semibold tracking-widest text-[#A1A1AA]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {card.label}
                </span>
                <Icon size={16} style={{ color: card.accent }} />
              </div>
              <p className="text-2xl font-bold tracking-tight" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                {card.amount}
              </p>
              <p className="text-xs text-[#A1A1AA] mt-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                {card.sub}
              </p>
              {card.badge && (
                <span className={`inline-block mt-2 text-[10px] font-semibold px-2 py-0.5 rounded-[2px] ${statusStyles[card.badge]}`}
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  {card.badge}
                </span>
              )}
              {card.trend && (
                <div className="flex items-center gap-1 mt-2">
                  {card.trendDir === 'up' ? (
                    <ArrowUpRight size={12} className="text-emerald-400" />
                  ) : (
                    <ArrowDownRight size={12} className="text-rose-400" />
                  )}
                  <span className="text-[11px] text-emerald-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    {card.trend}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Active Shift Card */}
      <div className="px-4 pb-4">
        <div
          className="bg-[#18181B] border border-cyan-500/30 rounded-[4px] p-4 relative overflow-hidden"
          style={{ boxShadow: '4px 4px 0 0 #000' }}
        >
          {/* Subtle glow top border */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 via-cyan-400 to-cyan-500" />

          <div className="flex items-center gap-2 mb-4">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400" />
            </span>
            <span className="text-[10px] font-bold tracking-widest text-cyan-400" style={{ fontFamily: 'Inter, sans-serif' }}>
              CURRENTLY CLOCKED IN
            </span>
          </div>

          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Building2 size={14} className="text-[#A1A1AA]" />
                <span className="text-sm font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Metro Construction Co.
                </span>
              </div>
              <div className="flex items-center gap-2">
                <HardHat size={14} className="text-[#A1A1AA]" />
                <span className="text-xs text-[#A1A1AA]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  General Laborer
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-[#FACC15]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                ${currentEarned.toFixed(2)}
              </p>
              <p className="text-[10px] text-[#A1A1AA] mt-0.5" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                EARNED SO FAR
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-[#09090B] rounded-[2px] p-2.5 text-center">
              <p className="text-[10px] text-[#A1A1AA] mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>CLOCK IN</p>
              <p className="text-sm font-bold" style={{ fontFamily: 'JetBrains Mono, monospace' }}>06:00 AM</p>
            </div>
            <div className="bg-[#09090B] rounded-[2px] p-2.5 text-center">
              <p className="text-[10px] text-[#A1A1AA] mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>ELAPSED</p>
              <p className="text-sm font-bold text-cyan-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                {elapsed.h}h {String(elapsed.m).padStart(2, '0')}m
              </p>
            </div>
            <div className="bg-[#09090B] rounded-[2px] p-2.5 text-center">
              <p className="text-[10px] text-[#A1A1AA] mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>RATE</p>
              <p className="text-sm font-bold" style={{ fontFamily: 'JetBrains Mono, monospace' }}>$28.00/HR</p>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-[#A1A1AA] mb-4 px-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            <span>OT after 8hrs: <span className="text-[#FACC15] font-semibold">$42.00/HR</span></span>
            <span>{elapsed.h >= 8 ? `${(elapsed.h + elapsed.m / 60 - 8).toFixed(1)} OT hrs` : `${(8 - elapsed.h - elapsed.m / 60).toFixed(1)} hrs to OT`}</span>
          </div>

          <button className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 rounded-[3px] text-sm tracking-wide transition-colors"
            style={{ fontFamily: 'Inter, sans-serif', boxShadow: '3px 3px 0 0 #000' }}>
            CLOCK OUT
          </button>
        </div>
      </div>

      {/* Shift History */}
      <div className="px-4 pb-4">
        <h2 className="text-sm font-bold tracking-wide mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
          SHIFT HISTORY
        </h2>

        {/* Tabs */}
        <div className="flex gap-1 bg-[#18181B] border border-[#27272A] rounded-[3px] p-1 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setExpandedRow(null); }}
              className={`flex-1 text-xs font-semibold py-2 rounded-[2px] transition-all ${
                activeTab === tab
                  ? 'bg-[#FACC15] text-[#09090B]'
                  : 'text-[#A1A1AA] hover:text-[#FAFAFA]'
              }`}
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Shift Rows */}
        <div className="space-y-2">
          {(shiftHistory[activeTab] || []).map((shift) => (
            <div
              key={shift.id}
              className="bg-[#18181B] border border-[#27272A] rounded-[4px] overflow-hidden"
              style={{ boxShadow: '3px 3px 0 0 #000' }}
            >
              {/* Row Summary */}
              <button
                onClick={() => setExpandedRow(expandedRow === shift.id ? null : shift.id)}
                className="w-full p-3 flex items-center justify-between hover:bg-[#27272A]/50 transition-colors"
              >
                <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 bg-[#27272A] rounded-[3px] flex items-center justify-center">
                    <CalendarDays size={16} className="text-[#A1A1AA]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {shift.company}
                    </p>
                    <p className="text-[11px] text-[#A1A1AA]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      {shift.date} · {shift.hours + shift.otHours}h
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-bold" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      ${shift.total.toFixed(2)}
                    </p>
                    <span className={`inline-block text-[9px] font-bold px-1.5 py-0.5 rounded-[2px] ${statusStyles[shift.status]}`}
                      style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      {shift.status}
                    </span>
                  </div>
                  {expandedRow === shift.id ? (
                    <ChevronUp size={14} className="text-[#A1A1AA]" />
                  ) : (
                    <ChevronDown size={14} className="text-[#A1A1AA]" />
                  )}
                </div>
              </button>

              {/* Expanded Detail */}
              {expandedRow === shift.id && (
                <div className="border-t border-[#27272A] bg-[#09090B] p-3">
                  <div className="grid grid-cols-2 gap-3 text-xs" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    <div>
                      <span className="text-[#A1A1AA]">Role</span>
                      <p className="font-semibold mt-0.5">{shift.role}</p>
                    </div>
                    <div>
                      <span className="text-[#A1A1AA]">Rate</span>
                      <p className="font-semibold mt-0.5">${shift.rate.toFixed(2)}/hr</p>
                    </div>
                    <div>
                      <span className="text-[#A1A1AA]">Base Hours</span>
                      <p className="font-semibold mt-0.5">{shift.hours}h → ${shift.basePay.toFixed(2)}</p>
                    </div>
                    <div>
                      <span className="text-[#A1A1AA]">OT Hours</span>
                      <p className="font-semibold mt-0.5">
                        {shift.otHours > 0 ? (
                          <span className="text-[#FACC15]">{shift.otHours}h → ${shift.otPay.toFixed(2)}</span>
                        ) : (
                          <span className="text-[#A1A1AA]">None</span>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#27272A]">
                    <span className="text-xs text-[#A1A1AA]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>Total</span>
                    <span className="text-sm font-bold" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      ${shift.total.toFixed(2)}
                    </span>
                  </div>
                  {shift.status === 'DISPUTED' && (
                    <div className="mt-3 bg-rose-500/10 border border-rose-500/30 rounded-[2px] p-2 flex items-start gap-2">
                      <AlertCircle size={14} className="text-rose-400 mt-0.5 flex-shrink-0" />
                      <p className="text-[11px] text-rose-300" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        Dispute filed: Reported hours mismatch. Under review by employer.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Wage Compliance */}
      <div className="px-4 pb-6">
        <div
          className="bg-[#18181B] border border-[#27272A] rounded-[4px] p-4"
          style={{ boxShadow: '4px 4px 0 0 #000' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck size={16} className="text-emerald-400" />
            <h2 className="text-xs font-bold tracking-widest" style={{ fontFamily: 'Inter, sans-serif' }}>
              MINIMUM WAGE COMPLIANCE
            </h2>
          </div>

          {/* Compliance meter */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs mb-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              <span className="text-[#A1A1AA]">Local Minimum</span>
              <span className="text-[#FAFAFA] font-semibold">$15.50/hr</span>
            </div>
            <div className="w-full h-3 bg-[#27272A] rounded-[2px] overflow-hidden relative">
              {/* Min wage marker */}
              <div className="absolute left-[53%] top-0 bottom-0 w-[2px] bg-[#A1A1AA] z-10" />
              <div
                className="h-full rounded-[2px] bg-gradient-to-r from-emerald-600 to-emerald-400"
                style={{ width: '100%' }}
              />
            </div>
            <div className="flex items-center justify-between text-xs mt-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              <span className="text-[#A1A1AA]">Your Average</span>
              <span className="text-emerald-400 font-bold">$29.20/hr</span>
            </div>
          </div>

          {/* Compliance ratio visual */}
          <div className="bg-[#09090B] rounded-[2px] p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-400" />
              <span className="text-xs font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>
                All Shifts Compliant
              </span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-[2px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              184 / 184 SHIFTS ✓
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
