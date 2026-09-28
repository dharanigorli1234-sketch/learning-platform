import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { AuthModal } from './components/AuthModal';
import { BranchSwitchModal } from './components/BranchSwitchModal';
import { AskDoubtModal } from './components/AskDoubtModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';

// Views
import { DashboardView } from './views/DashboardView';
import { SubjectsView } from './views/SubjectsView';
import { ProgrammingView } from './views/ProgrammingView';
import { NotesView } from './views/NotesView';
import { DoubtsView } from './views/DoubtsView';
import { PreviousPapersView } from './views/PreviousPapersView';
import { ProjectsView } from './views/ProjectsView';
import { ResourcesView } from './views/ResourcesView';
import { ProgressView } from './views/ProgressView';
import { BookmarksView } from './views/BookmarksView';
import { ProfileView } from './views/ProfileView';

const MainLayout: React.FC = () => {
  const { activeTab } = useAuth();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false);
  const [isAskDoubtModalOpen, setIsAskDoubtModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        onToggleMobileMenu={() => setIsMobileSidebarOpen(prev => !prev)}
        onOpenAskDoubt={() => setIsAskDoubtModalOpen(true)}
      />

      <div className="flex-1 flex w-full">
        {/* Sidebar */}
        <Sidebar
          isMobileOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
          onOpenBranchSwitchModal={() => setIsBranchModalOpen(true)}
          onOpenAskDoubt={() => setIsAskDoubtModalOpen(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1 w-full lg:pl-64 min-w-0 flex flex-col transition-all">
          <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {activeTab === 'dashboard' && (
              <DashboardView 
                onOpenBranchSwitchModal={() => setIsBranchModalOpen(true)}
                onOpenAskDoubt={() => setIsAskDoubtModalOpen(true)}
              />
            )}
            {activeTab === 'subjects' && <SubjectsView />}
            {activeTab === 'programming' && <ProgrammingView />}
            {activeTab === 'notes' && <NotesView />}
            {activeTab === 'doubts' && (
              <DoubtsView onOpenAskDoubt={() => setIsAskDoubtModalOpen(true)} />
            )}
            {activeTab === 'papers' && <PreviousPapersView />}
            {activeTab === 'projects' && <ProjectsView />}
            {activeTab === 'resources' && <ResourcesView />}
            {activeTab === 'progress' && <ProgressView />}
            {activeTab === 'bookmarks' && <BookmarksView />}
            {activeTab === 'profile' && <ProfileView />}
          </div>

          {/* Minimalist Footnote (Anti-Slop compliant) */}
          <footer className="py-5 px-6 border-t border-slate-200 dark:border-slate-800/80 text-center text-xs text-slate-500 dark:text-slate-400 font-sans">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto">
              <span>StudySphere Student Learning Portal · University Engineering Academic Hub</span>
              <span className="font-mono text-[11px] text-slate-400">
                Curriculums synchronized for CSE, ECE, EEE, Mechanical, Civil, IT, AI & ML, AI & DS
              </span>
            </div>
          </footer>
        </main>
      </div>

      {/* Modals & Dialogs */}
      <AuthModal />
      <BranchSwitchModal
        isOpen={isBranchModalOpen}
        onClose={() => setIsBranchModalOpen(false)}
      />
      <AskDoubtModal
        isOpen={isAskDoubtModalOpen}
        onClose={() => setIsAskDoubtModalOpen(false)}
      />
      <GlobalSearchModal />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}
