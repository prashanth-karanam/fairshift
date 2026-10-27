import React from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Briefcase, Clock, MapPin, Star, User, Bell, ArrowLeft, Shield } from 'lucide-react';

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
    <div className="min-h-screen bg-[#F8FAFC] flex justify-center py-0 sm:py-6 sm:px-4">
      {/* Container: on mobile it is full screen, on desktop it turns into an elegant mobile device shell */}
      <div className="w-full max-w-[480px] bg-white sm:rounded-[36px] sm:border sm:border-slate-200/80 sm:shadow-2xl relative flex flex-col min-h-screen sm:min-h-[850px] overflow-hidden">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 px-5 py-3.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => navigate('/')}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-yellow-100 text-slate-700 hover:text-amber-700 flex items-center justify-center transition-all"
              title="Return to Role Selection"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1.5">
              <div className="w-7 h-7 rounded-xl bg-amber-400 text-slate-900 flex items-center justify-center font-black text-xs shadow-sm">
                ⚡
              </div>
              <h1 className="text-base font-extrabold tracking-tight">
                <span className="text-amber-500">FAIR</span>
                <span className="text-slate-900">SHIFT</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-mono font-bold border border-emerald-200/70">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              GPS OK
            </span>
            <button className="relative w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-white" />
            </button>
          </div>
        </header>

        {/* Scrollable content area */}
        <main className="flex-1 overflow-y-auto pb-24 px-4 pt-4 bg-[#F8FAFC]">
          <Outlet />
        </main>

        {/* Bottom Navigation Bar */}
        <nav className="fixed sm:absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white/95 backdrop-blur-lg border-t border-slate-100 sm:rounded-b-[36px] z-50 px-3 py-2 shadow-lg">
          <div className="flex items-center justify-around">
            {navItems.map(({ label, icon: Icon, path }) => {
              const isActive = location.pathname === path || location.pathname.startsWith(path + '/');

              return (
                <NavLink
                  key={path}
                  to={path}
                  className={`flex flex-col items-center gap-1 py-1.5 px-3 rounded-2xl transition-all ${
                    isActive
                      ? 'bg-amber-400/20 text-slate-900 font-bold scale-105'
                      : 'text-slate-400 hover:text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className={`p-1 rounded-xl transition-all ${isActive ? 'bg-amber-400 text-slate-900 shadow-sm' : ''}`}>
                    <Icon className="w-4 h-4" strokeWidth={isActive ? 2.5 : 2} />
                  </div>
                  <span className="text-[10px] tracking-tight font-medium">
                    {label}
                  </span>
                </NavLink>
              );
            })}
          </div>

          {/* Safe area padding for mobile */}
          <div className="h-[env(safe-area-inset-bottom,0px)]" />
        </nav>
      </div>
    </div>
  );
}
