import React, { useState } from 'react';

export default function NoteCard({ note, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDeleteClick = () => {
    setConfirmDelete(true);
  };

  const handleCancelDelete = () => {
    setConfirmDelete(false);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(note.id);
    } catch (err) {
      setIsDeleting(false);
      setConfirmDelete(false);
    }
  };

  // Format Date string nicely, ensuring naive strings are treated as UTC for proper local timezone conversion
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      let isoStr = dateStr.replace(' ', 'T');
      if (!isoStr.endsWith('Z') && !isoStr.includes('+') && !isoStr.match(/-\d{2}:\d{2}$/)) {
        isoStr += 'Z';
      }
      const date = new Date(isoStr);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <div className="glass glass-hover p-6 rounded-2xl flex flex-col justify-between min-h-[220px] relative overflow-hidden group">
      {/* Floating Action Delete Button (Top-Right) */}
      <div className="absolute top-3 right-3 z-10">
        {!confirmDelete ? (
          <button
            onClick={handleDeleteClick}
            className="bg-rose-500/10 hover:bg-rose-600 text-rose-400 hover:text-white p-2 rounded-full border border-rose-500/20 hover:border-rose-600 shadow-md shadow-rose-950/20 transition-all duration-200"
            title="Delete Note"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        ) : (
          <div className="flex items-center gap-1 bg-slate-900/95 backdrop-blur border border-rose-500/30 px-2 py-1 rounded-xl shadow-lg">
            <span className="text-[10px] text-rose-400 font-bold mr-1">Delete?</span>
            <button
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className="text-[10px] bg-rose-600 hover:bg-rose-500 text-white font-bold px-2.5 py-0.5 rounded-md transition-colors"
            >
              {isDeleting ? '...' : 'Yes'}
            </button>
            <button
              onClick={handleCancelDelete}
              disabled={isDeleting}
              className="text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold px-2 py-0.5 rounded-md transition-colors"
            >
              No
            </button>
          </div>
        )}
      </div>

      {/* Top Section */}
      <div className="pr-8">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h4 className="text-base font-bold text-slate-100 group-hover:text-primary-400 transition-colors line-clamp-2">
            {note.title}
          </h4>
        </div>
        
        {/* Note Body Text */}
        <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap line-clamp-5">
          {note.description}
        </p>
      </div>

      {/* Card Footer / Controls */}
      <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-medium text-slate-400">{formatDate(note.created_at)}</span>
        </div>

        <span className="text-[10px] bg-slate-800/60 text-slate-400 border border-slate-850 px-2 py-0.5 rounded-full font-mono">
          #{note.id}
        </span>
      </div>
    </div>
  );
}
