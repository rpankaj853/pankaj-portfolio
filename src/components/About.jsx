import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-scroll'
import { ABOUT_STATS } from '../data/portfolio'

function AnimatedCounter({ target, duration = 1800 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const numericTarget = parseInt(target)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = numericTarget / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= numericTarget) {
        setCount(numericTarget)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, numericTarget, duration])

  return <span ref={ref}>{count}{target.includes('+') ? '+' : ''}</span>
}

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 35 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, delay, ease: 'easeOut' } },
})

export default function About() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section id="about" ref={sectionRef} className="relative py-24 overflow-hidden bg-bg">
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-accent/6 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-violet-900/6 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-6">

          {/* ── LEFT COLUMN: Label + Title + Text + Button ── */}
          <div className="flex-shrink-0 lg:w-[35%] flex flex-col justify-center gap-6">
            <motion.div variants={fadeUp(0)} initial="hidden" animate={inView ? 'show' : 'hidden'}>
              <p className="section-label mb-3">About Me</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                Get to know me!
              </h2>
            </motion.div>

            <motion.div
              variants={fadeUp(0.15)}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              className="flex flex-col gap-4"
            >
              <p className="text-slate-400 text-sm sm:text-[15px] leading-7 tracking-wide font-light">
                <span className="text-slate-200 font-medium">Full Stack Engineer</span> with{' '}
                <span className="text-slate-200 font-medium">4+ years</span> of professional experience
                building scalable web applications and AI-powered products. Currently at{' '}
                <span className="text-accent-light font-medium">Codvo</span>, delivering React
                dashboards, real-time chat UIs, and backend APIs with Django, FastAPI, and AWS.
              </p>
              <p className="text-slate-500 text-sm sm:text-[15px] leading-7 tracking-wide font-light">
                Built <span className="text-slate-300 font-medium">PRNexus</span> — a live AI platform
                with RAG document Q&A, persistent chat, SSE streaming, and Razorpay subscription
                billing. Passionate about clean architecture, LLM integration, and shipping
                production-ready software.
              </p>
            </motion.div>

            <motion.div variants={fadeUp(0.3)} initial="hidden" animate={inView ? 'show' : 'hidden'}>
              <Link to="contact" smooth offset={-64} duration={500}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-white font-semibold rounded-lg transition-all shadow-lg shadow-accent/30 text-sm sm:text-base"
                >
                  Know More About Me <FiArrowRight size={17} />
                </motion.button>
              </Link>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN: bg image + stats overlaid ── */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="flex-1 relative rounded-2xl overflow-hidden border border-border min-h-[360px] lg:min-h-0"
          >
            {/* Background image fills entire right card */}
            <img
              src="/assets/images/bg_about_screen.png"
              alt=""
              className="absolute inset-0 w-full h-full object-cover object-center"
            />

            {/* Left-side gradient so stats cards remain readable */}
            <div className="absolute inset-0 bg-gradient-to-r from-bg-card/90 via-bg-card/50 to-transparent" />
            {/* Bottom fade */}
            <div className="absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-transparent" />

            {/* Stats cards – overlaid on left portion */}
            <div className="relative z-10 h-full flex flex-col justify-center gap-4 p-6 sm:p-8 w-full sm:w-[260px]">
              {ABOUT_STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, x: -25 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.35 + i * 0.13 }}
                  whileHover={{ scale: 1.04 }}
                  className="rounded-2xl border border-white/10 bg-bg-card/70 backdrop-blur-sm p-5 flex flex-col items-center gap-1 hover:border-accent/50 transition-all duration-300 cursor-default"
                  onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 24px rgba(124,58,237,0.2)'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                >
                  <span className="text-4xl font-extrabold text-gradient">
                    <AnimatedCounter target={stat.value} />
                  </span>
                  <span className="text-slate-400 text-xs font-medium text-center">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
