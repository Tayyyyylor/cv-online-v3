import { useTranslations } from 'next-intl';
import Title from '../atoms/Title';

export type AboutData = {
  photo: string
  paragraphs: string[]
  now: {
    workingOn: string
    reading: string 
    building: string
  }
}

export default function About() {
  const t = useTranslations("About")

  
  const paragraphs = [
    t('paragraph1'),
    t('paragraph2'),
    t('paragraph3'),
    t('paragraph4'),
  ]
 


  return (
    <section id="about" className="w-full p-3 mt-20">
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
            {t('line1')}
            <br />
            <em className="font-serif italic text-important">{t('line2')}</em>
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
              {t('titleNow')}
            </h4>
          </div>

          <dl className="flex flex-col divide-y divide-foreground/10 border-y border-foreground/10">
            <NowRow label={t('workingOnLabel')} value={t('workingOn')} />
            <NowRow
              label={t('readingLabel')}
              value={ (
                  <em className="font-serif italic text-important">{t('reading')}</em>
                )
              }
            />
            <NowRow label={t('buildingLabel')} value={t('building')} />
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
