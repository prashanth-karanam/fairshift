import React from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Briefcase, Clock, MapPin, Star, User, Bell, ArrowLeft, Shield, CheckCircle2 } from 'lucide-react';

const navItems = [
  { label: 'Jobs', icon: Briefcase, path: '/worker/jobs' },
  { label: 'Shifts', icon: Clock, path: '/worker/shifts' },
  { label: 'Check In', icon: MapPin, path: '/worker/location' },
  { label: 'Reviews', icon: Star, path: '/worker/reviews' },
  { label: 'Profile', icon: User, path: '/worker/profile' },
];

export default function WorkerLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans">
      {/* Top Navigation Header (Spacious on Desktop, Compact on Mobile) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo & Return */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-yellow-100 text-slate-600 hover:text-amber-800 flex items-center justify-center transition-all cursor-pointer"
              title="Return to Role Selection"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-sm shadow-sm">
                ⚡
              </div>
              <div className="flex flex-col">
                <span className="text-base font-black tracking-tight text-slate-900 leading-none">
                  <span className="text-amber-500">FAIR</span>SHIFT
                </span>
                <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase mt-0.5">
                  Worker Hub
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links (Visible on md and up) */}
          <nav className="hidden md:flex items-center gap-1.5 bg-slate-100/80 p-1.5 rounded-full border border-slate-200/60">
            {navItems.map(({ label, icon: Icon, path }) => {
              const isActive = location.pathname === path || location.pathname.startsWith(path + '/');
              return (
                <NavLink
                  key={path}
                  to={path}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-amber-400 text-slate-950 shadow-sm'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-white/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" strokeWidth={isActive ? 2.5 : 2} />
                  <span>{label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Right Status Badges */}
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="hidden sm:inline">GPS Geofence</span> OK
            </span>

            <button
              className="relative w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border border-white" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Workspace: Generous max-width on desktop, centered, spacious padding */}
      <main className="flex-1 max-w-5xl xl:max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 pb-28 md:pb-12">
        <Outlet />
      </main>

      {/* Mobile Floating Bottom Navigation Bar (Visible only on < md screens) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-slate-200 px-3 py-2 shadow-xl">
        <div className="max-w-md mx-auto flex items-center justify-around">
          {navItems.map(({ label, icon: Icon, path }) => {
            const isActive = location.pathname === path || location.pathname.startsWith(path + '/');

            return (
              <NavLink
                key={path}
                to={path}
                className={`flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all ${
                  isActive
                    ? 'text-slate-950 font-bold scale-105'
                    : 'text-slate-400 hover:text-slate-700'
                }`}
              >
                <div className={`p-1.5 rounded-xl transition-all ${isActive ? 'bg-amber-400 text-slate-950 shadow-xs' : ''}`}>
                  <Icon className="w-4 h-4" strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span className="text-[10px] tracking-tight">
                  {label}
                </span>
              </NavLink>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
