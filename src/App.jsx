import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const sections = ['hero', 'about', 'education', 'skills', 'projects', 'achievements', 'contact'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1E2430] flex flex-col relative overflow-hidden font-sans">
      {/* Subtle Sonny Boy Dot Texture */}
      <div className="fixed inset-0 bg-sonny-dots opacity-60 pointer-events-none -z-20" />

      {/* Dreamy Pastel Atmospheric Orbs */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[450px] bg-gradient-to-br from-blue-200/45 via-indigo-100/35 to-transparent blur-[130px] rounded-full pointer-events-none -z-10 animate-float-slow" />
      <div className="fixed top-1/3 right-10 w-[550px] h-[500px] bg-gradient-to-bl from-orange-200/40 via-amber-100/30 to-transparent blur-[140px] rounded-full pointer-events-none -z-10 animate-float-delayed" />
      <div className="fixed bottom-1/4 left-10 w-[500px] h-[500px] bg-gradient-to-tr from-purple-200/35 via-pink-100/25 to-emerald-100/30 blur-[130px] rounded-full pointer-events-none -z-10" />

      {/* Accessible Skip Link */}
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg font-semibold"
      >
        Skip to main content
      </a>

      {/* Sticky Pastel Navbar */}
      <Navbar activeSection={activeSection} />

      {/* Main Content Sections */}
      <main className="flex-grow">
        <Hero />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Achievements />
        <Contact />
      </main>

      {/* Aesthetic Footer */}
      <Footer />
    </div>
  );
}
