import { useState, useEffect } from "react";

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState(null);

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

  const projects = [
    {
      id: "mentai",
      title: "Mentai",
      description:
        "Get AI-driven industry insights, quizzes for practise, resumes, & tailored cover letters instantly",
      technologies: ["Next.js", "Shadcn UI", "Clerk", "Inngest"],
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=250&fit=crop&crop=center",
      video: "",
      demoUrl: "https://mentai-ai-powered.vercel.app/",
      githubUrl: "https://github.com/your-github/mentai",
      category: "Web Application",
      year: "2025",
    },
    {
      id: "expenseTracker",
      title: "Expense Tracker",
      description:
        "A responsive Expense Tracker which helps you stay on top of your finances with real-time tracking of income, expenses, and balances.",
      technologies: [
        "React.js",
        "Firebase",
        "Tailwind.css",
        "Recharts",
        "Ant Design",
      ],
      image:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop&crop=center",
      video: "/project-videos/portfolio-demo.webm",
      demoUrl: "https://smart-expense-app.vercel.app/",
      githubUrl: "https://github.com/ItishaJain123/Expense-tracker",
      category: "Web Application",
      year: "2025",
    },
    {
      id: "outfit-organizer",
      title: "Outfit Organizer",
      description:
        "A virtual wardrobe management system with interactive dashboard and outfit preview capabilities.",
      longDescription: "",
      technologies: ["React.js", "Redux", "Tailwind CSS", "Recharts"],
      image:
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=250&fit=crop&crop=center",
      video: "/project-videos/outfit-organizer-demo.webm",
      demoUrl: "https://itishajain123.github.io/outfit-organizer",
      githubUrl: "https://github.com/ItishaJain123/outfit-organizer",
      category: "Web Application",
      year: "2025",
    },
    {
      id: "mindmapper",
      title: "MindMapper AI Summarizer",
      description:
        "This Chrome extension allows users to summarize any selected text from a webpage and convert it into interactive, AI-generated mind maps or flowcharts, powered by Gemini API.",
      technologies: ["HTML5", "CSS3", "JavaScript", "Gemini API"],
      image:
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=250&fit=crop&crop=center",
      video: "/project-videos/fab-wall-demo.webm",
      demoUrl: "https://github.com/ItishaJain123/Mindmapper-AI-Extension",
      githubUrl: "https://github.com/ItishaJain123/Mindmapper-AI-Extension",
      category: "Chrome Extension",
      year: "2025",
    },
  ];

  return (
    <section id="projects" className="py-10 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-2 mb-6 rounded-full"></div>
          <p className="max-w-2xl mx-auto text-gray-600">
            A showcase of my recent work, demonstrating proficiency in modern
            web technologies and user-centered design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden relative transition transform duration-300 animate-scale-in hover:scale-[1.02]`}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Top border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-blue-600"></div>

              {/* Image/Video Section */}
              <div className="relative h-48 bg-gray-100 overflow-hidden">
                {hoveredProject === project.id ? (
                  <video
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  >
                    <source src={project.video} type="video/webm" />
                  </video>
                ) : (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                )}

                {/* Overlay Buttons */}
                <div
                  className={`absolute inset-0 flex items-center justify-center gap-4 bg-white/80 backdrop-blur-sm transition-all duration-300 ${
                    hoveredProject === project.id ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <button
                    onClick={() => window.open(project.demoUrl, "_blank")}
                    className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 shadow"
                  >
                    Live Demo
                  </button>
                  <button
                    onClick={() => window.open(project.githubUrl, "_blank")}
                    className="px-4 py-2 border border-blue-600 text-blue-600 text-sm rounded hover:bg-blue-50"
                  >
                    GitHub
                  </button>
                </div>

                {/* Badges */}
                <div className="absolute top-4 left-4">
                  <span className="text-xs bg-white/90 border border-gray-200 text-black px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full">
                    {project.year}
                  </span>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-slate-800 hover:text-blue-600 transition duration-300">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs bg-blue-50 text-blue-600 border border-blue-200 px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Bottom buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => window.open(project.demoUrl, "_blank")}
                    className="flex-1 text-sm text-blue-600 border border-blue-200 rounded py-2 hover:bg-blue-50 transition"
                  >
                    View Demo →
                  </button>
                  <button
                    onClick={() => window.open(project.githubUrl, "_blank")}
                    className="flex-1 text-sm text-gray-700 border border-gray-200 rounded py-2 hover:bg-gray-50 transition"
                  >
                    Source Code
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects */}
        <div className="text-center mt-12 animate-fade-up">
          <button
            onClick={() =>
              window.open("https://github.com/ItishaJain123", "_blank")
            }
            className="border border-blue-600 text-blue-600 px-8 py-3 text-sm rounded hover:bg-blue-50 transition"
          >
            View All Projects on GitHub →
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
