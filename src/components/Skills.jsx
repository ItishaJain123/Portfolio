import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { skillCategories } from "../data/skills";

const SkillCard = ({ category, delay }) => (
  <div
    className="bg-white text-black rounded-xl border border-[#2563EB]/30 shadow-md p-8 transition-all duration-500 animate-scale-in"
    style={{ transitionDelay: `${delay}s` }}
  >
    <div className="text-center mb-6">
      <div className="text-5xl mb-2">{category.icon}</div>
      <h3 className="text-2xl font-semibold">{category.title}</h3>
    </div>
    <div className="grid grid-cols-2 gap-4">
      {category.skills.map((skill) => (
        <div
          key={skill}
          className="text-center text-sm px-3 py-2 bg-white border border-[#2563EB] text-[#2563EB] rounded-md transition-all duration-300 ease-in-out hover:bg-[#2563EB] hover:text-white hover:scale-105 hover:shadow-md hover:shadow-[#2563EB]/50"
        >
          {skill}
        </div>
      ))}
    </div>
  </div>
);

const Skills = () => {
  useScrollAnimation();

  return (
    <section
      id="skills"
      className="min-h-screen bg-white text-slate-800 px-6 py-16 relative overflow-hidden transition-colors duration-300"
    >
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
        {/* First row — 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {skillCategories.slice(0, 3).map((category, i) => (
            <SkillCard key={category.title} category={category} delay={i * 0.15} />
          ))}
        </div>
        {/* Second row — 2 cards centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-3xl mx-auto">
          {skillCategories.slice(3).map((category, i) => (
            <SkillCard key={category.title} category={category} delay={(i + 3) * 0.15} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
