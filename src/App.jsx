import About from "./components/About";
import Hero from "./components/Hero";
import Navigation from "./components/Navigation";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Recommendations from "./components/Recommendations";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";

const App = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Experience />
      <About />
      <Skills />
      <Projects />
      <Recommendations />
      <Contact />
      <Footer />

      <Chatbot />
    </div>
  );
};

export default App;
