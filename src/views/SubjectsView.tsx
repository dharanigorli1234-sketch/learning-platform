import React, { useState } from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  Circle, 
  Clock, 
  FileText, 
  Search, 
  Filter, 
  ChevronDown, 
  ChevronUp, 
  Download, 
  Layers,
  ArrowRight,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ALL_SUBJECTS, BRANCH_LIST } from '../data/branchesData';
import { Subject, SubjectTopic, EngineeringBranch, SemesterNumber } from '../types';

export const SubjectsView: React.FC = () => {
  const { 
    user, 
    completedTopicIds, 
    toggleTopicCompletion, 
    setActiveTab 
  } = useAuth();

  const [selectedBranch, setSelectedBranch] = useState<EngineeringBranch>(user.branch);
  const [selectedSemester, setSelectedSemester] = useState<number | 'all'>(user.semester);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSubjectId, setExpandedSubjectId] = useState<string | null>(null);
  const [selectedTopicDetail, setSelectedTopicDetail] = useState<SubjectTopic | null>(null);

  // Sync default branch when user branch changes
  React.useEffect(() => {
    setSelectedBranch(user.branch);
    setSelectedSemester(user.semester);
  }, [user.branch, user.semester]);

  // Filter subjects
  const filteredSubjects = ALL_SUBJECTS.filter((s) => {
    const matchBranch = s.branch === selectedBranch;
    const matchSemester = selectedSemester === 'all' || s.semester === selectedSemester;
    const matchSearch = !searchQuery.trim() || 
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.topics.some(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchBranch && matchSemester && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Engineering Subjects & Syllabi
            </h1>
            <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300">
              {selectedBranch}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Topic breakdown, key formulas, lecture notes, and syllabus tracking
          </p>
        </div>

        {/* Quick Filter Bar */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Branch Dropdown */}
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

          {/* Semester Filter */}
          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value === 'all' ? 'all' : Number(e.target.value))}
            className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Semesters</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
              <option key={sem} value={sem}>
                Semester {sem}
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
          placeholder={`Search ${selectedBranch} subjects, unit topics, or subject codes...`}
          className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-850 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Subjects Accordion / Grid */}
      {filteredSubjects.length === 0 ? (
        <div className="py-12 px-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 text-center bg-white dark:bg-slate-900">
          <BookOpen className="w-8 h-8 mx-auto text-slate-400 mb-2" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
            No subjects found for {selectedBranch} in selected semester
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-4">
            Try switching to 'All Semesters' or select another branch like CSE, ECE, or Mechanical to explore comprehensive syllabi.
          </p>
          <button
            onClick={() => { setSelectedBranch('CSE'); setSelectedSemester('all'); }}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            View CSE Core Syllabus
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredSubjects.map((subj) => {
            const isExpanded = expandedSubjectId === subj.id;
            const completedCount = subj.topics.filter(t => completedTopicIds.includes(t.id)).length;
            const percent = Math.round((completedCount / (subj.totalTopics || 1)) * 100);

            return (
              <div
                key={subj.id}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-2xs transition-colors"
              >
                {/* Subject Header */}
                <div 
                  onClick={() => setExpandedSubjectId(isExpanded ? null : subj.id)}
                  className="p-4 sm:p-5 cursor-pointer hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1.5">
                      <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                        {subj.code}
                      </span>
                      <span>·</span>
                      <span>Semester {subj.semester}</span>
                      <span>·</span>
                      <span>{subj.credits} Credits</span>
                      <span>·</span>
                      <span className="text-slate-600 dark:text-slate-300 font-medium">Instructor: {subj.instructor}</span>
                    </div>

                    <h2 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                      {subj.title}
                    </h2>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1">
                      {subj.description}
                    </p>
                  </div>

                  {/* Progress & Toggle */}
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <div className="text-xs font-semibold font-mono text-slate-900 dark:text-white">
                        {completedCount} / {subj.totalTopics} Units Done
                      </div>
                      <div className="w-28 h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 mt-1 overflow-hidden">
                        <div 
                          className="h-full bg-blue-600 rounded-full" 
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>

                    <button
                      className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                      aria-label="Expand subject topics"
                    >
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Topics Accordion Body */}
                {isExpanded && (
                  <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-900/40 space-y-3">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 font-mono uppercase tracking-wider mb-2">
                      <span>Unit Curriculum & Topics</span>
                      <span className="text-slate-400 font-normal">Click checkmark to update syllabus progress</span>
                    </div>

                    <div className="divide-y divide-slate-200 dark:divide-slate-800/80 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden bg-white dark:bg-slate-850">
                      {subj.topics.map((topic) => {
                        const isDone = completedTopicIds.includes(topic.id);
                        return (
                          <div
                            key={topic.id}
                            className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 dark:hover:bg-slate-800/60 transition-colors"
                          >
                            <div className="flex items-start gap-3">
                              <button
                                onClick={() => toggleTopicCompletion(topic.id)}
                                className="mt-0.5 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shrink-0"
                                title={isDone ? 'Mark topic as incomplete' : 'Mark topic as completed'}
                              >
                                {isDone ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-100 dark:fill-emerald-950" />
                                ) : (
                                  <Circle className="w-4 h-4" />
                                )}
                              </button>

                              <div>
                                <div className="flex items-center gap-2 mb-0.5">
                                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                                    Unit {topic.unit}: {topic.title}
                                  </span>
                                  <span className="text-[10px] font-mono text-slate-400">
                                    ~{topic.durationMinutes} mins
                                  </span>
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                  {topic.summary}
                                </p>
                                {topic.keyFormulas && topic.keyFormulas.length > 0 && (
                                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                                    {topic.keyFormulas.map((f, i) => (
                                      <span
                                        key={i}
                                        className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                                      >
                                        {f}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                              <button
                                onClick={() => setActiveTab('notes')}
                                className="px-2.5 py-1 text-[11px] font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors flex items-center gap-1"
                              >
                                <FileText className="w-3 h-3 text-blue-500" />
                                <span>Notes</span>
                              </button>
                              <button
                                onClick={() => setActiveTab('papers')}
                                className="px-2.5 py-1 text-[11px] font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors"
                              >
                                PYQ
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
