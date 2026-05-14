import { Outlet, NavLink } from 'react-router-dom';
import { Home as HomeIcon, BookType, Heart, Settings } from 'lucide-react';

export function Layout() {
  const navItems = [
    { to: "/", icon: HomeIcon, label: "کور" },
    { to: "/daily", icon: BookType, label: "ورځنی" },
    { to: "/favorites", icon: Heart, label: "خوښ شوي" },
    { to: "/settings", icon: Settings, label: "تنظيمات" }
  ];

  return (
    <div className="flex flex-col md:flex-row h-[100dvh] bg-slate-50 dark:bg-slate-900 w-full overflow-hidden font-pashto">
      {/* Desktop/Tablet Sidebar Nav */}
      <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-slate-800 border-l border-slate-100 dark:border-slate-700 shrink-0 z-50 shadow-lg" dir="rtl">
        <div className="p-6 pb-2 border-b border-slate-100 dark:border-slate-700">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">احادیث</h1>
        </div>
        <nav className="flex-1 overflow-y-auto py-6 px-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink 
                  to={item.to}
                  className={({isActive}) => `flex items-center gap-4 py-3 px-4 rounded-xl transition-all duration-300 ${isActive ? 'bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 font-bold' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-700 dark:hover:text-slate-300'}`}
                >
                  <item.icon className="w-6 h-6" strokeWidth={2.5} />
                  <span className="text-lg">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto hide-scrollbar relative bg-slate-50 dark:bg-slate-900">
        <div className="max-w-4xl mx-auto w-full min-h-full pb-20 md:pb-0">
          <Outlet />
        </div>
      </main>
      
      {/* Mobile Bottom Nav */}
      <nav className="md:hidden absolute bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700 px-6 py-3 pb-[calc(env(safe-area-inset-bottom,20px)+0.75rem)] z-50 rounded-t-[2rem] shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)]">
        <ul className="flex items-center justify-between gap-1" dir="rtl">
          {navItems.map((item) => (
            <li key={item.to} className="flex-1">
              <NavLink 
                to={item.to}
                className={({isActive}) => `flex flex-col items-center justify-center w-full py-2 px-1 rounded-2xl transition-all duration-300 ${isActive ? 'bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 scale-105' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
              >
                <item.icon className="w-6 h-6 mb-1.5" strokeWidth={2.5} />
                <span className="text-[10px] font-bold tracking-wide">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
