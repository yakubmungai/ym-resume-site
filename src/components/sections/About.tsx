import { BentoCard } from '../ui/BentoCard';
import { PERSONAL_INFO, SKILLS } from '../../data/portfolio';

export function About() {
  return (
    <section id="about" className="space-y-8 pt-12">
      <div className="flex items-center gap-4">
        <h2 className="text-4xl md:text-5xl font-bold font-display tracking-tight uppercase">About Me</h2>
        <div className="flex-grow h-[1px] bg-white/5" />
        <span className="text-[10px] font-bold opacity-20 tracking-widest uppercase">SECTION 03</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <BentoCard className="md:col-span-2 p-12 space-y-10" delay={0.4}>
          <div className="space-y-6">
            <div className="space-y-6 text-white/60 font-light leading-relaxed text-lg">
            <p>
              I'm originally from <span className="text-white">Tanzania</span> and came to the U.S. as a UWC Davis Scholar at the University of Florida. Navigating that transition on my own solidified a core belief I bring to my career: <span className="text-white italic">"luck" is simply the result of showing up every day with curiosity and grit</span>. I don't wait for the right moment to appear; I prefer to build it through consistency and a relentless work ethic.
            </p>
            <p>
              {PERSONAL_INFO.sports}
            </p>
            <p>
              I'm also a self-proclaimed foodie with a very specific weakness—if there's a <span className="text-white">ribeye or lobster mac and cheese</span> on the menu, I'm there. Ultimately, I carry that same appetite for excellence into every project I touch.
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3 border-t border-white/5 pt-10">
          {SKILLS.map((skill, i) => (
            <div 
              key={i} 
              className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-[11px] font-medium text-white/50 hover:text-white hover:border-white/20 transition-all"
            >
              {skill}
            </div>
          ))}
        </div>
      </BentoCard>

      <BentoCard className="md:col-span-1 p-12 flex flex-col justify-end relative overflow-hidden" delay={0.5}>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent opacity-50" />
        <div className="relative z-10 space-y-4">
          <h3 className="text-5xl font-bold font-display tracking-tighter italic opacity-10">2026</h3>
          <p className="text-white/40 text-sm font-light uppercase tracking-widest">Available for full-time software engineering or business analyst roles</p>
          <div className="pt-4">
            <a href={`mailto:${PERSONAL_INFO.email}`} className="text-xl font-bold font-display hover:text-accent transition-colors underline underline-offset-8 decoration-white/10">
              Get in touch
            </a>
          </div>
        </div>
      </BentoCard>
      </div>
    </section>
  );
}
