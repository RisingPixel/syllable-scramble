import { Language } from '@/contexts/LanguageContext';

// In-memory cache
const dictionaryCache: Record<Language, Set<string> | null> = {
  en: null,
  fr: null,
  it: null,
  de: null,
  es: null,
};

export const loadDictionary = async (language: Language): Promise<Set<string>> => {
  // Ritorna dalla cache se già caricato
  if (dictionaryCache[language]) {
    return dictionaryCache[language]!;
  }

  try {
    // Lazy fetch del dizionario
    const response = await fetch(`/dictionaries/${language}.txt`);
    const text = await response.text();
    
    const words = text
      .split('\n')
      .map(w => w.trim().toLowerCase())
      .filter(w => w.length >= 2 && w.length <= 15)
      .filter(w => /^[a-zàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ]+$/i.test(w)); // Include accented chars
    
    dictionaryCache[language] = new Set(words);
    return dictionaryCache[language]!;
  } catch (error) {
    console.error(`Failed to load ${language} dictionary:`, error);
    dictionaryCache[language] = new Set();
    return dictionaryCache[language]!;
  }
};

// Preload dictionary in background (optional optimization)
export const preloadDictionary = (language: Language) => {
  if (!dictionaryCache[language]) {
    loadDictionary(language).catch(console.error);
  }
};
