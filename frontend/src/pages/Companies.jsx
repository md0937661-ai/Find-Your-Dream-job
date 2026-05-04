import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import CompanyCard from '../components/CompanyCard';
import API from '../utils/axios';
import { COMPANY_API } from '../utils/constants';
import { setCompanies } from '../redux/companySlice';

export default function Companies() {
  const dispatch = useDispatch();
  const { companies } = useSelector((state) => state.company);
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('keyword') || '');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const { data } = await API.get(`${COMPANY_API}/all?keyword=${search}`);
        if (data.success) dispatch(setCompanies(data.companies));
      } catch {
        dispatch(setCompanies([]));
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [search]);

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      <Navbar />

      {/* Abstract Background Blur */}
      <div className="absolute top-0 right-0 w-full h-[500px] bg-indigo-900/10 blur-[150px] pointer-events-none" />

      <main className="flex-1 relative z-10 pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-6 tracking-tight">
            Discover <span className="text-gradient">Top Companies</span>
          </h1>
          <p className="text-zinc-400 text-lg font-medium mb-10">
            Research and find the perfect company culture that aligns with your career goals. 
            We have {companies?.length || 0}+ companies actively hiring.
          </p>

          {/* Search Bar */}
          <div className="glass-panel p-2.5 rounded-2xl flex items-center max-w-2xl mx-auto shadow-2xl">
            <div className="flex items-center gap-3 flex-1 px-4">
              <svg className="w-6 h-6 text-primary-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by company name, industry, or location..."
                className="w-full bg-transparent border-none text-white placeholder-zinc-500 py-3 focus:outline-none focus:ring-0 text-[15px] font-medium"
              />
            </div>
            {search && (
              <button 
                onClick={() => setSearch('')}
                className="text-zinc-500 hover:text-white p-2 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Companies Grid */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="glass-card rounded-2xl p-6 h-64 animate-pulse flex flex-col items-center">
                <div className="w-20 h-20 rounded-2xl bg-white/5 mb-5" />
                <div className="h-5 bg-white/5 rounded w-3/4 mb-3" />
                <div className="h-4 bg-white/5 rounded w-1/2 mb-auto" />
                <div className="w-full border-t border-white/5 pt-4 mt-4">
                  <div className="h-4 bg-white/5 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : companies?.length === 0 ? (
          <div className="glass-panel rounded-3xl p-16 text-center max-w-2xl mx-auto mt-10">
            <div className="w-24 h-24 mx-auto mb-6 bg-surface rounded-full flex items-center justify-center border border-white/10 shadow-inner">
              <svg className="w-10 h-10 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-2xl font-black text-white mb-2">No companies found</h3>
            <p className="text-zinc-400 font-medium max-w-sm mx-auto">We couldn't find any companies matching your search. Try adjusting your keywords.</p>
            <button 
              onClick={() => setSearch('')}
              className="mt-8 bg-primary-600 hover:bg-primary-500 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(139,92,246,0.3)] active:scale-95"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {companies?.map((company) => (
              <CompanyCard key={company._id} company={company} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
