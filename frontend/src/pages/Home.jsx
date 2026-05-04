import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import useGetAllJobs from '../hooks/useGetAllJobs';
import JobCard from '../components/JobCard';

export default function Home() {
  useGetAllJobs();
  const navigate = useNavigate();
  const { allJobs } = useSelector((state) => state.job);
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/jobs?keyword=${search}`);
  };

  const stats = [
    { label: 'Active Jobs', value: '10,000+' },
    { label: 'Top Companies', value: '500+' },
    { label: 'Candidates', value: '50,000+' },
    { label: 'Hired Today', value: '120+' },
  ];

  const categories = [
    { label: 'Technology', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop', count: '4.2k' },
    { label: 'Design', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop', count: '1.8k' },
    { label: 'Marketing', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop', count: '2.4k' },
    { label: 'Finance', image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1000&auto=format&fit=crop', count: '1.2k' },
    { label: 'Healthcare', image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1000&auto=format&fit=crop', count: '850' },
    { label: 'Education', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1000&auto=format&fit=crop', count: '640' },
    { label: 'Writing', image: 'https://images.unsplash.com/photo-1455390582262-044cdead27d8?q=80&w=1000&auto=format&fit=crop', count: '1.5k' },
    { label: 'Engineering', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1000&auto=format&fit=crop', count: '3.1k' },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 inset-x-0 h-[800px] overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[1000px] h-[800px] bg-primary-600/20 rounded-[100%] blur-[120px] mix-blend-screen animate-pulse-slow" />
        <div className="absolute top-40 -left-64 w-[600px] h-[600px] bg-indigo-600/10 rounded-[100%] blur-[100px] mix-blend-screen" />
        <div className="absolute top-80 -right-64 w-[500px] h-[500px] bg-primary-900/20 rounded-[100%] blur-[100px] mix-blend-screen" />
      </div>

      <Navbar />

      <main className="flex-1 relative z-10 pt-20">
        {/* Hero Section */}
        <section className="relative pt-24 pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left z-10">
              <div className="inline-flex items-center gap-2.5 bg-primary-500/10 border border-primary-500/20 px-5 py-2 rounded-full mb-8 shadow-[0_0_20px_rgba(139,92,246,0.15)]">
                <span className="w-2.5 h-2.5 bg-primary-400 rounded-full animate-ping" />
                <span className="text-primary-400 text-xs font-bold tracking-wider uppercase">
                  #1 Tech Job Platform
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-8 tracking-tight">
                Accelerate Your <br className="hidden sm:block" />
                <span className="text-gradient">Career Growth</span>
              </h1>

              <p className="text-zinc-400 text-lg sm:text-xl mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Join thousands of professionals finding their dream roles. Connect with leading tech companies and startups worldwide.
              </p>

              {/* Search Bar */}
              <form onSubmit={handleSearch} className="glass-panel p-2.5 rounded-2xl max-w-2xl mx-auto lg:mx-0 flex flex-col sm:flex-row items-center gap-3">
                <div className="flex items-center gap-3 flex-1 w-full px-4 py-2">
                  <svg className="w-6 h-6 text-primary-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by role, skill, or company..."
                    className="w-full bg-transparent text-white placeholder-zinc-500 text-[15px] font-medium focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-primary-600 hover:bg-primary-500 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] active:scale-95"
                >
                  Find Jobs
                </button>
              </form>

              {/* Removed Trusted By to place below hero */}
            </div>

            {/* Right Image */}
            <div className="flex-1 relative w-full max-w-lg lg:max-w-none hidden md:block">
              <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl shadow-primary-900/50 animate-float">
                {/* Fallback image if unsplash blocked, using a beautiful tech fluid abstract */}
                <img 
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" 
                  alt="Abstract 3D Background"
                  className="w-full h-full object-cover scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
                
                {/* Floating Cards overlay */}
                <div className="absolute -bottom-6 -left-6 glass-panel rounded-2xl p-5 w-64 animate-float" style={{ animationDelay: '1s' }}>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">Offer Accepted!</p>
                      <p className="text-zinc-400 text-xs">Senior Frontend Eng.</p>
                    </div>
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-full" />
                  </div>
                </div>

                <div className="absolute top-12 -right-8 glass-panel rounded-2xl p-4 animate-float" style={{ animationDelay: '2.5s' }}>
                  <p className="text-zinc-400 text-xs font-semibold mb-1">New Match</p>
                  <p className="text-white font-bold text-lg">Netflix</p>
                  <p className="text-primary-400 text-sm">React Developer</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Trusted By Full Width */}
        <section className="bg-gradient-to-b from-background to-primary-900/10 py-16 overflow-hidden relative">
          <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          
          <h3 className="text-zinc-400 text-xl sm:text-2xl font-black tracking-widest uppercase mb-12 text-center w-full transition-all duration-500 hover:text-primary-400 hover:tracking-[0.15em] cursor-default drop-shadow-sm">Trusted by top industry leaders worldwide</h3>
          
          <div className="flex items-center justify-center flex-wrap gap-8 sm:gap-16 max-w-7xl mx-auto px-4">
            {/* Google */}
            <div className="group flex items-center gap-2.5 text-zinc-400 transition-all duration-300 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 cursor-default">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-white drop-shadow-md">Google</span>
            </div>
            
            {/* Microsoft */}
            <div className="group flex items-center gap-2.5 text-zinc-400 transition-all duration-300 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 cursor-default">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z" fill="#00a4ef"/>
              </svg>
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-white drop-shadow-md">Microsoft</span>
            </div>

            {/* Amazon */}
            <div className="group flex items-center gap-2.5 transition-all duration-300 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 cursor-default pt-2">
              <span className="text-2xl sm:text-3xl font-black tracking-tighter text-white transition-transform duration-300 group-hover:scale-105 drop-shadow-md" style={{ fontFamily: 'Arial, sans-serif' }}>
                amazon<span className="text-[#FF9900]">.</span>
              </span>
            </div>

            {/* Netflix */}
            <div className="group flex items-center gap-2.5 transition-all duration-300 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 cursor-default">
              <span className="text-2xl sm:text-3xl font-black tracking-tighter text-[#E50914] uppercase transition-transform duration-300 group-hover:scale-105 drop-shadow-md" style={{ fontFamily: '"Arial Black", sans-serif' }}>
                Netflix
              </span>
            </div>
            
            {/* Apple */}
            <div className="group flex items-center gap-2.5 text-zinc-400 transition-all duration-300 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 cursor-default">
              <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white transition-transform duration-300 group-hover:scale-110 drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.62-1.496 3.6-2.947 1.13-1.638 1.595-3.235 1.615-3.32-.03-.014-3.116-1.196-3.149-4.786-.027-3.003 2.45-4.444 2.56-4.507-1.403-2.05-3.567-2.33-4.32-2.38-2.023-.166-4.103 1.258-5.114 1.258zm-1.127-3.315c.844-1.026 1.411-2.451 1.257-3.876-1.215.05-2.709.813-3.566 1.825-.765.892-1.442 2.348-1.258 3.743 1.365.105 2.716-.68 3.567-1.692z"/>
              </svg>
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-white drop-shadow-md">Apple</span>
            </div>

            {/* Meta */}
            <div className="group flex items-center gap-2.5 text-zinc-400 transition-all duration-300 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 cursor-default">
              <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#0668E1] transition-transform duration-300 group-hover:scale-110 drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12zm0-2.4c-5.302 0-9.6-4.298-9.6-9.6S6.698 2.4 12 2.4s9.6 4.298 9.6-9.6-4.298 9.6-9.6 9.6zm3.334-6.42a4.417 4.417 0 100-8.834 4.417 4.417 0 000 8.834zm-6.668 0a4.417 4.417 0 100-8.834 4.417 4.417 0 000 8.834z"/>
              </svg>
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-white drop-shadow-md">Meta</span>
            </div>

            {/* Spotify */}
            <div className="group flex items-center gap-2.5 text-zinc-400 transition-all duration-300 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 cursor-default">
              <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#1DB954] transition-transform duration-300 group-hover:scale-110 drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.899 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.659.24.96v.059zm1.44-3.84c-.3.48-.84.6-1.32.3-3.239-1.98-8.159-2.58-11.939-1.38-.48.12-1.02-.12-1.14-.6-.12-.48.12-1.02.6-1.14C9.6 9.36 15 10.02 18.6 12.18c.48.3.6.9.3 1.32zm.12-4.08C15.36 7.2 8.88 7.02 5.16 8.16c-.6.18-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.2-1.26 11.28-1.02 15.6 1.56.54.3.72 1.02.42 1.56-.3.54-1.02.72-1.56.42z"/>
              </svg>
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-white drop-shadow-md">Spotify</span>
            </div>
          </div>
        </section>


        {/* Stats Section */}
        <section className="relative w-full bg-gradient-to-b from-primary-900/10 to-zinc-900/40 py-24">
          {/* Animated Glow in Stats */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-primary-600/10 blur-[120px] rounded-full" />
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((s, i) => (
                <div 
                  key={s.label} 
                  className="glass-panel border border-primary-500/20 rounded-3xl p-8 text-center group hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(139,92,246,0.3)] hover:border-primary-400 transition-all duration-500 bg-surface/40 hover:bg-surface/80 relative overflow-hidden backdrop-blur-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-primary-500/0 group-hover:from-primary-500/10 group-hover:to-indigo-500/10 transition-all duration-500" />
                  <p className="text-4xl lg:text-5xl font-black text-white mb-3 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary-300 group-hover:to-indigo-300 transition-all duration-300 relative z-10 drop-shadow-md">
                    {s.value}
                  </p>
                  <p className="text-zinc-400 text-sm font-bold uppercase tracking-wider group-hover:text-white transition-colors relative z-10">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="relative w-full bg-gradient-to-b from-zinc-900/40 to-background py-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">Explore Categories</h2>
              <p className="text-zinc-400 text-lg font-medium">Find opportunities spanning across various exciting industries.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {categories.map((c) => (
              <button
                key={c.label}
                onClick={() => navigate(`/jobs?keyword=${c.label}`)}
                className="group relative overflow-hidden rounded-[2rem] h-72 text-left shadow-2xl shadow-black/50 border border-white/10 hover:border-primary-500/60 hover:-translate-y-3 hover:shadow-[0_20px_50px_-15px_rgba(139,92,246,0.4)] transition-all duration-500"
              >
                {/* Background Image */}
                <img 
                  src={c.image} 
                  alt={c.label} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent opacity-90 transition-all duration-500 group-hover:opacity-100 group-hover:from-background" />
                <div className="absolute inset-0 bg-primary-600/30 opacity-0 group-hover:opacity-100 transition-all duration-500 mix-blend-overlay" />

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <span className="text-white font-black text-3xl tracking-tight block mb-3 group-hover:-translate-y-3 transition-transform duration-500 drop-shadow-md">
                    {c.label}
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="bg-white/10 backdrop-blur-md text-zinc-300 text-sm font-bold px-4 py-2 rounded-xl border border-white/10 group-hover:border-primary-400/60 group-hover:text-white group-hover:bg-primary-600/40 transition-colors duration-300 shadow-lg group-hover:-translate-y-3">
                      {c.count} open jobs
                    </span>
                    <span className="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center opacity-0 -translate-x-8 group-hover:opacity-100 group-hover:translate-x-0 group-hover:-translate-y-3 transition-all duration-500 shadow-[0_0_20px_rgba(139,92,246,0.8)]">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </button>
            ))}
            </div>
          </div>
        </section>

        {/* Latest Jobs */}
        <section className="max-w-7xl mx-auto px-4 pb-32">
          <div className="text-center max-w-2xl mx-auto mb-16 relative flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">Featured Opportunities</h2>
            <p className="text-zinc-400 text-lg font-medium mb-8">Hand-picked roles from top companies looking for talent like you.</p>
            <button
              onClick={() => navigate('/jobs')}
              className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 font-bold transition-all duration-300 bg-primary-500/10 px-6 py-2.5 rounded-full border border-primary-500/20 hover:bg-primary-500/20 hover:border-primary-500/30 group hover:shadow-[0_0_15px_rgba(139,92,246,0.2)]"
            >
              View all jobs
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>

          {allJobs.length === 0 ? (
            <div className="glass-panel rounded-3xl text-center py-24">
              <svg className="w-16 h-16 mx-auto mb-6 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <p className="text-xl font-bold text-white mb-2">No jobs available right now</p>
              <p className="text-zinc-500 font-medium">Check back later or adjust your search.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allJobs.slice(0, 6).map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          )}
          
          <button
            onClick={() => navigate('/jobs')}
            className="sm:hidden w-full mt-8 bg-surface border border-white/10 hover:bg-white/5 text-white font-bold px-6 py-4 rounded-xl transition-all"
          >
            Explore all jobs
          </button>
        </section>
      </main>

      <Footer />
    </div>
  );
}