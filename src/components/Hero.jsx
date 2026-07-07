import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { Download, Mail, MapPin, Phone, Code, Layers, Database, Linkedin, Github, Copy, Check } from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { useTypingEffect } from "../hooks/useTypingEffect";
import HireMeModal from "./HireMeModal";
import gsap from "gsap";

// Deferred so the Gemini SDK it pulls in isn't part of the initial bundle.
const GenerateIntro = lazy(() => import("./GenerateIntro"));

const EMAIL = "jainitisha192@gmail.com";
const ROLES = ["Full Stack Software Developer", "GenAI Engineer", "React Specialist", "Frontend Architect"];

const FLOAT_SYMBOLS = [
  { text: "</>",   top: "12%", left: "6%",  delay: "0s",   dur: "7s"  },
  { text: "{}",    top: "28%", left: "90%", delay: "1.5s", dur: "9s"  },
  { text: "=>",    top: "62%", left: "4%",  delay: "2s",   dur: "8s"  },
  { text: "()",    top: "78%", left: "85%", delay: "0.5s", dur: "6s"  },
  { text: "//",    top: "45%", left: "93%", delay: "3s",   dur: "7.5s"},
  { text: "[]",    top: "18%", left: "72%", delay: "1s",   dur: "8.5s"},
  { text: "&&",    top: "55%", left: "10%", delay: "2.5s", dur: "6.5s"},
  { text: "async", top: "38%", left: "87%", delay: "4s",   dur: "10s" },
  { text: "const", top: "85%", left: "22%", delay: "3.5s", dur: "9s"  },
];

const TECH_STACK = [
  "⚛️ React 19", "▲ Next.js", "🔷 TypeScript", "🔴 Redux Toolkit", "💨 Tailwind CSS",
  "🎨 ShadcnUI", "🟢 Node.js", "🚂 Express 5", "⚡ REST APIs", "🔌 WebSockets",
  "🐘 PostgreSQL", "🟣 Prisma ORM", "🍃 MongoDB", "🗄️ Redis",
  "🦜 LangChain", "🤖 Gemini / GPT", "🔄 GitHub Actions", "⚙️ DronaHQ",
];

// Time-aware greeting: greet by the VISITOR's local hour, and add a quip about
// what Itisha (IST) is likely doing right now.
function getTimeContext() {
  const now = new Date();
  const visitorHour = now.getHours();

  let greeting, emoji;
  if (visitorHour < 5) { greeting = "You're up late"; emoji = "🌙"; }
  else if (visitorHour < 12) { greeting = "Good morning"; emoji = "☀️"; }
  else if (visitorHour < 17) { greeting = "Good afternoon"; emoji = "👋"; }
  else if (visitorHour < 21) { greeting = "Good evening"; emoji = "🌆"; }
  else { greeting = "Good evening"; emoji = "🌙"; }

  // India Standard Time regardless of visitor timezone.
  const istTime = now.toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const istHour = Number(
    new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Kolkata",
      hour: "numeric",
      hour12: false,
    }).format(now)
  ) % 24;

  let quip;
  if (istHour >= 1 && istHour < 6) quip = `it's ${istTime} in India — Itisha is probably still coding`;
  else if (istHour < 12) quip = `it's ${istTime} in India — Itisha's likely deep in a standup`;
  else if (istHour < 18) quip = `it's ${istTime} in India — Itisha's shipping features right now`;
  else quip = `it's ${istTime} in India — Itisha's probably reviewing a PR`;

  return { greeting, emoji, quip };
}

