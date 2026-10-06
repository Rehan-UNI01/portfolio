import React from 'react';
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Education() {
  const { education } = portfolioData;

  return (
    <section id="education" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-bold uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5 text-sky-600" />
            <span>Education</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E2430] tracking-tight font-display">
            Academic Education
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Undergraduate engineering studies at JECRC University, Jaipur.
          </p>
        </div>

        {/* Education Timeline Card */}
        <div className="max-w-3xl mx-auto">
          {education.map((edu, index) => (
            <div
              key={index}
              className="sonny-card rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sonny-card relative overflow-hidden"
            >
              {/* Subtle pastel ambient background wash */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-sky-100/50 via-purple-100/30 to-transparent blur-3xl pointer-events-none" />

              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 pb-6 border-b border-slate-200">
                
                {/* Degree & University Details */}
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/70 border border-blue-200 text-blue-800 text-xs font-bold">
                    <Award className="w-3.5 h-3.5 text-blue-600" />
                    <span>Undergraduate Degree</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1E2430] font-display">
                    {edu.degree}
                  </h3>
                  <div className="text-lg font-bold text-blue-600">
                    {edu.institution}
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-500 pt-1">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-orange-500" />
                      {edu.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-purple-500" />
                      {edu.period}
                    </span>
                  </div>
                </div>

                {/* Semester Status pill */}
                <div className="flex md:flex-col items-start md:items-end gap-2">
                  <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-1.5 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    {edu.semester}
                  </span>
                </div>
              </div>

              {/* Brief Truthful Description */}
              <div className="pt-6">
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {edu.description}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
