import React, { useState } from 'react';
import {
  Star, ShieldCheck, BadgeCheck, Award, Wrench, Clock, DollarSign,
  BarChart3, ChevronRight, Bell, Calendar, Edit3, User, Building2,
  MessageSquare, TrendingUp, CheckCircle2, FileCheck, HardHat,
  Zap, Target, ThumbsUp
} from 'lucide-react';

const skillTags = [
  'Concrete Work', 'Steel Framing', 'Welding', 'Equipment Operation',
  'Safety Inspection', 'Blueprint Reading', 'Scaffolding'
];

const certifications = [
  { name: 'OSHA-10 Construction Safety', issuer: 'OSHA', expires: 'Mar 2026', active: true },
  { name: 'Certified Welder – AWS D1.1', issuer: 'AWS', expires: 'Nov 2025', active: true },
  { name: 'Forklift Operator License', issuer: 'NCCCO', expires: 'Jul 2025', active: true },
  { name: 'First Aid / CPR', issuer: 'Red Cross', expires: 'Jan 2025', active: true },
];

const ratingBreakdown = [
  { label: 'Reliability', score: 4.9 },
  { label: 'Quality', score: 4.7 },
  { label: 'Safety', score: 4.8 },
  { label: 'Communication', score: 4.6 },
];

const recentReviews = [
  { company: 'Metro Construction Co.', text: '"Consistently early, excellent work ethic. Would rehire immediately."', rating: 5, date: 'Oct 18' },
  { company: 'Apex Roofing LLC', text: '"Solid craftsman, follows safety protocols to the letter."', rating: 5, date: 'Oct 12' },
  { company: 'Summit Builders Inc.', text: '"Great communicator, worked well with the crew."', rating: 4, date: 'Oct 5' },
];

const statsGrid = [
  { label: 'Total Shifts', value: '184', icon: Calendar },
  { label: 'Total Hours', value: '1,472', icon: Clock },
  { label: 'Total Earned', value: '$42,160', icon: DollarSign },
  { label: 'On-Time Rate', value: '98.4%', icon: Target },
  { label: 'Completion Rate', value: '99.2%', icon: CheckCircle2 },
  { label: 'Avg Rating', value: '4.8★', icon: Star },
];

const settingsItems = [
  { label: 'Shift Notifications', desc: 'New shifts & schedule changes', key: 'shiftNotif', default: true },
  { label: 'Pay Alerts', desc: 'Payment confirmations & disputes', key: 'payAlerts', default: true },
  { label: 'Availability Calendar', desc: 'Let employers see your schedule', key: 'availCal', default: false },
  { label: 'Review Notifications', desc: 'When employers rate your work', key: 'reviewNotif', default: true },
];

function StarDisplay({ rating, size = 14 }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={i <= Math.floor(rating) ? 'text-[#FACC15] fill-[#FACC15]' : i <= rating ? 'text-[#FACC15] fill-[#FACC15]/50' : 'text-[#27272A]'}
        />
      ))}
    </div>
  );
}

function RatingBar({ label, score }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[11px] text-[#A1A1AA] w-28 shrink-0" style={{ fontFamily: 'Inter, sans-serif' }}>{label}</span>
      <div className="flex-1 h-2 bg-[#27272A] rounded-[2px] overflow-hidden">
        <div
          className="h-full bg-[#FACC15] rounded-[2px]"
          style={{ width: `${(score / 5) * 100}%` }}
        />
      </div>
      <span className="text-xs font-bold w-8 text-right" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
        {score.toFixed(1)}
      </span>
    </div>
  );
}

