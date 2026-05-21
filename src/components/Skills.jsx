import React, { useState, useRef } from 'react' // useState kept for filter tab
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { SKILLS, SKILL_CATEGORIES } from '../data/portfolio'

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: 'easeOut' } },
})

function SkillCard({ skill, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      whileHover={{ scale: 1.06, y: -4 }}
      className="group relative flex flex-col items-center gap-3 rounded-2xl border border-border bg-bg-card p-4 sm:p-5 cursor-default transition-all duration-300 hover:border-accent/50"
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 28px rgba(124,58,237,0.2)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
    >
      {/* Hover glow bg */}
      <div className="absolute inset-0 rounded-2xl bg-accent/0 group-hover:bg-accent/5 transition-all duration-300" />

      {/* SVG Icon */}
      <div className="relative z-10 w-14 h-14 flex items-center justify-center">
        <img src={skill.logo} alt={skill.name} className="w-14 h-14 object-contain" />
      </div>

      {/* Name */}
      <span className="relative z-10 text-xs sm:text-sm font-semibold text-slate-300 group-hover:text-white text-center transition-colors duration-200 leading-tight">
        {skill.name}
      </span>

      {/* Category badge on hover */}
      <span className="absolute top-2 right-2 text-[10px] px-1.5 py-0.5 rounded-full bg-accent/0 group-hover:bg-accent/20 text-accent/0 group-hover:text-accent-light font-medium transition-all duration-300">
        {skill.category}
      </span>
    </motion.div>
  )
}

export default function Skills() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? SKILLS
    : SKILLS.filter(s => s.category === activeCategory)

  return (
    <section id="skills" ref={sectionRef} className="relative py-24 overflow-hidden bg-bg">
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/6 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={fadeUp(0)}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="text-center mb-4"
        >
          <p className="section-label mb-3">My Skills</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Tech Stack &amp; AI Expertise
          </h2>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          variants={fadeUp(0.15)}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="flex flex-wrap justify-center gap-2 mt-8 mb-12"
        >
          {SKILL_CATEGORIES.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-accent text-white shadow-lg shadow-accent/30'
                  : 'bg-bg-card border border-border text-slate-400 hover:text-white hover:border-accent/40'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <motion.div
          variants={fadeUp(0.25)}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4"
            >
              {filtered.map((skill, i) => (
                <SkillCard key={skill.name} skill={skill} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Count badge */}
        <motion.p
          variants={fadeUp(0.35)}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="text-center text-muted text-sm mt-10"
        >
          Showing{' '}
          <span className="text-accent-light font-semibold">{filtered.length}</span>
          {' '}of{' '}
          <span className="text-accent-light font-semibold">{SKILLS.length}</span>
          {' '}technologies
        </motion.p>
      </div>
    </section>
  )
}
