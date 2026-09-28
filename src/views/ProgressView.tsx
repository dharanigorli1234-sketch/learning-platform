import React from 'react';
import { 
  Award, 
  Flame, 
  BookOpen, 
  HelpCircle, 
  CheckCircle2, 
  TrendingUp, 
  BarChart2, 
  Target,
  Sparkles,
  Calendar,
  Layers
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ALL_SUBJECTS } from '../data/branchesData';

export const ProgressView: React.FC = () => {
  const { user, progress, completedTopicIds, doubts } = useAuth();

  const branchSubjects = ALL_SUBJECTS.filter(s => s.branch === user.branch);
  const totalTopicsInBranch = branchSubjects.reduce((acc, s) => acc + s.totalTopics, 0) || 12;
  const branchCompletedCount = branchSubjects.reduce((acc, s) => {
    return acc + s.topics.filter(t => completedTopicIds.includes(t.id)).length;
  }, 0);

  const overallPercent = Math.min(100, Math.round((branchCompletedCount / totalTopicsInBranch) * 100));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">
            Academic Progress & Achievements
          </h1>
          <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300">
            {user.branch} · {user.year}
          </span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Curriculum completion, learning streaks, peer contributions, and mastery milestones
        </p>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Card 1: Overall Syllabus */}
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Syllabus Progress</span>
            <Target className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
            {overallPercent}%
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-850 mt-2 overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full" style={{ width: `${overallPercent}%` }} />
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
            {branchCompletedCount} of {totalTopicsInBranch} units completed
          </p>
        </div>

        {/* Card 2: Streak */}
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Learning Streak</span>
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
            {progress.streakDays} Days
          </div>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-2 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Active every day this week</span>
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Next milestone at 10 days
          </p>
        </div>

        {/* Card 3: Doubts Collaboration */}
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Doubts Asked / Answered</span>
            <HelpCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
            {progress.doubtsAskedCount} / {progress.doubtsAnsweredCount}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
            Community peer mentor score
          </p>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-0.5 font-medium">
            +40 pts per verified answer
          </p>
        </div>

        {/* Card 4: StudySphere Points */}
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Total Points</span>
            <Award className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
            {progress.pointsEarned}
          </div>
          <p className="text-[11px] text-purple-600 dark:text-purple-400 font-medium mt-2">
            {progress.rankTitle}
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Top 5% among {user.branch} students
          </p>
        </div>
      </div>

      {/* Visual Analytics Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Study Activity Bar Chart */}
        <div className="p-5 sm:p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Weekly Study Activity (Hours Spent)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Daily study session duration and topic completions
              </p>
            </div>
            <span className="text-xs font-mono font-semibold text-blue-600 dark:text-blue-400">
              30.6 Hours Total
            </span>
          </div>

          {/* SVG Bar Chart */}
          <div className="h-44 w-full flex items-end justify-between gap-2 pt-6 pb-2 px-2 border-b border-slate-100 dark:border-slate-800">
            {progress.weeklyActivity.map((item, idx) => {
              const maxHours = 7;
              const heightPercent = Math.round((item.hours / maxHours) * 100);

              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                  <span className="text-[10px] font-mono text-slate-400 group-hover:text-blue-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.hours}h
                  </span>
                  <div className="w-full max-w-[32px] bg-slate-100 dark:bg-slate-800 rounded-t-md h-full flex items-end overflow-hidden">
                    <div
                      className="w-full bg-blue-600 dark:bg-blue-500 rounded-t-md group-hover:bg-blue-700 transition-all duration-300"
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                  <span className="text-xs font-mono text-slate-600 dark:text-slate-400 font-medium">
                    {item.day}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-3 text-xs text-slate-500 dark:text-slate-400 font-mono">
            <span>Average: 4.4 hrs/day</span>
            <span>Target: 3.5 hrs/day (+25% ahead)</span>
          </div>
        </div>

        {/* Core Subject Completion Breakdown */}
        <div className="p-5 sm:p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Core Subject Completion Matrix
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Detailed syllabus breakdown for {user.branch}
              </p>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Semester {user.semester}
            </span>
          </div>

          <div className="space-y-3.5">
            {branchSubjects.map((subj) => {
              const completedCount = subj.topics.filter(t => completedTopicIds.includes(t.id)).length;
              const percent = Math.round((completedCount / (subj.totalTopics || 1)) * 100);

              return (
                <div key={subj.id} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[200px] sm:max-w-xs">
                      {subj.code}: {subj.title}
                    </span>
                    <span className="font-mono text-slate-500 dark:text-slate-400">
                      {completedCount}/{subj.totalTopics} Units ({percent}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${
                        percent === 100 
                          ? 'bg-emerald-500' 
                          : percent > 50 
                          ? 'bg-blue-600' 
                          : 'bg-amber-500'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Badges & Recognition Grid */}
      <div className="p-5 sm:p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-4">
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">
            Unlocked Academic Badges
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Milestones earned through curriculum mastery and peer collaboration
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {progress.badges.map((badge) => (
            <div
              key={badge.id}
              className={`p-4 rounded-xl border transition-all flex items-start gap-3 ${
                badge.unlocked
                  ? 'border-purple-200 dark:border-purple-900/60 bg-purple-50/40 dark:bg-purple-950/20'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/30 opacity-60'
              }`}
            >
              <div className="w-9 h-9 rounded-lg bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                    {badge.name}
                  </h3>
                  {badge.unlocked && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                  )}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                  {badge.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
