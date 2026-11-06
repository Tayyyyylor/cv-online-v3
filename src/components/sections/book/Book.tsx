'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { BookContext, type BookProject } from '@/components/molecules/book/BookContext'
import BookControls from '@/components/molecules/book/BookControls'
import BookHeader from '@/components/molecules/book/BookHeader'
import Bookmarks from '@/components/molecules/book/Bookmarks'
import ChapterBar from '@/components/molecules/book/ChapterBar'
import PhysicalBook, { type PhysicalBookHandle } from '@/components/molecules/book/PhysicalBook'
import useReducedMotion from '@/hooks/useReducedMotion'
import { chapterAt, chapters, faces, firstSpreads, folioCount, hashOf, isClosed, lastPosition, positionOfHash } from './book.data'

const getStartPosition = () => positionOfHash(window.location.hash) ?? 0

export default function Book({ projects }: { projects: BookProject[] }) {
  const t = useTranslations('Book')
  const reducedMotion = useReducedMotion()
  const book = useRef<PhysicalBookHandle>(null)
  const [position, setPosition] = useState(0)
  const [selectedClient, setSelectedClient] = useState(0)

  const goToChapter = useCallback((chapter: number) => book.current?.goTo(firstSpreads[chapter]), [])

  const onPositionChange = useCallback((next: number) => {
    setPosition(next)
    const hash = hashOf(next)
    if (window.location.hash === hash) return
    const { pathname, search } = window.location
    window.history.pushState(null, '', `${pathname}${search}${hash}`)
  }, [])

  useEffect(() => {
    const bookPath = window.location.pathname
    const onPopState = () => {
      // La modale projet change l'URL sans démonter le livre.
      if (window.location.pathname !== bookPath || !book.current) return
      const target = positionOfHash(window.location.hash)
      if (target !== null && hashOf(target) !== hashOf(book.current.getPosition())) book.current.goTo(target)
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
      if (event.altKey || event.metaKey || event.ctrlKey || event.shiftKey) return
      if (document.querySelector('[aria-modal="true"]')) return
      event.preventDefault()
      if (event.key === 'ArrowRight') book.current?.next()
      else book.current?.previous()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const context = useMemo(
    () => ({ chapters, folioCount, projects, goToChapter, selectedClient, selectClient: setSelectedClient }),
    [projects, goToChapter, selectedClient],
  )

  const closed = isClosed(position)
  const activeChapter = closed ? null : chapterAt(position)
  const place = closed
    ? t(position === 0 ? 'nav.cover' : 'nav.backCover')
    : t(`chapters.${chapters[chapterAt(position)].id}.label`)

  return (
    <BookContext value={context}>
      <div
        data-portfolio-book
        className="flex h-svh flex-col overflow-hidden overscroll-none bg-room no-js:h-auto no-js:overflow-visible bg-[radial-gradient(ellipse_at_50%_32%,var(--color-room-glow)_0%,transparent_65%)] px-2 font-sans text-ink md:px-8 xl:px-14"
      >
        <a href="#book-content" className="fixed -top-20 left-5 z-100 bg-wine px-5 py-3 text-white focus:top-3">
          {t('skip')}
        </a>
        <BookHeader hash={hashOf(position)} />

        <main className="relative flex min-h-0 flex-1 flex-col no-js:block">
          <span role="status" className="sr-only">
            {t('nav.status', { place, page: position + 1, total: lastPosition + 1 })}
          </span>
          <div id="book-content" tabIndex={-1} className="mx-auto min-h-0 w-full max-w-[1500px] flex-1 py-2 outline-none short:px-9 short:py-1.5 no-js:flex-none md:py-3">
            <PhysicalBook
              ref={book}
              faces={faces}
              label={t('label')}
              reducedMotion={reducedMotion}
              getStartPosition={getStartPosition}
              onPositionChange={onPositionChange}
            >
              <Bookmarks position={position} firstSpreads={firstSpreads} activeChapter={activeChapter} />
            </PhysicalBook>
          </div>
          <ChapterBar activeChapter={activeChapter} />
          <BookControls
            position={position}
            lastPosition={lastPosition}
            activeChapter={activeChapter}
            place={place}
            onPrevious={() => book.current?.previous()}
            onNext={() => book.current?.next()}
            onClose={() => book.current?.goTo(0)}
          />
        </main>
      </div>
    </BookContext>
  )
}
