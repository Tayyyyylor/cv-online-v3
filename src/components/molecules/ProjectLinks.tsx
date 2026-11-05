'use client'

import { ExternalLink, Globe } from 'lucide-react'
import { SiAppstore, SiGithub, SiGoogleplay } from '@icons-pack/react-simple-icons'
import { useTranslations } from 'next-intl'
import type { ComponentType } from 'react'
import type { ProjectLink, ProjectLinkKind } from '../sections/projects/projects.data'

const icons: Record<ProjectLinkKind, ComponentType<{ className?: string }>> = {
  repo: SiGithub,
  website: Globe,
  demo: ExternalLink,
  other: ExternalLink,
  appStore: SiAppstore,
  googlePlay: SiGoogleplay,
}

type ProjectLinksProps = {
  links: ProjectLink[]
  /** Version réduite pour les pages du livre : sur une page étroite, seule l'icône reste. */
  compact?: boolean
}

const styles = {
  sheet: {
    list: 'flex flex-wrap gap-3',
    item: 'inline-flex items-center gap-2.5 rounded-full border border-(--sheet-foreground)/25 px-5 py-3 text-sm',
    link: 'transition-colors hover:border-(--sheet-accent) hover:bg-(--sheet-accent) hover:text-(--sheet-background)',
    soon: 'opacity-55',
    icon: 'size-4',
    label: '',
  },
  book: {
    list: 'flex flex-wrap items-center justify-center gap-[1.4cqw]',
    item: 'inline-flex items-center gap-[.5em] rounded-full border border-ink-faint/40 px-[.85em] py-[.4em] text-[clamp(10.5px,1.95cqw,12.5px)] text-ink @max-[300px]:px-[.6em]',
    link: 'transition-colors hover:border-rose hover:text-rose',
    soon: 'opacity-50',
    icon: 'size-[1.15em]',
    label: '@max-[300px]:sr-only',
  },
}

export default function ProjectLinks({ links, compact = false }: ProjectLinksProps) {
  const t = useTranslations('Projects.detail.links')
  const style = compact ? styles.book : styles.sheet

  return (
    <div className={style.list}>
      {links.map(({ kind, href }) => {
        const Icon = icons[kind]
        const label = t(kind)
        if (!href) {
          return (
            <span key={kind} title={t('soon')} className={`${style.item} ${style.soon}`}>
              <Icon className={style.icon} />
              <span className={style.label}>{label} · {t('soon')}</span>
            </span>
          )
        }
        return (
          <a key={kind} href={href} target="_blank" rel="noopener noreferrer" className={`${style.item} ${style.link}`}>
            <Icon className={style.icon} />
            <span className={style.label}>{label}</span>
          </a>
        )
      })}
    </div>
  )
}
