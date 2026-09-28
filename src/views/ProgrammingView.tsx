import React, { useState } from 'react';
import { 
  Code2, 
  Play, 
  Terminal, 
  Check, 
  Copy, 
  Sparkles, 
  HelpCircle, 
  Briefcase, 
  Bookmark, 
  Lightbulb,
  CheckCircle2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ALL_PROGRAMMING_LANGUAGES } from '../data/programmingData';
import { ProgrammingLanguage } from '../types';

export const ProgrammingView: React.FC = () => {
  const { user, bookmarks, toggleBookmark, isBookmarked } = useAuth();

  // Active language
  const [selectedSlug, setSelectedSlug] = useState<string>('c');
  const [activeSubTab, setActiveSubTab] = useState<'syntax' | 'concepts' | 'practice' | 'interview'>('syntax');
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const [isSimulatingRun, setIsSimulatingRun] = useState(false);
  const [simulatedOutput, setSimulatedOutput] = useState<string | null>(null);
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});
  const [showAllLanguages, setShowAllLanguages] = useState(false);

  // Determine recommended languages for student's branch
  const recommendedLanguages = ALL_PROGRAMMING_LANGUAGES.filter(lang => 
    lang.recommendedForBranches.includes(user.branch)
  );

  const displayLanguages = showAllLanguages 
    ? ALL_PROGRAMMING_LANGUAGES 
    : (recommendedLanguages.length > 0 ? recommendedLanguages : ALL_PROGRAMMING_LANGUAGES);

  // Currently selected language
  const currentLanguage: ProgrammingLanguage = ALL_PROGRAMMING_LANGUAGES.find(l => l.slug === selectedSlug) || ALL_PROGRAMMING_LANGUAGES[0];

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  const handleSimulateRun = () => {
    setIsSimulatingRun(true);
    setSimulatedOutput(null);
    setTimeout(() => {
      setIsSimulatingRun(false);
      if (currentLanguage.slug === 'c') {
        setSimulatedOutput('Compiling main.c using gcc -O2...\nExecuting ./main\n>>> Factorial of 5 is 120\n[Process exited 0 in 0.002s]');
      } else if (currentLanguage.slug === 'cpp') {
        setSimulatedOutput('Compiling main.cpp with -std=c++20...\n>>> Sorted elements: 3 7 19 42 88\n[Process completed successfully]');
      } else if (currentLanguage.slug === 'python') {
        setSimulatedOutput('Running Python 3.12 interpreter...\n>>> Eigenvalues: [5. 2.]\n>>> Eigenvectors:\n[[ 0.89442719 -0.70710678]\n [ 0.4472136   0.70710678]]\n[Done]');
      } else if (currentLanguage.slug === 'java') {
        setSimulatedOutput('javac Main.java && java Main\n>>> Priya · CSE (3rd Year)\n[JVM execution completed in 84ms]');
      } else if (currentLanguage.slug === 'sql') {
        setSimulatedOutput('EXPLAIN ANALYZE SELECT...\n+------------+---------------+--------+-----+-------------+\n| student_id | name          | branch | gpa | branch_rank |\n+------------+---------------+--------+-----+-------------+\n| 22CS084    | Priya Sharma  | CSE    | 9.6 | 1           |\n| 22CS012    | Rohan Verma   | CSE    | 9.4 | 2           |\n+------------+---------------+--------+-----+-------------+\n(2 rows retrieved in 1.4ms)');
      } else {
        setSimulatedOutput('Code syntax verified.\nAll test assertions passed successfully.');
      }
    }, 600);
  };

  const toggleSolution = (qId: string) => {
    setRevealedSolutions(prev => ({
      ...prev,
      [qId]: !prev[qId]
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Engineering Programming Hub
            </h1>
            <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300">
              {user.branch} Recommended
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Syntax playgrounds, core concepts, practice tests, and company interview preparation
          </p>
        </div>

        {/* Toggle between Branch Recommended vs All */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <button
            onClick={() => setShowAllLanguages(false)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              !showAllLanguages
                ? 'bg-blue-600 text-white font-semibold shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            For {user.branch} ({recommendedLanguages.length})
          </button>
          <button
            onClick={() => setShowAllLanguages(true)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              showAllLanguages
                ? 'bg-blue-600 text-white font-semibold shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All 8 Languages
          </button>
        </div>
      </div>

      {/* Language Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {displayLanguages.map((lang) => {
          const isSelected = selectedSlug === lang.slug;
          const isRec = lang.recommendedForBranches.includes(user.branch);

          return (
            <button
              key={lang.id}
              onClick={() => {
                setSelectedSlug(lang.slug);
                setSimulatedOutput(null);
              }}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all whitespace-nowrap ${
                isSelected
                  ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 ring-2 ring-blue-500/20'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <span>{lang.name}</span>
              {isRec && !showAllLanguages && (
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
              )}
            </button>
          );
        })}
      </div>

      {/* Language Overview Banner */}
      <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {currentLanguage.name}
              </h2>
              <span className="font-mono text-[11px] text-slate-400">
                {currentLanguage.version}
              </span>
            </div>
            <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mt-0.5">
              {currentLanguage.tagline}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span>Relevant for:</span>
            <span className="font-mono font-medium text-slate-700 dark:text-slate-300">
              {currentLanguage.recommendedForBranches.join(' · ')}
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-4xl">
          {currentLanguage.introduction}
        </p>
      </div>

      {/* Sub-tabs */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl max-w-lg">
        <button
          onClick={() => setActiveSubTab('syntax')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
            activeSubTab === 'syntax'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>Syntax & Runner</span>
        </button>

        <button
          onClick={() => setActiveSubTab('concepts')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
            activeSubTab === 'concepts'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Core Concepts ({currentLanguage.concepts.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('practice')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
            activeSubTab === 'practice'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Practice ({currentLanguage.practiceQuestions.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('interview')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
            activeSubTab === 'interview'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Interview Prep ({currentLanguage.interviewQuestions.length})</span>
        </button>
      </div>

      {/* Sub-tab 1: Basic Syntax & Playground */}
      {activeSubTab === 'syntax' && (
        <div className="space-y-4">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-100 overflow-hidden shadow-lg">
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950/80 border-b border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="font-mono text-slate-400 text-[11px] ml-2">
                  example_{currentLanguage.slug}.{currentLanguage.slug === 'c' ? 'c' : currentLanguage.slug === 'cpp' ? 'cpp' : currentLanguage.slug === 'python' ? 'py' : currentLanguage.slug === 'java' ? 'java' : currentLanguage.slug === 'sql' ? 'sql' : 'txt'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyCode(currentLanguage.syntaxSnippet)}
                  className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white px-2 py-1 rounded hover:bg-slate-800 transition-colors"
                >
                  {copiedSnippet ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSnippet ? 'Copied' : 'Copy'}</span>
                </button>

                <button
                  onClick={handleSimulateRun}
                  disabled={isSimulatingRun}
                  className="flex items-center gap-1 px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[11px] font-semibold transition-colors disabled:opacity-50"
                >
                  <Play className="w-3 h-3 fill-white" />
                  <span>{isSimulatingRun ? 'Executing...' : 'Run Simulation'}</span>
                </button>
              </div>
            </div>

            <pre className="p-4 sm:p-5 font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed">
              <code>{currentLanguage.syntaxSnippet}</code>
            </pre>

            {/* Simulation Terminal Output */}
            {simulatedOutput && (
              <div className="p-4 bg-slate-950 border-t border-slate-800/80 text-xs font-mono">
                <div className="flex items-center gap-2 text-slate-400 text-[11px] mb-1.5">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Simulation Terminal Output:</span>
                </div>
                <pre className="text-emerald-400 whitespace-pre-wrap leading-relaxed text-[11px]">
                  {simulatedOutput}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Sub-tab 2: Important Core Concepts */}
      {activeSubTab === 'concepts' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentLanguage.concepts.map((concept) => (
            <div
              key={concept.id}
              className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between shadow-2xs"
            >
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
                  {concept.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                  {concept.description}
                </p>

                <div className="rounded-lg bg-slate-950 text-slate-200 p-3 font-mono text-[11px] overflow-x-auto mb-3 border border-slate-800">
                  <pre><code>{concept.codeSnippet}</code></pre>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Engineering Insight: </span>
                {concept.explanation}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Sub-tab 3: Practice Questions */}
      {activeSubTab === 'practice' && (
        <div className="space-y-4">
          {currentLanguage.practiceQuestions.map((q) => {
            const isSolvedRevealed = !!revealedSolutions[q.id];
            const bookmarked = isBookmarked('questions', q.id);

            return (
              <div
                key={q.id}
                className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        q.difficulty === 'Easy'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                          : q.difficulty === 'Medium'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                          : 'bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300'
                      }`}>
                        {q.difficulty}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        {q.title}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {q.description}
                    </p>
                  </div>

                  <button
                    onClick={() => toggleBookmark('questions', q.id)}
                    className="text-slate-400 hover:text-amber-500 p-1 rounded"
                    title="Bookmark problem"
                  >
                    <Bookmark className={`w-4 h-4 ${bookmarked ? 'text-amber-500 fill-amber-500' : ''}`} />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 dark:bg-slate-850 p-3 rounded-lg border border-slate-200/80 dark:border-slate-800">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-slate-400 font-semibold block mb-0.5">Sample Input:</span>
                    <code className="font-mono text-slate-800 dark:text-slate-200 text-[11px]">{q.sampleInput}</code>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-slate-400 font-semibold block mb-0.5">Sample Output:</span>
                    <code className="font-mono text-slate-800 dark:text-slate-200 text-[11px]">{q.sampleOutput}</code>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-amber-700 dark:text-amber-300 bg-amber-50/70 dark:bg-amber-950/40 p-2.5 rounded-lg border border-amber-200 dark:border-amber-900/60">
                  <Lightbulb className="w-4 h-4 shrink-0 text-amber-500" />
                  <span><strong>Hint: </strong>{q.hint}</span>
                </div>

                <div>
                  <button
                    onClick={() => toggleSolution(q.id)}
                    className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                  >
                    <span>{isSolvedRevealed ? 'Hide Reference Solution' : 'View Verified Solution'}</span>
                    {isSolvedRevealed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  {isSolvedRevealed && (
                    <div className="mt-2 rounded-lg bg-slate-950 text-slate-200 p-4 font-mono text-xs overflow-x-auto border border-slate-800">
                      <pre><code>{q.solutionCode}</code></pre>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Sub-tab 4: Top Interview Questions */}
      {activeSubTab === 'interview' && (
        <div className="space-y-4">
          {currentLanguage.interviewQuestions.map((iq) => (
            <div
              key={iq.id}
              className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {iq.question}
                </h3>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 font-semibold">
                    {iq.frequency} Ask Frequency
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-850 p-3.5 rounded-lg border border-slate-200/80 dark:border-slate-800">
                {iq.answer}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs pt-1">
                <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Recently asked at:</span>
                  <span className="font-mono text-[11px] text-blue-600 dark:text-blue-400">
                    {iq.companies.join(', ')}
                  </span>
                </div>
                <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                  💡 Tip: {iq.keyTip}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
