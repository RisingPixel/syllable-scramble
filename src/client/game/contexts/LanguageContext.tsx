import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { preloadDictionary } from '../utils/dictionaryLoader';

export type Language = 'en' | 'fr' | 'it' | 'de' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Auto-detect lingua da browser
const detectLanguage = (): Language => {
  const browserLang = (navigator?.language?.split('-')[0] || 'en').toLowerCase();
  const supported: Language[] = ['en', 'fr', 'it', 'de', 'es'];
  
  if (supported.includes(browserLang as Language)) {
    return browserLang as Language;
  }
  
  return 'en'; // fallback
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Priority: localStorage > auto-detect > fallback
    /* const saved = localStorage.getItem('game-language') as Language;
    return saved || detectLanguage(); */

    // Force the language to be English as we have decided that the game will launch with only one language
    // By the time that we add more languages remember to uncomment the <LanguageSelector/> tag on the Welcome.tsx script
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('game-language', lang);
    
    // Preload dizionario della nuova lingua in background
    preloadDictionary(lang);
  };

  // Lazy load translations
  const [translations, setTranslations] = useState<Record<string, any>>({});

  useEffect(() => {
    import(`../locales/${language}.ts`).then((module) => {
      setTranslations(module.default);
    });
    
    // Preload dizionario della lingua corrente
    preloadDictionary(language);
  }, [language]);

  const t = (key: string, params?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let value: any = translations;
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    let result = value || key;
    
    // Simple interpolation: replace {param} with values
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        result = result.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
      });
    }
    
    return result;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
