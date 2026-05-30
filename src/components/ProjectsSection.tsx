import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronDown, Github } from 'lucide-react';
import { fadeUp, stagger } from '../lib/animations';
import { projects, type ProjectCategory } from '../data/projects';
import { useLanguage } from '../lib/i18n';

type ProjectFilter = 'all' | ProjectCategory;

const categoryBadgeClass: Record<ProjectCategory, string> = {
  security: 'text-rose-600 dark:text-rose-400 bg-rose-500/10',
  dev: 'text-blue-600 dark:text-blue-400 bg-blue-500/10',
  research: 'text-amber-600 dark:text-amber-400 bg-amber-500/10',
};

const statusBadgeClass = {
  completed: 'text-nordic-accent bg-accent-light',
  ongoing: 'text-blue-600 dark:text-blue-400 bg-blue-500/10',
  planning: 'text-amber-600 dark:text-amber-400 bg-amber-500/10',
};

export function ProjectsSection() {
  const { t, language } = useLanguage();
  const [filter, setFilter] = useState<ProjectFilter>('all');
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());

  const toggleExpanded = (id: number) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filtered = projects.filter(p => filter === 'all' || p.category === filter);

  const allFilterButtons: { value: ProjectFilter; label: string }[] = [
    { value: 'all', label: t.projects.filterAll },
    { value: 'security', label: t.projects.filterSecurity },
    { value: 'dev', label: t.projects.filterDev },
    { value: 'research', label: t.projects.filterResearch },
  ];
  const filterButtons = allFilterButtons.filter(
    btn => btn.value === 'all' || projects.some(p => p.category === btn.value)
  );

  const categoryLabel: Record<ProjectCategory, string> = {
    security: t.projects.categorySecurity,
    dev: t.projects.categoryDev,
    research: t.projects.categoryResearch,
  };

  const statusLabel = {
    completed: t.projects.statusCompleted,
    ongoing: t.projects.statusOngoing,
    planning: t.projects.statusPlanning,
  };

  return (
    <section id="projekte" className="section-container">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={stagger}
      >
        <motion.div
          variants={fadeUp}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-nordic-accent mb-4">{t.projects.badge}</h2>
            <h3 className="text-3xl md:text-5xl font-serif">{t.projects.title}</h3>
            <p className="text-nordic-muted mt-3 max-w-xl font-light text-sm md:text-base">
              {t.projects.description}
            </p>
          </div>

          <div className="flex bg-black/5 dark:bg-white/5 p-1 rounded-full border border-border-color w-fit shrink-0">
            {filterButtons.map(btn => (
              <button
                key={btn.value}
                onClick={() => setFilter(btn.value)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  filter === btn.value
                    ? 'bg-white dark:bg-zinc-800 text-nordic-accent shadow-sm'
                    : 'text-nordic-muted hover:text-nordic-text'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="flex flex-wrap justify-center items-start gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map(project => {
              const isExpanded = expandedIds.has(project.id);
              return (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.35 }}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isExpanded}
                  onClick={() => toggleExpanded(project.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleExpanded(project.id);
                    }
                  }}
                  className="w-full md:w-[calc((100%-1.5rem)/2)] cursor-pointer glass-card bg-glass-bg border border-border-color p-6 md:p-8 hover:border-nordic-accent/30 focus-visible:border-nordic-accent focus-visible:outline-none flex flex-col gap-5 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryBadgeClass[project.category]}`}>
                      {categoryLabel[project.category]}
                    </span>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusBadgeClass[project.status]}`}>
                      {statusLabel[project.status]}
                    </span>
                  </div>

                  <h4 className="text-xl font-serif font-bold text-nordic-text group-hover:text-nordic-accent transition-colors duration-300">
                    {project.title[language]}
                  </h4>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        key="details"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden flex flex-col gap-5"
                      >
                        <p className="text-sm text-nordic-muted font-light leading-relaxed">
                          {project.description[language]}
                        </p>

                        <ul className="space-y-2">
                          {project.highlights[language].map((highlight, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <CheckCircle2 size={14} className="text-nordic-accent shrink-0 mt-0.5" />
                              <span className="text-nordic-muted font-light leading-relaxed">{highlight}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="flex flex-wrap gap-2 pt-3 border-t border-border-color">
                          {project.tech.map(tag => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 bg-black/5 dark:bg-white/5 border border-border-color rounded-full text-xs text-nordic-text font-medium hover:border-nordic-accent/30 transition-colors duration-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {project.repoUrl && (
                          <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="self-start inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-nordic-text text-nordic-bg hover:bg-nordic-accent hover:text-white transition-colors duration-300"
                          >
                            <Github size={14} />
                            {language === 'de' ? 'Quellcode auf GitHub' : 'Source code on GitHub'}
                          </a>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="mt-auto self-start inline-flex items-center gap-1.5 text-xs font-semibold text-nordic-accent group-hover:text-nordic-accent-hover transition-colors pointer-events-none">
                    {isExpanded ? t.projects.showLess : t.projects.showMore}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                    />
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
