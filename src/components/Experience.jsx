import { useRef, useEffect, useState } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { experiences, education, extraAchievements } from "../data/experience";

const METRICS = [
  { value: "1+",  label: "Years at Eazy ERP"    },
  { value: "6",   label: "Enterprise Modules"   },
  { value: "70%", label: "Engagement Boost"     },
  { value: "40%", label: "Faster Deployments"   },
];

const ACHIEVEMENT_COLORS = [
  { bg: "bg-yellow-50", border: "border-yellow-200", icon: "bg-yellow-100", text: "text-yellow-700" },
  { bg: "bg-blue-50",   border: "border-blue-200",   icon: "bg-blue-100",   text: "text-blue-700"   },
  { bg: "bg-green-50",  border: "border-green-200",  icon: "bg-green-100",  text: "text-green-700"  },
];

const Experience = () => {
  useScrollAnimation();
  const timelineRef = useRef(null);
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let progress = 0;
          const timer = setInterval(() => {
            progress += 1.5;
            setLineHeight(Math.min(progress, 100));
            if (progress >= 100) clearInterval(timer);
          }, 18);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" className="py-16 bg-white relative overflow-hidden transition-colors duration-300">

      {/* Subtle dot-grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: "radial-gradient(circle, #2563EB20 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Section header */}
        <div className="text-center mb-10 animate-fade-up">
          <h2 className="text-4xl font-bold text-slate-900 mb-2">Experience & Education</h2>
          <div className="w-24 h-1 bg-[#2563EB] mx-auto mb-4 rounded-full" />
          <p className="max-w-2xl text-slate-600 mx-auto">
            Professional journey and academic foundation that shaped my engineering mindset.
          </p>
        </div>

        {/* Key metrics strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16 animate-fade-up">
          {METRICS.map((m) => (
            <div
              key={m.label}
              className="text-center bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl py-5 px-3 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-300"
            >
              <p className="text-3xl font-extrabold text-[#2563EB]">{m.value}</p>
              <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider">{m.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* ── Experience column ── */}
          <div className="animate-fade-up">
            <h3 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-3">
              <div className="w-9 h-9 bg-[#2563EB] rounded-xl flex items-center justify-center text-lg shadow-md shadow-blue-200">
                💼
              </div>
              Professional Experience
            </h3>

            {/* Timeline */}
            <div className="relative space-y-8" ref={timelineRef}>

              {/* Animated track line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-blue-100 overflow-hidden rounded-full">
                <div
                  className="w-full bg-gradient-to-b from-[#2563EB] to-purple-500 rounded-full"
                  style={{ height: `${lineHeight}%`, transition: "height 0.05s linear" }}
                />
              </div>

              {experiences.map((exp, index) => (
                <div key={index} className="relative pl-20">

                  {/* Timeline dot */}
                  <div className="absolute left-0 top-5 z-10">
                    {exp.current ? (
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-[#2563EB] flex items-center justify-center shadow-lg shadow-blue-300/60">
                          <div className="w-4 h-4 bg-white rounded-full" />
                        </div>
                        <div className="absolute inset-0 rounded-full bg-[#2563EB]/30 animate-ping" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-white border-4 border-slate-200 shadow-md flex items-center justify-center">
                        <div className="w-3 h-3 bg-slate-400 rounded-full" />
                      </div>
                    )}
                  </div>

                  {/* Experience card */}
                  <div className="bg-white rounded-2xl border border-slate-100 shadow-md overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all duration-300 group">

                    {/* Gradient card header */}
                    <div className="bg-gradient-to-r from-[#2563EB] to-violet-600 px-6 py-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="text-lg font-bold text-white leading-tight">{exp.position}</h4>
                          <p className="text-blue-100 font-semibold text-sm mt-0.5">{exp.company}</p>
                          <p className="text-blue-200 text-xs mt-1">{exp.duration} · {exp.location}</p>
                        </div>
                        {exp.current && (
                          <span className="flex-shrink-0 flex items-center gap-1.5 bg-white/20 border border-white/30 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                            Current
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="p-6">
                      <ul className="space-y-2 mb-5">
                        {exp.achievements.slice(0, 4).map((ach, i) => (
                          <li key={i} className="flex items-start text-sm text-slate-700 gap-2">
                            <span className="mt-1.5 w-1.5 h-1.5 bg-[#2563EB] rounded-full flex-shrink-0" />
                            {ach}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 bg-blue-50 text-[#2563EB] text-xs font-medium rounded-lg border border-blue-200 hover:bg-[#2563EB] hover:text-white transition-colors duration-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Education + Achievements column ── */}
          <div className="animate-slide-in-right space-y-10">

            {/* Education */}
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-3">
                <div className="w-9 h-9 bg-[#2563EB] rounded-xl flex items-center justify-center text-lg shadow-md shadow-blue-200">
                  🎓
                </div>
                Education
              </h3>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div
                    key={index}
                    className={`relative p-6 rounded-2xl border transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-default overflow-hidden ${
                      edu.highlight
                        ? "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200"
                        : "bg-white border-slate-200"
                    }`}
                  >
                    {/* Decorative blob on highlight card */}
                    {edu.highlight && (
                      <div className="absolute -top-8 -right-8 w-24 h-24 bg-[#2563EB]/8 rounded-full" />
                    )}
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <h4 className="text-base font-bold text-slate-800 leading-tight">{edu.degree}</h4>
                        <p className="text-[#2563EB] text-sm font-medium mt-0.5">{edu.institution}</p>
                      </div>
                      {edu.highlight && (
                        <span className="flex-shrink-0 px-2.5 py-1 bg-[#2563EB] text-white text-xs font-bold rounded-full shadow-sm">
                          Top 2%
                        </span>
                      )}
                    </div>
                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-100">
                      <span className="text-xs text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full font-medium">{edu.year}</span>
                      <span className="font-bold text-slate-700 text-sm">{edu.grade}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Achievements */}
            <div>
              <h4 className="text-xl font-bold text-slate-800 mb-5 flex items-center gap-2">
                <span>🏆</span> Key Achievements
              </h4>
              <div className="space-y-3">
                {extraAchievements.map((item, index) => {
                  const color = ACHIEVEMENT_COLORS[index % ACHIEVEMENT_COLORS.length];
                  return (
                    <div
                      key={index}
                      className={`flex items-center gap-4 p-4 ${color.bg} border ${color.border} rounded-2xl hover:scale-[1.02] hover:shadow-md transition-all duration-300 cursor-default`}
                    >
                      <div className={`w-12 h-12 ${color.icon} rounded-xl flex items-center justify-center text-2xl flex-shrink-0 shadow-sm`}>
                        {item.icon}
                      </div>
                      <div>
                        <h5 className={`font-semibold ${color.text} text-sm`}>{item.title}</h5>
                        <p className="text-slate-500 text-xs mt-0.5">{item.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
