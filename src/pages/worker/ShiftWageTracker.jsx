import React, { useState } from 'react';
import {
  Clock, TrendingUp, AlertTriangle, Timer, Building2, HardHat,
  CheckCircle2, ShieldCheck, ArrowUpRight, Banknote, CircleDot,
  CalendarDays, BarChart3, ChevronRight, Wallet, Hourglass,
  Volume2, Phone, PlayCircle, ReceiptText
} from 'lucide-react';

export default function ShiftWageTracker() {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [clockedOut, setClockedOut] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAudioSummary = () => {
    setIsPlayingAudio(true);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const summaryText = "Your shift summary for Site 4B: Eight hours regular pay 640 rupees, one point five hours overtime 180 rupees, safety standard attendance bonus 100 rupees. Total take home 920 rupees, securely credited to your escrow wallet.";
      const utterance = new SpeechSynthesisUtterance(summaryText);
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsPlayingAudio(false), 2500);
    }
  };

  const handleClockOut = () => {
    setClockedOut(true);
    showToast('Shift closed at 04:30 PM! ₹920.00 instantly disbursed to your UPI/bank account.');
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

      {/* Header Badge */}
      <div className="flex items-center justify-between bg-[#18181B] border border-[#27272A] p-2.5 rounded-lg">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
          <span className="text-xs font-mono font-bold text-[#FAFAFA] uppercase">
            Site 4B Active • Navi Mumbai
          </span>
        </div>
        <span className="px-2 py-0.5 rounded bg-[#27272A] text-[#10B981] text-[10px] font-mono font-bold">
          BOCW ACT 1996
        </span>
      </div>

      {/* Cash App ₹920 Hero Card */}
      <section className="bg-[#18181B] border border-[#27272A] rounded-xl p-5 flex flex-col items-center text-center shadow-hard relative overflow-hidden">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="w-2 h-2 rounded-full bg-[#FACC15]" />
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#A1A1AA] font-bold">
            Today's Accrued Earnings
          </span>
        </div>

        <div className="flex items-baseline justify-center gap-1 my-2">
          <span className="text-3xl font-extrabold text-[#FACC15] font-mono">₹</span>
          <span className="text-5xl font-black text-[#FAFAFA] font-mono tracking-tight">920</span>
          <span className="text-xs font-mono text-[#A1A1AA]">.00</span>
        </div>

        <div className="inline-flex items-center gap-1.5 bg-[#27272A] border border-[#3F3F46] px-3 py-1 rounded-full text-xs font-mono text-[#FAFAFA]">
          <Clock className="w-3.5 h-3.5 text-[#FACC15]" />
          <span>8 hrs regular + 1.5 hrs overtime</span>
        </div>
      </section>

      {/* Prominent Tactile Clock Out Action */}
      <section className="flex flex-col gap-1.5">
        {!clockedOut ? (
          <button
            onClick={handleClockOut}
            className="w-full h-14 bg-[#FACC15] hover:bg-[#EAB308] text-[#09090B] font-mono font-bold text-sm tracking-wider uppercase rounded-xl flex items-center justify-center gap-2 shadow-hard btn-press transition-all cursor-pointer"
          >
            <Timer className="w-5 h-5 stroke-[2.5]" />
            <span>Clock Out (Digital Sign-Off)</span>
          </button>
        ) : (
          <div className="w-full py-3 bg-[#10B981]/15 border border-[#10B981] rounded-xl text-center text-[#10B981] font-mono text-xs font-bold flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Shift Signed Off • Payout Disbursed in 42s</span>
          </div>
        )}

        <div className="flex items-center justify-center gap-1.5 text-center text-[10px] font-mono text-[#A1A1AA]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
          <span>Apex Infra Site 4B • On Duty Geofenced</span>
        </div>
      </section>

      {/* Wise-Style Step-Line Pay Ledger Breakdown */}
      <section className="bg-[#18181B] border border-[#27272A] rounded-xl p-4 flex flex-col gap-3 shadow-hard">
        <div className="flex items-center justify-between pb-2 border-b border-[#27272A]">
          <div className="flex items-center gap-2">
            <ReceiptText className="w-4 h-4 text-[#FACC15]" />
            <h2 className="text-sm font-bold text-[#FAFAFA]" style={{ fontFamily: 'Inter, sans-serif' }}>
              Shift Summary (Wise Step Ledger)
            </h2>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#10B981]/15 text-[#34D399] border border-[#10B981]/30 uppercase font-bold">
            Verified
          </span>
        </div>

        <div className="flex flex-col gap-2.5">
          {/* Step 1: Regular */}
          <div className="flex items-center justify-between py-1 border-b border-[#27272A]/50">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#FAFAFA]">Regular Pay</span>
              <span className="text-[10px] font-mono text-[#A1A1AA]">8.0 hrs @ ₹80 / hr</span>
            </div>
            <span className="text-sm font-bold font-mono text-[#FAFAFA]">₹640.00</span>
          </div>

          {/* Step 2: Overtime */}
          <div className="flex items-center justify-between py-1 border-b border-[#27272A]/50">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#FAFAFA]">Statutory Overtime (1.5x)</span>
              <span className="text-[10px] font-mono text-[#A1A1AA]">1.5 hrs @ ₹120 / hr</span>
            </div>
            <span className="text-sm font-bold font-mono text-[#FACC15]">₹180.00</span>
          </div>

          {/* Step 3: Site Bonus */}
          <div className="flex items-center justify-between py-1 border-b border-[#27272A]/50">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#FAFAFA]">Scaffold Safety Allowance</span>
              <span className="text-[10px] font-mono text-[#A1A1AA]">Safety standard attendance</span>
            </div>
            <span className="text-sm font-bold font-mono text-[#10B981]">₹100.00</span>
          </div>

          {/* Total Take Home */}
          <div className="bg-[#27272A] border border-[#3F3F46] p-3 rounded-lg flex items-center justify-between mt-1">
            <div className="flex items-center gap-2">
              <Wallet className="w-4 h-4 text-[#FACC15]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#FAFAFA] font-mono">
                Total Take Home
              </span>
            </div>
            <span className="text-base font-extrabold text-[#FACC15] font-mono">
              ₹920.00
            </span>
          </div>
        </div>

        {/* Audio Spoken Summary TTS */}
        <button
          onClick={handleAudioSummary}
          className="w-full py-2.5 px-3 bg-[#27272A] hover:bg-[#3F3F46] active:bg-[#18181B] rounded-lg text-[#FAFAFA] text-xs font-mono font-semibold flex items-center justify-between transition-colors border border-[#3F3F46]"
        >
          <div className="flex items-center gap-2">
            <Volume2 className={`w-4 h-4 ${isPlayingAudio ? 'text-[#FACC15] animate-pulse' : 'text-[#A1A1AA]'}`} />
            <span>{isPlayingAudio ? 'Playing Spoken Breakdown...' : '🔊 Listen to Summary (Audio TTS)'}</span>
          </div>
          <PlayCircle className="w-4 h-4 text-[#FACC15]" />
        </button>
      </section>

      {/* Quick Assistance Actions */}
      <section className="bg-[#18181B] border border-[#27272A] rounded-xl p-3.5 flex flex-col gap-2 shadow-hard">
        <h3 className="text-xs font-mono uppercase font-bold text-[#A1A1AA]">
          Quick Assistance & Safety
        </h3>
        <div className="grid grid-cols-1 gap-2">
          <button
            onClick={() => showToast('Opening Anonymous Hazard Ticket for Site 4B...')}
            className="w-full px-3 py-2.5 bg-[#27272A] hover:bg-[#3F3F46] rounded-lg flex items-center justify-between transition-colors border border-[#3F3F46]"
          >
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#F43F5E]" />
              <span className="text-xs font-bold text-[#FAFAFA]">⚠️ 1-Tap Report Safety Issue</span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#A1A1AA]" />
          </button>

          <a
            href="tel:+919820199411"
            className="w-full px-3 py-2.5 bg-[#27272A] hover:bg-[#3F3F46] rounded-lg flex items-center justify-between transition-colors border border-[#3F3F46]"
          >
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#10B981]" />
              <span className="text-xs font-bold text-[#FAFAFA]">📞 Call Supervisor (Shankar Patil)</span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#A1A1AA]" />
          </a>
        </div>
      </section>
    </div>
  );
}
