import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Linkspage from '@/components/linkspage/Linkspage'
import { pageMetadata, SITE_NAME } from '@/lib/site'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Book.meta.links' })
  return pageMetadata({ locale, path: '/links', title: t('title'), shareTitle: `${SITE_NAME} · ${t('title')}`, description: t('description') })
}

export default function LinksPage() {
  return (
    <Linkspage />
  )
}
