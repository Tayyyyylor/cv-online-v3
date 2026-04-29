'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

type AnimatedWordProps = {
  words: string[]
  intervalMs?: number
  className?: string
}

export default function AnimatedWord({
  words,
  intervalMs = 2200,
  className,
}: AnimatedWordProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (words.length <= 1) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length)
    }, intervalMs)
    return () => clearInterval(id)
  }, [words.length, intervalMs])

  return (
    <span
      className={`relative inline-block overflow-hidden align-bottom leading-[1.2] pb-[0.15em] ${className ?? ''}`}
    >
      <span aria-hidden className="invisible whitespace-pre">
        {words.reduce((a, b) => (a.length >= b.length ? a : b), '')}
      </span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[index]}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 whitespace-pre"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
