import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Certificates from './components/Certificates'
import Contact from './components/Contact'
import PrivacyPolicy from './components/PrivacyPolicy'

export default function App() {
  return (
    <div className="bg-bg min-h-screen">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Experience />
              <Certificates />
              <Contact />
            </>
          } />
          <Route path="/nodetrail" element={<PrivacyPolicy />} />
        </Routes>
      </main>
    </div>
  )
}
