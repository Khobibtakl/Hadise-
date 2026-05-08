import { useAppContext } from '../context/AppContext';
import { HadithCard } from '../components/HadithCard';
import { Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Favorites() {
  const { hadiths, favorites } = useAppContext();
  
  const favoriteHadiths = hadiths.filter(h => favorites.includes(h.id));

  return (
    <div className="flex flex-col min-h-full">
      <div className="bg-emerald-600 px-6 py-6 text-white rounded-b-3xl shadow-md z-10 sticky top-0 flex items-center justify-center">
        <h1 className="text-xl font-bold flex items-center gap-2">
          خوښ شوي <Heart fill="currentColor" className="w-5 h-5" />
        </h1>
      </div>
      
      <div className="p-4 flex flex-col gap-4">
        <AnimatePresence mode="popLayout">
          {favoriteHadiths.length > 0 ? (
            favoriteHadiths.map(hadith => (
              <HadithCard key={hadith.id} hadith={hadith} />
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20 text-slate-400 gap-4"
            >
              <Heart className="w-12 h-12 opacity-20" />
              <p>تراوسه مو کوم حديث نه دی خوښ کړی.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
