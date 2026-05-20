import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

function HeroSection() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ user_count: 0, client_count: 0, worker_count: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/user-count');
        setStats(response.data);
        setLoading(false);
        animateCountUp('userCount', 0, response.data.user_count, 2000);
        animateCountUp('clientCount', 0, response.data.client_count, 2000);
        animateCountUp('workerCount', 0, response.data.worker_count, 2000);
      } catch {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const animateCountUp = (elementId, start, end, duration) => {
    let startTimestamp = null;
    const element = document.getElementById(elementId);
    if (!element) return;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      element.textContent = Math.floor(progress * (end - start) + start);
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  };

  const services = [
    { icon: '🏠', title: 'House Cleaning', rate: '$25–35/hr', badge: 'Popular' },
    { icon: '👨‍🍳', title: 'Personal Chef', rate: '$30–50/hr', badge: 'New' },
    { icon: '👶', title: 'Childcare', rate: '$20–30/hr', badge: 'Trending' },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(99,102,241,0.35),transparent)]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-900/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-20 w-80 h-80 bg-indigo-900/20 rounded-full blur-3xl" />
      </div>

      <section className="relative flex items-center min-h-screen pt-24 pb-16 px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">

            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-indigo-300">Trusted by thousands of professionals</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-[1.05] tracking-tight">
                <span className="text-white">Find Trusted</span>
                <br />
                <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
                  Home Services
                </span>
                <br />
                <span className="text-white">Near You</span>
              </h1>

              <p className="text-lg text-slate-400 mb-10 max-w-lg leading-relaxed">
                Connect with verified home professionals for cleaning, cooking, childcare, and more.
                Your home, handled by the best — on your schedule.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-14">
                <button
                  onClick={() => navigate('/Welcome')}
                  className="group flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold rounded-2xl shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all duration-300"
                >
                  Get Started Free
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
                <button className="flex items-center justify-center gap-2.5 px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-2xl hover:bg-white/10 transition-all duration-300">
                  <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Watch Demo
                </button>
              </div>

              <div className="flex items-center gap-10 pt-8 border-t border-white/10">
                {[
                  { id: 'userCount', value: stats.user_count, label: 'Total Users' },
                  { id: 'clientCount', value: stats.client_count, label: 'Active Clients' },
                  { id: 'workerCount', value: stats.worker_count, label: 'Professionals' },
                ].map((stat) => (
                  <div key={stat.id}>
                    <div className="text-3xl font-bold text-white mb-0.5">
                      <span id={stat.id}>{loading ? '—' : stat.value}</span>
                      <span className="text-indigo-400">+</span>
                    </div>
                    <div className="text-xs text-slate-500 font-medium uppercase tracking-wide">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:flex justify-center items-center">
              <div className="relative w-full max-w-sm">
                <div className="absolute inset-0 bg-indigo-600/20 rounded-3xl blur-2xl scale-105" />

                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-widest font-medium mb-1">Top Services</p>
                      <h3 className="text-lg font-semibold text-white">Available Now</h3>
                    </div>
                    <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {services.map((service, i) => (
                      <div key={i} className="flex items-center gap-4 p-3.5 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/15 rounded-2xl transition-all duration-200 cursor-pointer">
                        <div className="w-11 h-11 bg-indigo-500/10 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                          {service.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-white text-sm">{service.title}</div>
                          <div className="text-slate-400 text-xs">{service.rate}</div>
                        </div>
                        <span className="text-xs px-2 py-0.5 bg-indigo-500/20 text-indigo-300 rounded-full border border-indigo-500/20 whitespace-nowrap">
                          {service.badge}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button onClick={() => navigate('/Welcome')} className="w-full py-3.5 bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-200 text-sm">
                    Browse All Services →
                  </button>
                </div>

                <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl px-4 py-2.5 flex items-center gap-2.5 border border-slate-100">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-sm">✅</div>
                  <div>
                    <p className="text-xs font-semibold text-slate-800">Job Confirmed</p>
                    <p className="text-xs text-slate-400">Just now</p>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl px-4 py-2.5 flex items-center gap-2.5 border border-slate-100">
                  <div className="text-lg">⭐</div>
                  <div>
                    <p className="text-xs font-semibold text-slate-800">4.9 / 5.0</p>
                    <p className="text-xs text-slate-400">Avg. Rating</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

export default HeroSection;