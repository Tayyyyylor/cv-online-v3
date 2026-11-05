'use client'

import { ArrowUpRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useBook } from '@/components/molecules/book/BookContext'
import BookPage from '@/components/molecules/book/BookPage'
import { BookTitle, Lead, richTitle } from '@/components/molecules/book/BookText'

export default function ClientsPage() {
  const t = useTranslations('Book.clients')
  const items = useTranslations('Projects.items')
  const { projects, selectedClient, selectClient } = useBook()

  return (
    <BookPage head={t('head')} foot={t('foot')} labelledBy="clients-title">
      <BookTitle id="clients-title" className="mt-[6.4cqw] mb-[3.2cqw] text-[clamp(23px,8.8cqw,54px)]">
        {t.rich('title', richTitle)}
      </BookTitle>
      <Lead className="mb-[3.6cqw] @max-[300px]:hidden">{t('intro')}</Lead>
      <div>
        {projects.filter(({ client }) => client).map(({ id, year }, index) => {
          const selected = selectedClient === index
          return (
            <button
              type="button"
              key={id}
              onClick={() => selectClient(index)}
              aria-pressed={selected}
              className={`flex w-full items-center gap-[2.2cqw] border-t border-paper-line py-[2.8cqw] text-left transition-[padding,color] last:border-b hover:pl-[1.4cqw] hover:text-rose @max-[300px]:py-[4.6cqw] ${selected ? 'pl-[1.4cqw] text-rose' : 'text-ink-soft'}`}
            >
              <span className="font-mono text-[clamp(8.5px,1.65cqw,10.5px)] text-ink-faint @max-[300px]:hidden">0{index + 1}</span>
              <span className="flex min-w-0 flex-1 flex-col gap-[.7cqw]">
                <strong className="font-serif text-[clamp(13px,4cqw,25px)] leading-[1.15] font-normal">{items(`${id}.name`)}</strong>
                <small className="text-[clamp(9.5px,1.9cqw,12px)] text-ink-faint @max-[300px]:hidden">{items(`${id}.field`)}</small>
              </span>
              <span className="font-mono text-[clamp(8.5px,1.65cqw,10.5px)] @max-[300px]:hidden">{year}</span>
              <ArrowUpRight className="size-[clamp(12px,2.9cqw,18px)] shrink-0" />
            </button>
          )
        })}
      </div>
    </BookPage>
  )
}
