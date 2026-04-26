"use client";
import React, { useState } from "react";
import { useLocale } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";


export const LocaleSwitcher = () => {
  const currentLocale = useLocale();
  const pathname = usePathname();

  const [isHover, setIsHover] = useState(false);

  const locales = routing.locales.filter((locale) => locale !== currentLocale);

  const handleLocaleChange = (locale: string) => {
    window.location.assign(`/${locale}${pathname === "/" ? "" : pathname}`);
  };

  const handleHoverOpen = () => {
    setIsHover(true);
  };

  const handleHoverClose = () => {
    setIsHover(false);
  };

  return (
    <div
      onMouseEnter={handleHoverOpen}
      onMouseLeave={handleHoverClose}
      className="text-right relative flex-[0 0 auto]"
    >
      <span className="uppercase cursor-default font-medium">{currentLocale}</span>
      {isHover && (
        <ul className="uppercase absolute top-[100%] right-[0] bg-transparent">
          {locales.map((locale, index) => (
            <li
              key={index}
              className="cursor-pointer opacity-[0.7] hover:opacity-[1] font-medium"
              onClick={() => handleLocaleChange(locale)}
            >
              {locale}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
