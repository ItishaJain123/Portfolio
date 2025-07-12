import { useState } from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    "Home",
    "About",
    "Skills",
    "Projects",
    "Experience",
    "Recommendations",
    "Contact",
  ];

  return (
    <footer className="bg-blue-500 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">
              <span className="text-black">Itisha </span>
              <span className="text-white">Jain</span>
            </h3>
            <p className="text-white leading-relaxed">
              Frontend Developer passionate about creating clean, scalable, and
              user-focused digital experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-black">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    const element = document.getElementById(item.toLowerCase());
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="text-white hover:text-blue-600 text-left transition duration-300"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-black">Get In Touch</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-lg">📍</span>
                <span className="text-white">India</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-lg">📧</span>
                <a
                  href="https://mail.google.com/mail/?view=cm&to=jainitisha192@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-600 transition-colors duration-300"
                >
                  jainitisha192@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-lg">💼</span>
                <span className="text-white">Available for opportunities</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white text-sm">
            © {currentYear} Itisha Jain. All rights reserved.
          </p>

          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <span className="text-white text-sm">
              Built with React & Tailwind CSS
            </span>
            <button
              onClick={scrollToTop}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition transform hover:scale-110"
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
