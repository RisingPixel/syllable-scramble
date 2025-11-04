import { Language } from '@/contexts/LanguageContext';
import { EN_SYLLABLES } from './en';
import { IT_SYLLABLES } from './it';
import { FR_SYLLABLES } from './fr';
import { DE_SYLLABLES } from './de';
import { ES_SYLLABLES } from './es';

const syllablesByLanguage = {
  en: EN_SYLLABLES,
  it: IT_SYLLABLES,
  fr: FR_SYLLABLES,
  de: DE_SYLLABLES,
  es: ES_SYLLABLES,
} as const;

/**
 * Get a random syllable for the specified language
 */
export const getRandomSyllable = (language: Language): string => {
  const syllables = syllablesByLanguage[language];
  return syllables[Math.floor(Math.random() * syllables.length)].toUpperCase();
};

/**
 * Validate if a syllable is in the correct format
 */
export const isValidSyllableFormat = (syllable: string): boolean => {
  if (!syllable) return false;
  
  // Min 2 chars, max 6 chars (to cover all existing syllables)
  if (syllable.length < 2 || syllable.length > 6) return false;
  
  // Only letters allowed (including accented characters)
  if (!/^[a-zA-ZÀ-ÿ]+$/.test(syllable)) return false;
  
  return true;
};
