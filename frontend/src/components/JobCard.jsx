import { Link } from 'react-router-dom';

export default function JobCard({ job }) {
  const timeAgo = (date) => {
    const diff = Date.now() - new Date(date);
    const days = Math.floor(diff / 86400000);
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    return `${days}d ago`;
  };

  return (
    <div className="glass-card rounded-[2rem] p-6 sm:p-8 group flex flex-col h-full relative overflow-hidden hover:-translate-y-2 hover:shadow-[0_15px_40px_-15px_rgba(139,92,246,0.25)] hover:border-primary-500/40 transition-all duration-500 bg-surface/40 hover:bg-surface/80">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 via-transparent to-primary-500/0 group-hover:from-primary-500/10 group-hover:to-indigo-500/5 transition-all duration-500 pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-primary-500 to-indigo-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out z-10" />
      
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-4">
          {job?.company?.logo ? (
            <img 
              src={job.company.logo} 
              alt={job.company.name} 
              className="w-14 h-14 rounded-xl object-contain bg-white p-2 shadow-inner"
            />
          ) : (
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center border border-white/5 shadow-inner">
              <span className="text-xl font-bold text-zinc-400">
                {job?.company?.name?.charAt(0) || 'C'}
              </span>
            </div>
          )}
          <div>
            <h3 className="font-bold text-white text-lg group-hover:text-primary-400 transition-colors line-clamp-1">{job?.company?.name}</h3>
            <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider mt-0.5">{job?.location || job?.company?.location}</p>
          </div>
        </div>
      </div>

      <div className="mb-5 flex-1">
        <h2 className="text-xl font-black text-white mb-2 tracking-tight line-clamp-1 group-hover:text-primary-400 transition-colors">{job?.title}</h2>
        <p className="text-zinc-400 text-sm line-clamp-2 leading-relaxed">{job?.description}</p>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-6">
        {/* Job Type */}
        <span className="bg-primary-500/10 text-primary-400 border border-primary-500/20 px-3 py-1.5 rounded-full text-xs font-bold tracking-wide flex items-center gap-1.5 shadow-sm">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
            <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
          </svg>
          {job?.jobType || 'Full-time'}
        </span>
        
        {/* Location */}
        <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1.5 rounded-full text-xs font-bold tracking-wide flex items-center gap-1.5 shadow-sm">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          {job?.location || 'Remote'}
        </span>
        
        {/* Salary */}
        <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-full text-xs font-bold tracking-wide flex items-center gap-1.5 shadow-sm">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
          </svg>
          ₹{job?.salary} LPA
        </span>
      </div>

      <div className="flex items-center justify-between mt-auto pt-5 border-t border-white/5">
        <span className="text-zinc-500 text-xs font-medium flex items-center gap-1.5">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {timeAgo(job?.createdAt)}
        </span>
        <Link 
          to={`/jobs/${job?._id}`}
          className="text-white text-sm font-bold hover:text-primary-400 transition-colors flex items-center gap-1"
        >
          Details
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}