const Hero = () => {
  useScrollAnimation();
  const typedRole = useTypingEffect(ROLES);
  const [copied, setCopied] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [timeCtx, setTimeCtx] = useState(getTimeContext);
  const heroRef = useRef(null);

  // Keep the IST clock fresh while the page is open.
  useEffect(() => {
    const id = setInterval(() => setTimeCtx(getTimeContext()), 30000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".gsap-hero-text > *", {
        opacity: 0,
        y: 40,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2,
      });
      gsap.from(".gsap-hero-image", {
        opacity: 0,
        scale: 0.85,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.3,
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <section
        ref={heroRef}
        id="home"
        className="min-h-screen bg-white pt-24 sm:pt-28 relative overflow-hidden transition-colors duration-300"
      >
        {/* Animated mesh blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="blob-drift-1 absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-300/25 rounded-full blur-3xl" />
          <div className="blob-drift-2 absolute top-1/2 right-1/4 w-[420px] h-[420px] bg-purple-300/20 rounded-full blur-3xl" />
          <div className="blob-drift-3 absolute bottom-1/4 left-1/3 w-[360px] h-[360px] bg-pink-300/15 rounded-full blur-3xl" />
        </div>

        {/* Floating code symbols */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          {FLOAT_SYMBOLS.map((sym, i) => (
            <div
              key={i}
              className="absolute font-mono font-bold text-[#2563EB] float-code"
              style={{
                top: sym.top,
                left: sym.left,
                opacity: 0.07,
                fontSize: "clamp(0.85rem, 2vw, 1.3rem)",
                animationDelay: sym.delay,
                "--dur": sym.dur,
              }}
            >
              {sym.text}
            </div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-2 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            {/* Content */}
            <div className="space-y-6 order-2 lg:order-1 gsap-hero-text">
              <div className="space-y-4">

                {/* Time-aware greeting */}
                <p className="text-sm text-slate-500">
                  <span className="font-medium text-slate-700">{timeCtx.greeting} {timeCtx.emoji}</span>
                  {" — "}{timeCtx.quip}.
                </p>

                {/* Available badge */}
                <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-2 rounded-full w-fit shadow-sm">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0" />
                  <span className="font-medium">Available for full-time roles</span>
                </div>

                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight">
                  Hi, I'm <span className="text-[#2563EB]">Itisha Jain</span>
                </h1>

                <h2 className="text-2xl sm:text-3xl font-semibold text-slate-600 h-10">
                  {typedRole}
                  <span className="typing-cursor text-[#2563EB]" />
                </h2>

                <p className="text-base text-slate-700 max-w-2xl">
                  Full Stack Engineer with hands-on experience architecting pixel-perfect, high-performance web applications using React 19, Next.js, TypeScript, and Redux. Sole frontend engineer on Eazy Cockpit — independently owned the full component architecture and UI layer across multiple enterprise ERP and CRM modules.
                </p>

                {/* AI-generated personalized pitch */}
                <div className="pt-1">
                  <Suspense fallback={<div className="h-12" />}>
                    <GenerateIntro />
                  </Suspense>
                </div>
              </div>

              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#2563EB]" />
                  <a
                    href={`https://mail.google.com/mail/?view=cm&to=${EMAIL}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#2563EB] hover:text-blue-700 transition-colors duration-300"
                  >
                    {EMAIL}
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="ml-1 text-slate-400 hover:text-[#2563EB] transition-colors duration-200"
                    aria-label="Copy email"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                  {copied && (
                    <span className="text-xs text-green-500 font-medium toast-enter">Copied!</span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-[#2563EB]" />
                  <span>Based in India, Available for Remote Work</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#2563EB]" />
                  <span>Available for opportunities</span>
                </div>

                <div className="flex space-x-4 pt-6">
                  <a
                    href="https://www.linkedin.com/in/itisha-jain/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Itisha Jain on LinkedIn"
                    className="w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center justify-center transition-transform hover:scale-110"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="https://github.com/ItishaJain123"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Itisha Jain on GitHub"
                    className="w-10 h-10 bg-slate-800 hover:bg-slate-900 text-white rounded-md flex items-center justify-center transition-transform hover:scale-110"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                {/* Shimmer "Hire Me" button */}
                <button
                  onClick={() => setModalOpen(true)}
                  className="relative flex items-center justify-center bg-[#2563EB] hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition-all duration-300 overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <Mail className="w-5 h-5 mr-2 relative z-10" />
                  <span className="relative z-10">Hire Me</span>
                </button>
                <button
                  onClick={() => scrollToSection("projects")}
                  className="flex items-center justify-center border-2 border-[#2563EB] text-[#2563EB] hover:bg-blue-50 px-6 py-3 rounded-lg transition-all duration-300"
                >
                  View Work
                </button>
                <a
                  href="/Itisha_Jain_Resume.pdf"
                  download
                  className="flex items-center justify-center border-2 border-slate-300 text-slate-700 hover:bg-slate-100 px-6 py-3 rounded-lg transition-all duration-300"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Resume
                </a>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-6 max-w-sm sm:max-w-md">
                {[["2+", "Years Experience"], ["10+", "Projects Done"], ["100%", "Client Satisfaction"]].map(([val, label]) => (
                  <div key={label} className="text-center">
                    <div className="text-xl font-bold text-[#2563EB]">{val}</div>
                    <div className="text-sm text-slate-500">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Profile Image */}
            <div className="flex justify-center lg:justify-end order-1 lg:order-2 gsap-hero-image">
              <div className="relative">
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                  {/* Spinning conic gradient ring */}
                  <div
                    className="spin-gradient absolute rounded-full"
                    style={{
                      inset: "-5px",
                      background: "conic-gradient(from 0deg, #3b82f6, #8b5cf6, #ec4899, #f59e0b, #3b82f6)",
                    }}
                  />
                  {/* White gap */}
                  <div className="absolute rounded-full bg-white" style={{ inset: "-1px" }} />
                  {/* Photo */}
                  <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl">
                    <img
                      src="/Ishu.jpeg"
                      alt="Itisha Jain"
                      width="384"
                      height="384"
                      fetchpriority="high"
                      decoding="async"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>

                {/* Floating icon badges */}
                <div className="absolute -top-4 -right-4 bg-white p-3 rounded-xl shadow-lg border border-slate-200 hover:scale-110 transition-transform duration-300">
                  <Code className="w-6 h-6 text-[#2563EB]" />
                </div>
                <div className="absolute top-1/2 -left-4 bg-white p-3 rounded-xl shadow-lg border border-slate-200 hover:scale-110 transition-transform duration-300">
                  <Layers className="w-6 h-6 text-[#2563EB]" />
                </div>
                <div className="absolute -bottom-4 left-1/4 bg-white p-3 rounded-xl shadow-lg border border-slate-200 hover:scale-110 transition-transform duration-300">
                  <Database className="w-6 h-6 text-[#2563EB]" />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Tech stack scrolling marquee */}
        <div className="relative mt-14 overflow-hidden border-t border-slate-100 py-4 bg-slate-50/60">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
          <div className="flex animate-marquee gap-10 whitespace-nowrap">
            {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
              <span
                key={i}
                className="text-sm font-medium text-slate-400 hover:text-[#2563EB] transition-colors duration-200 cursor-default flex-shrink-0"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

      </section>

      <HireMeModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default Hero;
