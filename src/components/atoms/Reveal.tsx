'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { useMemo, type ComponentType, type ReactNode } from 'react'

type AsTag = keyof typeof motion | ComponentType<Record<string, unknown>>

function useMotionTag(as: AsTag) {
  return useMemo(() => {
    if (typeof as === 'string') return motion[as as keyof typeof motion]
    return motion.create(as)
  }, [as])
}

type RevealProps = {
  children: ReactNode
  as?: AsTag
  delay?: number
  duration?: number
  y?: number
  x?: number
  once?: boolean
  amount?: number
  immediate?: boolean
  className?: string
  id?: string
}

export default function Reveal({
  children,
  as = 'div',
  delay = 0,
  duration = 0.7,
  y = 24,
  x = 0,
  once = true,
  amount = 0.2,
  immediate = false,
  className,
  id,
}: RevealProps) {
  const reduce = useReducedMotion()
  const MotionTag = useMotionTag(as) as React.ElementType

  const variants: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y, x },
    show: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: reduce ? 0 : duration,
        delay: reduce ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const animationProps = immediate
    ? { initial: 'hidden', animate: 'show' }
    : { initial: 'hidden', whileInView: 'show', viewport: { once, amount } }

  return (
    <MotionTag id={id} className={className} variants={variants} {...animationProps}>
      {children}
    </MotionTag>
  )
}

type StaggerProps = {
  children: ReactNode
  as?: AsTag
  stagger?: number
  delay?: number
  once?: boolean
  amount?: number
  immediate?: boolean
  className?: string
}

export function RevealStagger({
  children,
  as = 'div',
  stagger = 0.08,
  delay = 0,
  once = true,
  amount = 0.2,
  immediate = false,
  className,
}: StaggerProps) {
  const reduce = useReducedMotion()
  const MotionTag = useMotionTag(as) as React.ElementType

  const variants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : stagger,
        delayChildren: reduce ? 0 : delay,
      },
    },
  }

  const animationProps = immediate
    ? { initial: 'hidden', animate: 'show' }
    : { initial: 'hidden', whileInView: 'show', viewport: { once, amount } }

  return (
    <MotionTag className={className} variants={variants} {...animationProps}>
      {children}
    </MotionTag>
  )
}

type ItemProps = {
  children: ReactNode
  as?: AsTag
  y?: number
  x?: number
  duration?: number
  className?: string
}

export function RevealItem({
  children,
  as = 'div',
  y = 20,
  x = 0,
  duration = 0.6,
  className,
}: ItemProps) {
  const reduce = useReducedMotion()
  const MotionTag = useMotionTag(as) as React.ElementType

  const variants: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y, x },
    show: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: reduce ? 0 : duration,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <MotionTag className={className} variants={variants}>
      {children}
    </MotionTag>
  )
}
