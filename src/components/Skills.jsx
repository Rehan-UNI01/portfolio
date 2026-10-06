import React, { useState } from 'react';
import { 
  Terminal, 
  Code2, 
  Cpu, 
  Zap, 
  Globe, 
  Layers,
  CheckCircle 
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const iconMap = {
  Terminal,
  Code2,
  Cpu,
  Zap,
  Globe,
};

const skillColorThemes = {
  'C Programming': {
    iconBg: 'bg-sky-50 border-sky-200 text-sky-600',
    badge: 'bg-sky-100/70 text-sky-800 border-sky-200',
    hoverBorder: 'hover:border-sky-300',
    topBar: 'from-sky-300 to-blue-200',
  },
  'Programming Fundamentals': {
    iconBg: 'bg-blue-50 border-blue-200 text-blue-600',
    badge: 'bg-blue-100/70 text-blue-800 border-blue-200',
    hoverBorder: 'hover:border-blue-300',
    topBar: 'from-blue-300 to-indigo-200',
  },
  'Problem Solving': {
    iconBg: 'bg-purple-50 border-purple-200 text-purple-600',
    badge: 'bg-purple-100/70 text-purple-800 border-purple-200',
    hoverBorder: 'hover:border-purple-300',
    topBar: 'from-purple-300 to-pink-200',
  },
  'Digital Literacy': {
    iconBg: 'bg-amber-50 border-amber-200 text-amber-700',
    badge: 'bg-amber-100/70 text-amber-800 border-amber-200',
    hoverBorder: 'hover:border-amber-300',
    topBar: 'from-amber-300 to-yellow-200',
  },
  'Web Basics (HTML & CSS)': {
    iconBg: 'bg-emerald-50 border-emerald-200 text-emerald-600',
    badge: 'bg-emerald-100/70 text-emerald-800 border-emerald-200',
    hoverBorder: 'hover:border-emerald-300',
    topBar: 'from-emerald-300 to-teal-200',
  },
};

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { skills } = portfolioData;

  const categories = ['All', 'Programming', 'Foundations', 'Tools'];

  const filteredSkills = selectedCategory === 'All'
    ? skills
    : skills.filter(skill => skill.category === selectedCategory);

  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-purple-600" />
            <span>Technical Foundations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E2430] tracking-tight font-display">
            Current Technical Skills
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Foundational competencies and core programming concepts currently being learned in my 1st year.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                  : 'bg-white/90 text-slate-600 hover:text-slate-900 hover:bg-white border border-slate-200/90 shadow-sm'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {filteredSkills.map((skill, index) => {
            const IconComponent = iconMap[skill.icon] || Code2;
            const theme = skillColorThemes[skill.name] || {
              iconBg: 'bg-blue-50 border-blue-200 text-blue-600',
              badge: 'bg-blue-100 text-blue-800 border-blue-200',
              hoverBorder: 'hover:border-blue-300',
              topBar: 'from-blue-300 to-indigo-200',
            };

            return (
              <div
                key={index}
                className={`sonny-card sonny-card-hover rounded-3xl p-6 relative overflow-hidden group flex flex-col justify-between border border-slate-200/90 shadow-sonny-sm ${theme.hoverBorder}`}
              >
                {/* Top pastel accent bar */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${theme.topBar} opacity-80 group-hover:opacity-100 transition-opacity`} />

                <div className="space-y-4">
                  {/* Icon & Badge row */}
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-transform group-hover:scale-105 ${theme.iconBg}`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide border shadow-xs ${theme.badge}`}>
                      {skill.badge}
                    </span>
                  </div>

                  {/* Skill Name */}
                  <div>
                    <h3 className="text-lg font-bold text-[#1E2430] group-hover:text-blue-600 transition-colors font-display">
                      {skill.name}
                    </h3>
                    <div className="text-xs text-slate-500 font-semibold mt-0.5">
                      {skill.category}
                    </div>
                  </div>

                  {/* Skill Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {skill.description}
                  </p>
                </div>

                {/* Level / Status Indicator */}
                <div className="pt-4 mt-4 border-t border-slate-200/80 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Current Level</span>
                  <span className="text-blue-700 font-bold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-blue-500" />
                    {skill.level}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
