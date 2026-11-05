'use client'

import { useTranslations } from 'next-intl'
import type { ReactNode } from 'react'
import BookPage from '@/components/molecules/book/BookPage'

type ProjectVisualPageProps = {
  name: string
  paper: string
  note: string
  noteColor: string
  circle: string
  sticker: ReactNode
  stickerStyle: string
  decoration: ReactNode
  phoneTilt: string
  screen: ReactNode
  action: ReactNode
  caption: string
}

export const phoneScreen = 'block h-full w-full rounded-[4.4cqw] bg-[#181b17] object-cover object-top'

export default function ProjectVisualPage({
  name,
  paper,
  note,
  noteColor,
  circle,
  sticker,
  stickerStyle,
  decoration,
  phoneTilt,
  screen,
  action,
  caption,
}: ProjectVisualPageProps) {
  const t = useTranslations('Book.visual')

  return (
    <BookPage
      head={t('personal')}
      aside={<span className="text-right">{t('work')}</span>}
      foot={t('foot')}
      paper={paper}
      label={name}
    >
      <div className="relative flex min-h-0 flex-1 items-center justify-center">
        <span className={`absolute top-[3.4cqw] right-0 z-1 rotate-6 font-serif text-[clamp(11px,3.3cqw,20px)] italic ${noteColor}`}>{note}</span>
        <div className={`absolute top-1/2 left-1/2 aspect-square w-[min(53cqw,85cqw)] -translate-x-1/2 -translate-y-1/2 rounded-full ${circle}`} />
        {decoration}
        <div className={`relative z-2 mt-[3.8cqw] aspect-[202/424] h-[min(64cqh,122cqw)] shrink-0 overflow-hidden rounded-[5.2cqw] bg-[#242520] p-[.9cqw] shadow-[0_0_0_1px_#77796e,.9cqw_1.2cqw_0_-.7cqw_#4b4d42,2.7cqw_4.5cqw_5cqw_-2.2cqw_#32332350] ${phoneTilt}`}>
          {screen}
        </div>
        <span className={`absolute z-3 flex aspect-square w-[15.4cqw] flex-col items-center justify-center rounded-full text-center font-serif text-[2.4cqw] leading-[1.15] italic shadow-[2px_3px_5px_#5a493318] @max-[360px]:hidden [&_svg]:mb-[.6cqw] [&_svg]:size-[3.4cqw] ${stickerStyle}`}>
          {sticker}
        </span>
      </div>
      <div className="relative z-3 pt-[2.2cqw] pb-[1.2cqw] text-center">
        {action}
        <p className="mt-[1.4cqw] text-[clamp(9.5px,1.8cqw,12px)] text-ink-faint @max-[300px]:hidden">{caption}</p>
      </div>
    </BookPage>
  )
}
