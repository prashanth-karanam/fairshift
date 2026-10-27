import React, { useState } from 'react';
import {
  MapPin, Navigation, Phone, CheckCircle2, AlertTriangle, ShieldCheck,
  Clock, DollarSign, HardHat, Footprints, Droplets, Home, Cross,
  Volume2, Lock, Radio, ExternalLink, Sparkles, Check, ChevronRight
} from 'lucide-react';

export default function LocationCheckIn() {
  const [clockInState, setClockInState] = useState('idle'); // 'idle' | 'verifying' | 'clocked_in'
  const [clockInTime, setClockInTime] = useState(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [safetyChecklist, setSafetyChecklist] = useState({
    ppe: true,
    brief: true,
    exits: false
  });
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAudioAnnouncement = () => {
    setIsPlayingAudio(true);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(
        "You are within 50 meters of Site 4B. Geofence confirmed. Please clock in."
      );
      utterance.rate = 1.0;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsPlayingAudio(false), 2500);
    }
  };

  const handleClockIn = () => {
    if (clockInState === 'clocked_in') return;
    setClockInState('verifying');

    setTimeout(() => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setClockInTime(timeStr);
      setClockInState('clocked_in');
      showToast('Biometrics & Smart Escrow Ledger Verified on-chain!');
    }, 1400);
  };

  const toggleSafetyItem = (key) => {
    setSafetyChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex flex-col gap-4 text-slate-800 pb-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-semibold animate-in fade-in border border-yellow-400">
          <CheckCircle2 className="w-4 h-4 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Dispatch Status Banner */}
      <div className="bg-white border border-slate-100 p-4 rounded-3xl flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping shrink-0" />
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
              Applied & Accepted
            </span>
            <span className="text-sm font-extrabold text-slate-900 truncate">
              Site 4B High-Rise (Apex Infra)
            </span>
          </div>
        </div>
        <div className="px-3 py-1 bg-yellow-50 text-amber-800 border border-yellow-200 rounded-full text-xs font-mono font-bold shrink-0">
          SHIFT #7842
        </div>
      </div>

      {/* Live Mini-Map Preview Card */}
      <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
        <div className="relative h-48 bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden flex items-center justify-center">
          {/* Simulated Map Visual */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'radial-gradient(#FACC15 1px, transparent 1px), linear-gradient(to right, #334155 1px, transparent 1px), linear-gradient(to bottom, #334155 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }} />

          {/* User Location Pulse */}
          <div className="absolute left-[30%] top-[55%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
            <span className="w-10 h-10 rounded-full bg-amber-400/30 animate-ping absolute" />
            <span className="w-5 h-5 rounded-full bg-amber-400 border-2 border-white shadow-md relative z-10" />
            <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/95 text-slate-900 font-bold px-2 py-0.5 rounded-full text-[10px] shadow-sm">
              You (45m)
            </div>
          </div>

          {/* Worksite Target Pin */}
          <div className="absolute left-[70%] top-[35%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-900 flex items-center justify-center shadow-lg font-bold">
              <MapPin className="w-5 h-5 fill-current" />
            </div>
            <div className="mt-1 bg-slate-900 text-amber-300 font-bold px-2 py-0.5 rounded-full text-[10px] shadow-sm">
              Gate 2 • Site 4B
            </div>
          </div>

          {/* Top GPS Telemetry Indicator */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/95 text-slate-800 backdrop-blur px-3 py-1 rounded-full shadow-sm">
            <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
            <span className="text-[10px] font-bold">
              RADAR ACCURACY: ±2M
            </span>
          </div>

          {/* Live ETA Overlay Bar */}
          <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur p-3 rounded-2xl flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <Footprints className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-extrabold text-slate-900 font-mono">
                  12 mins <span className="text-slate-500 font-normal">(1.8 km)</span>
                </span>
                <span className="text-[10px] text-slate-400 truncate">
                  via Palm Beach Rd Corridor
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-mono text-emerald-700 font-bold">LIVE ROUTE</span>
            </div>
          </div>
        </div>

        {/* Quick External Actions Grid */}
        <div className="p-3 bg-white grid grid-cols-2 gap-2 border-t border-slate-100">
          <button
            onClick={() => {
              window.open('https://maps.google.com', '_blank');
              showToast('Launching Google Maps navigation...');
            }}
            className="flex items-center justify-center gap-2 py-2.5 px-3 bg-slate-50 hover:bg-yellow-50 text-slate-700 rounded-2xl transition-colors text-xs font-bold border border-slate-200/80"
          >
            <Navigation className="w-3.5 h-3.5 text-amber-600" />
            <span>Google Maps</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </button>
          <a
            href="tel:+919820199411"
            className="flex items-center justify-center gap-2 py-2.5 px-3 bg-slate-50 hover:bg-emerald-50 text-slate-700 rounded-2xl transition-colors text-xs font-bold border border-slate-200/80"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-600" />
            <span>Call Shankar</span>
          </a>
        </div>
      </div>

      {/* Prominent GPS Arrival Detection Card */}
      <div className="bg-white border-2 border-amber-300 rounded-3xl p-5 shadow-sm flex flex-col gap-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-slate-900 uppercase">
              Live GPS Geofence
            </span>
          </div>
          <span className="text-[11px] font-bold text-emerald-700 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full">
            45m from Entrance
          </span>
        </div>

        <div className="bg-emerald-50 border border-emerald-200/80 p-3 rounded-2xl flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 font-bold shadow-sm">
            <Check className="w-5 h-5 stroke-[3]" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wide">
              GPS Confirmed • Geofence Cleared
            </span>
            <span className="text-xs font-extrabold text-slate-900 truncate">
              YOU HAVE REACHED THE WORK LOCATION!
            </span>
          </div>
        </div>

        {/* Voice Announcement Audio Toggle */}
        <div className="flex items-center justify-between bg-yellow-50/70 border border-yellow-200/70 px-4 py-2.5 rounded-2xl">
          <div className="flex items-center gap-2 min-w-0">
            <Volume2 className={`w-4 h-4 shrink-0 ${isPlayingAudio ? 'text-amber-600 animate-pulse' : 'text-slate-500'}`} />
            <span className="text-xs text-slate-700 truncate font-medium">
              "You are within 50m of Site 4B"
            </span>
          </div>
          <button
            onClick={handleAudioAnnouncement}
            className="px-3 py-1 bg-white hover:bg-yellow-100 text-amber-800 text-xs font-bold rounded-xl transition-colors border border-yellow-200 shadow-xs cursor-pointer"
          >
            {isPlayingAudio ? 'Playing...' : 'Replay'}
          </button>
        </div>

        {/* Clock In Action Button */}
        {clockInState === 'idle' && (
          <button
            onClick={handleClockIn}
            className="w-full h-14 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-2xl font-bold text-sm tracking-wide uppercase flex items-center justify-center gap-2 shadow-md btn-smooth transition-all cursor-pointer"
          >
            <Lock className="w-5 h-5" />
            <span>Mark Reached & Clock In</span>
          </button>
        )}

        {clockInState === 'verifying' && (
          <button
            disabled
            className="w-full h-14 bg-amber-200 text-slate-900 rounded-2xl font-bold text-sm tracking-wide uppercase flex items-center justify-center gap-2 cursor-wait"
          >
            <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
            <span>Verifying Biometrics & Escrow...</span>
          </button>
        )}

        {clockInState === 'clocked_in' && (
          <div className="w-full bg-emerald-50 border border-emerald-300 p-4 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-emerald-800 uppercase">
                  Clocked In Successfully
                </span>
                <span className="text-[11px] text-slate-600 font-mono">
                  Timestamp: {clockInTime || '08:01 AM'} (Escrow Locked)
                </span>
              </div>
            </div>
            <span className="px-3 py-1 bg-emerald-500 text-white font-bold text-[10px] rounded-full">
              ON DUTY
            </span>
          </div>
        )}
      </div>

      {/* Operational Briefing Summary */}
      <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm flex flex-col gap-3">
        <div className="flex items-center justify-between pb-1 border-b border-slate-100">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
            Shift Briefing
          </span>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
            CONTRACT VERIFIED
          </span>
        </div>

        {/* Supervisor */}
        <div className="flex items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 font-black flex items-center justify-center text-sm shadow-sm">
              SP
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Reporting Supervisor</span>
              <span className="text-xs font-extrabold text-slate-900">Shankar Patil</span>
              <span className="text-[10px] text-slate-500">Chief Site Manager • Gates 3 & 4</span>
            </div>
          </div>
          <a
            href="tel:+919820199411"
            className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-emerald-600 hover:bg-emerald-50 transition-colors"
          >
            <Phone className="w-4 h-4" />
          </a>
        </div>

        {/* Shift Financials & Hours (2 columns) */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex flex-col gap-0.5">
            <span className="text-[10px] text-slate-400 font-bold uppercase">Shift Timeline</span>
            <div className="flex items-center gap-1 text-xs font-extrabold text-slate-900 font-mono">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              <span>08:00 AM - 04:30 PM</span>
            </div>
            <span className="text-[10px] text-slate-400">Standard 8.5 Hr Shift</span>
          </div>

          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex flex-col gap-0.5">
            <span className="text-[10px] text-slate-400 font-bold uppercase">Base Compensation</span>
            <div className="flex items-center gap-1 text-xs font-extrabold text-emerald-600 font-mono">
              <DollarSign className="w-3.5 h-3.5" />
              <span>₹800 Daily Base</span>
            </div>
            <span className="text-[10px] text-emerald-700 font-semibold font-mono">OT: ₹120/hr eligible</span>
          </div>
        </div>

        {/* Mandatory Safety Equipment */}
        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex flex-col gap-2">
          <span className="text-[10px] text-slate-400 font-bold uppercase">Mandatory Safety Gear</span>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-700 flex items-center gap-1.5">
              <HardHat className="w-3.5 h-3.5 text-amber-500" />
              Hard Hat Required
            </span>
            <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-700 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
              Safety Boots
            </span>
          </div>
        </div>

        {/* Verified Amenities */}
        <div className="flex flex-col gap-2 pt-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            FairShift Verified Site Welfare
          </span>
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100 flex flex-col items-center text-center gap-1">
              <Droplets className="w-5 h-5 text-sky-500" />
              <span className="text-[10px] font-bold text-slate-800 leading-tight">Clean Water</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100 flex flex-col items-center text-center gap-1">
              <Home className="w-5 h-5 text-amber-500" />
              <span className="text-[10px] font-bold text-slate-800 leading-tight">Shaded Rest</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100 flex flex-col items-center text-center gap-1">
              <Cross className="w-5 h-5 text-rose-500" />
              <span className="text-[10px] font-bold text-slate-800 leading-tight">First Aid</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
