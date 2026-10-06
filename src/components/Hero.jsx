import React from 'react';
import { ArrowRight, Mail, Github, Linkedin, MapPin, Terminal, Code2, Cpu } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Hero() {
  const { personal } = portfolioData;

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Personal Introduction & CTAs */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
            
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-800 shadow-sm backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
              </span>
              <span className="text-xs font-semibold tracking-wide">
                1st Semester B.Tech CSE &bull; JECRC University
              </span>
            </div>

            {/* Main Title & Subtitle */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-[#1E2430] leading-[1.1] font-display">
                Hello, I'm <br />
                <span className="text-pastel-gradient">
                  {personal.name}
                </span>
              </h1>
              <p className="text-lg sm:text-2xl font-semibold text-slate-600 flex items-center justify-center lg:justify-start gap-2">
                <span>{personal.subtitle}</span>
              </p>
            </div>

            {/* Short Professional Introduction */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed mx-auto lg:mx-0 font-normal">
              {personal.about}
            </p>

            {/* University & Location Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs sm:text-sm text-slate-600">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 border border-slate-200/90 shadow-sm">
                <span className="text-blue-500 font-semibold">🎓</span>
                <span className="font-medium">{personal.college}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 border border-slate-200/90 shadow-sm">
                <MapPin className="w-3.5 h-3.5 text-orange-500" />
                <span className="font-medium">{personal.location}</span>
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#projects"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-orange-400 hover:from-blue-600 hover:to-orange-500 transition-all duration-300 text-white font-semibold text-base shadow-sonny-pastel-sky hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-white/90 hover:bg-white border border-slate-200/90 text-slate-800 font-semibold text-base shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <Mail className="w-4 h-4 text-orange-500" />
                <span>Contact Me</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-3">
              <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold mr-1">
                Social:
              </span>
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-2.5 rounded-2xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 shadow-sm hover:shadow transition-all"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-2.5 rounded-2xl bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-200 shadow-sm hover:shadow transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${personal.email}`}
                aria-label="Send Email"
                className="p-2.5 rounded-2xl bg-white border border-slate-200 text-slate-600 hover:text-orange-500 hover:border-orange-200 shadow-sm hover:shadow transition-all"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>

          </div>

          {/* Right Column: Aesthetic Sonny Boy Canvas Card */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Ambient warm pastel glow behind the card */}
            <div className="absolute inset-0 bg-gradient-to-tr from-sky-200/50 via-purple-200/40 to-orange-200/50 rounded-3xl blur-2xl -z-10" />

            <div className="w-full max-w-md sonny-card rounded-3xl p-6 sm:p-7 shadow-sonny-card relative overflow-hidden border border-slate-200/90">
              
              {/* Card Window Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200/70">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-300" />
                  <div className="w-3 h-3 rounded-full bg-amber-300" />
                  <div className="w-3 h-3 rounded-full bg-emerald-300" />
                </div>
                <div className="text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-blue-500" />
                  <span>student_profile.c</span>
                </div>
              </div>

              {/* Aesthetic Code Bio Preview */}
              <div className="pt-5 space-y-3 font-mono text-xs sm:text-sm">
                <div className="text-slate-500">
                  <span className="text-blue-600 font-semibold">struct</span>{' '}
                  <span className="text-purple-700 font-semibold">StudentProfile</span> &#123;
                </div>
                <div className="pl-4 space-y-1.5 text-slate-700">
                  <div>
                    name: <span className="text-emerald-700 font-medium">"{personal.name}"</span>,
                  </div>
                  <div>
                    degree: <span className="text-emerald-700 font-medium">"B.Tech CSE"</span>,
                  </div>
                  <div>
                    semester: <span className="text-blue-600 font-medium">"1st Semester"</span>,
                  </div>
                  <div>
                    university: <span className="text-blue-600 font-medium">"JECRC University"</span>,
                  </div>
                  <div>
                    location: <span className="text-orange-600 font-medium">"Jaipur, India"</span>,
                  </div>
                  <div>
                    learning: [
                    <span className="text-indigo-600">"C Programming"</span>,{' '}
                    <span className="text-sky-600">"Fundamentals"</span>
                    ],
                  </div>
                  <div>
                    interests: [
                    <span className="text-amber-600">"AI"</span>,{' '}
                    <span className="text-rose-600">"Cybersecurity"</span>,{' '}
                    <span className="text-purple-600">"Japanese"</span>
                    ]
                  </div>
                </div>
                <div className="text-slate-500">&#125;;</div>
              </div>

              {/* Pastel Feature Pills */}
              <div className="pt-6 grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-sky-50/80 border border-sky-200/60">
                  <Terminal className="w-5 h-5 text-sky-600" />
                  <div>
                    <div className="text-[11px] text-slate-500">Core Study</div>
                    <div className="text-xs font-bold text-slate-800">C Programming</div>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-purple-50/80 border border-purple-200/60">
                  <Cpu className="w-5 h-5 text-purple-600" />
                  <div>
                    <div className="text-[11px] text-slate-500">Interests</div>
                    <div className="text-xs font-bold text-slate-800">AI &amp; Cybersecurity</div>
                  </div>
                </div>
              </div>

              {/* Footer status bar */}
              <div className="mt-5 pt-4 border-t border-slate-200/70 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Building 1st Semester Foundations
                </span>
                <span className="font-mono text-slate-400">Sonny Boy Vibe</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
