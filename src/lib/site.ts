import type { Metadata } from 'next'
import { routing } from '@/i18n/routing'

export const SITE_URL = 'https://www.bryanhoublon.com'
export const SITE_NAME = 'Bryan Houblon'

export const LINKEDIN_URL = 'https://www.linkedin.com/in/bryan-houblon-172121211/'
export const GITHUB_URL = 'https://github.com/tayyyyylor'

/** Profils publics de la même personne, repris dans les données structurées (`sameAs`). */
export const PROFILES = [LINKEDIN_URL, GITHUB_URL]

/** Compétences annoncées aux moteurs de recherche, du front vers le reste. */
export const SKILLS = [
  'Front-end development',
  'React',
  'Next.js',
  'TypeScript',
  'JavaScript',
  'Tailwind CSS',
  'CSS animations',
  'GSAP',
  'Framer Motion',
  'Web accessibility',
  'Web performance',
  'Internationalization (i18n)',
  'React Native',
  'Expo',
  'Node.js',
  'NestJS',
  'PostgreSQL',
  'Prisma',
  'Docker',
]

export const ogLocale = (locale: string) => (locale === 'fr' ? 'fr_FR' : 'en_US')

export const absoluteUrl = (path = '') => `${SITE_URL}${path}`

/**
 * Canonique et hreflang d'une page. `path` est le chemin sans la langue (`''`, `/projects/noomi`).
 * `x-default` pointe sur l'URL sans préfixe, qui redirige selon la langue du visiteur,
 * comme l'en-tête `Link` envoyé par le middleware next-intl.
 */
export function localizedAlternates(locale: string, path = ''): Metadata['alternates'] {
  return {
    canonical: `/${locale}${path}`,
    languages: {
      ...Object.fromEntries(routing.locales.map((item) => [item, `/${item}${path}`])),
      'x-default': path || '/',
    },
  }
}

type PageMetadataInput = {
  locale: string
  /** Chemin sans la langue : `''` pour l'accueil. */
  path?: string
  /** Titre de l'onglet, complété par le modèle du layout. Absent : titre par défaut. */
  title?: string
  /** Titre complet pour les partages, qui n'appliquent pas le modèle. */
  shareTitle: string
  description: string
}

/** Métadonnées d'une page. Un `openGraph` défini ici remplace entièrement celui du layout. */
export function pageMetadata({ locale, path = '', title, shareTitle, description }: PageMetadataInput): Metadata {
  return {
    ...(title && { title }),
    description,
    alternates: localizedAlternates(locale, path),
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      url: `/${locale}${path}`,
      title: shareTitle,
      description,
      locale: ogLocale(locale),
      alternateLocale: routing.locales.filter((item) => item !== locale).map(ogLocale),
    },
    twitter: { card: 'summary_large_image', title: shareTitle, description },
  }
}

/** Sérialise un objet JSON-LD sans laisser passer de balise HTML. */
export const jsonLd = (data: unknown) => ({ __html: JSON.stringify(data).replace(/</g, '\\u003c') })

export const PERSON_ID = `${SITE_URL}/#person`
export const WEBSITE_ID = `${SITE_URL}/#website`
