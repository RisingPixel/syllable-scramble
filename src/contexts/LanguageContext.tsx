import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'fr' | 'it' | 'de' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Auto-detect lingua da browser
const detectLanguage = (): Language => {
  const browserLang = navigator.language.split('-')[0].toLowerCase();
  const supported: Language[] = ['en', 'fr', 'it', 'de', 'es'];
  
  if (supported.includes(browserLang as Language)) {
    return browserLang as Language;
  }
  
  return 'en'; // fallback
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Priority: localStorage > auto-detect > fallback
    const saved = localStorage.getItem('game-language') as Language;
    return saved || detectLanguage();
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('game-language', lang);
  };

  // Lazy load translations
  const [translations, setTranslations] = useState<Record<string, any>>({});

  useEffect(() => {
    import(`../locales/${language}.ts`).then((module) => {
      setTranslations(module.default);
    });
  }, [language]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations;
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
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
