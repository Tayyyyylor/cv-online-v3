'use client'

import { ArrowDownToLine, ArrowUpRight } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { ThemeToggle } from '@/components/atoms/ThemeToggle'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { useBook } from './BookContext'
import ChapterLink from './ChapterLink'

export default function BookHeader({ hash }: { hash: string }) {
  const t = useTranslations('Book.header')
  const book = useTranslations('Book')
  const locale = useLocale()
  const { chapters } = useBook()
  const otherLocale = routing.locales.find((item) => item !== locale)

  return (
    <header className="mx-auto flex h-14 w-full max-w-[1320px] shrink-0 items-center justify-between gap-3 border-b border-paper-line short:h-9 md:h-16 md:gap-6 short:md:h-9">
      <ChapterLink chapter={0} aria-label={t('identity')} className="flex items-center gap-[11px] text-ink md:gap-3.5">
        <span className="pr-[5px] font-serif text-[30px] leading-[.9] font-medium tracking-[-3px] short:text-[22px] md:text-[34px] short:md:text-[22px]">
          bh<span className="text-rose">.</span>
        </span>
        <span className="flex flex-col gap-0.5">
          <strong className="text-xs font-medium text-ink md:text-[13px]">Bryan Houblon</strong>
          <span className="text-[10px] text-ink-faint short:hidden max-[359px]:hidden md:text-[11px]">{t('job')}</span>
        </span>
      </ChapterLink>

      <div className="hidden items-center gap-2 font-mono text-[11px] text-ink-soft lg:flex">
        <span className="h-[5px] w-[5px] rounded-full bg-[#6e7c5b] shadow-[0_0_0_4px_#6e7c5b10]" />
        Paris, France
      </div>

      <nav aria-label={t('links')} className="flex items-center gap-3.5 text-xs md:gap-[26px]">
        <Link
          href={{ pathname: '/', hash: hash.slice(1) || undefined }}
          locale={otherLocale}
          aria-label={t('switchLocale')}
          className="border-b border-ink-faint font-mono text-[11px]"
        >
          {t('otherLocale')}
        </Link>
        <ThemeToggle label={t('theme')} className="inline-flex size-7 cursor-pointer items-center justify-center [&_svg]:size-4" />
        <a href={book('resumeFile')} download className="flex items-center gap-[7px] whitespace-nowrap">
          <ArrowDownToLine size={14} />
          <span>{t('resume')}</span>
        </a>
        <ChapterLink
          chapter={chapters.length - 1}
          aria-label={t('contact')}
          className="flex items-center gap-[13px] border border-paper-line p-1.5 transition-colors hover:bg-paper-line/60 md:px-[15px] md:py-[9px]"
        >
          <span className="hidden md:inline">{t('contact')}</span>
          <ArrowUpRight size={15} />
        </ChapterLink>
      </nav>
    </header>
  )
}
