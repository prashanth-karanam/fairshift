import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Wrench, Building2, ArrowRight, Shield } from 'lucide-react';

export default function RoleGateway() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#09090B] flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(#FAFAFA 1px, transparent 1px), linear-gradient(90deg, #FAFAFA 1px, transparent 1px)',
        backgroundSize: '48px 48px'
      }} />

      <div className="relative z-10 flex flex-col items-center max-w-3xl w-full">
        {/* Logo */}
        <div className="mb-3">
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
            <span className="text-[#FACC15]">FAIR</span>
            <span className="text-[#FAFAFA]">SHIFT</span>
          </h1>
        </div>

        {/* Tagline */}
        <p className="text-[#A1A1AA] text-sm sm:text-base text-center mb-12 tracking-wide" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          Frontline Workforce Platform — Fair Shifts. Fair Pay. Full Transparency.
        </p>

        {/* Divider */}
        <div className="w-16 h-0.5 bg-[#27272A] mb-10" />

        {/* Role label */}
        <p className="text-[#A1A1AA] text-xs uppercase tracking-[0.2em] mb-6" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          Select your role to continue
        </p>

        {/* Role Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
          {/* Worker Card */}
          <button
            onClick={() => navigate('/worker')}
            className="group relative bg-[#18181B] border border-[#27272A] border-l-4 border-l-[#FACC15] rounded-[4px] p-6 sm:p-8 text-left transition-all duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none cursor-pointer"
            style={{ boxShadow: '4px 4px 0 0 #000' }}
          >
            <div className="flex items-start gap-4">
              <div className="bg-[#FACC15]/10 p-3 rounded-[3px] shrink-0">
                <Wrench className="w-7 h-7 text-[#FACC15]" strokeWidth={2} />
              </div>
              <div className="flex-1">
                <h2 className="text-[#FAFAFA] text-lg font-bold tracking-wide mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                  I'M A WORKER
                </h2>
                <p className="text-[#A1A1AA] text-sm leading-relaxed" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  Find shifts, track wages, rate worksites
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-[#A1A1AA] group-hover:text-[#FACC15] transition-colors mt-1 shrink-0" />
            </div>
            <div className="mt-5 pt-4 border-t border-[#27272A] flex flex-wrap gap-2">
              {['Shifts', 'Wages', 'Ratings', 'GPS Check-in'].map(tag => (
                <span key={tag} className="text-[10px] text-[#A1A1AA] bg-[#27272A] px-2 py-0.5 rounded-[2px]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  {tag}
                </span>
              ))}
            </div>
          </button>

          {/* Employer Card */}
          <button
            onClick={() => navigate('/employer')}
            className="group relative bg-[#18181B] border border-[#27272A] border-l-4 border-l-[#06B6D4] rounded-[4px] p-6 sm:p-8 text-left transition-all duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none cursor-pointer"
            style={{ boxShadow: '4px 4px 0 0 #000' }}
          >
            <div className="flex items-start gap-4">
              <div className="bg-[#06B6D4]/10 p-3 rounded-[3px] shrink-0">
                <Building2 className="w-7 h-7 text-[#06B6D4]" strokeWidth={2} />
              </div>
              <div className="flex-1">
                <h2 className="text-[#FAFAFA] text-lg font-bold tracking-wide mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                  I'M AN EMPLOYER
                </h2>
                <p className="text-[#A1A1AA] text-sm leading-relaxed" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  Post shifts, manage crews, monitor compliance
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-[#A1A1AA] group-hover:text-[#06B6D4] transition-colors mt-1 shrink-0" />
            </div>
            <div className="mt-5 pt-4 border-t border-[#27272A] flex flex-wrap gap-2">
              {['Postings', 'Crew Mgmt', 'Compliance', 'Analytics'].map(tag => (
                <span key={tag} className="text-[10px] text-[#A1A1AA] bg-[#27272A] px-2 py-0.5 rounded-[2px]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  {tag}
                </span>
              ))}
            </div>
          </button>
        </div>

        {/* SDG 8 Badge */}
        <div className="mt-14 flex items-center gap-2 text-[#A1A1AA]/60">
          <Shield className="w-4 h-4" />
          <p className="text-[11px] tracking-wide" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            Aligned with UN SDG 8: Decent Work & Economic Growth
          </p>
        </div>

        {/* Version */}
        <p className="mt-3 text-[10px] text-[#A1A1AA]/30" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          v0.1.0-alpha · Powered by Antigravity
        </p>
      </div>
    </div>
  );
}
