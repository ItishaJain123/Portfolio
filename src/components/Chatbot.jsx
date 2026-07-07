import { useState, useRef, useEffect, useCallback } from "react";
import { X, Send, Sparkles } from "lucide-react";
import { model, RESUME_CONTEXT } from "../lib/gemini";

// Sections Nova is allowed to navigate to, and the phrasing of a proactive
// offer shown when the visitor scrolls into that section (chat closed).
const SECTION_NUDGES = {
  experience: "Curious how I architected the Eazy Cockpit ERP frontend? Ask me. 💼",
  skills: "Want a quick tour of my frontend & GenAI stack? I'll walk you through it. ⚡",
  projects: "Want me to explain how I built the RAG pipeline in MedDocAI? 🚀",
  contact: "Looking to hire or collaborate? I can point you the right way. 📬",
};
const VALID_SECTIONS = ["home", "experience", "about", "skills", "projects", "recommendations", "job-match", "contact"];

const SYSTEM_PROMPT = `
You are Nova — Itisha Jain's personal AI assistant, embedded in her portfolio website. You're witty, warm, confident and concise. Your job is to impress recruiters, collaborators, and fellow developers.

Everything you know about Itisha:
${RESUME_CONTEXT}

== RESPONSE RULES ==
- Use light markdown (bold, bullets) when helpful. Keep replies under 150 words unless a detailed question clearly warrants more.
- Never invent facts not present above. If you don't know, suggest contacting Itisha directly.
- If a recruiter seems interested, nudge them toward the "Hire Me" button or her email (jainitisha192@gmail.com).
- If asked about availability: she's open to full-time roles and exciting freelance projects.

== UI CONTROL (IMPORTANT) ==
You control this website. When your answer relates to a specific section of the portfolio, append a directive on its OWN LAST LINE in this exact format:
[[GOTO:section]]
where section is one of: home, experience, about, skills, projects, recommendations, job-match, contact.
This scrolls the visitor to that section and highlights it live. Use it whenever relevant — e.g. a question about projects ends with [[GOTO:projects]], about her React work or job ends with [[GOTO:experience]], about her stack ends with [[GOTO:skills]], hiring/contact ends with [[GOTO:contact]]. If a recruiter asks whether she fits a role or job, point them to the AI job-fit tool with [[GOTO:job-match]]. Only include ONE directive, and only when a section is genuinely relevant. Never mention the directive in your prose.

== SPECIAL RESPONSES ==
Greeting: "Hi there! 👋 I'm Nova, Itisha's AI assistant. Ask me anything — I can even walk you through her work and highlight it as we go. ✨"
Best friend: "That would be Aman Khushalani ❤️ — her biggest cheerleader!"
`.trim();

const SUGGESTIONS = [
  ["🧑‍💻", "Who is Itisha?"],
  ["⚡", "Is she good with React?"],
  ["🚀", "Show me her projects"],
  ["🏆", "Achievements"],
  ["💼", "Work experience"],
  ["📬", "How to contact?"],
];

// Scroll to a section and pulse a spotlight ring around it.
function spotlightSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  el.classList.remove("nova-highlight");
  // reflow so the animation can retrigger if the same section is targeted twice
  void el.offsetWidth;
  el.classList.add("nova-highlight");
  setTimeout(() => el.classList.remove("nova-highlight"), 2600);
}

