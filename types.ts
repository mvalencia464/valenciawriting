
export interface ChecklistItem {
  id: string;
  label: string;
  points: number;
  category: 'Structure' | 'Style' | 'Sentence Openers' | 'Mechanics' | 'Vocabulary';
  status: 'pending' | 'met' | 'failed';
  feedback?: string;
  maxOccurrences?: number;
  currentOccurrences: number;
}

export interface AnalysisResults {
  score: number;
  maxScore: number;
  items: ChecklistItem[];
  bannedWordsCount: number;
  bannedWordsFound: string[];
  suggestions: string[];
}

export enum AnalysisStatus {
  Idle = 'idle',
  Analyzing = 'analyzing',
  Done = 'done',
  Error = 'error'
}
