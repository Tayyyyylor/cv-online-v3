'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import BookPage from '@/components/molecules/book/BookPage'
import { Signature } from '@/components/molecules/book/BookText'

export default function PortraitPage() {
  const t = useTranslations('Book.portrait')

  return (
    <BookPage head={t('head')} foot={t('foot')} paper="bg-paper-shade" label={t('label')}>
      <figure className="relative mx-[1.8cqw] mt-[7.4cqw] -rotate-5 bg-[#fffdf5] px-[2cqw] pt-[2cqw] pb-[1.6cqw] shadow-[.6cqw_1.4cqw_2.8cqw_#4f46331c]">
        <div className="absolute -top-[2.7cqw] left-1/2 z-1 h-[5.4cqw] w-[18.6cqw] -translate-x-1/2 rotate-7 bg-[#d5c4a18a] [clip-path:polygon(1%_3%,97%_0,100%_94%,0%_100%)]" />
        <Image
          src="/me-portrait.jpg"
          alt="Bryan Houblon"
          width={1000}
          height={1333}
          loading="eager"
          sizes="(max-width: 760px) 45vw, 420px"
          className="h-[min(64cqw,50cqh)] w-full object-cover object-[center_40%]"
        />
        <figcaption className="pt-[1.6cqw] text-center font-serif text-[clamp(10px,2.5cqw,16px)] leading-snug italic text-[#837564]">{t('caption')}</figcaption>
      </figure>
      <Signature className="mt-auto pb-[2.4cqw] text-right">Bryan Houblon</Signature>
    </BookPage>
  )
}
