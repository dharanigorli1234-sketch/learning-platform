import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Code2, 
  FileText, 
  HelpCircle, 
  MessageSquare, 
  FileQuestion, 
  Video, 
  FlaskConical, 
  BarChart3, 
  Bookmark, 
  UserCircle2,
  RefreshCw,
  Sparkles,
  ChevronRight,
  Flame
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { NavTab } from '../types';

interface SidebarProps {
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  onOpenBranchSwitchModal: () => void;
  onOpenAskDoubt: () => void;
}

interface NavItem {
  id: NavTab | 'ask-doubt-action';
  label: string;
  icon: React.ElementType;
  badge?: string;
  isAction?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  isMobileOpen, 
  onCloseMobile,
  onOpenBranchSwitchModal,
  onOpenAskDoubt
}) => {
  const { activeTab, setActiveTab, user, progress } = useAuth();

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'subjects', label: 'My Subjects', icon: BookOpen, badge: '5 Core' },
    { id: 'programming', label: 'Programming', icon: Code2, badge: '8 Langs' },
    { id: 'notes', label: 'Notes', icon: FileText },
    { id: 'ask-doubt-action', label: 'Ask a Doubt', icon: HelpCircle, isAction: true },
    { id: 'doubts', label: 'Doubt Discussions', icon: MessageSquare },
    { id: 'papers', label: 'Previous Papers', icon: FileQuestion },
    { id: 'resources', label: 'Learning Resources', icon: Video },
    { id: 'projects', label: 'Projects', icon: FlaskConical },
    { id: 'progress', label: 'My Progress', icon: BarChart3 },
    { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark },
    { id: 'profile', label: 'Profile', icon: UserCircle2 },
  ];

  const handleNavClick = (item: NavItem) => {
    if (item.id === 'ask-doubt-action') {
      onOpenAskDoubt();
    } else {
      setActiveTab(item.id as NavTab);
    }
    if (isMobileOpen) {
      onCloseMobile();
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar container */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:top-16 lg:z-20`}
      >
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 dark:text-white">StudySphere</span>
            <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300">
              {user.branch}
            </span>
          </div>
          <button 
            onClick={onCloseMobile}
            className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 p-1"
          >
            Close
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-mono">
            Navigation
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            const isAction = item.isAction;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition-colors group ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold'
                    : isAction
                    ? 'text-amber-700 dark:text-amber-400 hover:bg-amber-50/80 dark:hover:bg-amber-950/40'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <Icon className={`w-4 h-4 shrink-0 transition-transform ${
                    isActive ? 'text-blue-600 dark:text-blue-400 scale-105' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'
                  }`} />
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge && (
                  <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 group-hover:text-slate-600">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Current Branch / Quick Switcher Box */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 shadow-2xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] uppercase font-mono font-semibold text-slate-400 dark:text-slate-500">
                Active Branch
              </span>
              <div className="flex items-center gap-1 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                <Flame className="w-3 h-3 fill-amber-500 text-amber-500" />
                <span>{progress.streakDays}d Streak</span>
              </div>
            </div>

            <div className="text-xs font-semibold text-slate-900 dark:text-white truncate">
              {user.branch} · {user.year}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate mb-2">
              Semester {user.semester} · {user.college}
            </div>

            <button
              onClick={onOpenBranchSwitchModal}
              className="w-full flex items-center justify-center gap-1.5 py-1.5 px-2 text-[11px] font-medium text-slate-700 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded transition-colors"
            >
              <RefreshCw className="w-3 h-3 text-blue-500" />
              <span>Switch Branch / Year</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
