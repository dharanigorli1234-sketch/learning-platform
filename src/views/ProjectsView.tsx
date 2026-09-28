import React, { useState } from 'react';
import { 
  FlaskConical, 
  Search, 
  Bookmark, 
  Clock, 
  Wrench, 
  CheckCircle2, 
  Layers, 
  ArrowRight,
  Code,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { BRANCH_PROJECTS, BRANCH_LIST } from '../data/branchesData';
import { EngineeringBranch, ProjectItem } from '../types';

export const ProjectsView: React.FC = () => {
  const { user, bookmarks, toggleBookmark, isBookmarked } = useAuth();

  const [selectedBranch, setSelectedBranch] = useState<EngineeringBranch>(user.branch);
  const [selectedDifficulty, setSelectedDifficulty] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Sync to user branch on change
  React.useEffect(() => {
    setSelectedBranch(user.branch);
  }, [user.branch]);

  const filteredProjects = BRANCH_PROJECTS.filter((p) => {
    const matchBranch = selectedBranch === 'Other' || p.branch === selectedBranch || selectedBranch === 'CSE';
    const matchDiff = selectedDifficulty === 'All' || p.difficulty === selectedDifficulty;
    const matchSearch = !searchQuery.trim() ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.problemStatement.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchBranch && matchDiff && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Engineering Projects & Capstones
            </h1>
            <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300">
              {selectedBranch}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Portfolio projects categorized by branch: architecture roadmaps, technical stacks, and learning outcomes
          </p>
        </div>

        {/* Filter Controls */}
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

          {/* Difficulty */}
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value as any)}
            className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Difficulty Tiers</option>
            <option value="Beginner">Beginner (1-2 weeks)</option>
            <option value="Intermediate">Intermediate (4 weeks)</option>
            <option value="Advanced">Advanced Capstone (6-8 weeks)</option>
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
          placeholder="Search projects by tech stack (Docker, PyTorch, ESP32, ANSYS, Raft)..."
          className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-850 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Project Cards Grid */}
      <div className="space-y-4">
        {filteredProjects.length === 0 ? (
          <div className="py-12 px-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 text-center bg-white dark:bg-slate-900">
            <FlaskConical className="w-8 h-8 mx-auto text-slate-400 mb-2" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
              No projects found for {selectedBranch} in {selectedDifficulty} tier
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-4">
              Explore projects across other engineering branches or switch to 'All Difficulty Tiers'.
            </p>
            <button
              onClick={() => { setSelectedBranch('CSE'); setSelectedDifficulty('All'); }}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              View CSE Projects
            </button>
          </div>
        ) : (
          filteredProjects.map((proj) => {
            const bookmarked = isBookmarked('projects', proj.id);

            return (
              <div
                key={proj.id}
                className="p-5 sm:p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs hover:border-blue-400 dark:hover:border-blue-500/60 transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        proj.difficulty === 'Beginner'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                          : proj.difficulty === 'Intermediate'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                          : 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300'
                      }`}>
                        {proj.difficulty} Level
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {proj.branch} Engineering · ~{proj.durationWeeks} Weeks
                      </span>
                    </div>

                    <h2 className="text-base font-bold text-slate-900 dark:text-white">
                      {proj.title}
                    </h2>
                  </div>

                  <button
                    onClick={() => toggleBookmark('projects', proj.id)}
                    className="self-end sm:self-auto text-slate-400 hover:text-amber-500 p-1"
                    title="Bookmark project"
                  >
                    <Bookmark className={`w-4 h-4 ${bookmarked ? 'text-amber-500 fill-amber-500' : ''}`} />
                  </button>
                </div>

                {/* Problem Statement */}
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  <strong>Problem Statement: </strong>{proj.problemStatement}
                </p>

                {/* Architecture Overview */}
                <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 text-xs">
                  <div className="font-semibold text-slate-800 dark:text-slate-200 mb-1">
                    System Architecture & Engineering Methodology:
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {proj.architectureOverview}
                  </p>
                </div>

                {/* Tech Stack & Tools */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Tech Stack:
                  </span>
                  {proj.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="font-mono text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                  <span className="text-slate-400 ml-2">|</span>
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Tools:
                  </span>
                  <span className="text-xs text-slate-600 dark:text-slate-400 font-mono">
                    {proj.suggestedTools.join(', ')}
                  </span>
                </div>

                {/* Key Outcomes */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-[11px] uppercase font-mono font-semibold text-slate-400 block mb-1.5">
                    Measurable Learning Outcomes:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {proj.outcomes.map((outcome, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="leading-snug">{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
