'use client'

import type { ComponentProps, ReactNode } from 'react'

type ChipProps = {
  active?: boolean
  children: ReactNode
} & Omit<ComponentProps<'button'>, 'children'>

export default function Chip({ active = false, children, className = '', ...rest }: ChipProps) {
  const base =
    'cursor-pointer rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-important/60 focus-visible:ring-offset-2 focus-visible:ring-offset-(--background)'
  const state = active
    ? 'bg-important text-(--background) border border-important shadow-[0_4px_16px_-6px_var(--color-important)]'
    : 'border border-foreground/15 text-foreground/70 hover:border-important hover:text-important'

  return (
    <button className={`${base} ${state} ${className}`} {...rest}>
      {children}
    </button>
  )
}
