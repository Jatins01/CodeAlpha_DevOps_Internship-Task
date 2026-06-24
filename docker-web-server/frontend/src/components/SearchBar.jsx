import React from 'react';

export default function SearchBar({ searchQuery, setSearchQuery, onAddClick }) {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-900/40 p-4 rounded-2xl border border-slate-800/60 shadow-inner">
      {/* Search Input Container */}
      <div className="relative w-full md:max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by title or content..."
          className="block w-full pl-11 pr-4 py-2.5 bg-slate-950/50 border border-slate-800 text-slate-200 placeholder-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Action Button */}
      <button
        onClick={onAddClick}
        className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary-500 to-indigo-600 hover:from-primary-600 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/10 hover:shadow-primary-500/20 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
        </svg>
        New Note
      </button>
    </div>
  );
}
