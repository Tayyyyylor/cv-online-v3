"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

export function ThemeToggle() {
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const { resolvedTheme, setTheme } = useTheme();
  const isLight = mounted && resolvedTheme === "light";

  return (
    <button
    className="relative inline-flex items-center justify-center whitespace-nowrap h-[2.5rem] w-[2.5rem] rounded-[0.375rem] border-1 cursor-pointer"
      onClick={() => setTheme(isLight ? "dark" : "light")}
    >
      {isLight ? <Sun className="h-[1.2rem] w-[1.2rem] transition-all duration-2 text-black"/> : <Moon className="h-[1.2rem] w-[1.2rem] transition-all duration-2 text-white"/>}
    </button>
  );
}
