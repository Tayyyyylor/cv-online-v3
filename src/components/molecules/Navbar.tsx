"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import useMobile from "@/hooks/useMobile";
import { LocaleSwitcher } from "../atoms/LocaleSwitcher";
import { ThemeToggle } from "../atoms/ThemeToggle";
import { BurgerLine } from "../atoms/BurgerLine";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMobile();
  const t = useTranslations("Navbar");

  const toggleMenu = () => setIsOpen((v) => !v);
  const closeMenu = () => setIsOpen(false);

  const dataNav = [
    { label: t("skills"), href: "/#skills" },
    { label: t("projects"), href: "/#projects" },
    { label: t("contact"), href: "/#contact" },
  ];

  if (!isMobile) {
    return (
      <nav className="flex items-center gap-8">
        {dataNav.map((item) => (
          <Link key={item.href} href={item.href} className="nav-gradient-link">
            {item.label}
          </Link>
        ))}
        <LocaleSwitcher />
        <ThemeToggle />
      </nav>
    );
  }

  return (
    <div className="relative">
      <button
        className="flex flex-col justify-around w-8 h-8 bg-transparent border-none cursor-pointer p-0 z-[100]"
        onClick={toggleMenu}
        aria-label="Menu"
      >
        <BurgerLine className={isOpen ? "rotate-45" : ""} />
        <BurgerLine className={isOpen ? "opacity-0" : ""} />
        <BurgerLine className={isOpen ? "-rotate-45" : ""} />
      </button>

      <div
        className={`fixed inset-0 w-screen h-screen bg-black/50 z-[101] transition-all duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeMenu}
      />

      <nav
        className={`fixed top-0 w-screen h-screen z-[102] flex flex-col bg-[var(--background)] transition-[right] duration-300 ${
          isOpen ? "right-0" : "-right-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            className="bg-transparent border-none text-3xl cursor-pointer p-2"
            onClick={closeMenu}
            aria-label="Fermer le menu"
          >
            <X />
          </button>
        </div>
        <div className="flex flex-col px-4 py-8 gap-6">
          {dataNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-2xl font-medium py-4"
              onClick={closeMenu}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};
