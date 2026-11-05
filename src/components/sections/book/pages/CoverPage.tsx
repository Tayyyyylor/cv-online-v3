'use client'

import { ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useBook } from '@/components/molecules/book/BookContext'
import { richTitle } from '@/components/molecules/book/BookText'
import CoverFrame, { coverButton } from '@/components/molecules/book/CoverFrame'

const drawnBooks = [
  { key: 'ideas', className: 'top-[4.4cqw] right-[3.8cqw] w-[28cqw] rotate-6 bg-[#caa37d]' },
  { key: 'code', className: 'top-[12.4cqw] right-[.7cqw] w-[34.4cqw] -rotate-5 bg-[#b3b6a0]' },
  { key: 'curiosity', className: 'top-[20.5cqw] right-[2.5cqw] w-[39cqw] rotate-1 bg-[#e2c995]' },
] as const

function CoverIllustration() {
  const t = useTranslations('Book.cover')

  return (
    <div aria-hidden="true" className="absolute right-[3.6cqw] bottom-[26cqw] h-[35.3cqw] w-[46cqw] origin-bottom-right scale-[.86] -rotate-9 [@container(max-width:300px)_and_(min-aspect-ratio:2/3)]:hidden">
      <div className="absolute -top-[3cqw] right-[.5cqw] size-[35.6cqw] rounded-full border border-[#d6b58a3d] after:absolute after:inset-x-[-2.2cqw] after:inset-y-[2.2cqw] after:-rotate-[26deg] after:rounded-full after:border after:border-[#d6b58a24]" />
      {drawnBooks.map(({ key, className }) => (
        <div
          key={key}
          className={`absolute flex h-[6.9cqw] items-center rounded-[3px_1px_1px_3px] border border-[#f5e5bd90] pl-[3.6cqw] font-serif text-[max(2.7cqw,calc(11px/var(--closed-zoom)))] italic text-[#403e31] shadow-[0_.5cqw_0_#372728] before:absolute before:inset-y-0 before:left-[1.6cqw] before:w-[.7cqw] before:border-x before:border-[#3e352345] after:absolute after:right-0 after:h-full after:w-[2.9cqw] after:border-l after:border-[#9c8c6d] after:bg-[repeating-linear-gradient(0deg,#d3c4a7_0_1px,#efe4ce_1px_4px)] ${className}`}
        >
          <span>{t(key)}</span>
        </div>
      ))}
      <span className="absolute right-[2.2cqw] bottom-0 font-serif text-[max(2.2cqw,calc(9.5px/var(--closed-zoom)))] italic text-[#d9bfa5]">{t('caption')}</span>
    </div>
  )
}

export default function CoverPage() {
  const t = useTranslations('Book.cover')
  const nav = useTranslations('Book.nav')
  const { goToChapter } = useBook()

  return (
    <CoverFrame
      labelledBy="cover-title"
      kicker={t('kicker')}
      title="Bryan Houblon"
      bottomLeft={t('role')}
      bottomRight={t('volume')}
    >
      <h1
        id="cover-title"
        className="relative z-1 mt-[6.8cqw] mb-[3.8cqw] font-serif text-[15.5cqw] leading-[.99] font-normal tracking-[-.035em] [&_em]:font-light [&_em]:text-gold"
      >
        {t.rich('title', richTitle)}
      </h1>
      <div className="mb-[3.2cqw] h-px w-[8cqw] bg-[#d4b28e8a]" />
      <p className="relative z-1 max-w-[64cqw] text-[max(2.3cqw,calc(12.5px/var(--closed-zoom)))] leading-[1.6] text-[#dcc6bc]">{t('description')}</p>
      <CoverIllustration />
      <button type="button" className={`${coverButton} bottom-[13.6cqw]`} onClick={() => goToChapter(0)}>
        {nav('open')}
        <ArrowRight className="size-[1.4em] shrink-0 transition-transform group-hover:translate-x-1" />
      </button>
    </CoverFrame>
  )
}
