import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface DialogProps {
  isOpen: boolean;
  onClose?: () => void;
  title?: string;
  children: ReactNode;
  hideCloseBtn?: boolean;
}

export function Dialog({ isOpen, onClose, title, children, hideCloseBtn }: DialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100]"
            onClick={onClose}
          />
          <div className="fixed inset-0 flex items-center justify-center z-[101] p-5 pointer-events-none">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden pointer-events-auto flex flex-col max-h-[90vh] ring-1 ring-slate-900/5 dark:ring-white/10"
              dir="rtl"
            >
              {title && (
                <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
                  <h2 className="font-bold text-slate-800 dark:text-slate-100 font-pashto text-lg">{title}</h2>
                  {!hideCloseBtn && onClose && (
                    <button onClick={onClose} className="p-2 -mr-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              )}
              <div className="p-6 overflow-y-auto font-pashto flex flex-col hide-scrollbar text-slate-700 dark:text-slate-300">
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
