'use client'

import { createContext, use } from 'react'
import type { BookChapter } from '@/components/sections/book/book.data'
import type { ProjectLink, ProjectStackItem } from '@/components/sections/projects/projects.data'

export type BookProject = {
  id: string
  year: string
  image?: string
  client: boolean
  stack: ProjectStackItem[]
  links: ProjectLink[]
}

type BookContextValue = {
  chapters: BookChapter[]
  folioCount: number
  projects: BookProject[]
  goToChapter: (chapter: number) => void
  selectedClient: number
  selectClient: (index: number) => void
}

export const BookContext = createContext<BookContextValue | null>(null)

/** Numéros affichés sur une face : folio en bas de page, chapitre en haut. */
export const FaceContext = createContext({ folio: '', chapter: '' })

export const twoDigits = (value: number) => String(value).padStart(2, '0')

export function useBook() {
  const book = use(BookContext)
  if (!book) throw new Error('useBook doit être utilisé dans <Book />')
  return book
}
