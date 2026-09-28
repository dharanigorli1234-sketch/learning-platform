import React, { useState } from 'react';
import { Bookmark, FileText, HelpCircle, FlaskConical, Code2, Trash2, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { NOTES_COLLECTION, BRANCH_PROJECTS } from '../data/branchesData';
import { ALL_PROGRAMMING_LANGUAGES } from '../data/programmingData';
import { NavTab } from '../types';

export const BookmarksView: React.FC = () => {
  const { bookmarks, toggleBookmark, doubts, setActiveTab } = useAuth();
  const [activeCategory, setActiveCategory] = useState<'all' | 'notes' | 'doubts' | 'projects' | 'questions'>('all');

  // Resolved items
  const savedNotes = NOTES_COLLECTION.filter(n => bookmarks.notes.includes(n.id));
  const savedDoubts = doubts.filter(d => bookmarks.doubts.includes(d.id));
  const savedProjects = BRANCH_PROJECTS.filter(p => bookmarks.projects.includes(p.id));

  // Resolved practice questions
  const savedQuestions: { id: string; title: string; language: string; difficulty: string }[] = [];
  ALL_PROGRAMMING_LANGUAGES.forEach(lang => {
    lang.practiceQuestions.forEach(q => {
      if (bookmarks.questions.includes(q.id)) {
        savedQuestions.push({
          id: q.id,
          title: q.title,
          language: lang.name,
          difficulty: q.difficulty,
        });
      }
    });
  });

  const totalCount = savedNotes.length + savedDoubts.length + savedProjects.length + savedQuestions.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">
            Saved Academic Bookmarks
          </h1>
          <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
            {totalCount} Items Saved
          </span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Fast access to revision notes, important doubts, project architectures, and practice questions
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-x-auto max-w-xl">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
            activeCategory === 'all'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          All ({totalCount})
        </button>
        <button
          onClick={() => setActiveCategory('notes')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
            activeCategory === 'notes'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Notes ({savedNotes.length})
        </button>
        <button
          onClick={() => setActiveCategory('doubts')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
            activeCategory === 'doubts'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Doubts ({savedDoubts.length})
        </button>
        <button
          onClick={() => setActiveCategory('projects')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
            activeCategory === 'projects'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Projects ({savedProjects.length})
        </button>
        <button
          onClick={() => setActiveCategory('questions')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
            activeCategory === 'questions'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Coding ({savedQuestions.length})
        </button>
      </div>

      {totalCount === 0 ? (
        <div className="py-12 px-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 text-center bg-white dark:bg-slate-900">
          <Bookmark className="w-8 h-8 mx-auto text-slate-400 mb-2" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
            No bookmarks saved yet
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-4">
            Click the bookmark icon on any note, doubt discussion, coding problem, or project idea to save it here for fast revision.
          </p>
          <button
            onClick={() => setActiveTab('notes')}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Explore Notes to Bookmark
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Notes Bookmarks */}
          {(activeCategory === 'all' || activeCategory === 'notes') && savedNotes.length > 0 && (
            <div className="space-y-2.5">
              <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-blue-500" />
                <span>Saved Revision Notes</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {savedNotes.map((note) => (
                  <div
                    key={note.id}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-start justify-between gap-3 shadow-2xs hover:border-blue-400 transition-colors"
                  >
                    <div>
                      <span className="font-mono text-[10px] text-blue-600 dark:text-blue-400 font-semibold">
                        {note.subjectCode} · {note.branch}
                      </span>
                      <h3 
                        onClick={() => setActiveTab('notes')}
                        className="text-xs font-bold text-slate-900 dark:text-white hover:text-blue-600 cursor-pointer mt-0.5 line-clamp-1"
                      >
                        {note.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        By {note.author} ({note.pages} pages)
                      </p>
                    </div>

                    <button
                      onClick={() => toggleBookmark('notes', note.id)}
                      className="text-slate-400 hover:text-red-500 p-1"
                      title="Remove bookmark"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Doubts Bookmarks */}
          {(activeCategory === 'all' || activeCategory === 'doubts') && savedDoubts.length > 0 && (
            <div className="space-y-2.5">
              <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-emerald-500" />
                <span>Saved Peer Doubts</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {savedDoubts.map((doubt) => (
                  <div
                    key={doubt.id}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-start justify-between gap-3 shadow-2xs hover:border-emerald-400 transition-colors"
                  >
                    <div>
                      <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                        {doubt.subjectCode} · {doubt.answers.length} answers
                      </span>
                      <h3 
                        onClick={() => setActiveTab('doubts')}
                        className="text-xs font-bold text-slate-900 dark:text-white hover:text-emerald-600 cursor-pointer mt-0.5 line-clamp-1"
                      >
                        {doubt.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Asked by {doubt.authorName}
                      </p>
                    </div>

                    <button
                      onClick={() => toggleBookmark('doubts', doubt.id)}
                      className="text-slate-400 hover:text-red-500 p-1"
                      title="Remove bookmark"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects Bookmarks */}
          {(activeCategory === 'all' || activeCategory === 'projects') && savedProjects.length > 0 && (
            <div className="space-y-2.5">
              <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <FlaskConical className="w-3.5 h-3.5 text-purple-500" />
                <span>Saved Engineering Projects</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {savedProjects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-start justify-between gap-3 shadow-2xs hover:border-purple-400 transition-colors"
                  >
                    <div>
                      <span className="font-mono text-[10px] text-purple-600 dark:text-purple-400 font-semibold">
                        {proj.difficulty} · {proj.branch}
                      </span>
                      <h3 
                        onClick={() => setActiveTab('projects')}
                        className="text-xs font-bold text-slate-900 dark:text-white hover:text-purple-600 cursor-pointer mt-0.5 line-clamp-1"
                      >
                        {proj.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                        {proj.techStack.slice(0, 3).join(', ')}
                      </p>
                    </div>

                    <button
                      onClick={() => toggleBookmark('projects', proj.id)}
                      className="text-slate-400 hover:text-red-500 p-1"
                      title="Remove bookmark"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Coding Questions Bookmarks */}
          {(activeCategory === 'all' || activeCategory === 'questions') && savedQuestions.length > 0 && (
            <div className="space-y-2.5">
              <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-blue-500" />
                <span>Saved Practice Problems</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {savedQuestions.map((q) => (
                  <div
                    key={q.id}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-start justify-between gap-3 shadow-2xs hover:border-blue-400 transition-colors"
                  >
                    <div>
                      <span className="font-mono text-[10px] text-blue-600 dark:text-blue-400 font-semibold">
                        {q.language} · {q.difficulty}
                      </span>
                      <h3 
                        onClick={() => setActiveTab('programming')}
                        className="text-xs font-bold text-slate-900 dark:text-white hover:text-blue-600 cursor-pointer mt-0.5 line-clamp-1"
                      >
                        {q.title}
                      </h3>
                    </div>

                    <button
                      onClick={() => toggleBookmark('questions', q.id)}
                      className="text-slate-400 hover:text-red-500 p-1"
                      title="Remove bookmark"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
