import { ArrowUpRight } from 'lucide-react';
import { BentoCard } from '../ui/BentoCard';
import { PROJECTS } from '../../data/portfolio';

export function Projects() {
  return (
    <section id="work" className="space-y-8 pt-12">
      <div className="flex items-center gap-4">
        <h2 className="text-4xl md:text-5xl font-bold font-display tracking-tight uppercase">Projects</h2>
        <div className="flex-grow h-[1px] bg-white/5" />
        <span className="text-[10px] font-bold opacity-20 tracking-widest">SECTION 01</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PROJECTS.map((project, i) => (
          <BentoCard 
            key={project.id} 
            className="p-0 group flex flex-col h-full"
            delay={0.1 * i}
          >
            <div className="aspect-[16/10] overflow-hidden">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700" />
            </div>
            <div className="p-6 bg-[#0a0a0a] flex-grow flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold font-display leading-tight">{project.title}</h3>
                  <a href={project.href} target="_blank" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all shrink-0">
                    <ArrowUpRight size={14} />
                  </a>
                </div>
                <p className="text-white/40 text-[12px] font-light leading-relaxed line-clamp-3">{project.description}</p>
              </div>
            </div>
          </BentoCard>
        ))}
      </div>
    </section>
  );
}
