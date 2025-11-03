// Load words from the open-source dictionary
let dictionary: Set<string> | null = null;

const loadDictionary = async (): Promise<Set<string>> => {
  if (dictionary) return dictionary;
  
  try {
    const response = await fetch('/words_raw.txt');
    const text = await response.text();
    
    const words = text
      .split('\n')
      .map(w => w.trim().toLowerCase())
      .filter(w => w.length >= 2 && w.length <= 15)
      .filter(w => /^[a-z]+$/.test(w));
    
    dictionary = new Set(words);
    return dictionary;
  } catch (error) {
    console.error('Failed to load dictionary:', error);
    // Fallback to empty set
    dictionary = new Set();
    return dictionary;
  }
};

// Initialize dictionary immediately
loadDictionary();

export const validateWord = async (word: string, syllable: string): Promise<{
  valid: boolean;
  errorType?: 'too_short' | 'missing_syllable' | 'not_in_dictionary';
}> => {
  const normalized = word.toLowerCase().trim();
  const syllableNorm = syllable.toLowerCase();
  
  // Check 1: Lunghezza minima
  if (normalized.length < 2) {
    return { valid: false, errorType: 'too_short' };
  }
  
  // Check 2: Contiene la sillaba?
  if (!normalized.includes(syllableNorm)) {
    return { valid: false, errorType: 'missing_syllable' };
  }
  
  // Check 3: Esiste nel dizionario?
  const dict = await loadDictionary();
  if (!dict.has(normalized)) {
    return { valid: false, errorType: 'not_in_dictionary' };
  }
  
  return { valid: true };
};

export const calculateScore = (word: string, syllable: string): number => {
  const length = word.length;
  let score = 0;
  
  // Base score progressivo
  if (length <= 3) score = 10;
  else if (length === 4) score = 20;
  else if (length === 5) score = 40;
  else if (length === 6) score = 60;
  else if (length === 7) score = 90;
  else if (length >= 8) score = 130 + (length - 8) * 20;
  
  // BONUS 1: Sillaba ripetuta più volte
  const syllableCount = (word.toLowerCase().match(new RegExp(syllable.toLowerCase(), 'g')) || []).length;
  if (syllableCount > 1) {
    score += syllableCount * 20; // +20 per ogni occorrenza extra
  }
  
  // BONUS 2: Parola che inizia o finisce con la sillaba
  const lowerWord = word.toLowerCase();
  const lowerSyl = syllable.toLowerCase();
  if (lowerWord.startsWith(lowerSyl)) score += 15;
  if (lowerWord.endsWith(lowerSyl)) score += 15;
  
  // BONUS 3: Lettere rare (Q, X, Z, J, K, W)
  const rareLetters = /[qxzjkw]/gi;
  const rareCount = (word.match(rareLetters) || []).length;
  score += rareCount * 10;
  
  return score;
};

export const isValidSyllable = (syl: string): boolean => {
  if (!syl || syl.length < 2 || syl.length > 4) return false;
  return /^[a-zA-Z]+$/.test(syl);
};

export const generateComparisonStat = (totalLetters: number): string => {
  const comparisons = [
    { threshold: 5000, text: "That's about the length of a short novel chapter!" },
    { threshold: 3000, text: "That's about 20% the length of a sports article on ESPN!" },
    { threshold: 2000, text: "That's about the length of a blog post!" },
    { threshold: 1000, text: "That's about the length of a newspaper article!" },
    { threshold: 500, text: "That's about the length of a long email!" },
    { threshold: 0, text: "That's a solid start! Keep practicing!" },
  ];
  
  const stat = comparisons.find(c => totalLetters >= c.threshold);
  return stat?.text || comparisons[comparisons.length - 1].text;
};
