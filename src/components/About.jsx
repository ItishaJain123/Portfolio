import { useEffect } from "react";
import { Code, Palette, Users, Trophy } from "lucide-react";
import AudioIntro from "./AudioIntro";

const Card = ({ children, className }) => (
  <div className={`p-6 rounded-xl border bg-white shadow-md ${className}`}>
    {children}
  </div>
);

const About = () => {
  const achievements = [
    {
      icon: <Code className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />,
      title: "Clean Code",
      description: "Writing maintainable and scalable code",
    },
    {
      icon: <Palette className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />,
      title: "UI/UX Design",
      description: "Creating intuitive user experiences",
    },
    {
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />,
      title: "Team Work",
      description: "Collaborating effectively with teams",
    },
    {
      icon: <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />,
      title: "Problem Solving",
      description: "Finding innovative solutions",
    },
  ];

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
      ".animate-fade-up, .animate-slide-in-left"
    );
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-10 bg-white relative overflow-hidden">
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: none; }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: none; }
        }
        .animate-fade-up {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease-out;
        }
        .animate-slide-in-left {
          opacity: 0;
          transform: translateX(-30px);
          transition: all 0.8s ease-out;
        }
        .in-view {
          opacity: 1 !important;
          transform: none !important;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12 sm:mb-16 animate-fade-up">
          <h2 className="text-4xl font-bold text-gray-900">About Me</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto my-4 rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A passionate software developer dedicated to creating exceptional
            digital experiences
          </p>
        </div>

        {/* Audio Intro */}
        <div className="mb-12 max-w-2xl mx-auto animate-fade-up">
          <AudioIntro />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Text Section */}
          <div className="space-y-8 animate-slide-in-left">
            <div>
              <h3 className="text-2xl font-bold text-black mb-2">
                Passionate About Technology
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                I'm a dedicated software developer with a strong foundation in
                modern web technologies. My journey in programming has been
                driven by curiosity and a desire to solve real-world problems
                through innovative digital solutions.
              </p>
              <p className="text-gray-700 leading-relaxed">
                With expertise in React.js, TypeScript, and various modern
                frameworks, I focus on creating responsive, user-friendly
                applications that deliver exceptional user experiences. I
                believe in writing clean, maintainable code and staying updated
                with the latest industry trends.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-black mb-4">
                What I Bring to the Table:
              </h4>
              <ul className="space-y-3 text-gray-700">
                {[
                  "Strong problem-solving skills and attention to detail",
                  "Ability to work independently and in collaborative environments",
                  "Continuous learning mindset and adaptability to new technologies",
                  "Commitment to delivering high-quality, scalable solutions",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Achievements Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fade-up">
            {achievements.map((achievement, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-xl hover:scale-105 transform transition-all duration-300"
              >
                <div className="flex justify-center mb-3">
                  {achievement.icon}
                </div>
                <h4 className="text-base font-semibold text-black mb-1">
                  {achievement.title}
                </h4>
                <p className="text-sm text-gray-600">
                  {achievement.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
