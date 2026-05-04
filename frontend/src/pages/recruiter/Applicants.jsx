import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../../components/Navbar';
import API from '../../utils/axios';
import { APPLICATION_API } from '../../utils/constants';
import { setApplicants } from '../../redux/applicationSlice';

export default function Applicants() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { applicants } = useSelector((state) => state.application);
  const [jobTitle, setJobTitle] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await API.get(`${APPLICATION_API}/${id}/applicants`);
        if (data.success) {
          dispatch(setApplicants(data.job.applications));
          setJobTitle(data.job.title);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  const handleStatus = async (appId, status) => {
    try {
      const { data } = await API.put(`${APPLICATION_API}/status/${appId}/update`, { status });
      if (data.success) {
        const updated = applicants.map((app) => 
          app._id === appId ? { ...app, status: status.toLowerCase() } : app
        );
        dispatch(setApplicants(updated));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      <Navbar />

      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-900/10 blur-[150px] pointer-events-none" />

      <main className="flex-1 relative z-10 pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-10">
          <button
            onClick={() => navigate(-1)}
            className="group p-3 bg-surface border border-white/5 hover:bg-white/5 rounded-xl text-zinc-400 hover:text-white transition-all w-fit"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-3xl font-black text-white mb-1 tracking-tight">Applicants for <span className="text-gradient">{jobTitle || 'Job'}</span></h1>
            <p className="text-zinc-400 font-medium">Reviewing {applicants?.length || 0} total applications</p>
          </div>
        </div>

        {loading ? (
          <div className="glass-panel border border-white/5 rounded-3xl p-6 space-y-4 animate-pulse">
             {[...Array(5)].map((_, i) => (
                <div key={i} className="bg-white/5 rounded-xl h-16 w-full" />
             ))}
          </div>
        ) : applicants?.length === 0 ? (
          <div className="glass-panel border border-white/5 rounded-3xl p-20 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-surface rounded-full flex items-center justify-center border border-white/10 shadow-inner">
              <svg className="w-10 h-10 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <p className="text-2xl font-black text-white mb-2">No applicants yet</p>
            <p className="text-zinc-400 font-medium">Wait for candidates to discover and apply to your job.</p>
          </div>
        ) : (
          <div className="glass-panel border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left whitespace-nowrap">
                <thead className="bg-surface/50 text-zinc-400 text-xs font-bold uppercase tracking-wider border-b border-white/5">
                  <tr>
                    <th className="px-8 py-5">Candidate</th>
                    <th className="px-8 py-5">Contact Info</th>
                    <th className="px-8 py-5">Resume</th>
                    <th className="px-8 py-5">Applied Date</th>
                    <th className="px-8 py-5 text-right">Status / Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {applicants.map((item) => (
                    <tr key={item._id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary-600/20 text-primary-400 flex items-center justify-center font-bold text-lg">
                            {item.applicant?.fullname?.charAt(0) || 'U'}
                          </div>
                          <p className="text-white font-bold">{item.applicant?.fullname || 'N/A'}</p>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex flex-col gap-1">
                          <p className="text-zinc-300 text-sm font-medium flex items-center gap-2">
                            <svg className="w-3.5 h-3.5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            {item.applicant?.email || 'N/A'}
                          </p>
                          <p className="text-zinc-400 text-xs flex items-center gap-2">
                            <svg className="w-3.5 h-3.5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            {item.applicant?.phoneNumber || 'N/A'}
                          </p>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        {item.applicant?.profile?.resume ? (
                          <a
                            href={item.applicant?.profile?.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 px-3 py-1.5 rounded-lg text-sm font-bold transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            View PDF
                          </a>
                        ) : (
                          <span className="text-zinc-600 text-sm font-medium italic">Not provided</span>
                        )}
                      </td>
                      <td className="px-8 py-5">
                        <p className="text-zinc-400 text-sm font-medium">
                          {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-lg border ${
                            item.status === 'accepted' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                            item.status === 'rejected' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                            'bg-amber-500/10 text-amber-400 border-amber-500/20'
                          }`}>
                            {item.status}
                          </span>

                          <select
                            value={item.status}
                            onChange={(e) => handleStatus(item._id, e.target.value)}
                            className="bg-surface border border-white/10 text-white text-sm font-medium rounded-lg px-3 py-1.5 focus:outline-none focus:border-primary-500 cursor-pointer appearance-none pr-8 relative"
                            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23a1a1aa'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1em 1em' }}
                          >
                            <option value="pending" className="bg-surface">Pending</option>
                            <option value="accepted" className="bg-surface">Accept</option>
                            <option value="rejected" className="bg-surface">Reject</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
