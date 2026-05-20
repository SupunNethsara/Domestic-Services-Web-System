import React from 'react'

const clientFeatures = [
  {
    icon: '🔍',
    title: 'Find Quality Workers',
    items: ['Search skilled professionals in your area', 'Filter by availability, ratings, and budget'],
  },
  {
    icon: '📋',
    title: 'Project Management',
    items: ['Monitor progress with real-time updates', 'Schedule and manage appointments seamlessly'],
  },
];

const workerFeatures = [
  {
    icon: '👤',
    title: 'Professional Profile',
    items: ['Showcase your experience and specialties', 'Highlight certifications and qualifications'],
  },
  {
    icon: '📈',
    title: 'Business Growth',
    items: ['Track your earnings and performance metrics', 'Build credibility through client reviews'],
  },
];

function Description() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-600 text-sm font-semibold rounded-full mb-4 border border-indigo-100">
            How It Works
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            Streamlined for{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Everyone</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Thoughtfully designed workflows for both clients hiring help and professionals offering services.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* For Clients */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-5 flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-xl">🏠</div>
              <div>
                <p className="text-indigo-200 text-xs font-medium uppercase tracking-widest">Hiring Help?</p>
                <h3 className="text-white text-xl font-bold">For Clients</h3>
              </div>
            </div>
            <div className="p-8 space-y-6">
              {clientFeatures.map((feat, i) => (
                <div key={i} className={i < clientFeatures.length - 1 ? 'pb-6 border-b border-slate-100' : ''}>
                  <h4 className="flex items-center gap-2 text-base font-semibold text-slate-900 mb-3">
                    <span>{feat.icon}</span> {feat.title}
                  </h4>
                  <ul className="space-y-2.5">
                    {feat.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2.5">
                        <svg className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-slate-600 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <button className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-indigo-200 hover:-translate-y-0.5 transition-all duration-300">
                Discover Client Features →
              </button>
            </div>
          </div>

          {/* For Workers */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-8 py-5 flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-xl">💼</div>
              <div>
                <p className="text-emerald-100 text-xs font-medium uppercase tracking-widest">Finding Work?</p>
                <h3 className="text-white text-xl font-bold">For Workers</h3>
              </div>
            </div>
            <div className="p-8 space-y-6">
              {workerFeatures.map((feat, i) => (
                <div key={i} className={i < workerFeatures.length - 1 ? 'pb-6 border-b border-slate-100' : ''}>
                  <h4 className="flex items-center gap-2 text-base font-semibold text-slate-900 mb-3">
                    <span>{feat.icon}</span> {feat.title}
                  </h4>
                  <ul className="space-y-2.5">
                    {feat.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2.5">
                        <svg className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-slate-600 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <button className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-emerald-200 hover:-translate-y-0.5 transition-all duration-300">
                Explore Worker Tools →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Description;