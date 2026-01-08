
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { INITIAL_CHECKLIST } from './constants';
import { ChecklistItem, AnalysisResults, AnalysisStatus } from './types';
import { analyzeComposition } from './services/gemini';
import Toolbar from './components/Toolbar';
import ChecklistSidebar from './components/ChecklistSidebar';
import { FileText, Save, Share2, Settings, History, Activity } from 'lucide-react';

const App: React.FC = () => {
  const [text, setText] = useState<string>(`A Roman Chariot Race

The dusty arena buzzed with excitement as the massive crowd waited for the start. Four chariots stood poised at the white line. Because the horses were powerful, they strained against their leather harnesses. 

When the magistrate dropped the white cloth, the race began. Suddenly, a brave driver used his strong whip to encourage his steeds. He steered which chariot was fastest toward the narrow curve. One chariot crashed into the wall because the turn was too sharp. 

In the end, the crowd cheered wildly for the victor. The brave driver raised his laurel crown to the sky. He had survived the dangerous Roman chariot race.`);

  const [checklist, setChecklist] = useState<ChecklistItem[]>(INITIAL_CHECKLIST);
  const [analysisStatus, setAnalysisStatus] = useState<AnalysisStatus>(AnalysisStatus.Idle);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null);
  const lastAnalyzedText = useRef<string>('');
  const analysisCount = useRef<number>(0);
  const editorRef = useRef<HTMLDivElement>(null);

  const totalPoints = useMemo(() => {
    let score = 0;
    checklist.forEach(item => {
      if (item.maxOccurrences) {
        score += item.points * item.currentOccurrences;
      } else if (item.status === 'met') {
        score += item.points;
      }
    });

    // Subtract points for banned words
    if (analysisResults?.bannedWordsFound) {
      score -= analysisResults.bannedWordsFound.length;
    }

    return Math.max(score, 0);
  }, [checklist, analysisResults]);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerText !== text) {
      if (editorRef.current.innerText.trim() === '') {
        editorRef.current.innerText = text;
      }
    }
  }, []);

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      setText(editorRef.current.innerText);
    }
  }, []);

  const handleFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const runAnalysis = useCallback(async (currentText: string) => {
    if (!currentText.trim() || currentText === lastAnalyzedText.current) return;

    const currentRequestId = ++analysisCount.current;
    setAnalysisStatus(AnalysisStatus.Analyzing);

    const results = await analyzeComposition(currentText);

    // Only update if this is the most recent request
    if (currentRequestId === analysisCount.current) {
      if (results) {
        lastAnalyzedText.current = currentText;
        setAnalysisResults(results);
        setChecklist(prev => prev.map(item => {
          const found = results.items.find((i: any) => i.id === item.id);
          if (found) {
            return {
              ...item,
              status: found.status,
              currentOccurrences: found.currentOccurrences,
              feedback: found.feedback
            };
          }
          return item;
        }));
        setAnalysisStatus(AnalysisStatus.Done);
      } else {
        setAnalysisStatus(AnalysisStatus.Error);
      }
    }
  }, [analysisStatus]);

  // Real-time debounced analysis
  useEffect(() => {
    const timer = setTimeout(() => {
      runAnalysis(text);
    }, 2000); // 2 second debounce for real-time feel without overwhelming the API

    return () => clearTimeout(timer);
  }, [text, runAnalysis]);

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      {/* Left Navigation Bar (Slim) */}
      <nav className="w-16 bg-slate-900 flex flex-col items-center py-6 gap-6 text-slate-400">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold mb-4">
          S
        </div>
        <button className="hover:text-white transition-colors" title="Documents"><FileText size={22} /></button>
        <button className="hover:text-white transition-colors" title="Save"><Save size={22} /></button>
        <button className="hover:text-white transition-colors" title="History"><History size={22} /></button>
        <button className="hover:text-white transition-colors" title="Share"><Share2 size={22} /></button>
        <div className="mt-auto mb-2 flex flex-col gap-6">
          <button className="hover:text-white transition-colors" title="Settings"><Settings size={22} /></button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 border border-slate-700" />
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Editor Area */}
        <div className="flex-1 flex flex-col bg-white shadow-inner m-4 mr-0 rounded-3xl border overflow-hidden">
          <Toolbar
            onCheck={() => runAnalysis(text)}
            isAnalyzing={analysisStatus === AnalysisStatus.Analyzing}
            onFormat={handleFormat}
          />

          <div className="flex-1 overflow-y-auto bg-slate-50/50 flex justify-center p-4 sm:p-8 lg:p-12">
            <div className="w-full max-w-4xl bg-white shadow-[0_0_50px_-12px_rgba(0,0,0,0.1)] rounded-sm min-h-full p-16 sm:p-24 relative">
              {/* Paper Background Lines (Subtle) */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.03] overflow-hidden">
                <div className="h-full w-full" style={{ backgroundImage: 'repeating-linear-gradient(#000 0 1px, transparent 1px 32px)', backgroundPositionY: '120px' }}></div>
              </div>

              {/* Status Indicator inside the paper */}
              <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border text-[10px] font-bold uppercase tracking-wider text-slate-400 z-10 select-none">
                <Activity size={12} className={analysisStatus === AnalysisStatus.Analyzing ? "text-indigo-500 animate-pulse" : "text-emerald-500"} />
                {analysisStatus === AnalysisStatus.Analyzing ? "Analyzing..." : "Live Sync"}
              </div>

              <div
                ref={editorRef}
                contentEditable
                onInput={handleInput}
                className="w-full h-full outline-none prose-editor text-slate-800 placeholder:text-slate-300 bg-transparent relative z-0 min-h-[500px]"
                suppressContentEditableWarning={true}
              >
                A Roman Chariot Race<br /><br />
                The dusty arena buzzed with excitement as the massive crowd waited for the start. Four chariots stood poised at the white line. Because the horses were powerful, they strained against their leather harnesses.<br /><br />
                When the magistrate dropped the white cloth, the race began. Suddenly, a brave driver used his strong whip to encourage his steeds. He steered which chariot was fastest toward the narrow curve. One chariot crashed into the wall because the turn was too sharp.<br /><br />
                In the end, the crowd cheered wildly for the victor. The brave driver raised his laurel crown to the sky. He had survived the dangerous Roman chariot race.
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Right Sidebar - Checklist */}
      <ChecklistSidebar
        checklist={checklist}
        analysis={analysisResults}
        totalPoints={totalPoints}
      />
    </div>
  );
};

export default App;
