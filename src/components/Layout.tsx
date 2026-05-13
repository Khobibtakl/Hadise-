import { Outlet, NavLink } from 'react-router-dom';
import { Home as HomeIcon, BookType, Heart, Settings } from 'lucide-react';

export function Layout() {
  return (
    <div className="flex flex-col h-[100dvh] bg-slate-50 dark:bg-slate-900 w-full max-w-md mx-auto relative overflow-hidden font-pashto shadow-xl ring-1 ring-slate-200 dark:ring-slate-800">
      <main className="flex-1 overflow-y-auto hide-scrollbar relative">
        <Outlet />
      </main>
      
      <nav className="bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700 px-6 py-3 pb-[calc(env(safe-area-inset-bottom,20px)+0.75rem)] shrink-0 z-50 rounded-t-[2rem] shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)]">
        <ul className="flex items-center justify-between gap-1" dir="rtl">
          {[
            { to: "/", icon: HomeIcon, label: "کور" },
            { to: "/daily", icon: BookType, label: "ورځنی" },
            { to: "/favorites", icon: Heart, label: "خوښ شوي" },
            { to: "/settings", icon: Settings, label: "تنظيمات" }
          ].map((item) => (
            <li key={item.to} className="flex-1">
              <NavLink 
                to={item.to}
                className={({isActive}) => `flex flex-col items-center justify-center w-full py-2 px-1 rounded-2xl transition-all duration-300 ${isActive ? 'bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 scale-105' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
              >
                <item.icon className={`w-6 h-6 mb-1.5`} strokeWidth={2.5} />
                <span className="text-[10px] font-bold tracking-wide">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
