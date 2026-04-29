import React from "react";
import useMobile from "@/hooks/useMobile";
import { Navbar } from "../molecules/Navbar";
import { ThemeToggle } from "../atoms/ThemeToggle";
import { LocaleSwitcher } from "../atoms/LocaleSwitcher";


export const Header = () => {
  const isMobile = useMobile();
  return (
    <header className="p-[1rem] flex items-center absolute top-[0] left-[0] z-[100] w-[100%] font-mono justify-between">
      <h1>Bryan HOUBLON</h1>
      <div className="flex items-center gap-5">
      {isMobile && <LocaleSwitcher />}
      {isMobile && <ThemeToggle />}
      <Navbar />
      </div>
    </header>
  );
};
