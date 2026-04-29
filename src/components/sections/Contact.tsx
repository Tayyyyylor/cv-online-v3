import { ArrowUpRight, Download } from 'lucide-react'
import { useTranslations } from 'next-intl'

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
  const email = "bryan.houblon@icloud.com"

  const links = [
    { label: 'GitHub', href: 'https://github.com/tayyyyylor' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/bryan-houblon-172121211/' },
    { label: 'MyShelf', href: 'https://myshelf.example.com' },
  ]
  
  return (
    <section id="contact" className="w-full px-3 py-24 lg:py-32">
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <h2 className="font-serif text-5xl leading-tight sm:text-6xl lg:text-7xl">
          {t('line1')}
          <em className="font-serif italic text-important">{t('line2')}</em>
        </h2>

        <p className="mt-8 max-w-xl text-foreground/70 leading-relaxed">{t('desc')}</p>

        <a
          href={`mailto:${email}`}
          className="group relative mt-16 inline-block font-serif italic text-important text-3xl sm:text-5xl lg:text-6xl"
        >
          <span className="relative inline-block">
            {email}
            <span
              aria-hidden
              className="pointer-events-none absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 bg-important transition-transform duration-500 ease-out group-hover:scale-x-100"
            />
          </span>
        </a>

        <ul className="mt-20 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 font-mono text-sm uppercase tracking-widest text-foreground/60 transition-colors hover:text-important"
              >
                {link.label}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </li>
          ))}
        </ul>

        <div aria-hidden className="my-16 h-px w-24 bg-foreground/15" />

        <a
          href="/cv.pdf'"
          download
          className="group inline-flex items-center gap-3 rounded-lg border border-foreground/15 px-6 py-3 transition-colors hover:border-important hover:text-important"
        >
          <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          <span className="font-mono text-sm uppercase tracking-widest">{t("ctaDownload")}</span>
          <span className="font-mono text-xs uppercase tracking-widest text-foreground/40">
           PDF · 240 Ko
          </span>
        </a>
      </div>
    </section>
  )
}
