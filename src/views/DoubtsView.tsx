import React, { useState } from 'react';
import { 
  HelpCircle, 
  MessageSquare, 
  CheckCircle2, 
  ArrowUp, 
  ArrowDown, 
  Bookmark, 
  Award, 
  Send, 
  Sparkles, 
  Search,
  Filter,
  Code,
  Image as ImageIcon,
  User,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { DoubtItem, DoubtAnswer, EngineeringBranch } from '../types';

interface DoubtsViewProps {
  onOpenAskDoubt: () => void;
}

export const DoubtsView: React.FC<DoubtsViewProps> = ({ onOpenAskDoubt }) => {
  const { 
    user, 
    doubts, 
    voteDoubt, 
    postAnswer, 
    markBestAnswer, 
    voteAnswer, 
    bookmarks, 
    toggleBookmark, 
    isBookmarked 
  } = useAuth();

  const [activeFilter, setActiveFilter] = useState<'all' | 'my-branch' | 'solved' | 'unsolved'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedDoubtId, setExpandedDoubtId] = useState<string | null>(doubts[0]?.id || null);
  const [answerContent, setAnswerContent] = useState<Record<string, string>>({});
  const [answerCodeSnippet, setAnswerCodeSnippet] = useState<Record<string, string>>({});
  const [showCodeInput, setShowCodeInput] = useState<Record<string, boolean>>({});

  const filteredDoubts = doubts.filter((d) => {
    if (activeFilter === 'my-branch' && d.branch !== user.branch) return false;
    if (activeFilter === 'solved' && !d.isSolved) return false;
    if (activeFilter === 'unsolved' && d.isSolved) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        d.title.toLowerCase().includes(q) ||
        d.content.toLowerCase().includes(q) ||
        d.subjectTitle.toLowerCase().includes(q) ||
        d.authorName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handlePostAnswer = (doubtId: string) => {
    const text = answerContent[doubtId];
    if (!text || !text.trim()) return;

    postAnswer(doubtId, text.trim(), answerCodeSnippet[doubtId]?.trim());
    setAnswerContent(prev => ({ ...prev, [doubtId]: '' }));
    setAnswerCodeSnippet(prev => ({ ...prev, [doubtId]: '' }));
    setShowCodeInput(prev => ({ ...prev, [doubtId]: false }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Engineering Doubt Discussions & Q&A
            </h1>
            <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300">
              Community Hub
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Ask technical doubts, share derivations, upvote best peer explanations
          </p>
        </div>

        <button
          onClick={onOpenAskDoubt}
          className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors flex items-center gap-1.5 self-start sm:self-center"
        >
          <HelpCircle className="w-4 h-4" />
          <span>Ask New Doubt</span>
        </button>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-x-auto">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              activeFilter === 'all'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All Doubts ({doubts.length})
          </button>
          <button
            onClick={() => setActiveFilter('my-branch')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              activeFilter === 'my-branch'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            My Branch ({user.branch})
          </button>
          <button
            onClick={() => setActiveFilter('solved')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              activeFilter === 'solved'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Solved Only
          </button>
          <button
            onClick={() => setActiveFilter('unsolved')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              activeFilter === 'unsolved'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Awaiting Answers
          </button>
        </div>

        <div className="relative max-w-xs w-full">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search doubt titles, subjects, or peers..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-850 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Doubts List */}
      <div className="space-y-4">
        {filteredDoubts.length === 0 ? (
          <div className="py-12 px-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 text-center bg-white dark:bg-slate-900">
            <MessageSquare className="w-8 h-8 mx-auto text-slate-400 mb-2" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
              No doubts found in this category
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-4">
              Have an engineering doubt or homework question? Ask the StudySphere community.
            </p>
            <button
              onClick={onOpenAskDoubt}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Post a Doubt
            </button>
          </div>
        ) : (
          filteredDoubts.map((doubt) => {
            const isExpanded = expandedDoubtId === doubt.id;
            const bookmarked = isBookmarked('doubts', doubt.id);

            return (
              <div
                key={doubt.id}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-2xs transition-colors"
              >
                {/* Main Doubt Header Card */}
                <div className="p-4 sm:p-5">
                  <div className="flex items-start gap-3 sm:gap-4">
                    {/* Voting Column */}
                    <div className="flex flex-col items-center justify-center p-1.5 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 shrink-0">
                      <button
                        onClick={() => voteDoubt(doubt.id, 'up')}
                        className={`p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors ${
                          doubt.hasUserUpvoted ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-400'
                        }`}
                        title="Upvote doubt"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <span className="font-mono text-xs font-bold text-slate-900 dark:text-white tabular-nums my-0.5">
                        {doubt.upvotes - doubt.downvotes}
                      </span>
                      <button
                        onClick={() => voteDoubt(doubt.id, 'down')}
                        className={`p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors ${
                          doubt.hasUserDownvoted ? 'text-red-500 font-bold' : 'text-slate-400'
                        }`}
                        title="Downvote doubt"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Content Column */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                          <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                            {doubt.subjectCode}
                          </span>
                          <span>·</span>
                          <span>{doubt.branch}</span>
                          <span>·</span>
                          <span>{doubt.topic}</span>
                          <span>·</span>
                          <span>{doubt.createdAt}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          {doubt.isSolved && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-900">
                              <CheckCircle2 className="w-3 h-3" />
                              Solved
                            </span>
                          )}

                          <button
                            onClick={() => toggleBookmark('doubts', doubt.id)}
                            className="text-slate-400 hover:text-amber-500 p-1"
                            title="Bookmark discussion"
                          >
                            <Bookmark className={`w-4 h-4 ${bookmarked ? 'text-amber-500 fill-amber-500' : ''}`} />
                          </button>
                        </div>
                      </div>

                      <h2 
                        onClick={() => setExpandedDoubtId(isExpanded ? null : doubt.id)}
                        className="text-sm sm:text-base font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors mb-2"
                      >
                        {doubt.title}
                      </h2>

                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                        {doubt.content}
                      </p>

                      {/* Attached Image Preview if available */}
                      {doubt.imageUrl && (
                        <div className="mb-3 max-w-sm rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800">
                          <img 
                            src={doubt.imageUrl} 
                            alt="Doubt Attachment Schematic" 
                            className="w-full h-auto max-h-48 object-cover"
                          />
                        </div>
                      )}

                      {/* Author & Answers Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/80 text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700">
                            <img src={doubt.authorAvatar} alt={doubt.authorName} className="w-full h-full object-cover" />
                          </div>
                          <span className="font-semibold text-slate-700 dark:text-slate-300">
                            {doubt.authorName}
                          </span>
                          <span className="text-slate-400">({doubt.authorBranch} · {doubt.authorYear})</span>
                        </div>

                        <button
                          onClick={() => setExpandedDoubtId(isExpanded ? null : doubt.id)}
                          className="font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>{doubt.answers.length} {doubt.answers.length === 1 ? 'Answer' : 'Answers'}</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Answers Discussion Thread */}
                {isExpanded && (
                  <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-4">
                    <div className="flex items-center justify-between text-xs font-bold font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      <span>Peer Answers ({doubt.answers.length})</span>
                      <span>Upvote highest quality explanations</span>
                    </div>

                    {/* Answers List */}
                    <div className="space-y-3">
                      {doubt.answers.length === 0 ? (
                        <div className="p-4 rounded-lg bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400">
                          No student answers posted yet. Be the first to answer and earn 40 points!
                        </div>
                      ) : (
                        doubt.answers.map((ans) => (
                          <div
                            key={ans.id}
                            className={`p-4 rounded-xl border bg-white dark:bg-slate-850 transition-all ${
                              ans.isBestAnswer
                                ? 'border-emerald-300 dark:border-emerald-800 ring-1 ring-emerald-500/20 shadow-xs'
                                : 'border-slate-200 dark:border-slate-800'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-3 mb-2">
                              <div className="flex items-center gap-2 text-xs">
                                <div className="w-6 h-6 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700">
                                  <img src={ans.authorAvatar} alt={ans.authorName} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                  <span className="font-bold text-slate-900 dark:text-white">
                                    {ans.authorName}
                                  </span>
                                  <span className="text-slate-400 ml-1 text-[11px]">
                                    ({ans.authorBranch} · {ans.authorYear})
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                {ans.isBestAnswer && (
                                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded font-mono">
                                    <Award className="w-3 h-3" />
                                    BEST ANSWER
                                  </span>
                                )}

                                <button
                                  onClick={() => markBestAnswer(doubt.id, ans.id)}
                                  className={`text-[11px] font-medium px-2 py-0.5 rounded transition-colors ${
                                    ans.isBestAnswer
                                      ? 'text-emerald-600 hover:text-emerald-700'
                                      : 'text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
                                  }`}
                                  title="Mark or toggle as Best Answer"
                                >
                                  {ans.isBestAnswer ? 'Unmark Best' : 'Mark as Best'}
                                </button>
                              </div>
                            </div>

                            {/* Answer Body */}
                            <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed space-y-2 whitespace-pre-wrap font-sans">
                              {ans.content}
                            </div>

                            {/* Answer Code Snippet if present */}
                            {ans.codeSnippet && (
                              <div className="mt-2.5 rounded-lg bg-slate-950 text-slate-200 p-3 font-mono text-[11px] overflow-x-auto border border-slate-800">
                                <pre><code>{ans.codeSnippet}</code></pre>
                              </div>
                            )}

                            {/* Answer Voting Footer */}
                            <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                              <span className="text-[11px] text-slate-400">{ans.createdAt}</span>

                              <div className="flex items-center gap-1.5">
                                <button
                                  onClick={() => voteAnswer(doubt.id, ans.id, 'up')}
                                  className={`flex items-center gap-1 px-2 py-0.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-[11px] transition-colors ${
                                    ans.hasUserUpvoted ? 'text-blue-600 font-bold' : 'text-slate-500'
                                  }`}
                                >
                                  <ArrowUp className="w-3 h-3" />
                                  <span>Helpful ({ans.upvotes})</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    {/* Post Answer Form */}
                    <div className="pt-2">
                      <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                            Contribute Your Answer as {user.name}
                          </span>
                          <button
                            type="button"
                            onClick={() => setShowCodeInput(prev => ({ ...prev, [doubt.id]: !prev[doubt.id] }))}
                            className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                          >
                            <Code className="w-3 h-3" />
                            <span>{showCodeInput[doubt.id] ? 'Hide Code Box' : '+ Add Code Snippet'}</span>
                          </button>
                        </div>

                        <textarea
                          rows={3}
                          value={answerContent[doubt.id] || ''}
                          onChange={(e) => setAnswerContent(prev => ({ ...prev, [doubt.id]: e.target.value }))}
                          placeholder="Type step-by-step mathematical explanation, formula derivation, or conceptual clarification..."
                          className="w-full p-2.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 mb-2"
                        />

                        {showCodeInput[doubt.id] && (
                          <textarea
                            rows={3}
                            value={answerCodeSnippet[doubt.id] || ''}
                            onChange={(e) => setAnswerCodeSnippet(prev => ({ ...prev, [doubt.id]: e.target.value }))}
                            placeholder="// Paste C, C++, Python, Verilog or SQL code solution here..."
                            className="w-full p-2.5 font-mono text-[11px] rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-950 text-slate-200 placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-blue-500 mb-2"
                          />
                        )}

                        <div className="flex items-center justify-between">
                          <span className="text-[11px] text-slate-400">
                            Submitting awards +40 StudySphere Scholar points
                          </span>
                          <button
                            type="button"
                            onClick={() => handlePostAnswer(doubt.id)}
                            className="py-1.5 px-4 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
                          >
                            <Send className="w-3 h-3" />
                            <span>Submit Answer</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
