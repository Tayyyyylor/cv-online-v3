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

export type ProjectLink = {
  label: string
  href: string
  kind: 'repo' | 'website' | 'demo' | 'other'
}

export type ProjectStackItem = {
  name: string
  icon: ReactNode
}

export type Project = {
  id: string
  name: string
  description: string
  longDescription: string[]
  logo: ReactNode
  image?: string
  mockups?: string[]
  stack: ProjectStackItem[]
  detailedStack: ProjectStackItem[]
  categories: Exclude<ProjectCategory, 'all'>[]
  year: string
  role: string
  highlights?: string[]
  links?: ProjectLink[]
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
    longDescription: [
      "My Shelf est une application qui permet de cataloguer ses lectures, suivre sa progression et partager des recommandations avec ses amis.",
      "L'idée est partie d'un constat simple : Goodreads est lent, daté, et les alternatives n'ont pas de social bien intégré. J'ai construit une expérience plus fluide, centrée sur la découverte par cercles d'amis.",
    ],
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
    role: 'Développeur fullstack',
    highlights: [
      'Recherche par ISBN avec autocomplétion',
      'Feed social filtrable par cercle d\'amis',
      'Synchronisation hors-ligne via Service Worker',
    ],
    links: [
      { label: 'Voir le repo', href: 'https://github.com/example/myshelf', kind: 'repo' },
      { label: 'Site web', href: 'https://myshelf.example.com', kind: 'website' },
    ],
  },
  {
    id: 'placeholder-web',
    name: 'Projet Web',
    description: 'Description courte du projet, à remplacer plus tard.',
    longDescription: [
      "Site vitrine réalisé pour un client dans le secteur de l'architecture.",
      "Focus sur les performances, le SEO et une animation soignée pour mettre en avant le portfolio.",
    ],
    logo: <Sparkles />,
    image: '/toto.png',
    mockups: ['/toto.png'],
    stack: [ { name: 'Next.js', icon: <SiNextdotjs /> },
      { name: 'TypeScript', icon: <SiTypescript /> },
      { name: 'Tailwind CSS', icon: <SiTailwindcss /> },],
    detailedStack: [
      { name: 'Next.js', icon: <SiNextdotjs /> },
      { name: 'TypeScript', icon: <SiTypescript /> },
      { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
    ],
    categories: ['clients'],
    year: '2025',
    role: 'Développeur frontend',
    highlights: [
      'Score Lighthouse 100 sur les 4 axes',
      'CMS headless intégré pour autonomie du client',
    ],
    links: [{ label: 'Site web', href: 'https://example.com', kind: 'website' }],
  },
  {
    id: 'placeholder-backend',
    name: 'API interne',
    description: 'Service backend, à remplacer plus tard.',
    longDescription: [
      "API interne pour la gestion des stocks d'une PME.",
      "Architecture modulaire NestJS, base PostgreSQL avec migrations versionnées et tests d'intégration.",
    ],
    logo: <Cpu />,
    image: '/toto.png',
    stack: [{ name: 'NestJS', icon: <SiNestjs /> },
      { name: 'Prisma', icon: <SiPrisma /> },
      { name: 'PostgreSQL', icon: <SiPostgresql /> },],
    detailedStack: [
      { name: 'NestJS', icon: <SiNestjs /> },
      { name: 'Prisma', icon: <SiPrisma /> },
      { name: 'PostgreSQL', icon: <SiPostgresql /> },
    ],
    categories: ['clients'],
    year: '2024',
    role: 'Développeur backend',
    highlights: [
      'Couverture de tests > 85 %',
      'Pipeline CI/CD avec déploiement automatisé',
    ],
  },
  {
    id: 'placeholder-backefnd',
    name: 'API interne',
    description: 'Service backend, à remplacer plus tard.',
    longDescription: [
      "API interne pour la gestion des stocks d'une PME.",
      "Architecture modulaire NestJS, base PostgreSQL avec migrations versionnées et tests d'intégration.",
    ],
    logo: <Cpu />,
    image: '/toto.png',
    stack: [{ name: 'NestJS', icon: <SiNestjs /> },
      { name: 'Prisma', icon: <SiPrisma /> },
      { name: 'PostgreSQL', icon: <SiPostgresql /> },],
    detailedStack: [
      { name: 'NestJS', icon: <SiNestjs /> },
      { name: 'Prisma', icon: <SiPrisma /> },
      { name: 'PostgreSQL', icon: <SiPostgresql /> },
    ],
    categories: ['clients'],
    year: '2024',
    role: 'Développeur backend',
    highlights: [
      'Couverture de tests > 85 %',
      'Pipeline CI/CD avec déploiement automatisé',
    ],
  },
  {
    id: 'placeholder-bacgkend',
    name: 'API interne',
    description: 'Service backend, à remplacer plus tard.',
    longDescription: [
      "API interne pour la gestion des stocks d'une PME.",
      "Architecture modulaire NestJS, base PostgreSQL avec migrations versionnées et tests d'intégration.",
    ],
    logo: <Cpu />,
    image: '/toto.png',
    stack: [{ name: 'NestJS', icon: <SiNestjs /> },
      { name: 'Prisma', icon: <SiPrisma /> },
      { name: 'PostgreSQL', icon: <SiPostgresql /> },],
    detailedStack: [
      { name: 'NestJS', icon: <SiNestjs /> },
      { name: 'Prisma', icon: <SiPrisma /> },
      { name: 'PostgreSQL', icon: <SiPostgresql /> },
    ],
    categories: ['clients'],
    year: '2024',
    role: 'Développeur backend',
    highlights: [
      'Couverture de tests > 85 %',
      'Pipeline CI/CD avec déploiement automatisé',
    ],
  },
  {
    id: 'placeholder-bacerkend',
    name: 'API interne',
    description: 'Service backend, à remplacer plus tard.',
    longDescription: [
      "API interne pour la gestion des stocks d'une PME.",
      "Architecture modulaire NestJS, base PostgreSQL avec migrations versionnées et tests d'intégration.",
    ],
    logo: <Cpu />,
    image: '/toto.png',
    stack: [  { name: 'NestJS', icon: <SiNestjs /> },
      { name: 'Prisma', icon: <SiPrisma /> },
      { name: 'PostgreSQL', icon: <SiPostgresql /> },],
    detailedStack: [
      { name: 'NestJS', icon: <SiNestjs /> },
      { name: 'Prisma', icon: <SiPrisma /> },
      { name: 'PostgreSQL', icon: <SiPostgresql /> },
    ],
    categories: ['clients'],
    year: '2024',
    role: 'Développeur backend',
    highlights: [
      'Couverture de tests > 85 %',
      'Pipeline CI/CD avec déploiement automatisé',
    ],
  },
]

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id)
}
