import React from 'react'
import { useNavigate } from 'react-router';

const clientBenefits = [
  'Access to a wide network of verified professionals',
  'Transparent review system to make informed decisions',
  'Secure payment processing and dispute resolution',
  'Streamlined communication and project management',
  'Dedicated support for all your questions and needs',
];

const workerBenefits = [
  'Showcase your skills and build a professional portfolio',
  'Connect with clients looking for your specific expertise',
  'Reliable payment system with on-time processing',
  'Collect reviews to enhance your professional reputation',
  'Flexible scheduling and work management tools',
];

function Benefits() {
  const navigate = useNavigate();
  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-900/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-900/30 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-indigo-500/10 text-indigo-400 text-sm font-semibold rounded-full mb-4 border border-indigo-500/20">
            Why HomeHero
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            Built for{' '}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">real results</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Everything you need to grow — whether you're hiring or offering services.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:border-indigo-500/30 hover:bg-white/8 transition-all duration-300">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-2xl border border-indigo-500/20">
                🏠
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-widest font-medium">Hiring</p>
                <h3 className="text-xl font-bold text-white">For Clients</h3>
              </div>
            </div>
            <ul className="space-y-3.5 mb-8">
              {clientBenefits.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-indigo-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-slate-300 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => navigate('/Client-Register')}
              className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-indigo-500/25 hover:-translate-y-0.5 transition-all duration-300"
            >
              Register as Client →
            </button>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:border-emerald-500/30 transition-all duration-300">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-2xl border border-emerald-500/20">
                💼
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-widest font-medium">Working</p>
                <h3 className="text-xl font-bold text-white">For Professionals</h3>
              </div>
            </div>
            <ul className="space-y-3.5 mb-8">
              {workerBenefits.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-slate-300 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => navigate('/Worker-Register')}
              className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 hover:-translate-y-0.5 transition-all duration-300"
            >
              Join as Professional →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Benefits;