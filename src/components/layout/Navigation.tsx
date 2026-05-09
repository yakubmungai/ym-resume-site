import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, ChevronDown, FileText, BarChart3, Menu, X } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolio';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex flex-col md:flex-row items-center gap-2 px-3 py-2 rounded-3xl md:rounded-full glass w-[calc(100%-2rem)] md:w-auto"
    >
      <div className="flex items-center justify-between w-full md:w-auto gap-2">
        <nav className="hidden md:flex items-center gap-1 text-[13px] font-medium px-2">
          <a href="#hero" className="px-4 py-1.5 rounded-full hover:bg-white/10 transition-colors">Home</a>
          <a href="#work" className="px-4 py-1.5 rounded-full hover:bg-white/10 transition-colors">Projects</a>
          <a href="#web" className="px-4 py-1.5 rounded-full hover:bg-white/10 transition-colors">Web</a>
          <a href="#about" className="px-4 py-1.5 rounded-full hover:bg-white/10 transition-colors">About</a>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div className="md:hidden w-[1px] h-4 bg-white/20" />
        <div className="hidden md:block w-[1px] h-4 bg-white/20 mx-1" />
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
            className="px-4 py-1.5 text-[13px] font-semibold bg-white text-black rounded-full hover:bg-white/90 transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:scale-105 active:scale-95 shrink-0"
          >
            Hire Me
          </a>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden w-full overflow-hidden"
          >
            <nav className="flex flex-col gap-1 py-4 border-t border-white/5 mt-2">
              <a 
                href="#hero" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 rounded-xl hover:bg-white/5 transition-colors text-sm font-medium"
              >
                Home
              </a>
              <a 
                href="#work" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 rounded-xl hover:bg-white/5 transition-colors text-sm font-medium"
              >
                Projects
              </a>
              <a 
                href="#web" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 rounded-xl hover:bg-white/5 transition-colors text-sm font-medium"
              >
                Web Solutions
              </a>
              <a 
                href="#about" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 rounded-xl hover:bg-white/5 transition-colors text-sm font-medium"
              >
                About
              </a>
              
              <div className="p-2 pt-4 space-y-2">
                <div className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] px-2">Resumes</div>
                <div className="grid grid-cols-1 gap-2">
                  <a
                    href={(PERSONAL_INFO as any).resumes.swe}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <FileText size={16} className="text-accent" />
                    <span className="text-xs font-bold uppercase tracking-wider">Software Engineering</span>
                  </a>
                  <a
                    href={(PERSONAL_INFO as any).resumes.ba}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <BarChart3 size={16} className="text-blue-400" />
                    <span className="text-xs font-bold uppercase tracking-wider">Business Analysis</span>
                  </a>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
