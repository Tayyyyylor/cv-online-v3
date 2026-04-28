import {
  SiNextdotjs,
  SiNestjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from '@icons-pack/react-simple-icons'
import { BookOpen, Cpu, Sparkles } from 'lucide-react'
import type { ReactNode } from 'react'

export type ProjectCategory = 'all' | 'clients' | 'perso' | 'fun'

export type Project = {
  id: string
  name: string
  description: string
  logo: ReactNode
  image?: string
  stack: ReactNode[]
  categories: Exclude<ProjectCategory, 'all'>[]
}

export const projectFilters: { id: ProjectCategory; label: string }[] = [
  { id: 'all', label: 'Tout' },
  { id: 'clients', label: 'Clients' },
  { id: 'perso', label: 'Personnel' },
  { id: 'fun', label: 'For fun' },
]

export const projects: Project[] = [
  {
    id: 'myshelf',
    name: 'My Shelf',
    description: 'Bibliothèque virtuelle pour suivre et partager ses lectures.',
    logo: <BookOpen />,
    stack: [<SiReact key="r" />, <SiNestjs key="n" />, <SiPrisma key="p" />, <SiPostgresql key="pg" />],
    categories: ['perso', 'clients'],
  },
  {
    id: 'placeholder-web',
    name: 'Projet Web',
    description: 'Description courte du projet, à remplacer plus tard.',
    logo: <Sparkles />,
    stack: [<SiNextdotjs key="n" />, <SiTypescript key="t" />, <SiTailwindcss key="tw" />],
    categories: ['clients'],
  },
  {
    id: 'placeholder-backend',
    name: 'API interne',
    description: 'Service backend, à remplacer plus tard.',
    logo: <Cpu />,
    stack: [<SiNestjs key="n" />, <SiPrisma key="p" />, <SiPostgresql key="pg" />],
    categories: ['clients'],
  },
]
