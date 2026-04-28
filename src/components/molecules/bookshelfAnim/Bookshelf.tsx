'use client'

import { Book } from './Book'
import { books } from './bookshelf.data'

export function Bookshelf() {
  return (
    <div className="relative w-full max-w-2xl mx-auto select-none">
      <div className="relative">
        <div
          className="absolute inset-0 -z-10 blur-3xl opacity-20"
          style={{
            background:
              'radial-gradient(ellipse at center, var(--color-ambre) 0%, transparent 60%)',
          }}
        />

        <div className="flex items-end justify-center gap-[3px] h-[420px] px-4">
          {books.map((book, i) => (
            <Book key={book.id} book={book} index={i} />
          ))}
        </div>
      </div>

      <div
        className="h-3 w-full rounded-sm relative"
        style={{
          background:
            'linear-gradient(to bottom, var(--color-shelf-wood) 0%, var(--color-shelf-wood-dark) 100%)',
          boxShadow:
            '0 4px 12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)',
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-white/10" />
      </div>

      <div className="h-12 w-[92%] mx-auto bg-gradient-to-b from-black/40 via-black/20 to-transparent blur-md" />
    </div>
  )
}