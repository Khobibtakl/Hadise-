import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { HadithCard } from '../components/HadithCard';
import { motion, AnimatePresence } from 'framer-motion';

export function Home() {
  const { hadiths } = useAppContext();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    const cats = new Set(hadiths.map(h => h.category).filter(Boolean));
    return Array.from(cats) as string[];
  }, [hadiths]);

  const filteredHadiths = useMemo(() => {
    return hadiths.filter(hadith => {
      const matchSearch = (hadith.pashto?.includes(search) || hadith.arabic.includes(search));
      const matchCat = selectedCategory ? hadith.category === selectedCategory : true;
      return matchSearch && matchCat;
    });
  }, [hadiths, search, selectedCategory]);

  return (
    <div className="flex flex-col min-h-full">
      <div className="bg-primary-600 px-6 pt-[calc(env(safe-area-inset-top,20px)+1.5rem)] pb-8 text-white rounded-b-3xl shadow-md z-10 sticky top-0">
        <h1 className="text-2xl font-bold mb-6 text-center tracking-wide">ټول حديثونه</h1>
        
        <div className="relative">
          <input 
            type="text" 
            placeholder="لټون..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/10 border border-white/20 text-white placeholder-primary-100 rounded-2xl py-3.5 pr-12 pl-4 focus:outline-none focus:ring-2 focus:ring-white/40 focus:bg-white/20 transition-all font-pashto shadow-inner"
            dir="rtl"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-100/80" />
        </div>
      </div>

      <div className="p-4" dir="rtl">
        {categories.length > 0 && (
          <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2 mb-4 -mx-4 px-4 snap-x">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`shrink-0 px-4 py-2 rounded-xl text-sm font-bold snap-center transition-all ${
                selectedCategory === null 
                  ? 'bg-primary-600 text-white shadow-md' 
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              ټول
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 px-4 py-2 rounded-xl text-sm font-bold snap-center transition-all ${
                  selectedCategory === cat 
                    ? 'bg-primary-600 text-white shadow-md' 
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
        
        <div className="flex flex-col gap-4">
          <AnimatePresence mode="popLayout">
            {filteredHadiths.length > 0 ? (
              filteredHadiths.map((hadith) => (
                <HadithCard key={hadith.id} hadith={hadith} />
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="py-12 text-center text-slate-400 font-medium"
              >
                هیڅ حدیث ونه موندل شو!
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
