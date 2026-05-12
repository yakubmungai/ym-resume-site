import { motion } from 'motion/react';
import { useLanguage } from '../../context/LanguageContext';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center bg-white/5 p-0.5 rounded-full border border-white/10 shrink-0">
      <button
        onClick={() => setLanguage('en')}
        className={`px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider rounded-full transition-all ${
          language === 'en' 
            ? 'bg-white text-black shadow-sm' 
            : 'text-white/40 hover:text-white'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('sw')}
        className={`px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider rounded-full transition-all ${
          language === 'sw' 
            ? 'bg-white text-black shadow-sm' 
            : 'text-white/40 hover:text-white'
        }`}
      >
        SW
      </button>
    </div>
  );
}
