export type EngineeringBranch = 
  | 'CSE'
  | 'ECE'
  | 'EEE'
  | 'Mechanical'
  | 'Civil'
  | 'IT'
  | 'AI & ML'
  | 'AI & DS'
  | 'Other';

export type AcademicYear = '1st Year' | '2nd Year' | '3rd Year' | '4th Year';
export type SemesterNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface StudentUser {
  id: string;
  name: string;
  email: string;
  college: string;
  branch: EngineeringBranch;
  year: AcademicYear;
  semester: SemesterNumber;
  avatarUrl: string;
  rollNumber: string;
  joinedDate: string;
}

export interface SubjectTopic {
  id: string;
  title: string;
  unit: number;
  durationMinutes: number;
  hasNotes: boolean;
  hasVideo: boolean;
  isCompleted?: boolean;
  summary: string;
  keyFormulas?: string[];
}

export interface Subject {
  id: string;
  code: string;
  title: string;
  branch: EngineeringBranch;
  semester: SemesterNumber;
  year: AcademicYear;
  credits: number;
  instructor?: string;
  description: string;
  topics: SubjectTopic[];
  totalTopics: number;
  completedTopics: number;
  category: 'Core' | 'Elective' | 'Lab' | 'Foundational';
  iconName: string;
}

export interface ProgrammingConcept {
  id: string;
  title: string;
  description: string;
  codeSnippet: string;
  outputPreview?: string;
  explanation: string;
}

export interface PracticeQuestion {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  sampleInput: string;
  sampleOutput: string;
  hint: string;
  solutionCode: string;
}

export interface InterviewQuestion {
  id: string;
  question: string;
  answer: string;
  frequency: 'High' | 'Very High' | 'Medium';
  companies: string[];
  keyTip: string;
}

export interface ProgrammingLanguage {
  id: string;
  name: string;
  slug: string;
  version: string;
  tagline: string;
  introduction: string;
  recommendedForBranches: EngineeringBranch[];
  syntaxSnippet: string;
  concepts: ProgrammingConcept[];
  practiceQuestions: PracticeQuestion[];
  interviewQuestions: InterviewQuestion[];
}

export interface NoteItem {
  id: string;
  title: string;
  branch: EngineeringBranch;
  year: AcademicYear;
  semester: SemesterNumber;
  subjectCode: string;
  subjectTitle: string;
  topicTitle: string;
  author: string;
  authorCollege: string;
  pages: number;
  downloadsCount: number;
  rating: number;
  updatedDate: string;
  contentMarkdown: string;
  keyTakeaways: string[];
  isBookmarked?: boolean;
}

export interface DoubtAnswer {
  id: string;
  doubtId: string;
  authorName: string;
  authorBranch: EngineeringBranch;
  authorYear: AcademicYear;
  authorAvatar: string;
  isBestAnswer: boolean;
  createdAt: string;
  content: string;
  codeSnippet?: string;
  upvotes: number;
  downvotes: number;
  hasUserUpvoted?: boolean;
  hasUserDownvoted?: boolean;
}

export interface DoubtItem {
  id: string;
  title: string;
  content: string;
  branch: EngineeringBranch;
  subjectCode: string;
  subjectTitle: string;
  topic: string;
  imageUrl?: string;
  authorId: string;
  authorName: string;
  authorBranch: EngineeringBranch;
  authorYear: AcademicYear;
  authorAvatar: string;
  createdAt: string;
  answers: DoubtAnswer[];
  upvotes: number;
  downvotes: number;
  hasUserUpvoted?: boolean;
  hasUserDownvoted?: boolean;
  isSolved: boolean;
  isBookmarked?: boolean;
}

export type ExamType = 'End-Sem / University' | 'Mid-Term' | 'Supplementary' | 'GATE / Competitive';

export interface PreviousPaper {
  id: string;
  title: string;
  branch: EngineeringBranch;
  year: AcademicYear;
  semester: SemesterNumber;
  subjectCode: string;
  subjectTitle: string;
  examType: ExamType;
  examYear: number;
  totalMarks: number;
  durationHours: number;
  questionsSummary: string[];
  downloadUrl: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  branch: EngineeringBranch;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  durationWeeks: number;
  problemStatement: string;
  techStack: string[];
  architectureOverview: string;
  outcomes: string[];
  suggestedTools: string[];
  isBookmarked?: boolean;
}

export interface LearningResource {
  id: string;
  title: string;
  branch: EngineeringBranch;
  subjectCode: string;
  subjectTitle: string;
  type: 'Video Course' | 'Textbook' | 'Interactive Simulator';
  providerOrAuthor: string;
  durationOrPages: string;
  rating: number;
  url: string;
  description: string;
}

export interface UserProgress {
  subjectsCompletedCount: number;
  topicsCompletedCount: number;
  doubtsAskedCount: number;
  doubtsAnsweredCount: number;
  pointsEarned: number;
  streakDays: number;
  rankTitle: string;
  lastActiveDate: string;
  completedTopicIds: string[];
  weeklyActivity: { day: string; hours: number; topics: number }[];
  badges: {
    id: string;
    name: string;
    description: string;
    unlocked: boolean;
    icon: string;
  }[];
}

export type NavTab = 
  | 'dashboard'
  | 'subjects'
  | 'programming'
  | 'notes'
  | 'doubts'
  | 'papers'
  | 'resources'
  | 'projects'
  | 'progress'
  | 'bookmarks'
  | 'profile';
