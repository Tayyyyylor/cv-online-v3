import {
  SiNextdotjs,
  SiTypescript,
  SiStrapi,
  SiContentful,
  SiSass,
  SiCloudinary,
  SiOvh,
  SiNginx,
  SiDocker,
  SiReact,
  SiNestjs,
  SiPostgresql,
  SiPrisma,
  SiBetterauth,
  SiTurborepo,
  SiCloudflare,
  SiBun,
  SiTailwindcss,
  SiExpo,
} from '@icons-pack/react-simple-icons'
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
  logo?: string
  image?: string
  mockups?: string[]
  stack: ProjectStackItem[]
  detailedStack: ProjectStackItem[]
  categories: Exclude<ProjectCategory, 'all'>[]
  year: string
  links?: ProjectLink[]
  featured?: boolean
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
    id: 'my-shelf',
    logo: "/toto.png",
    image: '/toto.png',
    stack: [
      { name: 'Expo', icon: <SiNextdotjs /> },
      { name: 'React Native', icon: <SiSass /> },
      { name: 'TypeScript', icon: <SiTypescript /> },
      { name: 'Strapi', icon: <SiStrapi /> },
    ],
    detailedStack: [
       { name: 'Expo', icon: <SiExpo /> },
      { name: 'React Native', icon: <SiReact /> },
      { name: 'TypeScript', icon: <SiTypescript /> },
      { name: 'TailwindCSS', icon: <SiTailwindcss /> },
      { name: 'NestJS', icon: <SiNestjs /> },
      { name: 'PostgreSQL', icon: <SiPostgresql /> },
      { name: 'Prisma', icon: <SiPrisma /> },
      { name: 'Better auth', icon: <SiBetterauth /> },
      { name: 'Turborepo', icon: <SiTurborepo /> },
      { name: 'Cloudflare', icon: <SiCloudflare /> },
      { name: 'Bun', icon: <SiBun /> },      
      { name: 'Nginx', icon: <SiNginx /> },
      { name: 'Docker', icon: <SiDocker /> },

    ],
    categories: ['perso'],
    year: '2026',
    featured: true,
  },
  {
    id: 'dependant-tv',
    logo: "/logoDpdBlack.png",
    image: '/dependantMockup.png',
    stack: [
      { name: 'Next.js', icon: <SiNextdotjs /> },
      { name: 'TypeScript', icon: <SiTypescript /> },
      { name: 'Sass', icon: <SiSass /> },
      { name: 'Strapi', icon: <SiStrapi /> },
    ],
    detailedStack: [
      { name: 'Next.js', icon: <SiNextdotjs /> },
      { name: 'TypeScript', icon: <SiTypescript /> },
      { name: 'Sass', icon: <SiSass /> },
      { name: 'Strapi', icon: <SiStrapi /> },
      { name: 'Nginx', icon: <SiNginx /> },
      { name: 'Docker', icon: <SiDocker /> },

    ],
    categories: ['clients'],
    year: '2023',
    links: [{ kind: 'website', href: 'https://www.dependant.tv' }],
  },
  {
    id: 'ali-bensaali-production',
    image: '/aliBensaaliMockup.png',
    stack: [
      { name: 'Next.js', icon: <SiNextdotjs /> },
      { name: 'Contentful', icon: <SiContentful /> },
    ],
    detailedStack: [
    { name: 'Next.js', icon: <SiNextdotjs /> },
      { name: 'TypeScript', icon: <SiTypescript /> },
      { name: 'Sass', icon: <SiSass /> },
      { name: 'Contentful', icon: <SiContentful /> },
      {name: 'Cloudinary', icon: <SiCloudinary />}
    ],
    categories: ['clients'],
    year: '2024',
      links: [{ kind: 'website', href: 'https://alibensaali.com/' }],
  },
  {
    id: 'labcom-optimaa',
    logo: "/logobleu_optimaa.png",
    image: '/labcomMockup.png',
    stack: [
      { name: 'Next.js', icon: <SiNextdotjs /> },
      { name: 'TypeScript', icon: <SiTypescript /> },
      { name: 'Strapi', icon: <SiStrapi /> },
      { name: 'Ovh', icon: <SiOvh /> }
      
    ],
    detailedStack: [
      { name: 'Next.js', icon: <SiNextdotjs /> },
      { name: 'TypeScript', icon: <SiTypescript /> },
      { name: 'Sass', icon: <SiSass /> },
      { name: 'Strapi', icon: <SiStrapi /> },
      { name: 'Ovh', icon: <SiOvh /> },
      { name: 'Nginx', icon: <SiNginx /> },
    ],
    categories: ['clients'],
    year: '2025',
    links: [{ kind: 'website', href: 'https://www.labcom-optimaa.com' }],
  },
  {
    id: 'cocoa-bio',
    logo: "/logo_cocoa_black.png",
    image: '/cocoaMockup.png',
    stack: [
      { name: 'Next.js', icon: <SiNextdotjs /> },
      { name: 'TypeScript', icon: <SiTypescript /> },
      { name: 'Sass', icon: <SiSass /> },
    ],
    detailedStack: [
     { name: 'Next.js', icon: <SiNextdotjs /> },
     { name: 'TypeScript', icon: <SiTypescript /> },
      { name: 'Sass', icon: <SiSass /> },
    ],
    categories: ['clients'],
    year: '2025',
    links: [{ kind: 'website', href: 'https://www.cocoa-bio.fr' }],
  },
  {
    id: 'interlude-decors',
    logo: "/logoagathe.png",
    image: '/interludeMockup.png',
    stack: [
     { name: 'Next.js', icon: <SiNextdotjs /> },
     { name: 'TypeScript', icon: <SiTypescript /> },
      { name: 'Sass', icon: <SiSass /> },
       { name: 'Contentful', icon: <SiContentful /> },
    ],
    detailedStack: [
{ name: 'Next.js', icon: <SiNextdotjs /> },
{ name: 'TypeScript', icon: <SiTypescript /> },
      { name: 'Sass', icon: <SiSass /> },
  { name: 'Contentful', icon: <SiContentful /> },
    ],
    categories: ['clients'],
    year: '2025',
    links: [{ kind: 'website', href: 'https://www.agatheroger.com' }],
  },
]

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id)
}
