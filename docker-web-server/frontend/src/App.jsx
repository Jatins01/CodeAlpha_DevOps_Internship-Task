import React, { useState, useEffect } from 'react';
import api from './api';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import NoteCard from './components/NoteCard';
import NoteForm from './components/NoteForm';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  // Fetch all notes
  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await api.get('/notes');
      setNotes(response.data);
      setError(null);
    } catch (err) {
      console.error('Error loading notes:', err);
      setError('Failed to connect to the notes service. Please ensure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Display transient notifications
  const showToast = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Create a note
  const handleCreateNote = async (noteData) => {
    try {
      const response = await api.post('/notes', noteData);
      setNotes((prevNotes) => [response.data, ...prevNotes]);
      showToast('Note created successfully!');
      return true;
    } catch (err) {
      console.error('Error creating note:', err);
      const errMsg = err.response?.data?.message || 'Failed to create note.';
      showToast(errMsg, 'error');
      return false;
    }
  };

  // Delete a note
  const handleDeleteNote = async (id) => {
    try {
      await api.delete(`/notes/${id}`);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
      showToast('Note deleted successfully!');
    } catch (err) {
      console.error('Error deleting note:', err);
      showToast('Failed to delete note. Please try again.', 'error');
      throw err;
    }
  };

  // Dynamic filter logic
  const filteredNotes = notes.filter((note) => {
    const titleMatch = note.title.toLowerCase().includes(searchQuery.toLowerCase());
    const descMatch = note.description.toLowerCase().includes(searchQuery.toLowerCase());
    return titleMatch || descMatch;
  });

  return (
    <div className="flex-1 flex flex-col pb-16">
      <Header />

      {/* Main Body */}
      <main className="max-w-6xl w-full mx-auto px-6 mt-8 flex-1 flex flex-col gap-6">
        
        {/* Search & Actions Bar */}
        <SearchBar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onAddClick={() => setIsAddModalOpen(true)}
        />

        {/* Global Notifications / Toasts */}
        {notification && (
          <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4.5 py-3 rounded-xl border shadow-xl transform translate-y-0 transition-all duration-300 font-medium ${
            notification.type === 'error' 
              ? 'bg-rose-950/80 border-rose-500/30 text-rose-300 backdrop-blur-md'
              : 'bg-emerald-950/80 border-emerald-500/30 text-emerald-300 backdrop-blur-md'
          }`}>
            <span>{notification.type === 'error' ? '❌' : '✅'}</span>
            <span className="text-sm">{notification.message}</span>
          </div>
        )}

        {/* Error Warning */}
        {error && (
          <div className="p-4 bg-rose-500/10 border border-rose-500/25 rounded-2xl flex items-start gap-3">
            <span className="text-xl">⚠️</span>
            <div>
              <h4 className="font-bold text-rose-400">Connection Error</h4>
              <p className="text-sm text-rose-300/80 mt-1">{error}</p>
              <button 
                onClick={fetchNotes}
                className="mt-3 text-xs bg-rose-500/20 hover:bg-rose-500/35 text-rose-300 border border-rose-500/30 px-3 py-1.5 rounded-lg font-semibold transition-all"
              >
                Retry Connection
              </button>
            </div>
          </div>
        )}

        {/* Notes Grid & State Control */}
        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center py-20">
            <svg className="animate-spin h-10 w-10 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-slate-400 text-sm font-semibold mt-4">Loading your workspace...</span>
          </div>
        ) : (
          <div className="flex-1">
            {filteredNotes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNotes.map((note) => (
                  <NoteCard 
                    key={note.id}
                    note={note}
                    onDelete={handleDeleteNote}
                  />
                ))}
              </div>
            ) : (
              <div className="glass rounded-2xl p-12 text-center flex flex-col items-center justify-center border border-slate-800/80 max-w-xl mx-auto mt-8">
                <span className="text-5xl mb-4">📂</span>
                <h3 className="text-lg font-bold text-slate-200">
                  {searchQuery ? 'No matching notes' : 'Your board is empty'}
                </h3>
                <p className="text-sm text-slate-400 mt-2 max-w-sm">
                  {searchQuery 
                    ? `We couldn't find any notes matching "${searchQuery}". Try adjusting your search query.` 
                    : 'Start creating your notes! They will be persisted securely in your MySQL container volume.'}
                </p>
                {!searchQuery && (
                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="mt-6 px-5 py-2.5 bg-slate-800 hover:bg-slate-700/80 border border-slate-750 text-slate-200 font-semibold rounded-xl transition-all active:scale-95 shadow-lg"
                  >
                    Create Your First Note
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Note Creation Modal */}
      <NoteForm 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleCreateNote}
      />
    </div>
  );
}
