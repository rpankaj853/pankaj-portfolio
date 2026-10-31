import React, { useState, useRef, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { FiCode, FiMonitor, FiServer, FiCpu, FiCloud, FiCheckCircle } from 'react-icons/fi'
import { SKILLS, SKILL_CATEGORIES, SKILL_CLUSTERS } from '../data/portfolio'

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

// Hub-and-spoke diagram: the logo sits in the middle, skills orbit it on glowing curved lines
const HUB_W = 1000
const HUB_H = 520
const RING_X = 38 // ring radius as % of width
const RING_Y = 34 // ring radius as % of height

function hubLayout(count) {
  return Array.from({ length: count }, (_, i) => {
    const angle = count === 2
      ? (i === 0 ? Math.PI : 0)
      : count === 1 ? Math.PI : -Math.PI / 2 + (i / count) * Math.PI * 2
    const leftPct = 50 + RING_X * Math.cos(angle)
    const topPct = 50 + RING_Y * Math.sin(angle)
    const x = (leftPct / 100) * HUB_W
    const y = (topPct / 100) * HUB_H
    const cx = HUB_W / 2
    const cy = HUB_H / 2
    const dx = Math.abs(x - cx)
    const dy = Math.abs(y - cy)
    let d
    if (dx >= dy) {
      const xm = (x + cx) / 2
      d = `M ${x} ${y} C ${xm} ${y}, ${xm} ${cy}, ${cx} ${cy}`
    } else {
      const ym = (y + cy) / 2
      const wobble = dx < 10 ? 45 : 0
      d = `M ${x} ${y} C ${x + wobble} ${ym}, ${cx - wobble} ${ym}, ${cx} ${cy}`
    }
    return { leftPct, topPct, d }
  })
}

function SkillHub({ skills, category }) {
  const layout = hubLayout(skills.length)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="relative mx-auto w-full max-w-4xl"
      style={{ aspectRatio: `${HUB_W} / ${HUB_H}` }}
    >
      {/* Connector lines + travelling light pulses */}
      <svg
        viewBox={`0 0 ${HUB_W} ${HUB_H}`}
        className="absolute inset-0 w-full h-full overflow-visible"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <filter id="hubGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        {layout.map((pos, i) => (
          <g key={skills[i].name}>
            <motion.path
              d={pos.d}
              stroke="rgba(167,139,250,0.45)"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.1 + i * 0.07, ease: 'easeOut' }}
              style={{ filter: 'drop-shadow(0 0 4px rgba(124,58,237,0.7))' }}
            />
            <circle r="3.5" fill="#c4b5fd" filter="url(#hubGlow)">
              <animateMotion
                dur="3.2s"
                begin={`${1 + i * 0.45}s`}
                repeatCount="indefinite"
                path={pos.d}
              />
            </circle>
          </g>
        ))}
      </svg>

      {/* Centre hub */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex flex-col items-center"
        >
          <div className="rounded-2xl border border-accent/40 bg-bg-card p-3 shadow-[0_0_50px_rgba(124,58,237,0.35)]">
            <img src="/assets/images/prlogo.png" alt="PR" className="w-20 h-20 rounded-xl object-contain" />
          </div>
          <span className="mt-3 px-3 py-1 rounded-full bg-accent/20 border border-accent/30 text-xs font-semibold text-accent-light whitespace-nowrap">
            {category} · {skills.length}
          </span>
        </motion.div>
      </div>

      {/* Orbiting skill nodes */}
      {skills.map((skill, i) => (
        <div
          key={skill.name}
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${layout[i].leftPct}%`, top: `${layout[i].topPct}%` }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.15 + i * 0.07 }}
            whileHover={{ scale: 1.12 }}
            className="group relative w-[4.5rem] h-[4.5rem] flex items-center justify-center rounded-xl border border-accent/30 bg-bg-card transition-shadow duration-300 hover:border-accent/70 hover:shadow-[0_0_28px_rgba(124,58,237,0.45)]"
          >
            <img src={skill.logo} alt={skill.name} className="w-12 h-12 object-contain" />
            <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold text-slate-300 group-hover:text-white transition-colors">
              {skill.name}
            </span>
          </motion.div>
        </div>
      ))}
    </motion.div>
  )
}

// "All" tab: mind-map with the PR logo in the middle, one hub per skill group, skills orbiting each hub
const MAP_W = 1000
const MAP_H = 760
const MAP_CENTER = { x: 500, y: 375 }
const CLUSTER_META = {
  'Languages':         { icon: FiCode,        x: 500, y: 140 },
  'Frontend':          { icon: FiMonitor,     x: 170, y: 225 },
  'Backend & APIs':    { icon: FiServer,      x: 830, y: 225 },
  'AI & LLM':          { icon: FiCpu,         x: 190, y: 575 },
  'Databases & Cloud': { icon: FiCloud,       x: 810, y: 570 },
  'Testing':           { icon: FiCheckCircle, x: 500, y: 635 },
}

function clusterLayout(cluster) {
  const meta = CLUSTER_META[cluster.name]
  const skills = cluster.skills.map(n => SKILLS.find(s => s.name === n)).filter(Boolean)
  const n = skills.length
  const r = 70 + n * 8
  // Start facing away from the centre; offset so no skill sits on the line to the centre
  const outward = Math.atan2(meta.y - MAP_CENTER.y, meta.x - MAP_CENTER.x)
  const offset = n % 2 === 0 ? 0.5 : 0
  const nodes = skills.map((skill, k) => {
    const a = outward + (k + offset) * (Math.PI * 2 / n)
    return { skill, x: meta.x + r * Math.cos(a), y: meta.y + r * Math.sin(a) }
  })
  // Curved connector from the centre hub out to this cluster's hub
  const { x, y } = meta
  const cx = MAP_CENTER.x
  const cy = MAP_CENTER.y
  const dx = Math.abs(x - cx)
  const dy = Math.abs(y - cy)
  let d
  if (dx < 10) d = `M ${cx} ${cy} L ${x} ${y}`
  else if (dx >= dy) {
    const xm = (x + cx) / 2
    d = `M ${cx} ${cy} C ${xm} ${cy}, ${xm} ${y}, ${x} ${y}`
  } else {
    const ym = (y + cy) / 2
    d = `M ${cx} ${cy} C ${cx} ${ym}, ${x} ${ym}, ${x} ${y}`
  }
  return { ...cluster, ...meta, r, nodes, d }
}

const pct = (v, total) => `${(v / total) * 100}%`

function SkillMap() {
  const clusters = SKILL_CLUSTERS.map(clusterLayout)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="relative mx-auto w-full max-w-5xl"
      style={{ aspectRatio: `${MAP_W} / ${MAP_H}` }}
    >
      <svg
        viewBox={`0 0 ${MAP_W} ${MAP_H}`}
        className="absolute inset-0 w-full h-full overflow-visible"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <filter id="mapGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        {clusters.map((c, ci) => (
          <g key={c.name}>
            {/* Dashed orbit */}
            <motion.circle
              cx={c.x} cy={c.y} r={c.r}
              stroke="rgba(167,139,250,0.28)" strokeWidth="1" strokeDasharray="4 6"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 + ci * 0.1 }}
            />
            {/* Spokes hub -> skill */}
            {c.nodes.map(nd => (
              <motion.line
                key={nd.skill.name}
                x1={c.x} y1={c.y} x2={nd.x} y2={nd.y}
                stroke="rgba(167,139,250,0.35)" strokeWidth="1"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + ci * 0.1 }}
              />
            ))}
            {/* Centre -> cluster connector with a travelling pulse */}
            <motion.path
              d={c.d}
              stroke="rgba(167,139,250,0.5)" strokeWidth="1.6"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 0.9, delay: 0.1 + ci * 0.1, ease: 'easeOut' }}
              style={{ filter: 'drop-shadow(0 0 5px rgba(124,58,237,0.8))' }}
            />
            <circle r="4" fill="#c4b5fd" filter="url(#mapGlow)">
              <animateMotion dur="3.4s" begin={`${1.2 + ci * 0.55}s`} repeatCount="indefinite" path={c.d} />
            </circle>
          </g>
        ))}
      </svg>

      {/* Centre hub */}
      <div
        className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
        style={{ left: pct(MAP_CENTER.x, MAP_W), top: pct(MAP_CENTER.y, MAP_H) }}
      >
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="rounded-2xl border border-accent/50 bg-bg-card p-3 shadow-[0_0_60px_rgba(124,58,237,0.45)]"
        >
          <img src="/assets/images/prlogo.png" alt="PR" className="w-24 h-16 rounded-lg object-contain" />
        </motion.div>
      </div>

      {clusters.map((c, ci) => {
        const Icon = c.icon
        return (
          <React.Fragment key={c.name}>
            {/* Cluster hub */}
            <div
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
              style={{ left: pct(c.x, MAP_W), top: pct(c.y, MAP_H) }}
            >
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.45, delay: 0.35 + ci * 0.1 }}
                className="relative w-16 h-16 flex items-center justify-center rounded-2xl border border-accent/50 bg-bg-card shadow-[0_0_32px_rgba(124,58,237,0.4)]"
              >
                <Icon className="w-7 h-7 text-accent-light" />
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 whitespace-nowrap">
                  <span className="text-sm font-bold text-white">{c.name}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-accent/20 border border-accent/30 text-xs font-semibold text-accent-light">
                    {c.nodes.length}
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Skill nodes */}
            {c.nodes.map((nd, k) => (
              <div
                key={nd.skill.name}
                className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                style={{ left: pct(nd.x, MAP_W), top: pct(nd.y, MAP_H) }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.7 + ci * 0.1 + k * 0.05 }}
                  whileHover={{ scale: 1.15 }}
                  className="group relative w-14 h-14 flex items-center justify-center rounded-full border border-accent/30 bg-bg-card transition-shadow duration-300 hover:border-accent/70 hover:shadow-[0_0_24px_rgba(124,58,237,0.5)]"
                >
                  <img src={nd.skill.logo} alt={nd.skill.name} className="w-11 h-11 object-contain" />
                  <span className="absolute top-full mt-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium text-slate-300 group-hover:text-white transition-colors">
                    {nd.skill.name}
                  </span>
                </motion.div>
              </div>
            ))}
          </React.Fragment>
        )
      })}
    </motion.div>
  )
}

export default function Skills() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })
  const [activeCategory, setActiveCategory] = useState('All')

  const showHub = activeCategory !== 'All'
  const scrollRef = useRef(null)
  const [canScrollDown, setCanScrollDown] = useState(false)

  const filtered = activeCategory === 'All'
    ? SKILLS
    : SKILLS.filter(s => s.category === activeCategory)

  const updateScrollState = () => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollDown(el.scrollHeight - el.scrollTop - el.clientHeight > 8)
  }

  // Reset to top and re-check overflow whenever the filter changes or the window resizes
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0
    const t = setTimeout(updateScrollState, 350)
    window.addEventListener('resize', updateScrollState)
    return () => {
      clearTimeout(t)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [activeCategory])

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
          <div className="relative">
            {/* Category view: hub-and-spoke diagram (desktop) */}
            {showHub && (
              <div className="hidden md:block">
                <AnimatePresence mode="wait">
                  <SkillHub key={activeCategory} skills={filtered} category={activeCategory} />
                </AnimatePresence>
              </div>
            )}

            {/* "All" tab: mind-map (large screens) */}
            {!showHub && (
              <div className="hidden lg:block">
                <AnimatePresence mode="wait">
                  <SkillMap key="all" />
                </AnimatePresence>
              </div>
            )}

            {/* Grid: "All" tab below lg, and every tab on mobile. Fixed height keeps the section compact */}
            <div
              ref={scrollRef}
              onScroll={updateScrollState}
              className={`skills-scroll max-h-[28rem] md:max-h-[34rem] overflow-y-auto overscroll-contain p-2 -m-2 pr-3 ${showHub ? 'md:hidden' : 'lg:hidden'}`}
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
            </div>

            {/* Bottom fade + scroll hint while more content is below */}
            <AnimatePresence>
              {canScrollDown && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-bg to-transparent flex items-end justify-center pb-1"
                >
                  <motion.span
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                    className="text-[11px] font-semibold text-accent-light tracking-wide"
                  >
                    Scroll for more ↓
                  </motion.span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
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
