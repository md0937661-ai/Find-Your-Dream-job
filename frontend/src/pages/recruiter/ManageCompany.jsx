import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../../components/Navbar';
import API from '../../utils/axios';
import { COMPANY_API } from '../../utils/constants';
import { setCompanies } from '../../redux/companySlice';

export default function ManageCompany() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { companies } = useSelector((state) => state.company);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [msg, setMsg] = useState({ text: '', type: '' });

  // Mode: 'list', 'register', 'edit'
  const [mode, setMode] = useState('list');
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: '',
    location: '',
    description: '',
    website: '',
  });
  const [file, setFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      setFetching(true);
      const { data } = await API.get(`${COMPANY_API}/get`);
      if (data.success) dispatch(setCompanies(data.companies));
      else dispatch(setCompanies([]));
    } catch (err) {
      dispatch(setCompanies([]));
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (f) {
      setFile(f);
      setLogoPreview(URL.createObjectURL(f));
    }
  };

  const resetForm = () => {
    setForm({ name: '', location: '', description: '', website: '' });
    setFile(null);
    setLogoPreview(null);
    setMsg({ text: '', type: '' });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg({ text: '', type: '' });
    try {
      const { data } = await API.post(`${COMPANY_API}/register`, {
        name: form.name,
        location: form.location,
        description: form.description,
        website: form.website,
      });
      if (data.success) {
        setMsg({ text: 'Company registered successfully!', type: 'success' });
        fetchCompanies();
        setTimeout(() => { setMode('list'); resetForm(); }, 1500);
      }
    } catch (err) {
      setMsg({ text: err.response?.data?.message || 'Failed to register company', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg({ text: '', type: '' });
    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('location', form.location);
      formData.append('description', form.description);
      formData.append('website', form.website);
      if (file) formData.append('file', file); // Use 'file' to match multer if used (or you can adjust based on backend)

      const { data } = await API.put(`${COMPANY_API}/update/${editingId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (data.success) {
        setMsg({ text: 'Company updated successfully!', type: 'success' });
        fetchCompanies();
        setTimeout(() => { setMode('list'); resetForm(); }, 1500);
      }
    } catch (err) {
      setMsg({ text: err.response?.data?.message || 'Failed to update company', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (company) => {
    setEditingId(company._id);
    setForm({
      name: company.name || '',
      location: company.location || '',
      description: company.description || '',
      website: company.website || '',
    });
    setLogoPreview(company.logo || null);
    setFile(null);
    setMode('edit');
    setMsg({ text: '', type: '' });
  };

  const inputClass = "w-full bg-surface/50 border border-white/10 text-white placeholder-zinc-600 rounded-xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/50 transition-all";
  const labelClass = "block text-zinc-300 text-xs font-bold uppercase tracking-wider mb-2";

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      <Navbar />

      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-900/10 blur-[150px] pointer-events-none" />

      <main className="flex-1 relative z-10 pt-28 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Manage Companies</h1>
            <p className="text-zinc-400 font-medium">Add or update your companies for job postings.</p>
          </div>
          {mode === 'list' && (
            <button
              onClick={() => { resetForm(); setMode('register'); }}
              className="bg-primary-600 hover:bg-primary-500 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(139,92,246,0.3)] active:scale-95 whitespace-nowrap"
            >
              + Register Company
            </button>
          )}
          {mode !== 'list' && (
            <button
              onClick={() => { setMode('list'); resetForm(); }}
              className="bg-surface hover:bg-white/10 border border-white/10 text-white font-bold px-6 py-3 rounded-xl transition-all whitespace-nowrap"
            >
              Cancel
            </button>
          )}
        </div>

        {mode === 'list' && (
          fetching ? (
            <div className="glass-panel border border-white/5 rounded-3xl p-6 space-y-4 animate-pulse">
               {[...Array(2)].map((_, i) => (
                  <div key={i} className="bg-white/5 rounded-xl h-24 w-full" />
               ))}
            </div>
          ) : companies.length === 0 ? (
            <div className="glass-panel border border-white/5 rounded-3xl p-20 text-center shadow-2xl">
              <div className="w-20 h-20 mx-auto mb-6 bg-surface rounded-full flex items-center justify-center border border-white/10 shadow-inner">
                <svg className="w-10 h-10 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <p className="text-2xl font-black text-white mb-2">No companies registered</p>
              <p className="text-zinc-400 font-medium mb-8">You need to register a company before you can post jobs.</p>
              <button 
                onClick={() => { resetForm(); setMode('register'); }}
                className="bg-primary-600 hover:bg-primary-500 text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] active:scale-95"
              >
                Register First Company
              </button>
            </div>
          ) : (
            <div className="grid gap-6">
              {companies.map((company) => (
                <div key={company._id} className="glass-panel border border-white/5 rounded-3xl p-6 flex flex-col sm:flex-row sm:items-center gap-6 group hover:border-primary-500/30 transition-all shadow-xl">
                  {company.logo ? (
                    <img src={company.logo} alt="" className="w-16 h-16 rounded-2xl object-contain bg-white p-2 border border-white/10 shadow-inner flex-shrink-0" />
                  ) : (
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center text-zinc-400 font-bold text-2xl flex-shrink-0 border border-white/5 shadow-inner">
                      {company.name?.charAt(0).toUpperCase()}
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <p className="text-xl font-black text-white mb-1 group-hover:text-primary-400 transition-colors">{company.name}</p>
                    <p className="text-zinc-400 text-sm font-medium flex items-center gap-2 mb-2">
                      <svg className="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {company.location}
                    </p>
                    {company.website && (
                      <a href={company.website} target="_blank" rel="noreferrer" className="text-primary-400 hover:text-white text-xs font-bold inline-flex items-center gap-1 transition-colors">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        {company.website}
                      </a>
                    )}
                  </div>

                  <div className="flex-shrink-0 pt-4 sm:pt-0 border-t sm:border-none border-white/5 w-full sm:w-auto">
                    <button
                      onClick={() => startEdit(company)}
                      className="w-full sm:w-auto text-center bg-surface hover:bg-white/10 border border-white/10 text-white font-bold px-6 py-2.5 rounded-xl transition-all shadow-sm"
                    >
                      Edit Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        )}

        {mode !== 'list' && (
          <div className="max-w-3xl mx-auto">
            <form onSubmit={mode === 'register' ? handleRegister : handleUpdate} className="space-y-6">
              
              <div className="glass-panel border border-white/5 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary-500 to-indigo-500" />
                
                <h2 className="text-xl font-black text-white mb-6">
                  {mode === 'register' ? 'Register New Company' : 'Edit Company Profile'}
                </h2>

                <div className="space-y-6">
                  
                  {mode === 'edit' && (
                    <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-white/5">
                      <div className="relative group">
                        {logoPreview ? (
                          <img src={logoPreview} alt="Logo" className="w-24 h-24 rounded-2xl object-contain bg-white p-2 border border-white/10 shadow-inner" />
                        ) : (
                          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center text-zinc-400 font-bold text-3xl border border-white/5 shadow-inner">
                            {form.name?.charAt(0).toUpperCase() || 'C'}
                          </div>
                        )}
                      </div>
                      <div className="text-center sm:text-left">
                        <label className="cursor-pointer bg-surface border border-white/10 hover:bg-white/10 text-white font-bold text-sm px-6 py-2.5 rounded-xl transition-all inline-block shadow-sm">
                          Upload Logo
                          <input type="file" accept="image/jpeg,image/jpg,image/png" onChange={handleFileChange} className="hidden" name="file" />
                        </label>
                        <p className="text-zinc-500 text-xs mt-3 font-medium">Square image recommended. Max 5MB.</p>
                      </div>
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClass}>Company Name *</label>
                      <input name="name" value={form.name} onChange={handleChange} placeholder="Acme Corp" required className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Location *</label>
                      <input name="location" value={form.location} onChange={handleChange} placeholder="Bangalore, India" required className={inputClass} />
                    </div>
                    <div className="sm:col-span-2">
                      <label className={labelClass}>Website URL</label>
                      <input name="website" type="url" value={form.website} onChange={handleChange} placeholder="https://www.acmecorp.com" className={inputClass} />
                    </div>
                    <div className="sm:col-span-2">
                      <label className={labelClass}>Description</label>
                      <textarea name="description" value={form.description} onChange={handleChange} rows={4} placeholder="Describe what your company does, its culture, and mission..." className={`${inputClass} resize-none`} />
                    </div>
                  </div>
                </div>
              </div>

              {msg.text && (
                <div className={`flex items-center gap-3 rounded-xl px-5 py-4 text-sm font-bold border ${
                  msg.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'
                }`}>
                  {msg.text}
                </div>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto min-w-[200px] bg-primary-600 hover:bg-primary-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-xl transition-all text-sm shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] active:scale-95"
                >
                  {loading ? 'Saving...' : mode === 'register' ? 'Register Company' : 'Save Changes'}
                </button>
              </div>

            </form>
          </div>
        )}

      </main>
    </div>
  );
}