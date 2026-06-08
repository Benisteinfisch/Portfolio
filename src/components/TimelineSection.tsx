import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { stagger } from '../lib/animations';
import { timelineItems } from '../data/timeline';
import { useLanguage } from '../lib/i18n';

type TimelineFilter = 'all' | 'work' | 'education';

export function TimelineSection() {
  const { t, language } = useLanguage();
  const [timelineFilter, setTimelineFilter] = useState<TimelineFilter>('all');

  const filteredTimeline = timelineItems.filter(
    item => timelineFilter === 'all' || item.type === timelineFilter
  );

  const filterButtons = [
    { value: 'all' as const, label: t.timeline.filterAll },
    { value: 'work' as const, label: t.timeline.filterWork },
    { value: 'education' as const, label: t.timeline.filterEducation },
  ];

  return (
    <section id="werdegang" className="section-container">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={stagger}
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-nordic-accent mb-4 font-sans">{t.timeline.badge}</p>
            <h2 className="text-3xl md:text-5xl font-serif">{t.timeline.title}</h2>
          </div>

          <div className="flex bg-black/5 dark:bg-white/5 p-1 rounded-full border border-border-color w-fit">
            {filterButtons.map(btn => (
              <button
                key={btn.value}
                onClick={() => setTimelineFilter(btn.value)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  timelineFilter === btn.value
                    ? 'bg-white dark:bg-zinc-800 text-nordic-accent shadow-sm'
                    : 'text-nordic-muted hover:text-nordic-text'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        <div className="relative pl-6 md:pl-0 mt-8">
          <div className="absolute left-3 md:left-1/2 top-0 bottom-0 w-0.5 bg-border-color -translate-x-1/2 transition-colors duration-300" />

          <div className="space-y-12">
            <AnimatePresence mode="popLayout">
              {filteredTimeline.map((item, index) => {
                const isEven = index % 2 === 0;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="relative flex flex-col md:flex-row items-stretch md:justify-between group"
                  >
                    <div className="absolute left-3 md:left-1/2 -translate-x-1/2 top-6 w-5 h-5 rounded-full bg-nordic-bg border-4 border-border-color group-hover:border-nordic-accent transition-all duration-300 z-10 timeline-dot" />

                    <div className={`hidden md:flex items-center w-[45%] ${isEven ? 'justify-end text-right' : 'justify-start text-left order-last'}`}>
                      <div className="flex items-center gap-2 text-sm font-semibold text-nordic-accent font-mono">
                        <Calendar size={14} />
                        {item.date[language]}
                      </div>
                    </div>

                    <div className={`w-full md:w-[45%] ${isEven ? 'md:order-last' : ''}`}>
                      <div className="glass-card bg-glass-bg border border-border-color p-6 md:p-8 hover:border-nordic-accent/30 transition-all duration-300 h-full">
                        <div className="md:hidden flex items-center gap-1.5 text-xs font-semibold text-nordic-accent font-mono mb-2">
                          <Calendar size={12} />
                          {item.date[language]}
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-nordic-text mb-1">{item.title[language]}</h3>
                        <span className="inline-block text-xs font-medium text-nordic-accent bg-accent-light px-2.5 py-1 rounded-full mb-4">
                          {item.institution[language]}
                        </span>
                        <ul className="space-y-2 text-sm text-nordic-muted font-light list-disc pl-4">
                          {item.details[language].map((detail, dIdx) => (
                            <li key={dIdx} className="leading-relaxed">{detail}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
