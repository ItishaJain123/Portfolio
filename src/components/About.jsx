import { Code, Palette, Users, Trophy } from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { achievements, strengths } from "../data/about";
import AudioIntro from "./AudioIntro";

const ICON_MAP = { Code, Palette, Users, Trophy };

const Card = ({ children, className }) => (
  <div className={`p-6 rounded-xl border bg-white shadow-md ${className}`}>{children}</div>
);

const About = () => {
  useScrollAnimation();

  return (
    <section id="about" className="py-10 bg-white relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 animate-fade-up">
          <h2 className="text-4xl font-bold text-gray-900">About Me</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto my-4 rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A passionate software developer dedicated to creating exceptional digital experiences
          </p>
        </div>

        <div className="mb-12 max-w-2xl mx-auto animate-fade-up">
          <AudioIntro />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8 animate-slide-in-left">
            <div>
              <h3 className="text-2xl font-bold text-black mb-2">Passionate About Technology</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                I'm a dedicated software developer with a strong foundation in modern web
                technologies. My journey in programming has been driven by curiosity and a desire to
                solve real-world problems through innovative digital solutions.
              </p>
              <p className="text-gray-700 leading-relaxed">
                With expertise in React.js, TypeScript, and various modern frameworks, I focus on
                creating responsive, user-friendly applications that deliver exceptional user
                experiences. I believe in writing clean, maintainable code and staying updated with
                the latest industry trends.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-black mb-4">What I Bring to the Table:</h4>
              <ul className="space-y-3 text-gray-700">
                {strengths.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fade-up">
            {achievements.map((achievement, index) => {
              const Icon = ICON_MAP[achievement.iconName];
              return (
                <Card
                  key={index}
                  className="text-center hover:shadow-xl hover:scale-105 transform transition-all duration-300"
                >
                  <div className="flex justify-center mb-3">
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                  </div>
                  <h4 className="text-base font-semibold text-black mb-1">{achievement.title}</h4>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
