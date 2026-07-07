import { useRef } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { skillCategories } from "../data/skills";

const CATEGORY_ACCENTS = [
  { from: "from-blue-500",   to: "to-indigo-500",  glow: "shadow-blue-100",   dot: "bg-blue-500"   },
  { from: "from-violet-500", to: "to-purple-500",  glow: "shadow-violet-100", dot: "bg-violet-500" },
  { from: "from-emerald-500",to: "to-teal-500",    glow: "shadow-emerald-100",dot: "bg-emerald-500"},
  { from: "from-orange-500", to: "to-amber-500",   glow: "shadow-orange-100", dot: "bg-orange-500" },
  { from: "from-cyan-500",   to: "to-sky-500",     glow: "shadow-cyan-100",   dot: "bg-cyan-500"   },
  { from: "from-rose-500",   to: "to-pink-500",    glow: "shadow-rose-100",   dot: "bg-rose-500"   },
];

const TiltCard = ({ category, accent, delay }) => {
  const cardRef = useRef(null);
  const glareRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -12;
    const rotateY = ((x - cx) / cx) * 12;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03,1.03,1.03)`;
    if (glareRef.current) {
      glareRef.current.style.background = `radial-gradient(circle at ${(x / rect.width) * 100}% ${(y / rect.height) * 100}%, rgba(255,255,255,0.22) 0%, transparent 70%)`;
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    if (glareRef.current) glareRef.current.style.background = "transparent";
  };

  return (
    <div style={{ perspective: "1000px", transitionDelay: `${delay}s` }} className="animate-scale-in h-full">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ transition: "transform 0.12s ease-out, box-shadow 0.12s ease-out", transformStyle: "preserve-3d" }}
        className={`relative flex flex-col h-full bg-white rounded-2xl border border-slate-100 shadow-md overflow-hidden cursor-default hover:shadow-xl hover:${accent.glow} hover:border-slate-200`}
      >
        {/* Glare overlay */}
        <div ref={glareRef} className="absolute inset-0 rounded-2xl pointer-events-none z-10 transition-all duration-100" />

        {/* Top accent bar */}
        <div className={`h-1.5 w-full bg-gradient-to-r ${accent.from} ${accent.to} flex-shrink-0`} />

        {/* Header */}
        <div className="flex items-center gap-3 px-6 pt-5 pb-4" style={{ transform: "translateZ(25px)", transformStyle: "preserve-3d" }}>
          <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${accent.from} ${accent.to} flex items-center justify-center text-2xl shadow-md flex-shrink-0`}>
            {category.icon}
          </div>
          <h3 className="text-base font-bold text-slate-800 leading-tight">{category.title}</h3>
        </div>

        {/* Divider */}
        <div className="mx-6 h-px bg-slate-100" />

        {/* Skill pills */}
        <div
          className="flex flex-wrap gap-2 px-6 py-5 flex-1"
          style={{ transform: "translateZ(15px)", transformStyle: "preserve-3d" }}
        >
          {category.skills.map((skill) => (
            <span
              key={skill}
              className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border border-slate-200 text-slate-600 bg-slate-50 hover:border-[#2563EB] hover:text-[#2563EB] hover:bg-blue-50 transition-all duration-200 cursor-default`}
            >
              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${accent.dot}`} />
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Skills = () => {
  useScrollAnimation();

  return (
    <section
      id="skills"
      className="bg-white text-slate-800 px-4 sm:px-6 py-16 relative overflow-hidden transition-colors duration-300"
    >
      {/* Dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage: "radial-gradient(circle, #2563EB22 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* Twinkling dots */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute w-[2px] h-[2px] bg-[#2563EB] opacity-20 rounded-full animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Section header */}
      <div className="relative z-10 text-center mb-10 animate-fade-up">
        <h2 className="text-4xl font-bold text-slate-900 mb-2">Technical Skills</h2>
        <div className="w-24 h-1 bg-[#2563EB] mx-auto my-4 rounded-full" />
        <p className="max-w-2xl mx-auto text-slate-500">
          Full-stack expertise across frontend, AI engineering, backend, databases, and DevOps.
        </p>
      </div>

      {/* Cards — uniform 3-col grid for all 6 categories */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {skillCategories.map((category, i) => (
          <TiltCard
            key={category.title}
            category={category}
            accent={CATEGORY_ACCENTS[i % CATEGORY_ACCENTS.length]}
            delay={i * 0.1}
          />
        ))}
      </div>
    </section>
  );
};

export default Skills;
