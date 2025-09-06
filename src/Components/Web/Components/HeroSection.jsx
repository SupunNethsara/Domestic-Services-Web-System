import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HeroSection() {
  const [stats, setStats] = useState({
    user_count: 0,
    client_count: 0,
    worker_count: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const response = await axios.get('http://127.0.0.1:8000/api/user-count');
        setStats(response.data);
        setLoading(false);
        animateCountUp('userCount', 0, response.data.user_count, 2000);
        animateCountUp('clientCount', 0, response.data.client_count, 2000);
        animateCountUp('workerCount', 0, response.data.worker_count, 2000);
      } catch (error) {
        console.error('Error fetching stats:', error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const animateCountUp = (elementId, start, end, duration) => {
    let startTimestamp = null;
    const element = document.getElementById(elementId);
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      element.textContent = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  return (
    <div className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-white/80 to-blue-50/40"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-70"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/20 to-transparent"></div>

        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-blue-100/20 blur-3xl animate-float"></div>
        <div className="absolute -left-20 -bottom-20 h-96 w-96 rounded-full bg-blue-200/20 blur-3xl animate-float animation-delay-2000"></div>
      </div>
      <section className="relative min-h-screen flex items-center px-6 py-24 sm:py-32 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center mb-6 px-4 py-2 bg-blue-100/80 backdrop-blur-sm rounded-full border border-blue-200 animate-fade-in">
                <div className="flex items-center justify-center w-8 h-8 mr-3 bg-white rounded-full">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                </div>
                <span className="text-blue-600 font-medium">Find Trusted Home-Based Work</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
                <span className="text-gray-900">Transform Your Skills Into</span>{' '}
                <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                  Stable Income
                </span>
              </h1>

              <p className="text-lg text-gray-700 mb-8 max-w-xl leading-relaxed">
                Join thousands of home workers earning a reliable income through our trusted platform.
                Whether you're skilled in cleaning, cooking, caregiving, or home maintenance -
                we connect you with opportunities that match your expertise.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button className="group relative flex items-center justify-center gap-2 px-8 py-4 font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <span className="relative z-10">Start Working Today</span>
                  <svg className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>

                <button className="group relative flex items-center justify-center gap-2 px-8 py-4 font-medium text-blue-600 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200">
                  <span className="relative z-10">Browse Opportunities</span>
                  <svg className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <div className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-200/50">
                <div className="text-center">
                  <div id="userCount" className="text-2xl font-bold text-blue-600 mb-1">
                    {loading ? '...' : stats.user_count}
                  </div>
                  <div className="text-sm text-gray-600">Total Users</div>
                </div>
                <div className="text-center">
                  <div id="clientCount" className="text-2xl font-bold text-blue-600 mb-1">
                    {loading ? '...' : stats.client_count}
                  </div>
                  <div className="text-sm text-gray-600">Clients</div>
                </div>
                <div className="text-center">
                  <div id="workerCount" className="text-2xl font-bold text-blue-600 mb-1">
                    {loading ? '...' : stats.worker_count}
                  </div>
                  <div className="text-sm text-gray-600">Workers</div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block relative">
              <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-gray-100 transform hover:scale-[1.02] transition-transform duration-500">
                <div className="absolute -top-4 -right-4 bg-blue-600 rounded-full p-3 shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Featured Opportunities
                </h3>
                <div className="space-y-4">
                  {[
                    { icon: 'home', title: 'House Cleaning', details: '$25-35/hr • Flexible Schedule' },
                    { icon: 'utensils', title: 'Personal Chef', details: '$30-50/hr • Part-time' },
                    { icon: 'child', title: 'Childcare', details: '$20-30/hr • Full-time' }
                  ].map((job, index) => (
                    <div key={index} className="flex items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                      <div className="flex-shrink-0 bg-blue-100/50 rounded-lg p-3 mr-4">
                        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          {job.icon === 'home' && <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />}
                          {job.icon === 'utensils' && <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-1.5 0a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0zM9 5.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm0 4a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm1.5 2.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm4.5-4a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" clipRule="evenodd" />}
                          {job.icon === 'child' && <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />}
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{job.title}</div>
                        <div className="text-sm text-gray-600">{job.details}</div>
                      </div>
                    </div>
                  ))}
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