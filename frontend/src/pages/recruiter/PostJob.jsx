import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../../components/Navbar';
import API from '../../utils/axios';
import { JOB_API, COMPANY_API } from '../../utils/constants';

const JOB_TYPES = ['Full-time', 'Part-time', 'Remote', 'Internship', 'Contract', 'Freelance'];

export default function PostJob() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ text: '', type: '' });

  const [form, setForm] = useState({
    title: '', description: '', requirements: '',
    salary: '', location: '', jobType: 'Full-time',
    position: '', companyId: '',
  });

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await API.get(`${COMPANY_API}/get`);
        if (data.success) setCompanies(data.companies);
      } catch { setCompanies([]); }
    };
    fetch();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.companyId) { setMsg({ text: 'Please select a company', type: 'error' }); return; }
    try {
      setLoading(true);
      const { data } = await API.post(`${JOB_API}/post`, form);
      if (data.success) {
        setMsg({ text: 'Job posted successfully!', type: 'success' });
        setTimeout(() => navigate('/recruiter/jobs'), 1500);
      }
    } catch (err) {
      setMsg({ text: err.response?.data?.message || 'Failed to post job', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full bg-surface/50 border border-white/10 text-white placeholder-zinc-600 rounded-xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/50 transition-all";
  const labelClass = "block text-zinc-300 text-xs font-bold uppercase tracking-wider mb-2";

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      <Navbar />

      {/* Abstract Background Blur */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-900/10 blur-[150px] pointer-events-none" />

      <main className="flex-1 relative z-10 pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Post a New Job</h1>
          <p className="text-zinc-400 font-medium">Fill in the details below to attract top talent to your company.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          <div className="glass-panel border border-white/5 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary-500 to-indigo-500" />
            
            <h2 className="text-xl font-black text-white mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Job Details
            </h2>

            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className={labelClass}>Job Title</label>
                <input name="title" value={form.title} onChange={handleChange} placeholder="e.g. Senior React Developer" required className={inputClass} />
              </div>

              {/* Description */}
              <div>
                <label className={labelClass}>Role Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} rows={5} placeholder="Describe the responsibilities, expectations, and what a typical day looks like..." required className={`${inputClass} resize-none`} />
              </div>

              {/* Requirements */}
              <div>
                <label className={labelClass}>Requirements & Skills</label>
                <input name="requirements" value={form.requirements} onChange={handleChange} placeholder="e.g. React, Node.js, Typescript (comma separated)" required className={inputClass} />
                {form.requirements && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {form.requirements.split(',').filter(r => r.trim()).map((r, i) => (
                      <span key={i} className="bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-bold px-3 py-1.5 rounded-lg">{r.trim()}</span>
                    ))}
                  </div>
                )}
              </div>

              {/* Grid Fields */}
              <div className="grid sm:grid-cols-2 gap-6 pt-4 border-t border-white/5">
                <div>
                  <label className={labelClass}>Salary (LPA)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-bold">₹</span>
                    <input name="salary" type="number" value={form.salary} onChange={handleChange} placeholder="12" required className={`${inputClass} pl-8`} />
                  </div>
                </div>
                
                <div>
                  <label className={labelClass}>Location</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </span>
                    <input name="location" value={form.location} onChange={handleChange} placeholder="Bangalore, India" required className={`${inputClass} pl-10`} />
                  </div>
                </div>
                
                <div>
                  <label className={labelClass}>Job Type</label>
                  <select 
                    name="jobType" 
                    value={form.jobType} 
                    onChange={handleChange} 
                    className={`${inputClass} appearance-none pr-10`}
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23a1a1aa'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1em 1em' }}
                  >
                    {JOB_TYPES.map(t => <option key={t} value={t} className="bg-surface text-white">{t}</option>)}
                  </select>
                </div>
                
                <div>
                  <label className={labelClass}>Positions Available</label>
                  <input name="position" type="number" value={form.position} onChange={handleChange} placeholder="e.g. 3" required className={inputClass} />
                </div>
              </div>

              {/* Company */}
              <div className="pt-4 border-t border-white/5">
                <label className={labelClass}>Hiring Company</label>
                {companies.length === 0 ? (
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl px-5 py-4 flex items-center justify-between flex-wrap gap-4">
                    <span className="text-amber-400 text-sm font-bold">No companies found in your account.</span>
                    <button type="button" onClick={() => navigate('/recruiter/company')} className="bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold px-4 py-2 rounded-lg transition-colors text-xs uppercase tracking-wider">
                      Register Company First
                    </button>
                  </div>
                ) : (
                  <select 
                    name="companyId" 
                    value={form.companyId} 
                    onChange={handleChange} 
                    className={`${inputClass} appearance-none pr-10 border-primary-500/30 focus:border-primary-500 focus:ring-primary-500/50`}
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23a1a1aa'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1em 1em' }}
                  >
                    <option value="" className="bg-surface text-white">Select a company...</option>
                    {companies.map(c => <option key={c._id} value={c._id} className="bg-surface text-white">{c.name}</option>)}
                  </select>
                )}
              </div>
            </div>
          </div>

          {/* Message */}
          {msg.text && (
            <div className={`flex items-center gap-3 rounded-xl px-5 py-4 text-sm font-bold border ${
              msg.type === 'success'
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                : 'bg-red-500/10 border-red-500/20 text-red-400'
            }`}>
              {msg.type === 'success' ? (
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              )}
              {msg.text}
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading || companies.length === 0}
              className="w-full sm:w-auto min-w-[200px] bg-primary-600 hover:bg-primary-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-xl transition-all text-sm shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] active:scale-95"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Posting Job...
                </span>
              ) : 'Post Job Listing'}
            </button>
          </div>

        </form>
      </main>
    </div>
  );
}