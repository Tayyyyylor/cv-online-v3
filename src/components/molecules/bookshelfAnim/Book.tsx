'use client'

import { motion } from 'framer-motion'
import { BookType } from '../../../../types/global'

type BookProps = {
  book: BookType
  index: number
}

export function Book({ book, index }: BookProps) {
  return (
    <motion.div
      initial={{ y: 120, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        delay: index * 0.08,
        duration: 0.7,
        ease: [0.23, 1, 0.32, 1], 
      }}

      whileHover={{
        y: -28,
        rotateZ: -1.5,
        transition: { duration: 0.3, ease: 'easeOut' },
      }}
      className="relative cursor-pointer rounded-t-sm shadow-lg group will-change-transform"
      style={{
        height: `${book.height}%`,
        width: `${book.width}px`,
        backgroundColor: book.color,

        backgroundImage: `linear-gradient(
          to right,
          rgba(0,0,0,0.35) 0%,
          rgba(0,0,0,0.1) 4%,
          transparent 8%,
          transparent 92%,
          rgba(0,0,0,0.1) 96%,
          rgba(0,0,0,0.35) 100%
        )`,
      }}
    >
      <div
        className="absolute top-3 left-1/2 -translate-x-1/2 w-[2px] h-7 rounded-full"
        style={{ backgroundColor: book.textColor ?? 'rgba(255,255,255,0.4)' }}
      />

      <div
        className="absolute top-12 left-1/2 -translate-x-1/2"
        style={{ writingMode: 'vertical-rl' }}
      >
        <span
          className="font-serif italic text-sm tracking-wide whitespace-nowrap"
          style={{ color: book.textColor ?? 'rgba(255,255,255,0.85)' }}
        >
          {book.title}
        </span>
      </div>

      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2"
        style={{ writingMode: 'vertical-rl' }}
      >
        <span
          className="font-mono text-[9px] tracking-[0.2em] uppercase whitespace-nowrap"
          style={{
            color: book.textColor
              ? `${book.textColor}99`
              : 'rgba(255,255,255,0.5)',
          }}
        >
          {book.author}
        </span>
      </div>

      <div
        className="absolute -top-20 left-1/2 -translate-x-1/2 
                   pointer-events-none opacity-0 translate-y-2
                   group-hover:opacity-100 group-hover:translate-y-0
                   transition-all duration-300 ease-out
                   bg-(--color-bg-elevated) border border-white/10 
                   rounded-md px-3 py-2 whitespace-nowrap
                   shadow-xl"
      >
        <p className="font-serif italic text-(--color-text-primary) text-sm">
          {book.title}
        </p>
        <p className="font-mono text-[10px] tracking-wider uppercase text-(--color-text-muted) mt-0.5">
          {book.author}
        </p>
        <div
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 
                     w-2 h-2 rotate-45
                     bg-(--color-bg-elevated) 
                     border-r border-b border-white/10"
        />
      </div>
    </motion.div>
  )
}