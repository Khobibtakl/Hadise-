export interface Hadith {
  id: string | number;
  idInBook?: number;
  chapterId?: number;
  bookId?: number;
  arabic: string;
  pashto?: string;
  category?: string;
  english?: {
    narrator?: string;
    text: string;
  };
  theme?: string;
}

export interface AppContextType {
  favorites: string[];
  toggleFavorite: (id: string | number) => void;
  isFavorite: (id: string | number) => boolean;
  hadiths: Hadith[];
  dailyHadith: Hadith | null;
  notificationsEnabled: boolean;
  toggleNotifications: () => void;
  isDarkMode: boolean;
  theme: string;
  setTheme: (theme: string) => void;
  toggleDarkMode: () => void;
}
