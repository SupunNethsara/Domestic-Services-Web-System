import { useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";

export default function WorkerRegister() {
  const navigate = useNavigate();
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password.trim() !== confirmPassword.trim()) {
      setError("Passwords do not match. Please check and try again.");
      return;
    }
    setLoading(true);
    try {
      await axios.post('http://127.0.0.1:8000/api/WorkerRegister', {
        fname, lname, mobile, email, password, password_confirmation: confirmPassword,
      });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const EyeIcon = ({ show, toggle }) => (
    <button type="button" onClick={toggle} className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600 transition-colors">
      {show ? (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )}
    </button>
  );

  return (
    <div className="min-h-screen flex bg-slate-950">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-2/5 relative flex-col justify-between p-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/50 via-slate-950 to-teal-900/30" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_80%_60%_at_10%_20%,rgba(16,185,129,0.2),transparent)] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-teal-900/20 rounded-full blur-3xl pointer-events-none" />

        <button onClick={() => navigate('/')} className="relative flex items-center gap-2.5 group w-fit">
          <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </div>
          <span className="text-white font-bold text-lg group-hover:text-emerald-300 transition-colors">HomeHero</span>
        </button>

        <div className="relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-emerald-300 text-xs font-medium">Professional Account</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
            Earn on your<br />
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">own schedule</span>
          </h2>
          <p className="text-slate-400 text-base mb-10 leading-relaxed">
            Join thousands of professionals already earning stable income through our trusted platform.
          </p>
          <div className="space-y-4">
            {[
              { icon: '💰', text: 'Competitive pay — set your own rates' },
              { icon: '📱', text: 'Manage jobs from your phone' },
              { icon: '🌟', text: 'Build your reputation with reviews' },
              { icon: '🔒', text: 'Guaranteed on-time payments' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-base">{item.icon}</span>
                <span className="text-slate-300 text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-slate-600 text-xs">© {new Date().getFullYear()} HomeHero. All rights reserved.</p>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-start justify-center p-6 lg:p-12 bg-white overflow-y-auto">
        <div className="w-full max-w-lg py-4">
          {/* Mobile logo */}
          <button onClick={() => navigate('/')} className="flex items-center gap-2 mb-6 lg:hidden">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </div>
            <span className="font-bold text-slate-900">HomeHero</span>
          </button>

          {/* Role switcher */}
          <div className="flex rounded-xl bg-slate-100 p-1 mb-6">
            <button
              onClick={() => navigate('/Client-Register')}
              className="flex-1 py-2 rounded-lg text-sm font-medium text-slate-500 hover:text-slate-700 transition-all"
            >
              🏠 Client
            </button>
            <button className="flex-1 py-2 rounded-lg bg-white shadow-sm text-sm font-semibold text-emerald-600 transition-all">
              💼 Professional
            </button>
          </div>

          <h1 className="text-2xl font-bold text-slate-900 mb-1">Create your account</h1>
          <p className="text-slate-500 text-sm mb-6">Fill in your details to start offering your services.</p>

          {error && (
            <div className="mb-5 flex items-start gap-3 px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm">
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">First name</label>
                <input
                  type="text" placeholder="John" value={fname}
                  onChange={(e) => setFname(e.target.value)} required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 transition-all placeholder-slate-400 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Last name</label>
                <input
                  type="text" placeholder="Snow" value={lname}
                  onChange={(e) => setLname(e.target.value)} required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 transition-all placeholder-slate-400 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone number</label>
              <input
                type="tel" placeholder="+94 77 123 4567" value={mobile}
                onChange={(e) => setMobile(e.target.value)} required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 transition-all placeholder-slate-400 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email address</label>
              <input
                type="email" placeholder="you@example.com" value={email}
                onChange={(e) => setEmail(e.target.value)} required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 transition-all placeholder-slate-400 text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'} placeholder="Min. 8 characters" value={password}
                    onChange={(e) => setPassword(e.target.value)} required
                    className="w-full px-4 py-3 pr-11 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 transition-all placeholder-slate-400 text-sm"
                  />
                  <EyeIcon show={showPassword} toggle={() => setShowPassword(!showPassword)} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirm password</label>
                <div className="relative">
                  <input
                    type={showConfirm ? 'text' : 'password'} placeholder="Repeat password" value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)} required
                    className="w-full px-4 py-3 pr-11 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 transition-all placeholder-slate-400 text-sm"
                  />
                  <EyeIcon show={showConfirm} toggle={() => setShowConfirm(!showConfirm)} />
                </div>
              </div>
            </div>

            <button
              type="submit" disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-200 hover:shadow-emerald-300 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Creating account…
                </>
              ) : 'Create Professional Account →'}
            </button>
          </form>

          <p className="mt-5 text-sm text-center text-slate-500">
            Already have an account?{' '}
            <button onClick={() => navigate('/login')} className="text-indigo-600 hover:text-indigo-500 font-semibold">
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}