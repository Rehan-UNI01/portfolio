import React from 'react';
import { Award, Sparkles, BookOpen, Clock } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Achievements() {
  const { achievementsState } = portfolioData;

  return (
    <section id="achievements" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-amber-600" />
            <span>Academic Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E2430] tracking-tight font-display">
            {achievementsState.title}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Documenting genuine credentials and earned achievements over time.
          </p>
        </div>

        {/* Clean Empty-State Card */}
        <div className="max-w-2xl mx-auto">
          <div className="sonny-card rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sonny-card text-center space-y-6 bg-gradient-to-b from-white via-amber-50/20 to-sky-50/20">
            
            {/* Visual Icon Badge */}
            <div className="w-16 h-16 rounded-2xl bg-amber-100/70 border border-amber-200 text-amber-700 mx-auto flex items-center justify-center shadow-xs">
              <Clock className="w-8 h-8 text-amber-600" />
            </div>

            {/* Main Message */}
            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-[#1E2430] font-display">
                {achievementsState.message}
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-lg mx-auto font-normal">
                {achievementsState.description}
              </p>
            </div>

            {/* Truthful Indicator Pills */}
            <div className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center justify-center gap-2.5 text-xs">
              <span className="px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 font-semibold">
                1st Semester B.Tech CSE
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold">
                Building Fundamentals
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 font-semibold">
                JECRC University, Jaipur
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
