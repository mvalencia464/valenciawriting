
import React from 'react';
import { ChecklistItem, AnalysisResults } from '../types';
import { CheckCircle2, Circle, AlertCircle, TrendingUp, BookOpen, PenTool } from 'lucide-react';

interface ChecklistSidebarProps {
  checklist: ChecklistItem[];
  analysis: AnalysisResults | null;
  totalPoints: number;
}

const ChecklistSidebar: React.FC<ChecklistSidebarProps> = ({ checklist, analysis, totalPoints }) => {
  const categories = Array.from(new Set(checklist.map(item => item.category)));

  return (
    <div className="w-96 bg-white border-l flex flex-col h-full shadow-lg">
      <div className="p-6 border-b bg-gradient-to-br from-indigo-50 to-white">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold text-slate-800">Unit 5 Score</h2>
          <span className="text-2xl font-black text-indigo-600">{totalPoints} <span className="text-sm font-normal text-slate-400">/ 65 pts</span></span>
        </div>
        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-indigo-600 h-full transition-all duration-500 ease-out" 
            style={{ width: `${Math.min((totalPoints / 65) * 100, 100)}%` }}
          />
        </div>
        {analysis?.bannedWordsFound && analysis.bannedWordsFound.length > 0 && (
          <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-lg flex items-start gap-2">
            <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={16} />
            <div>
              <p className="text-xs font-bold text-red-800 uppercase tracking-wider">Banned Words Detected</p>
              <p className="text-sm text-red-600">{analysis.bannedWordsFound.join(', ')}</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {categories.map(cat => (
          <div key={cat} className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              {cat === 'Structure' && <BookOpen size={14} />}
              {cat === 'Style' && <PenTool size={14} />}
              {cat === 'Sentence Openers' && <TrendingUp size={14} />}
              {cat}
            </h3>
            <div className="space-y-2">
              {checklist.filter(item => item.category === cat).map(item => (
                <div 
                  key={item.id}
                  className={`group flex items-start gap-3 p-2 rounded-lg transition-colors
                    ${item.status === 'met' ? 'bg-emerald-50' : 'hover:bg-slate-50'}
                  `}
                >
                  <div className="shrink-0 mt-0.5">
                    {item.status === 'met' ? (
                      <CheckCircle2 className="text-emerald-500" size={20} />
                    ) : (
                      <Circle className="text-slate-300 group-hover:text-slate-400" size={20} />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium ${item.status === 'met' ? 'text-emerald-900' : 'text-slate-700'}`}>
                        {item.label}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">
                        {item.points * (item.maxOccurrences ? item.currentOccurrences : (item.status === 'met' ? 1 : 0))} pts
                      </span>
                    </div>
                    {item.maxOccurrences && (
                      <div className="flex gap-1 mt-1">
                        {Array.from({ length: item.maxOccurrences }).map((_, i) => (
                          <div 
                            key={i} 
                            className={`h-1.5 w-full rounded-full ${i < item.currentOccurrences ? 'bg-emerald-400' : 'bg-slate-200'}`} 
                          />
                        ))}
                      </div>
                    )}
                    {item.feedback && (
                      <p className="text-xs text-slate-400 mt-1">{item.feedback}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {analysis?.suggestions && analysis.suggestions.length > 0 && (
          <div className="pt-6 border-t">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">AI Suggestions</h3>
            <ul className="space-y-3">
              {analysis.suggestions.map((s, idx) => (
                <li key={idx} className="text-sm text-slate-600 flex gap-2">
                  <span className="text-indigo-500 font-bold">•</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChecklistSidebar;
