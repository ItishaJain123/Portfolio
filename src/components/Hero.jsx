import {
  Download,
  Mail,
  MapPin,
  Phone,
  Code,
  Layers,
  Database,
} from "lucide-react";
import { useEffect } from "react";

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

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
      ".animate-fade-up, .animate-scale-in"
    );
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen bg-white pt-24 sm:pt-28 relative overflow-hidden"
    >
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: none; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-up {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease-out;
        }
        .animate-scale-in {
          opacity: 0;
          transform: scale(0.9);
          transition: all 0.8s ease-out;
        }
        .in-view {
          opacity: 1 !important;
          transform: none !important;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Content */}
          <div className="space-y-6 order-2 lg:order-1 animate-fade-up">
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight">
                Hi, I'm <span className="text-[#2563EB]">Itisha Jain</span>
              </h1>
              <h2 className="text-2xl sm:text-3xl font-semibold text-slate-600">
                Software Developer & Frontend Engineer
              </h2>
              <p className="text-base text-slate-700 max-w-2xl">
                "Designing Experiences, Not Just Interfaces." I bring ideas to
                life through intuitive and visually captivating design. Let’s
                create something meaningful, memorable, and beautifully
                user-focused — together.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 text-sm text-slate-600">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#2563EB]" />
                <a
                  href="https://mail.google.com/mail/?view=cm&to=jainitisha192@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-600 transition-colors duration-300"
                >
                  jainitisha192@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#2563EB]" />
                <span>Based in India, Available for Remote Work</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#2563EB]" />
                <span>Available for opportunities</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => scrollToSection("contact")}
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

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 max-w-sm sm:max-w-md">
              <div className="text-center">
                <div className="text-xl font-bold text-[#2563EB]">1+</div>
                <div className="text-sm text-slate-500">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-[#2563EB]">10+</div>
                <div className="text-sm text-slate-500">Projects Done</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-[#2563EB]">100%</div>
                <div className="text-sm text-slate-500">
                  Client Satisfaction
                </div>
              </div>
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2 animate-scale-in">
            <div className="relative">
              <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 relative">
                <div className="relative w-full h-full rounded-full overflow-hidden border-8 border-blue-100 shadow-2xl">
                  <img
                    src="https://i.postimg.cc/B612kdSp/itisha.jpg"
                    alt="Itisha Jain"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Floating Icons */}
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
  );
};

export default Hero;
