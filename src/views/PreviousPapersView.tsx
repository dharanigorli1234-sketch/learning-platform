import React, { useState } from 'react';
import { 
  FileQuestion, 
  Download, 
  Search, 
  Calendar, 
  Clock, 
  Check, 
  Layers, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  FileText
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { PREVIOUS_PAPERS, BRANCH_LIST, ALL_SUBJECTS } from '../data/branchesData';
import { EngineeringBranch, AcademicYear, ExamType, PreviousPaper } from '../types';

export const PreviousPapersView: React.FC = () => {
  const { user } = useAuth();

  const [selectedBranch, setSelectedBranch] = useState<EngineeringBranch>(user.branch);
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedSemester, setSelectedSemester] = useState<string>('all');
  const [selectedExamType, setSelectedExamType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedPaperId, setExpandedPaperId] = useState<string | null>(PREVIOUS_PAPERS[0]?.id || null);
  const [downloadSuccessId, setDownloadSuccessId] = useState<string | null>(null);

  // Sync to user branch on change
  React.useEffect(() => {
    setSelectedBranch(user.branch);
  }, [user.branch]);

  const filteredPapers = PREVIOUS_PAPERS.filter((paper) => {
    const matchBranch = selectedBranch === 'Other' || paper.branch === selectedBranch || selectedBranch === 'CSE';
    const matchYear = selectedYear === 'all' || paper.year === selectedYear;
    const matchSemester = selectedSemester === 'all' || String(paper.semester) === selectedSemester;
    const matchExamType = selectedExamType === 'all' || paper.examType === selectedExamType;
    const matchQuery = !searchQuery.trim() || 
      paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.subjectTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.subjectCode.toLowerCase().includes(searchQuery.toLowerCase());
    return matchBranch && matchYear && matchSemester && matchExamType && matchQuery;
  });

  const handleDownload = (paper: PreviousPaper) => {
    setDownloadSuccessId(paper.id);
    setTimeout(() => setDownloadSuccessId(null), 2500);

    const content = `=================================================================
STUDYSPHERE UNIVERSITY EXAMINATION PORTAL
Subject: ${paper.subjectTitle} (${paper.subjectCode})
Branch: ${paper.branch} Engineering | Year: ${paper.year} | Sem: ${paper.semester}
Exam: ${paper.examType} (${paper.examYear})
Total Marks: ${paper.totalMarks} | Duration: ${paper.durationHours} Hours
=================================================================

QUESTIONS:
${paper.questionsSummary.map((q, idx) => `Q${idx + 1}. ${q}`).join('\n\n')}

[End of Question Paper - StudySphere Archive]`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${paper.subjectCode}_${paper.examType.replace(/\s+/g, '_')}_${paper.examYear}.txt`);
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
              Previous Question Papers (PYQs)
            </h1>
            <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300">
              {selectedBranch}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            End-semester, mid-term, supplementary and GATE question paper repository with marks distribution
          </p>
        </div>

        {/* Filters */}
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

          {/* Exam Type */}
          <select
            value={selectedExamType}
            onChange={(e) => setSelectedExamType(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Exam Types</option>
            <option value="End-Sem / University">End-Sem / University</option>
            <option value="Mid-Term">Mid-Term</option>
            <option value="Supplementary">Supplementary</option>
            <option value="GATE / Competitive">GATE / Competitive</option>
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
          placeholder="Search question papers by subject code, topics, or university exam year..."
          className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-850 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Papers Grid */}
      <div className="space-y-4">
        {filteredPapers.length === 0 ? (
          <div className="py-12 px-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 text-center bg-white dark:bg-slate-900">
            <FileQuestion className="w-8 h-8 mx-auto text-slate-400 mb-2" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
              No previous question papers found matching your filters
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-4">
              Try switching exam type to 'All Exam Types' or view CSE, ECE, or Mechanical paper archives.
            </p>
            <button
              onClick={() => { setSelectedBranch('CSE'); setSelectedExamType('all'); setSelectedSemester('all'); }}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredPapers.map((paper) => {
            const isExpanded = expandedPaperId === paper.id;
            const isDownloaded = downloadSuccessId === paper.id;

            return (
              <div
                key={paper.id}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-2xs transition-colors"
              >
                <div className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1.5">
                      <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                        {paper.subjectCode}
                      </span>
                      <span>·</span>
                      <span className="font-mono px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-semibold text-[10px]">
                        {paper.examType}
                      </span>
                      <span>·</span>
                      <span>{paper.examYear}</span>
                      <span>·</span>
                      <span>Semester {paper.semester}</span>
                    </div>

                    <h2 
                      onClick={() => setExpandedPaperId(isExpanded ? null : paper.id)}
                      className="text-base font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors mb-1"
                    >
                      {paper.title}
                    </h2>

                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Subject: <strong className="text-slate-800 dark:text-slate-200">{paper.subjectTitle}</strong> · Total Marks: <span className="font-mono font-bold text-slate-900 dark:text-white">{paper.totalMarks}</span> · Time: {paper.durationHours} Hours
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setExpandedPaperId(isExpanded ? null : paper.id)}
                      className="px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1"
                    >
                      <span>{isExpanded ? 'Hide Questions' : 'Inspect Paper'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      onClick={() => handleDownload(paper)}
                      className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-2xs transition-colors flex items-center gap-1.5"
                    >
                      {isDownloaded ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-300" />
                          <span>Downloaded!</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-3.5 h-3.5" />
                          <span>Download Paper</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Question Details Preview */}
                {isExpanded && (
                  <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider font-semibold text-slate-500">
                      <span>Curated Examination Questions</span>
                      <span>Marks Distribution</span>
                    </div>

                    <div className="divide-y divide-slate-200 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden bg-white dark:bg-slate-850">
                      {paper.questionsSummary.map((q, idx) => (
                        <div key={idx} className="p-3.5 flex items-start gap-3 hover:bg-slate-50/60 dark:hover:bg-slate-800/60 text-xs">
                          <span className="font-mono font-bold text-blue-600 dark:text-blue-400 shrink-0">
                            Q{idx + 1}.
                          </span>
                          <span className="text-slate-700 dark:text-slate-300 leading-relaxed font-sans flex-1">
                            {q}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
