'use client'

import { useEffect, useImperativeHandle, useLayoutEffect, useRef } from 'react'
import type { ReactNode, Ref } from 'react'
import { createBookEngine, type BookEngine } from './bookEngine'
import styles from './PhysicalBook.module.css'

export type PhysicalBookHandle = Pick<BookEngine, 'goTo' | 'next' | 'previous' | 'getPosition'>

type PhysicalBookProps = {
  ref: Ref<PhysicalBookHandle>
  /** Faces du livre dans l'ordre : recto puis verso de chaque feuille. */
  faces: ReactNode[]
  label: string
  reducedMotion: boolean
  getStartPosition: () => number
  onPositionChange: (position: number) => void
  /** Éléments accrochés au livre, comme les onglets. */
  children?: ReactNode
}

export default function PhysicalBook({ ref, faces, label, children, ...settings }: PhysicalBookProps) {
  const book = useRef<HTMLDivElement>(null)
  const sheets = useRef<HTMLDivElement>(null)
  const castLeft = useRef<HTMLDivElement>(null)
  const castRight = useRef<HTMLDivElement>(null)
  const engine = useRef<BookEngine | null>(null)
  const latest = useRef(settings)
  const leafCount = faces.length / 2

  useEffect(() => {
    latest.current = settings
  })

  useImperativeHandle(ref, () => ({
    goTo: (position, instant) => engine.current?.goTo(position, instant),
    next: () => engine.current?.next(),
    previous: () => engine.current?.previous(),
    getPosition: () => engine.current?.getPosition() ?? 0,
  }), [])

  useLayoutEffect(() => {
    if (!book.current || !sheets.current || !castLeft.current || !castRight.current) return
    const instance = createBookEngine({
      book: book.current,
      leaves: [...book.current.querySelectorAll<HTMLElement>(`:scope > .${styles.leaf}`)],
      sheets: sheets.current,
      castLeft: castLeft.current,
      castRight: castRight.current,
      isReducedMotion: () => latest.current.reducedMotion,
      onPositionChange: (position) => latest.current.onPositionChange(position),
    })
    engine.current = instance
    instance.goTo(latest.current.getStartPosition(), true)
    return () => {
      instance.destroy()
      engine.current = null
    }
  }, [leafCount])

  return (
    <div className={styles.stage} role="group" aria-label={label}>
      <div className={styles.scene}>
        <div ref={book} className={styles.book} data-physical-book>
          <div className={styles.thickLeft} />
          <div className={styles.thickRight} />
          <div className={styles.fanLeft} />
          <div className={styles.fanRight} />
          {Array.from({ length: leafCount }, (_, leaf) => {
            const board = leaf === 0 ? 'front' : leaf === leafCount - 1 ? 'back' : undefined
            return (
              <div key={leaf} className={`${styles.leaf} ${board ? styles.board : ''}`} data-board={board}>
                <div className={styles.front}>{faces[leaf * 2]}</div>
                <div className={styles.back}>{faces[leaf * 2 + 1]}</div>
                {board && <div className={styles.edge} />}
              </div>
            )
          })}
          <div ref={castLeft} className={styles.castLeft} />
          <div ref={castRight} className={styles.castRight} />
          <div ref={sheets} className={styles.sheets} aria-hidden="true" inert />
          {children}
        </div>
      </div>
    </div>
  )
}
