// Import dictionary directly into bundle (no runtime fetch)
import wordsRawText from '/public/words_raw.txt?raw';

// Load words from the imported dictionary
let dictionary: Set<string> | null = null;

const loadDictionary = (): Set<string> => {
  if (dictionary) return dictionary;
  
  try {
    const words = wordsRawText
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

export const validateWord = (word: string, syllable: string): {
  valid: boolean;
  errorType?: 'too_short' | 'missing_syllable' | 'not_in_dictionary';
} => {
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
  const dict = loadDictionary();
  if (!dict.has(normalized)) {
    return { valid: false, errorType: 'not_in_dictionary' };
  }
  
  return { valid: true };
};

export const isValidSyllable = (syl: string): boolean => {
  if (!syl || syl.length < 2 || syl.length > 6) return false;
  return /^[a-zA-Z]+$/.test(syl);
};
