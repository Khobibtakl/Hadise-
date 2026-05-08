import { Outlet, NavLink } from 'react-router-dom';
import { Home, Heart, Calendar, Settings } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

export function Layout() {
  const navItems = [
    { to: '/', icon: Home, label: 'کور' },
    { to: '/daily', icon: Calendar, label: 'د نن حديث' },
    { to: '/favorites', icon: Heart, label: 'خوښ شوي' },
    { to: '/settings', icon: Settings, label: 'تنظيمات' },
  ];

  return (
    <div className="flex flex-col h-screen bg-slate-50 md:flex-row-reverse max-w-md mx-auto md:max-w-2xl relative shadow-2xl overflow-hidden">
      
      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-20 md:pb-0 z-10 w-full relative">
        <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           exit={{ opacity: 0, y: -10 }}
           transition={{ duration: 0.3 }}
           className="min-h-full"
        >
          <Outlet />
        </motion.div>
      </main>

      {/* Bottom Navigation for Mobile, Side for Desktop */}
      <nav className="fixed bottom-0 w-full max-w-md mx-auto md:max-w-none md:static md:w-24 bg-white border-t border-slate-200 md:border-t-0 md:border-l z-20 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] md:shadow-none">
        <div className="flex justify-around items-center h-16 md:h-full md:flex-col md:py-8 md:justify-start md:gap-8 px-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center justify-center w-full h-full gap-1 transition-colors relative",
                  isActive ? "text-emerald-600" : "text-slate-400 hover:text-slate-600"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon className={cn("w-5 h-5", isActive && "fill-emerald-100/50")} />
                  <span className="text-[10px] font-medium">{item.label}</span>
                  {isActive && (
                    <motion.div 
                      layoutId="nav-indicator"
                      className="absolute top-0 w-8 h-1 bg-emerald-500 rounded-b-full md:w-1 md:h-8 md:top-auto md:right-0 md:rounded-l-full md:rounded-b-none"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
      
    </div>
  );
}
