import { useTranslations } from "next-intl";
import Socials from "../molecules/Socials";
import AnimatedWord from "../molecules/AnimatedWord";
import { Bookshelf } from "../molecules/bookshelfAnim/Bookshelf";
import Reveal, { RevealItem, RevealStagger } from "../atoms/Reveal";

export default function HeroBanner() {
  const t = useTranslations("Hero")
  const rotatingWords = [t("activity2"), t("activity3"), t("activity4")]
  return (
    <article className="flex flex-col items-center justify-start h-[100vh] mt-30 p-3 gap-15 lg:flex-row lg:mt-0 lg:gap-0 ">
      <RevealStagger as="section" className="flex flex-col gap-8 flex-1" stagger={0.12} delay={0.1} immediate>
        <RevealItem className="flex items-center gap-2">
          <span aria-hidden className="h-px w-6 bg-important" />
          <h4 className="text-important uppercase font-mono text-[12px]"> {t("job")}</h4>
        </RevealItem>
        <div className="flex flex-col gap-4">
          <RevealItem as="p" className="font-serif text-[70px] leading-none">{t("activity1")}</RevealItem>
          <RevealItem as="p" className="font-serif text-[70px] leading-none">{t("and")}</RevealItem>
          <RevealItem as="p" className="text-important font-serif text-[70px] italic leading-none">
            <AnimatedWord words={rotatingWords} />
          </RevealItem>
        </div>
        <RevealItem as="p">{t("desc")}</RevealItem>
        <RevealItem>
          <Socials />
        </RevealItem>
      </RevealStagger>
      <Reveal as="section" className="flex justify-center flex-1" immediate delay={0.3} duration={0.9}>
        <Bookshelf />
      </Reveal>
    </article>
  )
}
