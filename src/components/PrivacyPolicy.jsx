import React from 'react'
import { motion } from 'framer-motion'

export default function PrivacyPolicy() {
  const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: 'easeOut' } },
  })

  const sections = [
    {
      title: 'Introduction',
      content: (
        <>
          <p className="text-slate-300 leading-relaxed mb-4">
            <span className="font-semibold text-white">NodeTrail</span> is a free puzzle game for Android.
          </p>
          <p className="text-slate-400 text-sm">
            Effective Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </>
      ),
    },
    {
      title: 'Data We Collect',
      content: (
        <p className="text-slate-300 leading-relaxed">
          NodeTrail <span className="font-semibold text-white">does not collect any personal information</span> directly. You do not need to create an account, sign up, or provide your name, email, or any other personal data to play the game.
        </p>
      ),
    },
    {
      title: 'Local Storage',
      content: (
        <>
          <p className="text-slate-300 leading-relaxed mb-3">
            Your game progress and preferences are stored <span className="font-semibold text-white">locally on your device only</span>:
          </p>
          <ul className="text-slate-300 space-y-2 ml-4">
            <li className="flex gap-3">
              <span className="text-accent min-w-fit">•</span>
              <span>Levels completed</span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent min-w-fit">•</span>
              <span>Coins earned</span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent min-w-fit">•</span>
              <span>Player name</span>
            </li>
          </ul>
          <p className="text-slate-300 leading-relaxed mt-3">
            This data is <span className="font-semibold text-white">never uploaded to any server</span> and remains completely private on your device.
          </p>
        </>
      ),
    },
    {
      title: 'Third-Party Advertising',
      content: (
        <>
          <p className="text-slate-300 leading-relaxed mb-3">
            NodeTrail uses <span className="font-semibold text-white">Google AdMob</span> to display advertisements. Google AdMob may collect the following information:
          </p>
          <ul className="text-slate-300 space-y-2 ml-4 mb-4">
            <li className="flex gap-3">
              <span className="text-accent min-w-fit">•</span>
              <span>Device identifiers</span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent min-w-fit">•</span>
              <span>IP address</span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent min-w-fit">•</span>
              <span>Usage data to serve personalized ads</span>
            </li>
          </ul>
          <p className="text-slate-300 leading-relaxed mb-3">
            For more information about Google's advertising practices, visit their privacy policy:
          </p>
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-light transition-colors font-semibold"
          >
            Google Privacy Policy →
          </a>
          <p className="text-slate-300 leading-relaxed mt-4">
            <span className="font-semibold text-white">Opt out of personalized ads:</span> Go to <span className="text-slate-400">Settings → Google → Ads → Opt out of Ads Personalization</span>
          </p>
        </>
      ),
    },
    {
      title: "Children's Privacy",
      content: (
        <p className="text-slate-300 leading-relaxed">
          NodeTrail is <span className="font-semibold text-white">not directed at children under 13</span>. We do not knowingly collect any data from children under 13 years of age. If we become aware that a child under 13 has provided us with personal information, we will take steps to delete such information and terminate the child's account.
        </p>
      ),
    },
    {
      title: 'Data Retention',
      content: (
        <>
          <p className="text-slate-300 leading-relaxed mb-3">
            We do not store any data on our servers. Your game progress and preferences are stored <span className="font-semibold text-white">only locally on your device</span>.
          </p>
          <p className="text-slate-300 leading-relaxed">
            To delete your local data, simply <span className="font-semibold text-white">uninstall the app</span> from your device.
          </p>
        </>
      ),
    },
    {
      title: 'Changes to This Policy',
      content: (
        <p className="text-slate-300 leading-relaxed">
          We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. Your continued use of NodeTrail after any changes indicates your acceptance of the updated policy.
        </p>
      ),
    },
    {
      title: 'Contact Us',
      content: (
        <div className="text-slate-300 space-y-2">
          <p>
            <span className="font-semibold text-white">Developer:</span> PRFounder
          </p>
          <p>
            <span className="font-semibold text-white">Email:</span>{' '}
            <a
              href="mailto:prfounder43@gmail.com"
              className="text-accent hover:text-accent-light transition-colors"
            >
              prfounder43@gmail.com
            </a>
          </p>
          <p>
            <span className="font-semibold text-white">Website:</span>{' '}
            <a
              href="https://pankajrana.live"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-light transition-colors"
            >
              pankajrana.live
            </a>
          </p>
        </div>
      ),
    },
  ]

  return (
    <section className="relative py-20 overflow-hidden bg-bg min-h-screen">
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-accent/6 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-3">
            NodeTrail
          </h1>
          <h2 className="text-2xl sm:text-3xl font-bold text-accent mb-2">
            Privacy Policy
          </h2>
          <p className="text-slate-400 text-lg">
            Your privacy and security matter to us
          </p>
        </motion.div>

        {/* Content Sections */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              variants={fadeUp(0.1 + index * 0.05)}
              initial="hidden"
              animate="show"
              className="rounded-xl border border-border bg-bg-card/50 backdrop-blur-sm p-6 sm:p-8 hover:border-accent/30 transition-colors duration-300"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                {section.title}
              </h3>
              <div className="text-slate-300">
                {section.content}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Note */}
        <motion.div
          variants={fadeUp(0.5)}
          initial="hidden"
          animate="show"
          className="mt-12 pt-8 border-t border-border text-center text-slate-400 text-sm"
        >
          <p>
            Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          <p className="mt-2">
            By downloading and using NodeTrail, you agree to this Privacy Policy.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
