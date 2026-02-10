import { loadDictionary } from './dictionaryLoader';
import { Language } from '@/contexts/LanguageContext';

export const validateWord = async (
  word: string,
  syllable: string,
  language: Language
): Promise<{
  valid: boolean;
  errorType?: 'too_short' | 'missing_syllable' | 'not_in_dictionary';
}> => {
  const normalized = word.toLowerCase().trim();
  console.log('validateWord() - normalized:', normalized);
  const syllableNorm = syllable.toLowerCase();
  console.log('validateWord() - syllableNorm:', syllableNorm);

  // Check 1: Lunghezza minima
  if (normalized.length < 2) {
    return { valid: false, errorType: 'too_short' };
  }

  // Check 2: Contiene la sillaba?
  if (!normalized.includes(syllableNorm)) {
    return { valid: false, errorType: 'missing_syllable' };
  }

  // Check 3: Esiste nel dizionario della lingua?
  const dict = await loadDictionary(language);
  if (!dict.has(normalized)) {
    return { valid: false, errorType: 'not_in_dictionary' };
  }

  return { valid: true };
};

