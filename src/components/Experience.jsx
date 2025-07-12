import { useEffect } from "react";

const Experience = () => {
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
      ".animate-fade-up, .animate-slide-in-right"
    );
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const experiences = [
    {
      company: "Eazy ERP",
      position: "Junior React JS Developer",
      duration: "Mar 2024 – Present",
      location: "Remote",
      description:
        "Focused on crafting high-performance dashboards, optimizing data workflows, and elevating user experience through scalable frontend solutions.",
      achievements: [
        "Developed responsive dashboards, resulting in 70% faster UI performance",
        "Enabled bulk upload of 1000+ Excel records, streamlining data operations",
        "Enhanced CRM module UI and performance, improving user experience",
        "Built custom UI features and internal tools via low-code platforms like DronaHQ",
        "Collaborated with cross-functional teams to ship robust, scalable features",
      ],
      technologies: ["React.js", "Drona", "Syncfusion", "Redux", "JavaScript"],
      current: true,
    },
    {
      company: "Furnovate",
      position: "Web Developer Intern",
      duration: "Aug 2021 – Oct 2021",
      location: "Hybrid",
      description:
        "Frontend development focusing on responsive design and user experience improvements.",
      achievements: [
        "Developed Fab Wall UI with modern design principles",
        "Implemented responsive design patterns for mobile optimization",
        "Enhanced user experience through intuitive navigation",
        "Contributed to overall website performance improvements",
      ],
      technologies: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "Responsive Design",
        "UI/UX",
      ],
      current: false,
    },
  ];

  const education = [
    {
      degree: "BTech, Computer Science",
      institution: "Prestige Institute (RGPV)",
      year: "2023",
      grade: "CGPA: 9.10 (Top 2%)",
      highlight: true,
    },
    {
      degree: "Class XII",
      institution: "Higher Secondary",
      year: "2019",
      grade: "83%",
      highlight: false,
    },
    {
      degree: "Class X",
      institution: "Secondary School",
      year: "2017",
      grade: "92%",
      highlight: false,
    },
  ];

  const extraAchievements = [
    {
      title: "G20 Summit 2023 Representative",
      description: "Selected as 1 of 20 representatives from 1800+ applicants",
      icon: "🏆",
    },
    {
      title: "MUN Secretary General",
      description:
        "Successfully managed 150+ delegates across multiple conferences",
      icon: "👥",
    },
    {
      title: "Placement Coordinator",
      description:
        "Coordinated 300+ placements with ₹90 Lakh budget management",
      icon: "📈",
    },
  ];

  return (
    <section id="experience" className="py-15 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-2">
            Experience & Education
          </h2>
          <div className="w-24 h-1 bg-[#2563EB] mx-auto mb-6"></div>
          <p className="max-w-2xl text-slate-600 mx-auto">
            A glimpse into the professional path and educational foundation that
            shaped my passion for building beautiful, user-centered interfaces.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Experience Column */}
          <div className="animate-fade-up">
            <h3 className="text-2xl font-bold text-slate-800 mb-8 flex items-center">
              <div className="w-8 h-8 bg-[#2563EB] rounded-full flex items-center justify-center mr-3 text-white">
                💼
              </div>
              Professional Experience
            </h3>

            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div key={index} className="relative">
                  {index !== experiences.length - 1 && (
                    <div className="absolute left-6 top-16 w-0.5 h-20 bg-blue-200"></div>
                  )}

                  <div className="flex items-start space-x-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                        exp.current ? "bg-[#2563EB]" : "bg-slate-400"
                      }`}
                    >
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>

                    <div className="flex-1 bg-white shadow-md rounded-xl p-6 border border-slate-100 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:ring-2 hover:ring-[#2563EB]/30 cursor-pointer">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                        <h4 className="text-lg font-bold text-slate-800">
                          {exp.position}
                        </h4>
                        {exp.current && (
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-[#2563EB] border border-blue-200">
                            Current
                          </span>
                        )}
                      </div>
                      <div className="text-[#2563EB] font-semibold mb-1">
                        {exp.company}
                      </div>
                      <div className="text-sm text-slate-500 mb-3">
                        {exp.duration} • {exp.location}
                      </div>
                      <p className="text-slate-600 mb-4">{exp.description}</p>

                      <ul className="space-y-2 mb-4">
                        {exp.achievements.map((ach, i) => (
                          <li
                            key={i}
                            className="flex items-start text-sm text-slate-700"
                          >
                            <span className="mt-1 w-1.5 h-1.5 bg-[#2563EB] rounded-full mr-3 flex-shrink-0"></span>
                            {ach}
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 bg-blue-50 text-[#2563EB] text-xs font-medium rounded border border-blue-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education Column */}
          <div className="animate-slide-in-right">
            <h3 className="text-2xl font-bold text-slate-800 mb-8 flex items-center">
              <div className="w-8 h-8 bg-[#2563EB] rounded-full flex items-center justify-center mr-3 text-white">
                🎓
              </div>
              Education
            </h3>

            <div className="space-y-6">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:ring-2 hover:ring-[#2563EB]/30 shadow-md border cursor-pointer ${
                    edu.highlight
                      ? "bg-blue-50 border-blue-200"
                      : "bg-white border-slate-200"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-lg font-bold text-slate-800">
                      {edu.degree}
                    </h4>
                    {edu.highlight && (
                      <span className="px-2.5 py-1 bg-blue-100 text-[#2563EB] text-xs font-bold rounded-full border border-blue-200">
                        Top 2%
                      </span>
                    )}
                  </div>
                  <div className="text-[#2563EB] font-semibold mb-1">
                    {edu.institution}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">{edu.year}</span>
                    <span className="font-semibold text-slate-700">
                      {edu.grade}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Extra Achievements */}
            <div className="mt-12">
              <h4 className="text-xl font-bold text-slate-800 mb-6">
                Key Achievements & Extracurricular
              </h4>
              <div className="space-y-4">
                {extraAchievements.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center p-4 bg-white shadow-md rounded-lg border border-slate-100 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:ring-2 hover:ring-[#2563EB]/30 cursor-pointer"
                  >
                    <div className="text-2xl mr-4">{item.icon}</div>
                    <div>
                      <h5 className="font-semibold text-slate-800">
                        {item.title}
                      </h5>
                      <p className="text-sm text-slate-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
