import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../../components/Navbar';
import API from '../../utils/axios';
import { JOB_API, COMPANY_API } from '../../utils/constants';
import { setAdminJobs } from '../../redux/jobSlice';
import { setCompanies } from '../../redux/companySlice';

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { adminJobs } = useSelector((state) => state.job);
  const { companies } = useSelector((state) => state.company);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [jobsRes, compRes] = await Promise.all([
          API.get(`${JOB_API}/getadminjobs`),
          API.get(`${COMPANY_API}/get`),
        ]);
        if (jobsRes.data.success) dispatch(setAdminJobs(jobsRes.data.jobs));
        if (compRes.data.success) dispatch(setCompanies(compRes.data.companies));
      } catch { }
    };
    fetchAll();
  }, []);

  const totalApplicants = adminJobs.reduce((sum, j) => sum + (j.applications?.length || 0), 0);

  const stats = [
    { label: 'Jobs Posted', value: adminJobs.length, image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop', color: 'from-violet-500 to-primary-600' },
    { label: 'Companies', value: companies.length, image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop', color: 'from-blue-500 to-indigo-600' },
    { label: 'Total Applicants', value: totalApplicants, image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1000&auto=format&fit=crop', color: 'from-emerald-500 to-teal-600' },
  ];

  const quickLinks = [
    { label: 'Post New Job', desc: 'Create a new job listing to find talent', path: '/recruiter/post-job', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop' },
    { label: 'Manage Jobs', desc: 'View and manage all your posted jobs', path: '/recruiter/jobs', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop' },
    { label: 'Company Profile', desc: 'Register or update your company details', path: '/recruiter/company', image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1000&auto=format&fit=crop' },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      <Navbar />

      {/* Abstract Background Blur */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-900/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-900/10 blur-[150px] pointer-events-none" />

      <main className="flex-1 relative z-10 pt-28 pb-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

        {/* Welcome Section */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">
              Welcome back, <span className="text-gradient">{user?.fullname?.split(' ')[0]}</span> 👋
            </h1>
            <p className="text-zinc-400 font-medium">Here's an overview of your recruiting activity</p>
          </div>
          <button 
            onClick={() => navigate('/recruiter/post-job')}
            className="bg-primary-600 hover:bg-primary-500 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(139,92,246,0.3)] active:scale-95 whitespace-nowrap"
          >
            + Post New Job
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((s) => (
            <div key={s.label} className="glass-panel rounded-[2rem] p-8 relative overflow-hidden group shadow-2xl border border-white/10 hover:border-primary-500/40 transition-all duration-500">
              <img src={s.image} alt={s.label} className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-110 group-hover:opacity-40 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/30" />
              <div className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${s.color} opacity-80 z-10`} />
              
              <div className="relative z-10">
                <p className="text-5xl font-black text-white mb-2 tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">{s.value}</p>
                <p className="text-zinc-300 font-bold text-sm tracking-wide uppercase">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions & Recent Jobs Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Quick Links */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-xl font-black text-white mb-6">Quick Actions</h2>
            {quickLinks.map((q) => (
              <button
                key={q.path}
                onClick={() => navigate(q.path)}
                className="w-full relative overflow-hidden rounded-[2rem] p-6 text-left transition-all duration-500 group border border-white/10 hover:border-primary-500/50 shadow-xl hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(139,92,246,0.2)]"
              >
                <img src={q.image} className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-110 group-hover:opacity-50 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-transparent transition-colors duration-500" />
                
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-black text-white mb-1 group-hover:text-primary-400 transition-colors drop-shadow-md">{q.label}</h3>
                    <p className="text-zinc-400 text-sm font-medium max-w-[80%]">{q.desc}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 border border-white/20">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Recent Jobs */}
          <div className="lg:col-span-2">
            <div className="glass-panel border border-white/5 rounded-3xl p-6 h-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-black text-white">Recent Jobs</h2>
                <button 
                  onClick={() => navigate('/recruiter/jobs')}
                  className="text-primary-400 hover:text-white text-sm font-bold transition-colors"
                >
                  View All →
                </button>
              </div>

              {adminJobs.length === 0 ? (
                <div className="text-center py-16 px-4 bg-surface/30 rounded-2xl border border-white/5 border-dashed">
                  <div className="w-16 h-16 mx-auto mb-4 bg-surface rounded-full flex items-center justify-center border border-white/10 shadow-inner text-2xl">
                    📭
                  </div>
                  <p className="text-white font-bold mb-1">No jobs posted yet</p>
                  <p className="text-zinc-500 text-sm mb-6">Get started by creating your first job listing.</p>
                  <button onClick={() => navigate('/recruiter/post-job')} className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-2.5 rounded-xl transition-all text-sm">
                    Create a Job
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {adminJobs.slice(0, 5).map((job) => (
                    <div key={job._id} className="bg-surface/50 border border-white/5 hover:border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center gap-4 transition-colors">
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-bold truncate text-base mb-1">{job.title}</p>
                        <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-zinc-500">
                          <span className="flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                            </svg>
                            ₹{job.salary} LPA
                          </span>
                          <span className="flex items-center gap-1.5 text-primary-400 bg-primary-500/10 px-2.5 py-1 rounded-md">
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                            </svg>
                            {job.applications?.length || 0} Applicants
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2 sm:flex-shrink-0">
                        <button
                          onClick={() => navigate(`/recruiter/jobs/${job._id}/applicants`)}
                          className="flex-1 sm:flex-none text-center text-sm font-bold bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-xl transition-all"
                        >
                          View Applicants
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}