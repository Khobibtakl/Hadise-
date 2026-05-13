import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Hadith, AppContextType } from '../types';
import hadithsData from '../data/hadiths.json';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [hadiths] = useState<Hadith[]>(hadithsData as Hadith[]);
  const [dailyHadith, setDailyHadith] = useState<Hadith | null>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [theme, setThemeState] = useState('blue');

  const THEMES = [{"id":"blue","name":"آبي","color":"#2563eb"},{"id":"emerald","name":"زمردي","color":"#059669"},{"id":"rose","name":"ګلابي","color":"#e11d48"},{"id":"amber","name":"زېړ","color":"#d97706"},{"id":"violet","name":"بنفش","color":"#7c3aed"},{"id":"teal","name":"شین","color":"#0d9488"},{"id":"indigo","name":"نیلي","color":"#4f46e5"},{"id":"cyan","name":"آسماني","color":"#0891b2"},{"id":"fuchsia","name":"ارغواني","color":"#c026d3"},{"id":"orange","name":"نارنجي","color":"#ea580c"}];
  

  useEffect(() => {
    try {
      const stored = localStorage.getItem('hadith_favorites');
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Could not load favorites");
    }

    const storedThemeMode = localStorage.getItem('hadith_theme_mode');
    if (storedThemeMode === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
    const storedThemeColor = localStorage.getItem('hadith_theme_color');
    if (storedThemeColor) {
      setThemeState(storedThemeColor);
      document.documentElement.setAttribute('data-theme', storedThemeColor);
    }

    const storedNotifs = localStorage.getItem('hadith_notifications');
    if (storedNotifs === 'true') {
      setNotificationsEnabled(true);
    }

    if (hadiths.length > 0) {
      const today = new Date();
      const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
      setDailyHadith(hadiths[dayOfYear % hadiths.length]);
    }
  }, [hadiths]);

  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      const activeThemeColor = THEMES.find(t => t.id === theme)?.color || '#2563eb';
      StatusBar.setStyle({ style: isDarkMode ? Style.Dark : Style.Dark }).catch(() => {});
      StatusBar.setBackgroundColor({ color: isDarkMode ? '#1e293b' : activeThemeColor }).catch(() => {});
    }
  }, [isDarkMode, theme]);

  const setTheme = (newTheme: string) => {
    setThemeState(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('hadith_theme_color', newTheme);
  };

  const toggleFavorite = (id: string | number) => {
    const stringId = id.toString();
    setFavorites(prev => {
      let newFavs;
      if (prev.includes(stringId)) {
        newFavs = prev.filter(f => f !== stringId);
      } else {
        newFavs = [...prev, stringId];
      }
      localStorage.setItem('hadith_favorites', JSON.stringify(newFavs));
      return newFavs;
    });
  };

  const isFavorite = (id: string | number) => favorites.includes(id.toString());

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const newValue = !prev;
      if (newValue) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('hadith_theme_mode', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('hadith_theme_mode', 'light');
      }
      return newValue;
    });
  };

  const toggleNotifications = async () => {
    try {
      if (!notificationsEnabled) {
        const permStatus = await LocalNotifications.requestPermissions();
        if (permStatus.display === 'granted') {
          await LocalNotifications.schedule({
            notifications: [
              {
                title: 'د نن حديثونه',
                body: dailyHadith?.pashto || 'نن یو نوی حدیث ولولئ او ثواب وګټئ!',
                id: 1,
                schedule: { on: { hour: 8, minute: 0 }, repeats: true },
                smallIcon: 'ic_stat_icon',
              }
            ]
          });
          setNotificationsEnabled(true);
          localStorage.setItem('hadith_notifications', 'true');
        } else {
          alert('لطفاً د خبرتیا اجازه ورکړئ.');
        }
      } else {
        await LocalNotifications.cancel({ notifications: [{ id: 1 }] });
        setNotificationsEnabled(false);
        localStorage.setItem('hadith_notifications', 'false');
      }
    } catch (e) {
      console.error('Failed to toggle notifications', e);
      setNotificationsEnabled(!notificationsEnabled);
      localStorage.setItem('hadith_notifications', (!notificationsEnabled).toString());
    }
  };

  return (
    <AppContext.Provider value={{ favorites, toggleFavorite, isFavorite, hadiths, dailyHadith, notificationsEnabled, toggleNotifications, isDarkMode, toggleDarkMode, theme, setTheme }}>
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
