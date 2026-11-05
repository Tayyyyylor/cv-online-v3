"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { flushSync } from "react-dom";

const subscribe = () => () => {};

/** Le nouveau thème se propage en cercle depuis le bouton. */
function revealTheme(button: HTMLElement, applyTheme: () => void) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!document.startViewTransition || reducedMotion) {
    applyTheme();
    return;
  }

  const { left, top, width, height } = button.getBoundingClientRect();
  const x = left + width / 2;
  const y = top + height / 2;
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

  document
    .startViewTransition(() => flushSync(applyTheme))
    .ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 750, easing: "cubic-bezier(.65, 0, .2, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    })
    .catch(() => {});
}

type ThemeToggleProps = {
  className?: string
  label?: string
}

export function ThemeToggle({
  className = "relative inline-flex items-center justify-center whitespace-nowrap h-[2.5rem] w-[2.5rem] rounded-[0.375rem] border-[1] cursor-pointer",
  label,
}: ThemeToggleProps) {
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const { resolvedTheme, setTheme } = useTheme();
  const isLight = mounted && resolvedTheme === "light";

  return (
    <button
      className={className}
      aria-label={label}
      onClick={(event) => revealTheme(event.currentTarget, () => setTheme(isLight ? "dark" : "light"))}
    >
      {isLight ? <Sun className="h-[1.2rem] w-[1.2rem] transition-all duration-2"/> : <Moon className="h-[1.2rem] w-[1.2rem] transition-all duration-2"/>}
    </button>
  );
}
