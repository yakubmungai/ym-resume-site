import { motion } from 'motion/react';
import { Code2, Globe, ExternalLink, ArrowRight } from 'lucide-react';
import { BentoCard } from '../ui/BentoCard';
import { WEB_SHOWCASE, PERSONAL_INFO } from '../../data/portfolio';

export function WebSolutions() {
  return (
    <section id="web" className="space-y-8 pt-12">
      <div className="flex items-center gap-4">
        <h2 className="text-4xl md:text-5xl font-bold font-display tracking-tight uppercase">Web Solutions</h2>
        <div className="flex-grow h-[1px] bg-white/5" />
        <span className="text-[10px] font-bold opacity-20 tracking-widest">SECTION 02</span>
      </div>

      {/* The Service Promo Card - Full Width Header */}
      <BentoCard className="p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 bg-accent/5 border-accent/20" delay={0.2}>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 max-w-4xl">
          <div className="w-16 h-16 shrink-0 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
            <Code2 size={32} />
          </div>
          <div className="space-y-4">
            <h3 className="text-3xl md:text-4xl font-bold font-display leading-tight">Need a high-performance website?</h3>
            <p className="text-white/60 font-light leading-relaxed max-w-2xl">
              I build lightning-fast, visually stunning web experiences using modern engineering practices for rapid delivery. Currently available for select freelance projects while I pursue a full-time engineering role.
            </p>
          </div>
        </div>
        <a 
          href={`mailto:${PERSONAL_INFO.email}`}
          className="group flex items-center gap-3 px-8 py-4 bg-accent text-black font-bold uppercase tracking-[0.2em] text-[12px] rounded-xl hover:bg-accent/90 transition-all shrink-0"
        >
          Get Started <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
        </a>
      </BentoCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Web Project Showcase */}
        {WEB_SHOWCASE.map((project, i) => (
          <motion.a
            key={project.id}
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <BentoCard className="p-0 flex flex-col h-full overflow-hidden" delay={0.3 + (i * 0.1)}>
              <div className="aspect-[16/10] relative overflow-hidden bg-white/5 border-b border-white/5">
                {(project as any).image ? (
                  <img 
                    src={(project as any).image} 
                    alt={project.title} 
                    className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:scale-110 transition-transform duration-700">
                    <Globe size={80} />
                  </div>
                )}
                
                {/* Tags & Status Overlay */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
                  <div className="flex gap-1.5">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[8px] font-bold uppercase tracking-widest">{tag}</span>
                    ))}
                  </div>
                  {(project as any).isLive && (
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-accent/20 backdrop-blur-md border border-accent/20 text-[8px] font-bold uppercase tracking-widest text-accent">
                      <span className="w-1 h-1 rounded-full bg-accent animate-pulse" />
                      Live Project
                    </div>
                  )}
                </div>

                {/* Visit Site Overlay */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <div className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-bold uppercase tracking-[0.2em] text-[10px] translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    Visit Site <ExternalLink size={14} />
                  </div>
                </div>
              </div>

              <div className="p-6 flex-grow flex flex-col justify-between bg-white/[0.02]">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-bold font-display uppercase tracking-tight group-hover:text-accent transition-colors">{project.title}</h3>
                    <ExternalLink size={14} className="opacity-20 group-hover:opacity-100 group-hover:text-accent transition-all" />
                  </div>
                  <p className="text-white/40 text-[12px] font-light mb-4 line-clamp-2 leading-relaxed">{project.description}</p>
                </div>
                <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-widest text-accent/40 group-hover:text-accent transition-colors">
                  Engineering Depth <div className="w-3 h-[1px] bg-accent/40 group-hover:bg-accent group-hover:w-8 transition-all" />
                </div>
              </div>
            </BentoCard>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
