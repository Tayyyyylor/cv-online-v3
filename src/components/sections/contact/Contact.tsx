import { ArrowUpRight, Download } from 'lucide-react'
import { contactData } from './contact.data'

export default function Contact() {
  const { headline, description, email, links, cv } = contactData

  return (
    <section id="contact" className="w-full px-3 py-24 lg:py-32">
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <h2 className="font-serif text-5xl leading-tight sm:text-6xl lg:text-7xl">
          {headline.line1}
          <em className="font-serif italic text-important">{headline.line2Italic}</em>
        </h2>

        <p className="mt-8 max-w-xl text-foreground/70 leading-relaxed">{description}</p>

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
          href={cv.href}
          download
          className="group inline-flex items-center gap-3 rounded-lg border border-foreground/15 px-6 py-3 transition-colors hover:border-important hover:text-important"
        >
          <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          <span className="font-mono text-sm uppercase tracking-widest">{cv.label}</span>
          <span className="font-mono text-xs uppercase tracking-widest text-foreground/40">
            {cv.meta}
          </span>
        </a>
      </div>
    </section>
  )
}
