import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Wrench, Building2, ArrowRight, Shield, Volume2, Globe, CheckCircle2
} from 'lucide-react';

export default function RoleGateway() {
  const navigate = useNavigate();
  const [selectedLang, setSelectedLang] = useState('en');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const heroContent = {
    en: {
      title: 'How will you use FairShift today?',
      desc: 'Empowering frontline trades and verified contractors with audited escrow wages, fatigue protection, and real-time safety telemetry.',
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
        ? "FairShift में आपका स्वागत है। आप एक श्रमिक हैं या नियोक्ता?"
        : "Welcome to FairShift. Are you a frontline worker or an employer?";
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsSpeaking(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090B] flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#FAFAFA 1px, transparent 1px), linear-gradient(90deg, #FAFAFA 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative z-10 flex flex-col items-center max-w-3xl w-full">
        {/* Top UN SDG 8 Badge */}
        <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18181B] border border-[#27272A] text-xs font-mono text-[#FACC15]">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          <span className="font-semibold tracking-wider uppercase">UN SDG 8 • Decent Work & Fair Wage Standard</span>
          <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
        </div>

        {/* Logo */}
        <div className="mb-1 text-center">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
            <span className="text-[#FACC15]">FAIR</span>
            <span className="text-[#FAFAFA]">SHIFT</span>
          </h1>
        </div>

        {/* Tagline */}
        <p className="text-[#A1A1AA] text-xs sm:text-sm text-center mb-6 tracking-wide font-mono">
          Frontline Workforce Platform — Fair Shifts. Fair Pay. Full Transparency.
        </p>

        {/* Multilingual Bar + Audio Guide */}
        <div className="w-full max-w-md bg-[#18181B] border border-[#27272A] rounded-xl p-2 mb-6 flex items-center justify-between gap-2 shadow-sm">
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {[
              { id: 'en', label: 'EN' },
              { id: 'hi', label: 'हिंदी' },
              { id: 'ta', label: 'தமிழ்' },
              { id: 'mr', label: 'मराठी' }
            ].map(lang => (
              <button
                key={lang.id}
                onClick={() => setSelectedLang(lang.id)}
                className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all ${
                  selectedLang === lang.id
                    ? 'bg-[#FACC15] text-[#09090B] shadow-sm'
                    : 'bg-[#27272A] text-[#A1A1AA] hover:text-[#FAFAFA]'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          <button
            onClick={playSpeech}
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
              isSpeaking ? 'bg-[#10B981] text-[#09090B]' : 'bg-[#27272A] text-[#FACC15] hover:bg-[#3F3F46]'
            }`}
            title="Listen to voice guide"
          >
            <Volume2 className={`w-4 h-4 ${isSpeaking ? 'animate-pulse' : ''}`} />
          </button>
        </div>

        {/* Escrow Ticker Banner */}
        <div className="w-full max-w-2xl bg-[#18181B] border border-[#27272A] rounded-xl p-3.5 mb-8 flex items-center justify-between shadow-hard">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#27272A] flex items-center justify-center text-[#FACC15] font-bold">
              ₹
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-[#A1A1AA]">Locked in Active Escrow (Indian Labor Protocol)</p>
              <p className="text-base font-bold text-[#FAFAFA] font-mono">₹48,92,400 <span className="text-[#06B6D4] text-xs font-normal">● 1,420 Active Shifts</span></p>
            </div>
          </div>
          <span className="hidden sm:inline-block px-2.5 py-1 rounded bg-[#10B981]/15 border border-[#10B981]/30 text-[#34D399] font-mono text-[10px] font-bold">
            BOCW SAFE 100%
          </span>
        </div>

        {/* Dynamic Question Hero */}
        <div className="text-center mb-6 max-w-xl">
          <h2 className="text-xl sm:text-2xl font-bold text-[#FAFAFA] mb-1">
            {current.title}
          </h2>
          <p className="text-xs text-[#A1A1AA] font-mono">
            {current.desc}
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-2xl">
          {/* Worker Card */}
          <button
            onClick={() => navigate('/worker')}
            className="group relative bg-[#18181B] border border-[#27272A] border-l-4 border-l-[#FACC15] rounded p-6 text-left transition-all hover:bg-[#27272A] shadow-hard cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className="bg-[#FACC15]/10 p-3 rounded shrink-0">
                <Wrench className="w-7 h-7 text-[#FACC15]" strokeWidth={2} />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-mono text-[#FACC15] font-bold uppercase tracking-wider block mb-0.5">
                  Frontline Trade
                </span>
                <h3 className="text-[#FAFAFA] text-base font-bold tracking-wide mb-1 leading-tight">
                  {current.workerTitle}
                </h3>
                <p className="text-[#A1A1AA] text-xs leading-relaxed font-mono">
                  {current.workerSub}
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-[#A1A1AA] group-hover:text-[#FACC15] transition-colors mt-1 shrink-0" />
            </div>

            <div className="mt-4 pt-3 border-t border-[#27272A] flex flex-wrap gap-1.5">
              {['₹ Instant Pay', 'Radar Geofence', 'ZK-Reviews', 'Skill Passport'].map(tag => (
                <span key={tag} className="text-[9px] text-[#FAFAFA] bg-[#27272A] px-2 py-0.5 rounded font-mono">
                  {tag}
                </span>
              ))}
            </div>
          </button>

          {/* Employer Card */}
          <button
            onClick={() => navigate('/employer')}
            className="group relative bg-[#18181B] border border-[#27272A] border-l-4 border-l-[#06B6D4] rounded p-6 text-left transition-all hover:bg-[#27272A] shadow-hard cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className="bg-[#06B6D4]/10 p-3 rounded shrink-0">
                <Building2 className="w-7 h-7 text-[#06B6D4]" strokeWidth={2} />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-mono text-[#06B6D4] font-bold uppercase tracking-wider block mb-0.5">
                  Principal Contractor
                </span>
                <h3 className="text-[#FAFAFA] text-base font-bold tracking-wide mb-1 leading-tight">
                  {current.employerTitle}
                </h3>
                <p className="text-[#A1A1AA] text-xs leading-relaxed font-mono">
                  {current.employerSub}
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-[#A1A1AA] group-hover:text-[#06B6D4] transition-colors mt-1 shrink-0" />
            </div>

            <div className="mt-4 pt-3 border-t border-[#27272A] flex flex-wrap gap-1.5">
              {['BOCW 1996 Audit', 'Fatigue Radar', 'Whistle Triage', '482 Personnel'].map(tag => (
                <span key={tag} className="text-[9px] text-[#FAFAFA] bg-[#27272A] px-2 py-0.5 rounded font-mono">
                  {tag}
                </span>
              ))}
            </div>
          </button>
        </div>

        {/* Institutional Guarantees Footer */}
        <div className="mt-10 text-center text-[10px] font-mono text-[#A1A1AA]/60 flex flex-wrap items-center justify-center gap-4">
          <span>ILO C155 & ISO 45001 Compliant</span>
          <span>•</span>
          <span>Indian Labor Code (BOCW 1996)</span>
          <span>•</span>
          <span>Zero Retaliation ZK-Cryptographic Attestation</span>
        </div>
      </div>
    </div>
  );
}
