import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import API from '../utils/axios';
import { COMPANY_API } from '../utils/constants';
import { setSingleCompany } from '../redux/companySlice';

export default function CompanyDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { singleCompany } = useSelector((state) => state.company);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await API.get(`${COMPANY_API}/get/${id}`);
        if (data.success) dispatch(setSingleCompany(data.company));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 pt-32 pb-20 w-full animate-pulse">
        <div className="h-8 bg-white/5 rounded w-32 mb-8" />
        <div className="glass-panel p-8 rounded-3xl h-48 mb-8" />
        <div className="glass-panel p-8 rounded-3xl h-64" />
      </div>
    </div>
  );

  if (!singleCompany) return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center text-center py-20 px-4">
        <div>
          <div className="w-24 h-24 mx-auto mb-6 bg-surface rounded-full flex items-center justify-center border border-white/10 shadow-inner">
            <svg className="w-10 h-10 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h2 className="text-2xl font-black text-white mb-2">Company not found</h2>
          <p className="text-zinc-400 font-medium mb-8">This company profile might have been removed or doesn't exist.</p>
          <button onClick={() => navigate('/companies')} className="bg-white/10 hover:bg-white/20 text-white px-6 py-2.5 rounded-xl transition-colors font-medium">
            Browse other companies
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      <Navbar />

      {/* Abstract Background Blur */}
      <div className="absolute top-0 right-0 w-full h-[500px] bg-indigo-900/10 blur-[150px] pointer-events-none" />

      <main className="flex-1 relative z-10 pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
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
          Back to Companies
        </button>

        {/* Header Card */}
        <div className="glass-panel border border-white/5 rounded-3xl p-8 mb-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-primary-500 via-indigo-500 to-primary-500" />
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
            {singleCompany.logo ? (
              <img 
                src={singleCompany.logo} 
                alt={singleCompany.name} 
                className="w-28 h-28 rounded-2xl object-contain bg-white p-4 shadow-inner flex-shrink-0" 
              />
            ) : (
              <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center shadow-inner border border-white/5 flex-shrink-0">
                <span className="text-4xl font-black text-zinc-400">
                  {singleCompany.name?.charAt(0) || 'C'}
                </span>
              </div>
            )}
            
            <div className="flex-1">
              <h1 className="text-4xl font-black text-white mb-4 tracking-tight">{singleCompany.name}</h1>
              
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                {singleCompany.location && (
                  <p className="flex items-center gap-2 text-zinc-300 font-medium bg-surface/50 border border-white/10 px-4 py-2 rounded-xl">
                    <svg className="w-4 h-4 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {singleCompany.location}
                  </p>
                )}

                {singleCompany.website && (
                  <a
                    href={singleCompany.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary-400 hover:text-white hover:bg-primary-600 font-bold bg-primary-500/10 border border-primary-500/20 px-4 py-2 rounded-xl transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Visit Website
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="glass-panel border border-white/5 rounded-3xl p-8">
          <h2 className="text-xl font-black text-white mb-6 flex items-center gap-2">
            <svg className="w-5 h-5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            About the Company
          </h2>
          <div className="prose prose-invert prose-p:text-zinc-400 prose-p:leading-relaxed prose-p:text-[15px] max-w-none whitespace-pre-wrap">
            {singleCompany.description ? (
              <p>{singleCompany.description}</p>
            ) : (
              <div className="text-center py-10 bg-surface/30 rounded-2xl border border-white/5">
                <p className="text-zinc-500 italic">No detailed description provided by this company.</p>
              </div>
            )}
          </div>
        </div>

      </main>
    </div>
  );
}
