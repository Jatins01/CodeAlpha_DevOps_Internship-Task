import React, { useState, useEffect } from 'react';

export default function NoteForm({ isOpen, onClose, onSubmit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form fields when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setTitle('');
      setDescription('');
      setErrors({});
      setIsSubmitting(false);
    }
  }, [isOpen]);

  // Handle ESC key press to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    } else if (title.length > 255) {
      newErrors.title = 'Title must be under 255 characters';
    }
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const success = await onSubmit({ title: title.trim(), description: description.trim() });
      if (success) {
        onClose();
      }
    } catch (error) {
      setErrors({ server: 'An error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with animation */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity duration-300"
      ></div>

      {/* Modal Card */}
      <div className="glass w-full max-w-lg rounded-2xl shadow-2xl relative z-10 overflow-hidden transform scale-100 transition-all duration-300 border border-slate-700/60">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <span className="text-xl">✍️</span> Add New Note
          </h3>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 transition-colors p-1.5 rounded-lg hover:bg-slate-800/80"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errors.server && (
            <div className="p-3.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm rounded-xl font-medium">
              {errors.server}
            </div>
          )}

          {/* Title Input */}
          <div>
            <label htmlFor="title" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Note Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Docker Volumes Explanation"
              className={`w-full px-4 py-2.5 bg-slate-950/50 border ${
                errors.title ? 'border-rose-500/50 focus:ring-rose-500/30' : 'border-slate-800 focus:ring-primary-500/30'
              } text-slate-200 rounded-xl focus:outline-none focus:ring-4 transition-all duration-200`}
            />
            {errors.title && (
              <p className="mt-1.5 text-xs text-rose-400 font-medium">{errors.title}</p>
            )}
          </div>

          {/* Description Textarea */}
          <div>
            <label htmlFor="description" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Description
            </label>
            <textarea
              id="description"
              rows="5"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write down notes, configuration details, or commands..."
              className={`w-full px-4 py-2.5 bg-slate-950/50 border ${
                errors.description ? 'border-rose-500/50 focus:ring-rose-500/30' : 'border-slate-800 focus:ring-primary-500/30'
              } text-slate-200 rounded-xl focus:outline-none focus:ring-4 transition-all duration-200 resize-none`}
            ></textarea>
            {errors.description && (
              <p className="mt-1.5 text-xs text-rose-400 font-medium">{errors.description}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-3 border-t border-slate-800 bg-slate-900/20 -mx-6 -mb-6 p-6">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4.5 py-2.5 bg-slate-800 hover:bg-slate-700/80 text-slate-300 font-medium rounded-xl transition-all duration-200 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-500 text-white font-semibold rounded-xl shadow-lg shadow-primary-600/10 hover:shadow-primary-600/20 active:scale-95 transition-all duration-200 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                'Save Note'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
