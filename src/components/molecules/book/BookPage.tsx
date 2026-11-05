'use client'

import { use } from 'react'
import type { ReactNode } from 'react'
import { FaceContext } from './BookContext'

type BookPageProps = {
  children: ReactNode
  head: ReactNode
  /** Remplace le numéro de chapitre en haut à droite. */
  aside?: ReactNode
  foot: ReactNode
  /** Couleur du papier, `bg-paper` par défaut. */
  paper?: string
  /** Texte clair pour les pages sur fond sombre. */
  dark?: boolean
  label?: string
  labelledBy?: string
}

const pageLabel = 'font-mono text-[clamp(8px,1.65cqw,10.5px)] uppercase tracking-[.12em]'

export default function BookPage({
  children,
  head,
  aside,
  foot,
  paper = 'bg-paper',
  dark = false,
  label,
  labelledBy,
}: BookPageProps) {
  const { folio, chapter } = use(FaceContext)
  const labels = dark ? 'text-[#d3b6a8]' : 'text-ink-faint'

  return (
    <section
      tabIndex={-1}
      aria-label={label}
      aria-labelledby={labelledBy}
      className={`relative h-full overflow-hidden outline-none [container-type:size] after:paper-grain after:pointer-events-none after:absolute after:inset-0 after:opacity-11 ${paper} ${dark ? 'text-cream' : 'text-ink'}`}
    >
      <div className="flex h-full flex-col px-[6.4cqw] pt-[5.6cqw] pb-[3.4cqw]">
        <div className={`flex min-h-4 items-center justify-between gap-3 @max-[300px]:hidden ${pageLabel} ${labels}`}>
          <span>{head}</span>
          {aside ?? <span>{chapter}</span>}
        </div>
        <div className="flex min-h-0 flex-1 flex-col">{children}</div>
        <div className={`flex items-center justify-between pt-[1.6cqw] ${pageLabel} ${labels}`}>
          <span className="@max-[300px]:hidden">{foot}</span>
          <span className="font-serif text-[clamp(10px,2.2cqw,14px)] tracking-normal @max-[300px]:ml-auto">{folio}</span>
        </div>
      </div>
    </section>
  )
}
