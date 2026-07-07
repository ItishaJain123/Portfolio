import { lazy, Suspense } from "react";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";

// Everything below the fold is code-split so the initial load only ships the
// nav + hero. Slashes first-load JS, main-thread work, and Total Blocking Time.
const Experience = lazy(() => import("./components/Experience"));
const About = lazy(() => import("./components/About"));
const Skills = lazy(() => import("./components/Skills"));
const Projects = lazy(() => import("./components/Projects"));
const Recommendations = lazy(() => import("./components/Recommendations"));
const JobMatch = lazy(() => import("./components/JobMatch"));
const GithubActivity = lazy(() => import("./components/GithubActivity"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));
const Chatbot = lazy(() => import("./components/Chatbot"));
const KonamiEasterEgg = lazy(() => import("./components/KonamiEasterEgg"));

const App = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <Suspense fallback={null}>
        <Experience />
        <About />
        <Skills />
        <Projects />
        <GithubActivity />
        <Recommendations />
        <JobMatch />
        <Contact />
        <Footer />
        <Chatbot />
        <KonamiEasterEgg />
      </Suspense>
    </div>
  );
};

export default App;
