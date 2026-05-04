import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import API from '../utils/axios';
import { USER_API } from '../utils/constants';
import { setUser, setLoading } from '../redux/authSlice';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    email: '',
    password: '',
    role: 'student',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [isForgotPass, setIsForgotPass] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleForgotPassSubmit = (e) => {
    e.preventDefault();
    if (!form.email) {
      setError('Please enter your email address');
      return;
    }
    dispatch(setLoading(true));
    setTimeout(() => {
      setSuccess('If this email exists, a password reset link has been sent.');
      dispatch(setLoading(false));
    }, 1500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('Please fill in all fields');
      return;
    }
    try {
      dispatch(setLoading(true));
      const { data } = await API.post(`${USER_API}/login`, form);
      if (data.success) {
        dispatch(setUser(data.user));
        navigate(data.user.role === 'recruiter' ? '/recruiter/dashboard' : '/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-row-reverse">
      {/* Right Side: Brand/Illustration (Hidden on mobile) */}
      <div className="hidden lg:flex flex-1 relative bg-surface items-center justify-center overflow-hidden border-l border-white/5">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-screen scale-105 animate-pulse-slow" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        
        <div className="relative z-10 max-w-lg px-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center shadow-2xl shadow-primary-500/30 mx-auto mb-8 animate-float">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-4xl font-black text-white mb-6 leading-tight">
            Welcome back to <br />your professional network.
          </h1>
          <p className="text-zinc-400 text-lg font-medium leading-relaxed">
            Log in to continue exploring top-tier jobs and connecting with world-class companies.
          </p>
        </div>
      </div>

      {/* Left Side: Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12 lg:px-8 relative">
        {/* Background blobs for mobile */}
        <div className="absolute bottom-[-100px] left-[-80px] w-[420px] h-[420px] bg-primary-700/20 rounded-full blur-[130px] pointer-events-none lg:hidden" />
        
        <div className="w-full max-w-md relative z-10">
          <div className="text-center lg:text-left mb-10">
            <Link to="/" className="inline-flex items-center gap-2 lg:hidden mb-8">
              <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-white font-bold text-lg">HireHub</span>
            </Link>
            
            <h2 className="text-3xl font-black text-white mb-2 tracking-tight">
              {isForgotPass ? 'Reset Password' : 'Sign in to your account'}
            </h2>
            <p className="text-zinc-400 font-medium">
              {isForgotPass ? 'Enter your email to receive a reset link.' : 'Please enter your credentials below.'}
            </p>
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-white/5 shadow-2xl">
            {/* Role Toggle */}
            {!isForgotPass && (
              <div className="flex bg-background rounded-xl p-1 mb-6 border border-white/5">
                {['student', 'recruiter'].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setForm({ ...form, role: r })}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 capitalize
                      ${form.role === r
                        ? 'bg-primary-600 text-white shadow-lg shadow-primary-900/50'
                        : 'text-zinc-500 hover:text-white'
                      }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-semibold rounded-xl px-4 py-3 mb-6">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold rounded-xl px-4 py-3 mb-6">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {success}
              </div>
            )}

            <form onSubmit={isForgotPass ? handleForgotPassSubmit : handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-zinc-300 text-xs font-bold uppercase tracking-wider mb-2">Email address</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full bg-surface/50 border border-white/5 text-white placeholder-zinc-600 rounded-xl pl-12 pr-4 py-3.5 text-sm font-medium focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/50 transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              {!isForgotPass && (
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-zinc-300 text-xs font-bold uppercase tracking-wider">Password</label>
                    <button type="button" onClick={() => { setIsForgotPass(true); setError(''); setSuccess(''); }} className="text-primary-400 text-xs hover:text-white transition-colors font-semibold">
                      Forgot password?
                    </button>
                  </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>
                  <input
                    type={showPass ? 'text' : 'password'}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full bg-surface/50 border border-white/5 text-white placeholder-zinc-600 rounded-xl pl-12 pr-12 py-3.5 text-sm font-medium focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/50 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                  >
                    {showPass ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-600 hover:bg-primary-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all duration-200 text-sm shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] active:scale-95 mt-6"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    {isForgotPass ? 'Sending...' : 'Signing in...'}
                  </span>
                ) : (
                  isForgotPass ? 'Send Reset Link' : 'Sign in'
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-white/5" />
              <span className="text-zinc-600 text-xs font-bold uppercase tracking-wider">or new to hirehub?</span>
              <div className="flex-1 h-px bg-white/5" />
            </div>

            {/* Register Link */}
            <p className="text-center text-zinc-400 text-sm font-medium">
              {isForgotPass ? (
                <button type="button" onClick={() => { setIsForgotPass(false); setError(''); setSuccess(''); }} className="text-primary-400 hover:text-white transition-colors font-bold">
                  Back to login
                </button>
              ) : (
                <>
                  Don't have an account?{' '}
                  <Link to="/register" className="text-primary-400 hover:text-white transition-colors font-bold">
                    Create one free
                  </Link>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}