'use client'

import { BookOpen } from 'lucide-react'
import { useTranslations } from 'next-intl'
import BookPage from '@/components/molecules/book/BookPage'
import { BookTitle, Handwritten, Lead, richTitle, Signature } from '@/components/molecules/book/BookText'

export default function WelcomePage() {
  const t = useTranslations('Book.welcome')

  return (
    <BookPage
      head={t('head')}
      aside={<BookOpen size={15} />}
      foot={t('foot')}
      paper="bg-paper-warm"
      labelledBy="welcome-title"
    >
      <Handwritten className="mt-[7.6cqw]">{t('note')}</Handwritten>
      <BookTitle id="welcome-title" className="mt-[5cqw] mb-[5.4cqw] text-[clamp(24px,11.8cqw,76px)] leading-[1.1] tracking-[-.03em]">
        {t.rich('title', richTitle)}
      </BookTitle>
      <Lead>{t('intro')}</Lead>
      <div className="my-[4.2cqw] h-px w-[8cqw] bg-[#a8875b80]" />
      <Lead className="@max-[300px]:hidden">{t('hint')}</Lead>
      <Signature className="mt-auto pb-[2.4cqw] text-left">Bryan Houblon</Signature>
    </BookPage>
  )
}
