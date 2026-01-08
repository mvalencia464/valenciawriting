
import React from 'react';
import {
  Bold, Italic, List, ListOrdered, AlignLeft,
  AlignCenter, AlignRight, Type, Sparkles, Wand2
} from 'lucide-react';

interface ToolbarProps {
  onCheck: () => void;
  isAnalyzing: boolean;
  onFormat: (command: string, value?: string) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onCheck, isAnalyzing, onFormat }) => {
  return (
    <div className="flex items-center justify-between p-2 border-b bg-white sticky top-0 z-10 shadow-sm">
      <div className="flex items-center gap-1">
        <div className="flex items-center gap-0.5 px-2 border-r pr-4">
          <button onClick={() => onFormat('bold')} className="p-2 hover:bg-slate-100 rounded-md transition-colors text-slate-600"><Bold size={18} /></button>
          <button onClick={() => onFormat('italic')} className="p-2 hover:bg-slate-100 rounded-md transition-colors text-slate-600"><Italic size={18} /></button>
          <button className="p-2 hover:bg-slate-100 rounded-md transition-colors text-slate-600"><Type size={18} /></button>
        </div>

        <div className="flex items-center gap-0.5 px-4 border-r pr-4">
          <button onClick={() => onFormat('justifyLeft')} className="p-2 hover:bg-slate-100 rounded-md transition-colors text-slate-600"><AlignLeft size={18} /></button>
          <button onClick={() => onFormat('justifyCenter')} className="p-2 hover:bg-slate-100 rounded-md transition-colors text-slate-600"><AlignCenter size={18} /></button>
          <button onClick={() => onFormat('justifyRight')} className="p-2 hover:bg-slate-100 rounded-md transition-colors text-slate-600"><AlignRight size={18} /></button>
        </div>

        <div className="flex items-center gap-0.5 px-4">
          <button onClick={() => onFormat('insertUnorderedList')} className="p-2 hover:bg-slate-100 rounded-md transition-colors text-slate-600"><List size={18} /></button>
          <button onClick={() => onFormat('insertOrderedList')} className="p-2 hover:bg-slate-100 rounded-md transition-colors text-slate-600"><ListOrdered size={18} /></button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onCheck}
          disabled={isAnalyzing}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm shadow-sm transition-all
            ${isAnalyzing
              ? 'bg-indigo-50 text-indigo-300 cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95'
            }`}
        >
          {isAnalyzing ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles size={16} />
              Check Requirements
            </>
          )}
        </button>

        <button className="flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm transition-all active:scale-95">
          <Wand2 size={16} />
          Grammar Hints
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