export default function WorkerProfile() {
  const [toggles, setToggles] = useState(
    Object.fromEntries(settingsItems.map((s) => [s.key, s.default]))
  );

  const handleToggle = (key) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-[#FAFAFA] pb-24">
      {/* Profile Header */}
      <div className="relative">
        {/* Top accent bar */}
        <div className="h-24 bg-gradient-to-br from-[#27272A] to-[#18181B]" />

        <div className="px-4 -mt-12">
          <div className="flex items-end gap-4 mb-4">
            {/* Avatar */}
            <div
              className="w-20 h-20 rounded-[4px] bg-[#FACC15] flex items-center justify-center flex-shrink-0 border-4 border-[#09090B]"
              style={{ boxShadow: '4px 4px 0 0 #000' }}
            >
              <span className="text-2xl font-black text-[#09090B]" style={{ fontFamily: 'Inter, sans-serif' }}>
                MR
              </span>
            </div>
            <div className="pb-1">
              <h1 className="text-xl font-bold tracking-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
                Marcus Rivera
              </h1>
              <p className="text-xs text-[#A1A1AA]" style={{ fontFamily: 'Inter, sans-serif' }}>
                Verified Frontline Worker
              </p>
              <p className="text-[11px] text-[#A1A1AA]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                Since March 2024
              </p>
            </div>
          </div>

          {/* Verification badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { label: 'ID VERIFIED', icon: BadgeCheck, color: 'emerald' },
              { label: 'SAFETY CERTIFIED', icon: ShieldCheck, color: 'cyan' },
              { label: 'OSHA-10', icon: Award, color: 'amber' },
            ].map((badge) => {
              const Icon = badge.icon;
              const colorMap = {
                emerald: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
                cyan: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
                amber: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
              };
              return (
                <span
                  key={badge.label}
                  className={`inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wide px-2.5 py-1 rounded-[2px] border ${colorMap[badge.color]}`}
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                >
                  <Icon size={12} />
                  {badge.label} ✓
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Dual Rating Display */}
      <div className="px-4 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Worker Rating Card */}
          <div
            className="bg-[#18181B] border border-[#27272A] rounded-[4px] p-4"
            style={{ boxShadow: '4px 4px 0 0 #000' }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Star size={14} className="text-[#FACC15] fill-[#FACC15]" />
              <h2 className="text-xs font-bold tracking-widest" style={{ fontFamily: 'Inter, sans-serif' }}>
                WORKER RATING
              </h2>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="text-center">
                <p className="text-4xl font-black text-[#FACC15]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  4.8
                </p>
                <StarDisplay rating={4.8} />
                <p className="text-[10px] text-[#A1A1AA] mt-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  127 REVIEWS
                </p>
              </div>
              <div className="flex-1 space-y-2">
                {ratingBreakdown.map((r) => (
                  <RatingBar key={r.label} label={r.label} score={r.score} />
                ))}
              </div>
            </div>

            {/* Recent Reviews */}
            <div className="space-y-2 border-t border-[#27272A] pt-3">
              <p className="text-[10px] text-[#A1A1AA] font-semibold tracking-wider mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                RECENT REVIEWS
              </p>
              {recentReviews.map((review, i) => (
                <div key={i} className="bg-[#09090B] rounded-[2px] p-2.5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {review.company}
                    </span>
                    <div className="flex items-center gap-1">
                      <StarDisplay rating={review.rating} size={10} />
                      <span className="text-[10px] text-[#A1A1AA] ml-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        {review.date}
                      </span>
                    </div>
                  </div>
                  <p className="text-[11px] text-[#A1A1AA] italic" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {review.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Employer Ratings by Worker */}
          <div
            className="bg-[#18181B] border border-[#27272A] rounded-[4px] p-4"
            style={{ boxShadow: '4px 4px 0 0 #000' }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Building2 size={14} className="text-cyan-400" />
              <h2 className="text-xs font-bold tracking-widest" style={{ fontFamily: 'Inter, sans-serif' }}>
                YOUR EMPLOYER RATINGS
              </h2>
            </div>

            <div className="text-center py-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-3">
                <MessageSquare size={24} className="text-cyan-400" />
              </div>
              <p className="text-3xl font-black" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                23
              </p>
              <p className="text-[10px] text-[#A1A1AA] tracking-wider font-semibold mt-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                SITE REVIEWS SUBMITTED
              </p>
            </div>

            <div className="bg-[#09090B] rounded-[2px] p-3 mb-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#A1A1AA]" style={{ fontFamily: 'Inter, sans-serif' }}>Average Rating Given</span>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-cyan-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>4.2</span>
                  <StarDisplay rating={4.2} size={12} />
                </div>
              </div>
            </div>

            <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-[2px] p-3 flex items-start gap-2">
              <ThumbsUp size={14} className="text-cyan-400 mt-0.5 flex-shrink-0" />
              <p className="text-[11px] text-cyan-300" style={{ fontFamily: 'Inter, sans-serif' }}>
                Your reviews help other workers find fair worksites. Keep reviewing to build a safer community.
              </p>
            </div>

            <button className="w-full mt-3 bg-[#27272A] hover:bg-[#3f3f46] text-[#FAFAFA] text-xs font-semibold py-2.5 rounded-[3px] flex items-center justify-center gap-2 transition-colors"
              style={{ fontFamily: 'Inter, sans-serif' }}>
              <Edit3 size={14} />
              Write a Site Review
            </button>
          </div>
        </div>
      </div>

      {/* Skills & Certifications */}
      <div className="px-4 pb-4">
        <div
          className="bg-[#18181B] border border-[#27272A] rounded-[4px] p-4"
          style={{ boxShadow: '4px 4px 0 0 #000' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Wrench size={14} className="text-[#FACC15]" />
            <h2 className="text-xs font-bold tracking-widest" style={{ fontFamily: 'Inter, sans-serif' }}>
              SKILLS & CERTIFICATIONS
            </h2>
          </div>

          {/* Skill Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {skillTags.map((skill) => (
              <span
                key={skill}
                className="text-[11px] font-semibold px-2.5 py-1 rounded-[2px] bg-[#27272A] text-[#FAFAFA] border border-[#3f3f46]"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Certifications */}
          <div className="space-y-2">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="flex items-center justify-between bg-[#09090B] rounded-[2px] p-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-500/10 rounded-[2px] flex items-center justify-center">
                    <FileCheck size={14} className="text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>{cert.name}</p>
                    <p className="text-[10px] text-[#A1A1AA]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      {cert.issuer} · Expires {cert.expires}
                    </p>
                  </div>
                </div>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-[2px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  ACTIVE
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="px-4 pb-4">
        <div
          className="bg-[#18181B] border border-[#27272A] rounded-[4px] p-4"
          style={{ boxShadow: '4px 4px 0 0 #000' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 size={14} className="text-[#FACC15]" />
            <h2 className="text-xs font-bold tracking-widest" style={{ fontFamily: 'Inter, sans-serif' }}>
              CAREER STATS
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {statsGrid.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="bg-[#09090B] rounded-[2px] p-3 text-center"
                >
                  <Icon size={16} className="text-[#A1A1AA] mx-auto mb-2" />
                  <p className="text-lg font-bold" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    {stat.value}
                  </p>
                  <p className="text-[9px] text-[#A1A1AA] mt-1 tracking-wider" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {stat.label.toUpperCase()}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="px-4 pb-6">
        <div
          className="bg-[#18181B] border border-[#27272A] rounded-[4px] p-4"
          style={{ boxShadow: '4px 4px 0 0 #000' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Bell size={14} className="text-[#FACC15]" />
            <h2 className="text-xs font-bold tracking-widest" style={{ fontFamily: 'Inter, sans-serif' }}>
              SETTINGS
            </h2>
          </div>

          <div className="space-y-1">
            {settingsItems.map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between p-3 rounded-[2px] hover:bg-[#27272A]/30 transition-colors"
              >
                <div>
                  <p className="text-xs font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>{item.label}</p>
                  <p className="text-[10px] text-[#A1A1AA]" style={{ fontFamily: 'Inter, sans-serif' }}>{item.desc}</p>
                </div>
                {/* Toggle switch */}
                <button
                  onClick={() => handleToggle(item.key)}
                  className={`relative w-10 h-5 rounded-full transition-colors ${
                    toggles[item.key] ? 'bg-[#FACC15]' : 'bg-[#27272A]'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-[#09090B] transition-transform ${
                      toggles[item.key] ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>

          <button
            className="w-full mt-4 bg-[#FACC15] hover:bg-[#eab308] text-[#09090B] font-bold py-3 rounded-[3px] text-sm flex items-center justify-center gap-2 transition-colors"
            style={{ fontFamily: 'Inter, sans-serif', boxShadow: '3px 3px 0 0 #000' }}
          >
            <Edit3 size={16} />
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
