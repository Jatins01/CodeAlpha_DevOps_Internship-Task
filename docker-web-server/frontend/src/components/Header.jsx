import React from 'react';

export default function Header() {
  return (
    <header className="glass border-b border-slate-800 sticky top-0 z-50 px-6 py-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="bg-primary-500/10 text-primary-500 p-2.5 rounded-xl border border-primary-500/30 shadow-lg shadow-primary-500/5">
            <span className="text-2xl">📝</span>
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              NoteSphere
            </h1>
            <p className="text-xs text-slate-400 font-medium">Containerized Notes Management System</p>
          </div>
        </div>
      </div>
    </header>
  );
}
