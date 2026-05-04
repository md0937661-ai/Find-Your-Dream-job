import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import API from '../../utils/axios';
import { JOB_API } from '../../utils/constants';
import { setAdminJobs } from '../../redux/jobSlice';

export default function ManageJobs() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { adminJobs } = useSelector((state) => state.job);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await API.get(`${JOB_API}/getadminjobs`);
        if (data.success) dispatch(setAdminJobs(data.jobs));
      } catch { dispatch(setAdminJobs([])); }
    };
    fetch();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job listing? This action cannot be undone.')) return;
    try {
      await API.delete(`${JOB_API}/delete/${id}`);
      dispatch(setAdminJobs(adminJobs.filter(j => j._id !== id)));
    } catch (err) { console.error(err); }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      <Navbar />

      {/* Abstract Background Blur */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-900/10 blur-[150px] pointer-events-none" />

      <main className="flex-1 relative z-10 pt-28 pb-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Manage Jobs</h1>
            <p className="text-zinc-400 font-medium">You have posted {adminJobs.length} {adminJobs.length === 1 ? 'job' : 'jobs'} in total.</p>
          </div>
          <button
            onClick={() => navigate('/recruiter/post-job')}
            className="bg-primary-600 hover:bg-primary-500 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(139,92,246,0.3)] active:scale-95 whitespace-nowrap"
          >
            + Post New Job
          </button>
        </div>

        {adminJobs.length === 0 ? (
          <div className="glass-panel border border-white/5 rounded-3xl p-20 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-surface rounded-full flex items-center justify-center border border-white/10 shadow-inner">
              <svg className="w-10 h-10 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-2xl font-black text-white mb-2">No jobs posted yet</p>
            <p className="text-zinc-400 font-medium mb-8">Create your first job listing to start receiving applications.</p>
            <button onClick={() => navigate('/recruiter/post-job')} className="bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-3.5 rounded-xl transition-all">
              Post your first job
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {adminJobs.map((job) => (
              <div key={job._id} className="glass-panel border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row md:items-center gap-6 group hover:border-primary-500/30 transition-all">
                
                {/* Job Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h2 className="text-xl font-black text-white truncate">{job.title}</h2>
                    <span className="bg-primary-500/10 text-primary-400 border border-primary-500/20 text-xs font-bold tracking-wide px-3 py-1 rounded-full flex-shrink-0">
                      {job.jobType}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-zinc-400 mb-3">
                    <span className="flex items-center gap-1.5 text-zinc-300">
                      <svg className="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      {job.company?.name}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1.5 text-emerald-400">
                      ₹{job.salary} LPA
                    </span>
                  </div>
                  
                  <p className="text-zinc-500 text-xs font-semibold uppercase tracking-wider flex items-center gap-3">
                    <span className="text-primary-400 bg-primary-500/10 px-2 py-1 rounded-md">
                      {job.applications?.length || 0} applicants
                    </span>
                    <span>Posted {new Date(job.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </p>
                </div>
                
                {/* Actions */}
                <div className="flex items-center gap-3 md:flex-shrink-0 pt-4 md:pt-0 border-t md:border-none border-white/5">
                  <button
                    onClick={() => navigate(`/recruiter/jobs/${job._id}/applicants`)}
                    className="flex-1 md:flex-none text-center bg-surface hover:bg-white/10 border border-white/10 text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-all"
                  >
                    View Applicants
                  </button>
                  <button
                    onClick={() => handleDelete(job._id)}
                    className="p-2.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 rounded-xl transition-all group-hover:opacity-100 md:opacity-0 focus:opacity-100"
                    title="Delete Job"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}