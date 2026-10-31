import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { FiExternalLink, FiShield, FiGrid } from 'react-icons/fi'
import { GAMES } from '../data/portfolio'

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: 'easeOut' } },
})

function GameCard({ game, index }) {
  return (
    <motion.div
      variants={fadeUp(0.15 + index * 0.12)}
      whileHover={{ y: -6 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-bg-card transition-all duration-300 hover:border-accent/50 hover:shadow-[0_0_32px_rgba(124,58,237,0.2)]"
    >
      {/* Cover */}
      <div className="relative h-48 sm:h-56 overflow-hidden bg-bg-card2">
        {game.image ? (
          <div className={`h-full w-full ${game.imageFit === 'contain' ? 'flex items-center justify-center bg-gradient-to-br from-[#1a1040] via-bg-card2 to-[#0d0d1a]' : ''}`}>
            <img
              src={game.image}
              alt={game.title}
              className={`transition-transform duration-500 group-hover:scale-105 ${
                game.imageFit === 'contain' ? 'h-36 w-36 sm:h-44 sm:w-44 rounded-3xl shadow-[0_0_40px_rgba(124,58,237,0.4)]' : 'h-full w-full object-cover'
              }`}
            />
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#1a1040] via-bg-card2 to-[#0d0d1a]">
            <FiGrid className="h-16 w-16 text-accent-light/70" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-full border border-accent/30 bg-bg/70 px-3 py-1 text-xs font-semibold text-accent-light backdrop-blur">
          {game.platform}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <div>
          <h3 className="text-xl font-bold text-white">{game.title}</h3>
          <p className="mt-1 text-sm font-medium text-accent-light">{game.tagline}</p>
        </div>
        <p className="text-sm leading-relaxed text-slate-400">{game.description}</p>

        <div className="flex flex-wrap gap-2">
          {game.tags.map((t) => (
            <span key={t} className="rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-medium text-accent-light">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap gap-3 pt-2">
          {game.link && (
            <a
              href={game.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-accent/30 transition-colors hover:bg-accent-light"
            >
              {game.cta} <FiExternalLink />
            </a>
          )}
          {game.privacy && (
            <Link
              to={game.privacy}
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-semibold text-slate-300 transition-colors hover:border-accent/50 hover:text-white"
            >
              <FiShield /> Privacy Policy
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function Games() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section id="games" ref={sectionRef} className="relative py-24 overflow-hidden bg-bg">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-accent/8 blur-[130px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp(0)}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="text-center mb-12"
        >
          <p className="section-label mb-3">Game Development</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Games I&apos;ve Built</h2>
          <p className="mt-3 text-slate-400 max-w-xl mx-auto">
            Beyond web and AI, I build and ship games of my own.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          {GAMES.map((game, i) => (
            <GameCard key={game.title} game={game} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
