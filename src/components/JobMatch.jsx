import { useState } from "react";
import { Target, Sparkles, CheckCircle2, AlertCircle, XCircle, RotateCcw } from "lucide-react";
import { model, RESUME_CONTEXT } from "../lib/gemini";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const STATUS_STYLE = {
  strong: {
    icon: <CheckCircle2 className="w-4 h-4" />,
    color: "text-emerald-700",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    dot: "bg-emerald-500",
    label: "Strong",
  },
  partial: {
    icon: <AlertCircle className="w-4 h-4" />,
    color: "text-amber-700",
    bg: "bg-amber-50",
    border: "border-amber-200",
    dot: "bg-amber-500",
    label: "Partial",
  },
  gap: {
    icon: <XCircle className="w-4 h-4" />,
    color: "text-slate-500",
    bg: "bg-slate-50",
    border: "border-slate-200",
    dot: "bg-slate-400",
    label: "Not listed",
  },
};

// Pull a JSON object out of a model reply that might be fenced or padded.
function parseResult(text) {
  const cleaned = text.replace(/```json/gi, "").replace(/```/g, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1) return null;
  try {
    return JSON.parse(cleaned.slice(start, end + 1));
  } catch {
    return null;
  }
}

const scoreColor = (n) =>
  n >= 75 ? "#059669" : n >= 50 ? "#d97706" : "#dc2626";

const JobMatch = () => {
  useScrollAnimation();
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const analyze = async (e) => {
    e?.preventDefault();
    const text = jd.trim();
    if (text.length < 30 || loading) {
      if (text.length < 30) setError("Paste a bit more of the job description for an accurate read.");
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const prompt = `${RESUME_CONTEXT}

You are an impartial technical recruiter assessing how well Itisha Jain fits a role.
Here is the job description:
"""
${text}
"""

Compare the role's requirements against Itisha's background above. Respond with ONLY a JSON object (no markdown, no prose) in this exact shape:
{
  "score": <integer 0-100 overall fit>,
  "verdict": "<one short phrase, e.g. 'Strong match'>",
  "summary": "<2 sentences, honest and specific, addressed to the recruiter>",
  "matches": [
    { "skill": "<requirement from the JD>", "status": "strong|partial|gap", "note": "<max 8 words>" }
  ]
}
Rules: include 5-8 of the most important requirements in "matches". Use "strong" when Itisha clearly has it, "partial" when related/adjacent, "gap" when absent from her background. Be honest — do not claim skills she doesn't have.`;
      const res = await model.generateContent(prompt);
      const parsed = parseResult(res.response.text() || "");
      if (parsed && Array.isArray(parsed.matches)) {
        parsed.score = Math.max(0, Math.min(100, Number(parsed.score) || 0));
        setResult(parsed);
      } else {
        setError("Couldn't analyze that — try pasting the description again.");
      }
    } catch (err) {
      console.error("Job match error:", err?.message || String(err));
      setError("Hit a snag analyzing that. Try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setJd("");
    setError("");
  };

  return (
    <section id="job-match" className="py-16 bg-slate-50 relative overflow-hidden transition-colors duration-300">
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle, #2563EB18 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-up">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-[#2563EB] bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full mb-4">
            <Sparkles className="w-3 h-3" /> For Recruiters
          </span>
          <h2 className="text-4xl font-bold text-slate-900 mb-2">Is Itisha a fit for your role?</h2>
          <div className="w-24 h-1 bg-[#2563EB] mx-auto mb-4 rounded-full" />
          <p className="max-w-xl mx-auto text-slate-500">
            Paste your job description and my AI will give you an honest, requirement-by-requirement match breakdown in seconds.
          </p>
        </div>

        {/* Input */}
        {!result && (
          <form onSubmit={analyze} className="animate-fade-up">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3 text-slate-700">
                <Target className="w-4 h-4 text-[#2563EB]" />
                <span className="text-sm font-semibold">Paste the job description</span>
              </div>
              <textarea
                value={jd}
                onChange={(e) => setJd(e.target.value)}
                rows={7}
                placeholder="e.g. We're hiring a Senior Frontend Engineer with strong React, TypeScript, performance optimization, and design system experience…"
                className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
              <div className="mt-3 flex items-center justify-between gap-3">
                <span className="text-xs text-slate-400">{jd.trim().length} characters</span>
                <button
                  type="submit"
                  disabled={loading || jd.trim().length < 30}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#2563EB] px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-pulse" /> Analyzing…
                    </>
                  ) : (
                    <>
                      <Target className="w-4 h-4" /> Check the fit
                    </>
                  )}
                </button>
              </div>
              {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
            </div>
          </form>
        )}

        {/* Result */}
        {result && (
          <div className="rounded-2xl border border-slate-200 bg-white shadow-lg overflow-hidden animate-scale-in in-view">
            {/* Score header */}
            <div className="flex items-center gap-5 p-6 border-b border-slate-100 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="relative flex-shrink-0">
                <svg width="76" height="76" viewBox="0 0 76 76" className="-rotate-90">
                  <circle cx="38" cy="38" r="32" fill="none" stroke="#e2e8f0" strokeWidth="7" />
                  <circle
                    cx="38"
                    cy="38"
                    r="32"
                    fill="none"
                    stroke={scoreColor(result.score)}
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 32}
                    strokeDashoffset={2 * Math.PI * 32 * (1 - result.score / 100)}
                    style={{ transition: "stroke-dashoffset 0.9s ease-out" }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-extrabold" style={{ color: scoreColor(result.score) }}>
                    {result.score}%
                  </span>
                </div>
              </div>
              <div>
                <p className="text-lg font-bold text-slate-900">{result.verdict || "Match assessed"}</p>
                <p className="text-sm text-slate-600 leading-relaxed mt-0.5">{result.summary}</p>
              </div>
            </div>

            {/* Requirement breakdown */}
            <div className="p-6 space-y-2.5">
              {result.matches.map((m, i) => {
                const s = STATUS_STYLE[m.status] ?? STATUS_STYLE.partial;
                return (
                  <div
                    key={i}
                    className={`flex items-center gap-3 rounded-xl border ${s.border} ${s.bg} px-4 py-2.5`}
                  >
                    <span className={s.color}>{s.icon}</span>
                    <span className="flex-1 text-sm font-medium text-slate-800">{m.skill}</span>
                    {m.note && <span className="hidden sm:inline text-xs text-slate-500">{m.note}</span>}
                    <span className={`text-xs font-semibold ${s.color} flex items-center gap-1.5`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Footer actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 px-6 pb-6">
              <a
                href="#contact"
                className="w-full sm:w-auto text-center rounded-xl bg-[#2563EB] px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700"
              >
                Reach out to Itisha →
              </a>
              <button
                onClick={reset}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-[#2563EB] transition"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Try another role
              </button>
            </div>
            <p className="px-6 pb-5 -mt-2 text-[11px] text-slate-400">
              AI-generated estimate based on Itisha's resume — a starting point, not a substitute for a conversation.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default JobMatch;
