import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { FiGithub, FiLinkedin, FiMail, FiArrowRight } from "react-icons/fi";
import { SOCIAL_LINKS } from "../data/portfolio";

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: "easeOut" } },
});

const SOCIAL_ICONS = [
  { icon: FiGithub,   href: SOCIAL_LINKS.github,   label: "GitHub" },
  { icon: FiLinkedin, href: SOCIAL_LINKS.linkedin,  label: "LinkedIn" },
  { icon: FiMail,     href: SOCIAL_LINKS.email,     label: "Email" },
];

const ROLES = [
  "AI & Full Stack Developer",
  "Backend Engineer",
  "Frontend Engineer",
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = React.useState(0);
  const [displayed, setDisplayed] = React.useState("");
  const [typing, setTyping] = React.useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    if (typing) {
      if (displayed.length < currentRole.length) {
        timerRef.current = setTimeout(() => {
          setDisplayed(currentRole.slice(0, displayed.length + 1));
        }, 60);
      } else {
        timerRef.current = setTimeout(() => setTyping(false), 2000);
      }
    } else {
      if (displayed.length > 0) {
        timerRef.current = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, 35);
      } else {
        setRoleIndex((i) => (i + 1) % ROLES.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timerRef.current);
  }, [displayed, typing, roleIndex]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-bg"
    >
      {/* Subtle ambient glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-violet-900/10 blur-[100px]" />
      </div>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(124,58,237,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 min-h-[calc(100vh-80px)]">

          {/* ── LEFT: Text content ── */}
          <div className="flex-1 flex flex-col justify-center max-w-xl">
            <motion.p
              variants={fadeUp(0.1)} initial="hidden" animate="show"
              className="text-slate-400 text-lg font-medium mb-2"
            >
              Hi, I'm
            </motion.p>

            <motion.h1
              variants={fadeUp(0.2)} initial="hidden" animate="show"
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-3"
            >
              Pankaj Rana
            </motion.h1>

            {/* Typewriter */}
            <motion.div
              variants={fadeUp(0.35)} initial="hidden" animate="show"
              className="text-2xl sm:text-3xl font-bold mb-6 h-10 flex items-center"
            >
              <span className="text-gradient">{displayed}</span>
              <span className="inline-block w-0.5 h-7 bg-accent-light ml-1 animate-pulse" />
            </motion.div>

            <motion.p
              variants={fadeUp(0.45)} initial="hidden" animate="show"
              className="text-slate-500 text-[15px] sm:text-base leading-7 tracking-wide font-light mb-8 max-w-lg"
            >
              Full Stack Engineer building scalable web apps and AI-powered
              products. Currently at Codvo — crafting React dashboards,
              real-time chat UIs, and production-ready APIs with Django, FastAPI &amp; AWS.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUp(0.55)} initial="hidden" animate="show"
              className="flex flex-wrap gap-4 mb-10"
            >
              <Link to="projects" smooth offset={-64} duration={500}>
                <motion.button
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-white font-semibold rounded-lg transition-all shadow-lg shadow-accent/40"
                >
                  View My Work <FiArrowRight size={18} />
                </motion.button>
              </Link>
              <Link to="contact" smooth offset={-64} duration={500}>
                <motion.button
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-3 bg-transparent border border-accent/50 hover:border-accent text-white font-semibold rounded-lg transition-all hover:bg-accent/10"
                >
                  Let's Connect <FiArrowRight size={18} />
                </motion.button>
              </Link>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              variants={fadeUp(0.65)} initial="hidden" animate="show"
              className="flex items-center gap-3"
            >
              {SOCIAL_ICONS.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.2, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-slate-400 hover:text-white hover:border-accent hover:bg-accent/10 transition-all duration-200"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: hero image + tech decorations ── */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
            className="flex-shrink-0 flex items-center justify-center lg:justify-end w-full lg:w-[52%] xl:w-[55%]"
          >
            <div className="relative w-full max-w-[640px] min-h-[500px] flex items-center justify-center">

              {/* Large radial purple glow behind person */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.45) 0%, rgba(109,40,217,0.2) 40%, transparent 70%)' }} />

              {/* ── Brain / AI illustration (top-left of image) ── */}
              <motion.div
                animate={{ y: [0, -8, 0], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-0 top-8 z-20 pointer-events-none"
              >
                <svg width="110" height="110" viewBox="0 0 110 110" fill="none">
                  <circle cx="55" cy="55" r="52" fill="rgba(13,13,26,0.7)" stroke="rgba(124,58,237,0.4)" strokeWidth="1"/>
                  {/* Brain outline */}
                  <path d="M35 55 C35 42 42 34 52 34 C55 34 58 35 60 37 C62 35 65 34 68 34 C76 34 82 41 82 50 C86 52 88 56 87 61 C89 65 88 70 84 73 C83 79 78 83 72 83 C70 83 68 82 66 81 C64 83 61 84 58 84 C55 84 52 83 50 81 C48 82 46 83 44 83 C38 83 33 78 33 72 C29 70 28 65 30 61 C28 57 29 52 33 50 C33 48 34 46 35 45 Z"
                    stroke="rgba(167,139,250,0.8)" strokeWidth="1.5" fill="rgba(124,58,237,0.08)"/>
                  {/* Circuit nodes */}
                  <circle cx="52" cy="48" r="2" fill="#a78bfa" opacity="0.9"/>
                  <circle cx="62" cy="44" r="2" fill="#a78bfa" opacity="0.9"/>
                  <circle cx="70" cy="52" r="2" fill="#a78bfa" opacity="0.9"/>
                  <circle cx="65" cy="62" r="2" fill="#a78bfa" opacity="0.9"/>
                  <circle cx="52" cy="66" r="2" fill="#a78bfa" opacity="0.9"/>
                  <circle cx="42" cy="58" r="2" fill="#a78bfa" opacity="0.9"/>
                  {/* Circuit lines */}
                  <line x1="52" y1="48" x2="62" y2="44" stroke="#7c3aed" strokeWidth="1" opacity="0.6"/>
                  <line x1="62" y1="44" x2="70" y2="52" stroke="#7c3aed" strokeWidth="1" opacity="0.6"/>
                  <line x1="70" y1="52" x2="65" y2="62" stroke="#7c3aed" strokeWidth="1" opacity="0.6"/>
                  <line x1="65" y1="62" x2="52" y2="66" stroke="#7c3aed" strokeWidth="1" opacity="0.6"/>
                  <line x1="52" y1="66" x2="42" y2="58" stroke="#7c3aed" strokeWidth="1" opacity="0.6"/>
                  <line x1="42" y1="58" x2="52" y2="48" stroke="#7c3aed" strokeWidth="1" opacity="0.6"/>
                </svg>
              </motion.div>

              {/* ── Code window card (bottom-left) ── */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute left-2 bottom-16 z-20 pointer-events-none"
              >
                <div className="rounded-xl border border-accent/30 bg-bg-card/80 backdrop-blur-sm p-3 w-[130px]"
                  style={{ boxShadow: '0 0 20px rgba(124,58,237,0.15)' }}>
                  <div className="flex gap-1.5 mb-2">
                    <div className="w-2 h-2 rounded-full bg-red-500/60"/>
                    <div className="w-2 h-2 rounded-full bg-yellow-500/60"/>
                    <div className="w-2 h-2 rounded-full bg-green-500/60"/>
                  </div>
                  <div className="space-y-1.5">
                    <div className="h-1.5 bg-accent/50 rounded w-full"/>
                    <div className="h-1.5 bg-accent/30 rounded w-4/5"/>
                    <div className="h-1.5 bg-accent/20 rounded w-3/5"/>
                    <div className="h-1.5 bg-accent/40 rounded w-4/5"/>
                    <div className="h-1.5 bg-accent/25 rounded w-2/5"/>
                  </div>
                </div>
              </motion.div>

              {/* ── Code tag card (right side) ── */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute right-0 bottom-24 z-20 pointer-events-none"
              >
                <div className="rounded-xl border border-accent/30 bg-bg-card/80 backdrop-blur-sm px-4 py-3"
                  style={{ boxShadow: '0 0 20px rgba(124,58,237,0.15)' }}>
                  <span className="text-accent font-bold text-xl font-mono">&lt;/&gt;</span>
                </div>
              </motion.div>

              {/* Floating dots */}
              {[
                { top: '15%', left: '20%', size: 5, delay: 0 },
                { top: '70%', left: '10%', size: 4, delay: 0.8 },
                { top: '30%', right: '5%', size: 6, delay: 1.2 },
                { top: '80%', right: '10%', size: 3, delay: 0.4 },
                { top: '50%', left: '5%', size: 4, delay: 1.6 },
              ].map((dot, i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.3, 0.9, 0.3], scale: [1, 1.3, 1] }}
                  transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: dot.delay }}
                  className="absolute rounded-full bg-accent pointer-events-none z-20"
                  style={{ top: dot.top, left: dot.left, right: dot.right, width: dot.size, height: dot.size,
                    boxShadow: '0 0 8px rgba(124,58,237,0.8)' }}
                />
              ))}

              {/* Person image */}
              <motion.img
                src="/assets/images/hero.png"
                alt="Pankaj Rana"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 w-[60%] h-auto object-contain mx-auto"
                style={{ filter: "drop-shadow(0 0 50px rgba(124,58,237,0.5))" }}
              />
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-muted tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border-2 border-accent/40 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 rounded-full bg-accent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
