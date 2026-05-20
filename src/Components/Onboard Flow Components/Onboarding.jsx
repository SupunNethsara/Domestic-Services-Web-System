import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isSinhala, setIsSinhala] = useState(false);

  const goTo = (next) => {
    setDirection(next > step ? 1 : -1);
    setStep(next);
  };

  const t = (en, si) => (isSinhala ? si : en);

  const stepVariants = {
    enter: (dir) => ({ opacity: 0, x: dir * 50 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir * -50 }),
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(99,102,241,0.35),transparent)]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-900/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-20 w-72 h-72 bg-indigo-900/20 rounded-full blur-3xl" />
      </div>

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-5">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </div>
          <span className="text-white font-bold text-base group-hover:text-indigo-300 transition-colors">HomeHero</span>
        </button>

        <button
          onClick={() => setIsSinhala(!isSinhala)}
          className="px-3.5 py-1.5 bg-white/5 border border-white/10 rounded-xl text-slate-300 text-xs font-medium hover:bg-white/10 hover:text-white transition-all"
        >
          {isSinhala ? 'Switch to English' : 'සිංහලට'}
        </button>
      </div>

      {/* Step dots (steps 1 & 2 only) */}
      {step > 0 && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 flex items-center gap-3">
          {[1, 2].map((s) => (
            <div key={s} className="flex items-center gap-3">
              <div className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-all duration-300 ${
                step >= s ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'bg-white/10 text-slate-500'
              }`}>
                {step > s ? (
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : s}
              </div>
              {s < 2 && (
                <div className={`w-10 h-0.5 rounded-full transition-all duration-300 ${step > s ? 'bg-indigo-600' : 'bg-white/10'}`} />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Main card */}
      <div className="w-full max-w-md relative z-10">
        <AnimatePresence mode="wait" custom={direction}>

          {/* ── Step 0: Welcome ── */}
          {step === 0 && (
            <motion.div
              key="s0"
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-indigo-500/30">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </div>

              <h1 className="text-4xl font-bold text-white mb-3 leading-tight">
                {t('Welcome to HomeHero', 'HomeHero වෙත සාදරයෙන් පිළිගනිමු')}
              </h1>
              <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                {t(
                  'Connect with trusted home professionals or offer your skills and earn income.',
                  'විශ්වාසනීය ගෘහ සේවා වෘත්තිකයන් සොයාගන්න හෝ ඔබේ කුසලතා ලබා දෙන්න.'
                )}
              </p>

              <button
                onClick={() => goTo(1)}
                className="w-full py-4 bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold rounded-2xl shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all duration-300 text-lg mb-3"
              >
                {t("Let's Get Started", 'ආරම්භ කරමු')} →
              </button>
              <button
                onClick={() => navigate('/login')}
                className="w-full py-3.5 bg-white/5 border border-white/10 text-slate-300 font-medium rounded-2xl hover:bg-white/10 hover:text-white transition-all duration-200"
              >
                {t('Already have an account? Sign in', 'දැනටමත් ගිණුමක් ඇත? පිවිසෙන්න')}
              </button>
            </motion.div>
          )}

          {/* ── Step 1: New or Existing ── */}
          {step === 1 && (
            <motion.div
              key="s1"
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">
                  {t('Are you new here?', 'ඔබ නව පරිශීලකයෙක්ද?')}
                </h2>
                <p className="text-slate-400 text-sm">
                  {t('Choose how you want to continue', 'ඔබ ඉදිරියට යාමට කැමති ආකාරය තෝරන්න')}
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => goTo(2)}
                  className="w-full p-5 bg-white/5 border border-white/10 hover:border-indigo-500/50 hover:bg-indigo-500/10 rounded-2xl text-left flex items-center gap-4 group transition-all duration-200"
                >
                  <div className="w-12 h-12 bg-indigo-500/15 border border-indigo-500/20 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                    ✨
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-white text-base">{t('Create New Account', 'නව ගිණුමක් සාදන්න')}</p>
                    <p className="text-slate-400 text-sm">{t("I'm new — let's set up my profile", 'මම නවකයෙකි, ගිණුමක් සකසමු')}</p>
                  </div>
                  <svg className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <button
                  onClick={() => navigate('/login')}
                  className="w-full p-5 bg-white/5 border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/10 rounded-2xl text-left flex items-center gap-4 group transition-all duration-200"
                >
                  <div className="w-12 h-12 bg-emerald-500/15 border border-emerald-500/20 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                    👋
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-white text-base">{t('Sign Back In', 'නැවත පිවිසෙන්න')}</p>
                    <p className="text-slate-400 text-sm">{t('I already have an account', 'මට දැනටමත් ගිණුමක් ඇත')}</p>
                  </div>
                  <svg className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <button
                onClick={() => goTo(0)}
                className="mt-6 flex items-center gap-1.5 text-slate-500 hover:text-slate-300 text-sm transition-colors mx-auto"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {t('Back', 'ආපසු')}
              </button>
            </motion.div>
          )}

          {/* ── Step 2: Role ── */}
          {step === 2 && (
            <motion.div
              key="s2"
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">
                  {t('What describes you?', 'ඔබව විස්තර කරන්නේ කෙසේද?')}
                </h2>
                <p className="text-slate-400 text-sm">
                  {t('Choose your role to personalise your experience', 'ඔබේ අත්දැකීම පෞද්ගලිකීකරණය කිරීමට භූමිකාව තෝරන්න')}
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => navigate('/Client-Register')}
                  className="w-full p-6 bg-white/5 border border-white/10 hover:border-indigo-500/50 hover:bg-indigo-500/10 rounded-2xl text-left flex items-start gap-4 group transition-all duration-200"
                >
                  <div className="w-14 h-14 bg-indigo-500/15 border border-indigo-500/20 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 group-hover:scale-110 transition-transform">
                    🏠
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-white text-lg mb-1">{t("I'm a Client", 'මම සේවාදායකයෙකි')}</p>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {t('I need help with cleaning, cooking, childcare, or other home services', 'මට ගෘහ සේවා සඳහා සහාය අවශ්‍යයි')}
                    </p>
                    <span className="inline-block mt-2 text-xs text-indigo-400 font-semibold">{t('Hire professionals →', 'වෘත්තිකයන් සොයා ගන්න →')}</span>
                  </div>
                </button>

                <button
                  onClick={() => navigate('/Worker-Register')}
                  className="w-full p-6 bg-white/5 border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/10 rounded-2xl text-left flex items-start gap-4 group transition-all duration-200"
                >
                  <div className="w-14 h-14 bg-emerald-500/15 border border-emerald-500/20 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 group-hover:scale-110 transition-transform">
                    💼
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-white text-lg mb-1">{t("I'm a Professional", 'මම වෘත්තිකයෙකි')}</p>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {t('I offer home services and want to connect with clients to earn income', 'මට සේවා ලබා දී ආදායම් ඉපයීමට අවශ්‍යයි')}
                    </p>
                    <span className="inline-block mt-2 text-xs text-emerald-400 font-semibold">{t('Start earning →', 'ඉපයීම ආරම්භ කරන්න →')}</span>
                  </div>
                </button>
              </div>

              <button
                onClick={() => goTo(1)}
                className="mt-6 flex items-center gap-1.5 text-slate-500 hover:text-slate-300 text-sm transition-colors mx-auto"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {t('Back', 'ආපසු')}
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
};

export default Onboarding;