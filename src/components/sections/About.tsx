import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { BentoCard } from '../ui/BentoCard';
import { PERSONAL_INFO, SKILLS } from '../../data/portfolio';
import { useLanguage } from '../../context/LanguageContext';

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="space-y-8 pt-12">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-4"
      >
        <h2 className="text-4xl md:text-5xl font-bold font-display tracking-tight uppercase">{t('about.title')}</h2>
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex-grow h-[1px] bg-white/5 origin-left" 
        />
        <span className="text-[10px] font-bold opacity-20 tracking-widest uppercase">{t('about.section')}</span>
      </motion.div>

      <div className="grid grid-cols-1 md:col-span-3 gap-6">
        <BentoCard className="md:col-span-2 p-12 space-y-10" delay={0.4}>
          <div className="space-y-6">
            <div className="space-y-6 text-white/60 font-light leading-relaxed text-lg">
            <p>
              {t('about.bio_1')}
            </p>
            <p>
              {t('about.bio_2')}
            </p>
            <p>
              {t('about.bio_3')}
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3 border-t border-white/5 pt-10">
          {SKILLS.map((skill, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 + (i * 0.05) }}
              className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-[11px] font-medium text-white/40 cursor-default"
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </BentoCard>

      <BentoCard id="contact" className="md:col-span-1 p-12 flex flex-col justify-end relative overflow-hidden" delay={0.5}>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent opacity-50" />
        <div className="relative z-10 space-y-4">
          <h3 className="text-5xl font-bold font-display tracking-tighter italic opacity-10 leading-none">2026</h3>
          <p className="text-white/40 text-[11px] font-bold uppercase tracking-widest leading-relaxed">{t('about.seeking')}</p>
          <div className="pt-4">
            <a href={`mailto:${PERSONAL_INFO.email}`} className="group inline-flex items-center gap-2 text-xl font-bold font-display hover:text-accent transition-colors underline underline-offset-8 decoration-white/10">
              {t('about.cta')} <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </a>
          </div>
        </div>
      </BentoCard>
      </div>
    </section>
  );
}
