import React, { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { FiGithub, FiExternalLink, FiX, FiChevronLeft, FiChevronRight, FiGrid } from 'react-icons/fi'
import { PROJECTS } from '../data/portfolio'

const FILTER_TABS = ['All', 'Featured', 'FE', 'BE']
const CATEGORY_LABEL = { FE: 'Frontend', BE: 'Backend' }
const MAX_ON_PAGE = 6

// ─── Project detail modal ────────────────────────────────────────────────────
function ProjectModal({ project, onClose }) {
  const images = project.gallery?.length ? project.gallery : [project.image]
  const [current, setCurrent] = useState(0)
  const prev = () => setCurrent((i) => (i - 1 + images.length) % images.length)
  const next = () => setCurrent((i) => (i + 1) % images.length)

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-bg-card border border-border rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <button onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-bg/80 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
          <FiX size={16} />
        </button>

        {/* Carousel */}
        <div className="relative bg-bg rounded-t-2xl overflow-hidden h-64 sm:h-72">
          <img src={images[current]} alt={project.title}
            className="w-full h-full object-cover object-top" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-bg-card to-transparent" />
          {images.length > 1 && (
            <>
              <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-accent/70 transition-colors">
                <FiChevronLeft size={18} />
              </button>
              <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-accent/70 transition-colors">
                <FiChevronRight size={18} />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {images.map((_, i) => (
                  <button key={i} onClick={() => setCurrent(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'bg-accent w-4' : 'bg-white/40 w-1.5'}`} />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <div className="flex items-center flex-wrap gap-2 mb-2">
                {project.tags.map(t => (
                  <span key={t} className="text-xs px-2.5 py-0.5 rounded-full bg-accent/20 text-accent-light font-semibold border border-accent/30">{t}</span>
                ))}
                {project.category && (
                  <span className="text-xs px-2.5 py-0.5 rounded-full border border-border text-muted">
                    {CATEGORY_LABEL[project.category] || project.category}
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold text-white">{project.title}</h3>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-slate-400 hover:text-white hover:border-accent/50 transition-all">
                <FiGithub size={16} />
              </a>
              <a href={project.demo} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-slate-400 hover:text-white hover:border-accent/50 transition-all">
                <FiExternalLink size={16} />
              </a>
            </div>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map(t => (
              <span key={t} className="text-xs px-3 py-1 rounded-full bg-bg border border-border text-slate-400">{t}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── All Projects full-screen overlay ────────────────────────────────────────
function AllProjectsOverlay({ onClose, onSelectProject }) {
  const [filter, setFilter] = useState('All')

  const filtered = PROJECTS.filter(p => {
    if (filter === 'All') return true
    if (filter === 'Featured') return p.featured
    return p.category === filter
  })

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-bg overflow-y-auto"
    >
      {/* Sticky header */}
      <div className="sticky top-0 z-10 bg-bg/90 backdrop-blur-xl border-b border-border px-4 sm:px-8 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <FiGrid className="text-accent" size={20} />
          <h2 className="text-lg font-bold text-white">All Projects</h2>
          <span className="text-xs px-2 py-0.5 rounded-full bg-accent/20 text-accent-light font-semibold border border-accent/30">
            {PROJECTS.length} total
          </span>
        </div>

        {/* Filter pills */}
        <div className="hidden sm:flex items-center gap-2">
          {FILTER_TABS.map(tab => (
            <button key={tab} onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                filter === tab
                  ? 'bg-accent text-white shadow-lg shadow-accent/30'
                  : 'bg-bg-card border border-border text-slate-400 hover:text-white hover:border-accent/40'
              }`}>
              {tab === 'FE' ? 'Frontend' : tab === 'BE' ? 'Backend' : tab}
            </button>
          ))}
        </div>

        <button onClick={onClose}
          className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-slate-400 hover:text-white hover:border-accent/50 transition-all flex-shrink-0">
          <FiX size={18} />
        </button>
      </div>

      {/* Mobile filter */}
      <div className="sm:hidden flex flex-wrap gap-2 px-4 pt-4">
        {FILTER_TABS.map(tab => (
          <button key={tab} onClick={() => setFilter(tab)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              filter === tab ? 'bg-accent text-white' : 'bg-bg-card border border-border text-slate-400'
            }`}>
            {tab === 'FE' ? 'Frontend' : tab === 'BE' ? 'Backend' : tab}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i}
                onClick={(p) => { onSelectProject(p) }} compact />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <p className="text-center text-muted py-20">No projects in this category.</p>
        )}
      </div>
    </motion.div>
  )
}

// ─── Project card ─────────────────────────────────────────────────────────────
function ProjectCard({ project, index, onClick, compact = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      whileHover={{ y: -5 }}
      onClick={() => onClick(project)}
      className="group relative rounded-2xl border border-border bg-bg-card overflow-hidden cursor-pointer transition-all duration-300 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/10 flex flex-col"
    >
      {/* Image */}
      <div className={`relative overflow-hidden bg-bg flex-shrink-0 ${compact ? 'h-36' : 'h-48'}`}>
        <img src={project.image} alt={project.title}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-all duration-300" />

        {project.featured && (
          <span className="absolute top-3 left-3 text-xs px-2.5 py-0.5 rounded-full bg-accent text-white font-semibold shadow-lg shadow-accent/30">
            Featured
          </span>
        )}

        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <a href={project.github} onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-bg/80 backdrop-blur-sm flex items-center justify-center text-white hover:bg-accent transition-colors">
            <FiGithub size={13} />
          </a>
          <a href={project.demo} onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-bg/80 backdrop-blur-sm flex items-center justify-center text-white hover:bg-accent transition-colors">
            <FiExternalLink size={13} />
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col gap-2 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          {project.tags.map(t => (
            <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-accent/15 text-accent-light font-semibold border border-accent/25">
              {t}
            </span>
          ))}
          {project.category && (
            <span className="text-xs px-2 py-0.5 rounded-full border border-border text-muted ml-auto">
              {CATEGORY_LABEL[project.category] || project.category}
            </span>
          )}
        </div>

        <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-accent-light transition-colors leading-snug">
          {project.title}
        </h3>

        {!compact && (
          <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 flex-1">
            {project.description}
          </p>
        )}

        <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
          {project.techStack.slice(0, compact ? 3 : 4).map(t => (
            <span key={t} className="text-xs px-2 py-0.5 rounded bg-bg border border-border text-slate-500">{t}</span>
          ))}
          {project.techStack.length > (compact ? 3 : 4) && (
            <span className="text-xs px-2 py-0.5 rounded bg-bg border border-border text-slate-500">
              +{project.techStack.length - (compact ? 3 : 4)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// ─── Main section ─────────────────────────────────────────────────────────────
export default function Projects() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)
  const [showAll, setShowAll] = useState(false)

  const filtered = PROJECTS.filter(p => {
    if (activeFilter === 'All') return true
    if (activeFilter === 'Featured') return p.featured
    return p.category === activeFilter
  })

  // Always show max 6 on the main section
  const visible = filtered.slice(0, MAX_ON_PAGE)
  const hasMore = filtered.length > MAX_ON_PAGE

  return (
    <section id="projects" ref={sectionRef} className="relative py-24 overflow-hidden bg-bg">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/6 rounded-full blur-[140px]" />
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-violet-900/6 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
        >
          <div>
            <p className="section-label mb-3">Featured Projects</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Some Things I've Built</h2>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => setShowAll(true)}
            className="flex items-center gap-2 text-sm text-accent-light hover:text-white font-semibold transition-colors whitespace-nowrap group"
          >
            View All Projects ({PROJECTS.length})
            <FiExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </motion.button>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {FILTER_TABS.map(tab => (
            <motion.button
              key={tab} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(tab)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeFilter === tab
                  ? 'bg-accent text-white shadow-lg shadow-accent/30'
                  : 'bg-bg-card border border-border text-slate-400 hover:text-white hover:border-accent/40'
              }`}
            >
              {tab === 'FE' ? 'Frontend' : tab === 'BE' ? 'Backend' : tab}
              <span className="ml-1.5 text-xs opacity-60">
                ({tab === 'All' ? PROJECTS.length
                  : tab === 'Featured' ? PROJECTS.filter(p => p.featured).length
                  : PROJECTS.filter(p => p.category === tab).length})
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Cards — max 6 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {visible.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i}
                onClick={setSelectedProject} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View more nudge */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="flex flex-col items-center gap-3 mt-12"
          >
            <p className="text-muted text-sm">
              Showing <span className="text-accent-light font-semibold">{visible.length}</span> of{' '}
              <span className="text-accent-light font-semibold">{filtered.length}</span> projects
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => setShowAll(true)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-accent/50 text-accent-light hover:bg-accent/10 hover:border-accent text-sm font-semibold transition-all duration-200"
            >
              <FiGrid size={15} />
              View All {PROJECTS.length} Projects
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* All Projects overlay */}
      <AnimatePresence>
        {showAll && (
          <AllProjectsOverlay
            onClose={() => setShowAll(false)}
            onSelectProject={(p) => { setSelectedProject(p) }}
          />
        )}
      </AnimatePresence>

      {/* Project detail modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
