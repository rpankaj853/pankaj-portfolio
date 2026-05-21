import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { EXPERIENCE } from '../data/portfolio'

export default function Experience() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section id="experience" ref={sectionRef} className="relative py-24 overflow-hidden bg-bg">

      {/* ── Mountain — right side, full section height ── */}
      <div className="absolute inset-y-0 right-0 w-[52%] pointer-events-none z-0 flex items-center justify-center">
        <motion.img
          src="/assets/images/bg_exp_screen.png"
          alt=""
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="w-full h-full object-contain object-center"
        />
        {/* left-edge fade */}
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/30 to-transparent" />
        {/* bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-bg to-transparent" />
      </div>

      {/* Ambient glow */}
      <div className="absolute top-10 left-0 w-[300px] h-[300px] bg-accent/6 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="section-label mb-3">Experience</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            My Professional Journey
          </h2>
        </motion.div>

        {/* ── Timeline — left 55% ── */}
        <div className="w-full lg:w-[55%]">

          {/* Scrollable inner container showing ~2 entries */}
          <div
            className="overflow-y-auto pr-2 pl-4"
            style={{ maxHeight: '480px' }}
          >
            <style>{`
              .exp-timeline::-webkit-scrollbar { width: 3px; }
              .exp-timeline::-webkit-scrollbar-track { background: transparent; }
              .exp-timeline::-webkit-scrollbar-thumb { background: rgba(124,58,237,0.35); border-radius: 4px; }
            `}</style>

            <div className="exp-timeline relative">
              {/* vertical line */}
              <div className="absolute left-[7px] top-2 bottom-0 w-0.5 bg-border/50" />

              {EXPERIENCE.map((exp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -24 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.2 + i * 0.15, ease: 'easeOut' }}
                  className="relative flex gap-0 pb-10 last:pb-2"
                >
                  {/* Dot */}
                  <div className="flex-shrink-0 flex flex-col items-center relative" style={{ width: '16px' }}>
                    {/* ping ring — only on active (first full-time) entry */}
                    {i === 0 && (
                      <span className="absolute top-0.5 left-0 w-4 h-4 rounded-full bg-accent/40 animate-ping z-0" />
                    )}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : {}}
                      transition={{ duration: 0.35, delay: 0.25 + i * 0.15, type: 'spring', stiffness: 250 }}
                      className={`w-4 h-4 rounded-full border-2 z-10 mt-0.5 ${
                        exp.type === 'full'
                          ? 'bg-accent border-accent'
                          : 'bg-bg border-accent/50'
                      }`}
                      style={
                        exp.type === 'full'
                          ? { boxShadow: '0 0 0 4px rgba(124,58,237,0.2), 0 0 16px rgba(124,58,237,0.6), 0 0 32px rgba(124,58,237,0.3)' }
                          : { boxShadow: '0 0 0 3px rgba(124,58,237,0.1), 0 0 10px rgba(124,58,237,0.3)' }
                      }
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 pl-4">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <h4 className="text-slate-100 font-semibold text-sm sm:text-[15px] leading-snug tracking-wide">
                        {exp.role}
                      </h4>
                      <span className="flex-shrink-0 text-slate-600 text-xs font-light tracking-wide">
                        {exp.period}{exp.type === 'intern' && <span className="italic ml-1">· Internship</span>}
                      </span>
                    </div>
                    <p className="text-accent-light/80 font-medium text-sm mb-0.5 tracking-wide">
                      {exp.company}
                      {exp.projects?.length > 0 && (
                        <span className="text-slate-600 font-light text-xs ml-2">
                          · {exp.projects.join(' · ')}
                        </span>
                      )}
                    </p>

                    <ul className="mt-2 space-y-2 mb-3">
                      {exp.points.map((pt, j) => (
                        <motion.li
                          key={j}
                          initial={{ opacity: 0 }}
                          animate={inView ? { opacity: 1 } : {}}
                          transition={{ delay: 0.3 + i * 0.15 + j * 0.06 }}
                          className="flex gap-2 text-slate-500 text-xs sm:text-[13px] leading-6 tracking-wide font-light"
                        >
                          <span className="text-accent/60 flex-shrink-0 mt-0.5 text-xs">▸</span>
                          {pt}
                        </motion.li>
                      ))}
                    </ul>

                    <p className="text-slate-600/70 text-xs leading-relaxed tracking-wider font-light">
                      {exp.tech.join(', ')}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Scroll hint */}
          <motion.p
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1.1 }}
            className="text-muted text-xs mt-3 flex items-center gap-1.5"
          >
            <span className="inline-block w-3 h-3 border border-muted/40 rounded-sm relative overflow-hidden">
              <span className="absolute left-1/2 -translate-x-1/2 top-0.5 w-0.5 h-1.5 bg-muted/50 rounded-full animate-bounce" />
            </span>
            Scroll to see more
          </motion.p>
        </div>
      </div>
    </section>
  )
}
