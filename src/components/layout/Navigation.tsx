import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, ChevronDown, FileText, BarChart3 } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolio';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-3 py-2 rounded-full glass"
    >
      <nav className="flex items-center gap-1 text-[13px] font-medium px-2">
        <a href="#hero" className="px-4 py-1.5 rounded-full hover:bg-white/10 transition-colors">Home</a>
        <a href="#work" className="px-4 py-1.5 rounded-full hover:bg-white/10 transition-colors">Projects</a>
        <a href="#web" className="px-4 py-1.5 rounded-full hover:bg-white/10 transition-colors">Web</a>
        <a href="#about" className="px-4 py-1.5 rounded-full hover:bg-white/10 transition-colors">About</a>
      </nav>
      <div className="w-[1px] h-4 bg-white/20 mx-1" />
      <div className="flex items-center gap-2 relative">
        <div className="relative">
          <button
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            onClick={() => setIsOpen(!isOpen)}
            className="hidden md:flex items-center gap-1.5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest bg-white/10 hover:bg-white/20 border border-white/10 rounded-full transition-all"
          >
            <Download size={12} /> Resume <ChevronDown size={12} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
                className="absolute top-full right-0 mt-2 w-56 glass-menu border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-[60]"
              >
                <div className="p-2 space-y-1">
                  <a
                    href={(PERSONAL_INFO as any).resumes.swe}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors group/resume"
                  >
                    <div className="p-2 rounded-lg bg-accent/10 text-accent group-hover/resume:bg-accent group-hover/resume:text-black transition-colors">
                      <FileText size={16} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-bold text-white uppercase tracking-wider">Software Engineering</span>
                      <span className="text-[9px] text-white/40 uppercase tracking-widest">Engineering Focus</span>
                    </div>
                  </a>
                  <a
                    href={(PERSONAL_INFO as any).resumes.ba}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors group/resume"
                  >
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 group-hover/resume:bg-blue-500 group-hover/resume:text-black transition-colors">
                      <BarChart3 size={16} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-bold text-white uppercase tracking-wider">Business Analysis</span>
                      <span className="text-[9px] text-white/40 uppercase tracking-widest">Strategy Focus</span>
                    </div>
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <a
          href={PERSONAL_INFO.links.linkedin}
          target="_blank"
          className="px-4 py-1.5 text-[13px] font-semibold bg-white text-black rounded-full hover:bg-white/90 transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:scale-105 active:scale-95"
        >
          Hire Me
        </a>
      </div>
    </motion.header>
  );
}
