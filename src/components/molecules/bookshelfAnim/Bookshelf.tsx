'use client'

import { useTranslations } from 'next-intl'
import { BookType } from '../../../../types/global'
import { Book } from './Book'

export function Bookshelf() {

  const t = useTranslations("Hero.Books")

  const books: BookType[] = [
    {
    id: 'spinoza-ethique',
    title: t('title1'),
    author: 'Spinoza',
    color: '#6B4423',
    height: 92,
    width: 38,
    quote: 'La béatitude n\'est pas le prix de la vertu, mais la vertu même.',
  },
  {
    id: 'camus-etranger',
   title: t('title2'),
    author: 'Camus',
    color: '#1F2A44',
    height: 85,
    width: 36,
  },
  {
    id: 'schopenhauer-douleurs',
    title: t('title3'),
    author: 'Schopenhauer',
    color: '#8B5A3C',
    
    height: 95,
    width: 34,
  },
   {
    id: 'dostoievski-idiot',
    title: t('title4'),
    author: 'Dostoïevski',
    color: '#8B2E2E',
    height: 70,
    width: 40,
  },
  
  {
    id: 'wilde-dorian',
   title: t('title5'),
    author: 'Wilde',
    color: '#2D4A3E',
    height: 100,
    width: 36,
  },
  {
    id: 'platon-banquet',
    title: t('title6'),
    author: 'Platon',
    color: '#7A2E2E',
    height: 65,
    width: 32,
  },
  {
    id: 'bergson-rire',
    title: t('title7'),
    author: 'Bergson',
    color: '#D4A574',
    textColor: '#1a1a1a',
    height: 82,
    width: 42,
  },
  {
    id: 'kafka-proces',
    title: t('title8'),
    author: 'Kafka',
    color: '#2A2D5C',
    height: 75,
    width: 34,
  },
   {
    id: 'aurele-pensées',
    title: t('title9'),
    author: 'Aurèle',
    color: '#A8895C',
    textColor: '#1a1a1a',
      height: 88,
    width: 38,
  },
  ]
  return (
    <div className="relative w-[80%] md:w-full max-w-2xl mx-auto select-none">
      <div className="relative">
        <div
          className="absolute inset-0 -z-10 blur-3xl opacity-20"
          style={{
            background:
              'radial-gradient(ellipse at center, var(--color-ambre) 0%, transparent 60%)',
          }}
        />

        <div className="flex items-end justify-center gap-[3px] h-[310px] px-4 lg:h-[420px]">
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