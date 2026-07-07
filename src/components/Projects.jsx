import { useState, useEffect } from "react";
import { ExternalLink, Github, Sparkles, Globe, FileText, X, Target, Lightbulb, Layers3, TrendingUp } from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { projects } from "../data/projects";

const CATEGORY_STYLE = {
  "GenAI / Full Stack": {
    gradient: "linear-gradient(135deg, #8b5cf6, #7c3aed, #6366f1)",
    gradientLight: "linear-gradient(135deg, #ede9fe, #e0e7ff)",
    badgeColor: "#7c3aed",
    badgeBg: "#f5f3ff",
    badgeBorder: "#ddd6fe",
    pillColor: "#7c3aed",
    pillBg: "#f5f3ff",
    pillBorder: "#ddd6fe",
    icon: <Sparkles className="w-3 h-3" />,
    glowColor: "rgba(139,92,246,0.15)",
  },
  "Web Application": {
    gradient: "linear-gradient(135deg, #2563eb, #0ea5e9, #06b6d4)",
    gradientLight: "linear-gradient(135deg, #eff6ff, #e0f2fe)",
    badgeColor: "#1d4ed8",
    badgeBg: "#eff6ff",
    badgeBorder: "#bfdbfe",
    pillColor: "#1d4ed8",
    pillBg: "#eff6ff",
    pillBorder: "#bfdbfe",
    icon: <Globe className="w-3 h-3" />,
    glowColor: "rgba(37,99,235,0.15)",
  },
};

const FALLBACK_STYLE = CATEGORY_STYLE["Web Application"];

