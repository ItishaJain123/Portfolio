import { useState, useEffect } from "react";
import { Mail, Linkedin, Github, MapPin, Phone } from "lucide-react";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    fetch("https://formsubmit.co/ajax/jainitisha192@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: form.name.value,
        email: form.email.value,
        subject: form.subject.value,
        message: form.message.value,
      }),
    })
      .then((res) => {
        if (res.ok) {
          setSubmitted(true);
          form.reset();
          setTimeout(() => setSubmitted(false), 4000);
        }
      })
      .catch((err) => console.error(err));
  };

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

  return (
    <section id="contact" className="py-10 bg-white text-slate-800 relative">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl font-bold text-slate-900">Contact</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 mb-6 rounded-full"></div>
          <p className="max-w-xl mx-auto text-slate-600 text-lg">
            Let’s build something amazing together. Reach out for collaboration
            or project inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-6 animate-fade-up">
            <h3 className="text-2xl font-semibold text-blue-700 mb-4">
              Get In Touch
            </h3>
            <p className="text-slate-600 mb-6">
              I’m open to freelance opportunities and collaborations. Feel free
              to contact me via the form or social platforms.
            </p>

            <div className="space-y-5">
              {[
                {
                  icon: <MapPin className="w-5 h-5" />,
                  title: "Location",
                  value: "India",
                },
                {
                  icon: <Phone className="w-5 h-5" />,
                  title: "Phone",
                  value: "+91 8619695078",
                },
                {
                  icon: <Mail className="w-5 h-5" />,
                  title: "Email",
                  value: "jainitisha192@gmail.com",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start space-x-4 p-4 bg-blue-50 border border-blue-100 rounded-lg shadow hover:shadow-blue-200 hover:scale-105 transition-all duration-300"
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-700 rounded-md">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-medium">{item.title}</h4>
                    <p className="text-sm text-slate-600 break-all">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 pt-6">
              <a
                href="https://www.linkedin.com/in/itisha-jain/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center justify-center transition-transform hover:scale-110"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/ItishaJain123"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 hover:bg-slate-900 text-white rounded-md flex items-center justify-center transition-transform hover:scale-110"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl shadow-lg p-8 relative animate-scale-in">
            <h3 className="text-2xl font-semibold text-blue-700 mb-6">
              Send a Message
            </h3>

            {submitted && (
              <div className="absolute top-4 right-4 bg-green-100 border border-green-400 text-green-800 px-4 py-2 rounded shadow animate-bounce">
                🎉 Message Sent Successfully!
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your Name"
                  className="w-full px-4 py-2 rounded-md border border-blue-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Your Email"
                  className="w-full px-4 py-2 rounded-md border border-blue-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <input
                type="text"
                name="subject"
                required
                placeholder="Subject"
                className="w-full px-4 py-2 rounded-md border border-blue-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />

              <textarea
                name="message"
                rows="5"
                required
                placeholder="Your Message"
                className="w-full px-4 py-2 rounded-md border border-blue-200 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-y"
              ></textarea>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md hover:shadow-lg transition-transform hover:scale-105"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
