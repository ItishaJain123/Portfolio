import { useState, useEffect } from "react";
import { Github, Flame } from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const USERNAME = "ItishaJain123";
// Blue palette (level 0–4) to match the portfolio instead of GitHub green.
const LEVEL_COLORS = ["#e2e8f0", "#bfdbfe", "#60a5fa", "#3b82f6", "#1d4ed8"];
const DAY_MS = 86400000;

// Group a flat list of daily contributions into GitHub-style week columns.
function toWeeks(days) {
  if (!days.length) return [];
  const weeks = [];
  let week = new Array(new Date(days[0].date).getDay()).fill(null); // pad first column
  for (const d of days) {
    week.push(d);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length) weeks.push([...week, ...new Array(7 - week.length).fill(null)]);
  return weeks;
}

function computeStreak(days) {
  let streak = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].count > 0) streak++;
    else break;
  }
  return streak;
}

const GithubActivity = () => {
  useScrollAnimation();
  const [days, setDays] = useState(null);
  const [total, setTotal] = useState(0);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`, {
      signal: controller.signal,
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data) => {
        const all = data.contributions || [];
        // Keep only the trailing ~26 weeks so it fits nicely on all screens.
        const cutoff = Date.now() - 182 * DAY_MS;
        const recent = all.filter((d) => new Date(d.date).getTime() >= cutoff);
        setDays(recent);
        setTotal(recent.reduce((sum, d) => sum + d.count, 0));
      })
      .catch((err) => {
        if (err !== "AbortError" && err?.name !== "AbortError") setFailed(true);
      });
    return () => controller.abort();
  }, []);

  // Hide the section entirely if the public API is unavailable.
  if (failed) return null;

  const weeks = days ? toWeeks(days) : [];
  const streak = days ? computeStreak(days) : 0;

  return (
    <section id="activity" className="py-16 bg-white relative overflow-hidden transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-blue-50/40 shadow-sm p-6 sm:p-8 animate-fade-up">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="w-11 h-11 rounded-xl bg-slate-900 flex items-center justify-center text-white flex-shrink-0">
                <Github className="w-6 h-6" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-slate-900 leading-tight">Coding Activity</h3>
                <p className="text-xs text-slate-500">Live from GitHub · last 6 months</p>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <div className="text-center">
                <p className="text-xl font-extrabold text-[#2563EB]">{total}</p>
                <p className="text-[11px] text-slate-500 uppercase tracking-wide">Contributions</p>
              </div>
              {streak > 0 && (
                <div className="text-center">
                  <p className="text-xl font-extrabold text-orange-500 flex items-center gap-1 justify-center">
                    <Flame className="w-4 h-4" /> {streak}
                  </p>
                  <p className="text-[11px] text-slate-500 uppercase tracking-wide">Day streak</p>
                </div>
              )}
            </div>
          </div>

          {/* Heatmap */}
          {!days ? (
            <div className="h-28 flex items-center justify-center text-sm text-slate-400">Loading activity…</div>
          ) : (
            <div className="overflow-x-auto pb-1">
              <div className="flex gap-[3px] min-w-fit">
                {weeks.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-[3px]">
                    {week.map((day, di) => (
                      <div
                        key={di}
                        title={day ? `${day.count} on ${day.date}` : ""}
                        className="w-[11px] h-[11px] rounded-[2px]"
                        style={{ background: day ? LEVEL_COLORS[day.level] : "transparent" }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Legend */}
          <div className="flex items-center justify-end gap-1.5 mt-4 text-[11px] text-slate-400">
            <span>Less</span>
            {LEVEL_COLORS.map((c) => (
              <span key={c} className="w-[11px] h-[11px] rounded-[2px]" style={{ background: c }} />
            ))}
            <span>More</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GithubActivity;
