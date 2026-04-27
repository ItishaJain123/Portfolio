import { useState, useEffect, useRef } from "react";
import {
  X,
  Mail,
  Linkedin,
  Github,
  Download,
  Loader2,
  Sparkles,
} from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY?.trim(),
);
const model = genAI.getGenerativeModel({
  model: "gemini-3.1-flash-lite-preview",
});

const analyzerPrompt = (jd) => `
You are a helpful recruiter assistant.

STEP 1 — VALIDATE INPUT:
Look at the text under "Job Description:" below. If it is NOT a real job description (e.g., it is random characters, gibberish, a single word, a sentence unrelated to a job, or too short/vague to analyse), respond with EXACTLY this one line and nothing else:
❌ This doesn't look like a job description. Please paste a real job posting to get an accurate analysis.

STEP 2 — ANALYSE (only if input is a valid job description):
Analyse how well Itisha Jain fits the role using the profile below.

Itisha's Profile:
- Full Stack Software Developer, 2+ years experience at Eazy ERP
- Skills: React 19, Next.js, TypeScript, Node.js, Express 5, PostgreSQL, Prisma ORM, LangChain, Google Gemini, RAG, Pinecone, Redux, Tailwind CSS, ShadcnUI, GitHub Actions CI/CD, Firebase, MySQL, MongoDB
- Built RBAC (30% less unauthorized access), React dashboards (70% engagement boost), CI/CD pipelines (40% faster releases), reusable component library across 3 teams
- Projects: MedDoc-AI (RAG + LangChain + Gemini), Mentai (AI career platform, Next.js), Outfit Organizer (React + Redux), Expense Tracker (Firebase + Recharts)
- Education: BTech CS, CGPA 9.10, Top 2% of batch
- Leadership: MUN Secretary General (150+ delegates), Placement Coordinator (300+ students, ₹90L budget)

Job Description:
${jd}

Respond in EXACTLY this format (use the emoji headers as written):
🎯 Match Score: X/10

✅ Strong Matches:
• point one
• point two
• point three

📈 Growth Areas:
• point one (keep it positive/constructive)

💡 Why Hire Itisha:
• compelling reason one
• compelling reason two
• compelling reason three

Keep it concise and recruiter-friendly. Be honest but highlight strengths.
`;

