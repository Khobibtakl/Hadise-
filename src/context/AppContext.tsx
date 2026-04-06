import React, { createContext, useContext, useEffect, useState } from 'react';
import hadithsData from '../data/hadiths.json';
import { translations } from '../i18n/translations';

export type Language = 'en' | 'ps' | 'fa';

export interface LocalizedString {
  en: string;
  ps: string;
  fa: string;
}

export interface Hadith {
  id: number;
  title: LocalizedString;
  category: LocalizedString;
  arabic: string;
  translation: LocalizedString;
  explanation: LocalizedString;
  reference: LocalizedString;
  source: string;
}

interface AppContextType {
  hadiths: Hadith[];
  favorites: number[];
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
  readHistory: number[];
  markAsRead: (id: number) => void;
  dailyHadith: Hadith | null;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations['en']) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  const [hadiths] = useState<Hadith[]>(hadithsData as Hadith[]);
  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [readHistory, setReadHistory] = useState<number[]>(() => {
    const saved = localStorage.getItem('readHistory');
    return saved ? JSON.parse(saved) : [];
  });
  const [dailyHadith, setDailyHadith] = useState<Hadith | null>(null);

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.dir = language === 'en' ? 'ltr' : 'rtl';
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('readHistory', JSON.stringify(readHistory));
  }, [readHistory]);

  useEffect(() => {
    // Daily Hadith Logic
    const today = new Date().toISOString().split('T')[0];
    const savedDailyStr = localStorage.getItem('dailyHadith');
    
    if (savedDailyStr) {
      const savedDaily = JSON.parse(savedDailyStr);
      if (savedDaily.date === today) {
        const hadith = hadiths.find(h => h.id === savedDaily.id);
        if (hadith) {
          setDailyHadith(hadith);
          return;
        }
      }
    }

    // Generate new daily hadith
    const randomIndex = Math.floor(Math.random() * hadiths.length);
    const newDaily = hadiths[randomIndex];
    setDailyHadith(newDaily);
    localStorage.setItem('dailyHadith', JSON.stringify({ date: today, id: newDaily.id }));
  }, [hadiths]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  const isFavorite = (id: number) => favorites.includes(id);

  const markAsRead = (id: number) => {
    setReadHistory(prev => {
      if (!prev.includes(id)) {
        return [...prev, id];
      }
      return prev;
    });
  };

  const t = (key: keyof typeof translations['en']) => {
    return translations[language][key] || translations['en'][key];
  };

  return (
    <AppContext.Provider value={{
      hadiths,
      favorites,
      toggleFavorite,
      isFavorite,
      readHistory,
      markAsRead,
      dailyHadith,
      language,
      setLanguage,
      t
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
