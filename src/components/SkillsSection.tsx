import { motion } from 'framer-motion';
import { Shield, BookOpen, Briefcase, Sparkles, Wrench } from 'lucide-react';
import type { ReactNode } from 'react';
import { fadeUp, stagger } from '../lib/animations';
import { skillsData, type SkillIconKey, type SkillLevel } from '../data/skills';
import { useLanguage } from '../lib/i18n';

const iconMap: Record<SkillIconKey, ReactNode> = {
  security: <Shield className="text-nordic-accent" size={18} />,
  coding: <BookOpen className="text-nordic-accent" size={18} />,
  admin: <Briefcase className="text-nordic-accent" size={18} />,
  ai: <Sparkles className="text-nordic-accent" size={18} />,
  tools: <Wrench className="text-nordic-accent" size={18} />,
};

interface ProficiencyDotsProps {
  level: SkillLevel;
}

function ProficiencyDots({ level }: ProficiencyDotsProps) {
  return (
    <div className="flex items-center gap-1 shrink-0" role="img" aria-label={`Level ${level} of 5`}>
      {[1, 2, 3, 4, 5].map(i => (
        <span
          key={i}
          className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
            i <= level ? 'bg-nordic-accent' : 'bg-nordic-muted/25'
          }`}
        />
      ))}
    </div>
  );
}

export function SkillsSection() {
  const { t, language } = useLanguage();

  return (
    <section id="kompetenzen" className="bg-nordic-surface dark:bg-zinc-900/40 py-24 border-y border-border-color transition-colors duration-300">
      <div className="section-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={stagger}
          className="mb-16 text-center"
        >
          <motion.span variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest text-nordic-accent mb-4 block">
            {t.skills.badge}
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-serif max-w-3xl mx-auto leading-tight">
            {t.skills.title}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-nordic-muted mt-4 max-w-xl mx-auto font-light">
            {t.skills.description}
          </motion.p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6">
          {(Object.entries(skillsData) as [SkillIconKey, (typeof skillsData)[SkillIconKey]][]).map(([key, category]) => (
            <motion.div
              key={key}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="w-full sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)] glass-card bg-glass-bg border border-border-color p-6 md:p-7 flex flex-col hover:border-nordic-accent/30 duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-full bg-accent-light flex items-center justify-center shrink-0">
                  {iconMap[category.iconKey]}
                </div>
                <h4 className="font-serif font-bold text-base md:text-lg text-nordic-text leading-tight">
                  {t.skills.categories[key]}
                </h4>
              </div>

              <ul className="space-y-3" aria-label={t.skills.levelLabel}>
                {category.items.map(skill => (
                  <li key={skill.name.de} className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-nordic-text font-medium">{skill.name[language]}</span>
                    <ProficiencyDots level={skill.level} />
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
