import { Language } from '@/contexts/LanguageContext';

// In-memory cache
const dictionaryCache: Record<Language, Set<string> | null> = {
  en: null,
  fr: null,
  it: null,
  de: null,
  es: null,
};

// Loading state tracker
const loadingStates: Record<Language, 'idle' | 'loading' | 'loaded' | 'error'> = {
  en: 'idle',
  fr: 'idle',
  it: 'idle',
  de: 'idle',
  es: 'idle',
};

// Listeners per notificare quando il loading cambia
type LoadingListener = (language: Language, state: 'loading' | 'loaded' | 'error') => void;
const loadingListeners: LoadingListener[] = [];

export const onLoadingStateChange = (listener: LoadingListener) => {
  loadingListeners.push(listener);
  return () => {
    const index = loadingListeners.indexOf(listener);
    if (index > -1) loadingListeners.splice(index, 1);
  };
};

const notifyListeners = (language: Language, state: 'loading' | 'loaded' | 'error') => {
  loadingStates[language] = state;
  loadingListeners.forEach(listener => listener(language, state));
};

export const getDictionaryLoadingState = (language: Language) => loadingStates[language];

export const loadDictionary = async (language: Language): Promise<Set<string>> => {
  // Ritorna dalla cache se già caricato
  if (dictionaryCache[language]) {
    return dictionaryCache[language]!;
  }

  // Se già in loading, attendi con timeout
  if (loadingStates[language] === 'loading') {
    return new Promise((resolve) => {
      let attempts = 0;
      const maxAttempts = 100; // 10 secondi max (100 * 100ms)
      const checkInterval = setInterval(() => {
        attempts++;
        if (dictionaryCache[language]) {
          clearInterval(checkInterval);
          resolve(dictionaryCache[language]!);
        } else if (attempts >= maxAttempts) {
          clearInterval(checkInterval);
          console.error(`⏱️ Dictionary loading timeout for ${language}`);
          notifyListeners(language, 'error');
          resolve(new Set()); // Fallback vuoto
        }
      }, 100);
    });
  }

  try {
    console.log(`📖 Loading ${language} dictionary...`);
    notifyListeners(language, 'loading');
    
    const startTime = performance.now();
    
    // Lazy fetch del dizionario
    const response = await fetch(`/dictionaries/${language}.txt`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const text = await response.text();
    
    const words = text
      .split('\n')
      .map(w => w.trim().toLowerCase())
      .filter(w => w.length >= 2 && w.length <= 15)
      .filter(w => /^[a-zàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿß]+$/i.test(w));
    
    const loadTime = (performance.now() - startTime).toFixed(0);
    console.log(`✅ ${language} dictionary loaded: ${words.length} words in ${loadTime}ms`);
    
    dictionaryCache[language] = new Set(words);
    notifyListeners(language, 'loaded');
    
    return dictionaryCache[language]!;
  } catch (error) {
    console.error(`❌ Failed to load ${language} dictionary:`, error);
    notifyListeners(language, 'error');
    dictionaryCache[language] = new Set();
    return dictionaryCache[language]!;
  }
};

// Preload dictionary in background (optional optimization)
export const preloadDictionary = (language: Language) => {
  if (!dictionaryCache[language] && loadingStates[language] === 'idle') {
    loadDictionary(language).catch(console.error);
  }
};

// Utility per sapere se un dizionario è disponibile
export const isDictionaryLoaded = (language: Language): boolean => {
  return dictionaryCache[language] !== null && loadingStates[language] === 'loaded';
};
