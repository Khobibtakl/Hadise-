import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { HadithCard } from '../components/HadithCard';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Home() {
  const { hadiths } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(hadiths.map(h => h.category)));

  const filteredHadiths = hadiths.filter(hadith => {
    const matchesSearch = hadith.arabic.includes(searchTerm) || hadith.pashto.includes(searchTerm);
    const matchesCategory = selectedCategory ? hadith.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <div className="bg-emerald-600 px-6 py-8 text-white rounded-b-3xl shadow-md z-10 sticky top-0">
        <h1 className="text-2xl font-bold mb-2">حديثونه</h1>
        <p className="text-emerald-100 text-sm opacity-90 mb-6 font-medium">نبوي احاديث په پښتو ژباړه</p>
        
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="لټون (عربي يا پښتو)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/60 rounded-xl py-3 px-4 pr-11 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all font-pashto"
            dir="rtl"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 py-5 overflow-x-auto hide-scrollbar flex gap-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === null 
              ? 'bg-slate-800 text-white shadow-sm' 
              : 'bg-white text-slate-600 border border-slate-200 shadow-sm'
          }`}
        >
          ټول
        </button>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category 
                ? 'bg-slate-800 text-white shadow-sm' 
                : 'bg-white text-slate-600 border border-slate-200 shadow-sm'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="px-4 pb-8 flex flex-col gap-4">
        <AnimatePresence mode="popLayout">
          {filteredHadiths.map(hadith => (
            <HadithCard key={hadith.id} hadith={hadith} />
          ))}
          {filteredHadiths.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12 text-slate-400"
            >
              پدې نوم څه ونه موندل شول.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
