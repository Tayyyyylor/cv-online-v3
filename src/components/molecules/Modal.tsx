'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter } from '@/i18n/navigation'
import { ArrowLeft } from 'lucide-react'
import { sheetBackButton, sheetOrigin } from '@/components/sections/projects/sheetStyles'

const CLOSE_DURATION = 480

export default function Modal({ children }: { children: ReactNode }) {
  const router = useRouter()
  const t = useTranslations('Modal')
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const [closing, setClosing] = useState(false)
  const [origin] = useState(() => ({ '--sheet-x': sheetOrigin.x, '--sheet-y': sheetOrigin.y }) as CSSProperties)

  const close = useCallback(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      router.back()
      return
    }
    setClosing(true)
    closeTimer.current = setTimeout(() => router.back(), CLOSE_DURATION)
  }, [router])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    const previousFocus = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null
    const focusableElements = () => Array.from(dialog.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), video[controls], [tabindex]:not([tabindex="-1"])',
    )).filter((element) => element.getClientRects().length > 0)

    dialog.focus({ preventScroll: true })

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        e.stopPropagation()
        close()
        return
      }
      if (e.key !== 'Tab') return

      const elements = focusableElements()
      const first = elements[0]
      const last = elements[elements.length - 1]
      if (!first || !last) {
        e.preventDefault()
      } else if (e.shiftKey && (document.activeElement === first || document.activeElement === dialog)) {
        e.preventDefault()
        last.focus({ preventScroll: true })
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus({ preventScroll: true })
      }
    }
    document.addEventListener('keydown', onKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      clearTimeout(closeTimer.current)
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true })
    }
  }, [close])

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={t('label')}
      tabIndex={-1}
      data-closing={closing}
      style={origin}
      className="sheet-reveal fixed inset-0 z-50 overflow-y-auto overscroll-contain outline-none"
    >
      <button type="button" onClick={close} className={sheetBackButton}>
        <ArrowLeft className="size-4" aria-hidden="true" />
        {t('close')}
      </button>
      {children}
    </div>
  )
}
