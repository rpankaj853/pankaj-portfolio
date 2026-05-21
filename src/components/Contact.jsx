import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  FiGithub, FiLinkedin, FiMail, FiMapPin,
  FiDownload, FiArrowUpRight, FiCode
} from 'react-icons/fi'
import { Link } from 'react-scroll'
import { CONTACT_INFO, NAV_LINKS, SOCIAL_LINKS } from '../data/portfolio'

const CONTACT_CARDS = [
  {
    icon: FiMail,
    label: 'Email',
    value: CONTACT_INFO.email,
    href: `mailto:${CONTACT_INFO.email}`,
    display: CONTACT_INFO.email,
  },
  {
    icon: FiLinkedin,
    label: 'LinkedIn',
    value: CONTACT_INFO.linkedin,
    href: SOCIAL_LINKS.linkedin,
    display: 'pankaj-rana-a09276141',
  },
  {
    icon: FiGithub,
    label: 'GitHub',
    value: CONTACT_INFO.github,
    href: SOCIAL_LINKS.github,
    display: 'rpankaj853',
  },
  {
    icon: FiCode,
    label: 'HackerRank',
    value: CONTACT_INFO.hackerrank,
    href: SOCIAL_LINKS.hackerrank,
    display: 'rpankaj853',
  },
  {
    icon: FiMapPin,
    label: 'Location',
    value: CONTACT_INFO.location,
    href: null,
    display: 'India',
  },
]

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: 'easeOut' } },
})

export default function Contact() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <>
      {/* ── CONTACT SECTION ── */}
      <section id="contact" ref={sectionRef} className="relative py-24 overflow-hidden bg-bg">
        {/* Ambient glows */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/8 rounded-full blur-[160px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            variants={fadeUp(0)}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="text-center mb-14"
          >
            <p className="section-label mb-3">Get In Touch</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
              Let's Build Something <span className="text-gradient">Amazing</span>
            </h2>
            <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              I'm open to discussing new opportunities, collaborations, or interesting projects.
              Reach out through any of the channels below.
            </p>
          </motion.div>

          {/* Contact cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {CONTACT_CARDS.map((item, i) => (
              <motion.div
                key={item.label}
                variants={fadeUp(0.1 + i * 0.08)}
                initial="hidden"
                animate={inView ? 'show' : 'hidden'}
                whileHover={{ y: -5, borderColor: 'rgba(124,58,237,0.6)' }}
                className="relative group rounded-2xl border border-border bg-bg-card p-5 flex items-center gap-4 transition-all duration-300"
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 28px rgba(124,58,237,0.15)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
              >
                {/* Icon */}
                <div className="w-11 h-11 rounded-xl bg-accent/15 border border-accent/25 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/25 transition-colors duration-300">
                  <item.icon size={18} className="text-accent-light" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted font-medium mb-0.5">{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith('mailto') ? '_self' : '_blank'}
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-white hover:text-accent-light transition-colors truncate block"
                    >
                      {item.display}
                    </a>
                  ) : (
                    <p className="text-sm font-semibold text-white truncate">{item.display}</p>
                  )}
                </div>

                {/* Arrow on hover */}
                {item.href && (
                  <FiArrowUpRight
                    size={15}
                    className="text-accent/0 group-hover:text-accent-light transition-colors duration-300 flex-shrink-0"
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* Resume download CTA */}
          <motion.div
            variants={fadeUp(0.55)}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="flex justify-center"
          >
            <motion.a
              href={CONTACT_INFO.resumeLink}
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 px-8 py-3.5 bg-accent hover:bg-accent/90 text-white font-semibold rounded-xl transition-all shadow-xl shadow-accent/30 text-base"
            >
              <FiDownload size={18} />
              Download Resume
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative border-t border-border bg-bg-card py-10 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-accent/5 rounded-full blur-[80px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">

            {/* Logo + tagline */}
            <div className="flex flex-col items-center md:items-start gap-1.5">
              <div className="flex items-center gap-2">
                <span className="text-accent font-bold text-xl">&lt;/&gt;</span>
                <span className="font-bold text-white text-lg">
                  Pankaj <span className="text-gradient">Rana</span>
                </span>
              </div>
              <p className="text-slate-500 text-xs">Full Stack & AI Engineer</p>
            </div>

            {/* Nav links */}
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  smooth offset={-64}
                  duration={500}
                  className="text-slate-500 hover:text-white text-sm cursor-pointer transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {[
                { icon: FiGithub, href: SOCIAL_LINKS.github, label: 'GitHub' },
                { icon: FiLinkedin, href: SOCIAL_LINKS.linkedin, label: 'LinkedIn' },
                { icon: FiMail, href: `mailto:${CONTACT_INFO.email}`, label: 'Email' },
                { icon: FiCode, href: SOCIAL_LINKS.hackerrank, label: 'HackerRank' },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-slate-500 hover:text-white hover:border-accent/50 hover:bg-accent/10 transition-all duration-200"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border/50 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-slate-600 text-xs">
              © {new Date().getFullYear()} Pankaj Rana. All rights reserved.
            </p>
            <p className="text-slate-600 text-xs flex items-center gap-1">
              Built with React & Tailwind CSS
              <span className="text-accent">♥</span>
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
