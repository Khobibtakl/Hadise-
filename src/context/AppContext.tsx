import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Hadith } from '../types';
import hadithsData from '../data/hadiths.json';
import { LocalNotifications } from '@capacitor/local-notifications';

interface AppContextType {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  hadiths: Hadith[];
  dailyHadith: Hadith | null;
  notificationsEnabled: boolean;
  toggleNotifications: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [hadiths] = useState<Hadith[]>(hadithsData);
  const [dailyHadith, setDailyHadith] = useState<Hadith | null>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Load favorites from local storage
    const storedFavorites = localStorage.getItem('hadith_favorites');
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites));
      } catch (e) {
        console.error('Failed to parse favorites', e);
      }
    }

    const storedTheme = localStorage.getItem('hadith_theme');
    if (storedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    const storedNotifs = localStorage.getItem('hadith_notifications');
    if (storedNotifs === 'true') {
      setNotificationsEnabled(true);
    }

    // Set a daily hadith based on the current day
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
    const index = dayOfYear % hadithsData.length;
    setDailyHadith(hadithsData[index]);
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(id) 
        ? prev.filter(f => f !== id)
        : [...prev, id];
      
      localStorage.setItem('hadith_favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const isFavorite = (id: string) => favorites.includes(id);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const newValue = !prev;
      if (newValue) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('hadith_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('hadith_theme', 'light');
      }
      return newValue;
    });
  };

  const toggleNotifications = async () => {
    try {
      if (!notificationsEnabled) {
        // Request permission
        const permStatus = await LocalNotifications.requestPermissions();
        if (permStatus.display === 'granted') {
          // Schedule daily notification at 8:00 AM
          await LocalNotifications.schedule({
            notifications: [
              {
                title: 'د نن حديثونه',
                body: dailyHadith?.pashto || 'نن یو نوی حدیث ولولئ او ثواب وګټئ!',
                id: 1,
                schedule: {
                  on: {
                    hour: 8,
                    minute: 0,
                  },
                  repeats: true,
                },
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
        // Cancel notifications
        await LocalNotifications.cancel({ notifications: [{ id: 1 }] });
        setNotificationsEnabled(false);
        localStorage.setItem('hadith_notifications', 'false');
      }
    } catch (e) {
      console.error('Failed to toggle notifications', e);
      // Fallback for web or if capacitor fails
      setNotificationsEnabled(!notificationsEnabled);
      localStorage.setItem('hadith_notifications', (!notificationsEnabled).toString());
    }
  };

  return (
    <AppContext.Provider value={{ 
      favorites, 
      toggleFavorite, 
      isFavorite, 
      hadiths, 
      dailyHadith,
      notificationsEnabled,
      toggleNotifications,
      isDarkMode,
      toggleDarkMode
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
