import { Download } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import Socials from '../molecules/Socials'
import { RevealItem, RevealStagger } from '../atoms/Reveal'

export type ContactLink = {
  label: string
  href: string
}

export type ContactData = {
  headline: { line1: string; line2Italic: string }
  description: string
  email: string
  links: ContactLink[]
  cv: { href: string; label: string; meta: string }
}

export default function Contact() {

  const t = useTranslations("Contact")
   const currentLocale = useLocale();
  const email = "bryan.houblon@icloud.com"

  return (
    <section id="contact" className="w-full px-3 py-24 lg:py-32">
      <RevealStagger className="mx-auto flex max-w-5xl flex-col items-center text-center" stagger={0.12}>
        <RevealItem as="h2" className="font-serif text-5xl leading-tight sm:text-6xl lg:text-7xl">
          {t('line1')}
          <em className="font-serif italic text-important">{t('line2')}</em>
        </RevealItem>

        <RevealItem as="p" className="mt-8 max-w-xl text-foreground/70 leading-relaxed">{t('desc')}</RevealItem>

        <RevealItem>
          <a
            href={`mailto:${email}`}
            className="group relative mt-16 inline-block font-serif italic text-important text-3xl sm:text-5xl lg:text-6xl mb-10"
          >
            <span className="relative inline-block">
              {email}
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 bg-important transition-transform duration-500 ease-out group-hover:scale-x-100"
              />
            </span>
          </a>
        </RevealItem>

        <RevealItem>
          <Socials />
        </RevealItem>

        <RevealItem>
          <div aria-hidden className="my-16 h-px w-24 bg-foreground/15" />
        </RevealItem>

        <RevealItem>
          <a
            href={
                currentLocale === "fr"
                  ? "/French_CV_Bryan_HOUBLON.pdf"
                  : "/English_CV_Bryan_HOUBLON.pdf"
              }
              target="_blank"
            download
            className="group inline-flex items-center gap-3 rounded-lg border border-foreground/15 px-6 py-3 transition-colors hover:border-important hover:text-important"
          >
            <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            <span className="font-mono text-sm uppercase tracking-widest">{t("ctaDownload")}</span>
            <span className="font-mono text-xs uppercase tracking-widest text-foreground/40">
             PDF
            </span>
          </a>
        </RevealItem>
      </RevealStagger>
    </section>
  )
}
