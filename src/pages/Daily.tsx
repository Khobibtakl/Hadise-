import { useAppContext } from '../context/AppContext';
import { HadithCard } from '../components/HadithCard';

export function Daily() {
  const { dailyHadith } = useAppContext();

  return (
    <div className="flex flex-col min-h-full">
      <div className="bg-primary-600 px-6 pt-[calc(env(safe-area-inset-top,20px)+1.5rem)] pb-24 text-white rounded-b-3xl shadow-md">
        <h1 className="text-2xl font-bold mb-2 text-center">ورځنی حديث</h1>
        <p className="text-primary-100 text-center text-sm font-medium">د نن ورځې لپاره ځانګړی حدیث</p>
      </div>
      
      <div className="px-4 -mt-16 pb-6 max-w-2xl mx-auto w-full">
        {dailyHadith ? (
          <HadithCard hadith={dailyHadith} className="shadow-xl ring-1 ring-black/5" />
        ) : (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-8 text-center text-slate-500 dark:text-slate-400">
            حدیث شتون نلري
          </div>
        )}
      </div>
    </div>
  );
}
