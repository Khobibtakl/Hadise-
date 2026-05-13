import fs from 'fs';

const THEMES = [
  { id: 'blue', name: 'آبي', color: '#2563eb' },
  { id: 'emerald', name: 'زمردي', color: '#059669' },
  { id: 'rose', name: 'ګلابي', color: '#e11d48' },
  { id: 'amber', name: 'زېړ', color: '#d97706' },
  { id: 'violet', name: 'بنفش', color: '#7c3aed' },
  { id: 'teal', name: 'شین', color: '#0d9488' },
  { id: 'indigo', name: 'نیلي', color: '#4f46e5' },
  { id: 'cyan', name: 'آسماني', color: '#0891b2' },
  { id: 'fuchsia', name: 'ارغواني', color: '#c026d3' },
  { id: 'orange', name: 'نارنجي', color: '#ea580c' },
];

let appCtx = fs.readFileSync('src/context/AppContext.tsx', 'utf8');

appCtx = appCtx.replace(`const [isDarkMode, setIsDarkMode] = useState(false);`, `const [isDarkMode, setIsDarkMode] = useState(false);
  const [theme, setThemeState] = useState('blue');

  const THEMES = ${JSON.stringify(THEMES)};
  `);

appCtx = appCtx.replace(`    const storedTheme = localStorage.getItem('hadith_theme');
    if (storedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }`, `    const storedThemeMode = localStorage.getItem('hadith_theme_mode');
    if (storedThemeMode === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
    const storedThemeColor = localStorage.getItem('hadith_theme_color');
    if (storedThemeColor) {
      setThemeState(storedThemeColor);
      document.documentElement.setAttribute('data-theme', storedThemeColor);
    }`);

appCtx = appCtx.replace(`  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      StatusBar.setStyle({ style: isDarkMode ? Style.Dark : Style.Dark }).catch(() => {});
      StatusBar.setBackgroundColor({ color: isDarkMode ? '#1e293b' : '#2563eb' }).catch(() => {});
    }
  }, [isDarkMode]);`, `  useEffect(() => {
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
  };`);

appCtx = appCtx.replace(`        localStorage.setItem('hadith_theme', 'dark');`, `        localStorage.setItem('hadith_theme_mode', 'dark');`);
appCtx = appCtx.replace(`        localStorage.setItem('hadith_theme', 'light');`, `        localStorage.setItem('hadith_theme_mode', 'light');`);

appCtx = appCtx.replace(`isDarkMode, toggleDarkMode }}`, `isDarkMode, toggleDarkMode, theme, setTheme }}`);
fs.writeFileSync('src/context/AppContext.tsx', appCtx);

let settingsTx = fs.readFileSync('src/pages/Settings.tsx', 'utf8');
settingsTx = settingsTx.replace(`import { cn } from '../lib/utils';`, `import { cn } from '../lib/utils';\nimport { Palette } from 'lucide-react';`);
settingsTx = settingsTx.replace(
  `const { notificationsEnabled, toggleNotifications, isDarkMode, toggleDarkMode } = useAppContext();`,
  `const { notificationsEnabled, toggleNotifications, isDarkMode, toggleDarkMode, theme, setTheme } = useAppContext();
  const THEMES = ${JSON.stringify(THEMES)};`
);

const themePickerHTML = `
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden mb-4">
          <div className="p-4 border-b border-slate-50 dark:border-slate-700 flex items-center gap-4">
            <div className="flex-1 text-right" dir="rtl">
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-sm">د اپلکيشن رنګ (تم)</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">خپل د خوښې رنګ وټاکئ</p>
            </div>
            <div className="p-2 bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 rounded-lg">
              <Palette className="w-5 h-5" />
            </div>
          </div>
          <div className="p-4 flex flex-wrap gap-3 justify-end dir-rtl">
            {THEMES.map(t => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all border",
                  theme === t.id 
                    ? "border-transparent text-white shadow-md scale-105" 
                    : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700"
                )}
                style={theme === t.id ? { backgroundColor: t.color } : {}}
              >
                {t.name}
                <div 
                  className={cn("w-3 h-3 rounded-full", theme === t.id ? "bg-white/30" : "")} 
                  style={theme !== t.id ? { backgroundColor: t.color } : {}}
                />
              </button>
            ))}
          </div>
        </div>
`;

settingsTx = settingsTx.replace(
  `<div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
          <div className="p-4 border-b border-slate-50 dark:border-slate-700 flex items-center gap-4 cursor-pointer" onClick={toggleNotifications}>`,
  themePickerHTML + `
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
          <div className="p-4 border-b border-slate-50 dark:border-slate-700 flex items-center gap-4 cursor-pointer" onClick={toggleNotifications}>`
);

fs.writeFileSync('src/pages/Settings.tsx', settingsTx);
console.log("Updated AppContext and Settings with themes!");
