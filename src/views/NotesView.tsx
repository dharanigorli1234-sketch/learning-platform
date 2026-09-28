import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Download, 
  Bookmark, 
  Star, 
  Eye, 
  X, 
  Check, 
  Calendar,
  Layers,
  ArrowRight,
  Printer
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { NOTES_COLLECTION, BRANCH_LIST, ALL_SUBJECTS } from '../data/branchesData';
import { EngineeringBranch, AcademicYear, SemesterNumber, NoteItem } from '../types';

export const NotesView: React.FC = () => {
  const { user, bookmarks, toggleBookmark, isBookmarked } = useAuth();

  const [selectedBranch, setSelectedBranch] = useState<EngineeringBranch>(user.branch);
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedSemester, setSelectedSemester] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeReadingNote, setActiveReadingNote] = useState<NoteItem | null>(null);
  const [downloadSuccessId, setDownloadSuccessId] = useState<string | null>(null);

  // Sync to user branch on change
  React.useEffect(() => {
    setSelectedBranch(user.branch);
  }, [user.branch]);

  const filteredNotes = NOTES_COLLECTION.filter((note) => {
    const matchBranch = selectedBranch === 'Other' || note.branch === selectedBranch || selectedBranch === 'CSE'; // Allow showing notes
    const matchYear = selectedYear === 'all' || note.year === selectedYear;
    const matchSemester = selectedSemester === 'all' || String(note.semester) === selectedSemester;
    const matchQuery = !searchQuery.trim() || 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.subjectTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.topicTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchBranch && matchYear && matchSemester && matchQuery;
  });

  const handleDownload = (note: NoteItem) => {
    setDownloadSuccessId(note.id);
    setTimeout(() => {
      setDownloadSuccessId(null);
    }, 2500);

    // Create a client-side text/markdown download blob
    const blob = new Blob([note.contentMarkdown], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${note.subjectCode}_${note.topicTitle.replace(/\s+/g, '_')}_Notes.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Engineering Revision Notes & Cheat Sheets
            </h1>
            <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300">
              {selectedBranch}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Curated unit summaries, derivations, and exam formulas contributed by top university rankers
          </p>
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Branch */}
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value as EngineeringBranch)}
            className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          >
            {BRANCH_LIST.map((b) => (
              <option key={b.code} value={b.code}>
                {b.code} - {b.name}
              </option>
            ))}
          </select>

          {/* Year */}
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Years</option>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>
          </select>

          {/* Semester */}
          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Semesters</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
              <option key={s} value={String(s)}>
                Sem {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter notes by topic, subject title, formula keywords, or author..."
          className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-850 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Notes Grid */}
      {filteredNotes.length === 0 ? (
        <div className="py-12 px-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 text-center bg-white dark:bg-slate-900">
          <FileText className="w-8 h-8 mx-auto text-slate-400 mb-2" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
            No revision notes found matching the selected filters
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-4">
            Try resetting the year/semester filters or switch to CSE / Mechanical to view comprehensive notes.
          </p>
          <button
            onClick={() => { setSelectedBranch('CSE'); setSelectedYear('all'); setSelectedSemester('all'); setSearchQuery(''); }}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredNotes.map((note) => {
            const bookmarked = isBookmarked('notes', note.id);
            const isDownloaded = downloadSuccessId === note.id;

            return (
              <div
                key={note.id}
                className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-400 dark:hover:border-blue-500/60 transition-all flex flex-col justify-between shadow-2xs group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                      <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                        {note.subjectCode}
                      </span>
                      <span>·</span>
                      <span>{note.branch}</span>
                      <span>·</span>
                      <span>Sem {note.semester}</span>
                    </div>

                    <button
                      onClick={() => toggleBookmark('notes', note.id)}
                      className="text-slate-400 hover:text-amber-500 p-1"
                      title="Bookmark note"
                    >
                      <Bookmark className={`w-4 h-4 ${bookmarked ? 'text-amber-500 fill-amber-500' : ''}`} />
                    </button>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {note.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                    Subject: <strong className="text-slate-700 dark:text-slate-300">{note.subjectTitle}</strong> · Topic: {note.topicTitle}
                  </p>

                  <div className="space-y-1 mb-4">
                    {note.keyTakeaways.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                        <span className="text-blue-500 shrink-0">•</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <div className="text-[11px] text-slate-400">
                    By {note.author} · {note.pages} pages
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveReadingNote(note)}
                      className="px-2.5 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/60 rounded transition-colors flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Read Note</span>
                    </button>

                    <button
                      onClick={() => handleDownload(note)}
                      className="px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded transition-colors flex items-center gap-1"
                    >
                      {isDownloaded ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span>Saved!</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-3.5 h-3.5" />
                          <span>PDF</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Note Reader Modal */}
      {activeReadingNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div 
            className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 relative transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveReadingNote(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-mono text-blue-600 dark:text-blue-400 mb-2">
              <span>{activeReadingNote.subjectCode}: {activeReadingNote.subjectTitle}</span>
              <span>·</span>
              <span>{activeReadingNote.branch}</span>
              <span>·</span>
              <span>Semester {activeReadingNote.semester}</span>
            </div>

            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              {activeReadingNote.title}
            </h2>

            <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pb-4 border-b border-slate-200 dark:border-slate-800 mb-6">
              <span>Author: <strong className="text-slate-700 dark:text-slate-300">{activeReadingNote.author}</strong> ({activeReadingNote.authorCollege})</span>
              <span>·</span>
              <span>Updated: {activeReadingNote.updatedDate}</span>
              <span>·</span>
              <span>{activeReadingNote.pages} Pages</span>
            </div>

            <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm leading-relaxed space-y-4 font-sans">
              <pre className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 font-sans whitespace-pre-wrap border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200">
                {activeReadingNote.contentMarkdown}
              </pre>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-mono">
                StudySphere Verified Open-Access Academic Material
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownload(activeReadingNote)}
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Notes</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
