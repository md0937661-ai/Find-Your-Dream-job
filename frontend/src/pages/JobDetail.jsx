import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import API from '../utils/axios';
import { JOB_API, APPLICATION_API } from '../utils/constants';
import { setSingleJob } from '../redux/jobSlice';

export default function JobDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { singleJob } = useSelector((state) => state.job);
  const { user } = useSelector((state) => state.auth);
  const { appliedJobs } = useSelector((state) => state.application);

  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [msg, setMsg] = useState('');

  const alreadyApplied = appliedJobs?.some((a) => a.job?._id === id);

  const timeAgo = (date) => {
    if (!date) return '';
    const diff = Date.now() - new Date(date);
    const days = Math.floor(diff / 86400000);
    if (days === 0) return 'Posted today';
    if (days === 1) return 'Posted yesterday';
    return `Posted ${days} days ago`;
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await API.get(`${JOB_API}/get/${id}`);
        if (data.success) dispatch(setSingleJob(data.job));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  const handleApply = async () => {
    if (!user) { navigate('/login'); return; }
    try {
      setApplying(true);
      const { data } = await API.post(`${APPLICATION_API}/apply/${id}`);
      if (data.success) setMsg('✅ Applied successfully!');
    } catch (err) {
      setMsg(err.response?.data?.message || 'Failed to apply');
    } finally {
      setApplying(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 pt-32 pb-20 w-full animate-pulse">
        <div className="h-8 bg-white/5 rounded w-32 mb-8" />
        <div className="glass-panel p-8 rounded-3xl mb-8 h-48" />
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="glass-panel p-8 rounded-3xl h-64" />
          </div>
          <div className="glass-panel p-6 rounded-3xl h-80" />
        </div>
      </div>
    </div>
  );

  if (!singleJob) return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center text-center py-20 px-4">
        <div>
          <div className="w-24 h-24 mx-auto mb-6 bg-surface rounded-full flex items-center justify-center border border-white/10 shadow-inner">
            <svg className="w-10 h-10 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-black text-white mb-2">Job not found</h2>
          <p className="text-zinc-400 font-medium mb-8">This job posting might have been removed or doesn't exist.</p>
          <button onClick={() => navigate('/jobs')} className="bg-white/10 hover:bg-white/20 text-white px-6 py-2.5 rounded-xl transition-colors font-medium">
            Browse other jobs
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      <Navbar />

      {/* Abstract Background Blur */}
      <div className="absolute top-0 right-0 w-full h-[500px] bg-primary-900/10 blur-[150px] pointer-events-none" />

      <main className="flex-1 relative z-10 pt-28 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 text-zinc-400 hover:text-white text-sm font-semibold mb-8 transition-colors w-fit"
        >
          <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-primary-600 flex items-center justify-center transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </div>
          Back to Jobs
        </button>

        {/* Header Card */}
        <div className="glass-panel rounded-3xl p-8 mb-8 border border-white/5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-primary-500 via-indigo-500 to-primary-500" />
          
          <div className="flex flex-col md:flex-row gap-6 md:items-start justify-between">
            <div className="flex items-start gap-6">
              {singleJob.company?.logo ? (
                <img 
                  src={singleJob.company.logo} 
                  alt={singleJob.company.name} 
                  className="w-20 h-20 rounded-2xl object-contain bg-white p-3 shadow-inner flex-shrink-0" 
                />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center shadow-inner border border-white/5 flex-shrink-0">
                  <span className="text-3xl font-black text-zinc-400">
                    {singleJob.company?.name?.charAt(0) || 'C'}
                  </span>
                </div>
              )}
              
              <div>
                <h1 className="text-3xl font-black text-white mb-2 tracking-tight">{singleJob.title}</h1>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                  <span className="font-bold text-primary-400 text-base">{singleJob.company?.name}</span>
                  <span className="flex items-center gap-1.5 text-zinc-400 font-medium">
                    <svg className="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {singleJob.location || singleJob.company?.location}
                  </span>
                  <span className="flex items-center gap-1.5 text-zinc-400 font-medium">
                    <svg className="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {timeAgo(singleJob.createdAt)}
                  </span>
                </div>
              </div>
            </div>

            {/* Apply Button (Desktop Top Right) */}
            <div className="hidden md:block text-right">
              {user?.role === 'student' && (
                <>
                  <button
                    onClick={handleApply}
                    disabled={applying || alreadyApplied}
                    className={`px-8 py-3.5 rounded-xl font-bold text-sm transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] active:scale-95 whitespace-nowrap
                      ${alreadyApplied
                        ? 'bg-surface border border-white/10 text-zinc-400 cursor-not-allowed shadow-none'
                        : 'bg-primary-600 hover:bg-primary-500 text-white'
                      }`}
                  >
                    {applying ? 'Applying...' : alreadyApplied ? 'Application Submitted' : 'Apply for this Job'}
                  </button>
                  {msg && (
                    <p className={`text-xs mt-3 font-semibold ${msg.startsWith('✅') ? 'text-emerald-400' : 'text-red-400'}`}>{msg}</p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Description */}
            <div className="glass-panel border border-white/5 rounded-3xl p-8">
              <h2 className="text-xl font-black text-white mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                About the Role
              </h2>
              <div className="prose prose-invert prose-p:text-zinc-400 prose-p:leading-relaxed prose-p:text-[15px] max-w-none whitespace-pre-wrap">
                {singleJob.description}
              </div>
            </div>

            {/* Requirements */}
            {singleJob.requirements && singleJob.requirements.length > 0 && (
              <div className="glass-panel border border-white/5 rounded-3xl p-8">
                <h2 className="text-xl font-black text-white mb-6 flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Requirements & Skills
                </h2>
                <div className="flex flex-wrap gap-2.5">
                  {singleJob.requirements.map((r, i) => (
                    <span key={i} className="bg-surface/50 border border-white/10 text-zinc-300 font-medium text-sm px-4 py-2 rounded-xl">
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="glass-panel border border-white/5 rounded-3xl p-6 sticky top-28">
              <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-6">Job Overview</h3>
              
              <div className="space-y-6">
                <div>
                  <p className="text-zinc-500 text-xs font-bold uppercase tracking-wide mb-1">Job Type</p>
                  <p className="text-white font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary-500" />
                    {singleJob.jobType || 'Full-time'}
                  </p>
                </div>
                
                <div>
                  <p className="text-zinc-500 text-xs font-bold uppercase tracking-wide mb-1">Salary</p>
                  <p className="text-emerald-400 font-bold flex items-center gap-2 text-lg">
                    ₹{singleJob.salary} LPA
                  </p>
                </div>
                
                <div>
                  <p className="text-zinc-500 text-xs font-bold uppercase tracking-wide mb-1">Open Positions</p>
                  <p className="text-white font-medium flex items-center gap-2">
                    {singleJob.position} Roles
                  </p>
                </div>

                <div>
                  <p className="text-zinc-500 text-xs font-bold uppercase tracking-wide mb-1">Location</p>
                  <p className="text-white font-medium flex items-center gap-2">
                    {singleJob.location || 'Remote / Office'}
                  </p>
                </div>
              </div>

              {/* Apply Button (Mobile / Sidebar Bottom) */}
              {user?.role === 'student' && (
                <div className="mt-8 pt-8 border-t border-white/5 md:hidden">
                  <button
                    onClick={handleApply}
                    disabled={applying || alreadyApplied}
                    className={`w-full px-8 py-3.5 rounded-xl font-bold text-sm transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] active:scale-95
                      ${alreadyApplied
                        ? 'bg-surface border border-white/10 text-zinc-400 cursor-not-allowed shadow-none'
                        : 'bg-primary-600 hover:bg-primary-500 text-white'
                      }`}
                  >
                    {applying ? 'Applying...' : alreadyApplied ? 'Application Submitted' : 'Apply for this Job'}
                  </button>
                  {msg && (
                    <p className={`text-xs mt-3 font-semibold text-center ${msg.startsWith('✅') ? 'text-emerald-400' : 'text-red-400'}`}>{msg}</p>
                  )}
                </div>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}