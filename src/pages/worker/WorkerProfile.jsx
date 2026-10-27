import React, { useState } from 'react';
import {
  Star, ShieldCheck, BadgeCheck, Award, Wrench, Clock,
  BarChart3, ChevronRight, Bell, Calendar, Edit3, User, Building2,
  TrendingUp, CheckCircle2, FileCheck, HardHat, Target, ThumbsUp,
  Lock, X, Check, Droplets
} from 'lucide-react';

const statsGrid = [
  { label: 'Completed', value: '38', sub: 'Shifts' },
  { label: 'Accrued', value: '₹34.2K', sub: 'Earnings' },
  { label: 'Impact', value: '14', sub: 'Reviews' },
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
    <div className="flex flex-col gap-4 p-4 text-[#FAFAFA]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#27272A] border border-[#FACC15] text-[#FAFAFA] px-4 py-2 rounded-lg shadow-xl flex items-center gap-2 text-xs font-mono animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#FACC15]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Profile Hero Card: Ramesh Patel */}
      <div className="bg-[#18181B] border border-[#27272A] rounded-xl p-4 shadow-hard flex flex-col gap-3 relative overflow-hidden">
        <div className="flex items-start gap-3.5">
          {/* Avatar with Verified pip */}
          <div className="relative shrink-0">
            <div className="w-16 h-16 rounded-xl bg-[#27272A] border border-[#3F3F46] flex items-center justify-center font-mono font-black text-xl text-[#FACC15] shadow-inner">
              RP
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#10B981] flex items-center justify-center text-[#09090B] font-bold text-[10px]">
              ✓
            </div>
          </div>

          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h1 className="text-base font-bold text-[#FAFAFA] truncate" style={{ fontFamily: 'Inter, sans-serif' }}>
                Ramesh Patel
              </h1>
              <span className="bg-[#10B981]/20 text-[#34D399] px-2 py-0.5 rounded text-[9px] font-mono font-bold flex items-center gap-1 border border-[#10B981]/30">
                <CheckCircle2 className="w-2.5 h-2.5" /> VERIFIED
              </span>
            </div>
            <p className="text-xs text-[#A1A1AA] font-mono truncate">
              Welder & General Fabricator
            </p>
            <div className="flex items-center gap-2 mt-1 text-[#A1A1AA] text-[10px] font-mono">
              <span>Navi Mumbai Hub</span>
              <span>•</span>
              <span>+91 98••• 4120</span>
            </div>
          </div>
        </div>

        {/* Top 5% Worker Status Badge Ribbon */}
        <div className="bg-[#27272A] border border-[#3F3F46] rounded-lg p-2.5 flex items-center gap-2.5">
          <div className="w-7 h-7 rounded bg-[#FACC15]/20 text-[#FACC15] flex items-center justify-center font-bold text-xs shrink-0">
            ★
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-mono text-[#FACC15] font-bold uppercase tracking-wider">
              Top 5% Worker Status
            </span>
            <span className="text-[11px] text-[#FAFAFA] truncate font-mono">
              Preferred Site Access & Instant Hire Enabled
            </span>
          </div>
        </div>
      </div>

      {/* Quick Stats Metric Strip (3 Columns) */}
      <div className="grid grid-cols-3 gap-2">
        {statsGrid.map(stat => (
          <div
            key={stat.label}
            className="bg-[#18181B] border border-[#27272A] p-2.5 rounded-xl flex flex-col items-center justify-center text-center shadow-hard"
          >
            <span className="text-[10px] font-mono text-[#A1A1AA] uppercase font-bold">{stat.label}</span>
            <span className="text-lg font-extrabold text-[#FAFAFA] font-mono mt-0.5">{stat.value}</span>
            <span className="text-[10px] font-mono text-[#A1A1AA]">{stat.sub}</span>
          </div>
        ))}
      </div>

      {/* Dual Reputation Engine Cards */}
      <div className="flex flex-col gap-3">
        {/* Box 1: Operational Score (Admin Evaluation) */}
        <div className="bg-[#18181B] border border-[#27272A] rounded-xl p-4 shadow-hard flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <HardHat className="w-4 h-4 text-[#FACC15]" />
              <span className="text-xs font-mono font-bold text-[#FAFAFA] uppercase">
                Operational Score (Contractor Rated)
              </span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#27272A] text-[#A1A1AA]">
              38 Shifts
            </span>
          </div>

          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-[#FAFAFA] font-mono">4.9</span>
              <div className="flex text-[#FACC15] text-sm">
                ★★★★★
              </div>
            </div>
            <span className="text-xs font-mono text-[#10B981] font-bold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> Superior Tier
            </span>
          </div>

          {/* Breakdown Bars */}
          <div className="flex flex-col gap-2 pt-1 border-t border-[#27272A]">
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-[#A1A1AA]">Punctuality</span>
                <span className="font-bold text-[#FAFAFA]">5.0 ★ (100%)</span>
              </div>
              <div className="w-full bg-[#27272A] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#FACC15] h-full rounded-full" style={{ width: '100%' }} />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-[#A1A1AA]">Safety Compliance</span>
                <span className="font-bold text-[#FAFAFA]">4.9 ★ (98%)</span>
              </div>
              <div className="w-full bg-[#27272A] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#10B981] h-full rounded-full" style={{ width: '98%' }} />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-[#A1A1AA]">Skill Delivery</span>
                <span className="font-bold text-[#FAFAFA]">4.8 ★ (96%)</span>
              </div>
              <div className="w-full bg-[#27272A] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#06B6D4] h-full rounded-full" style={{ width: '96%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Box 2: Peer Review Credibility (Peer Trust) */}
        <div className="bg-[#18181B] border border-[#27272A] rounded-xl p-4 shadow-hard flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#10B981]" />
              <span className="text-xs font-mono font-bold text-[#FAFAFA] uppercase">
                Site Review Credibility (Peer Trust)
              </span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#10B981]/20 text-[#34D399] font-bold">
              Trusted Voice
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-black text-[#10B981] font-mono">98%</span>
                <span className="text-xs font-bold text-[#FAFAFA] font-mono">Truth Score</span>
              </div>
              <span className="text-[10px] text-[#A1A1AA] font-mono mt-0.5">
                Validated by <strong className="text-[#FAFAFA]">340+ peer workers</strong>
              </span>
            </div>

            <div className="w-12 h-12 rounded-full border-2 border-[#10B981] flex items-center justify-center font-mono font-bold text-xs text-[#10B981]">
              98%
            </div>
          </div>

          <p className="text-[11px] text-[#A1A1AA] font-mono bg-[#27272A] p-2 rounded">
            🔒 14 Anonymous Site Audits Published • Protected by ZK-Proof Hash
          </p>
        </div>
      </div>

      {/* Action Callout: 30-Second Safety & PPE Audit */}
      <div className="bg-[#18181B] border-2 border-[#FACC15] rounded-xl p-4 shadow-hard flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-[#FACC15] uppercase tracking-wider flex items-center gap-1.5">
            <HardHat className="w-4 h-4" /> Action Required • Site 4B
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 bg-[#FACC15] text-[#09090B] font-bold rounded">
            +50 XP
          </span>
        </div>

        <p className="text-xs text-[#FAFAFA] font-mono">
          Share quick anonymous feedback for today's shift at Apex Infra Site 4B. Confirms PPE gear and clean drinking water welfare.
        </p>

        {!auditSubmitted ? (
          <button
            onClick={() => setIsAuditModalOpen(true)}
            className="w-full py-2.5 bg-[#FACC15] hover:bg-[#EAB308] text-[#09090B] font-mono text-xs font-bold uppercase rounded-lg shadow-sm btn-press transition-all cursor-pointer mt-1"
          >
            Complete 30-Sec Safety Audit
          </button>
        ) : (
          <div className="w-full py-2 bg-[#10B981]/15 border border-[#10B981] rounded-lg text-center text-[#10B981] font-mono text-xs font-bold">
            Feedback Logged & Sealed on Ledger ✓
          </div>
        )}
      </div>

      {/* Latest Shift Performance */}
      <div className="bg-[#18181B] border border-[#27272A] rounded-xl p-3.5 shadow-hard flex flex-col gap-2">
        <span className="text-xs font-mono font-bold uppercase text-[#A1A1AA]">
          Latest Shift Performance
        </span>
        <div className="bg-[#27272A] p-3 rounded-lg border border-[#3F3F46]">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-[#FAFAFA]">Shift #42 • Site 4B Metalworks</span>
            <span className="text-xs font-bold text-[#FACC15] font-mono">5.0 ★</span>
          </div>
          <p className="text-xs text-[#A1A1AA] italic font-mono">
            "Excellent safety adherence during 6th floor scaffold welding. Tools returned in immaculate condition."
          </p>
          <span className="text-[10px] font-mono text-[#FACC15] block mt-1">
            — Shankar Patil (Site Manager)
          </span>
        </div>
      </div>

      {/* Account & Protection Settings */}
      <div className="bg-[#18181B] border border-[#27272A] rounded-xl p-3.5 shadow-hard flex flex-col gap-2 text-xs font-mono">
        <span className="uppercase font-bold text-[#A1A1AA]">Account & Statutory Protection</span>
        <div className="flex items-center justify-between py-1.5 border-b border-[#27272A]">
          <span className="text-[#A1A1AA]">Emergency SOS Contact</span>
          <span className="text-[#FAFAFA] font-bold">Deepa Patel (Spouse) • READY</span>
        </div>
        <div className="flex items-center justify-between py-1.5 border-b border-[#27272A]">
          <span className="text-[#A1A1AA]">Payout Bank Account</span>
          <span className="text-[#10B981] font-bold">patel.ramesh@okaxis • UPI VERIFIED</span>
        </div>
        <div className="flex items-center justify-between py-1.5">
          <span className="text-[#A1A1AA]">Smart Escrow Ledger ID</span>
          <span className="text-[#FACC15] font-mono">#0x82...FA12 (Immutable)</span>
        </div>
      </div>

      {/* 30-Sec Audit Modal */}
      {isAuditModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#09090B]/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-sm bg-[#18181B] border-2 border-[#FACC15] rounded-xl p-5 flex flex-col gap-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#27272A] pb-2">
              <div>
                <h3 className="text-sm font-bold text-[#FAFAFA]">Encrypted Worker Review</h3>
                <span className="text-[10px] font-mono text-[#10B981]">Site 4B High-Rise • 30-Sec Audit</span>
              </div>
              <button onClick={() => setIsAuditModalOpen(false)} className="text-[#A1A1AA] hover:text-[#FAFAFA]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAuditSubmit} className="flex flex-col gap-3 text-xs font-mono">
              <div>
                <label className="text-[#FAFAFA] block mb-1.5">
                  1. Was complete mandatory PPE provided on-site?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPpeAnswer('yes')}
                    className={`py-2 rounded font-bold uppercase transition-all ${
                      ppeAnswer === 'yes' ? 'bg-[#10B981] text-[#09090B]' : 'bg-[#27272A] text-[#A1A1AA]'
                    }`}
                  >
                    Yes, Complete
                  </button>
                  <button
                    type="button"
                    onClick={() => setPpeAnswer('no')}
                    className={`py-2 rounded font-bold uppercase transition-all ${
                      ppeAnswer === 'no' ? 'bg-[#F43F5E] text-white' : 'bg-[#27272A] text-[#A1A1AA]'
                    }`}
                  >
                    No / Faulty
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[#FAFAFA] block mb-1.5">
                  2. Was chilled clean drinking water accessible?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setWaterAnswer('yes')}
                    className={`py-2 rounded font-bold uppercase transition-all ${
                      waterAnswer === 'yes' ? 'bg-[#10B981] text-[#09090B]' : 'bg-[#27272A] text-[#A1A1AA]'
                    }`}
                  >
                    Verified Water
                  </button>
                  <button
                    type="button"
                    onClick={() => setWaterAnswer('no')}
                    className={`py-2 rounded font-bold uppercase transition-all ${
                      waterAnswer === 'no' ? 'bg-[#F43F5E] text-white' : 'bg-[#27272A] text-[#A1A1AA]'
                    }`}
                  >
                    Empty / Warm
                  </button>
                </div>
              </div>

              <div className="bg-[#27272A] p-2 rounded text-[10px] text-[#A1A1AA]">
                🔒 Your response is converted to an anonymous ZK-Proof. No supervisors can identify your device.
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#FACC15] hover:bg-[#EAB308] text-[#09090B] font-bold uppercase rounded-lg shadow-sm"
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
