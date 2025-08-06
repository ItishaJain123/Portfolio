// Chatbot.jsx
import { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini model client outside component (avoid re-initializing)
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const systemPrompt = `
You are Nova, a smart, approachable, and well-spoken AI assistant who helps people learn more about Itisha Jain – a passionate frontend developer with solid project experience, strong UI/UX focus, and great leadership skills. You're like her personal guide—ready to answer questions about her background, work, skills, projects, or achievements.

Always respond in a clear, helpful, and natural tone—as if you’re casually introducing Itisha to someone curious about her work, like a recruiter, a collaborator, or a new friend in tech.

When someone says "Hi", "Hello", etc.:
➡️ Respond: Hii! I'm Nova, Itisha's friendly chatbot 🤖. Feel free to ask me anything about her – from her projects and tech stack to her professional journey, achievements, and more. Let’s explore together! ✨

Who is Itisha Jain?
➡️ Respond: "Itisha Jain is a frontend developer with over a year of hands-on experience building clean, interactive UIs. She’s currently working at Eazy ERP in Gurgaon and holds a BTech in Computer Science from Prestige Institute (RGPV, Bhopal), where she graduated with a 9.10 CGPA. She’s passionate about making beautiful web experiences that actually feel good to use."

What tech does she usually work with?
➡️ Respond: "Itisha mostly works with React.js, JavaScript (ES6), Tailwind CSS, Firebase, and ShadCN UI. She's also comfortable with tools like Zustand, Redux, and Git."

Can you tell me about her current job?
➡️ Respond: "Sure! At Eazy ERP, she’s been driving UI improvements using React and Syncfusion. She’s led the frontend for Easy Cockpit—building a feature that supports bulk uploading of over 1000 Excel records—and helped optimize the Easy CRM interface alongside her team. She also automated several business workflows using Drona HQ, which saved a ton of manual work and improved efficiency across the board."

What projects has she built?
➡️ Respond: "She’s built some really cool stuff! Here are a few:

Expense Tracker – A finance tracking dashboard using Firebase, Google Sign-In, and Recharts with clean glassmorphic UI and dynamic filters.

Outfit Organizer – A virtual wardrobe manager built with React and Redux, allowing users to upload, preview, and analyze their outfits.

MindMapper AI (Chrome Extension) – A browser extension that turns selected website text into AI-generated mind maps and flowcharts using the Gemini API."

What’s her educational background?
➡️ Respond: "She earned her BTech in Computer Science from Prestige Institute (RGPV, Bhopal), graduating in 2023 with a strong 9.10 CGPA. Before that, she scored 83% in Class XII and a 9.2 CGPA in Class X."

Any notable achievements or recognitions?
➡️ Respond: "Definitely! Itisha was:

- Ranked in the top 2% of her BTech batch (450+ students)
- Awarded ₹1.05 lakh in scholarships and an AISSCE Merit Certificate
- One of 20 students selected from over 1800 to attend the G20 Summit 2023
- Host and anchor for 10+ college fests, engaging over 1500 attendees"

Has she taken on any leadership roles?
➡️ Respond: "Yes! She was:

- Secretary General of PMUN – led 10+ committees and organized a full-scale MUN with 150+ delegates
- Placement Coordinator – managed campus placement drives for 300+ students, coordinated with employers, and handled logistics for events with a total budget of over ₹90 lakh"

What are her interests outside of code?
➡️ Respond: "Itisha’s really into visual storytelling through UI, organizing team efforts, and bringing ideas to life with clarity. She’s also a confident speaker, loves anchoring events, and enjoys building projects that are fun to use and visually polished."

What is her best friend name?
➡️ Respond: Uska Laadla AMAN Khushalani ❤.
`;

const defaultSuggestions = [
  "Who is Itisha Jain?",
  "What tech does she usually work with?",
  "Can you tell me about her current job?",
  "What projects has she built?",
  "Any notable achievements or recognitions?",
  "What are her interests outside of code?",
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "model",
      content:
        "Hii! I'm Nova – Itisha's friendly chatbot 🤖. Feel free to ask me anything about her — from her projects and tech stack to her professional journey, achievements, and more. Let’s explore together! ✨",
    },
  ]);

  const [suggestions, setSuggestions] = useState(defaultSuggestions);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const chatbotRef = useRef(null);

  // Scroll to bottom on messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Click outside to close chat window
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        chatbotRef.current &&
        !chatbotRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSend = async (customInput) => {
    const finalInput = customInput || input.trim();
    if (!finalInput) return;

    const userMessage = { role: "user", content: finalInput };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");

    try {
      const prompt = [
        systemPrompt,
        ...newMessages.map((msg) => msg.content),
      ].join("\n\n");

      const result = await model.generateContent([prompt]);

      const reply =
        result.response.text() ||
        "Sorry, I didn't quite get that. Could you please ask again?";

      setMessages((prev) => [...prev, { role: "model", content: reply }]);
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          content:
            "Oops! There was a problem reaching the assistant. Please try again.",
        },
      ]);
    }
  };

  const handleSuggestionClick = (text) => {
    setInput(text);
    handleSend(text);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat toggle FAB */}
      <div className="fixed bottom-4 right-4 z-50 sm:bottom-8 sm:right-8">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-full p-3 sm:p-4 shadow-2xl hover:scale-110 transition duration-200 focus:outline-none border-4 border-white"
          aria-label="Open chat"
        >
          💬
        </button>
      </div>

      {/* Chat window */}
      {isOpen && (
        <div
          ref={chatbotRef}
          className={`
          fixed
          bottom-4 right-2 left-2
          w-[95vw] max-w-xs h-[70vh]
          sm:bottom-24 sm:right-8 sm:left-auto
          sm:w-[28rem] sm:max-w-[98vw] sm:h-[36rem]
          bg-white/85 backdrop-blur-xl dark:bg-gray-900/90 
          border border-blue-200 dark:border-blue-700 
          rounded-3xl shadow-2xl flex flex-col z-50 animate-fade-in
          max-h-[98vh]
        `}
          role="dialog"
          aria-modal="true"
          aria-label="Chat with Nova"
        >
          {/* Header */}
          <div className="flex items-center gap-2 p-2 sm:p-3 border-b border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/80 rounded-t-3xl">
            <span className="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-600 text-white font-bold text-base sm:text-lg shadow-lg">
              <span role="img" aria-label="Nova">
                🤖
              </span>
            </span>
            <span className="font-semibold text-blue-800 dark:text-blue-200 text-sm sm:text-base">
              Nova
            </span>
            <span className="ml-auto">
              <button
                className="hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full p-1 text-gray-500"
                aria-label="Close chat"
                onClick={() => setIsOpen(false)}
              >
                ×
              </button>
            </span>
          </div>

          {/* Main chat body: Messages (scrollable), Suggestions, Input  */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Messages area */}
            <div className="flex-1 overflow-y-auto px-2 sm:px-3 py-2 sm:py-3 space-y-3 scrollbar-thin scrollbar-thumb-blue-200 dark:scrollbar-thumb-blue-800">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`
                  flex
                  ${msg.role === "user" ? "justify-end" : "justify-start"}
                  items-end group
                `}
                >
                  {msg.role === "model" && (
                    <span className="w-5 h-5 sm:w-6 sm:h-6 mr-2 flex-shrink-0 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm sm:text-base shadow-md">
                      🤖
                    </span>
                  )}
                  <div
                    className={`
                    max-w-[78%] px-3 py-2 rounded-2xl shadow-md whitespace-pre-line text-sm sm:text-base
                    ${
                      msg.role === "user"
                        ? "ml-auto bg-blue-600 text-white rounded-br-[0.7rem]"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-blue-100 rounded-bl-[0.7rem]"
                    }
                  `}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestion chips (always visible above input) */}
            {suggestions.length > 0 && (
              <div className="px-2 sm:px-3 pb-1 flex gap-2 overflow-x-auto hide-scrollbar bg-opacity-80 bg-white dark:bg-gray-900">
                {suggestions.map((sugg, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(sugg)}
                    className="flex-shrink-0 border border-blue-600 text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-800/40 transition"
                  >
                    {sugg}
                  </button>
                ))}
              </div>
            )}

            {/* Message input */}
            <form
              className="flex items-center gap-2 px-2 sm:px-3 pb-3 pt-2 bg-white/70 dark:bg-gray-900/90 rounded-b-3xl"
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
            >
              <input
                type="text"
                aria-label="Ask Nova about Itisha Jain"
                placeholder="Ask Nova about Itisha..."
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none bg-white dark:bg-gray-800 dark:text-white shadow-inner text-sm sm:text-base"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleInputKeyDown}
                maxLength={300}
                autoFocus
              />
              <button
                type="submit"
                className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white px-4 py-2 rounded-full font-bold hover:scale-105 transition text-sm sm:text-base"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
