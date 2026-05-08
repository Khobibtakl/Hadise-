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
    const text = `${hadith.arabic}\n\n${hadith.pashto}\n\n[${hadith.source}]`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'حديث',
          text: text,
        });
      } catch (e) {
        console.error('Error sharing:', e);
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
      className={cn("bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col", className)}
    >
      <div className="p-4 bg-slate-50/50 border-b border-slate-100 flex justify-between items-center">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
          <BookOpen className="w-3.5 h-3.5" />
          {hadith.category}
        </span>
        <span className="text-xs text-slate-500 font-medium">{hadith.source}</span>
      </div>
      
      <div className="p-6 flex-1 flex flex-col gap-6">
        <p className="text-xl leading-loose font-arabic text-right text-slate-800" dir="rtl">
          "{hadith.arabic}"
        </p>
        
        <div className="w-12 h-px bg-emerald-100 mx-auto rounded-full"></div>
        
        <p className="text-base leading-relaxed text-slate-600 font-pashto text-justify" dir="rtl">
          {hadith.pashto}
        </p>
      </div>

      <div className="p-3 border-t border-slate-50 flex justify-between items-center bg-white">
        <button 
          onClick={() => toggleFavorite(hadith.id)}
          className="p-2.5 rounded-full hover:bg-slate-50 active:bg-slate-100 transition-colors group"
        >
          <Heart className={cn("w-5 h-5 transition-colors", favorite ? "fill-rose-500 text-rose-500" : "text-slate-400 group-hover:text-rose-400")} />
        </button>
        <button 
          onClick={handleShare}
          className="p-2.5 rounded-full hover:bg-slate-50 active:bg-slate-100 text-slate-400 transition-colors"
        >
          <Share2 className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
});
