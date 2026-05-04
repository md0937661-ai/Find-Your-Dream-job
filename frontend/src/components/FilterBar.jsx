import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../redux/jobSlice';

const FILTERS = {
  'Job Type': ['Full-time', 'Part-time', 'Remote', 'Internship', 'Contract', 'Freelance'],
  'Experience': ['Fresher', '1-3 years', '3-5 years', '5+ years'],
  'Salary': ['0-5 LPA', '5-10 LPA', '10-20 LPA', '20+ LPA'],
  'Location': ['Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Pune', 'Remote'],
};

export default function FilterBar({ onFilter }) {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState({});
  const [openSection, setOpenSection] = useState('Job Type');

  const toggle = (section, value) => {
    const current = selected[section];
    const updated = current === value ? undefined : value;
    const newSelected = { ...selected, [section]: updated };
    if (!updated) delete newSelected[section];
    setSelected(newSelected);
    if (onFilter) onFilter(newSelected);
  };

  const clearAll = () => {
    setSelected({});
    if (onFilter) onFilter({});
  };

  const activeCount = Object.keys(selected).length;

  return (
    <div className="glass-panel border border-white/5 rounded-3xl overflow-hidden w-full shadow-xl">

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/5 bg-surface/30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary-600/20 text-primary-400 flex items-center justify-center border border-primary-500/20">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </div>
          <span className="text-white font-black tracking-wide">Filters</span>
          {activeCount > 0 && (
            <span className="bg-primary-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold shadow-lg shadow-primary-900/50">
              {activeCount}
            </span>
          )}
        </div>
        {activeCount > 0 && (
          <button
            onClick={clearAll}
            className="text-zinc-500 hover:text-red-400 text-xs font-bold uppercase tracking-wider transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Active Filters */}
      {activeCount > 0 && (
        <div className="px-6 py-4 border-b border-white/5 flex flex-wrap gap-2 bg-surface/10">
          {Object.entries(selected).map(([section, value]) => (
            <span
              key={section}
              className="flex items-center gap-1.5 bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-bold px-3 py-1.5 rounded-lg"
            >
              {value}
              <button
                onClick={() => toggle(section, value)}
                className="hover:text-white transition-colors hover:scale-110 ml-1"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Filter Sections */}
      {Object.entries(FILTERS).map(([section, options]) => (
        <div key={section} className="border-b border-white/5 last:border-0">
          <button
            onClick={() => setOpenSection(openSection === section ? '' : section)}
            className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/5 transition-colors group"
          >
            <span className="text-zinc-300 group-hover:text-white font-bold text-sm transition-colors">{section}</span>
            <div className="flex items-center gap-3">
              {selected[section] && (
                <span className="w-2 h-2 rounded-full bg-primary-500 shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
              )}
              <svg
                className={`w-4 h-4 text-zinc-500 group-hover:text-primary-400 transition-all duration-300 ${openSection === section ? 'rotate-180 text-primary-400' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>

          {openSection === section && (
            <div className="px-6 pb-5 space-y-1.5 animate-in slide-in-from-top-2 fade-in duration-200">
              {options.map((opt) => {
                const isActive = selected[section] === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => toggle(section, opt)}
                    className={`w-full flex items-center gap-3 text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all group
                      ${isActive
                        ? 'bg-primary-600/20 text-primary-400 border border-primary-500/20'
                        : 'text-zinc-400 hover:text-white hover:bg-surface border border-transparent'
                      }`}
                  >
                    <span className={`w-4 h-4 rounded-md border flex items-center justify-center flex-shrink-0 transition-all
                      ${isActive ? 'bg-primary-600 border-primary-500 shadow-[0_0_10px_rgba(139,92,246,0.5)]' : 'border-white/20 group-hover:border-white/40'}`}
                    >
                      {isActive && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}