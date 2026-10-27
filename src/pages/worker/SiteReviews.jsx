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
      { label: 'Punctuality', score: 4.4, color: '#FACC15' },
    ],
    text: 'Heavy work but safety gear is brand new. Strict 1-hour lunch break provided. Payout arrived before reaching the gate.',
    consensus: '42 Workers Verified',
    confidence: '100% Trust',
    trueVotes: 42,
    falseVotes: 0,
    userVote: null,
    commentsCount: 3,
  },
  {
    id: 4,
    site: 'Phoenix Mall Facility Expansion',
    category: 'pay',
    date: '1 week ago',
    badge: 'FAIR PAY SITE',
    badgeType: 'success',
    author: 'Verified Mason #M-1094',
    rating: 4.7,
    subRatings: [
      { label: 'Safety Protocol', score: 4.8, color: '#10B981' },
      { label: 'Wage Escrow', score: 4.9, color: '#10B981' },
    ],
    text: 'Strict enforcement of hydration breaks. Site supervisor treats everyone with dignity. Daily cashout guaranteed within 15 mins.',
    consensus: '67 Workers Verified',
    confidence: '98% Peer Confidence',
    trueVotes: 67,
    falseVotes: 2,
    userVote: null,
    commentsCount: 5,
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
    <div className="flex flex-col gap-4 p-4 text-[#FAFAFA]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#27272A] border border-[#FACC15] text-[#FAFAFA] px-4 py-2 rounded-lg shadow-xl flex items-center gap-2 text-xs font-mono animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4 text-[#FACC15]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Info Banner */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1.5 bg-[#27272A] px-2.5 py-1 rounded border border-[#3F3F46] self-start">
          <ShieldCheck className="w-3.5 h-3.5 text-[#FACC15]" />
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#FAFAFA] font-semibold">
            Zero Retaliation Protocol Active
          </span>
        </div>

        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#FAFAFA]" style={{ fontFamily: 'Inter, sans-serif' }}>
            Community Site Intel & Reviews
          </h1>
          <p className="text-xs text-[#A1A1AA] font-mono mt-0.5">
            100% Anonymous worker reviews protected against contractor retaliation. Verified by peer votes.
          </p>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full flex items-center justify-center gap-2 bg-[#FACC15] hover:bg-[#EAB308] text-[#09090B] py-3 px-4 rounded font-mono text-xs font-bold uppercase tracking-wider shadow-hard btn-press transition-all cursor-pointer mt-1"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>+ Give Anonymous Feedback</span>
        </button>

        {/* Filter Chips Scrollable Row */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-1 scrollbar-none -mx-4 px-4">
          {[
            { id: 'all', label: 'All Sites' },
            { id: 'voted', label: 'Most Voted' },
            { id: 'pay', label: 'Fair Pay Sites' },
            { id: 'safety', label: 'Safety Warnings' },
          ].map(chip => (
            <button
              key={chip.id}
              onClick={() => setActiveFilter(chip.id)}
              className={`whitespace-nowrap px-3 py-1.5 rounded font-mono text-[11px] font-bold uppercase transition-colors ${
                activeFilter === chip.id
                  ? 'bg-[#FACC15] text-[#09090B]'
                  : 'bg-[#18181B] text-[#A1A1AA] hover:text-[#FAFAFA] border border-[#27272A]'
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* Trust & ZK Shield Strip */}
      <div className="bg-[#18181B] border border-[#27272A] rounded-lg p-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-[#10B981]" />
          <div className="flex flex-col">
            <span className="text-[10px] font-mono uppercase font-bold text-[#FAFAFA]">
              ZK-Shield Identity Obfuscation
            </span>
            <span className="text-[10px] text-[#A1A1AA] font-mono">
              Contractors cannot inspect phone or worker ID
            </span>
          </div>
        </div>
        <span className="text-[9px] font-mono text-[#10B981] bg-[#10B981]/15 border border-[#10B981]/30 px-2 py-0.5 rounded font-bold uppercase">
          P2P Peer Validated
        </span>
      </div>

      {/* Reviews Feed List */}
      <div className="flex flex-col gap-3 pb-8">
        {filteredReviews.length === 0 ? (
          <div className="text-center py-8 text-[#A1A1AA] text-xs font-mono">
            No reviews match this filter.
          </div>
        ) : (
          filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#18181B] border border-[#27272A] rounded-lg p-3.5 shadow-hard flex flex-col gap-2.5"
            >
              {/* Card Header */}
              <div className="flex justify-between items-start gap-2">
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-bold text-[#FAFAFA] truncate" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {rev.site}
                  </span>
                  <div className="flex items-center gap-1.5 mt-0.5 text-[#A1A1AA] text-[10px] font-mono">
                    <Calendar className="w-3 h-3" />
                    <span>Shift: {rev.date}</span>
                  </div>
                </div>

                {rev.badgeType === 'error' && (
                  <span className="bg-[#F43F5E]/20 text-[#FB7185] border border-[#F43F5E]/40 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase shrink-0 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    {rev.badge}
                  </span>
                )}
                {rev.badgeType === 'success' && (
                  <span className="bg-[#10B981]/20 text-[#34D399] border border-[#10B981]/40 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase shrink-0 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    {rev.badge}
                  </span>
                )}
                {rev.badgeType === 'neutral' && (
                  <span className="bg-[#27272A] text-[#FAFAFA] border border-[#3F3F46] px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase shrink-0">
                    {rev.badge}
                  </span>
                )}
              </div>

              {/* Author & Star Rating */}
              <div className="flex items-center gap-2">
                <span className="bg-[#27272A] border border-[#3F3F46] text-[#FACC15] px-2 py-0.5 rounded text-[10px] font-mono flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  {rev.author}
                </span>
                <div className="flex items-center gap-1 bg-[#09090B] px-2 py-0.5 rounded border border-[#27272A]">
                  <Star className="w-3 h-3 text-[#FACC15] fill-[#FACC15]" />
                  <span className="text-xs font-bold text-[#FAFAFA] font-mono">{rev.rating}/5</span>
                </div>
              </div>

              {/* Sub-breakdown rating bars */}
              {rev.subRatings && rev.subRatings.length > 0 && (
                <div className="grid grid-cols-2 gap-2 bg-[#27272A]/70 p-2 rounded border border-[#3F3F46]/50">
                  {rev.subRatings.map((sub, i) => (
                    <div key={i} className="flex flex-col gap-1">
                      <div className="flex justify-between text-[10px] font-mono text-[#A1A1AA]">
                        <span>{sub.label}</span>
                        <span style={{ color: sub.color }} className="font-bold">
                          {sub.score.toFixed(1)} ★
                        </span>
                      </div>
                      <div className="w-full bg-[#18181B] h-1.5 rounded-full overflow-hidden">
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
              <p className="text-xs text-[#FAFAFA] font-mono leading-relaxed">
                "{rev.text}"
              </p>

              {/* Consensus Truth Meter */}
              <div className="bg-[#27272A] p-2 rounded flex items-center justify-between gap-2 border border-[#3F3F46]">
                <div className="flex items-center gap-1.5 min-w-0">
                  <Flame className="w-3.5 h-3.5 text-[#FACC15] shrink-0" />
                  <span className="text-[11px] font-mono font-semibold text-[#FACC15] truncate">
                    {rev.consensus}
                  </span>
                </div>
                <span className="text-[9px] font-mono text-[#10B981] bg-[#18181B] px-1.5 py-0.5 rounded shrink-0 border border-[#27272A]">
                  {rev.confidence}
                </span>
              </div>

              {/* Truth Vote Actions */}
              <div className="flex items-center justify-between pt-1 border-t border-[#27272A]">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleVote(rev.id, 'true')}
                    className={`px-2.5 py-1 rounded font-mono text-[10px] font-bold uppercase flex items-center gap-1.5 transition-all ${
                      rev.userVote === 'true'
                        ? 'bg-[#FACC15] text-[#09090B] shadow-sm'
                        : 'bg-[#27272A] text-[#FAFAFA] hover:bg-[#3F3F46] border border-[#3F3F46]'
                    }`}
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span>True ({rev.trueVotes})</span>
                  </button>

                  <button
                    onClick={() => handleVote(rev.id, 'false')}
                    className={`px-2.5 py-1 rounded font-mono text-[10px] font-bold uppercase flex items-center gap-1.5 transition-all ${
                      rev.userVote === 'false'
                        ? 'bg-[#F43F5E] text-white shadow-sm'
                        : 'bg-[#27272A] text-[#A1A1AA] hover:bg-[#3F3F46] border border-[#3F3F46]'
                    }`}
                  >
                    <ThumbsDown className="w-3 h-3" />
                    <span>False ({rev.falseVotes})</span>
                  </button>
                </div>

                <div className="flex items-center gap-1 text-[#A1A1AA] text-[10px] font-mono bg-[#27272A] px-2 py-1 rounded">
                  <MessageSquare className="w-3 h-3" />
                  <span>{rev.commentsCount}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Slide-Up Feedback Modal Sheet */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#09090B]/85 backdrop-blur-sm flex items-end justify-center animate-in fade-in duration-200">
          <div className="w-full max-w-[480px] bg-[#18181B] border-t-2 border-[#FACC15] rounded-t-xl p-4 flex flex-col gap-3 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="w-12 h-1 bg-[#3F3F46] rounded-full mx-auto self-center -mt-1" />

            <div className="flex items-center justify-between border-b border-[#27272A] pb-2">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#FAFAFA]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Anonymous Site Audit
                </span>
                <span className="text-[10px] font-mono text-[#10B981]">
                  Zero-Knowledge ID Hash applied
                </span>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-[#A1A1AA] hover:text-[#FAFAFA] rounded hover:bg-[#27272A]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="flex flex-col gap-3">
              {/* Select Workplace */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono uppercase text-[#A1A1AA]">
                  Select Workplace Shift
                </label>
                <select
                  value={selectedShift}
                  onChange={(e) => setSelectedShift(e.target.value)}
                  className="bg-[#27272A] text-[#FAFAFA] border border-[#3F3F46] p-2.5 rounded font-mono text-xs focus:outline-none focus:border-[#FACC15]"
                >
                  <option>Metro Pier #12 Sanpada (Completed Today)</option>
                  <option>Apex Infra - Site 4B (Completed Nov 14)</option>
                  <option>SRM Logistics Turbhe (Completed Nov 12)</option>
                  <option>Phoenix Mall Expansion (Completed Nov 08)</option>
                </select>
              </div>

              {/* Rating Pills */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono uppercase text-[#A1A1AA]">
                  Safety & Gear Condition
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {['Poor', 'Fair', 'Good', 'Excellent'].map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setSelectedRating(r)}
                      className={`py-2 rounded font-mono text-[10px] font-bold uppercase transition-colors ${
                        selectedRating === r
                          ? 'bg-[#FACC15] text-[#09090B]'
                          : 'bg-[#27272A] text-[#FAFAFA] border border-[#3F3F46] hover:bg-[#3F3F46]'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Text Area */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono uppercase text-[#A1A1AA]">
                  Worker Intel & Notes
                </label>
                <textarea
                  rows={3}
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  placeholder="Describe drinking water, washrooms, supervisor tone, overtime settlement..."
                  className="bg-[#27272A] text-[#FAFAFA] border border-[#3F3F46] p-2.5 rounded font-mono text-xs focus:outline-none focus:border-[#FACC15] placeholder:text-[#A1A1AA]/50 resize-none"
                />
              </div>

              {/* Anonymity Security Notice */}
              <div className="bg-[#09090B] p-2.5 rounded border border-[#27272A] flex items-center gap-2">
                <Fingerprint className="w-5 h-5 text-[#10B981] shrink-0" />
                <span className="text-[10px] text-[#A1A1AA] font-mono leading-tight">
                  Your handle will display as <strong className="text-[#FAFAFA]">Verified Worker #W-****</strong>. No phone or personal data stored.
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-[#FACC15] hover:bg-[#EAB308] text-[#09090B] rounded font-mono text-xs font-bold uppercase tracking-widest shadow-hard btn-press transition-all mt-1"
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
