'use client'

import { ArrowUpRight, BookOpen } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { twoDigits, useBook } from '@/components/molecules/book/BookContext'
import BookPage from '@/components/molecules/book/BookPage'
import { BookTitle, Handwritten, Lead, MonoLabel, richTitle } from '@/components/molecules/book/BookText'
import ChapterLink from '@/components/molecules/book/ChapterLink'

export default function PrefacePage() {
  const t = useTranslations('Book.preface')
  const chapterLabels = useTranslations('Book.chapters')
  const hero = useTranslations('Hero')
  const { chapters, folioCount } = useBook()

  return (
    <BookPage head={t('head')} aside={<BookOpen size={15} />} foot={t('foot')} labelledBy="preface-title">
      <Handwritten className="mt-[3.6cqw]">{t('note')}</Handwritten>
      <BookTitle
        id="preface-title"
        className="relative my-[2.4cqw] text-[clamp(23px,9.4cqw,58px)] leading-[1.12] tracking-[-.03em]"
      >
        {t.rich('title', richTitle)}
      </BookTitle>
      <Lead className="mb-[3.8cqw] max-w-[66cqw] @max-[300px]:hidden">{hero('desc')}</Lead>

      <div className="flex justify-between gap-2.5 border-b border-paper-line pb-[2cqw] @max-[300px]:hidden">
        <MonoLabel>{t('contents')}</MonoLabel>
        <MonoLabel className="tracking-[.05em]">01 – {twoDigits(folioCount - 1)}</MonoLabel>
      </div>
      <div className="flex flex-col @max-[300px]:mt-[3cqw] @max-[300px]:border-t @max-[300px]:border-paper-line">
        {chapters.map(({ id, contents }, index) => contents && (
          <ChapterLink
            key={id}
            chapter={index}
            className="flex items-center gap-[2.4cqw] border-b border-paper-line py-[2.2cqw] transition-[padding,color] hover:pl-[1cqw] hover:text-rose @max-[300px]:py-[4.4cqw]"
          >
            <span className="min-w-[2.6cqw] font-mono text-[clamp(9px,1.8cqw,11.5px)] text-ink-faint @max-[300px]:hidden">{twoDigits(index)}</span>
            <span className={`flex size-[clamp(24px,7.2cqw,46px)] shrink-0 items-center justify-center overflow-hidden rounded-[18%] border border-[#3b352515] [&_img]:size-[78%] [&_svg]:size-[52%] ${contents.tint}`}>
              {contents.icon}
            </span>
            <span className="flex min-w-0 flex-1 flex-col gap-[.9cqw]">
              <strong className="font-serif text-[clamp(13px,3.7cqw,24px)] leading-none font-normal tracking-[-.01em]">{chapterLabels(`${id}.label`)}</strong>
              <span className="text-[clamp(10px,2cqw,13px)] text-ink-faint @max-[300px]:hidden">{chapterLabels(`${id}.summary`)}</span>
            </span>
            <ArrowUpRight className="size-[clamp(13px,3.2cqw,20px)] shrink-0 text-ink-faint" />
          </ChapterLink>
        ))}
      </div>
    </BookPage>
  )
}
