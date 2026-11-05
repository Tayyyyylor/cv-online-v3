'use client'

import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useBook } from '@/components/molecules/book/BookContext'
import BookPage from '@/components/molecules/book/BookPage'
import { BookLink, Lead, TechChips } from '@/components/molecules/book/BookText'

export default function ClientPreviewPage() {
  const t = useTranslations('Book.clientPreview')
  const items = useTranslations('Projects.items')
  const { projects, selectedClient } = useBook()
  const { id, image, stack } = projects.filter(({ client }) => client)[selectedClient]
  const name = items(`${id}.name`)

  return (
    <BookPage head={t('head')} aside={<ExternalLink size={14} />} foot={name} paper="bg-paper-stone" label={t('label', { name })}>
      <div className="mt-[9cqw] -mx-[2cqw] rotate-2 overflow-hidden rounded-[.9cqw] border border-paper-line bg-paper-shade shadow-[0_2.6cqw_4.4cqw_#54493618]">
        <div className="relative flex items-center gap-[.7cqw] px-[1.6cqw] py-[1.4cqw]">
          <span className="size-[.8cqw] rounded-full bg-[#b4ad9b]" />
          <span className="size-[.8cqw] rounded-full bg-[#b4ad9b]" />
          <span className="size-[.8cqw] rounded-full bg-[#b4ad9b]" />
          <small className="flex-1 truncate pr-[4cqw] text-center font-mono text-[clamp(8px,1.6cqw,10px)] text-ink-faint">{name}</small>
        </div>
        <div className="relative aspect-16/11">
          {image && <Image src={image} alt={t('alt', { name })} fill sizes="(max-width: 760px) 50vw, 640px" className="object-cover" />}
        </div>
      </div>
      <div className="mt-[6cqw] flex min-h-0 flex-1 flex-col">
        <h3 className="mb-[1.8cqw] font-serif text-[clamp(16px,5.8cqw,36px)] leading-[1.15] font-normal">{name}</h3>
        <Lead className="mb-[2.4cqw] @max-[300px]:line-clamp-3">{items(`${id}.description`)}</Lead>
        <TechChips stack={stack} className="mb-[3.2cqw] @max-[420px]:hidden" />
        <div className="mt-auto flex pb-[1.6cqw] @min-[301px]:mt-0">
          <BookLink href={`/projects/${id}`}>{t('link')}</BookLink>
        </div>
      </div>
    </BookPage>
  )
}
