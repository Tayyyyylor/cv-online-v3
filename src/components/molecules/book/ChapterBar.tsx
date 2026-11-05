'use client'

import { useTranslations } from 'next-intl'
import { useBook } from './BookContext'
import ChapterLink from './ChapterLink'

/** Onglets du livre sur téléphone, où la tranche n'a pas la place de les porter. */
export default function ChapterBar({ activeChapter }: { activeChapter: number | null }) {
  const t = useTranslations('Book.chapters')
  const nav = useTranslations('Book.nav')
  const { chapters } = useBook()

  return (
    <nav aria-label={nav('chapters')} className="flex h-9 shrink-0 items-end gap-[3px] short:hidden md:hidden">
      {chapters.map(({ id, tab }, index) => {
        const active = activeChapter === index
        return (
          <ChapterLink
            key={id}
            chapter={index}
            aria-current={active ? 'page' : undefined}
            className={`flex min-w-0 flex-1 items-center justify-center rounded-t px-0.5 text-[10.5px] transition-[height] duration-200 ${tab} ${active ? 'h-9 font-medium' : 'h-[30px]'}`}
          >
            <span className="truncate">{t.has(`${id}.short`) ? t(`${id}.short`) : t(`${id}.label`)}</span>
          </ChapterLink>
        )
      })}
    </nav>
  )
}
