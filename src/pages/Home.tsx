import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, Heart } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { motion } from 'motion/react';
import { cn } from '../components/Layout';

export function Home() {
  const { hadiths, favorites, readHistory, t, language } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    const cats = new Set(hadiths.map(h => h.category[language]));
    return Array.from(cats).sort();
  }, [hadiths, language]);

  const filteredHadiths = useMemo(() => {
    return hadiths.filter(h => {
      const matchesSearch = h.title[language].toLowerCase().includes(searchQuery.toLowerCase()) || 
                            h.translation[language].toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory ? h.category[language] === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [hadiths, searchQuery, selectedCategory, language]);

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-950">
      {/* Header Section */}
      <div className="bg-primary-600 dark:bg-primary-900 text-white p-6 rounded-b-3xl shadow-lg relative overflow-hidden">
        <div className="absolute top-0 end-0 opacity-10 transform rtl:-translate-x-1/4 translate-x-1/4 -translate-y-1/4">
          <BookOpen size={160} />
        </div>
        <h2 className="text-2xl font-bold mb-2 relative z-10">{t('welcomeTitle')}</h2>
        <p className="text-primary-100 text-sm mb-6 relative z-10">
          {t('welcomeDesc')}
        </p>
        
        {/* Search Bar */}
        <div className="relative z-10">
          <div className="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-primary-300" />
          </div>
          <input
            type="text"
            className="block w-full ps-10 pe-3 py-3 border-none rounded-xl bg-white/20 backdrop-blur-md text-white placeholder-primary-200 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Progress & Stats */}
      <div className="px-4 py-4 flex justify-between items-center text-sm text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-1">
          <BookOpen size={16} className="text-primary-500" />
          <span>{readHistory.length} / {hadiths.length} {t('read')}</span>
        </div>
        <div className="flex items-center gap-1">
          <Heart size={16} className="text-rose-500" />
          <span>{favorites.length} {t('saved')}</span>
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 pb-4 overflow-x-auto no-scrollbar flex gap-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={cn(
            "px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
            selectedCategory === null 
              ? "bg-primary-100 text-primary-800 dark:bg-primary-900/50 dark:text-primary-300" 
              : "bg-white text-slate-600 border border-slate-200 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400"
          )}
        >
          {t('all')}
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
              selectedCategory === cat 
                ? "bg-primary-100 text-primary-800 dark:bg-primary-900/50 dark:text-primary-300" 
                : "bg-white text-slate-600 border border-slate-200 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Hadith List */}
      <div className="flex-1 overflow-y-auto px-4 pb-24 flex flex-col gap-4">
        {filteredHadiths.length === 0 ? (
          <div className="text-center py-10 text-slate-500 dark:text-slate-400">
            {t('noHadithsFound')}
          </div>
        ) : (
          filteredHadiths.map((hadith, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              key={hadith.id}
            >
              <Link 
                to={`/hadith/${hadith.id}`}
                className="block bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 px-2 py-1 rounded-md">
                    {hadith.category[language]}
                  </span>
                  <span className="text-xs text-slate-400">#{hadith.id}</span>
                </div>
                <h3 className="font-semibold text-lg text-slate-900 dark:text-slate-100 mb-2">
                  {hadith.title[language]}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                  {hadith.translation[language]}
                </p>
              </Link>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
