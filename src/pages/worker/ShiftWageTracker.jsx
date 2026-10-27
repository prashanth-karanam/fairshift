import React, { useState } from 'react';
import {
  Clock, TrendingUp, AlertTriangle, Timer, Building2, HardHat,
  CheckCircle2, ShieldCheck, ArrowUpRight, Banknote, CircleDot,
  CalendarDays, BarChart3, ChevronRight, Wallet, Hourglass,
  Volume2, Phone, PlayCircle, ReceiptText, Sparkles
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
    showToast('Shift signed off! ₹920.00 instantly transferred to your UPI account.');
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-semibold animate-in fade-in border border-yellow-400">
          <CheckCircle2 className="w-4 h-4 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Status Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white border border-slate-200/80 p-4 rounded-2xl shadow-sm gap-2">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-sm font-bold text-slate-800">
            Site 4B Active • Navi Mumbai Industrial Zone
          </span>
        </div>
        <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-yellow-100 text-amber-900 text-xs font-bold">
          BOCW ACT 1996 COMPLIANT
        </span>
      </div>

      {/* Main Grid: 2 Columns on Desktop, 1 Column on Mobile */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left Column (5 cols on md) */}
        <div className="md:col-span-5 space-y-5">
          {/* Hero Earnings Card */}
          <section className="bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-400 rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center shadow-md text-slate-950 relative overflow-hidden">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/10 backdrop-blur-sm text-slate-900 text-xs font-bold mb-3">
              <span>Today's Accrued Earnings</span>
            </div>

            <div className="flex items-baseline justify-center gap-1 my-2">
              <span className="text-3xl font-extrabold font-mono">₹</span>
              <span className="text-6xl sm:text-7xl font-black font-mono tracking-tight">920</span>
              <span className="text-base font-mono opacity-80">.00</span>
            </div>

            <div className="inline-flex items-center gap-2 bg-slate-950/15 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold text-slate-950 mt-2">
              <Clock className="w-4 h-4" />
              <span>8 hrs regular + 1.5 hrs overtime</span>
            </div>
          </section>

          {/* Clock Out Action */}
          <section className="space-y-2">
            {!clockedOut ? (
              <button
                onClick={handleClockOut}
                className="w-full h-14 bg-slate-950 hover:bg-slate-800 text-amber-400 font-bold text-sm tracking-wider uppercase rounded-2xl flex items-center justify-center gap-2.5 shadow-md btn-smooth transition-all cursor-pointer"
              >
                <Timer className="w-5 h-5 text-amber-400" />
                <span>Clock Out (Digital Sign-Off)</span>
              </button>
            ) : (
              <div className="w-full py-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center text-emerald-800 font-bold text-xs flex items-center justify-center gap-2 shadow-xs">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Shift Signed Off • ₹920 Disbursed in 42s</span>
              </div>
            )}

            <div className="flex items-center justify-center gap-1.5 text-center text-xs text-slate-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Apex Infra Site 4B • Geofenced Active</span>
            </div>
          </section>

          {/* Quick Assistance */}
          <section className="bg-white border border-slate-200/80 rounded-3xl p-5 space-y-3 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Quick Assistance & Safety
            </h3>
            <div className="grid grid-cols-1 gap-2.5">
              <button
                onClick={() => showToast('Opening Anonymous Hazard Ticket for Site 4B...')}
                className="w-full px-4 py-3 bg-slate-50 hover:bg-rose-50 rounded-2xl flex items-center justify-between transition-colors border border-slate-100 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800">⚠️ Report Safety Hazard</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <a
                href="tel:+919820199411"
                className="w-full px-4 py-3 bg-slate-50 hover:bg-emerald-50 rounded-2xl flex items-center justify-between transition-colors border border-slate-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800">📞 Call Site Supervisor</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
            </div>
          </section>
        </div>

        {/* Right Column: Detailed Payslip (7 cols on md) */}
        <div className="md:col-span-7 space-y-5">
          <section className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-7 space-y-5 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-yellow-100 text-amber-700 flex items-center justify-center">
                  <ReceiptText className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-extrabold text-slate-900">
                    Shift Summary & Wage Ledger
                  </h2>
                  <p className="text-xs text-slate-400 font-medium">
                    Itemized breakdown under Factories Act 1948
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                100% Verified
              </span>
            </div>

            <div className="space-y-4">
              {/* Step 1: Regular */}
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <div className="space-y-0.5">
                  <span className="text-sm font-bold text-slate-800">Regular Pay</span>
                  <p className="text-xs font-mono text-slate-400">8.0 hrs @ ₹80.00 / hr</p>
                </div>
                <span className="text-base font-extrabold font-mono text-slate-900">₹640.00</span>
              </div>

              {/* Step 2: Overtime */}
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <div className="space-y-0.5">
                  <span className="text-sm font-bold text-slate-800">Statutory Overtime (1.5x)</span>
                  <p className="text-xs font-mono text-slate-400">1.5 hrs @ ₹120.00 / hr</p>
                </div>
                <span className="text-base font-extrabold font-mono text-amber-600">₹180.00</span>
              </div>

              {/* Step 3: Site Bonus */}
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <div className="space-y-0.5">
                  <span className="text-sm font-bold text-slate-800">Scaffold Safety Allowance</span>
                  <p className="text-xs font-mono text-slate-400">100% Attendance & Safety Protocol</p>
                </div>
                <span className="text-base font-extrabold font-mono text-emerald-600">₹100.00</span>
              </div>

              {/* Total Take Home */}
              <div className="bg-yellow-50/80 border border-yellow-200 rounded-2xl p-4 flex items-center justify-between mt-2">
                <div className="flex items-center gap-2.5">
                  <Wallet className="w-5 h-5 text-amber-600" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Total Take Home Disbursed
                  </span>
                </div>
                <span className="text-2xl font-black text-amber-700 font-mono">
                  ₹920.00
                </span>
              </div>
            </div>

            {/* Audio Spoken Summary TTS Button */}
            <button
              onClick={handleAudioSummary}
              className="w-full py-3.5 px-4 bg-slate-50 hover:bg-yellow-50 text-slate-800 rounded-2xl text-xs font-bold flex items-center justify-between transition-colors border border-slate-200/80 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center">
                  <Volume2 className={`w-4 h-4 ${isPlayingAudio ? 'animate-pulse' : ''}`} />
                </div>
                <span>{isPlayingAudio ? 'Playing Spoken Breakdown...' : '🔊 Listen to Summary (Native Audio Guide)'}</span>
              </div>
              <PlayCircle className="w-5 h-5 text-amber-500" />
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
