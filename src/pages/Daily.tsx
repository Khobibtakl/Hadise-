import { useAppContext } from '../context/AppContext';
import { HadithCard } from '../components/HadithCard';

export function Daily() {
  const { dailyHadith } = useAppContext();

  return (
    <div className="flex flex-col min-h-full">
      <div className="bg-emerald-600 px-6 py-6 text-white rounded-b-3xl shadow-md z-10 sticky top-0 flex items-center justify-center">
        <h1 className="text-xl font-bold">د نن حديث</h1>
      </div>
      
      <div className="flex-1 flex flex-col p-4 justify-center items-center">
        {dailyHadith ? (
          <HadithCard hadith={dailyHadith} className="w-full shadow-xl shadow-emerald-900/5 ring-1 ring-emerald-900/5" />
        ) : (
          <div className="text-slate-400">حديث نه دی موندل شوی</div>
        )}
      </div>
    </div>
  );
}
