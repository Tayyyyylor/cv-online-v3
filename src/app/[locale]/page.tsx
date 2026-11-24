import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import Homepage from "@/components/homepage/Homepage";
import JsonLd from '@/components/seo/JsonLd'
import { homeGraph } from '@/components/seo/structuredData'
import { pageMetadata } from '@/lib/site'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Book.meta' })
  return pageMetadata({ locale, shareTitle: t('title'), description: t('description') })
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'Book.meta' })

  return (
    <>
      <JsonLd data={homeGraph(locale, { title: t('title'), jobTitle: t('jobTitle'), description: t('description') })} />
      <Homepage />
    </>
  )
}
