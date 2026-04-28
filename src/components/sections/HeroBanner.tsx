import { useTranslations } from "next-intl";
import Socials from "../molecules/Socials";
import AnimatedWord from "../molecules/AnimatedWord";
import { Bookshelf } from "../molecules/bookshelfAnim/Bookshelf";

export default function HeroBanner() {
  const t = useTranslations("Hero")
  const rotatingWords = [t("activity2"), t("activity4"), t("activity5")]
  return (
    <article className="flex flex-col items-center justify-start h-[100vh] mt-30 p-3 gap-15 lg:flex-row lg:mt-0 lg:gap-0 ">
      <section className="flex flex-col gap-8 flex-1">
        <h4 className="text-important uppercase font-mono text-[12px]"> --- {t("job")}</h4>
        <div className="flex flex-col gap-4">
          <p className="font-serif text-[70px] leading-none">{t("activity1")},</p>
          <p className="text-important font-serif text-[70px] italic leading-none">
            <AnimatedWord words={rotatingWords} />
          </p>
          <p className="font-serif text-[70px] italic leading-none">{t("activity3")}.</p>
        </div>
<p>{t("desc")}</p>
<Socials />
      </section>
      <section className="flex justify-center flex-1">
             <Bookshelf />
      </section>
    </article>
  )
}
