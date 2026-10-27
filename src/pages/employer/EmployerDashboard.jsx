import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Shield, Users, Table, FileCheck, AlertTriangle, Wallet,
  Bell, Building2, CheckCircle2, Download, Clock, MapPin,
  TrendingUp, Activity, Check, ArrowLeft, ChevronDown, Flame,
  PhoneCall, ShieldAlert, HeartCrack, Gavel, User, Sparkles, Lock
} from 'lucide-react';

const siteOptions = [
  {
    id: 'site4b',
    name: 'Apex Infrastructure — High-Rise Site 4B',
    type: 'Heavy Civil & Structural Construction',
    protocol: 'Construction Protocol #BOCW-96',
    workers: 142,
    escrow: '₹ 4,20,000',
    payroll: '₹ 1,18,450',
    emoji: '🏗️'
  },
  {
    id: 'zoneA',
    name: 'SRM University Facilities — Zone A',
    type: 'Campus Maintenance & HVAC Operations',
    protocol: 'Education Facility Protocol #BOCW-12',
    workers: 96,
    escrow: '₹ 2,80,000',
    payroll: '₹ 74,200',
    emoji: '🏫'
  },
  {
    id: 'ward3',
    name: 'Metro Health Logistics — Ward 3',
    type: 'Clinical Shift Compliance & Orderlies',
    protocol: 'Healthcare Infrastructure #BOCW-88',
    workers: 64,
    escrow: '₹ 1,90,000',
    payroll: '₹ 48,900',
    emoji: '🏥'
  }
];

const initialWorkers = [
  {
    id: 'W-8819',
    initials: 'RP',
    name: 'Ramesh Patel',
    aadhaar: '#W-8819 • Aadhaar Verified',
    trade: 'Welder / Fabrication',
    tier: 'Tier 2 Skilled',
    checkinTime: '07:00 AM',
    checkinGate: 'Site 4B Gate 2',
    hours: 9.5,
    otHours: 1.5,
    payout: 920.00,
    status: 'overtime',
    riskLevel: 'Amber: Overtime 9.5h',
    riskColor: 'amber',
    actionState: 'normal',
  },
  {
    id: 'W-9041',
    initials: 'SM',
    name: 'Suresh Murthy',
    aadhaar: '#W-9041 • Heavy Machine Cert',
    trade: 'Tower Crane Operator',
    tier: 'High Criticality',
    checkinTime: '08:00 AM',
    checkinGate: 'Site 4B Cab #1',
    hours: 6.2,
    otHours: 0,
    payout: 496.00,
    status: 'safe',
    riskLevel: 'Emerald: Safe Shift',
    riskColor: 'emerald',
    actionState: 'optimal',
  },
  {
    id: 'W-7102',
    initials: 'AK',
    name: 'Anand Kumar',
    aadhaar: '#W-7102 • Manual Heavy',
    trade: 'Concrete Finisher',
    tier: 'Extreme Physical Load',
    checkinTime: '06:00 AM',
    checkinGate: 'Site 4B Slab 6',
    hours: 11.8,
    otHours: 3.8,
    payout: 1196.00,
    status: 'standdown',
    riskLevel: 'Critical Stand-down >11h',
    riskColor: 'rose',
    actionState: 'normal',
  },
  {
    id: 'W-6632',
    initials: 'PS',
    name: 'Priyanka Sen',
    aadhaar: '#W-6632 • Field Safety Trainee',
    trade: 'Safety Inspector Helper',
    tier: 'General Shift',
    checkinTime: '07:30 AM',
    checkinGate: 'Site 4B Central',
    hours: 8.0,
    otHours: 0,
    payout: 640.00,
    status: 'completed',
    riskLevel: 'Shift Limit Reached',
    riskColor: 'amber',
    actionState: 'normal',
  }
];

