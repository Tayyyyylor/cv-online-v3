'use client'

import { useTranslations } from 'next-intl'
import BookPage from '@/components/molecules/book/BookPage'
import { richTitle } from '@/components/molecules/book/BookText'

export default function ContactCoverPage() {
  const t = useTranslations('Book.contactCover')
  const contact = useTranslations('Contact')

  return (
    <BookPage head={t('head')} foot={t('foot')} paper="bg-wine" dark labelledBy="contact-title">
      <h2
        id="contact-title"
        className="mt-[10cqw] mb-[6cqw] font-serif text-[clamp(26px,12.2cqw,76px)] leading-[1.1] font-normal tracking-[-.03em] text-[#e7d6b9] [&_em]:font-light [&_em]:text-[#dfbd8a]"
      >
        {t.rich('title', richTitle)}
      </h2>
      <div className="mb-[4cqw] h-px w-[10cqw] bg-[#d4b28e8a]" />
      <p className="max-w-[50cqw] text-[clamp(11px,2.4cqw,15.5px)] leading-[1.6] text-[#dcc6bc] @max-[300px]:max-w-none">{contact('desc')}</p>
    </BookPage>
  )
}
