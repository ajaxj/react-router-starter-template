import { useState, useEffect, useCallback, useRef } from "react";
import { useTheme } from "./ThemeContext";

interface ScrollToTopProps {
  threshold?: number;
  behavior?: ScrollBehavior;
}

function getScrollTop(): number {
  const byWindow = window.scrollY || window.pageYOffset || 0;
  if (byWindow > 0) return byWindow;
  const byDoc = document.documentElement.scrollTop || 0;
  if (byDoc > 0) return byDoc;
  const bodyTop = document.body.style.top;
  if (bodyTop) {
    const parsed = parseFloat(bodyTop.replace("px", ""));
    if (!isNaN(parsed) && parsed < 0) return -parsed;
  }
  return 0;
}

function getScrollHeight(): number {
  const docEl = document.documentElement;
  return docEl.scrollHeight - docEl.clientHeight;
}

export default function ScrollToTop({
  threshold = 150,
  behavior = "smooth",
}: ScrollToTopProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    function tick() {
      rafRef.current = null;
      const scrollTop = getScrollTop();
      const docHeight = getScrollHeight();
      setVisible(scrollTop > threshold);
      setProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0);
    }

    function handleScroll() {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(tick);
    }

    tick();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    const ro = new ResizeObserver(() => handleScroll());
    ro.observe(document.documentElement);
    ro.observe(document.body);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      ro.disconnect();
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [threshold]);

  const scrollToTop = useCallback(() => {
    const bodyTop = document.body.style.top;
    const wasFixed =
      document.body.style.position === "fixed" || (bodyTop && parseFloat(bodyTop) < 0);

    if (wasFixed) {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
    }
    window.scrollTo({ top: 0, behavior });
  }, [behavior]);

  const size = 44;
  const stroke = 3;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);

  return (
    <button
      onClick={scrollToTop}
      aria-label="回到顶部"
      title="回到顶部"
      className={`fixed bottom-6 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border shadow-lg transition-all duration-300 md:bottom-8 md:right-8 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      } ${
        isDark
          ? "border-[#2a2a35] bg-[#16161d]/95 text-gray-200 hover:border-orange-500 hover:text-orange-400"
          : "border-gray-200 bg-white/95 text-gray-600 hover:border-orange-500 hover:text-orange-500"
      } backdrop-blur`}
    >
      <svg
        className="absolute"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          className="transition-[stroke-dashoffset] duration-150 ease-out"
        />
      </svg>
      <svg
        className="relative h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2.5}
          d="M5 15l7-7 7 7"
        />
      </svg>
    </button>
  );
}