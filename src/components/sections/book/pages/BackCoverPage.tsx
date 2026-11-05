'use client'

import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useBook } from '@/components/molecules/book/BookContext'
import CoverFrame, { coverButton } from '@/components/molecules/book/CoverFrame'
import { EMAIL } from './ContactPage'

export default function BackCoverPage() {
  const t = useTranslations('Book.backCover')
  const { goToChapter } = useBook()

  return (
    <CoverFrame
      labelledBy="back-cover-title"
      kicker="Bryan Houblon"
      title={t('topline')}
      bottomLeft={t('place')}
      bottomRight={t('volume')}
    >
      <h2
        id="back-cover-title"
        className="relative z-1 mt-[25cqw] mb-[3.8cqw] font-serif text-[12.4cqw] leading-[1.13] font-light tracking-[-.04em] text-gold italic"
      >
        {t('title')}
      </h2>
      <p className="relative z-1 max-w-[64cqw] text-[max(2.3cqw,calc(12.5px/var(--closed-zoom)))] leading-[1.6] text-[#dcc6bc]">{t('description')}</p>
      <a className={`${coverButton} bottom-[25cqw]`} href={`mailto:${EMAIL}`}>
        {t('write')}
        <ArrowUpRight className="size-[1.4em] shrink-0" />
      </a>
      <button
        type="button"
        onClick={() => goToChapter(0)}
        className="absolute bottom-[15.6cqw] left-[7.8cqw] z-3 inline-flex items-center gap-[3.4cqw] border-b border-[#d6b58a75] pb-[1.2cqw] text-[max(2cqw,calc(11.5px/var(--closed-zoom)))] text-[#dfc6a3] transition-[gap] hover:gap-[4.8cqw]"
      >
        {t('restart')}
        <ArrowRight className="size-[1.4em]" />
      </button>
    </CoverFrame>
  )
}
