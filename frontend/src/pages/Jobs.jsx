import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import JobCard from '../components/JobCard';
import API from '../utils/axios';
import { JOB_API } from '../utils/constants';
import { setAllJobs } from '../redux/jobSlice';

const JOB_TYPES = ['Full-time', 'Part-time', 'Remote', 'Internship', 'Contract'];

export default function Jobs() {
  const dispatch = useDispatch();
  const { allJobs } = useSelector((state) => state.job);
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('keyword') || '');
  const [selectedType, setSelectedType] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const { data } = await API.get(`${JOB_API}/get?keyword=${search}`);
        if (data.success) dispatch(setAllJobs(data.jobs));
      } catch {
        dispatch(setAllJobs([]));
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [search]);

  const filtered = selectedType
    ? allJobs.filter((j) => j.jobType?.toLowerCase() === selectedType.toLowerCase())
    : allJobs;

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      <Navbar />
      
      {/* Abstract Background Blur */}
      <div className="absolute top-20 left-0 w-full h-[400px] bg-primary-900/10 blur-[120px] pointer-events-none" />

      <main className="flex-1 relative z-10 pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Filters */}
        <aside className="w-full md:w-72 flex-shrink-0">
          <div className="glass-panel p-6 rounded-3xl sticky top-28 border border-white/5 shadow-2xl">
            <h1 className="text-xl font-black text-white mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              Filter Jobs
            </h1>

            <div className="space-y-6">
              {/* Keyword Search */}
              <div>
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 block">Search</label>
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Role, skills..."
                    className="w-full bg-surface/50 border border-white/10 rounded-xl pl-9 pr-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/50 transition-all"
                  />
                </div>
              </div>

              {/* Job Type Filter */}
              <div>
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3 block">Job Type</label>
                <div className="flex flex-col gap-2.5">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="jobType"
                      checked={selectedType === ''}
                      onChange={() => setSelectedType('')}
                      className="w-4 h-4 text-primary-600 bg-surface border-white/20 focus:ring-primary-600 focus:ring-offset-background"
                    />
                    <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">All Types</span>
                  </label>
                  {JOB_TYPES.map((t) => (
                    <label key={t} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="jobType"
                        checked={selectedType === t}
                        onChange={() => setSelectedType(t)}
                        className="w-4 h-4 text-primary-600 bg-surface border-white/20 focus:ring-primary-600 focus:ring-offset-background"
                      />
                      <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">{t}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear Filter */}
              <button
                onClick={() => { setSearch(''); setSelectedType(''); }}
                className="w-full bg-white/5 hover:bg-white/10 text-white font-bold py-3 rounded-xl transition-all border border-white/5 text-sm active:scale-95"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-2 tracking-tight">
              Explore <span className="text-gradient">Opportunities</span>
            </h2>
            <p className="text-zinc-400 font-medium text-sm">
              Showing {filtered.length} {filtered.length === 1 ? 'result' : 'results'} based on your criteria.
            </p>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="glass-card rounded-2xl p-6 h-64 animate-pulse">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-white/5 rounded-xl" />
                    <div className="flex-1 space-y-2">
                      <div className="h-5 bg-white/5 rounded w-1/2" />
                      <div className="h-4 bg-white/5 rounded w-1/3" />
                    </div>
                  </div>
                  <div className="space-y-3 mb-6">
                    <div className="h-4 bg-white/5 rounded w-full" />
                    <div className="h-4 bg-white/5 rounded w-5/6" />
                  </div>
                  <div className="flex gap-2 mt-auto">
                    <div className="h-6 bg-white/5 rounded-full w-20" />
                    <div className="h-6 bg-white/5 rounded-full w-20" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="glass-panel rounded-3xl p-16 text-center mt-10 border border-white/5 shadow-2xl">
              <div className="w-24 h-24 mx-auto mb-6 bg-surface rounded-full flex items-center justify-center border border-white/10 shadow-inner">
                <svg className="w-10 h-10 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-white mb-2">No jobs matched</h3>
              <p className="text-zinc-400 font-medium max-w-md mx-auto">Try tweaking your search terms or clearing filters to find what you're looking for.</p>
              <button 
                onClick={() => { setSearch(''); setSelectedType(''); }}
                className="mt-8 bg-primary-600 hover:bg-primary-500 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(139,92,246,0.3)] active:scale-95"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
              {filtered.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
