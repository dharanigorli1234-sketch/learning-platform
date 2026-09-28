import React, { useState } from 'react';
import { 
  UserCircle2, 
  GraduationCap, 
  Building, 
  Mail, 
  Hash, 
  Calendar, 
  Check, 
  RefreshCw, 
  LogOut, 
  Award, 
  Flame, 
  BookOpen, 
  UserCheck 
} from 'lucide-react';
import { useAuth, DEMO_PROFILES } from '../context/AuthContext';
import { EngineeringBranch, AcademicYear, SemesterNumber } from '../types';
import { BRANCH_LIST } from '../data/branchesData';

export const ProfileView: React.FC = () => {
  const { 
    user, 
    progress, 
    switchBranchAndYear, 
    loadDemoStudent, 
    logout 
  } = useAuth();

  const [editBranch, setEditBranch] = useState<EngineeringBranch>(user.branch);
  const [editYear, setEditYear] = useState<AcademicYear>(user.year);
  const [editSemester, setEditSemester] = useState<SemesterNumber>(user.semester);
  const [saveSuccess, setSaveSuccess] = useState(false);

  React.useEffect(() => {
    setEditBranch(user.branch);
    setEditYear(user.year);
    setEditSemester(user.semester);
  }, [user.branch, user.year, user.semester]);

  const handleSaveAcademicChanges = (e: React.FormEvent) => {
    e.preventDefault();
    switchBranchAndYear(editBranch, editYear, editSemester);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Profile Header Card */}
      <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-colors">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-700 border-2 border-blue-500 shadow-md shrink-0">
            <img 
              src={user.avatarUrl} 
              alt={user.name} 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover" 
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
              <h1 className="text-xl font-bold text-slate-900 dark:text-white truncate">
                {user.name}
              </h1>
              <span className="font-mono text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300">
                {user.branch} · {user.year}
              </span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center sm:justify-start gap-1.5 mb-3">
              <Building className="w-3.5 h-3.5" />
              <span>{user.college}</span>
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-mono">{user.rollNumber}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Semester {user.semester}</span>
              </div>
            </div>
          </div>

          <button
            onClick={logout}
            className="px-3.5 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 hover:bg-red-100 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Quick Demo Student Switcher */}
      <div className="p-5 rounded-2xl border border-blue-200/80 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-950/30">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-900 dark:text-blue-300 font-mono flex items-center gap-1.5">
            <UserCheck className="w-4 h-4 text-blue-600" />
            Switch Active Student Persona (Instant Demo)
          </span>
          <span className="text-[11px] text-blue-700 dark:text-blue-400">
            Click to transform portal to that branch
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {DEMO_PROFILES.map((p) => {
            const isCurrent = user.email === p.email;
            return (
              <button
                key={p.id}
                onClick={() => loadDemoStudent(p.id)}
                className={`p-2.5 rounded-xl border flex items-center gap-2.5 text-left transition-all ${
                  isCurrent
                    ? 'border-blue-600 bg-white dark:bg-slate-850 shadow-xs ring-1 ring-blue-500'
                    : 'border-blue-100 dark:border-slate-800 bg-white/70 dark:bg-slate-900 hover:border-blue-300'
                }`}
              >
                <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700 shrink-0">
                  <img src={p.avatarUrl} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {p.name}
                  </div>
                  <div className="text-[11px] font-mono text-blue-600 dark:text-blue-400 truncate">
                    {p.branch} · {p.year.slice(0, 3)}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Academic Configuration Form */}
      <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Academic Branch & Year Settings
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Modifying these fields dynamically recalibrates your dashboard subjects, notes, and code suggestions
            </p>
          </div>

          {saveSuccess && (
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <Check className="w-4 h-4" />
              <span>Curriculum Updated!</span>
            </span>
          )}
        </div>

        <form onSubmit={handleSaveAcademicChanges} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Engineering Branch
              </label>
              <select
                value={editBranch}
                onChange={(e) => setEditBranch(e.target.value as EngineeringBranch)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              >
                {BRANCH_LIST.map((b) => (
                  <option key={b.code} value={b.code}>
                    {b.code} - {b.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Academic Year
              </label>
              <select
                value={editYear}
                onChange={(e) => setEditYear(e.target.value as AcademicYear)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              >
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Semester
              </label>
              <select
                value={editSemester}
                onChange={(e) => setEditSemester(Number(e.target.value) as SemesterNumber)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                  <option key={s} value={s}>
                    Semester {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="py-2 px-5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Apply & Recalibrate Dashboard</span>
            </button>
          </div>
        </form>
      </div>

      {/* Summary Scorecard */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center shadow-2xs">
          <span className="text-[11px] text-slate-500 uppercase font-mono">Points Earned</span>
          <div className="text-xl font-bold font-mono text-purple-600 dark:text-purple-400 mt-1">
            {progress.pointsEarned}
          </div>
        </div>
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center shadow-2xs">
          <span className="text-[11px] text-slate-500 uppercase font-mono">Streak</span>
          <div className="text-xl font-bold font-mono text-amber-500 mt-1">
            {progress.streakDays} Days
          </div>
        </div>
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center shadow-2xs">
          <span className="text-[11px] text-slate-500 uppercase font-mono">Topics Solved</span>
          <div className="text-xl font-bold font-mono text-blue-600 dark:text-blue-400 mt-1">
            {progress.topicsCompletedCount}
          </div>
        </div>
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center shadow-2xs">
          <span className="text-[11px] text-slate-500 uppercase font-mono">Doubts Answered</span>
          <div className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">
            {progress.doubtsAnsweredCount}
          </div>
        </div>
      </div>
    </div>
  );
};
