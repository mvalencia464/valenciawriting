
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
You are an expert IEW (Institute for Excellence in Writing) grader. Analyze the provided text against the customized composition checklist below. Be strict with definitions.

Checklist Rules & Definitions:

1. STRUCTURE
   - Title: Compare the Title against the FINAL sentence of the entire text. It must repeat 1-3 key words.
   - Clincher: For EACH paragraph, check if the LAST sentence repeats or reflects 2-3 key words from the FIRST sentence (Topic Sentence) of that SAME paragraph. Both must be highlighted/bolded ideally, but strictly check the content match.

2. STYLE (DRESS-UPS) - Mark as 'met' if found.
   - "-ly adverb": verifiable adverb ending in -ly (e.g., "swiftly", "dangerously"). MODIFYING a verb.
   - "who/which clause": must be a DEPENDENT clause starting explicitly with "who" or "which" + a verb (e.g., "who ran fast", "which was heavy").
   - "strong verb": vivid action verbs. Do NOT count "to be" verbs (is, are, was, were, be, being, been) or "banned" verbs (go, went, say, said, get, got).
   - "because clause": dependent clause starting with the word "because".
   - "quality adjective": vivid, specific adjective (avoid generic words like "good", "bad", "nice").
   - "www.asia clause": dependent clause starting with one of: when, while, where, as, since, if, although.

3. SENTENCE OPENERS
   - "[2] prepositional": Sentence MUST start with a prepositional phrase (e.g., "In the morning, ...").
   - "[3] -ly adverb": Sentence MUST start with an -ly adverb (e.g., "Suddenly, the horse ran...").

4. MECHANICS
   - Check for general capitalization, end-marks, and complete sentences.

5. BANNED WORDS (-1 pt each)
   - forms of: go, say, get, good, bad, big, small.

Response Format (JSON):
{
  "score": number,
  "items": [
    { 
      "id": "string", 
      "status": "met" | "pending" | "failed", 
      "currentOccurrences": number, 
      "feedback": "Specific feedback. E.g., 'Found "who ran" in para 1' or 'Title does not match final sentence'." 
    }
  ],
  "bannedWordsFound": ["word1", "word2"],
  "suggestions": ["suggestion1"]
}
`;
