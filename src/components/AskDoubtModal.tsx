import React, { useState } from 'react';
import { X, HelpCircle, Image as ImageIcon, Sparkles, UploadCloud, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ALL_SUBJECTS } from '../data/branchesData';

interface AskDoubtModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AskDoubtModal: React.FC<AskDoubtModalProps> = ({ isOpen, onClose }) => {
  const { user, postDoubt, setActiveTab } = useAuth();

  // Filter subjects for the student's branch
  const branchSubjects = ALL_SUBJECTS.filter(s => s.branch === user.branch);
  const defaultSubject = branchSubjects[0] || ALL_SUBJECTS[0];

  const [selectedSubjectId, setSelectedSubjectId] = useState(defaultSubject.id);
  const [selectedTopic, setSelectedTopic] = useState(defaultSubject.topics[0]?.title || 'General');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [imagePreviewName, setImagePreviewName] = useState<string>('');

  if (!isOpen) return null;

  const currentSubject = ALL_SUBJECTS.find(s => s.id === selectedSubjectId) || defaultSubject;

  const handleSubjectChange = (subjId: string) => {
    setSelectedSubjectId(subjId);
    const subj = ALL_SUBJECTS.find(s => s.id === subjId);
    if (subj && subj.topics.length > 0) {
      setSelectedTopic(subj.topics[0].title);
    }
  };

  const handleSampleImageSelect = (url: string, name: string) => {
    setImageUrl(url);
    setImagePreviewName(name);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreviewName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    postDoubt({
      title: title.trim(),
      content: content.trim(),
      branch: user.branch,
      subjectCode: currentSubject.code,
      subjectTitle: currentSubject.title,
      topic: selectedTopic,
      imageUrl,
    });

    onClose();
    setActiveTab('doubts');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-7 relative transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Ask an Engineering Doubt
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Get peer explanations, derivations, and solutions from students & faculty.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Subject & Topic Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Subject ({user.branch})
              </label>
              <select
                value={selectedSubjectId}
                onChange={(e) => handleSubjectChange(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              >
                {branchSubjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.code}: {s.title}
                  </option>
                ))}
                {branchSubjects.length === 0 && (
                  <option value="cs301">CS301: Core Computational Principles</option>
                )}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Specific Topic / Unit
              </label>
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              >
                {currentSubject.topics.map((t) => (
                  <option key={t.id} value={t.title}>
                    Unit {t.unit}: {t.title}
                  </option>
                ))}
                <option value="General Lab / Exam Question">General Lab / Exam Question</option>
              </select>
            </div>
          </div>

          {/* Question Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Doubt Title / Question Summary
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Why does Dijkstra algorithm fail when edges have negative weights?"
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Detailed Content */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Detailed Problem Description & What You Tried
            </label>
            <textarea
              required
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Provide background context, test case, circuit schematic notes, formula attempts, or compiler error logs..."
              className="w-full px-3 py-2 text-xs font-sans rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Image / Attachment Upload */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center justify-between">
              <span>Attachment / Schematic (Optional)</span>
              {imagePreviewName && (
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                  Attached: {imagePreviewName}
                </span>
              )}
            </label>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <label className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors text-xs text-slate-600 dark:text-slate-300">
                <UploadCloud className="w-4 h-4 text-blue-500" />
                <span>Choose Diagram / Screenshot</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              {/* Sample Quick Attachments */}
              <button
                type="button"
                onClick={() => handleSampleImageSelect(
                  '/src/assets/images/diagram_engineering_concepts_1790603271136.jpg',
                  'Engineering_Schematic_Ref.png'
                )}
                className="px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors whitespace-nowrap"
              >
                Attach Blueprint Ref
              </button>

              {imageUrl && (
                <button
                  type="button"
                  onClick={() => { setImageUrl(undefined); setImagePreviewName(''); }}
                  className="px-2 py-2 text-xs text-red-600 hover:underline"
                >
                  Remove
                </button>
              )}
            </div>

            {imageUrl && (
              <div className="mt-2 h-24 w-full rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 relative bg-slate-100 dark:bg-slate-800">
                <img src={imageUrl} alt="Attached Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
            >
              <span>Post Doubt to Community</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
