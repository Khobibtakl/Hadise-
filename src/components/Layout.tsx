import React from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Home, Heart, Calendar, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAppContext } from '../context/AppContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Layout() {
  const { theme } = useTheme();
  const { t, language } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';
  
  const getPageTitle = () => {
    if (location.pathname.startsWith('/hadith/')) return t('hadithDetails');
    switch (location.pathname) {
      case '/': return t('welcomeTitle');
      case '/favorites': return t('favorites');
      case '/daily': return t('dailyHadith');
      case '/settings': return t('settings');
      default: return t('welcomeTitle');
    }
  };

  return (
    <div className={cn(
      "flex flex-col h-[100dvh] w-full max-w-md mx-auto overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-300",
      "shadow-2xl sm:border-x sm:border-slate-200 dark:sm:border-slate-800"
    )}>
      {/* Top App Bar */}
      <header className="flex-shrink-0 flex items-center h-16 px-4 bg-primary-600 dark:bg-primary-900 text-white shadow-md z-10">
        {!isHome && (
          <button 
            onClick={() => navigate(-1)}
            className="p-2 -ms-2 me-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label={t('goBack')}
          >
            {language === 'en' ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
          </button>
        )}
        <h1 className="text-xl font-semibold tracking-tight">{getPageTitle()}</h1>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden relative">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="flex-shrink-0 flex justify-around items-center h-16 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pb-safe">
        <NavItem to="/" icon={<Home size={24} />} label={t('home')} />
        <NavItem to="/daily" icon={<Calendar size={24} />} label={t('daily')} />
        <NavItem to="/favorites" icon={<Heart size={24} />} label={t('favorites')} />
        <NavItem to="/settings" icon={<Settings size={24} />} label={t('settings')} />
      </nav>
    </div>
  );
}

function NavItem({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => cn(
        "flex flex-col items-center justify-center w-full h-full gap-1 transition-colors",
        isActive 
          ? "text-primary-600 dark:text-primary-400" 
          : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50"
      )}
    >
      {icon}
      <span className="text-[10px] font-medium">{label}</span>
    </NavLink>
  );
}
