import { useState, useEffect, useRef } from "react";
import { Download, Mail, MapPin, Phone, Code, Layers, Database, Linkedin, Github, Copy, Check } from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { useTypingEffect } from "../hooks/useTypingEffect";
import HireMeModal from "./HireMeModal";
import gsap from "gsap";

const EMAIL = "jainitisha192@gmail.com";
const ROLES = ["Full Stack Software Developer", "GenAI Engineer", "React Specialist", "Frontend Architect"];

const Hero = () => {
  useScrollAnimation();
  const typedRole = useTypingEffect(ROLES);
  const [copied, setCopied] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const heroRef = useRef(null);

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            {/* Content */}
            <div className="space-y-6 order-2 lg:order-1 gsap-hero-text">
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight">
                  Hi, I'm <span className="text-[#2563EB]">Itisha Jain</span>
                </h1>

                <h2 className="text-2xl sm:text-3xl font-semibold text-slate-600 h-10">
                  {typedRole}
                  <span className="typing-cursor text-[#2563EB]" />
                </h2>

                <p className="text-base text-slate-700 max-w-2xl">
                  Building enterprise platforms and AI-powered applications with React, Node.js, and PostgreSQL.
                  Focused on clean architecture, measurable impact, and exceptional user experiences.
                </p>
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
                    className="w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center justify-center transition-transform hover:scale-110"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="https://github.com/ItishaJain123"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-slate-800 hover:bg-slate-900 text-white rounded-md flex items-center justify-center transition-transform hover:scale-110"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={() => setModalOpen(true)}
                  className="flex items-center justify-center bg-[#2563EB] hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition-all duration-300"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Hire Me
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
                <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 relative">
                  <div className="relative w-full h-full rounded-full overflow-hidden border-8 border-blue-100 shadow-2xl">
                    <img src="/itisha.jpg" alt="Itisha Jain" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-white p-3 rounded-xl shadow-lg border border-slate-200">
                  <Code className="w-6 h-6 text-[#2563EB]" />
                </div>
                <div className="absolute top-1/2 -left-4 bg-white p-3 rounded-xl shadow-lg border border-slate-200">
                  <Layers className="w-6 h-6 text-[#2563EB]" />
                </div>
                <div className="absolute -bottom-4 left-1/4 bg-white p-3 rounded-xl shadow-lg border border-slate-200">
                  <Database className="w-6 h-6 text-[#2563EB]" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <HireMeModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default Hero;
