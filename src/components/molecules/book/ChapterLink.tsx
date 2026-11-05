'use client'

import type { ComponentProps, MouseEvent } from 'react'
import { useBook } from './BookContext'

type ChapterLinkProps = Omit<ComponentProps<'a'>, 'href' | 'onClick'> & {
  chapter: number
}

export default function ChapterLink({ chapter, ...rest }: ChapterLinkProps) {
  const { chapters, goToChapter } = useBook()

  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    goToChapter(chapter)
  }

  return <a href={`#${chapters[chapter].id}`} onClick={onClick} {...rest} />
}
