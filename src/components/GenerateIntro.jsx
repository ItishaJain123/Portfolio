import { useState, useRef, useEffect } from "react";
import { Sparkles, ArrowRight, RotateCcw, X } from "lucide-react";
import { model, RESUME_CONTEXT } from "../lib/gemini";

const EXAMPLES = ["Stripe · Frontend", "Vercel · DevRel", "a YC startup", "Google · SWE"];

// Reveal the generated pitch one character at a time for a live "writing" feel.
function useTypeOut(text, speed = 18) {
  const [out, setOut] = useState("");
  useEffect(() => {
    if (!text) {
      setOut("");
      return;
    }
    setOut("");
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return out;
}

const GenerateIntro = () => {
  const [expanded, setExpanded] = useState(false);
  const [target, setTarget] = useState("");
  const [pitch, setPitch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);
  const typed = useTypeOut(pitch);

  useEffect(() => {
    if (expanded) setTimeout(() => inputRef.current?.focus(), 250);
  }, [expanded]);

  const generate = async (e) => {
    e?.preventDefault();
    const who = target.trim();
    if (!who || loading) return;
    setLoading(true);
    setError("");
    setPitch("");
    try {
      const prompt = `${RESUME_CONTEXT}

You are Itisha Jain's portfolio, writing a personalized elevator pitch for a specific visitor.
The visitor is from / represents: "${who}".

Write a punchy 2-sentence pitch (max ~45 words) addressed to them, explaining why Itisha specifically would matter to THEIR team or company. Reference concrete, relevant strengths from her background (pick what fits this audience — e.g. frontend architecture & Core Web Vitals for a product team, GenAI/RAG for an AI company, design systems for a scaling startup). Be confident and warm, not generic. Do not use markdown, quotes, emojis, or a greeting — just the pitch prose.`;
      const result = await model.generateContent(prompt);
      const text = result.response.text()?.trim().replace(/^["']|["']$/g, "");
      if (text) setPitch(text);
      else setError("Couldn't generate that — try again?");
    } catch (err) {
      console.error("Intro generation error:", err?.message || String(err));
      setError("Hit a snag generating that. Try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setPitch("");
    setTarget("");
    setError("");
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  if (!expanded) {
    return (
      <button
        onClick={() => setExpanded(true)}
        className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#2563EB] via-violet-600 to-fuchsia-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-transform hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
      >
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        <Sparkles className="w-4 h-4 relative z-10" />
        <span className="relative z-10">Generate my intro for your company</span>
      </button>
    );
  }

  return (
    <div className="relative w-full max-w-xl rounded-2xl border border-violet-200 bg-white/80 backdrop-blur-sm p-5 shadow-lg shadow-violet-500/10">
      <button
        onClick={() => setExpanded(false)}
        className="absolute top-3 right-3 text-slate-400 hover:text-slate-700 transition"
        aria-label="Close"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="flex items-center gap-2 mb-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#2563EB] to-violet-600 text-white">
          <Sparkles className="w-4 h-4" />
        </span>
        <p className="text-sm font-semibold text-slate-800">
          Why Itisha, for <span className="text-violet-600">your</span> team?
        </p>
      </div>

      {!pitch && (
        <form onSubmit={generate} className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              ref={inputRef}
              type="text"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="Your company & role — e.g. Stripe, Frontend"
              maxLength={80}
              className="flex-1 rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-200"
            />
            <button
              type="submit"
              disabled={loading || !target.trim()}
              className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-[#2563EB] to-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-40"
            >
              {loading ? (
                <>
                  <Sparkles className="w-4 h-4 animate-pulse" /> Writing…
                </>
              ) : (
                <>
                  Generate <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-slate-400">Try:</span>
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => setTarget(ex)}
                className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-500 transition hover:border-violet-300 hover:text-violet-600"
              >
                {ex}
              </button>
            ))}
          </div>
          {error && <p className="text-xs text-red-500">{error}</p>}
        </form>
      )}

      {pitch && (
        <div className="space-y-3">
          <p className="text-[15px] leading-relaxed text-slate-700">
            {typed}
            {typed.length < pitch.length && (
              <span className="ml-0.5 inline-block h-4 w-0.5 -mb-0.5 animate-pulse bg-violet-500 align-middle" />
            )}
          </p>
          <button
            onClick={reset}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-violet-600 hover:text-violet-800 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Try another company
          </button>
        </div>
      )}
    </div>
  );
};

export default GenerateIntro;
