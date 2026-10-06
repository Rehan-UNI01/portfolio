import React from 'react';
import { Sparkles, Terminal, Cpu, Shield, Languages, GraduationCap, MapPin } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function About() {
  const { personal } = portfolioData;

  const highlights = [
    {
      icon: Terminal,
      bgColor: 'bg-sky-50 border-sky-200 text-sky-600',
      title: 'Programming Fundamentals',
      description:
        'Focusing on foundational problem solving in C, structured coding, control flow, loops, and logic building.'
    },
    {
      icon: Cpu,
      bgColor: 'bg-purple-50 border-purple-200 text-purple-600',
      title: 'Artificial Intelligence',
      description:
        'Fascinated by emerging intelligent systems and eager to explore computer vision and machine learning as I advance.'
    },
    {
      icon: Shield,
      bgColor: 'bg-rose-50 border-rose-200 text-rose-600',
      title: 'Cybersecurity',
      description:
        'Interested in fundamental computing security, digital privacy principles, and system defense mechanisms.'
    },
    {
      icon: Languages,
      bgColor: 'bg-amber-50 border-amber-200 text-amber-700',
      title: 'Japanese Language & Culture',
      description:
        'Passionate about studying the Japanese language and appreciating Japanese art, storytelling, and cultural aesthetics.'
    }
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            <span>About Me</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E2430] tracking-tight font-display">
            First-Year CSE Student &amp; Tech Enthusiast
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Building solid foundations in programming, problem solving, and computer science at JECRC University, Jaipur.
          </p>
        </div>

        {/* Story & Key Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-16">
          
          {/* Main Story Narrative */}
          <div className="lg:col-span-7 sonny-card rounded-3xl p-8 sm:p-10 space-y-6 flex flex-col justify-between border border-slate-200/90 shadow-sonny-card">
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-[#1E2430] flex items-center gap-2.5 font-display">
                <span>Who I Am</span>
                <span className="w-2 h-2 rounded-full bg-blue-500" />
              </h3>
              
              <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-normal">
                {personal.about}
              </p>

              {personal.extendedBio.map((paragraph, index) => (
                <p key={index} className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Quick Badges */}
            <div className="pt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span>B.Tech CSE &bull; JECRC University (1st Sem)</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <span>Jaipur, Rajasthan, India</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics / Stats Cards */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {personal.stats.map((stat, index) => (
              <div
                key={index}
                className="sonny-card sonny-card-hover rounded-3xl p-6 flex flex-col justify-center items-center text-center border border-slate-200/90 shadow-sonny-sm"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-pastel-gradient mb-1 font-display">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-500">
                  {stat.label}
                </div>
              </div>
            ))}
            <div className="col-span-2 sonny-card rounded-3xl p-5 border border-sky-200 bg-gradient-to-r from-sky-50/70 via-indigo-50/50 to-orange-50/60 flex items-center justify-between shadow-sm">
              <div>
                <div className="text-xs font-bold text-blue-700 uppercase tracking-wide">
                  Academic Timeline
                </div>
                <div className="text-sm font-bold text-slate-800">
                  1st Semester Undergraduate
                </div>
              </div>
              <div className="px-3.5 py-1 rounded-full bg-white text-blue-700 text-xs font-bold border border-blue-200 shadow-sm">
                2026 – Present
              </div>
            </div>
          </div>

        </div>

        {/* 4 Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="sonny-card sonny-card-hover rounded-3xl p-6 space-y-4 border border-slate-200/90 shadow-sonny-sm"
              >
                <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${item.bgColor}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-[#1E2430] font-display">{item.title}</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
