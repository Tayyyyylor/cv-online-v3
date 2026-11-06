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

export type ProjectLinkKind = 'repo' | 'website' | 'demo' | 'other' | 'appStore' | 'googlePlay'

export type ProjectLink = {
  kind: ProjectLinkKind
  /** Absent : le lien n'existe pas encore, le bouton affiche « Bientôt ». */
  href?: string
}

/** Palette de la fiche : chaque projet a son propre univers, quel que soit le thème du site. */
export type ProjectTheme = {
  background: string
  surface: string
  foreground: string
  muted: string
  accent: string
}

export type ProjectStackItem = {
  name: string
  icon: ReactNode
}

/** Aperçu affiché dans un mockup de téléphone (projets mobiles). */
export type ProjectPhoneMedia = {
  showNotch?: boolean
  videoSrc?: string
  imageSrc?: string
  poster?: string
}

export type Project = {
  id: string
  logo?: string
  image?: string
  /** Prend le pas sur `image` dans le détail : rendu dans un mockup iPhone. */
  phone?: ProjectPhoneMedia
  mockups?: string[]
  previewUsesDemoData?: boolean
  stack: ProjectStackItem[]
  detailedStack: ProjectStackItem[]
  categories: Exclude<ProjectCategory, 'all'>[]
  year: string
  links?: ProjectLink[]
  featured?: boolean
  theme: ProjectTheme
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
    logo: "/myshelf-logo.png",
    phone: {
      videoSrc: '/pres.mp4',
      poster: '/pres-poster.jpg',
    },
    stack: [
      { name: 'Expo', icon: <SiExpo /> },
      { name: 'React Native', icon: <SiReact /> },
      { name: 'TypeScript', icon: <SiTypescript /> },
      { name: 'NestJS', icon: <SiNestjs /> },
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
    featured: true,
    year: '2026',
    links: [
      { kind: 'website', href: 'https://myshelfapp.app' },
      { kind: 'appStore', href: 'https://apps.apple.com/us/app/myshelf/id6766835303' },
      { kind: 'googlePlay', href: 'https://play.google.com/store/apps/details?id=app.myshelfapp' },
    ],
    theme: { background: '#121331', surface: '#1d1f4a', foreground: '#fdefd9', muted: '#bdb7cc', accent: '#f2b866' },
  },
  {
    id: 'noomi',
    logo: '/noomi-logo-dark.svg',
    phone: { imageSrc: '/noomi-home.png', showNotch: false },
    mockups: ['/noomi-question.png', '/noomi-mood.png'],
    previewUsesDemoData: true,
    stack: [
      { name: 'Expo', icon: <SiExpo /> },
      { name: 'React Native', icon: <SiReact /> },
      { name: 'TypeScript', icon: <SiTypescript /> },
      { name: 'NestJS', icon: <SiNestjs /> },
    ],
    detailedStack: [
      { name: 'Expo', icon: <SiExpo /> },
      { name: 'React Native', icon: <SiReact /> },
      { name: 'TypeScript', icon: <SiTypescript /> },
      { name: 'Next.js', icon: <SiNextdotjs /> },
      { name: 'NestJS', icon: <SiNestjs /> },
      { name: 'PostgreSQL', icon: <SiPostgresql /> },
      { name: 'Prisma', icon: <SiPrisma /> },
      { name: 'Better Auth', icon: <SiBetterauth /> },
      { name: 'Turborepo', icon: <SiTurborepo /> },
    ],
    categories: ['perso'],
    featured: true,
    year: '2026',
    links: [
      { kind: 'website', href: 'https://noomiapp.com' },
      { kind: 'appStore', href: 'https://apps.apple.com/us/app/noomi-habitudes-humeur/id6819593252' },
      { kind: 'googlePlay', href: 'https://play.google.com/store/apps/details?id=com.noomiapp.app' },
    ],
    theme: { background: '#17131f', surface: '#251d36', foreground: '#fff8f0', muted: '#bcb3cf', accent: '#a08bff' },
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
    theme: { background: '#100c0e', surface: '#1f171b', foreground: '#f6eef0', muted: '#b4a5aa', accent: '#f08fa8' },
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
    theme: { background: '#0f1114', surface: '#1b1e24', foreground: '#f0f0ee', muted: '#a6aab0', accent: '#d9a45b' },
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
    theme: { background: '#0c1b2e', surface: '#152c48', foreground: '#eef5fb', muted: '#a2b8cb', accent: '#4fb3e8' },
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
    theme: { background: '#0e1c1a', surface: '#182d2a', foreground: '#edf6f2', muted: '#a1bdb4', accent: '#6fd3b0' },
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
    theme: { background: '#1a1411', surface: '#2b211b', foreground: '#f7efe6', muted: '#bfad9b', accent: '#e0a878' },
  },
]

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id)
}

export function getNextProject(id: string): Project {
  const index = projects.findIndex((p) => p.id === id)
  return projects[(index + 1) % projects.length]
}
