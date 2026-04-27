import { useEffect } from "react";

const SELECTOR =
  ".animate-fade-up, .animate-scale-in, .animate-slide-in-left, .animate-slide-in-right";

export function useScrollAnimation() {
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

    document
      .querySelectorAll(SELECTOR)
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}
