import React, { useState } from 'react';
import { FolderGit2, ExternalLink, Github, CheckCircle2, ChevronRight, X, Clock } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Projects() {
  const { projects } = portfolioData;
  const [activeModalProject, setActiveModalProject] = useState(null);

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
            <FolderGit2 className="w-3.5 h-3.5 text-blue-600" />
            <span>Real Projects</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E2430] tracking-tight font-display">
            Projects
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Genuine projects built and maintained during my learning journey.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          {projects.map((project) => (
            <div
              key={project.id}
              className="sonny-card sonny-card-hover rounded-3xl overflow-hidden border border-slate-200/90 shadow-sonny-card flex flex-col justify-between group"
            >
              <div>
                {/* Visual Painterly Card Header */}
                <div className="p-6 bg-gradient-to-br from-sky-100 via-indigo-50 to-blue-100 border-b border-sky-200/80 relative">
                  {/* Simulated browser window controls */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-300" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-300" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-300" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full border shadow-xs bg-blue-100 text-blue-800 border-blue-200">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-[#1E2430] group-hover:text-blue-700 transition-colors font-display">
                    {project.title}
                  </h3>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-5">
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {project.shortDescription}
                  </p>

                  {/* Highlights list */}
                  <div className="space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Key Highlights:
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {project.highlights.map((item, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack Pills */}
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Built With:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-xl bg-slate-100/90 border border-slate-200 text-slate-700 text-xs font-semibold"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-6 pt-0 border-t border-slate-200/80 mt-4 flex items-center justify-between gap-3">
                <button
                  onClick={() => setActiveModalProject(project)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <span>Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200 transition-colors shadow-xs"
                    title="View Code on GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href={project.demoUrl}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all"
                  >
                    <span>View Project</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>
          ))}

          {/* Clean Future Projects Card */}
          <div className="sonny-card rounded-3xl p-8 border-2 border-dashed border-slate-300 flex flex-col justify-between bg-white/60">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>In Development</span>
              </div>
              <h3 className="text-xl font-extrabold text-[#1E2430] font-display">
                Upcoming Coursework Projects
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                As I progress through my 1st-year Computer Science coursework and build practical C programs and problem-solving projects, genuine repositories will be documented and published here.
              </p>
            </div>

            <div className="pt-6 border-t border-slate-200/80 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">More to come</span>
              <a
                href={portfolioData.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Follow on GitHub</span>
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Project Details Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#FAF8F5] max-w-xl w-full rounded-3xl p-6 sm:p-8 border border-slate-300 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-500 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-5">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  {activeModalProject.category}
                </span>
                <h3 className="text-2xl font-extrabold text-[#1E2430] font-display">
                  {activeModalProject.title}
                </h3>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                {activeModalProject.detailedDescription}
              </p>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Key Technical Highlights
                </h4>
                <ul className="space-y-2 text-sm text-slate-700">
                  {activeModalProject.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Built With
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeModalProject.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-xl bg-white text-slate-800 text-xs font-bold border border-slate-200 shadow-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <a
                  href={activeModalProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold border border-slate-200 transition-colors shadow-xs"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
                <a
                  href={activeModalProject.demoUrl}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-md shadow-blue-500/20 transition-all"
                >
                  <span>Close / View Site</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
