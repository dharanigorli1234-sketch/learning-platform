import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  StudentUser, 
  EngineeringBranch, 
  AcademicYear, 
  SemesterNumber, 
  NavTab, 
  DoubtItem, 
  DoubtAnswer, 
  UserProgress 
} from '../types';
import { INITIAL_DOUBTS } from '../data/branchesData';

export interface DemoProfile {
  id: string;
  name: string;
  email: string;
  college: string;
  branch: EngineeringBranch;
  year: AcademicYear;
  semester: SemesterNumber;
  rollNumber: string;
  avatarUrl: string;
}

export const DEMO_PROFILES: DemoProfile[] = [
  {
    id: 'demo-priya',
    name: 'Priya Sharma',
    email: 'priya.sharma@studysphere.edu',
    college: 'National Institute of Technology',
    branch: 'CSE',
    year: '3rd Year',
    semester: 5,
    rollNumber: '22CS084',
    avatarUrl: '/src/assets/images/avatar_student_default_1790603258956.jpg',
  },
  {
    id: 'demo-rahul',
    name: 'Rahul Varma',
    email: 'rahul.varma@studysphere.edu',
    college: 'Vellore Institute of Technology',
    branch: 'ECE',
    year: '2nd Year',
    semester: 3,
    rollNumber: '23EC142',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 'demo-ananya',
    name: 'Ananya Mukherjee',
    email: 'ananya.m@studysphere.edu',
    college: 'Indian Institute of Information Technology',
    branch: 'AI & ML',
    year: '3rd Year',
    semester: 5,
    rollNumber: '22AI019',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 'demo-vikram',
    name: 'Vikram Joshi',
    email: 'vikram.j@studysphere.edu',
    college: 'Delhi Technological University',
    branch: 'Mechanical',
    year: '4th Year',
    semester: 7,
    rollNumber: '21ME203',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 'demo-aarav',
    name: 'Aarav Patel',
    email: 'aarav.patel@studysphere.edu',
    college: 'College of Engineering Guindy',
    branch: 'Civil',
    year: '2nd Year',
    semester: 4,
    rollNumber: '23CE045',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 'demo-sneha',
    name: 'Sneha Deshmukh',
    email: 'sneha.d@studysphere.edu',
    college: 'College of Engineering Pune',
    branch: 'EEE',
    year: '3rd Year',
    semester: 5,
    rollNumber: '22EE061',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
  },
];

interface BookmarksState {
  notes: string[];
  doubts: string[];
  projects: string[];
  questions: string[];
}

interface AuthContextType {
  user: StudentUser;
  isLoggedIn: boolean;
  isAuthModalOpen: boolean;
  authMode: 'login' | 'register';
  theme: 'light' | 'dark';
  activeTab: NavTab;
  isGlobalSearchOpen: boolean;
  bookmarks: BookmarksState;
  completedTopicIds: string[];
  doubts: DoubtItem[];
  progress: UserProgress;

