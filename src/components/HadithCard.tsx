import { forwardRef } from 'react';
import { Heart, Share2, BookOpen } from 'lucide-react';
import { Hadith } from '../types';
import { useAppContext } from '../context/AppContext';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

interface HadithCardProps {
  hadith: Hadith;
  className?: string;
}

export const HadithCard = forwardRef<HTMLDivElement, HadithCardProps>(({ hadith, className }, ref) => {
  const { isFavorite, toggleFavorite } = useAppContext();
  const favorite = isFavorite(hadith.id);

  const handleShare = async () => {
    const text = `${hadith.arabic}\n\n${hadith.pashto || hadith.english?.text}\n\nحديثونه`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'حديث',
          text: text,
        });
      } catch (err) {
        console.error('Error sharing', err);
      }
    } else {
      navigator.clipboard.writeText(text);
      alert('حديث کاپي شو!');
    }
  };

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={cn("bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden flex flex-col", className)}
    >
      <div className="p-4 bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
        <span className="text-xs font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-500/10 px-2.5 py-1 rounded-full">
          {hadith.category || (<>&nbsp;</>)}
        </span>
        <div className="flex bg-primary-500 text-white w-8 h-8 rounded-full items-center justify-center font-bold text-sm shadow-sm ring-2 ring-white dark:ring-slate-800">
          {hadith.idInBook || hadith.id}
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col gap-6">
        <div className="bg-primary-50/50 dark:bg-primary-900/10 rounded-xl p-5 border border-primary-100/50 dark:border-primary-500/10 relative">
          <BookOpen className="absolute text-primary-100 dark:text-primary-500/10 w-16 h-16 top-2 left-2 rotate-12 -z-0" />
          <p className="text-xl leading-[2.2] text-slate-800 dark:text-slate-100 text-right z-10 relative font-arabic" dir="rtl">
            {hadith.arabic}
          </p>
        </div>
        
        <div className="px-1 text-slate-600 dark:text-slate-300">
          <p className="text-lg leading-relaxed text-right font-pashto" dir="rtl">
            {hadith.pashto || hadith.english?.text}
          </p>
        </div>
      </div>

      <div className="px-5 py-4 border-t border-slate-100 dark:border-slate-700/50 flex items-center justify-between bg-slate-50/30 dark:bg-slate-800/30 mt-auto">
        <button 
          onClick={() => toggleFavorite(hadith.id)}
          className={cn(
            "p-3 rounded-xl transition-all active:scale-95 flex items-center justify-center flex-1 ml-2",
            favorite ? "bg-rose-50 text-rose-500 dark:bg-rose-500/10" : "bg-white dark:bg-slate-700 text-slate-400 border border-slate-100 dark:border-slate-600"
          )}
        >
          <Heart className={cn("w-5 h-5", favorite && "fill-current")} />
        </button>
        <button 
          onClick={handleShare}
          className="p-3 bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-600 rounded-xl transition-all active:scale-95 flex items-center justify-center flex-1 mr-2"
        >
          <Share2 className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
});