const TypingIndicator = () => (
  <div className="flex items-end gap-2">
    <span className="w-7 h-7 flex-shrink-0 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-sm shadow">
      🤖
    </span>
    <div className="bg-[#1a2535] px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1.5 items-center">
      <span className="typing-dot w-2 h-2 bg-blue-400 rounded-full" style={{ animationDelay: "0s" }} />
      <span className="typing-dot w-2 h-2 bg-blue-400 rounded-full" style={{ animationDelay: "0.2s" }} />
      <span className="typing-dot w-2 h-2 bg-blue-400 rounded-full" style={{ animationDelay: "0.4s" }} />
    </div>
  </div>
);

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState("en"); // "en" | "hi"
  const [messages, setMessages] = useState([
    {
      role: "model",
      content:
        "Hi there! 👋 I'm **Nova**, Itisha's AI assistant.\n\nAsk me anything about her skills, projects, or experience — I can even walk you through the page and highlight her work as we go. ✨",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");
  const [unread, setUnread] = useState(0);
  const [nudge, setNudge] = useState(null); // { section, text }
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const chatbotRef = useRef(null);
  const nudgedSections = useRef(new Set());

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) {
      setUnread(0);
      setNudge(null);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && chatbotRef.current && !chatbotRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Proactive nudges: when the visitor scrolls into a key section with the chat
  // closed, Nova offers to help — once per section per session.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (
            entry.isIntersecting &&
            SECTION_NUDGES[id] &&
            !nudgedSections.current.has(id)
          ) {
            nudgedSections.current.add(id);
            if (!isOpen) setNudge({ section: id, text: SECTION_NUDGES[id] });
          }
        });
      },
      { threshold: 0.4 }
    );
    Object.keys(SECTION_NUDGES).forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isOpen]);

  // Auto-dismiss a nudge after a while so it never lingers.
  useEffect(() => {
    if (!nudge) return;
    const t = setTimeout(() => setNudge(null), 9000);
    return () => clearTimeout(t);
  }, [nudge]);

  // Pull a [[GOTO:section]] directive off the reply, act on it, return clean text.
  const handleDirective = useCallback((reply) => {
    const match = reply.match(/\[\[GOTO:\s*([a-z]+)\s*\]\]/i);
    let clean = reply.replace(/\[\[GOTO:[^\]]*\]\]/gi, "").trim();
    if (match) {
      const section = match[1].toLowerCase();
      if (VALID_SECTIONS.includes(section)) {
        // slight delay so the message renders before we scroll away
        setTimeout(() => spotlightSection(section), 350);
      }
    }
    return clean;
  }, []);

  const sendToGemini = async (userText) => {
    setIsLoading(true);
    try {
      const history = messages
        .map((m) => `${m.role === "user" ? "User" : "Nova"}: ${m.content}`)
        .join("\n");
      const langInstruction =
        lang === "hi"
          ? "\n\n== LANGUAGE ==\nReply in conversational Hindi (Devanagari script). Keep technical terms, tool names, and proper nouns (React, Next.js, RAG, Eazy ERP, etc.) in English. Still include the [[GOTO:section]] directive when relevant."
          : "";
      const fullPrompt = `${SYSTEM_PROMPT}${langInstruction}\n\n== CONVERSATION ==\n${history}\nUser: ${userText}\nNova:`;
      const result = await model.generateContent(fullPrompt);
      const raw = result.response.text()?.trim() || "I didn't catch that — could you rephrase?";
      const reply = handleDirective(raw);
      setMessages((prev) => [...prev, { role: "model", content: reply }]);
      if (!isOpen) setUnread((n) => n + 1);
    } catch (err) {
      console.error("Gemini error:", err?.message || String(err));
      setMessages((prev) => [
        ...prev,
        { role: "model", content: "Oops, I hit a snag! Try again in a moment. 🙏" },
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

  const acceptNudge = () => {
    const question = nudge?.text;
    setNudge(null);
    setIsOpen(true);
    // Ask Nova the thing it just offered.
    setTimeout(() => handleSend(question), 250);
  };

  const renderContent = (text) =>
    text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br/>");

  return (
    <>
      {/* Proactive nudge bubble (chat closed) */}
      {nudge && !isOpen && (
        <div className="fixed bottom-24 right-5 z-50 max-w-[16rem] nova-nudge">
          <div className="relative bg-[#0d1117] border border-blue-500/40 text-slate-100 rounded-2xl rounded-br-sm shadow-2xl p-3.5">
            <button
              onClick={() => setNudge(null)}
              className="absolute -top-2 -right-2 w-5 h-5 bg-[#1a2535] border border-[#2a3a4a] rounded-full flex items-center justify-center text-slate-400 hover:text-white"
              aria-label="Dismiss"
            >
              <X className="w-3 h-3" />
            </button>
            <div className="flex items-start gap-2">
              <span className="text-lg leading-none">🤖</span>
              <p className="text-xs leading-relaxed">{nudge.text}</p>
            </div>
            <button
              onClick={acceptNudge}
              className="mt-2.5 w-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold py-1.5 rounded-lg transition"
            >
              Yes, show me →
            </button>
          </div>
        </div>
      )}

      {/* FAB */}
      <div className="fixed bottom-5 right-5 z-50">
        <button
          onClick={() => setIsOpen((o) => !o)}
          className="relative bg-gradient-to-br from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-xl hover:scale-110 transition-all duration-200 focus:outline-none"
          aria-label="Open Nova chat"
        >
          {isOpen ? <X className="w-6 h-6" /> : <span className="text-2xl">💬</span>}
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
              <p className="font-semibold text-white text-sm leading-tight">Nova</p>
              <p className="text-xs text-green-400">Online · Itisha's AI guide</p>
            </div>

            {/* Language toggle */}
            <div className="ml-auto flex items-center rounded-full bg-[#1a2535] border border-[#2a3a4a] p-0.5 text-xs font-semibold">
              <button
                onClick={() => setLang("en")}
                className={`px-2 py-0.5 rounded-full transition ${
                  lang === "en" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
                }`}
                aria-pressed={lang === "en"}
              >
                EN
              </button>
              <button
                onClick={() => setLang("hi")}
                className={`px-2 py-0.5 rounded-full transition ${
                  lang === "hi" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
                }`}
                aria-pressed={lang === "hi"}
              >
                हिं
              </button>
            </div>

            <button
              className="text-slate-400 hover:text-white transition p-1 rounded-lg hover:bg-white/10"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
            style={{ scrollbarWidth: "thin", scrollbarColor: "#1e2a3a transparent" }}
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
                  dangerouslySetInnerHTML={{ __html: renderContent(msg.content) }}
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
              {isLoading ? <Sparkles className="w-4 h-4 animate-pulse" /> : <Send className="w-4 h-4" />}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;
