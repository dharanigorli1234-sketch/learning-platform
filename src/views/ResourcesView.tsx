import React, { useState } from 'react';
import { Video, Book, ExternalLink, Star, Search, Filter } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { LEARNING_RESOURCES, BRANCH_LIST } from '../data/branchesData';
import { EngineeringBranch } from '../types';

export const ResourcesView: React.FC = () => {
  const { user } = useAuth();
  const [selectedBranch, setSelectedBranch] = useState<EngineeringBranch>(user.branch);
  const [selectedType, setSelectedType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  React.useEffect(() => {
    setSelectedBranch(user.branch);
  }, [user.branch]);

  const filteredResources = LEARNING_RESOURCES.filter((res) => {
    const matchBranch = selectedBranch === 'Other' || res.branch === selectedBranch || selectedBranch === 'CSE';
    const matchType = selectedType === 'All' || res.type === selectedType;
    const matchSearch = !searchQuery.trim() ||
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.providerOrAuthor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.subjectTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchBranch && matchType && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Curated Video Lectures & Reference Textbooks
            </h1>
            <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300">
              {selectedBranch}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Open-access university lecture courses (MIT OCW, NPTEL, Stanford) and gold-standard engineering textbooks
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
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

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Formats</option>
            <option value="Video Course">Video Courses (MIT / NPTEL)</option>
            <option value="Textbook">Standard Textbooks</option>
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
          placeholder="Search by topic, professor name, or textbook author..."
          className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-850 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredResources.map((res) => (
          <div
            key={res.id}
            className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs hover:border-blue-400 dark:hover:border-blue-500/60 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
                <div className="flex items-center gap-1.5">
                  {res.type === 'Video Course' ? (
                    <Video className="w-3.5 h-3.5 text-blue-500" />
                  ) : (
                    <Book className="w-3.5 h-3.5 text-amber-500" />
                  )}
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{res.type}</span>
                  <span>·</span>
                  <span className="font-mono text-blue-600 dark:text-blue-400">{res.subjectCode}</span>
                </div>

                <div className="flex items-center gap-1 text-amber-500 font-mono text-[11px] font-semibold">
                  <Star className="w-3 h-3 fill-amber-400" />
                  <span>{res.rating}</span>
                </div>
              </div>

              <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
                {res.title}
              </h2>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                {res.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <div>
                <p className="font-medium text-slate-700 dark:text-slate-300 truncate max-w-[200px]">
                  {res.providerOrAuthor}
                </p>
                <p className="text-[11px] text-slate-400 font-mono">
                  {res.durationOrPages}
                </p>
              </div>

              <a
                href={res.url}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 rounded-lg transition-colors flex items-center gap-1"
              >
                <span>Access Resource</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
