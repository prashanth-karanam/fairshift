import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wrench, Building2, ArrowRight, Shield, Volume2, CheckCircle2, Sparkles, ChevronRight } from 'lucide-react';

export default function RoleGateway() {
  const navigate = useNavigate();
  const [selectedLang, setSelectedLang] = useState('en');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const heroContent = {
    en: {
      title: 'How will you use FairShift today?',
      desc: 'Empowering frontline workers and verified contractors with audited escrow wages, fatigue safety, and real-time biometric telemetry.',
      workerTitle: "I'M A FRONTLINE WORKER",
      workerSub: 'Daily Instant Pay, tamper-proof skill passport & anonymous safety hazard reporting',
      employerTitle: "I'M AN EMPLOYER / CONTRACTOR",
      employerSub: 'BOCW 1996 audit compliance, fatigue lockout radar & verified site telemetry'
    },
    hi: {
      title: 'आज आप FairShift का उपयोग कैसे करेंगे?',
      desc: 'मजदूरों और ठेकेदारों को एस्क्रो वेतन गारंटी, थकान सुरक्षा और वास्तविक समय सुरक्षा रिपोर्टिंग प्रदान करना।',
      workerTitle: 'मैं एक श्रमिक / कारीगर हूँ',
      workerSub: 'दैनिक त्वरित भुगतान, डिजिटल कौशल पासपोर्ट और गुप्त सुरक्षा शिकायतें',
      employerTitle: 'मैं एक नियोक्ता / ठेकेदार हूँ',
      employerSub: 'BOCW 1996 कानून अनुपालन, थकान रडार और लाइव कार्यस्थल उपस्थिति'
    },
    ta: {
      title: 'இன்று நீங்கள் FairShift ஐ எவ்வாறு பயன்படுத்துவீர்கள்?',
      desc: 'தொழிலாளர்கள் மற்றும் ஒப்பந்ததாரர்களுக்கான உடனடி கூலி பாதுகாப்பு மற்றும் பணித்தள பாதுகாப்பு தளம்.',
      workerTitle: 'நான் ஒரு களப் பணியாளர்',
      workerSub: 'தினசரி உடனடி கூலி, டிஜிட்டல் சான்றிதழ் மற்றும் ரகசிய புகார்கள்',
      employerTitle: 'நான் ஒரு முதலாளி / ஒப்பந்ததாரர்',
      employerSub: 'BOCW 1996 சட்ட இணக்கம் மற்றும் பணியாளர் பாதுகாப்பு மேலாண்மை'
    },
    mr: {
      title: 'आज तुम्ही FairShift चा वापर कसा कराल?',
      desc: 'कामगार आणि कंत्राटदारांसाठी थेट एस्क्रो मजुरी हमी, विश्रांती नियम आणि सुरक्षित कामाची जागा.',
      workerTitle: 'मी एक कामगार / कारागीर आहे',
      workerSub: 'रोजची मजुरी थेट खात्यात, कौशल्य पासपोर्ट आणि गुप्त तक्रार निवारण',
      employerTitle: 'मी एक मालक / कंत्राटदार आहे',
      employerSub: 'BOCW 1996 कामगार कायदा पूर्तता आणि थेट बायोमेट्रिक हजेरी'
    }
  };

  const current = heroContent[selectedLang] || heroContent.en;

  const playSpeech = () => {
    setIsSpeaking(true);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const textToSpeak = selectedLang === 'hi' 
        ? "FairShift में आपका स्वागत है। क्या आप एक श्रमिक हैं या ठेकेदार?"
        : "Welcome to FairShift. Please select your role to proceed.";
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsSpeaking(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50/60 via-slate-50 to-white flex flex-col items-center justify-center px-4 py-10 relative overflow-hidden">
      {/* Decorative Warm Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-yellow-200/40 via-amber-100/20 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="relative z-10 flex flex-col items-center max-w-2xl w-full">
        {/* Top UN SDG 8 Pill */}
        <div className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-slate-800 shadow-sm border border-yellow-200 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span className="text-amber-700 font-bold">UN SDG 8</span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-600">Decent Work & Fair Wage Standard</span>
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 ml-0.5" />
        </div>

        {/* Brand Logo & Wordmark */}
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-900 flex items-center justify-center font-black text-xl shadow-md transform rotate-3">
            ⚡
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900">
            <span className="text-amber-500">FAIR</span>SHIFT
          </h1>
        </div>

        <p className="text-slate-500 text-xs sm:text-sm text-center mb-6 max-w-md font-medium">
          Frontline Workforce Platform — Fair Shifts. Fair Pay. Full Transparency.
        </p>

        {/* Multilingual Selector + Voice Assistant Pill */}
        <div className="bg-white/90 backdrop-blur-md border border-slate-200/90 rounded-2xl p-1.5 mb-6 flex items-center justify-between gap-3 shadow-sm w-full max-w-md">
          <div className="flex items-center gap-1 overflow-x-auto p-0.5">
            {[
              { id: 'en', label: 'EN' },
              { id: 'hi', label: 'हिंदी' },
              { id: 'ta', label: 'தமிழ்' },
              { id: 'mr', label: 'मराठी' }
            ].map(lang => (
              <button
                key={lang.id}
                onClick={() => setSelectedLang(lang.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedLang === lang.id
                    ? 'bg-amber-400 text-slate-900 shadow-sm scale-105'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          <button
            onClick={playSpeech}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
              isSpeaking ? 'bg-emerald-500 text-white animate-pulse' : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
            }`}
            title="Listen to audio guide"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        {/* Active Escrow Guarantee Ticker Banner */}
        <div className="w-full bg-white rounded-3xl p-4 mb-6 shadow-sm border border-yellow-200/70 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-400/20 text-amber-700 flex items-center justify-center font-bold text-lg">
              ₹
            </div>
            <div>
              <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">Locked in Active Escrow Pool</p>
              <p className="text-lg font-extrabold text-slate-900 font-mono">₹48,92,400 <span className="text-emerald-600 text-xs font-bold ml-1">● 1,420 Active Shifts</span></p>
            </div>
          </div>
          <span className="hidden sm:inline-flex px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
            BOCW Act 100% Safe
          </span>
        </div>

        {/* Gateway Heading */}
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-1">
            {current.title}
          </h2>
          <p className="text-xs text-slate-500 max-w-lg mx-auto">
            {current.desc}
          </p>
        </div>

        {/* 2 Main Role Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          {/* Card A: Frontline Worker */}
          <button
            onClick={() => navigate('/worker')}
            className="group relative bg-white hover:bg-yellow-50/40 rounded-3xl p-6 text-left border-2 border-amber-300 hover:border-amber-400 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-900 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <Wrench className="w-7 h-7" strokeWidth={2.5} />
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold">
                  Instant Pay
                </span>
              </div>

              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block mb-1">
                Frontline Field Trade
              </span>
              <h3 className="text-lg font-extrabold text-slate-900 mb-2 leading-tight">
                {current.workerTitle}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {current.workerSub}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {['Daily Payout', 'Radar GPS', 'Skill Passport'].map(tag => (
                  <span key={tag} className="text-[10px] text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full font-medium">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </button>

          {/* Card B: Employer / Contractor */}
          <button
            onClick={() => navigate('/employer')}
            className="group relative bg-white hover:bg-slate-50/80 rounded-3xl p-6 text-left border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <Building2 className="w-7 h-7" strokeWidth={2} />
                </div>
                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold">
                  Desktop Console
                </span>
              </div>

              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Principal Contractor / Ops
              </span>
              <h3 className="text-lg font-extrabold text-slate-900 mb-2 leading-tight">
                {current.employerTitle}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {current.employerSub}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {['BOCW 1996 Audit', 'Fatigue Radar', '482 Staff'].map(tag => (
                  <span key={tag} className="text-[10px] text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full font-medium">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </button>
        </div>

        {/* Footer Guarantees */}
        <div className="mt-8 text-center text-[11px] text-slate-400 font-medium flex flex-wrap items-center justify-center gap-3">
          <span>ILO C155 & ISO 45001 Standard</span>
          <span>•</span>
          <span>Building and Other Construction Workers (BOCW 1996)</span>
          <span>•</span>
          <span>Zero Retaliation Protocol</span>
        </div>
      </div>
    </div>
  );
}
