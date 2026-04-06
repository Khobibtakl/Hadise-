import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, Share2, BookOpen, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { motion } from 'motion/react';
import { cn } from '../components/Layout';

export function HadithDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { hadiths, isFavorite, toggleFavorite, markAsRead, t, language } = useAppContext();
  
  const hadith = hadiths.find(h => h.id === Number(id));

  useEffect(() => {
    if (hadith) {
      markAsRead(hadith.id);
    }
  }, [hadith, markAsRead]);

  if (!hadith) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-500 dark:text-slate-400">
        <p>{t('noHadithsFound')}</p>
        <button onClick={() => navigate('/')} className="mt-4 text-primary-600 dark:text-primary-400 font-medium">
          {t('goBack')}
        </button>
      </div>
    );
  }

  const handleShare = async () => {
    const shareData = {
      title: hadith.title[language],
      text: `${hadith.arabic}\n\n${hadith.translation[language]}\n\n- ${hadith.reference[language]}`,
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
    <motion.div 
      initial={{ opacity: 0, x: language === 'en' ? 20 : -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: language === 'en' ? -20 : 20 }}
      className="flex flex-col h-full bg-slate-50 dark:bg-slate-950 pb-24 overflow-y-auto"
    >
      {/* Header Actions */}
      <div className="sticky top-0 z-20 flex justify-between items-center p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300"
          aria-label={t('goBack')}
        >
          {language === 'en' ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
        </button>
        <div className="flex gap-2">
          <button 
            onClick={handleShare}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300"
            aria-label={t('share')}
          >
            <Share2 size={24} />
          </button>
          <button 
            onClick={() => toggleFavorite(hadith.id)}
            className={cn(
              "p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors",
              isFavorite(hadith.id) ? "text-rose-500" : "text-slate-600 dark:text-slate-300"
            )}
            aria-label="Favorite"
          >
            <Heart size={24} fill={isFavorite(hadith.id) ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Title & Meta */}
        <div className="text-center space-y-2">
          <span className="inline-block px-3 py-1 bg-primary-100 text-primary-800 dark:bg-primary-900/50 dark:text-primary-300 rounded-full text-xs font-semibold uppercase tracking-wider">
            {hadith.category[language]}
          </span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            {hadith.title[language]}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            #{hadith.id}
          </p>
        </div>

        {/* Arabic Text */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 relative">
          <div className="absolute -top-3 -end-3 w-12 h-12 bg-primary-50 dark:bg-primary-900/20 rounded-full flex items-center justify-center">
            <BookOpen size={20} className="text-primary-600 dark:text-primary-400" />
          </div>
          <p 
            className="text-2xl leading-loose text-right font-arabic text-slate-900 dark:text-slate-100"
            dir="rtl"
            style={{ fontFamily: "'Amiri', serif", lineHeight: '2.5' }}
          >
            {hadith.arabic}
          </p>
        </div>

        {/* Translation */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 border-b border-primary-200 dark:border-primary-800 pb-2 inline-block">
            {t('translation')}
          </h3>
          <p className={cn(
            "text-lg leading-relaxed text-slate-700 dark:text-slate-300",
            language === 'en' ? "font-serif" : "font-arabic"
          )}>
            "{hadith.translation[language]}"
          </p>
        </div>

        {/* Explanation */}
        <div className="bg-slate-100 dark:bg-slate-800/50 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-primary-700 dark:text-primary-400 font-semibold">
            <Info size={20} />
            <h4>{t('explanation')}</h4>
          </div>
          <p className={cn(
            "text-slate-600 dark:text-slate-400 leading-relaxed text-sm",
            language === 'en' ? "" : "font-arabic text-base"
          )}>
            {hadith.explanation[language]}
          </p>
        </div>

        {/* Reference */}
        <div className="flex items-center justify-center pt-4 border-t border-slate-200 dark:border-slate-800">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {t('source')}: <span className="text-primary-600 dark:text-primary-400">{hadith.reference[language]}</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
