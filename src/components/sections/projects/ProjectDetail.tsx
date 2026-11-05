'use client'

import Image from 'next/image'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import type { CSSProperties, ReactNode } from 'react'
import { Link } from '@/i18n/navigation'
import PhoneMockup from '@/components/atoms/PhoneMockup'
import Reveal, { RevealItem, RevealStagger } from '@/components/atoms/Reveal'
import ProjectLinks from '@/components/molecules/ProjectLinks'
import type { Project } from './projects.data'
import { rememberSheetOrigin } from './sheetStyles'

function SheetSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mx-auto grid max-w-6xl gap-8 border-t border-(--sheet-foreground)/12 px-6 py-16 md:py-24 lg:grid-cols-[1fr_3fr] lg:gap-16">
      <Reveal>
        <h2 className="font-mono text-xs tracking-[.18em] text-(--sheet-accent) uppercase lg:sticky lg:top-24">{title}</h2>
      </Reveal>
      <div>{children}</div>
    </section>
  )
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-[11px] tracking-[.14em] text-(--sheet-muted) uppercase">{label}</dt>
      <dd className="mt-1">{value}</dd>
    </div>
  )
}

export default function ProjectDetail({ project, nextId }: { project: Project; nextId: string }) {
  const t = useTranslations('Projects.items')
  const detail = useTranslations('Projects.detail')
  const { id, theme, phone, image, logo, mockups, detailedStack, year, links } = project
  const name = t(`${id}.name`)
  const client = project.categories.includes('clients')
  const story = t.raw(`${id}.longDescription`) as string[]
  const highlights = t.raw(`${id}.highlights`) as string[]
  const technical = t.raw(`${id}.technical`) as string[]

  const palette = {
    '--sheet-background': theme.background,
    '--sheet-surface': theme.surface,
    '--sheet-foreground': theme.foreground,
    '--sheet-muted': theme.muted,
    '--sheet-accent': theme.accent,
  } as CSSProperties

  return (
    <article style={palette} className="min-h-svh overflow-x-clip bg-(--sheet-background) text-(--sheet-foreground)">
      <header className="relative flex min-h-svh flex-col justify-center overflow-hidden px-6 pt-24 pb-14">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_45%_at_72%_32%,color-mix(in_srgb,var(--sheet-accent)_24%,transparent),transparent)]" />
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
          <RevealStagger immediate stagger={0.09} className="flex flex-col items-start">
            {logo && (
              <RevealItem>
                <Image
                  src={logo}
                  alt=""
                  width={280}
                  height={128}
                  loading="eager"
                  className={`mb-7 h-12 w-auto max-w-[180px] object-contain object-left ${client ? 'brightness-0 invert' : ''}`}
                />
              </RevealItem>
            )}
            <RevealItem as="h1" className="font-serif text-[clamp(3rem,7.4vw,6.75rem)] leading-[1] tracking-[-.03em]">
              {name}
            </RevealItem>
            <RevealItem as="p" className="mt-6 max-w-[34rem] font-serif text-[clamp(1.25rem,2.4vw,1.75rem)] leading-snug text-(--sheet-accent) italic">
              {t(`${id}.tagline`)}
            </RevealItem>
            <RevealItem>
              <dl className="mt-9 flex flex-wrap gap-x-12 gap-y-4 text-[15px]">
                <MetaItem label={detail('year')} value={year} />
                <MetaItem label={detail('role')} value={t(`${id}.role`)} />
                <MetaItem label={detail('type')} value={detail(client ? 'client' : 'personal')} />
              </dl>
            </RevealItem>
            {links && (
              <RevealItem className="mt-9">
                <ProjectLinks links={links} />
              </RevealItem>
            )}
          </RevealStagger>

          <Reveal immediate delay={0.2} duration={1} y={40} className="sheet-float">
            {phone ? (
              <PhoneMockup
                videoSrc={phone.videoSrc}
                imageSrc={phone.imageSrc}
                poster={phone.poster}
                showNotch={phone.showNotch}
                alt={name}
                placeholderLabel={name}
                priority
                className="border-(--sheet-foreground)/20 bg-black"
              />
            ) : image && (
              <Image
                src={image}
                alt={name}
                width={1600}
                height={1000}
                preload
                sizes="(max-width: 1024px) 92vw, 640px"
                className="h-auto max-h-[62svh] w-full scale-110 object-contain"
              />
            )}
          </Reveal>
        </div>
        <div className="absolute inset-x-0 bottom-5 flex justify-center">
          <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[.14em] text-(--sheet-muted) uppercase">
            {detail('scroll')}
            <ArrowDown className="size-3.5 animate-bounce" />
          </span>
        </div>
      </header>

      <SheetSection title={detail('story')}>
        <RevealStagger className="flex flex-col gap-6" stagger={0.1}>
          {story.map((paragraph, index) => (
            <RevealItem
              key={paragraph}
              as="p"
              className={index === 0 ? 'font-serif text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.3]' : 'max-w-[44rem] text-lg leading-relaxed text-(--sheet-muted)'}
            >
              {paragraph}
            </RevealItem>
          ))}
        </RevealStagger>
      </SheetSection>

      <SheetSection title={detail('highlights')}>
        <RevealStagger className="grid gap-x-10 sm:grid-cols-2" stagger={0.06}>
          {highlights.map((item, index) => (
            <RevealItem key={item} className="flex gap-4 border-t border-(--sheet-foreground)/15 py-5">
              <span className="font-mono text-sm text-(--sheet-accent)">{String(index + 1).padStart(2, '0')}</span>
              <span className="text-[17px] leading-snug">{item}</span>
            </RevealItem>
          ))}
        </RevealStagger>
      </SheetSection>

      {mockups && mockups.length > 0 && (
        <SheetSection title={detail('previews')}>
          <RevealStagger className="grid gap-6 sm:grid-cols-2" stagger={0.12}>
            {mockups.map((src, index) => (
              <RevealItem key={src} className="relative mx-auto aspect-[9/19.5] w-full max-w-[300px] overflow-hidden rounded-[2rem] border border-(--sheet-foreground)/15">
                <Image src={src} alt={detail('previewAlt', { name, number: index + 1 })} fill sizes="300px" className="object-cover object-top" />
              </RevealItem>
            ))}
          </RevealStagger>
          {project.previewUsesDemoData && <p className="mt-6 text-center font-mono text-xs text-(--sheet-muted)">{detail('demoCaption')}</p>}
        </SheetSection>
      )}

      <SheetSection title={detail('stack')}>
        <RevealStagger className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4" stagger={0.04}>
          {detailedStack.map(({ name: tech, icon }) => (
            <RevealItem key={tech} y={14} className="flex items-center gap-3 rounded-xl bg-(--sheet-surface) px-4 py-4 text-[15px] [&_svg]:size-6 [&_svg]:shrink-0 [&_svg]:text-(--sheet-accent)">
              {icon}
              {tech}
            </RevealItem>
          ))}
        </RevealStagger>
      </SheetSection>

      <SheetSection title={detail('technical')}>
        <RevealStagger className="flex max-w-[44rem] flex-col gap-5" stagger={0.1}>
          {technical.map((paragraph) => (
            <RevealItem key={paragraph} as="p" className="text-lg leading-relaxed">{paragraph}</RevealItem>
          ))}
        </RevealStagger>
      </SheetSection>

      <Link
        href={`/projects/${nextId}`}
        replace
        onClick={rememberSheetOrigin}
        className="group block bg-(--sheet-surface) px-6 py-16 transition-colors hover:bg-(--sheet-accent) hover:text-(--sheet-background) md:py-24"
      >
        <span className="mx-auto flex max-w-6xl items-end justify-between gap-6">
          <span>
            <span className="font-mono text-xs tracking-[.18em] uppercase opacity-70">{detail('next')}</span>
            <span className="mt-3 block font-serif text-[clamp(2.25rem,7vw,5.5rem)] leading-none tracking-[-.02em]">{t(`${nextId}.name`)}</span>
          </span>
          <ArrowRight className="size-10 shrink-0 transition-transform group-hover:translate-x-2" />
        </span>
      </Link>
    </article>
  )
}
