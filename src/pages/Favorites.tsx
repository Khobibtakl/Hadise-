import { useAppContext } from '../context/AppContext';
import { HadithCard } from '../components/HadithCard';
import { motion, AnimatePresence } from 'framer-motion';

export function Favorites() {
  const { hadiths, favorites } = useAppContext();
  
  const favoriteHadiths = hadiths.filter(h => favorites.includes(h.id.toString()));

  return (
    <div className="flex flex-col min-h-full">
      <div className="bg-primary-600 px-6 pt-[calc(env(safe-area-inset-top,20px)+1.5rem)] pb-8 text-white rounded-b-3xl shadow-md z-10 sticky top-0">
        <h1 className="text-2xl font-bold text-center">خوښ شوي</h1>
        <p className="text-center text-primary-100 text-sm mt-2 font-medium">
          ستاسو {favorites.length > 0 ? favorites.length : ''} غوره شوي حدیثونه
        </p>
      </div>

      <div className="p-4" dir="rtl">
        <div className="flex flex-col gap-4 mt-2">
          <AnimatePresence mode="popLayout">
            {favoriteHadiths.length > 0 ? (
              favoriteHadiths.map((hadith) => (
                <HadithCard key={hadith.id} hadith={hadith} />
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="py-16 flex flex-col items-center justify-center text-slate-400 gap-4"
              >
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-2">
                  <span className="text-2xl">❤️</span>
                </div>
                <p className="font-medium text-lg">کوم حديث مو ندی خوښ کړی</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
