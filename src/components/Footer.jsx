import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, Heart } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Footer() {
  const { personal } = portfolioData;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Education', href: '#education' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="border-t border-slate-200/90 bg-[#F4F0EA]/80 py-14 relative overflow-hidden">
      {/* Ambient warm pastel glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-36 bg-gradient-to-t from-sky-100/60 to-transparent blur-2xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-slate-200">
          
          {/* Brand Info */}
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-300 via-purple-300 to-amber-200 p-[1.5px] shadow-xs">
                <div className="w-full h-full bg-[#FAF8F5] rounded-[10px] flex items-center justify-center">
                  <span className="font-extrabold text-xs text-pastel-sky font-display">MR</span>
                </div>
              </div>
              <span className="text-xl font-bold text-[#1E2430] tracking-tight font-display">
                {personal.name}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm">
              1st Year B.Tech CSE Student at JECRC University, Jaipur &bull; Interested in Programming, AI, Cybersecurity &amp; Japanese Language.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Socials & Back to top */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2.5 rounded-2xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 shadow-xs transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2.5 rounded-2xl bg-white border border-slate-200 text-slate-600 hover:text-blue-600 shadow-xs transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${personal.email}`}
                aria-label="Email"
                className="p-2.5 rounded-2xl bg-white border border-slate-200 text-slate-600 hover:text-orange-500 shadow-xs transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <button
              onClick={scrollToTop}
              aria-label="Scroll to top of page"
              className="p-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all group"
            >
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} {personal.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            <span>in Sonny Boy aesthetic</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
