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

export const isValidSyllable = (syl: string): boolean => {
  if (!syl || syl.length < 2 || syl.length > 6) return false;
  return /^[a-zA-Z]+$/.test(syl);
};
