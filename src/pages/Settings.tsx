import { useState } from 'react';
import { Info, Bell, Moon, BookText, Phone, Mail, Send, CheckCircle2 } from 'lucide-react';
import { Dialog } from '../components/Dialog';
import { useAppContext } from '../context/AppContext';
import { cn } from '../lib/utils';
import { Palette } from 'lucide-react';

export function Settings() {
  const [showAbout, setShowAbout] = useState(false);
  const [showSources, setShowSources] = useState(false);
  const { notificationsEnabled, toggleNotifications, isDarkMode, toggleDarkMode, theme, setTheme } = useAppContext();
  const THEMES = [{"id":"blue","name":"آبي","color":"#2563eb"},{"id":"emerald","name":"زمردي","color":"#059669"},{"id":"rose","name":"ګلابي","color":"#e11d48"},{"id":"amber","name":"زېړ","color":"#d97706"},{"id":"violet","name":"بنفش","color":"#7c3aed"},{"id":"teal","name":"شین","color":"#0d9488"},{"id":"indigo","name":"نیلي","color":"#4f46e5"},{"id":"cyan","name":"آسماني","color":"#0891b2"},{"id":"fuchsia","name":"ارغواني","color":"#c026d3"},{"id":"orange","name":"نارنجي","color":"#ea580c"}];

  return (
    <div className="flex flex-col min-h-full">
      <div className="bg-primary-600 px-6 pt-[calc(env(safe-area-inset-top,20px)+1.5rem)] pb-6 text-white rounded-b-3xl shadow-md z-10 sticky top-0 flex items-center justify-center">
        <h1 className="text-2xl font-bold">تنظيمات</h1>
      </div>
      
      <div className="p-4 flex flex-col gap-4">
        
        
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden mb-4">
          <div className="p-4 border-b border-slate-50 dark:border-slate-700 flex items-center gap-4">
            <div className="flex-1 text-right" dir="rtl">
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-sm">د اپلکيشن رنګ (تم)</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">خپل د خوښې رنګ وټاکئ</p>
            </div>
            <div className="p-2 bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 rounded-lg">
              <Palette className="w-5 h-5" />
            </div>
          </div>
          <div className="p-4 flex flex-wrap gap-3 justify-end dir-rtl">
            {THEMES.map(t => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all border",
                  theme === t.id 
                    ? "border-transparent text-white shadow-md scale-105" 
                    : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700"
                )}
                style={theme === t.id ? { backgroundColor: t.color } : {}}
              >
                {t.name}
                <div 
                  className={cn("w-3 h-3 rounded-full", theme === t.id ? "bg-white/30" : "")} 
                  style={theme !== t.id ? { backgroundColor: t.color } : {}}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
          <div className="p-4 border-b border-slate-50 dark:border-slate-700 flex items-center gap-4 cursor-pointer" onClick={toggleNotifications}>
            <div className="p-2 bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 rounded-lg">
              <Bell className="w-5 h-5" />
            </div>
            <div className="flex-1 text-right" dir="rtl">
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-sm">ورځنی يادګېرنه</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">هره ورځ د نوي حديث يادګېرنه</p>
            </div>
            <div className={cn("w-12 h-6 rounded-full relative transition-colors shrink-0", notificationsEnabled ? "bg-primary-500" : "bg-slate-200 dark:bg-slate-600")}>
               <div className={cn("w-4 h-4 bg-white rounded-full absolute top-1 shadow-sm transition-all", notificationsEnabled ? "left-1" : "right-1")}></div>
            </div>
          </div>
          
          <div className="p-4 flex items-center gap-4 cursor-pointer" onClick={toggleDarkMode}>
            <div className="p-2 bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 rounded-lg">
              <Moon className="w-5 h-5" />
            </div>
            <div className="flex-1 text-right" dir="rtl">
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-sm">تاریکه بڼه</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">اپلکيشن په توره بڼه بدل کړئ</p>
            </div>
            <div className={cn("w-12 h-6 rounded-full relative transition-colors shrink-0", isDarkMode ? "bg-primary-500" : "bg-slate-200 dark:bg-slate-600")}>
               <div className={cn("w-4 h-4 bg-white rounded-full absolute top-1 shadow-sm transition-all", isDarkMode ? "left-1" : "right-1")}></div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
          <div onClick={() => setShowAbout(true)} className="p-4 border-b border-slate-50 dark:border-slate-700 flex items-center gap-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50">
            <div className="flex-1 text-right" dir="rtl">
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-sm">د اپلکيشن په اړه</h3>
            </div>
            <div className="p-2 bg-slate-50 dark:bg-slate-700/50 text-slate-600 dark:text-slate-400 rounded-lg">
              <Info className="w-5 h-5" />
            </div>
          </div>
          
          <div onClick={() => setShowSources(true)} className="p-4 flex items-center gap-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50">
            <div className="flex-1 text-right" dir="rtl">
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-sm">سرچينې او صحت</h3>
            </div>
            <div className="p-2 bg-slate-50 dark:bg-slate-700/50 text-slate-600 dark:text-slate-400 rounded-lg">
              <BookText className="w-5 h-5" />
            </div>
          </div>
        </div>
        
        <div className="text-center mt-8 mb-4">
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium flex items-center justify-center gap-1.5 mb-1 text-balance">
            <span className="opacity-60">کاریال جوړوونکی :</span> طالب العلم خبيب تکل
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-sans tracking-widest mt-2 uppercase opacity-40">
            VERSION 1.0.0
          </p>
        </div>

      </div>

      <Dialog isOpen={showAbout} onClose={() => setShowAbout(false)} title="د اپلکيشن په اړه">
        <div className="flex flex-col gap-6">
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed text-justify">
            ددغه کاریال جوړوونکی طالب العلم خبيب تکل ده چې فی الحال د لوګر ولايت په مرکزي جهادي مدرسې خپلې دیني زده کړې دورې په کچه سرته رسولي نوموړی هيله لري خپل اسلام مقدس دین ته خدمت تر سره کړي.
            <br className="my-2" />
            نو له تاسو څخه مو هیله ده چې د کاریال حديثونه اول خپله مطالعه او عمل پرې وکړئ بيايې له نورو مسلمانانو سره شریک کړئ.
            <br className="my-2" />
            <strong className="text-slate-800 dark:text-slate-100 font-medium">په درنښت داسلامي کاریالونو څانګه</strong>
          </p>

          <div className="flex flex-col gap-3 mt-2 border-t border-slate-100 dark:border-slate-700 pt-5">
            <h4 className="text-slate-800 dark:text-slate-200 font-bold mb-1 text-sm">له مونږ سره اړیکه</h4>
            <a href="https://wa.me/93765443156" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 transition-colors rounded-xl text-sm font-medium" dir="ltr">
              <Phone className="w-5 h-5 shrink-0" />
              <span className="flex-1 text-right">وتساپ (+93 765 44 31 56)</span>
            </a>
            <a href="tel:+93777233699" className="flex items-center gap-3 p-3 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors rounded-xl text-sm font-medium" dir="ltr">
              <Phone className="w-5 h-5 shrink-0" />
              <span className="flex-1 text-right">ټلیفون (+93 777 23 36 99)</span>
            </a>
            <a href="mailto:khobibtakl@gmail.com" className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors rounded-xl text-sm font-medium" dir="ltr">
              <Mail className="w-5 h-5 shrink-0" />
              <span className="flex-1 text-right truncate">khobibtakl@gmail.com</span>
            </a>
            <a href="https://t.me/khubaib_taki" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-[#0088cc]/10 text-[#0088cc] dark:text-[#33aadd] hover:bg-[#0088cc]/20 transition-colors rounded-xl text-sm font-medium" dir="ltr">
              <Send className="w-5 h-5 shrink-0" />
              <span className="flex-1 text-right truncate">@khubaib_taki</span>
            </a>
          </div>
        </div>
      </Dialog>

      <Dialog isOpen={showSources} onClose={() => setShowSources(false)} title="سرچينې او صحت">
        <div className="flex flex-col gap-4 items-center">
          <div className="w-16 h-16 bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center mb-2">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed text-center">
            مونږ تر ډېره کوشش کړی چې په اپلکيشن کې داسې احادیث را یو ځای کړو چې صحیح وي بیا هم انسان او بشر سره خطا کېدل لازم دي نو که چېرته کوم حدیث غلط یا ضعیف وی او یا هم په سند کې يې مشکل وي، نو مونږ سره اړیکه ونیسئ ترڅو یاد حدیث اصلاح کړو.
          </p>
          <div className="bg-slate-50 dark:bg-slate-700/50 text-slate-600 dark:text-slate-400 py-3 px-4 rounded-xl text-center w-full mt-2">
            <p className="text-sm font-medium text-slate-800 dark:text-slate-200">په درنښت:</p>
            <p className="text-sm">ستاسو ورور طالب العلم خبيب تکل</p>
            <p className="text-sm mt-1">او طالب العلم سيف الله السیف المسلول</p>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
