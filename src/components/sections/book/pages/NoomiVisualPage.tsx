'use client'

import Image from 'next/image'
import { Sparkles } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useBook } from '@/components/molecules/book/BookContext'
import { richTitle } from '@/components/molecules/book/BookText'
import ProjectLinks from '@/components/molecules/ProjectLinks'
import ProjectVisualPage, { phoneScreen } from './ProjectVisualPage'

export default function NoomiVisualPage() {
  const t = useTranslations('Book.noomi')
  const links = useBook().projects.find(({ id }) => id === 'noomi')?.links ?? []

  return (
    <ProjectVisualPage
      name="Noomi"
      paper="bg-paper-lilac"
      note={t('note')}
      noteColor="text-lilac-ink"
      circle="bg-[#c4b1da40]"
      sticker={<><Sparkles /><span>{t.rich('sticker', richTitle)}</span></>}
      stickerStyle="top-[13.6cqw] left-px -rotate-12 bg-[#d5c4e5] text-[#665178]"
      decoration={
        <Image
          src="/noomi-mascot.svg"
          width={120}
          height={140}
          alt=""
          loading="eager"
          className="absolute bottom-[9.4cqw] -left-[1cqw] z-3 h-auto w-[21cqw] -rotate-12"
        />
      }
      phoneTilt="rotate-5"
      screen={<Image className={phoneScreen} src="/noomi-home.png" width={390} height={844} loading="eager" alt={t('alt')} sizes="280px" />}
      action={<ProjectLinks links={links} compact />}
      caption={t('caption')}
    />
  )
}
