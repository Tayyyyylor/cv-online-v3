'use client'

import Image from 'next/image'
import { BookOpen } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useBook } from '@/components/molecules/book/BookContext'
import { richTitle } from '@/components/molecules/book/BookText'
import ProjectLinks from '@/components/molecules/ProjectLinks'
import ProjectVisualPage, { phoneScreen } from './ProjectVisualPage'

const shelfBook = 'rounded-[2px] border border-[#8e806450] px-[1.6cqw] py-[1.8cqw] text-[1.65cqw] text-[#5a4435] shadow-[0_2px_0_#b4a58d]'

function ShelfStack() {
  return (
    <div aria-hidden="true" className="absolute right-0 bottom-[7cqw] z-1 flex w-[34cqw] rotate-12 flex-col @max-[300px]:hidden">
      <span className={`${shelfBook} bg-[#d8b584] font-serif`}>
        L’Étranger <i className="float-right text-[1.45cqw]">Albert Camus</i>
      </span>
      <span className={`${shelfBook} -ml-[1.4cqw] bg-[#b8c0a9] font-mono`}>LES MOTS ET LES CHOSES</span>
      <span className={`${shelfBook} -mr-[1.4cqw] bg-[#ece0c4] font-serif`}>
        Une chambre à soi <i className="float-right text-[1.45cqw]">Virginia Woolf</i>
      </span>
    </div>
  )
}

export default function MyShelfVisualPage() {
  const t = useTranslations('Book.myShelf')
  const links = useBook().projects.find(({ id }) => id === 'my-shelf')?.links ?? []

  return (
    <ProjectVisualPage
      name="MyShelf"
      paper="bg-paper-sage"
      note={t('note')}
      noteColor="text-sage-ink"
      circle="bg-[#c4ccb140]"
      sticker={<><BookOpen /><span>{t.rich('sticker', richTitle)}</span></>}
      stickerStyle="top-[17cqw] right-0 rotate-12 bg-[#e3c88d] text-[#64522f]"
      decoration={<ShelfStack />}
      phoneTilt="-rotate-6"
      screen={
        <>
          <span className="pointer-events-none absolute top-[2cqw] left-1/2 z-3 h-[2.2cqw] w-[10.5cqw] -translate-x-1/2 rounded-full bg-[#242520]" />
          <Image className={phoneScreen} src="/pres-poster.jpg" width={390} height={844} alt={t('alt')} sizes="280px" />
        </>
      }
      action={<ProjectLinks links={links} compact />}
      caption={t('caption')}
    />
  )
}
