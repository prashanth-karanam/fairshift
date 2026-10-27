import React, { useState } from 'react';
import {
  Star, ShieldCheck, BadgeCheck, Award, Wrench, Clock,
  BarChart3, ChevronRight, Bell, Calendar, Edit3, User, Building2,
  TrendingUp, CheckCircle2, FileCheck, HardHat, Target, ThumbsUp,
  Lock, X, Check, Droplets, MapPin, Phone, Shield
} from 'lucide-react';

const statsGrid = [
  { label: 'Completed', value: '38', sub: 'Verified Shifts' },
  { label: 'Accrued', value: '₹34.2K', sub: 'Take-Home' },
  { label: 'Impact', value: '14', sub: 'Peer Audits' },
];

export default function WorkerProfile() {
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [ppeAnswer, setPpeAnswer] = useState('yes');
  const [waterAnswer, setWaterAnswer] = useState('yes');
  const [auditSubmitted, setAuditSubmitted] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAuditSubmit = (e) => {
    e.preventDefault();
    setAuditSubmitted(true);
    setIsAuditModalOpen(false);
    showToast('Feedback Logged & Sealed on Immutable Smart Escrow Ledger (+50 Reputation XP)!');
  };

  return (
    <div className="space-y-6 text-slate-800 pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-semibold animate-in fade-in border border-yellow-400">
          <CheckCircle2 className="w-4 h-4 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Responsive Grid: 2 Columns on Desktop, 1 on Mobile */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left Column (5 cols on md): Profile Hero, Audit & Account */}
        <div className="md:col-span-5 space-y-6">
          {/* Profile Hero Card: Ramesh Patel */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-7 shadow-sm space-y-5 relative overflow-hidden">
            <div className="flex items-start gap-4">
              {/* Avatar with Verified badge */}
              <div className="relative shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-300 to-yellow-400 text-slate-950 font-black text-2xl flex items-center justify-center shadow-md">
                  RP
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white font-bold text-xs">
                  ✓
                </div>
              </div>

              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl font-black text-slate-900 truncate">
                    Ramesh Patel
                  </h1>
                  <span className="bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full text-[10px] font-bold border border-emerald-200">
                    VERIFIED
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-semibold truncate mt-0.5">
                  Welder & General Fabricator
                </p>
                <div className="flex items-center gap-2 mt-1.5 text-slate-400 text-xs">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>Navi Mumbai Hub</span>
                  <span>•</span>
                  <span className="font-mono">+91 98••• 4120</span>
                </div>
              </div>
            </div>

            {/* Top 5% Worker Status Badge Ribbon */}
            <div className="bg-yellow-50/90 border border-yellow-200 rounded-2xl p-4 flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-900 flex items-center justify-center font-bold text-base shadow-sm shrink-0">
                ★
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">
                  Top 5% Worker Status
                </span>
                <span className="text-xs text-slate-900 font-bold truncate">
                  Preferred Site Access & Instant Hire Enabled
                </span>
              </div>
            </div>
          </div>

          {/* Action Callout: 30-Second Safety & PPE Audit */}
          <div className="bg-yellow-50/80 border-2 border-amber-300 rounded-3xl p-6 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wide flex items-center gap-1.5">
                <HardHat className="w-4 h-4 text-amber-600" /> Action Required • Site 4B
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 bg-amber-400 text-slate-950 rounded-full">
                +50 XP
              </span>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              Share quick anonymous feedback for today's shift at Apex Infra Site 4B. Confirms PPE gear and clean drinking water welfare.
            </p>

            {!auditSubmitted ? (
              <button
                onClick={() => setIsAuditModalOpen(true)}
                className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-2xl shadow-sm btn-smooth transition-all cursor-pointer mt-1"
              >
                Complete 30-Sec Safety Audit
              </button>
            ) : (
              <div className="w-full py-3 bg-emerald-100 text-emerald-800 rounded-2xl text-center text-xs font-bold flex items-center justify-center gap-2">
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Feedback Logged & Sealed on Ledger ✓</span>
              </div>
            )}
          </div>

          {/* Statutory Protection & Wallet Info */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-3 text-xs">
            <span className="uppercase font-bold text-slate-400 block tracking-wider text-[11px]">
              Statutory Protection & Wallet
            </span>
            <div className="flex items-center justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Emergency SOS Contact</span>
              <span className="text-slate-900 font-bold">Deepa Patel (Spouse) • READY</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Payout Bank Account</span>
              <span className="text-emerald-700 font-bold">patel.ramesh@okaxis • UPI VERIFIED</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-slate-500 font-medium">Smart Escrow Ledger ID</span>
              <span className="text-amber-700 font-mono font-bold">#0x82...FA12 (Immutable)</span>
            </div>
          </div>
        </div>

        {/* Right Column (7 cols on md): Stats, Operational Score & Reputation */}
        <div className="md:col-span-7 space-y-6">
          {/* Quick Stats Strip */}
          <div className="grid grid-cols-3 gap-3">
            {statsGrid.map(stat => (
              <div
                key={stat.label}
                className="bg-white border border-slate-200/80 p-4 rounded-3xl flex flex-col items-center justify-center text-center shadow-xs"
              >
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</span>
                <span className="text-2xl font-black text-slate-900 font-mono mt-1">{stat.value}</span>
                <span className="text-[11px] text-slate-500 font-medium">{stat.sub}</span>
              </div>
            ))}
          </div>

          {/* Operational Score Card */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-7 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-yellow-100 text-amber-700 flex items-center justify-center">
                  <HardHat className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Operational Score (Contractor Rated)
                </span>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                38 Shifts
              </span>
            </div>

            <div className="flex items-baseline justify-between">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-slate-900 font-mono">4.9</span>
                <div className="flex text-amber-400 text-base">
                  ★★★★★
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> Superior Tier
              </span>
            </div>

            {/* Breakdown Bars */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-medium text-slate-600">
                  <span>Punctuality</span>
                  <span className="font-bold text-slate-900">5.0 ★ (100%)</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-amber-400 h-full rounded-full" style={{ width: '100%' }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-medium text-slate-600">
                  <span>Safety Compliance</span>
                  <span className="font-bold text-slate-900">4.9 ★ (98%)</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '98%' }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-medium text-slate-600">
                  <span>Skill Delivery</span>
                  <span className="font-bold text-slate-900">4.8 ★ (96%)</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-sky-500 h-full rounded-full" style={{ width: '96%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Peer Review Credibility Card */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-7 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Site Review Credibility (Peer Trust)
                </span>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Trusted Voice
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-4xl font-black text-emerald-600 font-mono">98%</span>
                  <span className="text-xs font-bold text-slate-800 font-mono">Truth Score</span>
                </div>
                <span className="text-xs text-slate-500 mt-1">
                  Validated by <strong className="text-slate-900 font-bold">340+ peer workers</strong>
                </span>
              </div>

              <div className="w-14 h-14 rounded-full border-4 border-emerald-500 flex items-center justify-center font-extrabold text-sm text-emerald-600 font-mono">
                98%
              </div>
            </div>

            <p className="text-xs text-slate-600 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
              🔒 14 Anonymous Site Audits Published • Protected by ZK-Proof Hash
            </p>
          </div>

          {/* Latest Shift Performance */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-3">
            <span className="text-xs font-bold uppercase tracking-wide text-slate-400">
              Latest Shift Performance
            </span>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">Shift #42 • Site 4B Metalworks</span>
                <span className="text-xs font-extrabold text-amber-600 font-mono">5.0 ★</span>
              </div>
              <p className="text-xs text-slate-600 italic">
                "Excellent safety adherence during 6th floor scaffold welding. Tools returned in immaculate condition."
              </p>
              <span className="text-[11px] font-bold text-amber-700 block pt-1">
                — Shankar Patil (Site Manager)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 30-Sec Audit Modal */}
      {isAuditModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 sm:p-7 flex flex-col gap-4 shadow-2xl border-2 border-amber-300">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">Encrypted Worker Review</h3>
                <span className="text-xs font-bold text-emerald-600">Site 4B High-Rise • 30-Sec Audit</span>
              </div>
              <button onClick={() => setIsAuditModalOpen(false)} className="text-slate-400 hover:text-slate-800 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAuditSubmit} className="flex flex-col gap-4 text-xs">
              <div>
                <label className="text-slate-800 font-bold block mb-2">
                  1. Was complete mandatory PPE provided on-site?
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPpeAnswer('yes')}
                    className={`py-2.5 rounded-xl font-bold uppercase transition-all cursor-pointer ${
                      ppeAnswer === 'yes' ? 'bg-emerald-500 text-white shadow-xs' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    Yes, Complete
                  </button>
                  <button
                    type="button"
                    onClick={() => setPpeAnswer('no')}
                    className={`py-2.5 rounded-xl font-bold uppercase transition-all cursor-pointer ${
                      ppeAnswer === 'no' ? 'bg-rose-500 text-white shadow-xs' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    No / Faulty
                  </button>
                </div>
              </div>

              <div>
                <label className="text-slate-800 font-bold block mb-2">
                  2. Was chilled clean drinking water accessible?
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setWaterAnswer('yes')}
                    className={`py-2.5 rounded-xl font-bold uppercase transition-all cursor-pointer ${
                      waterAnswer === 'yes' ? 'bg-emerald-500 text-white shadow-xs' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    Verified Water
                  </button>
                  <button
                    type="button"
                    onClick={() => setWaterAnswer('no')}
                    className={`py-2.5 rounded-xl font-bold uppercase transition-all cursor-pointer ${
                      waterAnswer === 'no' ? 'bg-rose-500 text-white shadow-xs' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    Empty / Warm
                  </button>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-2xl text-[11px] text-amber-900 leading-relaxed">
                🔒 Your response is converted to an anonymous ZK-Proof. No supervisors can identify your device.
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold uppercase rounded-2xl shadow-sm cursor-pointer"
              >
                Submit Anonymously (+50 XP)
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}