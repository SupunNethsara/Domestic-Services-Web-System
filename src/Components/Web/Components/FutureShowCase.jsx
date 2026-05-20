import React from 'react'

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    color: 'indigo',
    title: 'Seamless Communication',
    desc: 'Real-time chat with professionals. Discuss job details, share availability, and confirm bookings — all in one place.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: 'violet',
    title: 'Daily Opportunities',
    desc: 'Discover local jobs that match your skills. Set preferred hours and find work that perfectly fits your lifestyle.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
    color: 'pink',
    title: 'Verified Reviews',
    desc: 'Build your reputation through transparent ratings. Make confident decisions with real, verified feedback from real people.',
  },
];

const colorMap = {
  indigo: { bg: 'bg-indigo-50', icon: 'text-indigo-600', border: 'hover:border-indigo-200', num: 'text-indigo-100' },
  violet: { bg: 'bg-violet-50', icon: 'text-violet-600', border: 'hover:border-violet-200', num: 'text-violet-100' },
  pink:   { bg: 'bg-pink-50',   icon: 'text-pink-600',   border: 'hover:border-pink-200',   num: 'text-pink-100'   },
};

function FutureShowCase() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-600 text-sm font-semibold rounded-full mb-4 border border-indigo-100">
            Platform Features
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            Everything you need to{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">succeed</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Powerful tools built for both clients and professionals — from finding work to getting paid.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const c = colorMap[f.color];
            return (
              <div key={i} className={`relative group bg-white p-8 rounded-2xl border border-slate-100 ${c.border} hover:shadow-2xl transition-all duration-300 overflow-hidden`}>
                <span className={`absolute top-5 right-6 text-8xl font-black ${c.num} select-none pointer-events-none leading-none`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className={`w-14 h-14 ${c.bg} rounded-2xl flex items-center justify-center mb-6 ${c.icon} group-hover:scale-110 transition-transform duration-300`}>
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 relative">{f.title}</h3>
                <p className="text-slate-500 leading-relaxed relative">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FutureShowCase;