import { useEffect, useRef, useState } from "react";
import { Code, Palette, Users, Trophy } from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { achievements, strengths } from "../data/about";

const ICON_MAP = { Code, Palette, Users, Trophy };

const CARD_STYLES = [
  { icon: "text-blue-600", border: "border-blue-200", bg: "bg-blue-50", hover: "hover:border-blue-400" },
  { icon: "text-purple-600", border: "border-purple-200", bg: "bg-purple-50", hover: "hover:border-purple-400" },
  { icon: "text-teal-600", border: "border-teal-200", bg: "bg-teal-50", hover: "hover:border-teal-400" },
  { icon: "text-orange-500", border: "border-orange-200", bg: "bg-orange-50", hover: "hover:border-orange-400" },
];

const STATS = [
  { value: 2, suffix: "+", label: "Years Experience" },
  { value: 70, suffix: "%", label: "Engagement Boost" },
  { value: 6, suffix: "", label: "Enterprise Modules" },
  { value: 9.1, suffix: "", label: "CGPA" },
];

const TERMINAL_LINES = [
  { type: "comment", text: "// Itisha Jain — Full Stack & GenAI Engineer" },
  { type: "const", key: "role", value: '"Software Developer @ Eazy ERP"' },
  { type: "const", key: "stack", value: '["React", "Next.js", "Node.js", "LangChain"]' },
  { type: "const", key: "superpower", value: '"Turning complex problems into clean UIs"' },
  { type: "const", key: "status", value: '"Open to full-time roles 🚀"' },
];

function useCountUp(target, duration = 1500, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const isDecimal = !Number.isInteger(target);
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(isDecimal ? parseFloat(current.toFixed(1)) : Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [start, target, duration]);
  return count;
}

function StatCard({ value, suffix, label, started }) {
  const count = useCountUp(value, 1400, started);
  return (
    <div className="text-center">
      <p className="text-3xl font-extrabold text-[#2563EB]">{count}{suffix}</p>
      <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider">{label}</p>
    </div>
  );
}

const About = () => {
  useScrollAnimation();
  const statsRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.4 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-16 bg-white relative overflow-hidden transition-colors duration-300">
      {/* Subtle background blobs matching Hero */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="blob-drift-2 absolute top-0 right-0 w-[400px] h-[400px] bg-blue-200/20 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
        <div className="blob-drift-3 absolute bottom-0 left-0 w-[350px] h-[350px] bg-purple-200/15 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Heading */}
        <div className="text-center mb-12 animate-fade-up">
          <h2 className="text-4xl font-bold text-gray-900">About Me</h2>
          <div className="w-24 h-1 bg-[#2563EB] mx-auto my-4 rounded-full" />
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A passionate software developer dedicated to creating exceptional digital experiences
          </p>
        </div>

        {/* Stat counters */}
        <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-14 animate-fade-up">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="bg-white border border-blue-100 rounded-2xl py-6 px-4 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-300"
            >
              <StatCard {...s} started={statsVisible} />
            </div>
          ))}
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left — bio + terminal */}
          <div className="space-y-8 animate-slide-in-left">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Passionate About Technology</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                I'm a dedicated software developer with a strong foundation in modern web
                technologies. My journey in programming has been driven by curiosity and a desire to
                solve real-world problems through innovative digital solutions.
              </p>
              <p className="text-gray-700 leading-relaxed">
                With expertise in React.js, TypeScript, and various modern frameworks, I focus on
                creating responsive, user-friendly applications that deliver exceptional user
                experiences.
              </p>
            </div>

            {/* Terminal block — intentionally dark, it's a code editor */}
            <div className="rounded-xl overflow-hidden border border-slate-200 shadow-lg">
              <div className="flex items-center gap-1.5 px-4 py-3 bg-[#1e1e2e]">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-3 text-xs text-slate-500 font-mono">itisha.js</span>
              </div>
              <div className="bg-[#13131f] px-5 py-5 font-mono text-sm space-y-2">
                {TERMINAL_LINES.map((line, i) => (
                  <div key={i}>
                    {line.type === "comment" ? (
                      <span className="text-slate-500">{line.text}</span>
                    ) : (
                      <span>
                        <span className="text-purple-400">const </span>
                        <span className="text-blue-300">{line.key}</span>
                        <span className="text-white"> = </span>
                        <span className="text-green-400">{line.value}</span>
                        <span className="text-white">;</span>
                      </span>
                    )}
                  </div>
                ))}
                <div className="flex items-center gap-1 pt-1">
                  <span className="text-green-400">▶</span>
                  <span className="w-2 h-4 bg-blue-400 animate-pulse inline-block" />
                </div>
              </div>
            </div>
          </div>

          {/* Right — achievement cards + strengths */}
          <div className="space-y-6 animate-fade-up">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {achievements.map((achievement, index) => {
                const Icon = ICON_MAP[achievement.iconName];
                const style = CARD_STYLES[index];
                return (
                  <div
                    key={index}
                    className={`p-6 rounded-xl bg-white border ${style.border} ${style.hover} text-center hover:scale-105 transform transition-all duration-300 shadow-sm hover:shadow-md`}
                  >
                    <div className={`flex justify-center mb-3`}>
                      <div className={`w-12 h-12 rounded-full ${style.bg} flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 ${style.icon}`} />
                      </div>
                    </div>
                    <h4 className="text-base font-semibold text-gray-900 mb-1">{achievement.title}</h4>
                    <p className="text-sm text-gray-500">{achievement.description}</p>
                  </div>
                );
              })}
            </div>

            {/* Strengths */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h4 className="text-base font-semibold text-gray-900 mb-4">What I Bring to the Table</h4>
              <ul className="space-y-3">
                {strengths.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-700 text-sm">
                    <span className="mt-0.5 w-5 h-5 flex-shrink-0 rounded-full bg-blue-100 border border-blue-300 flex items-center justify-center text-[#2563EB] text-xs font-bold">
                      {idx + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
