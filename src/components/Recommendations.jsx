import { useState, useEffect } from "react";
import { Download, ExternalLink, Linkedin } from "lucide-react";

const Recommendations = () => {
  const [hovered, setHovered] = useState(null);

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

  const recommendations = [
    {
      quote:
        "I had the opportunity to collaborate with Itisha during her time as a developer in Eazy, and she consistently impressed everyone with her technical acumen and collaborative spirit. While we were part of different teams, her reputation for being a proactive problem-solver and a reliable team player was well known. She brings a great blend of technical expertise and interpersonal skills, something that’s truly valuable in today’s fast-paced tech environment. I’m confident she’ll bring the same impact and enthusiasm to any future role she takes on.",
      name: "Ibha Katoch",
      role: "Senior HR Manager",
      company: "Eazy ERP",
      avatar: "SC",
      linkedinUrl:
        "https://www.linkedin.com/in/itisha-jain/details/recommendations/",
    },
    {
      quote:
        "I am pleased to recommend Itisha Jain from Prestige Institute of Engineering, Management & Research, Indore. Itisha is very talented student with a strong command over C++, web technologies including ReactJS, HTML, CSS, and JavaScript. Her ability to write clean, efficient code and build user-friendly interfaces reflects her deep technical understanding and creative mindset. Beyond her technical skills, Itisha shines in her soft skills—she communicates effectively, works well in teams, and leads with confidence......",
      name: "Dr. Preeti Gupta",
      role: "Associate Professor",
      company: "Prestige Institute of Engineering Management & Research",
      avatar: "MR",
      linkedinUrl:
        "https://www.linkedin.com/in/itisha-jain/details/recommendations/",
    },
    {
      quote:
        "I had the pleasure of working with Itisha Jain on multiple projects, and I can confidently say she is a highly skilled and driven professional. Itisha brings a unique combination of technical expertise, strong problem-solving skills, and effective communication that makes her an invaluable asset to any team. Her work ethic and dedication to excellence are evident in everything she does. Itisha is always keen on understanding the bigger picture and then breaking down complex challenges into manageable solutions. Her ability to collaborate seamlessly......",
      name: "Sourabh Bhattacharya",
      role: "Associate Director Corporate Relations",
      company: "Sunstone Eduversity",
      avatar: "PS",
      linkedinUrl:
        "https://www.linkedin.com/in/itisha-jain/details/recommendations/",
    },
  ];

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/resume-itisha-jain.pdf";
    link.download = "Itisha_Jain_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="recommendations" className="py-10 bg-white px-6 relative">
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: none; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-up {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease-out;
        }
        .animate-scale-in {
          opacity: 0;
          transform: scale(0.95);
          transition: all 0.8s ease-out;
        }
        .in-view {
          opacity: 1 !important;
          transform: none !important;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl font-bold text-slate-900 mb-2">
            LinkedIn Recommendations
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mb-6 rounded-full"></div>
          <p className="max-w-2xl mx-auto text-slate-600">
            Professional recommendations from colleagues and mentors on LinkedIn
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {recommendations.map((rec, index) => (
            <div
              key={index}
              className="bg-white border border-slate-200 rounded-lg p-6 shadow-md animate-scale-in transition-all duration-300 hover:shadow-blue-200 hover:scale-105 cursor-pointer relative"
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => window.open(rec.linkedinUrl, "_blank")}
            >
              {/* Pulse dot */}
              {hovered === index && (
                <div className="absolute top-3 right-3 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              )}

              <div className="flex items-start space-x-4">
                <Linkedin className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <p className="text-slate-700 italic mb-4 leading-relaxed">
                    “{rec.quote}”
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 text-white flex items-center justify-center rounded-full font-semibold text-sm">
                        {rec.avatar}
                      </div>
                      <div>
                        <h4 className="text-slate-900 font-semibold text-sm">
                          {rec.name}
                        </h4>
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

        {/* Download Resume Button */}
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
