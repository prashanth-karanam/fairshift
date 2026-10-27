import React, { useState } from 'react';
import {
  ShieldCheck, AlertTriangle, CheckCircle2, ThumbsUp, ThumbsDown,
  MessageSquare, Star, Plus, X, Lock, Fingerprint, Calendar,
  Shield, Check, Flame, Award
} from 'lucide-react';

const initialReviews = [
  {
    id: 1,
    site: 'Apex Infra - Site 4B (Navi Mumbai)',
    category: 'safety',
    date: '3 days ago',
    badge: 'SAFETY HAZARD',
    badgeType: 'error',
    author: 'Verified Welder #W-8819',
    rating: 2.5,
    subRatings: [
      { label: 'Safety', score: 2.0, color: '#F43F5E' },
      { label: 'Pay Timeliness', score: 4.0, color: '#10B981' },
    ],
    text: 'Supervisor delayed water break during afternoon heat. Also harness clips on 6th floor scaffold were rusted. Pay was credited on time though (₹920 within 2 hours of clockout).',
    consensus: '84 Workers Verified This is True',
    confidence: '96% Peer Confidence',
    trueVotes: 84,
    falseVotes: 3,
    userVote: null,
    commentsCount: 12,
  },
  {
    id: 2,
    site: 'SRM Logistics Hub Turbhe',
    category: 'pay',
    date: 'Yesterday',
    badge: 'EXEMPLARY SITE',
    badgeType: 'success',
    author: 'Verified Loader #L-4021',
    rating: 4.8,
    subRatings: [
      { label: 'Facilities', score: 5.0, color: '#10B981' },
      { label: 'Pay Guarantee', score: 5.0, color: '#10B981' },
    ],
    text: 'Free hot tea and clean washroom available. Supervisor Ravi sir is very respectful. Overtime was counted strictly by app, got extra ₹180 in cash upon clockout.',
    consensus: '116 Workers Agreed (100% True)',
    confidence: 'Consensus High',
    trueVotes: 116,
    falseVotes: 1,
    userVote: null,
    commentsCount: 8,
  },
  {
    id: 3,
    site: 'Metro Pier #12 Sanpada',
    category: 'voted',
    date: '5 days ago',
    badge: 'STANDARD',
    badgeType: 'neutral',
    author: 'Verified Rigger #R-0992',
    rating: 4.5,
    subRatings: [
      { label: 'Equipment', score: 4.6, color: '#10B981' },
      { label: 'Punctuality', score: 4.4, color: '#EAB308' },
    ],
    text: 'Heavy work but safety gear is brand new. Strict 1-hour lunch break provided. Payout arrived before reaching the gate.',
    consensus: '42 Workers Verified',
    confidence: '100% Trust',
    trueVotes: 42,
    falseVotes: 0,
    userVote: null,
    commentsCount: 3,
  }
];

