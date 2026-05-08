import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen } from 'lucide-react';

interface SplashProps {
  onComplete: () => void;
}

export function Splash({ onComplete }: SplashProps) {
  return (
    <AnimatePresence>
      <motion.div
        key="splash"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="fixed inset-0 bg-emerald-600 flex flex-col items-center justify-center z-[200] text-white"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
          onAnimationComplete={() => {
            setTimeout(onComplete, 1500); // Wait 1.5s then trigger complete
          }}
          className="flex flex-col items-center"
        >
          <div className="w-28 h-28 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center mb-6 shadow-2xl ring-1 ring-white/20">
            <BookOpen className="w-14 h-14 text-white" />
          </div>
          <h1 className="text-4xl font-bold font-pashto mb-3 tracking-wide">حديثونه</h1>
          <p className="text-emerald-100/80 font-pashto text-sm tracking-wider">نبوي احاديث په پښتو ژباړه</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
