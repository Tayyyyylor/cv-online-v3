'use client'

import { useTranslations } from 'next-intl'
import { Fragment } from 'react'
import BookPage from '@/components/molecules/book/BookPage'
import { BookSocials, BookTitle, Lead, MonoLabel } from '@/components/molecules/book/BookText'

export default function AboutPage() {
  const t = useTranslations('Book.about')
  const about = useTranslations('About')
  const skills = t.raw('skills') as { label: string; value: string }[]

  return (
    <BookPage head={t('head')} foot={t('foot')} labelledBy="about-title">
      <BookTitle id="about-title" className="mt-[5cqw] mb-[3cqw] text-[clamp(16px,6.3cqw,40px)]">
        {about('line1').split(' ').map((word) => (
          <Fragment key={word}>
            <span className="whitespace-nowrap">{word}</span>{' '}
          </Fragment>
        ))}
        <br />
        <em>{about('line2')}</em>
      </BookTitle>
      <Lead className="mb-[2.2cqw]">{about('paragraph1')}</Lead>
      <Lead className="@max-[300px]:hidden">{about('paragraph2')}</Lead>
      <div className="mt-[3.6cqw] border-t border-paper-line pt-[3cqw] @max-[300px]:hidden">
        <MonoLabel>{t('skillsTitle')}</MonoLabel>
        <dl className="mt-[2.2cqw] flex flex-col gap-[1.6cqw]">
          {skills.map(({ label, value }) => (
            <div key={label} className="flex flex-col @min-[300px]:flex-row @min-[300px]:gap-[3cqw]">
              <dt className="shrink-0 text-[clamp(9.5px,1.95cqw,12.5px)] text-ink-faint @min-[300px]:w-[20cqw]">{label}</dt>
              <dd className="font-serif text-[clamp(11.5px,2.5cqw,16px)] leading-snug text-ink-soft">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="mt-auto pt-[2.2cqw] pb-[1.2cqw]">
        <BookSocials />
      </div>
    </BookPage>
  )
}