  // Actions
  setActiveTab: (tab: NavTab) => void;
  openAuthModal: (mode?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  setIsGlobalSearchOpen: (open: boolean) => void;
  toggleTheme: () => void;
  login: (email: string, password?: string) => boolean;
  register: (data: {
    name: string;
    email: string;
    college: string;
    branch: EngineeringBranch;
    year: AcademicYear;
    semester: SemesterNumber;
  }) => void;
  logout: () => void;
  loadDemoStudent: (demoId: string) => void;
  switchBranchAndYear: (branch: EngineeringBranch, year: AcademicYear, semester: SemesterNumber) => void;
  toggleTopicCompletion: (topicId: string) => void;
  toggleBookmark: (type: keyof BookmarksState, id: string) => void;
  isBookmarked: (type: keyof BookmarksState, id: string) => boolean;
  postDoubt: (doubt: {
    title: string;
    content: string;
    branch: EngineeringBranch;
    subjectCode: string;
    subjectTitle: string;
    topic: string;
    imageUrl?: string;
  }) => void;
  voteDoubt: (doubtId: string, direction: 'up' | 'down') => void;
  postAnswer: (doubtId: string, content: string, codeSnippet?: string) => void;
  markBestAnswer: (doubtId: string, answerId: string) => void;
  voteAnswer: (doubtId: string, answerId: string, direction: 'up' | 'down') => void;
}

const DEFAULT_USER: StudentUser = {
  id: 'usr-default-priya',
  name: 'Priya Sharma',
  email: 'priya.sharma@studysphere.edu',
  college: 'National Institute of Technology',
  branch: 'CSE',
  year: '3rd Year',
  semester: 5,
  rollNumber: '22CS084',
  avatarUrl: '/src/assets/images/avatar_student_default_1790603258956.jpg',
  joinedDate: 'August 2024',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('studysphere_theme');
    return saved === 'dark' ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('studysphere_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // User state
  const [user, setUser] = useState<StudentUser>(() => {
    const saved = localStorage.getItem('studysphere_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return DEFAULT_USER;
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState<boolean>(false);

  // Completed topics
  const [completedTopicIds, setCompletedTopicIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('studysphere_completed_topics');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return ['dsa-t1', 'dsa-t2', 'dbms-t1', 'os-t1', 'cn-t1', 'wt-t1'];
  });

  // Bookmarks
  const [bookmarks, setBookmarks] = useState<BookmarksState>(() => {
    const saved = localStorage.getItem('studysphere_bookmarks');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return {
      notes: ['note-1'],
      doubts: ['doubt-1'],
      projects: ['proj-cse-1'],
      questions: ['c-pq-1', 'cpp-pq-1'],
    };
  });

  // Doubts list
  const [doubts, setDoubts] = useState<DoubtItem[]>(() => {
    const saved = localStorage.getItem('studysphere_doubts');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return INITIAL_DOUBTS;
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('studysphere_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('studysphere_completed_topics', JSON.stringify(completedTopicIds));
  }, [completedTopicIds]);

  useEffect(() => {
    localStorage.setItem('studysphere_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem('studysphere_doubts', JSON.stringify(doubts));
  }, [doubts]);

  // Auth actions
  const openAuthModal = (mode: 'login' | 'register' = 'login') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const login = (email: string) => {
    // Check if matches demo profile
    const found = DEMO_PROFILES.find(p => p.email.toLowerCase() === email.toLowerCase());
    if (found) {
      setUser({
        id: found.id,
        name: found.name,
        email: found.email,
        college: found.college,
        branch: found.branch,
        year: found.year,
        semester: found.semester,
        rollNumber: found.rollNumber,
        avatarUrl: found.avatarUrl,
        joinedDate: 'September 2024',
      });
    } else {
      setUser(prev => ({
        ...prev,
        email,
      }));
    }
    setIsLoggedIn(true);
    setIsAuthModalOpen(false);
    return true;
  };

  const register = (data: {
    name: string;
    email: string;
    college: string;
    branch: EngineeringBranch;
    year: AcademicYear;
    semester: SemesterNumber;
  }) => {
    const newUser: StudentUser = {
      id: `usr-${Date.now()}`,
      name: data.name,
      email: data.email,
      college: data.college,
      branch: data.branch,
      year: data.year,
      semester: data.semester,
      rollNumber: `24${data.branch.slice(0, 2).toUpperCase()}${Math.floor(100 + Math.random() * 900)}`,
      avatarUrl: '/src/assets/images/avatar_student_default_1790603258956.jpg',
      joinedDate: 'Just now',
    };
    setUser(newUser);
    setIsLoggedIn(true);
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setIsLoggedIn(false);
    openAuthModal('login');
  };

  const loadDemoStudent = (demoId: string) => {
    const demo = DEMO_PROFILES.find(p => p.id === demoId);
    if (demo) {
      setUser({
        id: demo.id,
        name: demo.name,
        email: demo.email,
        college: demo.college,
        branch: demo.branch,
        year: demo.year,
        semester: demo.semester,
        rollNumber: demo.rollNumber,
        avatarUrl: demo.avatarUrl,
        joinedDate: 'August 2024',
      });
      setIsLoggedIn(true);
      setIsAuthModalOpen(false);
    }
  };

  const switchBranchAndYear = (branch: EngineeringBranch, year: AcademicYear, semester: SemesterNumber) => {
    setUser(prev => ({
      ...prev,
      branch,
      year,
      semester,
    }));
  };

  const toggleTopicCompletion = (topicId: string) => {
    setCompletedTopicIds(prev => {
      if (prev.includes(topicId)) {
        return prev.filter(id => id !== topicId);
      } else {
        return [...prev, topicId];
      }
    });
  };

  const toggleBookmark = (type: keyof BookmarksState, id: string) => {
    setBookmarks(prev => {
      const list = prev[type];
      const nextList = list.includes(id) ? list.filter(item => item !== id) : [...list, id];
      return {
        ...prev,
        [type]: nextList,
      };
    });
  };

  const isBookmarked = (type: keyof BookmarksState, id: string): boolean => {
    return bookmarks[type].includes(id);
  };

  // Doubt Actions
  const postDoubt = (newDoubtData: {
    title: string;
    content: string;
    branch: EngineeringBranch;
    subjectCode: string;
    subjectTitle: string;
    topic: string;
    imageUrl?: string;
  }) => {
    const created: DoubtItem = {
      id: `doubt-${Date.now()}`,
      title: newDoubtData.title,
      content: newDoubtData.content,
      branch: newDoubtData.branch,
      subjectCode: newDoubtData.subjectCode,
      subjectTitle: newDoubtData.subjectTitle,
      topic: newDoubtData.topic,
      imageUrl: newDoubtData.imageUrl,
      authorId: user.id,
      authorName: user.name,
      authorBranch: user.branch,
      authorYear: user.year,
      authorAvatar: user.avatarUrl,
      createdAt: 'Just now',
      answers: [],
      upvotes: 1,
      downvotes: 0,
      hasUserUpvoted: true,
      isSolved: false,
    };
    setDoubts(prev => [created, ...prev]);
  };

  const voteDoubt = (doubtId: string, direction: 'up' | 'down') => {
    setDoubts(prev =>
      prev.map(d => {
        if (d.id !== doubtId) return d;
        let up = d.upvotes;
        let down = d.downvotes;
        let hasUp = d.hasUserUpvoted;
        let hasDown = d.hasUserDownvoted;

        if (direction === 'up') {
          if (hasUp) {
            up -= 1;
            hasUp = false;
          } else {
            up += 1;
            hasUp = true;
            if (hasDown) {
              down -= 1;
              hasDown = false;
            }
          }
        } else {
          if (hasDown) {
            down -= 1;
            hasDown = false;
          } else {
            down += 1;
            hasDown = true;
            if (hasUp) {
              up -= 1;
              hasUp = false;
            }
          }
        }
        return {
          ...d,
          upvotes: up,
          downvotes: down,
          hasUserUpvoted: hasUp,
          hasUserDownvoted: hasDown,
        };
      })
    );
  };

  const postAnswer = (doubtId: string, content: string, codeSnippet?: string) => {
    const newAnswer: DoubtAnswer = {
      id: `ans-${Date.now()}`,
      doubtId,
      authorName: user.name,
      authorBranch: user.branch,
      authorYear: user.year,
      authorAvatar: user.avatarUrl,
      isBestAnswer: false,
      createdAt: 'Just now',
      content,
      codeSnippet,
      upvotes: 0,
      downvotes: 0,
    };

    setDoubts(prev =>
      prev.map(d => {
        if (d.id !== doubtId) return d;
        return {
          ...d,
          answers: [...d.answers, newAnswer],
        };
      })
    );
  };

  const markBestAnswer = (doubtId: string, answerId: string) => {
    setDoubts(prev =>
      prev.map(d => {
        if (d.id !== doubtId) return d;
        return {
          ...d,
          isSolved: true,
          answers: d.answers.map(ans => ({
            ...ans,
            isBestAnswer: ans.id === answerId ? !ans.isBestAnswer : false,
          })),
        };
      })
    );
  };

  const voteAnswer = (doubtId: string, answerId: string, direction: 'up' | 'down') => {
    setDoubts(prev =>
      prev.map(d => {
        if (d.id !== doubtId) return d;
        return {
          ...d,
          answers: d.answers.map(ans => {
            if (ans.id !== answerId) return ans;
            let up = ans.upvotes;
            let down = ans.downvotes;
            let hasUp = ans.hasUserUpvoted;
            let hasDown = ans.hasUserDownvoted;

            if (direction === 'up') {
              if (hasUp) {
                up -= 1;
                hasUp = false;
              } else {
                up += 1;
                hasUp = true;
                if (hasDown) {
                  down -= 1;
                  hasDown = false;
                }
              }
            } else {
              if (hasDown) {
                down -= 1;
                hasDown = false;
              } else {
                down += 1;
                hasDown = true;
                if (hasUp) {
                  up -= 1;
                  hasUp = false;
                }
              }
            }
            return {
              ...ans,
              upvotes: up,
              downvotes: down,
              hasUserUpvoted: hasUp,
              hasUserDownvoted: hasDown,
            };
          }),
        };
      })
    );
  };

  // Progress metrics
  const doubtsAskedCount = doubts.filter(d => d.authorId === user.id).length + 2;
  const doubtsAnsweredCount = doubts.reduce((acc, d) => {
    return acc + d.answers.filter(a => a.authorName === user.name).length;
  }, 1);

  const pointsEarned = completedTopicIds.length * 50 + doubtsAskedCount * 20 + doubtsAnsweredCount * 40 + 320;

  const progress: UserProgress = {
    subjectsCompletedCount: 2,
    topicsCompletedCount: completedTopicIds.length,
    doubtsAskedCount,
    doubtsAnsweredCount,
    pointsEarned,
    streakDays: 7,
    rankTitle: pointsEarned > 600 ? 'Academic Scholar (Top 5%)' : 'Consistent Learner',
    lastActiveDate: 'Today',
    completedTopicIds,
    weeklyActivity: [
      { day: 'Mon', hours: 3.5, topics: 4 },
      { day: 'Tue', hours: 4.2, topics: 3 },
      { day: 'Wed', hours: 2.8, topics: 2 },
      { day: 'Thu', hours: 5.1, topics: 5 },
      { day: 'Fri', hours: 3.9, topics: 3 },
      { day: 'Sat', hours: 6.0, topics: 6 },
      { day: 'Sun', hours: 4.4, topics: 4 },
    ],
    badges: [
      {
        id: 'b1',
        name: 'Curriculum Pioneer',
        description: 'Completed 5+ syllabus topics across your core subjects',
        unlocked: completedTopicIds.length >= 5,
        icon: 'BookOpen',
      },
      {
        id: 'b2',
        name: '7-Day Study Streak',
        description: 'Maintained consecutive daily learning activity',
        unlocked: true,
        icon: 'Flame',
      },
      {
        id: 'b3',
        name: 'Peer Mentor',
        description: 'Contributed high-voted answers to engineering doubts',
        unlocked: doubtsAnsweredCount >= 1,
        icon: 'Award',
      },
      {
        id: 'b4',
        name: 'Polyglot Engineer',
        description: 'Explored programming concepts across multiple languages',
        unlocked: true,
        icon: 'Code',
      },
    ],
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        isAuthModalOpen,
        authMode,
        theme,
        activeTab,
        isGlobalSearchOpen,
        bookmarks,
        completedTopicIds,
        doubts,
        progress,
        setActiveTab,
        openAuthModal,
        closeAuthModal,
        setIsGlobalSearchOpen,
        toggleTheme,
        login,
        register,
        logout,
        loadDemoStudent,
        switchBranchAndYear,
        toggleTopicCompletion,
        toggleBookmark,
        isBookmarked,
        postDoubt,
        voteDoubt,
        postAnswer,
        markBestAnswer,
        voteAnswer,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