const initialHazards = [
  {
    id: 'WHISTLE-991A',
    time: '18m ago',
    type: 'Severe Fall Hazard',
    severity: 'error',
    description: '"Unstable scaffolding joint & rusted harness clips on 6th floor east wing."',
    consensusCount: 84,
    consensusPct: 96,
    status: 'INSPECTING',
    mitigated: false
  },
  {
    id: 'WHISTLE-984C',
    time: '1h ago',
    type: 'Hydration / Welfare',
    severity: 'info',
    description: '"Drinking water dispenser empty at Sector B batching plant under 38°C heat."',
    consensusCount: 42,
    consensusPct: 90,
    status: 'RESOLVED',
    resolutionNote: 'Restocked at 11:30 AM',
    mitigated: true
  },
  {
    id: 'WHISTLE-979B',
    time: '3h ago',
    type: 'Machinery Hazard',
    severity: 'warning',
    description: '"Forklift operating in pedestrian walkway without reverse audio beeper."',
    consensusCount: 29,
    consensusPct: 88,
    status: 'DISPATCHED TECH',
    mitigated: false
  }
];

export default function EmployerDashboard() {
  const navigate = useNavigate();
  const [activeSite, setActiveSite] = useState(siteOptions[0]);
  const [isSiteDropdownOpen, setIsSiteDropdownOpen] = useState(false);
  const [activeSidebarNav, setActiveSidebarNav] = useState('roster');
  const [activeRosterFilter, setActiveRosterFilter] = useState('all');
  const [workers, setWorkers] = useState(initialWorkers);
  const [hazards, setHazards] = useState(initialHazards);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleNudgeWorker = (workerName) => {
    setWorkers(prev => prev.map(w => {
      if (w.name === workerName) {
        return { ...w, actionState: 'nudged' };
      }
      return w;
    }));
    showToast(`Mandatory 30-min Rest Nudge dispatched to ${workerName}'s handheld!`);
  };

  const handleForceStandDown = (workerName) => {
    setWorkers(prev => prev.map(w => {
      if (w.name === workerName) {
        return { ...w, actionState: 'stood_down', riskLevel: 'Stood Down (Clocked Out)' };
      }
      return w;
    }));
    showToast(`BOCW Safety Protocol: Immediate Stand-Down enforced for ${workerName}. Payroll sealed.`);
  };

  const handleClockoutReady = (workerName) => {
    setWorkers(prev => prev.map(w => {
      if (w.name === workerName) {
        return { ...w, actionState: 'clocked_out' };
      }
      return w;
    }));
    showToast(`Clockout approved for ${workerName}. Instant escrow payout initiated!`);
  };

  const handleMitigateHazard = (id) => {
    setHazards(prev => prev.map(h => {
      if (h.id === id) {
        return { ...h, status: 'MITIGATED', mitigated: true };
      }
      return h;
    }));
    showToast(`Ticket #${id} marked as Mitigated. Audit log updated on BOCW ledger.`);
  };

  const handleExportLedger = () => {
    showToast('Compiling Statutory Wage Ledger PDF/CSV for labor compliance audit...');
    setTimeout(() => {
      showToast('Statutory Wage Ledger generated successfully! (Ready for download)');
    }, 1200);
  };

  const filteredWorkers = workers.filter(w => {
    if (activeRosterFilter === 'all') return true;
    if (activeRosterFilter === 'overtime') return w.status === 'overtime';
    if (activeRosterFilter === 'standdown') return w.status === 'standdown';
    if (activeRosterFilter === 'completed') return w.status === 'completed';
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#0F172A] text-white px-4 py-3 rounded-lg shadow-2xl flex items-center gap-3 border border-[#FACC15] text-xs font-mono animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4 text-[#FACC15] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 h-16 bg-white border-b border-[#E2E8F0] shadow-sm px-6 flex items-center justify-between">
        <div className="flex items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#EAB308] text-[#0F172A] flex items-center justify-center font-bold shadow-sm">
              <Shield className="w-4 h-4 fill-current" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight leading-none text-[#0F172A]">
                FAIRSHIFT <span className="text-[#CA8A04]">PRO</span>
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#64748B] mt-0.5">
                Employer Hub
              </span>
            </div>
          </div>

          <div className="h-6 w-px bg-[#E2E8F0] hidden md:block" />

          {/* Quick Active Status Chips */}
          <div className="hidden lg:flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF08A] text-[#854D0E] text-xs font-mono font-bold border border-[#FACC15]">
              <span className="w-2 h-2 rounded-full bg-[#CA8A04] animate-pulse" />
              BOCW Act 1996 Compliant
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#F1F5F9] text-[#0F172A] text-xs font-mono border border-[#E2E8F0]">
              <Lock className="w-3.5 h-3.5 text-[#0284C7]" />
              Escrow Pool: {activeSite.escrow}
            </span>
          </div>
        </div>

        {/* Right Header: Notification + User Profile */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => showToast('All 482 frontline workers verified under biometric protocol.')}
            className="relative w-9 h-9 rounded-lg flex items-center justify-center bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#64748B] hover:text-[#0F172A] transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#EAB308]" />
          </button>

          <div className="flex items-center gap-3 pl-3 border-l border-[#E2E8F0]">
            <div className="text-right hidden sm:flex flex-col">
              <span className="text-xs font-bold text-[#0F172A] leading-tight">M. Vance</span>
              <span className="text-[10px] text-[#64748B] font-mono">Chief Field Supervisor</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-[#0F172A] text-white flex items-center justify-center font-bold text-xs font-mono shadow-sm">
              MV
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout Container (Sidebar + Content Canvas) */}
      <div className="flex flex-1">
        {/* Fixed Left Sidebar (256px) */}
        <aside className="w-64 bg-[#0F172A] text-white flex flex-col justify-between p-4 shrink-0 shadow-lg border-r border-[#1E293B]">
          <div className="flex flex-col gap-6">
            {/* Navigation links */}
            <nav className="flex flex-col gap-1.5">
              {[
                { id: 'roster', label: 'Shift Roster', icon: Users },
                { id: 'presence', label: 'Workforce Presence', icon: Activity },
                { id: 'compliance', label: 'BOCW Compliance', icon: ShieldAlert },
                { id: 'hazard', label: 'Hazard & Safety Logs', icon: AlertTriangle },
                { id: 'wages', label: 'Wage Records', icon: Wallet },
              ].map(item => {
                const Icon = item.icon;
                const isActive = activeSidebarNav === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSidebarNav(item.id);
                      showToast(`Navigated to ${item.label}`);
                    }}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-[#EAB308] text-[#0F172A] font-bold shadow-md'
                        : 'text-[#94A3B8] hover:bg-[#1E293B] hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Sidebar Footer: Zone Status & Return Button */}
          <div className="flex flex-col gap-3 pt-4 border-t border-[#1E293B]">
            <div className="bg-[#1E293B] rounded-lg p-3 flex flex-col gap-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#94A3B8]">
                Zone Telemetry
              </span>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Shift 01 Active</span>
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              </div>
              <span className="text-[11px] font-mono text-[#94A3B8]">
                {activeSite.workers} Frontline Personnel
              </span>
            </div>

            <button
              onClick={() => navigate('/')}
              className="flex items-center justify-center gap-2 py-2 px-3 bg-[#1E293B] hover:bg-[#334155] text-white rounded text-xs font-mono font-medium transition-colors border border-[#334155]"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#EAB308]" />
              <span>← Switch Role</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Top Operational Environment Context Bar */}
          <div className="bg-white border border-[#E2E8F0] p-4 rounded-xl shadow-sm mb-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              {/* Site Selector Dropdown */}
              <div className="relative">
                <label className="text-[10px] font-mono uppercase tracking-wider text-[#64748B] block mb-1">
                  Active Site Ledger
                </label>
                <button
                  onClick={() => setIsSiteDropdownOpen(!isSiteDropdownOpen)}
                  className="flex items-center gap-3 bg-[#F8FAFC] border border-[#CBD5E1] hover:border-[#94A3B8] px-3.5 py-2 rounded-lg transition-colors text-left"
                >
                  <span className="text-xl">{activeSite.emoji}</span>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#0F172A] leading-tight">
                      {activeSite.name}
                    </span>
                    <span className="text-[10px] font-mono text-[#64748B]">
                      {activeSite.type}
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-[#64748B] ml-2" />
                </button>

                {isSiteDropdownOpen && (
                  <div className="absolute left-0 mt-1 w-80 bg-white border border-[#CBD5E1] rounded-xl shadow-2xl z-30 p-1.5 animate-in fade-in">
                    <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-[#64748B]">
                      Select Operating Site
                    </div>
                    {siteOptions.map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => {
                          setActiveSite(opt);
                          setIsSiteDropdownOpen(false);
                          showToast(`Switched active ledger to ${opt.name}`);
                        }}
                        className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg transition-colors mb-1 ${
                          activeSite.id === opt.id ? 'bg-[#FEF08A] text-[#854D0E] font-bold' : 'hover:bg-[#F1F5F9]'
                        }`}
                      >
                        <span className="text-lg">{opt.emoji}</span>
                        <div className="flex flex-col min-w-0">
                          <span className="text-xs font-medium text-[#0F172A] truncate">
                            {opt.name}
                          </span>
                          <span className="text-[10px] font-mono text-[#64748B] truncate">
                            {opt.protocol}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Status Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-4 lg:pt-0">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#F1F5F9] text-[#0F172A] text-xs font-mono border border-[#E2E8F0]">
                  <Clock className="w-3.5 h-3.5 text-[#64748B]" />
                  Day Shift (07:00 - 16:30)
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#DCFCE7] text-[#166534] text-xs font-mono font-semibold border border-[#86EFAC]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
                  Aadhaar Bio-Sync Active
                </span>
              </div>
            </div>

            {/* Quick Export Button */}
            <button
              onClick={handleExportLedger}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#EAB308] hover:bg-[#CA8A04] text-[#0F172A] rounded-lg font-mono text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download Wage Ledger</span>
            </button>
          </div>

          {/* Telemetry Metric Cards (4-column grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Metric 1 */}
            <div className="bg-white border border-[#E2E8F0] p-4 rounded-xl shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#64748B]">
                  Active Frontline Staff
                </span>
                <Users className="w-4 h-4 text-[#EAB308]" />
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-extrabold text-[#0F172A] tracking-tight font-mono">
                  {activeSite.workers}
                </span>
                <span className="text-xs text-[#64748B] font-mono">Workers on-shift</span>
              </div>
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#FEF08A] text-[#854D0E] text-[10px] font-mono font-bold self-start border border-[#FACC15]">
                <MapPin className="w-3 h-3" />
                +8 checked-in via GPS today
              </div>
            </div>

            {/* Metric 2 */}
            <div className="bg-white border border-[#E2E8F0] p-4 rounded-xl shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#64748B]">
                  Real-Time Accrued Payroll
                </span>
                <Wallet className="w-4 h-4 text-[#16A34A]" />
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-extrabold text-[#0F172A] tracking-tight font-mono">
                  {activeSite.payroll}
                </span>
                <span className="text-xs text-[#64748B] font-mono">of {activeSite.escrow}</span>
              </div>
              <div className="text-[10px] font-mono text-[#64748B] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
                Auto-disbursement on digital clockout
              </div>
            </div>

            {/* Metric 3 */}
            <div className="bg-white border border-[#E2E8F0] p-4 rounded-xl shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#64748B]">
                  Statutory Compliance Index
                </span>
                <Shield className="w-4 h-4 text-[#0284C7]" />
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-extrabold text-[#16A34A] tracking-tight font-mono">
                  98.4%
                </span>
                <span className="text-xs text-[#64748B] font-mono">Real-time BOCW</span>
              </div>
              <div className="w-full bg-[#E2E8F0] rounded-full h-1.5 overflow-hidden">
                <div className="bg-[#16A34A] h-full rounded-full" style={{ width: '98.4%' }} />
              </div>
            </div>

            {/* Metric 4 */}
            <div className="bg-white border border-[#E2E8F0] p-4 rounded-xl shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#64748B]">
                  Algorithmic Fatigue Radar
                </span>
                <HeartCrack className="w-4 h-4 text-[#DC2626]" />
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-extrabold text-[#DC2626] tracking-tight font-mono">
                  2 Flags
                </span>
                <span className="text-xs text-[#64748B] font-mono">Threshold &gt;9.0h</span>
              </div>
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#FEE2E2] text-[#991B1B] text-[10px] font-mono font-bold self-start border border-[#F87171] animate-pulse">
                <AlertTriangle className="w-3 h-3" />
                Mandatory Rest Required
              </div>
            </div>
          </div>

          {/* Main Grid: 70% Live Roster | 30% Hazard Feed */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
            {/* Left 8 Cols: Live Workforce Roster */}
            <div className="lg:col-span-8 bg-white border border-[#E2E8F0] rounded-xl shadow-sm p-4 flex flex-col">
              {/* Header & Filter Tabs */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 gap-3 border-b border-[#E2E8F0]">
                <div>
                  <h2 className="text-base font-bold text-[#0F172A]" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Live Workforce Roster & Fatigue Radar
                  </h2>
                  <span className="text-[11px] font-mono text-[#64748B]">
                    Geofenced biometric verification under Indian Labor Code & BOCW Act
                  </span>
                </div>

                <div className="flex items-center gap-1 bg-[#F1F5F9] p-1 rounded-lg">
                  {[
                    { id: 'all', label: `All (${workers.length})` },
                    { id: 'overtime', label: 'Overtime (1)' },
                    { id: 'standdown', label: 'Stand-down Risk (1)' },
                    { id: 'completed', label: 'Completed (1)' },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveRosterFilter(tab.id)}
                      className={`px-2.5 py-1 rounded text-xs font-mono font-medium transition-colors ${
                        activeRosterFilter === tab.id
                          ? 'bg-white text-[#0F172A] font-bold shadow-xs'
                          : 'text-[#64748B] hover:text-[#0F172A]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Roster Table */}
              <div className="overflow-x-auto w-full mt-3">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-[#F8FAFC] text-[#64748B] text-[10px] font-mono uppercase tracking-wider border-b border-[#E2E8F0]">
                      <th className="py-2.5 px-3">Worker & Identity</th>
                      <th className="py-2.5 px-2">Trade / Sector</th>
                      <th className="py-2.5 px-2">Check-in</th>
                      <th className="py-2.5 px-2 text-center">Hours</th>
                      <th className="py-2.5 px-2">Accrued Payout</th>
                      <th className="py-2.5 px-2">Fatigue Risk</th>
                      <th className="py-2.5 px-3 text-right">Supervisory Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0] text-xs">
                    {filteredWorkers.map(w => (
                      <tr
                        key={w.id}
                        className={`hover:bg-[#F8FAFC] transition-colors ${
                          w.status === 'standdown' ? 'bg-[#FEF2F2]/60' : ''
                        }`}
                      >
                        {/* Worker Identity */}
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-[#E2E8F0] font-mono font-bold text-xs flex items-center justify-center text-[#0F172A]">
                              {w.initials}
                            </div>
                            <div className="flex flex-col">
                              <span className="font-bold text-[#0F172A] leading-tight">
                                {w.name}
                              </span>
                              <span className="text-[10px] font-mono text-[#64748B]">
                                {w.aadhaar}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Trade */}
                        <td className="py-3 px-2">
                          <span className="font-medium text-[#0F172A] block">{w.trade}</span>
                          <span className="text-[10px] text-[#64748B] font-mono">{w.tier}</span>
                        </td>

                        {/* Checkin */}
                        <td className="py-3 px-2 font-mono">
                          <div className="text-[#0F172A]">{w.checkinTime}</div>
                          <div className="text-[10px] text-[#64748B] flex items-center gap-0.5">
                            <MapPin className="w-2.5 h-2.5 text-[#EAB308]" />
                            {w.checkinGate}
                          </div>
                        </td>

                        {/* Hours */}
                        <td className="py-3 px-2 text-center font-mono">
                          <span className={`font-bold ${w.hours > 10 ? 'text-[#DC2626]' : 'text-[#0F172A]'}`}>
                            {w.hours}h
                          </span>
                          <span className="text-[10px] text-[#64748B] block">
                            {w.otHours > 0 ? `OT: ${w.otHours}h` : 'Standard'}
                          </span>
                        </td>

                        {/* Payout */}
                        <td className="py-3 px-2 font-mono">
                          <span className="font-bold text-[#0F172A]">
                            ₹ {w.payout.toFixed(2)}
                          </span>
                          <span className="text-[10px] text-[#64748B] block">
                            {w.otHours > 0 ? '1.5x OT applied' : 'Standard Rate'}
                          </span>
                        </td>

                        {/* Risk Level */}
                        <td className="py-3 px-2">
                          {w.riskColor === 'rose' && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#FEE2E2] text-[#991B1B] text-[10px] font-mono font-bold border border-[#F87171] animate-pulse">
                              <AlertTriangle className="w-3 h-3" />
                              {w.riskLevel}
                            </span>
                          )}
                          {w.riskColor === 'amber' && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#FEF08A] text-[#854D0E] text-[10px] font-mono font-bold border border-[#FACC15]">
                              <Clock className="w-3 h-3" />
                              {w.riskLevel}
                            </span>
                          )}
                          {w.riskColor === 'emerald' && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#DCFCE7] text-[#166534] text-[10px] font-mono font-bold border border-[#86EFAC]">
                              <CheckCircle2 className="w-3 h-3" />
                              {w.riskLevel}
                            </span>
                          )}
                        </td>

                        {/* Supervisory Action */}
                        <td className="py-3 px-3 text-right">
                          {w.status === 'overtime' && (
                            w.actionState === 'nudged' ? (
                              <span className="text-[11px] font-mono text-[#16A34A] font-bold">
                                Nudge Sent ✓
                              </span>
                            ) : (
                              <button
                                onClick={() => handleNudgeWorker(w.name)}
                                className="px-2.5 py-1 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#0F172A] border border-[#CBD5E1] font-mono text-[11px] font-semibold rounded transition-colors"
                              >
                                Nudge 30m Rest
                              </button>
                            )
                          )}

                          {w.status === 'standdown' && (
                            w.actionState === 'stood_down' ? (
                              <span className="text-[11px] font-mono text-[#DC2626] font-bold">
                                Stand-Down Active
                              </span>
                            ) : (
                              <button
                                onClick={() => handleForceStandDown(w.name)}
                                className="px-2.5 py-1 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-mono text-[11px] font-bold rounded shadow-sm transition-all"
                              >
                                Force Stand-down
                              </button>
                            )
                          )}

                          {w.status === 'safe' && (
                            <span className="inline-flex items-center text-[#16A34A] font-mono text-[11px]">
                              <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Optimal
                            </span>
                          )}

                          {w.status === 'completed' && (
                            w.actionState === 'clocked_out' ? (
                              <span className="text-[11px] font-mono text-[#16A34A] font-bold">
                                Clocked Out ✓
                              </span>
                            ) : (
                              <button
                                onClick={() => handleClockoutReady(w.name)}
                                className="px-2.5 py-1 bg-[#EAB308] hover:bg-[#CA8A04] text-[#0F172A] font-mono text-[11px] font-bold rounded transition-colors"
                              >
                                Clockout Ready
                              </button>
                            )
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table Footer */}
              <div className="flex items-center justify-between pt-3 mt-auto border-t border-[#E2E8F0] text-[10px] font-mono text-[#64748B]">
                <span>Showing {filteredWorkers.length} of {workers.length} logged active personnel</span>
                <span>Interval: 120s • Smart Escrow Synced</span>
              </div>
            </div>

            {/* Right 4 Cols: Anonymous Hazard Feed */}
            <div className="lg:col-span-4 bg-white border border-[#E2E8F0] rounded-xl shadow-sm p-4 flex flex-col">
              <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] mb-3">
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5 text-sm font-bold text-[#0F172A]">
                    <Shield className="w-4 h-4 text-[#CA8A04]" />
                    <span>Zero-Retaliation Hazard Feed</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#64748B]">
                    Anonymous Frontline Voice Channel
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#F1F5F9] text-[#0F172A] font-mono text-[9px] font-bold uppercase border border-[#E2E8F0]">
                  PII-Stripped
                </span>
              </div>

              {/* Hazard Tickets Feed */}
              <div className="flex flex-col gap-3 flex-1 overflow-y-auto">
                {hazards.map(t => (
                  <div
                    key={t.id}
                    className="bg-[#F8FAFC] border border-[#E2E8F0] p-3 rounded-lg flex flex-col gap-1.5 hover:border-[#CBD5E1] transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] font-bold text-[#0F172A]">
                        #{t.id}
                      </span>
                      <span className="text-[10px] font-mono text-[#64748B]">
                        {t.time}
                      </span>
                    </div>

                    {t.severity === 'error' && (
                      <span className="self-start px-2 py-0.5 bg-[#FEE2E2] text-[#991B1B] text-[10px] font-mono font-bold rounded border border-[#F87171] flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        {t.type}
                      </span>
                    )}
                    {t.severity === 'info' && (
                      <span className="self-start px-2 py-0.5 bg-[#E0F2FE] text-[#0369A1] text-[10px] font-mono font-bold rounded border border-[#7DD3FC]">
                        {t.type}
                      </span>
                    )}
                    {t.severity === 'warning' && (
                      <span className="self-start px-2 py-0.5 bg-[#FEF3C7] text-[#92400E] text-[10px] font-mono font-bold rounded border border-[#FCD34D]">
                        {t.type}
                      </span>
                    )}

                    <p className="text-xs text-[#0F172A] font-medium leading-snug">
                      {t.description}
                    </p>

                    {/* Consensus bar if not resolved */}
                    {!t.mitigated && t.consensusPct && (
                      <div className="bg-white p-2 rounded border border-[#E2E8F0] my-1">
                        <div className="flex items-center justify-between text-[10px] font-mono text-[#64748B] mb-1">
                          <span>Peer Consensus</span>
                          <span className="font-bold text-[#0F172A]">
                            {t.consensusCount} Workers ({t.consensusPct}%)
                          </span>
                        </div>
                        <div className="w-full bg-[#E2E8F0] rounded-full h-1 overflow-hidden">
                          <div className="bg-[#EAB308] h-full rounded-full" style={{ width: `${t.consensusPct}%` }} />
                        </div>
                      </div>
                    )}

                    {/* Footer / Status */}
                    <div className="flex items-center justify-between pt-1 border-t border-[#E2E8F0]/60 mt-1">
                      <span className="text-[10px] font-mono font-bold uppercase text-[#64748B]">
                        Status: {t.status}
                      </span>

                      {!t.mitigated ? (
                        <button
                          onClick={() => handleMitigateHazard(t.id)}
                          className="px-2.5 py-1 bg-[#10B981] hover:bg-[#059669] text-white font-mono text-[10px] font-bold uppercase rounded transition-colors"
                        >
                          Mark Mitigated
                        </button>
                      ) : (
                        <span className="text-[10px] font-mono text-[#16A34A] font-bold flex items-center gap-1">
                          <Check className="w-3 h-3 stroke-[3]" /> Resolved
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* BOCW Act 1996 Real-Time Audit Attestation Banner (Bottom) */}
          <div className="bg-white border-l-4 border-l-[#EAB308] border border-[#E2E8F0] p-4 rounded-xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#FEF08A] text-[#854D0E] flex items-center justify-center font-bold shrink-0">
                <Gavel className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-[#0F172A]">
                    BOCW Act (1996) Real-Time Statutory Audit Attestation
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#DCFCE7] text-[#166534] font-mono text-[10px] font-bold uppercase border border-[#86EFAC]">
                    Govt. Ledger Synced
                  </span>
                </div>
                <p className="text-xs text-[#64748B] font-mono mt-0.5">
                  142 workers covered • 100% statutory accidental disability escrow • 200% overtime multiplier applied
                </p>
              </div>
            </div>

            <button
              onClick={() => showToast('Generated Official Labor Inspector Dossier (PDF signed with SHA-256)!')}
              className="px-4 py-2 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-lg font-mono text-xs font-bold transition-colors whitespace-nowrap shrink-0"
            >
              Generate Labor Inspector Dossier
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
