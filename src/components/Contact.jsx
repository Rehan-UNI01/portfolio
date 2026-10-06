import React, { useState } from 'react';
import { 
  Mail, 
  Linkedin, 
  Github, 
  MapPin, 
  Copy, 
  Check, 
  Send, 
  MessageSquare, 
  ExternalLink,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { portfolioData } from '../data/portfolioData';

export default function Contact() {
  const { personal } = portfolioData;
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#93C5FD', '#FDBA74', '#DDD6FE', '#86EFAC', '#FCA5A5']
      });
    } catch (e) {
      // safe fallback
    }
    setTimeout(() => setCopied(false), 2500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subjectLine = formState.subject ? formState.subject : 'Message from Portfolio';
    const emailBody = `Hi Mohammad Rehan,\n\n${formState.message}\n\n---\nSender: ${formState.name}\nEmail: ${formState.email}`;
    const mailtoUrl = `mailto:${personal.email}?subject=${encodeURIComponent(subjectLine)}&body=${encodeURIComponent(emailBody)}`;
    
    // Truthfully trigger email client
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5 text-orange-600" />
            <span>Direct Contact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E2430] tracking-tight font-display">
            Get In Touch
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Have a question, study discussion, or student connection? Feel free to reach out.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Contact Details & Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Email Direct Action Card */}
            <div className="sonny-card rounded-3xl p-6 sm:p-8 space-y-4 border border-blue-200/90 shadow-sonny-card relative overflow-hidden bg-gradient-to-br from-white via-sky-50/40 to-orange-50/30">
              <div className="w-12 h-12 rounded-2xl bg-blue-100/70 border border-blue-200 text-blue-700 flex items-center justify-center">
                <Mail className="w-6 h-6" />
              </div>

              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Student Email
                </div>
                <div className="text-base sm:text-lg font-bold text-[#1E2430] break-all mt-1 font-display">
                  {personal.email}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={`mailto:${personal.email}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold transition-all shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Mail</span>
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold border border-slate-200 transition-colors shadow-xs"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* LinkedIn & GitHub Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* LinkedIn */}
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="sonny-card sonny-card-hover rounded-3xl p-5 border border-slate-200/90 block group shadow-sonny-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                </div>
                <div className="text-xs font-semibold text-slate-500">Student Profile</div>
                <div className="text-sm font-bold text-[#1E2430] group-hover:text-blue-600 transition-colors mt-0.5 font-display">
                  LinkedIn &rarr;
                </div>
              </a>

              {/* GitHub */}
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="sonny-card sonny-card-hover rounded-3xl p-5 border border-slate-200/90 block group shadow-sonny-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
                    <Github className="w-5 h-5" />
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-purple-600 transition-colors" />
                </div>
                <div className="text-xs font-semibold text-slate-500">Code Repositories</div>
                <div className="text-sm font-bold text-[#1E2430] group-hover:text-purple-600 transition-colors mt-0.5 font-display">
                  GitHub &rarr;
                </div>
              </a>

            </div>

            {/* Location Card */}
            <div className="sonny-card rounded-3xl p-5 border border-slate-200/90 flex items-center gap-4 shadow-sonny-sm">
              <div className="w-10 h-10 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Location
                </div>
                <div className="text-sm font-bold text-[#1E2430] font-display">
                  {personal.location}
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Truthful Mailto Contact Form */}
          <div className="lg:col-span-7">
            <div className="sonny-card rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sonny-card">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                <h3 className="text-xl font-bold text-[#1E2430] font-display">
                  Compose Email Message
                </h3>
              </div>

              {/* Truthful mechanism notice */}
              <div className="mb-6 p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs text-blue-800 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>
                  Clicking <strong>Send via Email</strong> prepares a pre-filled draft in your default email application to send directly to <strong>{personal.email}</strong>.
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      Your Name <span className="text-blue-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formState.name}
                      onChange={handleInputChange}
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-sm transition-all shadow-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      Your Email <span className="text-blue-600">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formState.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-sm transition-all shadow-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    Subject <span className="text-blue-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formState.subject}
                    onChange={handleInputChange}
                    placeholder="Subject line"
                    className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-sm transition-all shadow-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    Message <span className="text-blue-600">*</span>
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    value={formState.message}
                    onChange={handleInputChange}
                    placeholder="Write your message here..."
                    className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-sm transition-all resize-none shadow-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-orange-400 hover:from-blue-600 hover:to-orange-500 text-white font-bold text-sm shadow-sonny-pastel-sky hover:shadow-lg transition-all flex items-center justify-center gap-2 transform active:scale-[0.99]"
                >
                  <Send className="w-4 h-4" />
                  <span>Send via Email Client</span>
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
