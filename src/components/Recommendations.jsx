import { useState } from "react";
import { Download, ExternalLink, Linkedin } from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { recommendations } from "../data/recommendations";

const Recommendations = () => {
  const [hovered, setHovered] = useState(null);
  useScrollAnimation();

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/resume-itisha-jain.pdf";
    link.download = "Itisha_Jain_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="recommendations" className="py-10 bg-white px-6 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl font-bold text-slate-900 mb-2">LinkedIn Recommendations</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mb-6 rounded-full"></div>
          <p className="max-w-2xl mx-auto text-slate-600">
            Professional recommendations from colleagues and mentors on LinkedIn
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {recommendations.map((rec, index) => (
            <div
              key={index}
              className="bg-white border border-slate-200 rounded-lg p-6 shadow-md animate-scale-in transition-all duration-300 hover:shadow-blue-200 hover:scale-105 cursor-pointer relative"
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => window.open(rec.linkedinUrl, "_blank")}
            >
              {hovered === index && (
                <div className="absolute top-3 right-3 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              )}
              <div className="flex items-start space-x-4">
                <Linkedin className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <p className="text-slate-700 italic mb-4 leading-relaxed">"{rec.quote}"</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 text-white flex items-center justify-center rounded-full font-semibold text-sm">
                        {rec.avatar}
                      </div>
                      <div>
                        <h4 className="text-slate-900 font-semibold text-sm">{rec.name}</h4>
                        <p className="text-xs text-slate-500">
                          {rec.role} at {rec.company}
                        </p>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-blue-600 opacity-60" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center space-y-4 animate-fade-up">
          <button
            onClick={handleDownload}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              Download Resume
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Recommendations;
