import { useRef } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { skillCategories } from "../data/skills";

const TiltCard = ({ category, delay }) => {
  const cardRef = useRef(null);
  const glareRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Max tilt of 15 degrees
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04)`;

    // Glare position follows cursor
    if (glareRef.current) {
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      glareRef.current.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.25) 0%, transparent 70%)`;
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    if (glareRef.current) {
      glareRef.current.style.background = "transparent";
    }
  };

  return (
    <div
      style={{ perspective: "1000px", transitionDelay: `${delay}s` }}
      className="animate-scale-in"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ transition: "transform 0.1s ease-out, box-shadow 0.1s ease-out", transformStyle: "preserve-3d" }}
        className="relative bg-white rounded-2xl border border-[#2563EB]/20 shadow-md p-8 cursor-default overflow-hidden hover:shadow-xl hover:shadow-blue-100"
      >
        {/* Glare overlay */}
        <div
          ref={glareRef}
          className="absolute inset-0 rounded-2xl pointer-events-none z-10 transition-all duration-100"
        />

        {/* Floating icon — pops forward with translateZ */}
        <div
          className="text-center mb-6"
          style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}
        >
          <div className="text-5xl mb-3 drop-shadow-md">{category.icon}</div>
          <h3 className="text-xl font-bold text-slate-800">{category.title}</h3>
        </div>

        {/* Skill pills — also slightly elevated */}
        <div
          className="grid grid-cols-2 gap-3"
          style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}
        >
          {category.skills.map((skill) => (
            <div
              key={skill}
              className="text-center text-sm px-3 py-2 bg-white border border-[#2563EB] text-[#2563EB] rounded-lg transition-all duration-300 hover:bg-[#2563EB] hover:text-white hover:shadow-md hover:shadow-[#2563EB]/40"
            >
              {skill}
            </div>
          ))}
        </div>

        {/* Subtle bottom gradient accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-60 rounded-b-2xl" />
      </div>
    </div>
  );
};

const Skills = () => {
  useScrollAnimation();

  return (
    <section
      id="skills"
      className="min-h-screen bg-white text-slate-800 px-6 py-16 relative overflow-hidden transition-colors duration-300"
    >
      {/* Twinkling dots */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(60)].map((_, i) => (
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

      <div className="relative z-10 text-center mb-16 animate-fade-up">
        <h2 className="text-4xl font-bold text-slate-900 mb-2">Technical Skills</h2>
        <div className="w-24 h-1 bg-[#2563EB] mx-auto my-4 rounded-full" />
        <p className="max-w-3xl mx-auto text-slate-600">
          Proficient in modern technologies and frameworks to build exceptional digital solutions.
        </p>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {skillCategories.slice(0, 3).map((category, i) => (
            <TiltCard key={category.title} category={category} delay={i * 0.15} />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-3xl mx-auto">
          {skillCategories.slice(3).map((category, i) => (
            <TiltCard key={category.title} category={category} delay={(i + 3) * 0.15} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
