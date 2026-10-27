import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Briefcase, Clock, MapPin, Star, User, Bell } from 'lucide-react';

const navItems = [
  { label: 'Jobs', icon: Briefcase, path: '/worker/jobs' },
  { label: 'Shifts', icon: Clock, path: '/worker/shifts' },
  { label: 'Check In', icon: MapPin, path: '/worker/location' },
  { label: 'Reviews', icon: Star, path: '/worker/reviews' },
  { label: 'Profile', icon: User, path: '/worker/profile' },
];

export default function WorkerLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#09090B] flex justify-center">
      <div className="w-full max-w-[480px] relative flex flex-col min-h-screen">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-50 bg-[#18181B] border-b border-[#27272A] px-4 py-3 flex items-center justify-between shrink-0">
          <h1 className="text-lg font-extrabold tracking-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
            <span className="text-[#FACC15]">FAIR</span>
            <span className="text-[#FAFAFA]">SHIFT</span>
          </h1>
          <button className="relative p-2 text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors">
            <Bell className="w-5 h-5" />
            {/* Notification dot */}
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#F43F5E] rounded-full" />
          </button>
        </header>

        {/* Scrollable content area */}
        <main className="flex-1 overflow-y-auto pb-20">
          <Outlet />
        </main>

        {/* Bottom Navigation Bar */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-[#18181B] border-t border-[#27272A] z-50">
          <div className="flex items-center justify-around px-1 py-1">
            {navItems.map(({ label, icon: Icon, path }) => {
              const isActive = location.pathname === path || location.pathname.startsWith(path + '/');

              return (
                <NavLink
                  key={path}
                  to={path}
                  className="flex flex-col items-center gap-0.5 py-2 px-3 rounded-[3px] transition-colors relative"
                >
                  {isActive && (
                    <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-[#FACC15] rounded-full" />
                  )}
                  <Icon
                    className={`w-5 h-5 transition-colors ${isActive ? 'text-[#FACC15]' : 'text-[#A1A1AA]'}`}
                    strokeWidth={isActive ? 2.5 : 1.5}
                  />
                  <span
                    className={`text-[10px] tracking-wide transition-colors ${isActive ? 'text-[#FACC15] font-semibold' : 'text-[#A1A1AA]'}`}
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    {label}
                  </span>
                </NavLink>
              );
            })}
          </div>

          {/* Safe area bottom padding for iOS */}
          <div className="h-[env(safe-area-inset-bottom)]" />
        </nav>
      </div>
    </div>
  );
}
