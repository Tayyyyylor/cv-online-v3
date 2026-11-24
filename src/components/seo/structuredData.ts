import type { Project } from '@/components/sections/projects/projects.data'
import { routing } from '@/i18n/routing'
import { absoluteUrl, PERSON_ID, PROFILES, SITE_NAME, SITE_URL, SKILLS, WEBSITE_ID } from '@/lib/site'

type PersonText = { jobTitle: string; description: string }

const personRef = { '@id': PERSON_ID }

function person({ jobTitle, description }: PersonText) {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: SITE_NAME,
    url: SITE_URL,
    image: absoluteUrl('/me-portrait.jpg'),
    jobTitle,
    description,
    address: { '@type': 'PostalAddress', addressLocality: 'Paris', addressCountry: 'FR' },
    knowsLanguage: ['fr', 'en'],
    knowsAbout: SKILLS,
    hasOccupation: {
      '@type': 'Occupation',
      name: jobTitle,
      occupationLocation: { '@type': 'Place', name: 'Europe' },
      skills: SKILLS.join(', '),
    },
    sameAs: PROFILES,
  }
}

const website = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: SITE_URL,
  name: SITE_NAME,
  inLanguage: routing.locales,
  author: personRef,
}

/** Accueil : une page de profil dont l'entité principale est Bryan. */
export function homeGraph(locale: string, text: PersonText & { title: string }) {
  const url = absoluteUrl(`/${locale}`)
  return {
    '@context': 'https://schema.org',
    '@graph': [
      person(text),
      website,
      {
        '@type': 'ProfilePage',
        '@id': `${url}#page`,
        url,
        name: text.title,
        description: text.description,
        inLanguage: locale,
        isPartOf: { '@id': WEBSITE_ID },
        mainEntity: personRef,
        primaryImageOfPage: absoluteUrl('/me-portrait.jpg'),
      },
    ],
  }
}

type ProjectText = { name: string; description: string; jobTitle: string; personDescription: string }

/** Fiche projet : l'œuvre, son auteur, et le fil d'Ariane depuis l'accueil. */
export function projectGraph(locale: string, project: Project, text: ProjectText) {
  const url = absoluteUrl(`/${locale}/projects/${project.id}`)
  const links = project.links ?? []
  const website = links.find(({ kind }) => kind === 'website')?.href
  const stores = links.filter(({ kind, href }) => href && (kind === 'appStore' || kind === 'googlePlay')).map(({ href }) => href)
  const visual = project.phone?.imageSrc ?? project.phone?.poster ?? project.image

  return {
    '@context': 'https://schema.org',
    '@graph': [
      person({ jobTitle: text.jobTitle, description: text.personDescription }),
      {
        '@type': 'CreativeWork',
        '@id': `${url}#work`,
        name: text.name,
        description: text.description,
        url: website ?? url,
        ...(stores.length > 0 && { sameAs: stores }),
        ...(visual && { image: absoluteUrl(visual) }),
        dateCreated: project.year,
        keywords: project.detailedStack.map(({ name }) => name).join(', '),
        creator: personRef,
      },
      {
        '@type': 'WebPage',
        '@id': `${url}#page`,
        url,
        name: text.name,
        description: text.description,
        inLanguage: locale,
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': `${url}#work` },
        author: personRef,
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: SITE_NAME, item: absoluteUrl(`/${locale}`) },
            { '@type': 'ListItem', position: 2, name: text.name, item: url },
          ],
        },
      },
    ],
  }
}
