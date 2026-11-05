'use client'

import { useTranslations } from 'next-intl'
import type { ReactNode } from 'react'
import { useBook } from '@/components/molecules/book/BookContext'
import BookPage from '@/components/molecules/book/BookPage'
import { BookLink, BookTitle, Lead, MonoLabel, richTitle, TechChips } from '@/components/molecules/book/BookText'

type ProjectStoryPageProps = {
  /** Identifiant dans `projects.data.tsx`, textes dans `Book.stories.<id>`. */
  id: string
  wordmark: ReactNode
}

export default function ProjectStoryPage({ id, wordmark }: ProjectStoryPageProps) {
  const t = useTranslations(`Book.stories.${id}`)
  const story = useTranslations('Book.story')
  const stack = useBook().projects.find((project) => project.id === id)?.stack ?? []

  return (
    <BookPage head={t('head')} foot={t('foot')} labelledBy={`${id}-title`}>
      <div className="mt-[4.6cqw] mb-[3.6cqw] flex min-h-[6.4cqw] items-center gap-[3cqw]">
        {wordmark}
        <span className="max-w-[24cqw] border-l border-paper-line pl-[2.2cqw] font-mono text-[clamp(8px,1.65cqw,10.5px)] leading-[1.5] tracking-[.08em] text-ink-faint uppercase @max-[300px]:hidden">
          {t('tagline')}
        </span>
      </div>
      <BookTitle id={`${id}-title`} className="mb-[3.2cqw] text-[clamp(19px,8.3cqw,52px)]">
        {t.rich('title', richTitle)}
      </BookTitle>
      <Lead className="mb-[3.2cqw] @max-[170px]:line-clamp-5">{t('intro')}</Lead>
      <div className="mb-[2.8cqw] @max-[300px]:hidden">
        <MonoLabel>01 / {story('experience')}</MonoLabel>
        <p className="mt-[1.4cqw] text-[clamp(10.5px,2.2cqw,14px)] leading-[1.6] text-ink-soft">{t('experience')}</p>
      </div>
      <div className="mb-[2.8cqw] @max-[420px]:hidden">
        <MonoLabel>02 / {story('technical')}</MonoLabel>
        <p className="mt-[1.4cqw] text-[clamp(10.5px,2.2cqw,14px)] leading-[1.6] text-ink-soft">{t('technical')}</p>
      </div>
      <TechChips stack={stack} className="mt-[.6cqw] mb-[3.2cqw]" />
      <div className="mt-auto flex pb-[1.6cqw] @min-[421px]:mt-0">
        <BookLink href={`/projects/${id}`}>{story('openProject')}</BookLink>
      </div>
    </BookPage>
  )
}
