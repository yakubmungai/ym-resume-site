import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, Linkedin, Mail, GraduationCap, Laptop, Award, FileText, BarChart3, ChevronDown } from 'lucide-react';
import { BentoCard } from '../ui/BentoCard';
import NeuralLattice from '../ui/NeuralLattice';
import { PERSONAL_INFO } from '../../data/portfolio';
import pfpImage from '../../assets/pfp_black_bg.png';

export function Hero() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Close dropdown on scroll or click outside
  useEffect(() => {
    const handleScroll = () => setIsResumeOpen(false);
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.closest && !target.closest('.resume-dropdown-container')) {
        setIsResumeOpen(false);
      }
    };

    if (isResumeOpen) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isResumeOpen]);

  return (
    <section id="hero" className="grid grid-cols-1 md:grid-cols-3 gap-6 md:auto-rows-[240px]">
      <BentoCard className={`md:col-span-2 md:row-span-2 p-6 md:p-12 space-y-6 md:space-y-8 relative !overflow-visible backdrop-blur-md md:backdrop-blur-xl bg-white/[0.03] border-white/10 z-20`} delay={0.2}>
        <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
          <NeuralLattice />
        </div>
        <div className="relative z-10 space-y-4 md:space-y-8 pt-6 md:pt-12">

          <motion.div 
            initial={typeof window !== 'undefined' && window.innerWidth < 768 ? "visible" : "hidden"}
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.2
                }
              }
            }}
            className="space-y-4"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-8xl font-bold font-display tracking-tighter leading-[0.9]">
                {PERSONAL_INFO.name}
              </h1>
            </motion.div>
            <motion.h2 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="text-xl md:text-2xl text-accent font-bold font-display tracking-tight"
            >
              {PERSONAL_INFO.role}
            </motion.h2>
            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="text-sm md:text-lg text-white/60 font-light max-w-xl leading-relaxed"
            >
              {PERSONAL_INFO.intro}
            </motion.p>
          </motion.div>

          <motion.div 
            initial={typeof window !== 'undefined' && window.innerWidth < 768 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-row gap-3 md:gap-4 pt-2 md:pt-4 w-full sm:w-auto"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={`mailto:${PERSONAL_INFO.email}`}
              className="flex-1 sm:flex-initial px-4 md:px-8 py-3 md:py-4 bg-white text-black font-bold uppercase tracking-widest text-[10px] md:text-xs rounded-full hover:bg-white/90 transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)] text-center"
            >
              Get in touch
            </motion.a>
            <div className="relative flex-1 sm:flex-initial resume-dropdown-container">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsResumeOpen(!isResumeOpen)}
                className="w-full flex items-center justify-center gap-2 px-4 md:px-8 py-3 md:py-4 bg-white/5 text-white font-bold uppercase tracking-widest text-[10px] md:text-xs rounded-full border border-white/10 hover:bg-white/10 transition-all"
              >
                Resume <ChevronDown size={14} className={`transition-transform duration-300 ${isResumeOpen ? 'rotate-180' : ''}`} />
              </motion.button>

              <AnimatePresence>
                {isResumeOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full left-0 mt-2 w-64 glass-menu border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-[60]"
                  >
                    <div className="p-2 space-y-1">
                      <a
                        href={PERSONAL_INFO.resumes.swe}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors group/resume"
                      >
                        <div className="p-2 rounded-lg bg-accent/10 text-accent group-hover/resume:bg-accent group-hover/resume:text-black transition-colors">
                          <FileText size={18} />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[11px] font-bold text-white uppercase tracking-wider">Software Engineering</span>
                          <span className="text-[9px] text-white/40 uppercase tracking-widest">Technical Focus</span>
                        </div>
                      </a>
                      <a
                        href={PERSONAL_INFO.resumes.ba}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors group/resume"
                      >
                        <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 group-hover/resume:bg-blue-500 group-hover/resume:text-black transition-colors">
                          <BarChart3 size={18} />
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
          </motion.div>
        </div>

      </BentoCard>

      {/* Profile Photo & Minimal Info - Merged with Background */}
      <div className="md:col-span-1 md:row-span-2 flex flex-col">
        <motion.div
          initial={typeof window !== 'undefined' && window.innerWidth < 768 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          whileInView={typeof window !== 'undefined' && window.innerWidth < 768 ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
          transition={typeof window !== 'undefined' && window.innerWidth < 768 ? { duration: 0 } : { 
            opacity: { duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] },
            scale: { duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }
          }}
          viewport={{ once: true }}
          className="flex-grow overflow-hidden flex items-center justify-center pointer-events-none select-none relative scale-110 md:origin-bottom origin-center"
          style={{
            maskImage: 'radial-gradient(circle at center, black 40%, transparent 90%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 90%)'
          }}
        >
          <img
            src={pfpImage}
            alt="Jacob J. Mungai"
            className="w-full h-full object-contain mix-blend-screen brightness-110"
          />
        </motion.div>

        {/* Minimal Info overlay/caption - Centered */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-8 space-y-3 px-2 flex flex-col items-center"
        >
          <div className="flex items-center gap-2 text-white/40 select-none">
            <GraduationCap size={14} />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{PERSONAL_INFO.university} CS '25</span>
          </div>
          <div className="flex items-center gap-2 text-white/40 select-none">
            <Laptop size={14} />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">C++ · Python · SQL</span>
          </div>
          <div className="flex items-center gap-2 text-white/40 select-none">
            <Award size={14} />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">UWC Davis Scholar</span>
          </div>

          {/* Integrated Social Links */}
          <div className="flex gap-4 pt-4 mt-2 border-t border-white/5 w-full justify-center">
            <a href={PERSONAL_INFO.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="text-white/30 hover:text-white transition-colors group">
              <Github size={18} className="group-hover:scale-110 transition-transform" />
            </a>
            <a href={PERSONAL_INFO.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="text-white/30 hover:text-white transition-colors group">
              <Linkedin size={18} className="group-hover:scale-110 transition-transform" />
            </a>
            <a href={`mailto:${PERSONAL_INFO.email}`} aria-label="Send Email" className="text-white/30 hover:text-white transition-colors group">
              <Mail size={18} className="group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
