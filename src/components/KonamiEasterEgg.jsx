import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";

const SEQUENCE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

const SECRET_LINES = [
  "🎮 Konami code?! Okay, you're clearly a real one. Itisha would hire YOU.",
  "🕹️ Cheat code accepted — but Itisha ships without cheats. Fancy a chat?",
  "✨ You found the secret. Fun fact: her best friend is Aman Khushalani ❤️",
  "🚀 30 extra lives granted. Sadly they don't count toward code review.",
];

const KonamiEasterEgg = () => {
  const [message, setMessage] = useState(null);
  const buffer = useRef([]);

  useEffect(() => {
    const onKey = (e) => {
      // Ignore typing inside inputs so the code only fires "in the open".
      const tag = e.target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      buffer.current = [...buffer.current, key].slice(-SEQUENCE.length);

      if (SEQUENCE.every((k, i) => buffer.current[i] === k)) {
        buffer.current = [];
        trigger();
      }
    };

    const trigger = () => {
      // Spin the hero photo.
      const photo = document.querySelector(".gsap-hero-image");
      if (photo) {
        photo.classList.remove("konami-spin");
        void photo.offsetWidth; // reflow to allow retrigger
        photo.classList.add("konami-spin");
        setTimeout(() => photo.classList.remove("konami-spin"), 1500);
      }
      // Nova drops a secret line.
      setMessage(SECRET_LINES[Math.floor(Math.random() * SECRET_LINES.length)]);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => setMessage(null), 7000);
    return () => clearTimeout(t);
  }, [message]);

  if (!message) return null;

  return (
    <div className="fixed bottom-24 left-5 z-[70] max-w-[18rem] konami-toast">
      <div className="relative bg-[#0d1117] border border-blue-500/50 text-slate-100 rounded-2xl rounded-bl-sm shadow-2xl p-4">
        <button
          onClick={() => setMessage(null)}
          className="absolute -top-2 -right-2 w-5 h-5 bg-[#1a2535] border border-[#2a3a4a] rounded-full flex items-center justify-center text-slate-400 hover:text-white"
          aria-label="Dismiss"
        >
          <X className="w-3 h-3" />
        </button>
        <div className="flex items-start gap-2">
          <span className="text-lg leading-none">🤖</span>
          <p className="text-sm leading-relaxed">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default KonamiEasterEgg;
