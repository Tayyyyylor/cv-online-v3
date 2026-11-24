import { jsonLd } from '@/lib/site'

/** Données structurées schema.org, lues par Google, Bing et les moteurs IA. */
export default function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(data)} />
}
