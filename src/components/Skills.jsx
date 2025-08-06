import { useEffect } from "react";

const Skills = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(
      ".animate-slide-in-right, .animate-fade-up, .animate-scale-in"
    );
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const skillCategories = [
    {
      title: "Frontend Development",
      icon: "🎨",
      skills: [
        "React.js",
        "TypeScript",
        "JavaScript",
        "Next.js",
        "Tailwind CSS",
        "HTML5 & CSS3",
      ],
    },
    {
      title: "Backend & Tools",
      icon: "⚙️",
      skills: ["Node.js", "Git & GitHub", "Vite", "Redux", "REST APIs"],
    },
    {
      title: "Databases & Other",
      icon: "🗄️",
      skills: ["MySQL", "C++", "Syncfusion", "Drona HQ", "Firebase"],
    },
  ];

  return (
    <section
      id="skills"
      className="min-h-screen bg-white text-slate-800 px-6 py-16 relative overflow-hidden"
    >
      {/* Sparkle Stars */}
      <style>
        {`
          @keyframes twinkle {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 1; }
          }
          .animate-twinkle {
            animation: twinkle 2s infinite ease-in-out;
          }
          .animate-fade-up {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.7s ease-out;
          }
          .animate-slide-in-right {
            opacity: 0;
            transform: translateX(30px);
            transition: all 0.7s ease-out;
          }
          .animate-scale-in {
            opacity: 0;
            transform: scale(0.9);
            transition: all 0.7s ease-out;
          }
          .in-view {
            opacity: 1 !important;
            transform: none !important;
          }
        `}
      </style>

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

      {/* Header */}
      <div className="relative z-10 text-center mb-16 animate-fade-up">
        <h2 className="text-4xl font-bold text-slate-900 mb-2">
          Technical Skills
        </h2>
        <div className="w-24 h-1 bg-[#2563EB] mx-auto my-4 rounded-full" />
        <p className="max-w-3xl mx-auto text-slate-600">
          Proficient in modern technologies and frameworks to build exceptional
          digital solutions.
        </p>
      </div>

      {/* Skills Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {skillCategories.map((category, i) => (
          <div
            key={category.title}
            className={`bg-white text-black rounded-xl border border-[#2563EB]/30 shadow-md p-8 transition-all duration-500 animate-scale-in`}
            style={{ transitionDelay: `${i * 0.2}s` }}
          >
            <div className="text-center mb-6">
              <div className="text-5xl mb-2">{category.icon}</div>
              <h3 className="text-2xl font-semibold">{category.title}</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {category.skills.map((skill) => (
                <div
                  key={skill}
                  className="text-center text-sm px-3 py-2 bg-white border border-[#2563EB] text-[#2563EB] rounded-md 
                  transition-all duration-300 ease-in-out hover:bg-[#2563EB] hover:text-white hover:scale-105 hover:shadow-md hover:shadow-[#2563EB]/50"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
