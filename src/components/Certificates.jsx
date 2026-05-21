import React, { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { FiExternalLink, FiX, FiAward, FiGrid, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { CERTIFICATES } from '../data/portfolio'

// ─── Infinite marquee carousel ────────────────────────────────────────────────
function CertCarousel({ onSelect }) {
  const [paused, setPaused] = useState(false)
  const items = [...CERTIFICATES, ...CERTIFICATES]

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* left fade */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
      {/* right fade */}
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />

      <div
        className="flex gap-4 w-max py-4"
        style={{
          animation: `marquee 40s linear infinite`,
          animationPlayState: paused ? 'paused' : 'running',
        }}
      >
        {items.map((cert, i) => (
          <div
            key={i}
            onClick={() => onSelect(cert)}
            className="group relative flex-shrink-0 w-56 rounded-2xl border border-border bg-bg-card overflow-hidden cursor-pointer hover:border-accent/50 transition-all duration-300 hover:shadow-xl hover:shadow-accent/15 hover:-translate-y-1.5 flex flex-col"
          >
            {/* Image */}
            <div className="relative h-36 overflow-hidden bg-bg flex-shrink-0">
              <img
                src={cert.image}
                alt={cert.title}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-card/80 via-transparent to-transparent" />
              {/* hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-9 h-9 rounded-full bg-accent/80 backdrop-blur-sm flex items-center justify-center">
                  <FiAward size={16} className="text-white" />
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="p-4 flex flex-col gap-1 flex-1">
              <p className="text-xs text-accent-light font-semibold truncate">{cert.issuer}</p>
              <h4 className="text-white text-xs font-bold leading-snug line-clamp-2 group-hover:text-accent-light transition-colors">
                {cert.title}
              </h4>
              <p className="text-slate-600 text-xs mt-auto pt-1">{cert.date}</p>
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="flex items-center gap-1 text-xs text-accent-light hover:text-white font-medium transition-colors mt-1 w-fit"
              >
                Verify Credential <FiExternalLink size={10} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Preview modal ────────────────────────────────────────────────────────────
function CertModal({ cert, onClose, onPrev, onNext }) {
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
        transition={{ duration: 0.3 }}
        onClick={e => e.stopPropagation()}
        className="relative bg-bg-card border border-border rounded-2xl w-full max-w-2xl overflow-hidden"
      >
        <button onClick={onPrev} className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-accent/70 transition-colors">
          <FiChevronLeft size={18} />
        </button>
        <button onClick={onNext} className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-accent/70 transition-colors">
          <FiChevronRight size={18} />
        </button>
        <button onClick={onClose} className="absolute top-3 right-14 z-10 w-8 h-8 rounded-full bg-bg/80 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
          <FiX size={15} />
        </button>

        <div className="relative bg-bg" style={{ height: '380px' }}>
          <img src={cert.image} alt={cert.title} className="w-full h-full object-contain" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-bg-card to-transparent" />
        </div>

        <div className="px-6 py-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-accent-light text-sm font-semibold mb-0.5">{cert.issuer}</p>
            <h3 className="text-white font-bold text-base leading-snug">{cert.title}</h3>
            <p className="text-slate-500 text-xs mt-1">{cert.date}</p>
          </div>
          <a href={cert.link} target="_blank" rel="noopener noreferrer"
            className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg bg-accent hover:bg-accent/90 text-white text-sm font-semibold transition-colors shadow-lg shadow-accent/30">
            Verify <FiExternalLink size={13} />
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── All certificates overlay ─────────────────────────────────────────────────
function AllCertsOverlay({ onClose, onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-bg overflow-y-auto"
    >
      <div className="sticky top-0 z-10 bg-bg/90 backdrop-blur-xl border-b border-border px-4 sm:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FiGrid className="text-accent" size={20} />
          <h2 className="text-lg font-bold text-white">All Certificates</h2>
          <span className="text-xs px-2 py-0.5 rounded-full bg-accent/20 text-accent-light font-semibold border border-accent/30">
            {CERTIFICATES.length} total
          </span>
        </div>
        <button onClick={onClose}
          className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-slate-400 hover:text-white hover:border-accent/50 transition-all">
          <FiX size={18} />
        </button>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {CERTIFICATES.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              whileHover={{ y: -4 }}
              onClick={() => onSelect(cert)}
              className="group relative rounded-2xl border border-border bg-bg-card overflow-hidden cursor-pointer hover:border-accent/50 transition-all duration-300 flex flex-col"
            >
              <div className="relative h-28 overflow-hidden bg-bg">
                <img src={cert.image} alt={cert.title} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-card/70 to-transparent" />
              </div>
              <div className="p-3 flex flex-col gap-1">
                <p className="text-xs text-accent-light font-semibold truncate">{cert.issuer}</p>
                <h4 className="text-white text-xs font-bold leading-snug line-clamp-2">{cert.title}</h4>
                <p className="text-slate-600 text-xs">{cert.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// ─── Main section ─────────────────────────────────────────────────────────────
export default function Certificates() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })
  const [previewIndex, setPreviewIndex] = useState(null)
  const [showAll, setShowAll] = useState(false)

  const openPreview = (cert) => {
    const idx = CERTIFICATES.findIndex(c => c.title === cert.title)
    setPreviewIndex(idx)
  }

  const prevCert = (e) => { e?.stopPropagation(); setPreviewIndex(i => (i - 1 + CERTIFICATES.length) % CERTIFICATES.length) }
  const nextCert = (e) => { e?.stopPropagation(); setPreviewIndex(i => (i + 1) % CERTIFICATES.length) }

  return (
    <section id="certificates" ref={sectionRef} className="relative py-24 overflow-hidden bg-bg">
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/6 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-violet-900/6 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
        >
          <div>
            <p className="section-label mb-3">Certificates</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">My Achievements</h2>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => setShowAll(true)}
            className="flex items-center gap-2 text-sm text-accent-light hover:text-white font-semibold transition-colors whitespace-nowrap group"
          >
            View All Certificates ({CERTIFICATES.length})
            <FiExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </motion.button>
        </motion.div>
      </div>

      {/* Full-width carousel — outside max-w container for edge-to-edge */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="px-0"
      >
        <CertCarousel onSelect={openPreview} />
      </motion.div>

      {/* Bottom hint */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10"
        >
          <p className="text-muted text-sm">
            Hover to pause · Click any card to preview
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => setShowAll(true)}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-accent/50 text-accent-light hover:bg-accent/10 hover:border-accent text-sm font-semibold transition-all duration-200"
          >
            <FiAward size={15} />
            View All {CERTIFICATES.length} Certificates
          </motion.button>
        </motion.div>
      </div>

      {/* All overlay */}
      <AnimatePresence>
        {showAll && (
          <AllCertsOverlay
            onClose={() => setShowAll(false)}
            onSelect={(cert) => { setShowAll(false); openPreview(cert) }}
          />
        )}
      </AnimatePresence>

      {/* Preview modal */}
      <AnimatePresence>
        {previewIndex !== null && (
          <CertModal
            cert={CERTIFICATES[previewIndex]}
            onClose={() => setPreviewIndex(null)}
            onPrev={prevCert}
            onNext={nextCert}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
