import { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { X, Send, Sparkles } from "lucide-react";

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY?.trim(),
);
const model = genAI.getGenerativeModel({
  model: "gemini-3.1-flash-lite-preview",
});

const SYSTEM_PROMPT = `
You are Nova — Itisha Jain's personal AI assistant on her portfolio website. You're witty, warm, and extremely knowledgeable about Itisha. Your job is to impress recruiters, collaborators, and fellow developers who visit the portfolio.

Personality: Friendly, concise, confident. Use light formatting (bullet points, bold) when helpful. Keep replies focused — no fluff.

== ABOUT ITISHA ==
Full Stack Software Developer & GenAI Engineer, 2+ years experience.
Currently at Eazy ERP as Software Developer — built enterprise-grade Eazy Cockpit platform.

Key achievements at Eazy ERP:
• Engineered RBAC system → 30% reduction in unauthorized access
• Built data-heavy React dashboards → 70% boost in user engagement
• GitHub Actions CI/CD pipelines → 40% faster release cycles
• Reusable component library adopted across 3 product teams
• End-to-end delivery across 6 enterprise modules

== TECH STACK ==
GenAI/AI: LangChain, Google Gemini, RAG pipelines, Pinecone, Prompt Engineering
Frontend: React 19, Next.js 15, TypeScript, Tailwind CSS, ShadcnUI, Redux, GSAP
Backend: Node.js, Express 5, REST APIs, Clerk Auth, JWT
Databases: PostgreSQL + Prisma ORM, MySQL, MongoDB, Firebase
DevOps: GitHub Actions, Vercel, Docker basics

== PROJECTS ==
1. MedDoc-AI (2026) — RAG-based medical document assistant. LangChain + Google Gemini for PDF ingestion, Q&A, and health metric extraction. Full stack GenAI application.
2. Mentai (2025) — AI career platform with industry insights, quiz generation, tailored resumes & cover letters. Built with Next.js 15, ShadcnUI, Clerk, Inngest.
3. Outfit Organizer (2025) — Production React + Redux wardrobe app with occasion-based recommendations and multi-criteria filters.
4. Expense Tracker (2025) — Responsive finance dashboard with real-time income/expense tracking, Firebase backend, Recharts visualizations.

== EDUCATION ==
BTech Computer Science — Prestige Institute (RGPV, Bhopal), 2023
CGPA: 9.10 | Top 2% of batch

== ACHIEVEMENTS ==
• Top 2% of BTech batch
• ₹1.05 lakh scholarship recipient
• 1 of 20 students selected (from 1800+) to attend G20 Summit 2023
• Secretary General, PMUN — led 10+ committees, 150+ delegates
• Placement Coordinator — managed 300+ placements, ₹90 lakh budget
• Hosted 10+ college fests engaging 1500+ attendees

== CONTACT ==
Email: jainitisha192@gmail.com
LinkedIn: linkedin.com/in/itisha-jain
GitHub: github.com/ItishaJain123

== RESPONSE RULES ==
- If asked "who are you" or about Nova: explain you're Itisha's AI assistant
- If asked about Itisha's availability: she's open to full-time roles and exciting freelance projects
- If asked something you don't know about Itisha: suggest they contact her directly
- Keep replies under 150 words unless a detailed question warrants more
- Never make up facts not listed above
- If a recruiter seems interested, nudge them toward the "Hire Me" button or her email

== SPECIAL RESPONSES ==
Greeting (Hi/Hello/Hey): "Hi there! 👋 I'm Nova, Itisha's AI assistant. Ask me anything about her skills, projects, experience, or achievements — I'm here to help! ✨"
Best friend: "That would be Aman Khushalani ❤️ — her biggest cheerleader!"
`.trim();

const SUGGESTIONS = [
  ["🧑‍💻", "Who is Itisha?"],
  ["⚡", "Her tech stack"],
  ["🚀", "Featured projects"],
  ["🏆", "Achievements"],
  ["💼", "Work experience"],
  ["📬", "How to contact?"],
];

