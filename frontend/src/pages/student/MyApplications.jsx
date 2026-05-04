import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import API from '../../utils/axios';
import { APPLICATION_API } from '../../utils/constants';
import { setAppliedJobs } from '../../redux/applicationSlice';

const STATUS_STYLES = {
  pending:  'bg-amber-500/10 text-amber-400 border-amber-500/20',
  accepted: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  rejected: 'bg-red-500/10 text-red-400 border-red-500/20',
};

export default function MyApplications() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { appliedJobs } = useSelector((state) => state.application);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await API.get(`${APPLICATION_API}/get`);
        if (data.success) dispatch(setAppliedJobs(data.applications));
      } catch (err) { console.error(err); }
    };
    fetch();
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      <Navbar />

      {/* Abstract Background Blur */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary-900/10 blur-[150px] pointer-events-none" />

      <main className="flex-1 relative z-10 pt-28 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl font-black text-white mb-2 tracking-tight">My Applications</h1>
          <p className="text-zinc-400 font-medium">You have applied to <span className="text-white font-bold">{appliedJobs.length}</span> {appliedJobs.length === 1 ? 'job' : 'jobs'} so far.</p>
        </div>

        {appliedJobs.length === 0 ? (
          <div className="glass-panel border border-white/5 rounded-3xl p-20 text-center shadow-2xl">
            <div className="w-20 h-20 mx-auto mb-6 bg-surface rounded-full flex items-center justify-center border border-white/10 shadow-inner">
              <svg className="w-10 h-10 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-2xl font-black text-white mb-2">No applications yet</p>
            <p className="text-zinc-400 font-medium mb-8 max-w-md mx-auto">Your next opportunity is waiting! Browse jobs and start applying to find your dream role.</p>
            <button 
              onClick={() => navigate('/jobs')} 
              className="bg-primary-600 hover:bg-primary-500 text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] active:scale-95"
            >
              Browse Jobs
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {appliedJobs.map((app) => (
              <div key={app._id} className="glass-panel border border-white/5 rounded-3xl p-6 flex flex-col sm:flex-row sm:items-center gap-6 group hover:border-primary-500/30 transition-all shadow-xl">
                
                {app.job?.company?.logo ? (
                  <img src={app.job.company.logo} alt="" className="w-16 h-16 rounded-2xl object-cover flex-shrink-0 bg-white p-2 shadow-inner border border-white/10" />
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center text-zinc-400 font-bold text-2xl flex-shrink-0 border border-white/5 shadow-inner">
                    {app.job?.company?.name?.charAt(0) || 'C'}
                  </div>
                )}
                
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
                    <div>
                      <p className="text-xl font-black text-white truncate group-hover:text-primary-400 transition-colors mb-1">{app.job?.title}</p>
                      <p className="text-zinc-400 font-medium text-sm flex items-center gap-2">
                        <span className="text-white">{app.job?.company?.name}</span>
                        <span className="w-1 h-1 rounded-full bg-zinc-600" />
                        <svg className="w-3.5 h-3.5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {app.job?.location}
                      </p>
                    </div>
                    <span className={`flex-shrink-0 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg border ${STATUS_STYLES[app.status] || STATUS_STYLES.pending}`}>
                      {app.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/5">
                    <p className="text-zinc-500 text-xs font-semibold uppercase tracking-wider">
                      Applied: {new Date(app.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                    <button
                      onClick={() => navigate(`/jobs/${app.job?._id}`)}
                      className="text-primary-400 hover:text-white text-sm font-bold transition-colors flex items-center gap-1"
                    >
                      View Details
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}