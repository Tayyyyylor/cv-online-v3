'use client'

import { ArrowLeft, ArrowRight, Hand, RotateCcw } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useBook } from './BookContext'

type BookControlsProps = {
  position: number
  lastPosition: number
  /** `null` quand le livre est fermé. */
  activeChapter: number | null
  place: string
  onPrevious: () => void
  onNext: () => void
  onClose: () => void
}

const pageButton =
  'inline-flex items-center gap-[7px] py-2 text-xs text-ink-soft short:pointer-events-auto short:p-3 enabled:hover:text-rose disabled:text-ink-faint/60 disabled:opacity-55 md:gap-2.5'

export default function BookControls({
  position,
  lastPosition,
  activeChapter,
  place,
  onPrevious,
  onNext,
  onClose,
}: BookControlsProps) {
  const t = useTranslations('Book')
  const { chapters, goToChapter } = useBook()

  return (
    <div className="mx-auto flex w-full max-w-[1180px] shrink-0 items-center justify-between gap-3 py-1.5 short:pointer-events-none short:absolute short:inset-x-0 short:top-1/2 short:-translate-y-1/2 short:py-0 md:py-2">
      <button type="button" className={pageButton} onClick={onPrevious} disabled={position === 0} aria-label={t('nav.previous')}>
        <ArrowLeft size={17} />
        <span className="hidden short:hidden md:inline">{t('nav.previous')}</span>
      </button>

      <div className="flex min-w-0 items-center gap-3 short:hidden md:gap-5">
        <span className="hidden font-serif text-[13px] italic text-ink-faint lg:inline">{place}</span>
        <div className="hidden gap-[3px] md:flex">
          {chapters.map(({ id }, index) => {
            const active = activeChapter === index
            return (
              <button
                type="button"
                key={id}
                onClick={() => goToChapter(index)}
                aria-label={t('nav.goToChapter', { chapter: t(`chapters.${id}.label`) })}
                aria-current={active ? 'step' : undefined}
                className="flex h-7 w-6 items-center justify-center"
              >
                <span className={`h-1 rounded-full transition-[width,background-color] duration-200 ${active ? 'w-[17px] bg-rose' : 'w-1 bg-ink-faint/40'}`} />
              </button>
            )
          })}
        </div>
        <span className="flex items-center gap-1.5 truncate text-[11px] text-ink-faint md:hidden">
          <Hand size={13} className="shrink-0" />
          <span className="truncate">{t('nav.hint')}</span>
        </span>
        {activeChapter !== null && (
          <button
            type="button"
            onClick={onClose}
            aria-label={t('nav.close')}
            title={t('nav.close')}
            className="hidden text-ink-faint hover:text-rose md:block"
          >
            <RotateCcw size={13} />
          </button>
        )}
      </div>

      <button type="button" className={pageButton} onClick={onNext} disabled={position === lastPosition}>
        <span className="hidden short:hidden md:inline">{position === 0 ? t('nav.open') : t('nav.next')}</span>
        <span className="sr-only md:hidden short:md:inline">{t('nav.next')}</span>
        <ArrowRight size={17} />
      </button>
    </div>
  )
}
