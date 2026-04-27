import { useState } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { projects } from "../data/projects";

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState(null);
  useScrollAnimation();

  return (
    <section id="projects" className="py-10 bg-white transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800">Featured Projects</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-2 mb-6 rounded-full"></div>
          <p className="max-w-2xl mx-auto text-gray-600">
            A showcase of my recent work, demonstrating proficiency in modern web technologies and
            user-centered design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden relative transition transform duration-300 animate-scale-in hover:scale-[1.02]"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-blue-600"></div>

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

              <div className="p-6">
                <h3 className="text-lg font-bold text-slate-800 hover:text-blue-600 transition duration-300">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{project.description}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs bg-blue-50 text-blue-600 border border-blue-200 px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

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

        <div className="text-center mt-12 animate-fade-up">
          <button
            onClick={() => window.open("https://github.com/ItishaJain123", "_blank")}
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
