import React from 'react';
import { 
  Search, 
  Sun, 
  Moon, 
  HelpCircle, 
  BookOpen, 
  Menu,
  GraduationCap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onToggleMobileMenu: () => void;
  onOpenAskDoubt: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleMobileMenu, onOpenAskDoubt }) => {
  const { 
    user, 
    isLoggedIn, 
    theme, 
    toggleTheme, 
    setIsGlobalSearchOpen,
    setActiveTab,
    openAuthModal
  } = useAuth();

  return (
    <header className="sticky top-0 z-30 h-16 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="flex h-full items-center justify-between px-4 lg:px-6">
        {/* Zone 1: Mobile burger + Brand title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <button
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                StudySphere
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs font-mono text-blue-600 dark:text-blue-400 font-medium">
                {user.branch} · {user.year}
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Global Search Bar Affordance */}
        <div className="flex-1 max-w-md mx-4 hidden md:block">
          <button
            onClick={() => setIsGlobalSearchOpen(true)}
            className="w-full flex items-center justify-between px-3.5 py-1.5 text-sm text-slate-500 dark:text-slate-400 bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200/70 dark:hover:bg-slate-700/70 rounded-lg border border-slate-200/80 dark:border-slate-700/80 transition-all text-left group"
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
              <span>Search subjects, notes, code, papers...</span>
            </div>
            <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono font-medium text-slate-500 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded shadow-xs">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile search trigger */}
          <button
            onClick={() => setIsGlobalSearchOpen(true)}
            className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Open search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Quick Ask Doubt CTA */}
          <button
            onClick={onOpenAskDoubt}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200 dark:border-blue-800/60 rounded-lg transition-colors whitespace-nowrap"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Ask a Doubt</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="w-4 h-4 text-slate-700" />
            ) : (
              <Sun className="w-4 h-4 text-amber-400" />
            )}
          </button>

          {/* User profile / Login button */}
          {isLoggedIn ? (
            <button
              onClick={() => setActiveTab('profile')}
              className="flex items-center gap-2 pl-1 pr-2 py-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors group"
            >
              <div className="w-7 h-7 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 shrink-0">
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to initial
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div className="hidden xl:block text-left text-xs leading-tight">
                <p className="font-semibold text-slate-900 dark:text-slate-100 truncate max-w-[110px]">
                  {user.name.split(' ')[0]}
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-mono">
                  {user.branch} · Sem {user.semester}
                </p>
              </div>
            </button>
          ) : (
            <button
              onClick={() => openAuthModal('login')}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
