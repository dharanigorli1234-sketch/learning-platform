import React, { useState, useEffect } from 'react';
import { 
  Search, 
  X, 
  BookOpen, 
  Code2, 
  FileText, 
  MessageSquare, 
  FileQuestion, 
  FlaskConical,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ALL_SUBJECTS, NOTES_COLLECTION, PREVIOUS_PAPERS, BRANCH_PROJECTS } from '../data/branchesData';
import { ALL_PROGRAMMING_LANGUAGES } from '../data/programmingData';
import { NavTab } from '../types';

interface SearchResult {
  id: string;
  category: 'Subjects' | 'Notes' | 'Programming' | 'Doubts' | 'Papers' | 'Projects';
  title: string;
  subtitle: string;
  targetTab: NavTab;
  badge: string;
}

export const GlobalSearchModal: React.FC = () => {
  const { 
    isGlobalSearchOpen, 
    setIsGlobalSearchOpen, 
    setActiveTab, 
    doubts,
    user 
  } = useAuth();

  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsGlobalSearchOpen(true);
      }
      if (e.key === 'Escape' && isGlobalSearchOpen) {
        setIsGlobalSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isGlobalSearchOpen, setIsGlobalSearchOpen]);

  if (!isGlobalSearchOpen) return null;

  // Aggregate searchable items
  const results: SearchResult[] = [];
  const q = query.toLowerCase().trim();

  // 1. Subjects & Topics
  ALL_SUBJECTS.forEach((s) => {
    if (!q || s.title.toLowerCase().includes(q) || s.code.toLowerCase().includes(q) || s.branch.toLowerCase().includes(q)) {
      results.push({
        id: s.id,
        category: 'Subjects',
        title: `${s.code}: ${s.title}`,
        subtitle: `${s.branch} · Semester ${s.semester} · ${s.totalTopics} Units`,
        targetTab: 'subjects',
        badge: s.branch,
      });
    }

    s.topics.forEach((t) => {
      if (q && (t.title.toLowerCase().includes(q) || t.summary.toLowerCase().includes(q))) {
        results.push({
          id: `${s.id}-${t.id}`,
          category: 'Subjects',
          title: t.title,
          subtitle: `Unit ${t.unit} of ${s.title} (${s.branch})`,
          targetTab: 'subjects',
          badge: 'Topic',
        });
      }
    });
  });

  // 2. Programming Languages & Concepts
  ALL_PROGRAMMING_LANGUAGES.forEach((l) => {
    if (!q || l.name.toLowerCase().includes(q) || l.tagline.toLowerCase().includes(q)) {
      results.push({
        id: l.id,
        category: 'Programming',
        title: `${l.name} Programming Module`,
        subtitle: l.tagline,
        targetTab: 'programming',
        badge: 'Language',
      });
    }

    l.concepts.forEach((c) => {
      if (q && (c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q))) {
        results.push({
          id: c.id,
          category: 'Programming',
          title: `${l.name}: ${c.title}`,
          subtitle: c.description,
          targetTab: 'programming',
          badge: 'Concept',
        });
      }
    });
  });

  // 3. Notes
  NOTES_COLLECTION.forEach((n) => {
    if (!q || n.title.toLowerCase().includes(q) || n.subjectTitle.toLowerCase().includes(q) || n.author.toLowerCase().includes(q)) {
      results.push({
        id: n.id,
        category: 'Notes',
        title: n.title,
        subtitle: `${n.subjectTitle} · By ${n.author}`,
        targetTab: 'notes',
        badge: n.branch,
      });
    }
  });

  // 4. Doubts
  doubts.forEach((d) => {
    if (!q || d.title.toLowerCase().includes(q) || d.content.toLowerCase().includes(q) || d.subjectTitle.toLowerCase().includes(q)) {
      results.push({
        id: d.id,
        category: 'Doubts',
        title: d.title,
        subtitle: `${d.subjectCode}: ${d.subjectTitle} · ${d.answers.length} answers`,
        targetTab: 'doubts',
        badge: d.isSolved ? 'Solved' : 'Open',
      });
    }
  });

  // 5. Previous Papers
  PREVIOUS_PAPERS.forEach((p) => {
    if (!q || p.title.toLowerCase().includes(q) || p.subjectTitle.toLowerCase().includes(q) || p.examType.toLowerCase().includes(q)) {
      results.push({
        id: p.id,
        category: 'Papers',
        title: p.title,
        subtitle: `${p.examType} · Total Marks: ${p.totalMarks} · ${p.branch}`,
        targetTab: 'papers',
        badge: 'PYQ',
      });
    }
  });

  // 6. Projects
  BRANCH_PROJECTS.forEach((proj) => {
    if (!q || proj.title.toLowerCase().includes(q) || proj.techStack.some(t => t.toLowerCase().includes(q))) {
      results.push({
        id: proj.id,
        category: 'Projects',
        title: proj.title,
        subtitle: `${proj.difficulty} · ${proj.branch} · Stack: ${proj.techStack.slice(0, 3).join(', ')}`,
        targetTab: 'projects',
        badge: proj.difficulty,
      });
    }
  });

  const categories = ['All', 'Subjects', 'Notes', 'Programming', 'Doubts', 'Papers', 'Projects'];
  const filteredResults = activeCategory === 'All' 
    ? results 
    : results.filter(r => r.category === activeCategory);

  const handleSelectResult = (targetTab: NavTab) => {
    setActiveTab(targetTab);
    setIsGlobalSearchOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search subjects, topics, notes, coding problems, papers, doubts..."
            className="w-full text-sm bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsGlobalSearchOpen(false)}
            className="text-xs font-mono px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            ESC
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1 px-4 py-2 bg-slate-50 dark:bg-slate-850/60 border-b border-slate-200 dark:border-slate-800 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-2.5 py-1 text-xs rounded-md whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white font-medium'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60 p-2">
          {filteredResults.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-500 dark:text-slate-400">
              No matching resources found for "{query}". Try searching for algorithms, circuits, SQL, or papers.
            </div>
          ) : (
            filteredResults.slice(0, 25).map((res) => (
              <button
                key={res.id}
                onClick={() => handleSelectResult(res.targetTab)}
                className="w-full flex items-center justify-between p-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 rounded-xl transition-colors text-left group"
              >
                <div className="overflow-hidden pr-3">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                      {res.title}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 shrink-0">
                      {res.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    {res.subtitle}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 shrink-0">
                  <span className="text-[11px] font-medium hidden sm:inline-block">Open</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </button>
            ))
          )}
        </div>

        {/* Footer Hint */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-850/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono">
          <span>{filteredResults.length} matching resources across StudySphere</span>
          <span>Press ESC to dismiss</span>
        </div>
      </div>
    </div>
  );
};
