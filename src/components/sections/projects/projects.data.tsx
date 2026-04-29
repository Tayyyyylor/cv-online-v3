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
import { useTranslations } from 'next-intl'
import type { ReactNode } from 'react'

export type ProjectCategory = 'all' | 'clients' | 'perso' | 'fun'

export type ProjectLinkKind = 'repo' | 'website' | 'demo' | 'other'

export type ProjectLink = {
  href: string
  kind: ProjectLinkKind
}

export type ProjectStackItem = {
  name: string
  icon: ReactNode
}

export type Project = {
  id: string
  logo: ReactNode
  image?: string
  mockups?: string[]
  stack: ProjectStackItem[]
  detailedStack: ProjectStackItem[]
  categories: Exclude<ProjectCategory, 'all'>[]
  year: string
  links?: ProjectLink[]
}

export function useProjectFilters(): { id: ProjectCategory; label: string }[] {
  const t = useTranslations('Projects.filters')
  return [
    { id: 'all', label: t('all') },
    { id: 'clients', label: t('clients') },
    { id: 'perso', label: t('perso') },
    { id: 'fun', label: t('fun') },
  ]
}

export const projects: Project[] = [
  {
    id: 'myshelf',
    logo: <BookOpen />,
    image: '/toto.png',
    mockups: ['/toto.png', '/toto.png'],
    stack: [
      { name: 'React', icon: <SiReact /> },
      { name: 'NestJS', icon: <SiNestjs /> },
      { name: 'Prisma', icon: <SiPrisma /> },
      { name: 'PostgreSQL', icon: <SiPostgresql /> },
    ],
    detailedStack: [
      { name: 'React', icon: <SiReact /> },
      { name: 'NestJS', icon: <SiNestjs /> },
      { name: 'Prisma', icon: <SiPrisma /> },
      { name: 'PostgreSQL', icon: <SiPostgresql /> },
    ],
    categories: ['perso', 'clients'],
    year: '2025',
    links: [
      { kind: 'repo', href: 'https://github.com/example/myshelf' },
      { kind: 'website', href: 'https://myshelf.example.com' },
    ],
  },
  {
    id: 'placeholder-web',
    logo: <Sparkles />,
    image: '/toto.png',
    mockups: ['/toto.png'],
    stack: [
      { name: 'Next.js', icon: <SiNextdotjs /> },
      { name: 'TypeScript', icon: <SiTypescript /> },
      { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
    ],
    detailedStack: [
      { name: 'Next.js', icon: <SiNextdotjs /> },
      { name: 'TypeScript', icon: <SiTypescript /> },
      { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
    ],
    categories: ['clients'],
    year: '2025',
    links: [{ kind: 'website', href: 'https://example.com' }],
  },
  {
    id: 'placeholder-backend',
    logo: <Cpu />,
    image: '/toto.png',
    stack: [
      { name: 'NestJS', icon: <SiNestjs /> },
      { name: 'Prisma', icon: <SiPrisma /> },
      { name: 'PostgreSQL', icon: <SiPostgresql /> },
    ],
    detailedStack: [
      { name: 'NestJS', icon: <SiNestjs /> },
      { name: 'Prisma', icon: <SiPrisma /> },
      { name: 'PostgreSQL', icon: <SiPostgresql /> },
    ],
    categories: ['clients'],
    year: '2024',
  },
  {
    id: 'placeholder-backefnd',
    logo: <Cpu />,
    image: '/toto.png',
    stack: [
      { name: 'NestJS', icon: <SiNestjs /> },
      { name: 'Prisma', icon: <SiPrisma /> },
      { name: 'PostgreSQL', icon: <SiPostgresql /> },
    ],
    detailedStack: [
      { name: 'NestJS', icon: <SiNestjs /> },
      { name: 'Prisma', icon: <SiPrisma /> },
      { name: 'PostgreSQL', icon: <SiPostgresql /> },
    ],
    categories: ['clients'],
    year: '2024',
  },
  {
    id: 'placeholder-bacgkend',
    logo: <Cpu />,
    image: '/toto.png',
    stack: [
      { name: 'NestJS', icon: <SiNestjs /> },
      { name: 'Prisma', icon: <SiPrisma /> },
      { name: 'PostgreSQL', icon: <SiPostgresql /> },
    ],
    detailedStack: [
      { name: 'NestJS', icon: <SiNestjs /> },
      { name: 'Prisma', icon: <SiPrisma /> },
      { name: 'PostgreSQL', icon: <SiPostgresql /> },
    ],
    categories: ['clients'],
    year: '2024',
  },
  {
    id: 'placeholder-bacerkend',
    logo: <Cpu />,
    image: '/toto.png',
    stack: [
      { name: 'NestJS', icon: <SiNestjs /> },
      { name: 'Prisma', icon: <SiPrisma /> },
      { name: 'PostgreSQL', icon: <SiPostgresql /> },
    ],
    detailedStack: [
      { name: 'NestJS', icon: <SiNestjs /> },
      { name: 'Prisma', icon: <SiPrisma /> },
      { name: 'PostgreSQL', icon: <SiPostgresql /> },
    ],
    categories: ['clients'],
    year: '2024',
  },
]

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id)
}
