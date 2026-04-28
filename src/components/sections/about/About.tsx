import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import Title from '../../atoms/Title'
import { aboutData } from './about.data'

export default function About() {
  const { headline, paragraphs, now } = aboutData

  return (
    <section id="about" className="w-full p-3">
      <Title title="À propos" />

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-foreground/10 bg-(--background-card)">
           
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <h3 className="font-serif text-3xl leading-tight sm:text-4xl lg:text-5xl">
            {headline.line1}
            <br />
            <em className="font-serif italic text-important">{headline.line2Italic}</em>
          </h3>

          <div className="flex flex-col gap-5">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-foreground/80 leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-6xl">
        <div className="rounded-2xl border border-foreground/10 bg-(--background-card) p-6 sm:p-10">
          <div className="flex items-center gap-3 pb-6">
            <span aria-hidden className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-important opacity-50" />
              <span className="relative inline-flex h-3 w-3 rounded-full border border-important bg-important/40" />
            </span>
            <h4 className="font-mono text-xs uppercase tracking-widest text-important">
              En ce moment
            </h4>
          </div>

          <dl className="flex flex-col divide-y divide-foreground/10 border-y border-foreground/10">
            <NowRow label="Je travaille sur" value={now.workingOn} />
            <NowRow
              label="Je lis"
              value={
                now.reading.href ? (
                  <a
                    href={now.reading.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-important transition-colors hover:text-important/80"
                  >
                    <em className="font-serif italic">{now.reading.title}</em>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                ) : (
                  <em className="font-serif italic text-important">{now.reading.title}</em>
                )
              }
            />
            <NowRow label="Je bricole" value={now.building} />
          </dl>

          <p className="pt-6 font-mono text-[11px] uppercase tracking-widest text-foreground/40">
            Mis à jour le {now.updatedAt}
          </p>
        </div>
      </div>
    </section>
  )
}

function NowRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-2 py-5 sm:grid-cols-[180px_1fr] sm:gap-6">
      <dt className="font-mono text-[11px] uppercase tracking-widest text-foreground/50">
        {label}
      </dt>
      <dd className="font-serif text-lg sm:text-xl">{value}</dd>
    </div>
  )
}
