import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, BookOpen } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { motion } from 'motion/react';

export function Favorites() {
  const { hadiths, favorites, t, language } = useAppContext();

  const favoriteHadiths = hadiths.filter(h => favorites.includes(h.id));

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-950">
      <div className="bg-primary-600 dark:bg-primary-900 text-white p-6 rounded-b-3xl shadow-lg relative overflow-hidden">
        <div className="absolute top-0 end-0 opacity-10 transform rtl:-translate-x-1/4 translate-x-1/4 -translate-y-1/4">
          <Heart size={160} />
        </div>
        <h2 className="text-2xl font-bold mb-2 relative z-10">{t('savedHadiths')}</h2>
        <p className="text-primary-100 text-sm relative z-10">
          {t('savedDesc')}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {favoriteHadiths.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500 dark:text-slate-400 space-y-4">
            <Heart size={48} className="text-slate-300 dark:text-slate-700" />
            <p>{t('noSaved')}</p>
            <Link to="/" className="text-primary-600 dark:text-primary-400 font-medium hover:underline">
              {t('browseHadiths')}
            </Link>
          </div>
        ) : (
          favoriteHadiths.map((hadith, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              key={hadith.id}
            >
              <Link 
                to={`/hadith/${hadith.id}`}
                className="block bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-shadow relative"
              >
                <div className="absolute top-4 end-4 text-primary-500">
                  <Heart size={20} fill="currentColor" />
                </div>
                <div className="flex justify-between items-start mb-2 pe-8">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 px-2 py-1 rounded-md">
                    {hadith.category[language]}
                  </span>
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
