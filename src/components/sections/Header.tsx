import React from "react";
import useMobile from "@/hooks/useMobile";
import { Navbar } from "../molecules/Navbar";
import { ThemeToggle } from "../atoms/ThemeToggle";


export const Header = () => {
  const isMobile = useMobile();
  return (
    <header className="p-1 flex justify-between items-center flex-row-reverse absolute top-[0] left-[0] z-[100] w-[100%] font-mono">
      <Navbar />
      {isMobile && <ThemeToggle />}
    </header>
  );
};