const HireMeModal = ({ isOpen, onClose }) => {
  const [tab, setTab] = useState("analyze");
  const [jd, setJd] = useState("");
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      setJd("");
      setResult(null);
      setError(null);
      setTab("analyze");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  const handleAnalyze = async () => {
    if (!jd.trim() || isLoading) return;

    if (/--yash\s*$/i.test(jd.trim())) {
      setResult(
        `🥚 Yash ki girlfriend hai Itisha 💙\n\nAnd she loves him the most. 🫶`,
      );
      setTab("result");
      return;
    }

    const wordCount = jd.trim().split(/\s+/).length;
    if (wordCount < 10) {
      setError(
        "Please paste a proper job description (at least a few sentences).",
      );
      return;
    }

    setIsLoading(true);
    setResult(null);
    setError(null);
    try {
      const res = await model.generateContent(analyzerPrompt(jd.trim()));
      const text = res.response.text();
      setResult(text);
      setTab("result");
    } catch (err) {
      const msg = err?.message || "";
      if (msg.includes("API_KEY") || msg.includes("403")) {
        setError(
          "API key error — please check your Gemini API key configuration.",
        );
      } else if (msg.includes("429") || msg.includes("quota")) {
        setError("Rate limit reached. Please wait a moment and try again.");
      } else {
        setError("Analysis failed. Please try again in a moment.");
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatResult = (text) => {
    if (text.startsWith("🥚")) {
      const [line1, , line2] = text.split("\n");
      return (
        <div className="text-center py-6 space-y-3">
          <p className="text-4xl">💙🥚💙</p>
          <p className="text-xl font-bold text-pink-600">
            {line1.replace("🥚 ", "")}
          </p>
          <p className="text-slate-500 text-sm">{line2}</p>
        </div>
      );
    }
    if (text.startsWith("❌"))
      return <p className="text-red-600 font-medium text-sm">{text}</p>;
    return text.split("\n").map((line, i) => {
      if (line.startsWith("🎯"))
        return (
          <p key={i} className="text-xl font-bold text-blue-600 mb-4">
            {line}
          </p>
        );
      if (
        line.startsWith("✅") ||
        line.startsWith("📈") ||
        line.startsWith("💡")
      )
        return (
          <p key={i} className="font-semibold text-slate-800 mt-4 mb-1">
            {line}
          </p>
        );
      if (line.startsWith("•"))
        return (
          <p key={i} className="text-slate-600 pl-3 text-sm leading-relaxed">
            {line}
          </p>
        );
      return line ? (
        <p key={i} className="text-slate-600 text-sm">
          {line}
        </p>
      ) : null;
    });
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Let's Work Together
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">
              See how Itisha fits your role
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-100">
          {[
            { id: "analyze", label: "🔍 Analyze My Fit" },
            { id: "contact", label: "📬 Contact Itisha" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 py-3 text-sm font-medium transition border-b-2 ${
                tab === t.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              {t.label}
            </button>
          ))}
          {result && (
            <button
              onClick={() => setTab("result")}
              className={`flex-1 py-3 text-sm font-medium transition border-b-2 ${
                tab === "result"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              ✨ Results
            </button>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {/* Analyze Tab */}
          {tab === "analyze" && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-700">
                <Sparkles className="w-4 h-4 inline mr-1.5 mb-0.5" />
                Paste a job description below and get an instant AI-powered
                analysis of how well Itisha matches the role.
              </div>
              <textarea
                rows={8}
                value={jd}
                onChange={(e) => setJd(e.target.value)}
                placeholder="Paste the job description here..."
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                onClick={handleAnalyze}
                disabled={!jd.trim() || isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" /> Analyze Fit
                  </>
                )}
              </button>
            </div>
          )}

          {/* Result Tab */}
          {tab === "result" && result && (
            <div className="space-y-1">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                {formatResult(result)}
              </div>
              <button
                onClick={() => {
                  setResult(null);
                  setJd("");
                  setTab("analyze");
                }}
                className="w-full mt-3 border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm py-2 rounded-xl transition"
              >
                Analyze another role →
              </button>
            </div>
          )}

          {/* Contact Tab */}
          {tab === "contact" && (
            <div className="space-y-5">
              <p className="text-slate-600 text-sm leading-relaxed">
                Interested in working with Itisha? Reach out directly — she
                responds quickly!
              </p>

              <div className="space-y-3">
                <a
                  href="https://mail.google.com/mail/?view=cm&to=jainitisha192@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-blue-50 border border-blue-100 rounded-xl hover:bg-blue-100 transition group"
                >
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm group-hover:text-blue-700">
                      Send an Email
                    </p>
                    <p className="text-xs text-slate-500">
                      jainitisha192@gmail.com
                    </p>
                  </div>
                </a>

                <a
                  href="https://www.linkedin.com/in/itisha-jain/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-blue-50 border border-blue-100 rounded-xl hover:bg-blue-100 transition group"
                >
                  <div className="w-10 h-10 bg-blue-700 text-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm group-hover:text-blue-700">
                      Connect on LinkedIn
                    </p>
                    <p className="text-xs text-slate-500">
                      linkedin.com/in/itisha-jain
                    </p>
                  </div>
                </a>

                <a
                  href="https://github.com/ItishaJain123"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition group"
                >
                  <div className="w-10 h-10 bg-slate-800 text-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm group-hover:text-slate-900">
                      View GitHub
                    </p>
                    <p className="text-xs text-slate-500">
                      github.com/ItishaJain123
                    </p>
                  </div>
                </a>
              </div>

              <a
                href="/Itisha_Jain_Resume.pdf"
                download
                className="flex items-center justify-center gap-2 w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 rounded-xl transition text-sm"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HireMeModal;