const ProjectCard = ({ project, index, onOpenCase }) => {
  const [hovered, setHovered] = useState(false);
  const s = CATEGORY_STYLE[project.category] ?? FALLBACK_STYLE;

  return (
    <div
      className="relative flex flex-col bg-white rounded-2xl overflow-hidden transition-all duration-300 animate-scale-in"
      style={{
        border: "1px solid #e2e8f0",
        boxShadow: hovered
          ? `0 20px 60px ${s.glowColor}, 0 8px 25px rgba(0,0,0,0.08)`
          : "0 2px 12px rgba(0,0,0,0.06)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transitionDelay: `${index * 0.07}s`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top gradient bar */}
      <div className="h-1 w-full flex-shrink-0" style={{ background: s.gradient }} />

      {/* Image area */}
      <div className="relative h-52 overflow-hidden flex-shrink-0 bg-slate-100">
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500"
          style={{ transform: hovered ? "scale(1.08)" : "scale(1)" }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)" }} />

        {/* Video on hover */}
        {hovered && project.video && (
          <video className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline>
            <source src={project.video} type="video/webm" />
          </video>
        )}

        {/* Hover action overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center gap-3 transition-all duration-300"
          style={{
            background: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(4px)",
            opacity: hovered ? 1 : 0,
          }}
        >
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl transition-transform duration-200 hover:scale-105"
            style={{ background: "#ffffff", color: "#1e293b" }}
          >
            <ExternalLink className="w-4 h-4" />
            Live Demo
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl transition-transform duration-200 hover:scale-105"
            style={{ background: "#1e293b", color: "#ffffff" }}
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
        </div>

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full"
            style={{
              background: "rgba(255,255,255,0.92)",
              color: s.badgeColor,
              border: `1px solid ${s.badgeBorder}`,
              backdropFilter: "blur(8px)",
            }}
          >
            {s.icon}
            {project.category}
          </span>
        </div>

        {/* Year badge */}
        <div className="absolute top-3 right-3">
          <span
            className="text-xs font-bold px-3 py-1 rounded-full"
            style={{ background: "rgba(0,0,0,0.55)", color: "#fff", backdropFilter: "blur(8px)" }}
          >
            {project.year}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-6 gap-3">

        {/* Title */}
        <h3
          className="text-lg font-bold leading-snug transition-all duration-200"
          style={{ color: hovered ? s.badgeColor : "#1e293b" }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 flex-1">
          {project.description}
        </p>

        {/* Divider */}
        <div className="h-px bg-slate-100 my-1" />

        {/* Tech pills */}
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="text-xs font-medium px-2.5 py-1 rounded-lg border cursor-default transition-all duration-200"
              style={{
                background: s.pillBg,
                color: s.pillColor,
                borderColor: s.pillBorder,
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex gap-3 pt-2">
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 text-sm font-semibold py-2.5 rounded-xl text-white transition-opacity duration-200 hover:opacity-85"
            style={{ background: s.gradient }}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Live Demo
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 text-sm font-semibold py-2.5 rounded-xl border border-slate-200 text-slate-600 transition-all duration-200 hover:border-slate-400 hover:bg-slate-50"
          >
            <Github className="w-3.5 h-3.5" />
            Source Code
          </a>
        </div>

        {/* Case study button */}
        {project.caseStudy && (
          <button
            onClick={() => onOpenCase(project)}
            className="mt-1 flex items-center justify-center gap-2 w-full text-sm font-semibold py-2.5 rounded-xl transition-all duration-200 hover:opacity-90"
            style={{ background: s.gradientLight, color: s.badgeColor, border: `1px solid ${s.badgeBorder}` }}
          >
            <FileText className="w-3.5 h-3.5" />
            Read the case study
          </button>
        )}
      </div>
    </div>
  );
};

const CaseStudyModal = ({ project, onClose }) => {
  const s = CATEGORY_STYLE[project.category] ?? FALLBACK_STYLE;
  const cs = project.caseStudy;

  // Lock body scroll + close on Escape while the modal is open.
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start sm:items-center justify-center p-0 sm:p-6 overflow-y-auto"
      style={{ background: "rgba(15,23,42,0.55)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white sm:rounded-2xl shadow-2xl overflow-hidden animate-scale-in in-view my-0 sm:my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative px-6 py-6" style={{ background: s.gradient }}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/35 text-white flex items-center justify-center transition"
            aria-label="Close case study"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-white/20 text-white">
              {s.icon} {project.category}
            </span>
            <span className="text-xs font-medium text-white/80">{project.year}</span>
          </div>
          <h3 className="text-2xl font-bold text-white">{project.title}</h3>
          <p className="text-white/90 text-sm mt-1">{cs.tagline}</p>
        </div>

        <div className="px-6 py-6 space-y-7 max-h-[65vh] overflow-y-auto">
          {/* Metrics */}
          <div className="grid grid-cols-3 gap-3">
            {cs.metrics.map((m) => (
              <div key={m.label} className="text-center rounded-xl border border-slate-100 bg-slate-50 py-3 px-2">
                <p className="text-base font-extrabold" style={{ color: s.badgeColor }}>{m.value}</p>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">{m.label}</p>
              </div>
            ))}
          </div>

          {/* Problem */}
          <div>
            <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-2">
              <Target className="w-4 h-4" style={{ color: s.badgeColor }} /> The Problem
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">{cs.problem}</p>
          </div>

          {/* Architecture */}
          <div>
            <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-3">
              <Layers3 className="w-4 h-4" style={{ color: s.badgeColor }} /> Architecture
            </h4>
            <ol className="space-y-2.5">
              {cs.architecture.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-600 leading-relaxed">
                  <span
                    className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold text-white"
                    style={{ background: s.badgeColor }}
                  >
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {/* Decisions */}
          <div>
            <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-3">
              <Lightbulb className="w-4 h-4" style={{ color: s.badgeColor }} /> Key Decisions
            </h4>
            <ul className="space-y-2">
              {cs.decisions.map((d, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600 leading-relaxed">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.badgeColor }} />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="flex gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50">
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 text-sm font-semibold py-2.5 rounded-xl text-white transition-opacity hover:opacity-90"
            style={{ background: s.gradient }}
          >
            <ExternalLink className="w-3.5 h-3.5" /> Live Demo
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 text-sm font-semibold py-2.5 rounded-xl border border-slate-200 text-slate-600 transition hover:bg-white"
          >
            <Github className="w-3.5 h-3.5" /> Source Code
          </a>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  useScrollAnimation();
  const [activeCase, setActiveCase] = useState(null);

  return (
    <section id="projects" className="py-16 bg-slate-50 relative overflow-hidden transition-colors duration-300">

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle, #2563EB18 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">

        {/* Section header */}
        <div className="text-center mb-10 animate-fade-up">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#2563EB] bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full mb-4">
            Portfolio
          </span>
          <h2 className="text-4xl font-bold text-slate-900 mb-2">Featured Projects</h2>
          <div className="w-24 h-1 bg-[#2563EB] mx-auto mb-4 rounded-full" />
          <p className="max-w-2xl mx-auto text-slate-500">
            Full-stack applications and GenAI platforms built with modern technologies — from enterprise ERP modules to AI-powered career tools.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} onOpenCase={setActiveCase} />
          ))}
        </div>

        {activeCase && <CaseStudyModal project={activeCase} onClose={() => setActiveCase(null)} />}

        {/* GitHub CTA */}
        <div className="text-center mt-12 animate-fade-up">
          <a
            href="https://github.com/ItishaJain123"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 text-sm font-semibold px-8 py-3 rounded-xl border-2 border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB] hover:text-white transition-all duration-300"
          >
            <Github className="w-4 h-4" />
            View All Projects on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
