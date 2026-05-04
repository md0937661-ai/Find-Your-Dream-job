import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import API from '../utils/axios';
import { USER_API } from '../utils/constants';
import { logout } from '../redux/authSlice';

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await API.get(`${USER_API}/logout`);
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  const isActive = (path) => location.pathname === path;

  const publicLinks = [
    { label: 'Home', path: '/' },
    { label: 'Jobs', path: '/jobs' },
    { label: 'Companies', path: '/companies' },
  ];

  const studentLinks = [
    ...publicLinks,
    { label: 'My Applications', path: '/my-applications' },
  ];

  const recruiterLinks = [
    { label: 'Dashboard', path: '/recruiter/dashboard' },
    { label: 'Post Job', path: '/recruiter/post-job' },
    { label: 'My Jobs', path: '/recruiter/jobs' },
    { label: 'Company', path: '/recruiter/company' },
  ];

  const navLinks = user?.role === 'recruiter' 
    ? recruiterLinks 
    : user?.role === 'student'
      ? studentLinks
      : publicLinks;

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'bg-background/90 backdrop-blur-2xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : 'bg-background/50 backdrop-blur-lg border-b border-white/5'}`}>
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0 group">
            <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-primary-500 via-indigo-500 to-purple-600 flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.4)] group-hover:shadow-[0_0_30px_rgba(139,92,246,0.8)] transition-all duration-500 group-hover:scale-105 group-hover:-rotate-3 overflow-hidden">
              <div className="absolute inset-0 bg-white/20 blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <svg className="w-5 h-5 text-white relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="font-black text-2xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-300 group-hover:from-primary-300 group-hover:to-purple-400 transition-all duration-500">
              HireHub
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-2 ml-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 rounded-full text-sm font-bold tracking-wide transition-all duration-300 overflow-hidden group
                  ${isActive(link.path)
                    ? 'text-white'
                    : 'text-zinc-400 hover:text-white'
                  }`}
              >
                {isActive(link.path) && (
                  <span className="absolute inset-0 bg-primary-500/20 rounded-full border border-primary-500/30 shadow-[0_0_15px_rgba(139,92,246,0.2)]" />
                )}
                {!isActive(link.path) && (
                  <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 rounded-full border border-white/10 scale-95 group-hover:scale-100 transition-all duration-300" />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4 ml-auto">

            {/* Role Badge */}
            {user && (
              <span className={`hidden lg:inline-flex items-center px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest shadow-sm
                ${user.role === 'recruiter'
                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.2)]'
                  : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                }`}>
                {user.role}
              </span>
            )}

            {/* If NOT logged in */}
            {!user && (
              <div className="hidden sm:flex items-center gap-4">
                <Link
                  to="/login"
                  className="relative text-zinc-300 hover:text-white text-sm font-bold px-5 py-2.5 rounded-full transition-all duration-300 group overflow-hidden"
                >
                  <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-300" />
                  <span className="relative z-10">Sign in</span>
                </Link>
                <Link
                  to="/register"
                  className="relative bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-500 hover:to-indigo-500 text-white text-sm font-bold px-7 py-2.5 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] hover:-translate-y-0.5 active:scale-95 group overflow-hidden"
                >
                  <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  <span className="relative z-10">Get started</span>
                </Link>
              </div>
            )}

            {/* Profile Dropdown */}
            {user && (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2.5 bg-surface hover:bg-white/5 border border-white/10 hover:border-primary-500/50 rounded-full pl-1.5 pr-3 py-1.5 transition-all duration-300 focus:ring-2 focus:ring-primary-500/50 group"
                >
                  {/* Avatar */}
                  {user.profile?.profilePhoto ? (
                    <img
                      src={user.profile.profilePhoto}
                      alt={user.fullname}
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-white/10 group-hover:ring-primary-400 transition-all duration-300 shadow-[0_0_0_rgba(139,92,246,0)] group-hover:shadow-[0_0_15px_rgba(139,92,246,0.6)]"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary-600 to-indigo-500 flex items-center justify-center text-white text-sm font-bold shadow-[0_0_10px_rgba(139,92,246,0.2)] group-hover:shadow-[0_0_15px_rgba(139,92,246,0.6)] ring-2 ring-transparent group-hover:ring-primary-400/50 transition-all duration-300">
                      {(user.fullname || 'U').charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="hidden sm:block text-zinc-300 group-hover:text-white text-[13px] font-bold max-w-[120px] truncate transition-colors duration-300">
                    {user.fullname}
                  </span>
                  <svg
                    className={`w-3.5 h-3.5 text-zinc-500 group-hover:text-primary-400 transition-all duration-300 ${profileOpen ? 'rotate-180 text-primary-400' : ''}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-64 glass-panel rounded-2xl shadow-2xl py-2 z-50 border border-white/10 origin-top-right animate-in fade-in zoom-in-95 duration-200">

                    {/* User Info */}
                    <div className="px-5 py-4 border-b border-white/5 bg-white/[0.02]">
                      <p className="text-white text-sm font-bold truncate">{user.fullname}</p>
                      <p className="text-zinc-500 text-xs font-medium truncate mt-1">{user.email}</p>
                    </div>

                    {/* Links */}
                    <div className="p-2 space-y-1">
                      {user.role === 'student' && (
                        <Link
                          to="/profile"
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-zinc-300 hover:text-white hover:bg-white/5 text-sm font-medium transition-all"
                        >
                          <svg className="w-4.5 h-4.5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          My Profile
                        </Link>
                      )}

                      <Link
                        to={user.role === 'recruiter' ? '/recruiter/dashboard' : '/my-applications'}
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-zinc-300 hover:text-white hover:bg-white/5 text-sm font-medium transition-all"
                      >
                        <svg className="w-4.5 h-4.5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        {user.role === 'recruiter' ? 'Dashboard' : 'My Applications'}
                      </Link>
                    </div>

                    <div className="p-2 border-t border-white/5">
                      <button
                        onClick={() => { setProfileOpen(false); handleLogout(); }}
                        className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 text-sm font-medium transition-all"
                      >
                        <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sign out
                      </button>
                    </div>

                  </div>
                )}
              </div>
            )}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-zinc-400 hover:text-white p-2 rounded-xl hover:bg-white/5 transition-all"
            >
              {menuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden glass-panel border-t border-white/5 px-4 py-4 space-y-2 absolute w-full">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`block px-5 py-3.5 rounded-2xl text-[15px] font-semibold transition-all
                ${isActive(link.path)
                  ? 'bg-primary-500/10 text-primary-400 border border-primary-500/20'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
            >
              {link.label}
            </Link>
          ))}
          
          {!user && (
            <div className="flex flex-col gap-3 pt-4 mt-4 border-t border-white/5">
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="text-center text-zinc-300 hover:text-white text-[15px] font-semibold py-3.5 rounded-2xl hover:bg-white/5 transition-all border border-transparent"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="text-center bg-primary-600 hover:bg-primary-500 text-white text-[15px] font-semibold py-3.5 rounded-2xl transition-all"
              >
                Get started
              </Link>
            </div>
          )}
        </div>
      )}

    </nav>
  );
}




