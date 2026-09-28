import React, { useState } from 'react';
import { X, Check, RefreshCw, Cpu, Layers, BookOpen, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { EngineeringBranch, AcademicYear, SemesterNumber } from '../types';
import { BRANCH_LIST, ALL_SUBJECTS } from '../data/branchesData';

interface BranchSwitchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BranchSwitchModal: React.FC<BranchSwitchModalProps> = ({ isOpen, onClose }) => {
  const { user, switchBranchAndYear } = useAuth();

  const [selectedBranch, setSelectedBranch] = useState<EngineeringBranch>(user.branch);
  const [selectedYear, setSelectedYear] = useState<AcademicYear>(user.year);
  const [selectedSemester, setSelectedSemester] = useState<SemesterNumber>(user.semester);

  if (!isOpen) return null;

  const handleApply = () => {
    switchBranchAndYear(selectedBranch, selectedYear, selectedSemester);
    onClose();
  };

  const branchMeta = BRANCH_LIST.find(b => b.code === selectedBranch) || BRANCH_LIST[0];
  const previewSubjects = ALL_SUBJECTS.filter(s => s.branch === selectedBranch);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-7 relative transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
            <RefreshCw className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Dynamic Curriculum Switcher
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Select any engineering branch, academic year, and semester to transform the dashboard.
            </p>
          </div>
        </div>

        {/* Step 1: Select Branch */}
        <div className="mb-6">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider font-mono mb-2.5">
            1. Select Engineering Branch
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {BRANCH_LIST.map((b) => {
              const isSelected = selectedBranch === b.code;
              return (
                <button
                  key={b.code}
                  type="button"
                  onClick={() => setSelectedBranch(b.code)}
                  className={`p-3 rounded-xl border text-left transition-all relative ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/80 dark:bg-blue-950/60 dark:border-blue-500 ring-2 ring-blue-500/20 shadow-xs'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold font-mono text-slate-900 dark:text-white">
                      {b.code}
                    </span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-1 leading-snug">
                    {b.name}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Select Year & Semester */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider font-mono mb-2">
              2. Academic Year
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['1st Year', '2nd Year', '3rd Year', '4th Year'] as AcademicYear[]).map((y) => (
                <button
                  key={y}
                  type="button"
                  onClick={() => {
                    setSelectedYear(y);
                    if (y === '1st Year') setSelectedSemester(1);
                    if (y === '2nd Year') setSelectedSemester(3);
                    if (y === '3rd Year') setSelectedSemester(5);
                    if (y === '4th Year') setSelectedSemester(7);
                  }}
                  className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-colors ${
                    selectedYear === y
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold'
                      : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider font-mono mb-2">
              3. Semester
            </label>
            <div className="grid grid-cols-4 gap-2">
              {([1, 2, 3, 4, 5, 6, 7, 8] as SemesterNumber[]).map((sem) => (
                <button
                  key={sem}
                  type="button"
                  onClick={() => setSelectedSemester(sem)}
                  className={`py-2 text-xs font-mono font-medium rounded-lg border text-center transition-colors ${
                    selectedSemester === sem
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold'
                      : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  Sem {sem}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Preview Box */}
        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850/60 mb-6">
          <div className="text-[11px] font-mono uppercase text-slate-400 dark:text-slate-500 font-semibold mb-1">
            Curriculum Preview
          </div>
          <div className="text-sm font-semibold text-slate-900 dark:text-white mb-1">
            {branchMeta.name} · {selectedYear} (Semester {selectedSemester})
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-2.5">
            {branchMeta.description}
          </p>
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
            <span className="font-semibold text-slate-900 dark:text-slate-200">Featured Languages:</span>
            <span>{branchMeta.primaryLanguages.join(' · ')}</span>
            <span className="text-slate-400">|</span>
            <span className="font-semibold text-slate-900 dark:text-slate-200">Catalog Subjects:</span>
            <span>{previewSubjects.length > 0 ? previewSubjects.map(s => s.title).join(', ') : 'Applied Mathematics, Engineering Physics, C Programming'}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="py-2 px-4 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="py-2 px-5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
          >
            <span>Update Dashboard Content</span>
          </button>
        </div>
      </div>
    </div>
  );
};
