import React, { useState } from 'react';
import { Moon, Sun, Bell, Globe, Info, ChevronRight, ChevronLeft, BookOpen, Palette } from 'lucide-react';
import { useTheme, ColorTheme } from '../context/ThemeContext';
import { useAppContext, Language } from '../context/AppContext';
import { cn } from '../components/Layout';

const COLOR_THEMES: { id: ColorTheme; class: string }[] = [
  { id: 'emerald', class: 'bg-emerald-500' },
  { id: 'blue', class: 'bg-blue-500' },
  { id: 'rose', class: 'bg-rose-500' },
  { id: 'amber', class: 'bg-amber-500' },
  { id: 'violet', class: 'bg-violet-500' },
  { id: 'cyan', class: 'bg-cyan-500' },
  { id: 'fuchsia', class: 'bg-fuchsia-500' },
  { id: 'teal', class: 'bg-teal-500' },
  { id: 'orange', class: 'bg-orange-500' },
  { id: 'indigo', class: 'bg-indigo-500' },
];

export function Settings() {
  const { theme, toggleTheme, colorTheme, setColorTheme } = useTheme();
  const { hadiths, readHistory, favorites, t, language, setLanguage } = useAppContext();
  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    return localStorage.getItem('notifications') === 'true';
  });

  const handleNotificationToggle = () => {
    const newValue = !notificationsEnabled;
    setNotificationsEnabled(newValue);
    localStorage.setItem('notifications', String(newValue));
    if (newValue) {
      if ('Notification' in window) {
        Notification.requestPermission();
      }
    }
  };

  const getLanguageName = (lang: Language) => {
    switch(lang) {
      case 'en': return 'English';
      case 'ps': return 'پښتو';
      case 'fa': return 'فارسی';
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-950">
      <div className="bg-primary-600 dark:bg-primary-900 text-white p-6 rounded-b-3xl shadow-lg relative overflow-hidden">
        <div className="absolute top-0 end-0 opacity-10 transform rtl:-translate-x-1/4 translate-x-1/4 -translate-y-1/4">
          <SettingsIcon size={160} />
        </div>
        <h2 className="text-2xl font-bold mb-2 relative z-10">{t('settings')}</h2>
        <p className="text-slate-300 text-sm relative z-10">
          {t('customizeApp')}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {/* Stats Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-800 flex justify-around">
          <div className="text-center space-y-1">
            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{readHistory.length}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">{t('read')}</p>
          </div>
          <div className="w-px bg-slate-200 dark:bg-slate-800"></div>
          <div className="text-center space-y-1">
            <p className="text-2xl font-bold text-rose-600 dark:text-rose-400">{favorites.length}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">{t('saved')}</p>
          </div>
          <div className="w-px bg-slate-200 dark:bg-slate-800"></div>
          <div className="text-center space-y-1">
            <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{hadiths.length}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">{t('total')}</p>
          </div>
        </div>

        {/* Preferences */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mx-2">
            {t('preferences')}
          </h3>
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
            
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-xl">
                  {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
                </div>
                <span className="font-medium text-slate-700 dark:text-slate-300">{t('darkMode')}</span>
              </div>
              <div className={cn(
                "w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out",
                theme === 'dark' ? "bg-primary-600" : "bg-slate-200 dark:bg-slate-700"
              )}>
                <div className={cn(
                  "w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-200 ease-in-out",
                  theme === 'dark' ? "translate-x-6 rtl:-translate-x-6" : "translate-x-0"
                )} />
              </div>
            </button>

            {/* Notifications Toggle */}
            <button 
              onClick={handleNotificationToggle}
              className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-xl">
                  <Bell size={20} />
                </div>
                <span className="font-medium text-slate-700 dark:text-slate-300">{t('dailyNotifications')}</span>
              </div>
              <div className={cn(
                "w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out",
                notificationsEnabled ? "bg-primary-600" : "bg-slate-200 dark:bg-slate-700"
              )}>
                <div className={cn(
                  "w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-200 ease-in-out",
                  notificationsEnabled ? "translate-x-6 rtl:-translate-x-6" : "translate-x-0"
                )} />
              </div>
            </button>

            {/* Language Selector */}
            <div className="p-4 flex flex-col gap-3 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-xl">
                  <Globe size={20} />
                </div>
                <span className="font-medium text-slate-700 dark:text-slate-300">{t('translationLanguage')}</span>
              </div>
              <div className="flex gap-2 mt-2">
                {(['en', 'ps', 'fa'] as Language[]).map(lang => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={cn(
                      "flex-1 py-2 rounded-xl text-sm font-medium transition-colors border",
                      language === lang 
                        ? "bg-primary-600 text-white border-primary-600" 
                        : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
                    )}
                  >
                    {getLanguageName(lang)}
                  </button>
                ))}
              </div>
            </div>

            {/* App Color Selector */}
            <div className="p-4 flex flex-col gap-3 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-xl">
                  <Palette size={20} />
                </div>
                <span className="font-medium text-slate-700 dark:text-slate-300">{t('appColor')}</span>
              </div>
              <div className="grid grid-cols-5 gap-3 mt-2">
                {COLOR_THEMES.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setColorTheme(c.id)}
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200",
                      c.class,
                      colorTheme === c.id ? "ring-4 ring-offset-2 ring-primary-500 dark:ring-offset-slate-900 scale-110" : "hover:scale-110 opacity-80 hover:opacity-100"
                    )}
                    aria-label={`Select ${c.id} theme`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* About */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mx-2">
            {t('about')}
          </h3>
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
            
            <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-xl">
                  <Info size={20} />
                </div>
                <span className="font-medium text-slate-700 dark:text-slate-300">{t('aboutApp')}</span>
              </div>
              {language === 'en' ? <ChevronRight size={16} className="text-slate-400" /> : <ChevronLeft size={16} className="text-slate-400" />}
            </button>

            <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-xl">
                  <BookOpen size={20} />
                </div>
                <span className="font-medium text-slate-700 dark:text-slate-300">{t('sourcesAuth')}</span>
              </div>
              {language === 'en' ? <ChevronRight size={16} className="text-slate-400" /> : <ChevronLeft size={16} className="text-slate-400" />}
            </button>

          </div>
        </div>
        
        <div className="text-center py-4">
          <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
            {t('version')}<br/>
            {t('builtWith')}
          </p>
        </div>
      </div>
    </div>
  );
}

// Helper icon component since we used SettingsIcon but imported Settings
function SettingsIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
