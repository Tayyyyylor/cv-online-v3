import type { MetadataRoute } from 'next'
import { projects } from '@/components/sections/projects/projects.data'
import { routing } from '@/i18n/routing'
import { absoluteUrl } from '@/lib/site'

/** Une entrée par page et par langue, chacune avec ses équivalents (hreflang). */
function localized(path: string, extra: Omit<MetadataRoute.Sitemap[number], 'url'> = {}): MetadataRoute.Sitemap {
  const languages = {
    ...Object.fromEntries(routing.locales.map((locale) => [locale, absoluteUrl(`/${locale}${path}`)])),
    'x-default': absoluteUrl(path),
  }
  return routing.locales.map((locale) => ({
    url: absoluteUrl(`/${locale}${path}`),
    alternates: { languages },
    ...extra,
  }))
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...localized('', { changeFrequency: 'monthly', priority: 1, images: [absoluteUrl('/me-portrait.jpg')] }),
    ...projects.flatMap((project) => {
      const visual = project.phone?.imageSrc ?? project.phone?.poster ?? project.image
      return localized(`/projects/${project.id}`, {
        changeFrequency: 'yearly',
        priority: project.categories.includes('clients') ? 0.6 : 0.8,
        ...(visual && { images: [absoluteUrl(visual)] }),
      })
    }),
    ...localized('/links', { changeFrequency: 'yearly', priority: 0.3 }),
  ]
}