export default function SiteReviews() {
  const [reviews, setReviews] = useState(initialReviews);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Form state
  const [selectedShift, setSelectedShift] = useState('Metro Pier #12 Sanpada (Completed Today)');
  const [selectedRating, setSelectedRating] = useState('Good');
  const [reviewNotes, setReviewNotes] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleVote = (id, type) => {
    setReviews(prev => prev.map(rev => {
      if (rev.id !== id) return rev;
      
      let newTrue = rev.trueVotes;
      let newFalse = rev.falseVotes;
      let newUserVote = rev.userVote;

      if (type === 'true') {
        if (rev.userVote === 'true') {
          newTrue -= 1;
          newUserVote = null;
        } else {
          newTrue += 1;
          if (rev.userVote === 'false') newFalse -= 1;
          newUserVote = 'true';
          showToast('Peer verification vote recorded on-chain!');
        }
      } else {
        if (rev.userVote === 'false') {
          newFalse -= 1;
          newUserVote = null;
        } else {
          newFalse += 1;
          if (rev.userVote === 'true') newTrue -= 1;
          newUserVote = 'false';
          showToast('Counter-verification vote recorded.');
        }
      }

      return {
        ...rev,
        trueVotes: newTrue,
        falseVotes: newFalse,
        userVote: newUserVote
      };
    }));
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!reviewNotes.trim()) {
      showToast('Please enter your observations or feedback.');
      return;
    }

    const ratingMap = {
      'Poor': 2.0,
      'Fair': 3.0,
      'Good': 4.0,
      'Excellent': 5.0
    };

    const newRev = {
      id: Date.now(),
      site: selectedShift.split(' (')[0],
      category: selectedRating === 'Poor' ? 'safety' : 'pay',
      date: 'Just now',
      badge: selectedRating === 'Poor' ? 'SAFETY CONCERN' : 'COMMUNITY AUDIT',
      badgeType: selectedRating === 'Poor' ? 'error' : 'success',
      author: 'Verified Worker #W-' + Math.floor(1000 + Math.random() * 9000),
      rating: ratingMap[selectedRating] || 4.0,
      subRatings: [
        { label: 'Safety', score: ratingMap[selectedRating], color: selectedRating === 'Poor' ? '#F43F5E' : '#10B981' },
        { label: 'Pay Timeliness', score: 4.8, color: '#10B981' },
      ],
      text: reviewNotes,
      consensus: '1 Worker Verified (Fresh Post)',
      confidence: '100% Peer Trust',
      trueVotes: 1,
      falseVotes: 0,
      userVote: 'true',
      commentsCount: 0,
    };

    setReviews([newRev, ...reviews]);
    setReviewNotes('');
    setIsModalOpen(false);
    showToast('Anonymous ZK-Proof Audit Logged Successfully (+50 XP)!');
  };

  const filteredReviews = reviews.filter(rev => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'voted') return rev.trueVotes >= 40;
    if (activeFilter === 'pay') return rev.category === 'pay';
    if (activeFilter === 'safety') return rev.category === 'safety' || rev.rating <= 3.0;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-semibold animate-in fade-in border border-yellow-400">
          <CheckCircle2 className="w-4 h-4 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Info Banner */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-7 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 bg-yellow-100 text-amber-900 px-3.5 py-1 rounded-full text-xs font-bold mb-1">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>Zero Retaliation Protocol Active</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Community Site Intel & Reviews
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
              100% Anonymous worker reviews protected against contractor retaliation. Verified by peer votes.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 py-3.5 px-6 rounded-2xl font-bold text-xs uppercase tracking-wider shadow-sm btn-smooth transition-all cursor-pointer shrink-0 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Give Anonymous Feedback</span>
          </button>
        </div>

        {/* Filter Chips Scrollable Row */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-100 scrollbar-none">
          {[
            { id: 'all', label: 'All Sites' },
            { id: 'voted', label: 'Most Voted' },
            { id: 'pay', label: 'Fair Pay Sites' },
            { id: 'safety', label: 'Safety Warnings' },
          ].map(chip => (
            <button
              key={chip.id}
              onClick={() => setActiveFilter(chip.id)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeFilter === chip.id
                  ? 'bg-amber-400 text-slate-950 shadow-sm scale-102'
                  : 'bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* Trust & ZK Shield Strip */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-900 block">
              ZK-Shield Identity Obfuscation
            </span>
            <span className="text-[11px] text-slate-400">
              Contractors cannot inspect phone or worker ID
            </span>
          </div>
        </div>
        <span className="self-start sm:self-auto text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full uppercase">
          P2P Validated
        </span>
      </div>

      {/* Reviews Feed Grid: 1 col on mobile, 2 cols on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredReviews.map(rev => (
          <div
            key={rev.id}
            className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
          >
            <div className="space-y-3">
              {/* Header */}
              <div className="flex justify-between items-start gap-2">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 truncate">
                    {rev.site}
                  </h3>
                  <span className="text-xs text-slate-400 font-medium">
                    Shift: {rev.date}
                  </span>
                </div>

                {rev.badgeType === 'error' && (
                  <span className="bg-rose-50 text-rose-700 border border-rose-200 px-3 py-1 rounded-full text-[10px] font-bold uppercase shrink-0 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    {rev.badge}
                  </span>
                )}
                {rev.badgeType === 'success' && (
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full text-[10px] font-bold uppercase shrink-0 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    {rev.badge}
                  </span>
                )}
                {rev.badgeType === 'neutral' && (
                  <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase shrink-0">
                    {rev.badge}
                  </span>
                )}
              </div>

              {/* Author & Star Rating */}
              <div className="flex items-center gap-2">
                <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5">
                  <Lock className="w-3 h-3 text-slate-400" />
                  {rev.author}
                </span>
                <div className="flex items-center gap-1 bg-yellow-50 border border-yellow-200 px-2.5 py-0.5 rounded-full text-xs font-bold text-amber-700 font-mono">
                  <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                  <span>{rev.rating}/5</span>
                </div>
              </div>

              {/* Sub-breakdown rating bars */}
              {rev.subRatings && (
                <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  {rev.subRatings.map((sub, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-xs font-medium text-slate-600">
                        <span>{sub.label}</span>
                        <span style={{ color: sub.color }} className="font-bold">
                          {sub.score.toFixed(1)} ★
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${(sub.score / 5) * 100}%`,
                            backgroundColor: sub.color
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Review Text */}
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                "{rev.text}"
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {/* Truth Meter Consensus */}
              <div className="bg-yellow-50/70 border border-yellow-200/60 p-3 rounded-2xl flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <Flame className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="text-xs font-bold text-amber-900 truncate">
                    {rev.consensus}
                  </span>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-white border border-emerald-200 px-2.5 py-0.5 rounded-full shrink-0">
                  {rev.confidence}
                </span>
              </div>

              {/* Truth Vote Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleVote(rev.id, 'true')}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase flex items-center gap-1.5 transition-all cursor-pointer ${
                      rev.userVote === 'true'
                        ? 'bg-amber-400 text-slate-950 shadow-sm scale-105'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>True ({rev.trueVotes})</span>
                  </button>

                  <button
                    onClick={() => handleVote(rev.id, 'false')}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase flex items-center gap-1.5 transition-all cursor-pointer ${
                      rev.userVote === 'false'
                        ? 'bg-rose-500 text-white shadow-sm scale-105'
                        : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    <ThumbsDown className="w-3.5 h-3.5" />
                    <span>False ({rev.falseVotes})</span>
                  </button>
                </div>

                <div className="flex items-center gap-1 text-slate-400 text-xs bg-slate-50 px-3 py-1 rounded-full">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{rev.commentsCount}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slide-Up Feedback Modal Sheet */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-7 space-y-4 shadow-2xl border border-slate-100 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  Anonymous Site Audit
                </h3>
                <span className="text-xs text-emerald-600 font-bold">
                  Zero-Knowledge ID Hash Applied
                </span>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase">
                  Select Workplace Shift
                </label>
                <select
                  value={selectedShift}
                  onChange={(e) => setSelectedShift(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 p-3 rounded-2xl text-xs font-medium focus:outline-none focus:border-amber-400"
                >
                  <option>Metro Pier #12 Sanpada (Completed Today)</option>
                  <option>Apex Infra - Site 4B (Completed Nov 14)</option>
                  <option>SRM Logistics Turbhe (Completed Nov 12)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">
                  Safety & Gear Condition
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {['Poor', 'Fair', 'Good', 'Excellent'].map(r => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setSelectedRating(r)}
                      className={`py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        selectedRating === r
                          ? 'bg-amber-400 text-slate-900 shadow-sm'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase">
                  Worker Intel & Observations
                </label>
                <textarea
                  rows={3}
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  placeholder="Describe drinking water, washrooms, supervisor tone, overtime settlement..."
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 p-3 rounded-2xl text-xs focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>

              <div className="bg-yellow-50 border border-yellow-200 p-3.5 rounded-2xl flex items-center gap-3">
                <Fingerprint className="w-5 h-5 text-amber-600 shrink-0" />
                <span className="text-xs text-amber-900 leading-tight">
                  Your handle will display randomly as <strong className="font-bold">Verified Worker #W-****</strong>. No phone numbers or personal records stored.
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-2xl font-bold text-xs uppercase tracking-wider shadow-sm btn-smooth transition-all cursor-pointer"
              >
                Post Anonymous Truth Report
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
