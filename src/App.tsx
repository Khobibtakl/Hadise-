import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Daily } from './pages/Daily';
import { Favorites } from './pages/Favorites';
import { Settings } from './pages/Settings';
import { Splash } from './components/Splash';
import { Dialog } from './components/Dialog';
import { useState, useEffect } from 'react';
import { App as CapacitorApp } from '@capacitor/app';
import { LogOut } from 'lucide-react';
import { AppProvider } from './context/AppContext';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showExitDialog, setShowExitDialog] = useState(false);

  useEffect(() => {
    const backButtonListener = CapacitorApp.addListener('backButton', ({ canGoBack }) => {
      if (window.location.pathname === '/') {
         setShowExitDialog(true);
      } else if (!canGoBack) {
         setShowExitDialog(true);
      } else {
         window.history.back();
      }
    });

    return () => {
      backButtonListener.then(listener => listener.remove());
    };
  }, []);

  const exitApp = () => {
    CapacitorApp.exitApp();
  };

  return (
    <AppProvider>
      {showSplash ? (
        <Splash onComplete={() => setShowSplash(false)} />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="daily" element={<Daily />} />
              <Route path="favorites" element={<Favorites />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </BrowserRouter>
      )}

      {/* Exit Confirmation Dialog */}
      <Dialog 
        isOpen={showExitDialog} 
        onClose={() => setShowExitDialog(false)}
        hideCloseBtn={true}
      >
        <div className="flex flex-col items-center text-center py-2 relative">
          <div className="w-20 h-20 bg-rose-50 dark:bg-rose-500/10 text-rose-500 rounded-full flex items-center justify-center mb-6 ring-8 ring-rose-50/50 dark:ring-rose-500/5">
            <LogOut className="w-8 h-8 ml-1" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">له اپلکيشن وتل</h3>
          <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed mb-8">
            آيا غواړئ چې له اپلکيشن څخه ووځئ؟
          </p>
          
          <div className="flex gap-4 w-full">
            <button 
              onClick={() => setShowExitDialog(false)}
              className="flex-1 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 py-3.5 rounded-2xl font-bold transition-all active:scale-[0.98]"
            >
              نه
            </button>
            <button 
              onClick={exitApp}
              className="flex-1 bg-rose-500 hover:bg-rose-600 text-white py-3.5 rounded-2xl font-bold transition-all shadow-md shadow-rose-500/20 active:scale-[0.98]"
            >
              هو
            </button>
          </div>
        </div>
      </Dialog>
    </AppProvider>
  );
}
