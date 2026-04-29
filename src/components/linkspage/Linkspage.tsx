"use client";

import Image from "next/image";
import { SiAppstore, SiGithub, SiGoogleplay, SiInstagram, SiReddit, SiX } from "@icons-pack/react-simple-icons";

function LinkedinIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.452 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.356V9h3.414v1.561h.046c.477-.9 1.637-1.852 3.37-1.852 3.602 0 4.268 2.37 4.268 5.455v6.288zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.558V9h3.556v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
import { useTranslations } from "next-intl";
import { LocaleSwitcher } from "../atoms/LocaleSwitcher";
import Reveal, { RevealStagger, RevealItem } from "../atoms/Reveal";

type Social = {
  Icon: React.ComponentType<{ size?: number }>;
  label: string;
  url: string;
};

const socials: Social[] = [
    { Icon: SiInstagram, label: "Instagram", url: "https://www.instagram.com/tayylor_h/" },
    { Icon: SiX, label: "X", url: "https://x.com/_tayylor_g" },
    { Icon: LinkedinIcon, label: "LinkedIn", url: "https://www.linkedin.com/in/bryan-houblon-172121211/" },
  { Icon: SiGithub, label: "GitHub", url: "https://github.com/tayyyyylor" },
  { Icon: SiReddit, label: "Reddit", url: "" },
];

export default function Linkspage() {
  const t = useTranslations("Links");

  type Card = {
    title: string;
    desc?: string;
    url?: string;
    stores?: { apple?: string; google?: string };
  };

  const cards: Card[] = [
    { title: t("portfolio"), url: "https://www.bryanhoublon.com" },
    {
      title: t("myshelf"),
      desc: t("myshelfDesc"),
      stores: { apple: "", google: "" },
    },
    { title: t("collection"), desc: t('collectionDesc'), url: "https://www.amazon.fr/Relations-textuelles-Bryan-Taylor-Houblon/dp/B0GYQJYBBL/ref=sr_1_1?crid=281GUCD8313DO&dib=eyJ2IjoiMSJ9.st7xVaMmLOH4JiFZTeQKYjZv5disiC7T_g_hzgap5Gj4Z70lDkB45P2TddOEtmgr0Fb1r9XM6rAGs-GPJICNQK_NTlRTM8w5wWGQ5qtz46DW7cQYdGGn6MnIdsdq7JHRan7DTCuL2e6gVo0FEHeU9km2WCFeod-OU0itxQv97T_UkXtS48rqc2H2qREK6_Ry.xLKhkX2wALQ2ZJx3qDRwB09qnG3StEoyOfhRZnXx3qY&dib_tag=se&keywords=relations+textuelles&qid=1777493730&sprefix=%2Caps%2C523&sr=8-1" },
  ];

  return (
    <div data-theme="dark" className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="p-1 flex items-center gap-2 justify-end">
        <LocaleSwitcher />
      </header>

      <main className="flex-1 w-full max-w-md mx-auto flex flex-col items-center gap-8 py-10">
        <Reveal immediate duration={0.8} className="w-[160px] h-[160px] rounded-full overflow-hidden">
          <Image
            src="/me.png"
            alt="Bryan Houblon"
             width={160}
          height={160}
            priority
            className="w-[100%] h-[100%] object-cover"
          />
        </Reveal>

        <Reveal immediate delay={0.1} className="text-center flex flex-col gap-2">
          <h1 className="font-serif text-3xl">Bryan Houblon</h1>
          <p className="text-sm text-[var(--color-grey-text)]">{t("description")}</p>
        </Reveal>

        <RevealStagger as="ul" immediate delay={0.2} className="flex items-center gap-5">
          {socials
            .filter((s) => s.url)
            .map(({ Icon, label, url }) => (
              <RevealItem as="li" key={label}>
               <h4></h4>
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="inline-block opacity-70 hover:opacity-100 hover:text-important transition-all hover:-translate-y-0.5"
                >
                  <Icon size={28} />
                </a>
              </RevealItem>
            ))}
        </RevealStagger>

        <RevealStagger as="ul" immediate delay={0.3} stagger={0.1} className="w-full flex flex-col gap-4">
          {cards.map((card) => (
            <RevealItem as="li" key={card.title} className="flex flex-col gap-2 w-full">
              {card.desc && (
                <p className="text-[16px] text-center text-[var(--color-grey-text)] px-2">
                  {card.desc}
                </p>
              )}
              {card.stores ? (
                <div className="flex flex-col gap-3 rounded-xl bg-[var(--background-card)] text-[var(--foreground-card)] px-5 py-4 border border-foreground/10">
                  <p className="text-center font-medium">{card.title}</p>
                  <div className="flex gap-2">
                    <a
                      href={card.stores.apple || undefined}
                      target="_blank"
                      rel="noreferrer"
                      aria-disabled={!card.stores.apple}
                      aria-label="App Store"
                      className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-foreground/10 py-2 hover:border-important hover:scale-[1.02] transition-all aria-disabled:opacity-50 aria-disabled:pointer-events-none"
                    >
                      <SiAppstore size={18} />
                      <span className="text-sm">App Store</span>
                    </a>
                    <a
                      href={card.stores.google || undefined}
                      target="_blank"
                      rel="noreferrer"
                      aria-disabled={!card.stores.google}
                      aria-label="Google Play"
                      className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-foreground/10 py-2 hover:border-important hover:scale-[1.02] transition-all aria-disabled:opacity-50 aria-disabled:pointer-events-none"
                    >
                      <SiGoogleplay size={16} />
                      <span className="text-sm">Google Play</span>
                    </a>
                  </div>
                </div>
              ) : (
                <a
                  href={card.url || undefined}
                  target="_blank"
                  rel="noreferrer"
                  aria-disabled={!card.url}
                  className="block w-full rounded-xl bg-[var(--background-card)] text-[var(--foreground-card)] px-5 py-4 text-center font-medium border border-foreground/10 hover:border-important hover:scale-[1.02] transition-all aria-disabled:opacity-50 aria-disabled:pointer-events-none"
                >
                  {card.title}
                </a>
              )}
            </RevealItem>
          ))}
        </RevealStagger>
      </main>
    </div>
  );
}
