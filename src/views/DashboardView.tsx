import React from 'react';
import { 
  BookOpen, 
  Code2, 
  Flame, 
  Award, 
  HelpCircle, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Sparkles, 
  ChevronRight,
  ExternalLink,
  Laptop,
  Compass,
  FileQuestion,
  FlaskConical,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ALL_SUBJECTS, BRANCH_LIST, PREVIOUS_PAPERS, BRANCH_PROJECTS } from '../data/branchesData';
import { ALL_PROGRAMMING_LANGUAGES } from '../data/programmingData';

interface DashboardViewProps {
  onOpenBranchSwitchModal: () => void;
  onOpenAskDoubt: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ 
  onOpenBranchSwitchModal,
  onOpenAskDoubt
}) => {
  const { 
    user, 
    progress, 
    setActiveTab, 
    doubts, 
    completedTopicIds, 
    toggleTopicCompletion 
  } = useAuth();

  // Filter subjects for current user branch
  const branchSubjects = ALL_SUBJECTS.filter(s => s.branch === user.branch);
  const currentBranchInfo = BRANCH_LIST.find(b => b.code === user.branch) || BRANCH_LIST[0];

  // Prioritize programming languages for current branch
  const prioritizedLanguages = ALL_PROGRAMMING_LANGUAGES.filter(lang => 
    lang.recommendedForBranches.includes(user.branch)
  );

  // Fallback to all if none specifically matched
  const displayLanguages = prioritizedLanguages.length > 0 
    ? prioritizedLanguages 
    : ALL_PROGRAMMING_LANGUAGES.slice(0, 4);

  // Relevant papers and projects
  const relevantPapers = PREVIOUS_PAPERS.filter(p => p.branch === user.branch);
  const relevantProjects = BRANCH_PROJECTS.filter(p => p.branch === user.branch);
  const branchDoubts = doubts.filter(d => d.branch === user.branch || d.branch === 'CSE');

  // Overall syllabus progress calculation
  const totalTopicsInBranch = branchSubjects.reduce((acc, s) => acc + s.totalTopics, 0) || 12;
  const branchCompletedTopics = branchSubjects.reduce((acc, s) => {
    return acc + s.topics.filter(t => completedTopicIds.includes(t.id)).length;
  }, 0);
  const syllabusPercent = Math.min(100, Math.round((branchCompletedTopics / totalTopicsInBranch) * 100));

  return (
    <div className="space-y-6">
      {/* 1. Personalized Greeting Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 text-white p-6 sm:p-8 shadow-lg">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-72 h-72 rounded-full bg-white/5 blur-2xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-mono font-medium text-blue-100 mb-3 border border-white/10">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Personalized Portal for {user.branch} Engineering</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2 text-balance">
              Welcome back, {user.name}
            </h1>
            <p className="text-sm text-blue-100/90 leading-relaxed max-w-xl">
              Currently navigating <strong className="text-white">{user.year} (Semester {user.semester})</strong> at {user.college}. Here is your tailored syllabus, programming modules, and recent peer doubts.
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-4 text-xs">
              <button
                onClick={onOpenBranchSwitchModal}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-slate-900 font-semibold hover:bg-blue-50 transition-colors shadow-xs"
              >
                <RefreshCw className="w-3.5 h-3.5 text-blue-600" />
                <span>Switch Branch / Year</span>
              </button>
              <button
                onClick={() => setActiveTab('subjects')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 text-white font-medium hover:bg-white/20 transition-colors border border-white/20"
              >
                <span>View Full Curriculum</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Progress Ring / Card */}
          <div className="bg-white/10 backdrop-blur-md border border-white/15 p-4 rounded-xl flex items-center gap-4 shrink-0 sm:min-w-[240px]">
            <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-white/20"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-emerald-400"
                  strokeDasharray={`${syllabusPercent}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute font-mono font-bold text-sm text-white">
                {syllabusPercent}%
              </span>
            </div>
            <div>
              <div className="text-xs uppercase font-mono tracking-wider text-blue-200">
                Syllabus Done
              </div>
              <div className="text-sm font-bold text-white">
                {branchCompletedTopics} of {totalTopicsInBranch} Units
              </div>
              <div className="text-[11px] text-blue-200/80">
                Sem {user.semester} Academic Target
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Key Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-medium">Completed Topics</span>
            <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
            {completedTopicIds.length}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Across engineering catalog
          </p>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-medium">Learning Streak</span>
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums flex items-baseline gap-1">
            <span>{progress.streakDays}</span>
            <span className="text-xs font-normal text-slate-500">days active</span>
          </div>
          <p className="text-[11px] text-amber-600 dark:text-amber-400 font-medium mt-1">
            🔥 Keep it up today
          </p>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-medium">Doubts Asked & Solved</span>
            <HelpCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
            {progress.doubtsAskedCount} / {progress.doubtsAnsweredCount}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Peer collaboration ratio
          </p>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-medium">StudySphere Score</span>
            <Award className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
            {progress.pointsEarned}
          </div>
          <p className="text-[11px] text-purple-600 dark:text-purple-400 font-medium mt-1">
            {progress.rankTitle}
          </p>
        </div>
      </div>

      {/* 3. Personalized Core Subjects for this Branch & Year */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Curriculum Core Subjects ({user.branch} · {user.year})
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Selected by academic board for Semester {user.semester}
            </p>
          </div>
          <button
            onClick={() => setActiveTab('subjects')}
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <span>View All Subjects</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {branchSubjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {branchSubjects.map((subj) => {
              const completedCount = subj.topics.filter(t => completedTopicIds.includes(t.id)).length;
              const percent = Math.round((completedCount / (subj.totalTopics || 1)) * 100);

              return (
                <div
                  key={subj.id}
                  className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-400 dark:hover:border-blue-500/60 transition-all flex flex-col justify-between shadow-2xs group"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                      <span className="font-mono font-semibold text-blue-600 dark:text-blue-400">
                        {subj.code}
                      </span>
                      <span>{subj.credits} Credits · {subj.category}</span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {subj.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
                      {subj.description}
                    </p>
                  </div>

                  <div>
                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="text-slate-600 dark:text-slate-400">
                          {completedCount} of {subj.totalTopics} Topics Completed
                        </span>
                        <span className="font-mono font-semibold text-slate-900 dark:text-white">
                          {percent}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div 
                          className="h-full rounded-full bg-blue-600 transition-all duration-300"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-slate-400">
                        {subj.instructor}
                      </span>
                      <button
                        onClick={() => setActiveTab('subjects')}
                        className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 flex items-center gap-1"
                      >
                        <span>Syllabus</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-6 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 text-center bg-white dark:bg-slate-900">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
              Detailed specialized modules for {user.branch} are being assembled. Common first-year subjects (Math, Mechanics, Physics, C Programming) are available.
            </p>
            <button
              onClick={() => setActiveTab('subjects')}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Browse General Engineering Catalog
            </button>
          </div>
        )}
      </section>

      {/* 4. Branch-Prioritized Programming Languages Row */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Recommended Coding Modules for {user.branch}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Industry standard languages tailored to your department career paths
            </p>
          </div>
          <button
            onClick={() => setActiveTab('programming')}
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <span>Explore All 8 Languages</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {displayLanguages.map((lang) => (
            <div
              key={lang.id}
              onClick={() => setActiveTab('programming')}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-xs transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {lang.name}
                </span>
                <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
                  {lang.version.split(' ')[0]}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-3">
                {lang.tagline}
              </p>
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span>{lang.concepts.length} Core Concepts</span>
                <span className="text-blue-600 dark:text-blue-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                  Practice →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Split Section: Community Doubts & Previous Papers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Doubts Column */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Active Peer Doubts & Discussions
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Questions from your peers and professors
              </p>
            </div>
            <button
              onClick={onOpenAskDoubt}
              className="px-2.5 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200 dark:border-blue-900"
            >
              + Ask Doubt
            </button>
          </div>

          <div className="space-y-3">
            {branchDoubts.slice(0, 3).map((d) => (
              <div
                key={d.id}
                onClick={() => setActiveTab('doubts')}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{d.authorName}</span>
                    <span>·</span>
                    <span className="font-mono text-[10px] text-blue-600 dark:text-blue-400">{d.branch}</span>
                    <span>·</span>
                    <span>{d.createdAt}</span>
                  </div>
                  {d.isSolved && (
                    <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Solved
                    </span>
                  )}
                </div>

                <h3 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-2">
                  {d.title}
                </h3>

                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <span>{d.subjectCode}: {d.topic}</span>
                  <span className="font-mono font-medium">
                    {d.answers.length} {d.answers.length === 1 ? 'Answer' : 'Answers'} · ▲ {d.upvotes}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Papers & Projects Column */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Exam Papers & Engineering Projects
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Exam archives & portfolio build ideas for {user.branch}
              </p>
            </div>
            <button
              onClick={() => setActiveTab('papers')}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Browse All
            </button>
          </div>

          <div className="space-y-3">
            {/* Paper preview item */}
            {relevantPapers.slice(0, 1).map((p) => (
              <div
                key={p.id}
                onClick={() => setActiveTab('papers')}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5">
                  <span className="font-mono text-amber-600 dark:text-amber-400 font-semibold">{p.examType}</span>
                  <span>{p.examYear} · {p.totalMarks} Marks</span>
                </div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1">
                  {p.title}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                  Includes full questions on {p.questionsSummary[0]?.slice(0, 70)}...
                </p>
              </div>
            ))}

            {/* Project preview item */}
            {relevantProjects.slice(0, 1).map((proj) => (
              <div
                key={proj.id}
                onClick={() => setActiveTab('projects')}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5">
                  <span className="font-mono text-purple-600 dark:text-purple-400 font-semibold">{proj.difficulty} Level Project</span>
                  <span>{proj.durationWeeks} Weeks</span>
                </div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1">
                  {proj.title}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                  Tech stack: {proj.techStack.join(', ')}
                </p>
              </div>
            ))}

            {/* Quick Notes CTA */}
            <div
              onClick={() => setActiveTab('notes')}
              className="p-3.5 rounded-xl border border-blue-100 dark:border-blue-900/60 bg-blue-50/50 dark:bg-blue-950/20 flex items-center justify-between hover:bg-blue-50 dark:hover:bg-blue-950/40 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    Download Curated Revision Notes & Cheat Sheets
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    Formula sheets and exam summaries for {user.branch}
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-blue-600" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
