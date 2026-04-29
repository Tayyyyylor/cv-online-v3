import { ArrowUpRight } from 'lucide-react'
import Title from '../../atoms/Title'
import { useTranslations } from 'next-intl'

export type AboutData = {
  photo: string
  headline: { line1: string; line2Italic: string }
  paragraphs: string[]
  now: {
    workingOn: string
    reading: string 
    building: string
  }
}

export default function About() {
  const t = useTranslations("About")

  const aboutData: AboutData = {
  photo: '/toto.png',
  headline: {
    line1: t('line1'),
    line2Italic: t('line2'),
  },
  paragraphs: [
    t('paragraph1'),
    t('paragraph2'),
    t('paragraph3'),
    t('paragraph4'),
  ],
  now: {
    workingOn: t('workingOn'),
    reading: t('reading'),
    building: t('building')
  },
}


  return (
    <section id="about" className="w-full p-3">
      <Title number="03" title="À propos" desc={t.rich('descTitle', {
          important: (chunks) => <span className="text-important italic">{chunks}</span>,
        })} />

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-foreground/10 bg-(--background-card)">
           
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <h3 className="font-serif text-3xl leading-tight sm:text-4xl lg:text-5xl">
            {aboutData.headline.line1}
            <br />
            <em className="font-serif italic text-important">{aboutData.headline.line2Italic}</em>
          </h3>

          <div className="flex flex-col gap-5">
            {aboutData.paragraphs.map((p, i) => (
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
            <NowRow label="Je travaille sur" value={aboutData.now.workingOn} />
            <NowRow
              label="Je lis"
              value={ (
                  <em className="font-serif italic text-important">{aboutData.now.reading}</em>
                )
              }
            />
            <NowRow label="Je bricole" value={aboutData.now.building} />
          </dl>

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