const TypingIndicator = () => (
  <div className="flex items-end gap-2">
    <span className="w-7 h-7 flex-shrink-0 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-sm shadow">
      🤖
    </span>
    <div className="bg-[#1a2535] px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1.5 items-center">
      <span
        className="typing-dot w-2 h-2 bg-blue-400 rounded-full"
        style={{ animationDelay: "0s" }}
      />
      <span
        className="typing-dot w-2 h-2 bg-blue-400 rounded-full"
        style={{ animationDelay: "0.2s" }}
      />
      <span
        className="typing-dot w-2 h-2 bg-blue-400 rounded-full"
        style={{ animationDelay: "0.4s" }}
      />
    </div>
  </div>
);

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "model",
      content:
        "Hi there! 👋 I'm **Nova**, Itisha's AI assistant.\n\nAsk me anything about her skills, projects, work experience, or achievements. I'm here to help! ✨",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");
  const [unread, setUnread] = useState(0);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const chatbotRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isOpen &&
        chatbotRef.current &&
        !chatbotRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const sendToGemini = async (userText) => {
    setIsLoading(true);
    try {
      const history = messages
        .map((m) => `${m.role === "user" ? "User" : "Nova"}: ${m.content}`)
        .join("\n");
      const fullPrompt = `${SYSTEM_PROMPT}\n\n== CONVERSATION ==\n${history}\nUser: ${userText}\nNova:`;
      const result = await model.generateContent(fullPrompt);
      const reply =
        result.response.text()?.trim() ||
        "I didn't catch that — could you rephrase?";
      setMessages((prev) => [...prev, { role: "model", content: reply }]);
      if (!isOpen) setUnread((n) => n + 1);
    } catch (err) {
      const errMsg = err?.message || String(err);
      console.error("Gemini error:", errMsg);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          content: "Oops, I hit a snag! Try again in a moment. 🙏",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async (text) => {
    const finalText = (text || input).trim();
    if (!finalText || isLoading) return;
    setMessages((prev) => [...prev, { role: "user", content: finalText }]);
    setInput("");
    await sendToGemini(finalText);
  };

  const renderContent = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br/>");
  };

  return (
    <>
      {/* FAB */}
      <div className="fixed bottom-5 right-5 z-50">
        <button
          onClick={() => setIsOpen((o) => !o)}
          className="relative bg-gradient-to-br from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-xl hover:scale-110 transition-all duration-200 focus:outline-none"
          aria-label="Open Nova chat"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <span className="text-2xl">💬</span>
          )}
          {!isOpen && unread > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {unread}
            </span>
          )}
        </button>
      </div>

      {/* Chat window */}
      {isOpen && (
        <div
          ref={chatbotRef}
          className="fixed bottom-24 right-5 z-50 bg-[#0d1117] border border-[#1e2a3a] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          style={{
            width: "min(22rem, calc(100vw - 2.5rem))",
            height: "min(560px, calc(100vh - 7rem))",
          }}
          role="dialog"
          aria-modal="true"
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[#0d1117] to-[#111827] border-b border-[#1e2a3a] flex-shrink-0">
            <div className="relative">
              <span className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-base shadow flex-shrink-0">
                🤖
              </span>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-[#0d1117]" />
            </div>
            <div>
              <p className="font-semibold text-white text-sm leading-tight">
                Nova
              </p>
              <p className="text-xs text-green-400">
                Online · Itisha's AI assistant
              </p>
            </div>
            <button
              className="ml-auto text-slate-400 hover:text-white transition p-1 rounded-lg hover:bg-white/10"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#1e2a3a transparent",
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex items-end gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "model" && (
                  <span className="w-7 h-7 flex-shrink-0 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-sm shadow">
                    🤖
                  </span>
                )}
                <div
                  className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white rounded-br-sm"
                      : "bg-[#1a2535] text-gray-100 rounded-bl-sm"
                  }`}
                  dangerouslySetInnerHTML={{
                    __html: renderContent(msg.content),
                  }}
                />
              </div>
            ))}
            {isLoading && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestion chips */}
          {!isLoading && (
            <div
              className="px-3 py-2 flex gap-2 overflow-x-auto border-t border-[#1e2a3a] bg-[#0d1117] flex-shrink-0"
              style={{ scrollbarWidth: "thin", scrollbarColor: "#1e2a3a transparent" }}
            >
              {SUGGESTIONS.map(([icon, text]) => (
                <button
                  key={text}
                  onClick={() => handleSend(text)}
                  disabled={isLoading}
                  className="flex-shrink-0 flex items-center gap-1.5 border border-blue-500/40 text-blue-300 rounded-full px-3 py-1.5 text-xs font-medium hover:bg-blue-600/20 hover:border-blue-400 transition disabled:opacity-40 whitespace-nowrap"
                >
                  <span>{icon}</span>
                  <span>{text}</span>
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form
            className="flex items-center gap-2 px-3 py-3 bg-[#0d1117] border-t border-[#1e2a3a] flex-shrink-0"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Ask me about Itisha..."
              className="flex-1 px-4 py-2.5 rounded-full bg-[#1a2535] text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 border border-[#2a3a4a]"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={400}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white w-10 h-10 rounded-full flex items-center justify-center transition flex-shrink-0"
              aria-label="Send"
            >
              {isLoading ? (
                <Sparkles className="w-4 h-4 animate-pulse" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;
