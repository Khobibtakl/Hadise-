import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, BookOpen, Heart, Share2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { motion } from 'motion/react';
import { cn } from '../components/Layout';

export function Daily() {
  const { dailyHadith, isFavorite, toggleFavorite, t, language } = useAppContext();

  if (!dailyHadith) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-500 dark:text-slate-400">
        <p>{t('loading')}</p>
      </div>
    );
  }

  const handleShare = async () => {
    const shareData = {
      title: `${t('dailyHadith')}: ${dailyHadith.title[language]}`,
      text: `${dailyHadith.arabic}\n\n${dailyHadith.translation[language]}\n\n- ${dailyHadith.reference[language]}`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.text);
        alert(t('copied'));
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-950">
      <div className="bg-primary-600 dark:bg-primary-900 text-white p-6 rounded-b-3xl shadow-lg relative overflow-hidden">
        <div className="absolute top-0 end-0 opacity-10 transform rtl:-translate-x-1/4 translate-x-1/4 -translate-y-1/4">
          <Calendar size={160} />
        </div>
        <h2 className="text-2xl font-bold mb-2 relative z-10">{t('dailyHadith')}</h2>
        <p className="text-primary-100 text-sm relative z-10">
          {t('dailyDesc')}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-slate-900 rounded-3xl shadow-md border border-slate-100 dark:border-slate-800 overflow-hidden"
        >
          <div className="p-6 space-y-6">
            <div className="flex justify-between items-start">
              <span className="inline-block px-3 py-1 bg-primary-100 text-primary-800 dark:bg-primary-900/50 dark:text-primary-300 rounded-full text-xs font-semibold uppercase tracking-wider">
                {dailyHadith.category[language]}
              </span>
              <div className="flex gap-2">
                <button 
                  onClick={handleShare}
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300"
                  aria-label={t('share')}
                >
                  <Share2 size={20} />
                </button>
                <button 
                  onClick={() => toggleFavorite(dailyHadith.id)}
                  className={cn(
                    "p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors",
                    isFavorite(dailyHadith.id) ? "text-rose-500" : "text-slate-600 dark:text-slate-300"
                  )}
                  aria-label="Favorite"
                >
                  <Heart size={20} fill={isFavorite(dailyHadith.id) ? "currentColor" : "none"} />
                </button>
              </div>
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 text-center">
              {dailyHadith.title[language]}
            </h3>

            <div className="bg-primary-50 dark:bg-primary-900/10 rounded-2xl p-6 relative">
              <div className="absolute -top-3 -start-3 w-10 h-10 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-sm">
                <BookOpen size={16} className="text-primary-600 dark:text-primary-400" />
              </div>
              <p 
                className="text-xl leading-loose text-right font-arabic text-slate-900 dark:text-slate-100"
                dir="rtl"
                style={{ fontFamily: "'Amiri', serif", lineHeight: '2.5' }}
              >
                {dailyHadith.arabic}
              </p>
            </div>

            <div className="space-y-2">
              <p className={cn(
                "text-base leading-relaxed text-slate-700 dark:text-slate-300 italic",
                language === 'en' ? "font-serif" : "font-arabic"
              )}>
                "{dailyHadith.translation[language]}"
              </p>
            </div>

            <div className="flex flex-col items-center justify-center pt-4 border-t border-slate-200 dark:border-slate-800 space-y-4">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {t('source')}: <span className="text-primary-600 dark:text-primary-400">{dailyHadith.reference[language]}</span>
              </p>
              
              <Link 
                to={`/hadith/${dailyHadith.id}`}
                className="w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white text-center rounded-xl font-medium transition-colors"
              >
                {t('readFullExplanation')}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
