
import { ChecklistItem } from './types';

export const INITIAL_CHECKLIST: ChecklistItem[] = [
  // Structure
  { id: 'mla', label: 'MLA Format', points: 1, category: 'Structure', status: 'pending', currentOccurrences: 0 },
  { id: 'title', label: 'Title repeats 1-3 keywords from final sentence', points: 2, category: 'Structure', status: 'pending', currentOccurrences: 0 },
  { id: 'clincher', label: 'Clincher repeats/reflects 2-3 keywords of central fact', points: 5, category: 'Structure', status: 'pending', currentOccurrences: 0 },
  
  // Style (Dress-Ups)
  { id: 'ly-adverb', label: '-ly adverb', points: 2, category: 'Style', status: 'pending', maxOccurrences: 3, currentOccurrences: 0 },
  { id: 'who-which', label: 'who/which clause', points: 2, category: 'Style', status: 'pending', maxOccurrences: 3, currentOccurrences: 0 },
  { id: 'strong-verb', label: 'strong verb', points: 2, category: 'Style', status: 'pending', maxOccurrences: 3, currentOccurrences: 0 },
  { id: 'because-clause', label: 'because clause', points: 2, category: 'Style', status: 'pending', maxOccurrences: 3, currentOccurrences: 0 },
  { id: 'quality-adj', label: 'quality adjective', points: 2, category: 'Style', status: 'pending', maxOccurrences: 3, currentOccurrences: 0 },
  { id: 'www-asia', label: 'www.asia clause (when, while, where, as, since, if, although)', points: 2, category: 'Style', status: 'pending', maxOccurrences: 3, currentOccurrences: 0 },

  // Sentence Openers
  { id: 'opener-prepositional', label: '[2] prepositional', points: 2, category: 'Sentence Openers', status: 'pending', maxOccurrences: 3, currentOccurrences: 0 },
  { id: 'opener-ly', label: '[3] -ly adverb', points: 2, category: 'Sentence Openers', status: 'pending', maxOccurrences: 3, currentOccurrences: 0 },

  // Mechanics
  { id: 'capitalization', label: 'Capitalization', points: 1, category: 'Mechanics', status: 'pending', currentOccurrences: 0 },
  { id: 'punctuation', label: 'End marks and punctuation', points: 1, category: 'Mechanics', status: 'pending', currentOccurrences: 0 },
  { id: 'complete-sentences', label: 'Complete sentences', points: 1, category: 'Mechanics', status: 'pending', currentOccurrences: 0 },
  { id: 'spelling', label: 'Correct spelling', points: 1, category: 'Mechanics', status: 'pending', currentOccurrences: 0 },

  // Vocabulary
  { id: 'vocab', label: 'Vocabulary words labeled (voc)', points: 1, category: 'Vocabulary', status: 'pending', currentOccurrences: 0 },
];

export const BANNED_WORDS = ['go', 'went', 'say', 'said', 'get', 'got', 'good', 'bad', 'big', 'small'];

export const SYSTEM_INSTRUCTION = `
You are an expert IEW (Institute for Excellence in Writing) grader. Analyze the provided text against the composition checklist.

Checklist Criteria:
1. Dress-Ups (Must find up to 3 occurrences of each):
   - "-ly adverb": words ending in -ly that modify verbs.
   - "who/which clause": relative clauses starting with who or which.
   - "strong verb": vivid, specific action verbs (avoid 'is', 'was', 'went').
   - "because clause": dependent clause starting with 'because'.
   - "quality adjective": vivid, specific adjectives (avoid 'nice', 'good').
   - "www.asia clause": clauses starting with when, while, where, as, since, if, although.
2. Sentence Openers:
   - "[2] prepositional": sentences starting with a prepositional phrase.
   - "[3] -ly adverb": sentences starting with an -ly adverb.
3. Banned Words (-1pt each): go, went, say, said, get, got, good, bad, big, small.
4. Structure:
   - Centered Title: Is the title centered?
   - Title Key Words: Does the title repeat 1-3 key words from the last sentence?
   - Clincher: Do the final sentences of paragraphs (clinchers) repeat/reflect key words of the central fact?
5. Mechanics: Check spelling, punctuation, and capitalization.

Response Format (JSON):
{
  "score": number,
  "items": [
    { "id": "string", "status": "met" | "pending" | "failed", "currentOccurrences": number, "feedback": "optional message" }
  ],
  "bannedWordsFound": ["word1", "word2"],
  "suggestions": ["suggestion1", "suggestion2"]
}
`;
