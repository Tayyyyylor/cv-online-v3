'use client'

import { useTranslations } from 'next-intl'
import { useBook } from './BookContext'
import ChapterLink from './ChapterLink'

type BookmarksProps = {
  /** Position du livre : les onglets déjà passés se retrouvent à gauche. */
  position: number
  firstSpreads: number[]
  activeChapter: number | null
}

/** Onglets collés à la tranche du livre, sur ordinateur. */
export default function Bookmarks({ position, firstSpreads, activeChapter }: BookmarksProps) {
  const t = useTranslations('Book')
  const { chapters } = useBook()
  const step = 0.9 / chapters.length

  return (
    <nav aria-label={t('nav.chapters')} className="hidden short:block no-js:hidden md:block">
      {chapters.map(({ id, tab }, index) => {
        const left = position > firstSpreads[index]
        const active = activeChapter === index
        const edge = 'var(--page-w) + var(--rim)'
        const reach = active ? '0px' : '-7px'
        return (
          <ChapterLink
            key={id}
            chapter={index}
            aria-current={active ? 'page' : undefined}
            style={{
              top: `calc(var(--page-h) * ${0.05 + index * step})`,
              height: `calc(var(--page-h) * ${step * 0.92})`,
              transform: left
                ? `translateX(calc(-1 * (${edge}) - 100% - ${reach}))`
                : `translateX(calc(${edge} + ${reach}))`,
            }}
            className={`absolute left-1/2 -z-1 flex w-[44px] items-center justify-center whitespace-nowrap text-[clamp(9px,1.4vh,11px)] transition-transform duration-700 ease-[cubic-bezier(.22,.7,.2,1)] [text-orientation:sideways] [writing-mode:vertical-rl] hover:saturate-[1.2] ${left ? 'rounded-l' : 'rounded-r'} ${tab}`}
          >
            <span className="short:hidden">{t(`chapters.${id}.label`)}</span>
            <span className="hidden short:inline">{t.has(`chapters.${id}.short`) ? t(`chapters.${id}.short`) : t(`chapters.${id}.label`)}</span>
          </ChapterLink>
        )
      })}
    </nav>
  )
}
