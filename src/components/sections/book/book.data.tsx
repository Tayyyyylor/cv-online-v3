import Image from 'next/image'
import { Code2, UserRound } from 'lucide-react'
import type { ReactNode } from 'react'
import { FaceContext, twoDigits } from '@/components/molecules/book/BookContext'
import AboutPage from './pages/AboutPage'
import BackCoverPage from './pages/BackCoverPage'
import ClientPreviewPage from './pages/ClientPreviewPage'
import ClientsPage from './pages/ClientsPage'
import ContactCoverPage from './pages/ContactCoverPage'
import ContactPage from './pages/ContactPage'
import CoverPage from './pages/CoverPage'
import MyShelfVisualPage from './pages/MyShelfVisualPage'
import NoomiVisualPage from './pages/NoomiVisualPage'
import PortraitPage from './pages/PortraitPage'
import PrefacePage from './pages/PrefacePage'
import ProjectStoryPage from './pages/ProjectStoryPage'
import WelcomePage from './pages/WelcomePage'

/** Une double page : le livre s'ouvre toujours sur une paire de pages. */
export type BookSpread = {
  left: ReactNode
  right: ReactNode
}

export type BookChapter = {
  /** Sert d'ancre dans l'URL et de clé dans `Book.chapters` (messages). */
  id: string
  /** Couleurs de l'onglet. */
  tab: string
  /** Présent : le chapitre apparaît dans le sommaire de la préface. */
  contents?: { icon: ReactNode; tint: string }
  spreads: BookSpread[]
}

export const chapters: BookChapter[] = [
  {
    id: 'preface',
    tab: 'bg-[#773c47] text-[#f0e3d1]',
    spreads: [{ left: <WelcomePage />, right: <PrefacePage /> }],
  },
  {
    id: 'my-shelf',
    tab: 'bg-[#a7af97] text-[#303c2b]',
    contents: {
      icon: <Image src="/iconmshlf.png" width={46} height={46} alt="" className="object-contain" />,
      tint: 'bg-[#20221c]',
    },
    spreads: [
      {
        left: (
          <ProjectStoryPage
            id="my-shelf"
            wordmark={
              <div className="flex items-center gap-[1.4cqw]">
                <Image src="/myshelf-logo.png" width={40} height={40} alt="" className="size-[clamp(18px,5.6cqw,36px)]" />
                <strong className="font-serif text-[clamp(16px,4.8cqw,30px)] font-normal tracking-[-.03em]">MyShelf</strong>
              </div>
            }
          />
        ),
        right: <MyShelfVisualPage />,
      },
    ],
  },
  {
    id: 'noomi',
    tab: 'bg-[#c3b5d2] text-[#4a355b]',
    contents: {
      icon: <Image src="/noomi-mascot.svg" width={46} height={46} alt="" />,
      tint: 'bg-[#eee5f5]',
    },
    spreads: [
      {
        left: (
          <ProjectStoryPage
            id="noomi"
            wordmark={
              <>
                <Image
                  src="/noomi-logo.svg"
                  width={116}
                  height={36}
                  alt="Noomi"
                  className="h-[clamp(20px,6cqw,38px)] w-auto object-contain dark:hidden"
                />
                <Image
                  src="/noomi-logo-dark.svg"
                  width={116}
                  height={36}
                  alt="Noomi"
                  className="hidden h-[clamp(20px,6cqw,38px)] w-auto object-contain dark:block"
                />
              </>
            }
          />
        ),
        right: <NoomiVisualPage />,
      },
    ],
  },
  {
    id: 'projects',
    tab: 'bg-[#cab28e] text-[#5a4b3f]',
    contents: { icon: <Code2 size={20} />, tint: 'bg-[#e9e1d2] text-[#8b7457]' },
    spreads: [{ left: <ClientsPage />, right: <ClientPreviewPage /> }],
  },
  {
    id: 'about',
    tab: 'bg-[#b3b9bc] text-[#3d4b51]',
    contents: { icon: <UserRound size={20} />, tint: 'bg-[#e4e4df] text-[#5f6a70]' },
    spreads: [{ left: <PortraitPage />, right: <AboutPage /> }],
  },
  {
    id: 'contact',
    tab: 'bg-[#bc8e7c] text-[#4c2a25]',
    spreads: [{ left: <ContactCoverPage />, right: <ContactPage /> }],
  },
]

const spreads = chapters.flatMap(({ spreads }, chapter) => spreads.map((spread) => ({ ...spread, chapter })))

const innerFaces = spreads.flatMap(({ left, right, chapter }) => [
  { page: left, chapter },
  { page: right, chapter },
])

/** Recto puis verso de chaque feuille : la couverture porte la première page, le dos la dernière. */
export const faces: ReactNode[] = [
  <CoverPage key="cover" />,
  ...innerFaces.map(({ page, chapter }, index) => (
    <FaceContext key={index} value={{ folio: twoDigits(index), chapter: twoDigits(chapter) }}>
      {page}
    </FaceContext>
  )),
  <BackCoverPage key="back-cover" />,
]

export const folioCount = innerFaces.length

/** Position 0 : livre fermé sur la couverture. Dernière position : fermé sur le dos. */
export const lastPosition = spreads.length + 1

export const firstSpreads = chapters.map((_, chapter) => spreads.findIndex((spread) => spread.chapter === chapter) + 1)

export function chapterAt(position: number) {
  return spreads[Math.min(Math.max(position - 1, 0), spreads.length - 1)].chapter
}

export function isClosed(position: number) {
  return position === 0 || position === lastPosition
}

export function hashOf(position: number) {
  if (position === 0) return ''
  if (position === lastPosition) return '#fin'
  return `#${chapters[chapterAt(position)].id}`
}

/** Position correspondant à une ancre, `null` si elle ne concerne pas le livre. */
export function positionOfHash(hash: string) {
  if (hash === '') return 0
  if (hash === '#fin') return lastPosition
  const chapter = chapters.findIndex(({ id }) => `#${id}` === hash)
  return chapter === -1 ? null : firstSpreads[chapter]
}
