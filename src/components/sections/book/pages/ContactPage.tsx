'use client'

import { ArrowDownToLine, ArrowUpRight, Check, Copy, Mail, MoveUpRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'
import BookPage from '@/components/molecules/book/BookPage'
import { Handwritten, Lead, MonoLabel, socials } from '@/components/molecules/book/BookText'

export const EMAIL = 'devbryan@proton.me'

type CopyStatus = 'idle' | 'copied' | 'failed'

export default function ContactPage() {
  const t = useTranslations('Book.contact')
  const book = useTranslations('Book')
  const contact = useTranslations('Contact')
  const [status, setStatus] = useState<CopyStatus>('idle')
  const resetTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => () => clearTimeout(resetTimer.current), [])

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setStatus('copied')
      clearTimeout(resetTimer.current)
      resetTimer.current = setTimeout(() => setStatus('idle'), 3000)
    } catch {
      setStatus('failed')
    }
  }

  return (
    <BookPage head={t('head')} aside={<Mail size={15} />} foot={t('foot')} labelledBy="contact-page-title">
      <Handwritten className="mt-[3.6cqw]">{t('note')}</Handwritten>
      <h3 id="contact-page-title" className="mt-[2.2cqw] mb-[1.6cqw] font-serif text-[clamp(19px,6.6cqw,42px)] font-normal tracking-[-.02em]">
        {contact('line1')}{contact('line2')}
      </h3>
      <Lead className="mb-[3cqw]">{t('body')}</Lead>
      <a
        href={`mailto:${EMAIL}`}
        className="flex items-center justify-between gap-[1cqw] border-b border-paper-line pb-[2.4cqw] font-serif text-[clamp(12.5px,5cqw,32px)] text-rose select-text"
      >
        <span className="min-w-0 truncate">{EMAIL}</span>
        <MoveUpRight className="size-[1em] shrink-0 @max-[200px]:hidden" />
      </a>
      <button type="button" onClick={copyEmail} className="flex items-center gap-[1.4cqw] self-start py-[1.8cqw] text-[clamp(10.5px,2cqw,13px)] text-ink-soft">
        {status === 'copied' ? <Check className="size-[1.2em]" /> : <Copy className="size-[1.2em]" />}
        {status === 'copied' ? t('copied') : t('copy')}
      </button>
      <span role="status" className="block min-h-[1.4em] text-[clamp(9.5px,1.85cqw,12px)] text-ink-faint">
        {status === 'copied' && t('copiedStatus')}
        {status === 'failed' && t('copyFailed')}
      </span>
      <span className="mt-[1cqw] mb-[1.6cqw] @max-[300px]:hidden"><MonoLabel>{t('elsewhere')}</MonoLabel></span>
      <div className="grid gap-[1.6cqw] @min-[300px]:grid-cols-2">
        {socials.map(({ id, label, href, Icon }) => (
          <a
            key={id}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex min-h-[38px] items-center gap-[1.8cqw] rounded-[1.2cqw] bg-ink px-[clamp(8px,2.4cqw,16px)] py-[clamp(7px,2.2cqw,14px)] text-paper transition-transform duration-200 hover:-translate-y-0.5"
          >
            <Icon className="size-[clamp(16px,5cqw,30px)] shrink-0" />
            <span className="flex min-w-0 flex-1 flex-col">
              <strong className="font-serif text-[clamp(12.5px,3.6cqw,23px)] leading-none font-normal">{label}</strong>
              <small className="mt-[.8cqw] text-[clamp(10px,1.9cqw,12.5px)] opacity-75 @max-[300px]:hidden">{t(id)}</small>
            </span>
            <ArrowUpRight className="size-[clamp(14px,3.4cqw,20px)] shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 @max-[300px]:hidden" />
          </a>
        ))}
      </div>
      <a
        href={book('resumeFile')}
        download
        className="mt-[3.4cqw] flex items-center justify-between gap-[3.6cqw] border-y border-paper-line py-[2.4cqw] text-ink-soft"
      >
        <span className="flex flex-col gap-[1.4cqw]">
          <span className="@max-[300px]:hidden"><MonoLabel>{t('keep')}</MonoLabel></span>
          <strong className="font-serif text-[clamp(14px,4cqw,26px)] font-normal">{t('resume')}</strong>
          <small className="font-mono text-[clamp(9px,1.65cqw,10.5px)] text-ink-faint">{t('resumeMeta')}</small>
        </span>
        <ArrowDownToLine className="size-[clamp(16px,4.2cqw,26px)] shrink-0" />
      </a>
    </BookPage>
  )
}
