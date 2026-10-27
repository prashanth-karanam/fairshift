import React, { useState } from 'react';
import {
  MapPin, Navigation, Phone, CheckCircle2, AlertTriangle, ShieldCheck,
  Clock, DollarSign, HardHat, Footprints, Droplets, Home, Cross,
  Volume2, Lock, Radio, ExternalLink, Sparkles, Check
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
    }, 1500);
  };

  const toggleSafetyItem = (key) => {
    setSafetyChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex flex-col gap-4 p-4 text-[#FAFAFA]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#27272A] border border-[#10B981] text-[#FAFAFA] px-4 py-2 rounded-lg shadow-xl flex items-center gap-2 text-xs font-mono animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Dispatch Status Banner */}
      <div className="bg-[#18181B] border border-[#27272A] p-3 rounded-lg flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping shrink-0" />
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#10B981] font-semibold">
              Applied & Accepted
            </span>
            <span className="text-sm font-bold text-[#FAFAFA] truncate" style={{ fontFamily: 'Inter, sans-serif' }}>
              Site 4B High-Rise (Apex Infra)
            </span>
          </div>
        </div>
        <div className="px-2 py-1 bg-[#27272A] rounded text-[11px] font-mono text-[#A1A1AA] shrink-0 border border-[#3F3F46]/50">
          SHIFT #7842
        </div>
      </div>

      {/* Live Mini-Map Preview Card */}
      <div className="bg-[#18181B] border border-[#27272A] rounded-lg overflow-hidden shadow-hard">
        <div className="relative h-44 bg-[#0e1726] overflow-hidden flex items-center justify-center">
          {/* Simulated Map Background Grid & Vector Art */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'radial-gradient(#38bdf8 1px, transparent 1px), linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }} />
          
          {/* Simulated Streets / Corridors */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
            <line x1="0" y1="120" x2="480" y2="40" stroke="#06B6D4" strokeWidth="6" strokeDasharray="6 6" />
            <line x1="120" y1="0" x2="260" y2="200" stroke="#334155" strokeWidth="8" />
            <circle cx="340" cy="65" r="45" fill="#FACC15" fillOpacity="0.1" stroke="#FACC15" strokeWidth="1" strokeDasharray="3 3" />
          </svg>

          {/* User Location Pulse */}
          <div className="absolute left-[28%] top-[55%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
            <span className="w-8 h-8 rounded-full bg-[#06B6D4]/30 animate-ping absolute" />
            <span className="w-4 h-4 rounded-full bg-[#06B6D4] border-2 border-white shadow-md relative z-10" />
            <div className="absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#09090B]/90 border border-[#06B6D4]/40 px-1.5 py-0.5 rounded text-[9px] font-mono text-[#06B6D4]">
              You (45m away)
            </div>
          </div>

          {/* Worksite Target Pin */}
          <div className="absolute left-[70%] top-[35%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-[#FACC15] text-[#09090B] flex items-center justify-center shadow-lg font-bold">
              <MapPin className="w-5 h-5 fill-current" />
            </div>
            <div className="mt-1 bg-[#09090B]/90 border border-[#FACC15]/50 px-1.5 py-0.5 rounded text-[9px] font-mono text-[#FACC15] font-bold">
              Gate 2 • Site 4B
            </div>
          </div>

          {/* Top GPS Telemetry Indicator */}
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 bg-[#09090B]/85 backdrop-blur border border-[#27272A] px-2 py-1 rounded">
            <Radio className="w-3.5 h-3.5 text-[#10B981] animate-pulse" />
            <span className="text-[10px] font-mono text-[#FAFAFA] font-semibold">
              RADAR ACCURACY: ±2M
            </span>
          </div>

          {/* Live ETA Overlay Bar */}
          <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-[#09090B]/90 backdrop-blur border border-[#27272A] p-2 rounded-lg flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-[#FACC15]/20 text-[#FACC15] flex items-center justify-center">
                <Footprints className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#FAFAFA] font-mono">
                  12 mins <span className="text-[#A1A1AA] font-normal">(1.8 km)</span>
                </span>
                <span className="text-[10px] text-[#A1A1AA] truncate">
                  via Palm Beach Rd Corridor
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-[#10B981]/15 border border-[#10B981]/30 px-2 py-0.5 rounded">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              <span className="text-[10px] font-mono text-[#10B981] font-bold">LIVE ROUTE</span>
            </div>
          </div>
        </div>

        {/* Quick External Actions Grid */}
        <div className="p-2 bg-[#18181B] grid grid-cols-2 gap-2 border-t border-[#27272A]">
          <button
            onClick={() => {
              window.open('https://maps.google.com', '_blank');
              showToast('Launching Google Maps navigation...');
            }}
            className="flex items-center justify-center gap-1.5 py-2 px-3 bg-[#27272A] hover:bg-[#3F3F46] text-[#FAFAFA] rounded border border-[#3F3F46] transition-colors text-xs font-mono font-medium"
          >
            <Navigation className="w-3.5 h-3.5 text-[#06B6D4]" />
            <span>Google Maps</span>
            <ExternalLink className="w-3 h-3 text-[#A1A1AA]" />
          </button>
          <a
            href="tel:+919820199411"
            className="flex items-center justify-center gap-1.5 py-2 px-3 bg-[#27272A] hover:bg-[#3F3F46] text-[#FAFAFA] rounded border border-[#3F3F46] transition-colors text-xs font-mono font-medium"
          >
            <Phone className="w-3.5 h-3.5 text-[#10B981]" />
            <span>Call Shankar</span>
          </a>
        </div>
      </div>

      {/* Prominent GPS Arrival Detection Card */}
      <div className="bg-[#18181B] border border-[#27272A] rounded-lg p-3.5 shadow-hard flex flex-col gap-3">
        {/* Geofence Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#10B981]" />
            <span className="text-xs font-mono uppercase tracking-wide text-[#FAFAFA] font-bold">
              Live GPS Geofence
            </span>
          </div>
          <span className="text-[11px] font-mono text-[#10B981] px-2 py-0.5 bg-[#10B981]/10 border border-[#10B981]/30 rounded">
            45m from Entrance
          </span>
        </div>

        {/* High-Impact State Indicator */}
        <div className="bg-[#27272A] border border-[#3F3F46] p-2.5 rounded-lg flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-[#10B981] text-[#09090B] flex items-center justify-center shrink-0 font-bold">
            <Check className="w-4 h-4 stroke-[3]" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-mono text-[#10B981] font-bold uppercase tracking-wider">
              GPS Confirmed • Geofence Cleared
            </span>
            <span className="text-xs font-bold text-[#FAFAFA] truncate" style={{ fontFamily: 'Inter, sans-serif' }}>
              YOU HAVE REACHED THE WORK LOCATION!
            </span>
          </div>
        </div>

        {/* Voice Announcement Audio Toggle */}
        <div className="flex items-center justify-between bg-[#0e0e11] px-3 py-2 rounded border border-[#27272A]">
          <div className="flex items-center gap-2 min-w-0">
            <Volume2 className={`w-4 h-4 shrink-0 ${isPlayingAudio ? 'text-[#FACC15] animate-pulse' : 'text-[#A1A1AA]'}`} />
            <span className="text-[11px] text-[#A1A1AA] truncate font-mono">
              "You are within 50m of Site 4B"
            </span>
          </div>
          <button
            onClick={handleAudioAnnouncement}
            className="px-2 py-1 bg-[#27272A] hover:bg-[#3F3F46] text-[#FAFAFA] text-[10px] font-mono uppercase rounded transition-colors"
          >
            {isPlayingAudio ? 'Playing...' : 'Replay'}
          </button>
        </div>

        {/* Clock In Action Button */}
        {clockInState === 'idle' && (
          <button
            onClick={handleClockIn}
            className="w-full h-13 bg-[#FACC15] hover:bg-[#EAB308] text-[#09090B] rounded font-mono font-bold text-sm uppercase tracking-wide flex items-center justify-center gap-2 shadow-hard btn-press transition-all cursor-pointer"
          >
            <Lock className="w-5 h-5" />
            <span>Mark Reached & Clock In</span>
          </button>
        )}

        {clockInState === 'verifying' && (
          <button
            disabled
            className="w-full h-13 bg-[#06B6D4] text-[#09090B] rounded font-mono font-bold text-sm uppercase tracking-wide flex items-center justify-center gap-2 cursor-wait"
          >
            <div className="w-4 h-4 border-2 border-[#09090B] border-t-transparent rounded-full animate-spin" />
            <span>Verifying Biometrics & Ledger...</span>
          </button>
        )}

        {clockInState === 'clocked_in' && (
          <div className="w-full bg-[#10B981]/20 border border-[#10B981] p-3 rounded flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
              <div className="flex flex-col">
                <span className="text-xs font-mono font-bold text-[#10B981] uppercase">
                  Clocked In Successfully
                </span>
                <span className="text-[11px] text-[#FAFAFA] font-mono">
                  Timestamp: {clockInTime || '08:01 AM'} (Escrow Locked)
                </span>
              </div>
            </div>
            <span className="px-2 py-0.5 bg-[#10B981] text-[#09090B] font-mono text-[10px] font-bold rounded">
              ON DUTY
            </span>
          </div>
        )}
      </div>

      {/* Safety & Protocol Checklist */}
      <div className="bg-[#18181B] border border-[#27272A] rounded-lg p-3.5 shadow-sm">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-mono uppercase font-bold text-[#FAFAFA] flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#FACC15]" />
            Site Protocol Checklist
          </span>
          <span className="text-[10px] font-mono text-[#A1A1AA]">
            {Object.values(safetyChecklist).filter(Boolean).length}/3 Cleared
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2.5 text-xs text-[#FAFAFA] cursor-pointer select-none">
            <input
              type="checkbox"
              checked={safetyChecklist.ppe}
              onChange={() => toggleSafetyItem('ppe')}
              className="w-4 h-4 accent-[#FACC15] rounded bg-[#27272A]"
            />
            <span>Full PPE worn (Hard hat, steel-toe boots & hi-vis vest)</span>
          </label>
          <label className="flex items-center gap-2.5 text-xs text-[#FAFAFA] cursor-pointer select-none">
            <input
              type="checkbox"
              checked={safetyChecklist.brief}
              onChange={() => toggleSafetyItem('brief')}
              className="w-4 h-4 accent-[#FACC15] rounded bg-[#27272A]"
            />
            <span>Daily safety briefing acknowledged with supervisor</span>
          </label>
          <label className="flex items-center gap-2.5 text-xs text-[#FAFAFA] cursor-pointer select-none">
            <input
              type="checkbox"
              checked={safetyChecklist.exits}
              onChange={() => toggleSafetyItem('exits')}
              className="w-4 h-4 accent-[#FACC15] rounded bg-[#27272A]"
            />
            <span>Emergency assembly points and exits identified</span>
          </label>
        </div>
      </div>

      {/* Operational Briefing Summary */}
      <div className="bg-[#18181B] border border-[#27272A] rounded-lg p-3.5 shadow-sm flex flex-col gap-3">
        <div className="flex items-center justify-between pb-1 border-b border-[#27272A]">
          <span className="text-xs font-mono uppercase tracking-wide text-[#FAFAFA] font-bold">
            Shift Briefing
          </span>
          <span className="text-[10px] font-mono text-[#10B981] bg-[#10B981]/10 border border-[#10B981]/30 px-2 py-0.5 rounded font-semibold">
            CONTRACT VERIFIED
          </span>
        </div>

        {/* Supervisor */}
        <div className="flex items-center justify-between bg-[#27272A] p-2.5 rounded-lg border border-[#3F3F46]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#18181B] border border-[#3F3F46] flex items-center justify-center text-sm font-bold font-mono text-[#FACC15]">
              SP
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-[#A1A1AA] uppercase">Reporting Supervisor</span>
              <span className="text-xs font-bold text-[#FAFAFA]">Shankar Patil</span>
              <span className="text-[10px] text-[#A1A1AA]">Chief Site Manager • Gates 3 & 4</span>
            </div>
          </div>
          <a
            href="tel:+919820199411"
            className="w-8 h-8 rounded bg-[#18181B] border border-[#3F3F46] flex items-center justify-center text-[#10B981] hover:bg-[#3F3F46] transition-colors"
          >
            <Phone className="w-4 h-4" />
          </a>
        </div>

        {/* Shift Financials & Hours (2 columns) */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-[#27272A] p-2.5 rounded-lg border border-[#3F3F46] flex flex-col gap-0.5">
            <span className="text-[10px] font-mono text-[#A1A1AA] uppercase">Shift Timeline</span>
            <div className="flex items-center gap-1 text-xs font-bold text-[#FAFAFA] font-mono">
              <Clock className="w-3.5 h-3.5 text-[#FACC15]" />
              <span>08:00 AM - 04:30 PM</span>
            </div>
            <span className="text-[10px] text-[#A1A1AA] font-mono">Standard 8.5 Hr Shift</span>
          </div>

          <div className="bg-[#27272A] p-2.5 rounded-lg border border-[#3F3F46] flex flex-col gap-0.5">
            <span className="text-[10px] font-mono text-[#A1A1AA] uppercase">Base Compensation</span>
            <div className="flex items-center gap-1 text-xs font-bold text-[#10B981] font-mono">
              <DollarSign className="w-3.5 h-3.5" />
              <span>₹800 Daily Base</span>
            </div>
            <span className="text-[10px] text-[#10B981] font-mono">OT: ₹120/hr eligible</span>
          </div>
        </div>

        {/* Mandatory Safety Equipment */}
        <div className="bg-[#27272A] p-2.5 rounded-lg border border-[#3F3F46] flex flex-col gap-1.5">
          <span className="text-[10px] font-mono text-[#A1A1AA] uppercase">Mandatory Safety Equipment</span>
          <div className="flex flex-wrap gap-1.5">
            <span className="px-2 py-1 bg-[#18181B] border border-[#3F3F46] rounded text-[11px] font-mono text-[#FAFAFA] flex items-center gap-1">
              <HardHat className="w-3.5 h-3.5 text-[#FACC15]" />
              Hard Hat
            </span>
            <span className="px-2 py-1 bg-[#18181B] border border-[#3F3F46] rounded text-[11px] font-mono text-[#FAFAFA] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FACC15]" />
              Steel-Toe Boots
            </span>
          </div>
          <p className="text-[10px] text-[#A1A1AA] font-mono mt-0.5">
            * Full secondary PPE kits available on-site at security gate
          </p>
        </div>

        {/* Verified Worksite Amenities (SDG 8 Quality Guarantee) */}
        <div className="flex flex-col gap-1.5 pt-1">
          <span className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-wider">
            FairShift Verified Site Welfare
          </span>
          <div className="grid grid-cols-3 gap-1.5">
            <div className="bg-[#27272A] p-2 rounded border border-[#3F3F46] flex flex-col items-center text-center gap-1">
              <Droplets className="w-4 h-4 text-[#06B6D4]" />
              <span className="text-[10px] font-mono text-[#FAFAFA] leading-tight">Clean Water</span>
              <CheckCircle2 className="w-3 h-3 text-[#10B981]" />
            </div>
            <div className="bg-[#27272A] p-2 rounded border border-[#3F3F46] flex flex-col items-center text-center gap-1">
              <Home className="w-4 h-4 text-[#FACC15]" />
              <span className="text-[10px] font-mono text-[#FAFAFA] leading-tight">Shaded Rest</span>
              <CheckCircle2 className="w-3 h-3 text-[#10B981]" />
            </div>
            <div className="bg-[#27272A] p-2 rounded border border-[#3F3F46] flex flex-col items-center text-center gap-1">
              <Cross className="w-4 h-4 text-[#F43F5E]" />
              <span className="text-[10px] font-mono text-[#FAFAFA] leading-tight">First Aid</span>
              <CheckCircle2 className="w-3 h-3 text-[#10B981]" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Check-ins History */}
      <div className="bg-[#18181B] border border-[#27272A] rounded-lg p-3.5 shadow-sm">
        <span className="text-xs font-mono uppercase font-bold text-[#FAFAFA] block mb-2">
          Recent Shift Check-Ins
        </span>
        <div className="flex flex-col divide-y divide-[#27272A]">
          <div className="py-2 flex items-center justify-between text-xs">
            <div className="flex flex-col">
              <span className="font-semibold text-[#FAFAFA]">Apex Infra - Site 4B</span>
              <span className="text-[10px] text-[#A1A1AA] font-mono">Yesterday • 07:02 AM</span>
            </div>
            <span className="text-[10px] font-mono text-[#10B981] bg-[#10B981]/15 px-2 py-0.5 rounded">
              VERIFIED 8.5H
            </span>
          </div>
          <div className="py-2 flex items-center justify-between text-xs">
            <div className="flex flex-col">
              <span className="font-semibold text-[#FAFAFA]">Metro Pier #12 Sanpada</span>
              <span className="text-[10px] text-[#A1A1AA] font-mono">3 days ago • 07:58 AM</span>
            </div>
            <span className="text-[10px] font-mono text-[#10B981] bg-[#10B981]/15 px-2 py-0.5 rounded">
              VERIFIED 8.0H
            </span>
          </div>
          <div className="py-2 flex items-center justify-between text-xs">
            <div className="flex flex-col">
              <span className="font-semibold text-[#FAFAFA]">SRM Logistics Turbhe</span>
              <span className="text-[10px] text-[#A1A1AA] font-mono">5 days ago • 06:45 AM</span>
            </div>
            <span className="text-[10px] font-mono text-[#10B981] bg-[#10B981]/15 px-2 py-0.5 rounded">
              VERIFIED 9.0H
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
