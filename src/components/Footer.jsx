const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    "Home",
    "About",
    "Skills",
    "Projects",
    "Experience",
    "Recommendations",
    "Contact",
  ];

  const scrollTo = (id) =>
    document
      .getElementById(id.toLowerCase())
      ?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="bg-slate-900 border-t border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">
              <span className="text-white">Itisha </span>
              <span className="text-blue-400">Jain</span>
            </h3>
            <p className="text-slate-400 leading-relaxed text-sm">
              Full Stack Software Developer passionate about building enterprise
              platforms, AI-powered applications, and exceptional user
              experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item)}
                  className="text-slate-400 hover:text-blue-400 text-left text-sm transition duration-200"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Get In Touch</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <span>📍</span>
                <span className="text-slate-400">India</span>
              </div>
              <div className="flex items-center space-x-3">
                <span>📧</span>
                <a
                  href="https://mail.google.com/mail/?view=cm&to=jainitisha192@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-blue-400 transition-colors duration-200"
                >
                  jainitisha192@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <span>💼</span>
                <span className="text-slate-400">
                  Available for opportunities
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-slate-700 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">
            © {currentYear} Itisha Jain. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <span className="text-slate-500 text-sm">
              Built with React & Tailwind CSS
            </span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-full transition transform hover:scale-110"
              aria-label="Scroll to top"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
