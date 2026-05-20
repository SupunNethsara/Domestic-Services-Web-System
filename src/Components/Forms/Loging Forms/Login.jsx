import { useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", { email, password });
      const { role, token, id } = response.data;
      if (!role || !token) throw new Error("Invalid response from server");
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("user_id", id);
      if (role === "client") navigate("/client-dashboard", { state: { shouldRefresh: true } });
      else if (role === "admin") navigate("/adminpanel", { state: { shouldRefresh: true } });
      else if (role === "worker") navigate("/worker-dashboard", { state: { shouldRefresh: true } });
      else navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-950">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-2/5 relative flex-col justify-between p-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/60 via-slate-950 to-violet-900/40" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_80%_60%_at_10%_20%,rgba(99,102,241,0.25),transparent)] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-violet-900/20 rounded-full blur-3xl pointer-events-none" />

        {/* Logo */}
        <button onClick={() => navigate('/')} className="relative flex items-center gap-2.5 group w-fit">
          <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </div>
          <span className="text-white font-bold text-lg group-hover:text-indigo-300 transition-colors">HomeHero</span>
        </button>

        {/* Center content */}
        <div className="relative">
          <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
            Welcome back to<br />
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">HomeHero</span>
          </h2>
          <p className="text-slate-400 text-base mb-10 leading-relaxed">
            Sign in to access your dashboard, manage jobs, and connect with professionals.
          </p>

          <div className="space-y-4">
            {[
              { icon: '🔒', text: 'Secure & encrypted login' },
              { icon: '⚡', text: 'Instant access to your dashboard' },
              { icon: '🌟', text: 'Trusted by thousands of users' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-lg">{item.icon}</span>
                <span className="text-slate-300 text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <p className="relative text-slate-600 text-xs">© {new Date().getFullYear()} HomeHero. All rights reserved.</p>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <button onClick={() => navigate('/')} className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </div>
            <span className="font-bold text-slate-900">HomeHero</span>
          </button>

          <h1 className="text-3xl font-bold text-slate-900 mb-1">Sign in</h1>
          <p className="text-slate-500 mb-8">Enter your credentials to access your account.</p>

          {/* Error banner */}
          {error && (
            <div className="mb-5 flex items-start gap-3 px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm">
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all placeholder-slate-400 text-sm"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-slate-700">Password</label>
                <button type="button" className="text-xs text-indigo-600 hover:text-indigo-500 font-medium">Forgot password?</button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-11 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all placeholder-slate-400 text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? (
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
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing in…
                </>
              ) : 'Sign In →'}
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-slate-500">
            Don't have an account?{' '}
            <button onClick={() => navigate('/Welcome')} className="text-indigo-600 hover:text-indigo-500 font-semibold">
              Create one
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}