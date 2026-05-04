import { Link } from 'react-router-dom';

export default function CompanyCard({ company }) {
  return (
    <Link 
      to={`/companies/${company._id}`}
      className="glass-card rounded-3xl p-6 group flex flex-col items-center text-center relative overflow-hidden hover:-translate-y-2 hover:shadow-[0_15px_40px_-15px_rgba(139,92,246,0.25)] hover:border-primary-500/40 transition-all duration-500 bg-surface/40 hover:bg-surface/80"
    >
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary-500 to-indigo-500 transform origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />

      {company?.logo ? (
        <img 
          src={company.logo} 
          alt={company.name} 
          className="w-20 h-20 rounded-2xl object-contain bg-white p-3 shadow-inner mb-5 group-hover:scale-105 transition-transform duration-300"
        />
      ) : (
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center border border-white/5 shadow-inner mb-5 group-hover:scale-105 transition-transform duration-300">
          <span className="text-3xl font-black text-zinc-400">
            {company?.name?.charAt(0) || 'C'}
          </span>
        </div>
      )}
      
      <h3 className="font-bold text-white text-xl group-hover:text-primary-400 transition-colors mb-2">{company?.name}</h3>
      
      {company?.location && (
        <span className="inline-flex items-center gap-1.5 text-zinc-400 text-xs font-semibold bg-surface border border-white/5 px-3 py-1.5 rounded-full mb-3">
          <svg className="w-3.5 h-3.5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {company.location}
        </span>
      )}
      
      <p className="text-zinc-500 text-sm line-clamp-2 mt-auto">
        {company?.description || 'No description available for this company.'}
      </p>

      <div className="w-full flex items-center justify-between mt-6 pt-5 border-t border-white/5">
        <div className="text-primary-400 text-sm font-bold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 flex items-center gap-1">
          View Profile
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
        {company?.website && (
          <span className="text-zinc-500 text-xs hover:text-white transition-colors" onClick={(e) => e.stopPropagation()}>
            <a href={company.website} target="_blank" rel="noreferrer">Website</a>
          </span>
        )}
      </div>
    </Link>
  );
}