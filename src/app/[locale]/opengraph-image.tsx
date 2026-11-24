import { ImageResponse } from 'next/og'
import { getTranslations } from 'next-intl/server'
import { loadOgFonts, loadPublicImage, OG_SIZE } from '@/components/seo/og'
import { routing } from '@/i18n/routing'

// Carte de partage (LinkedIn, Slack, X…) : la couverture du livre, avec le poste et la disponibilité.
// Une route d'image n'hérite pas des paramètres du layout : les langues sont listées ici pour générer au build.

export const alt = 'Bryan Houblon – Front-end & Full-stack Developer · React, Next.js, TypeScript'
export const size = OG_SIZE
export const contentType = 'image/png'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Book.meta.og' })
  const [fonts, portrait] = await Promise.all([loadOgFonts(), loadPublicImage('/me-portrait.jpg')])

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          background: '#622e3b',
          backgroundImage: 'radial-gradient(ellipse at 18% 20%, rgba(134, 72, 86, 0.55), rgba(98, 46, 59, 0) 75%)',
          color: '#f1e8cf',
          fontFamily: 'Inter',
        }}
      >
        <div style={{ position: 'absolute', top: 28, left: 28, right: 28, bottom: 28, display: 'flex', border: '1px solid rgba(214, 181, 138, 0.32)' }} />

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: 780, padding: '80px 0 72px 84px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontFamily: 'Geist Mono', textTransform: 'uppercase' }}>
            <span style={{ fontSize: 17, letterSpacing: 4, color: '#d0ae9b' }}>{t('kicker')}</span>
            <span style={{ fontSize: 23, letterSpacing: 5 }}>Bryan Houblon</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontFamily: 'Fraunces', fontSize: 64, lineHeight: 1.08, letterSpacing: -1.5, whiteSpace: 'nowrap' }}>{t('line1')}</span>
            <span style={{ fontFamily: 'Fraunces', fontStyle: 'italic', fontWeight: 300, fontSize: 64, lineHeight: 1.08, letterSpacing: -1.5, whiteSpace: 'nowrap', color: '#dcba8a' }}>
              {t('line2')}
            </span>
            <div style={{ display: 'flex', width: 84, height: 1, margin: '34px 0 26px', background: 'rgba(212, 178, 142, 0.6)' }} />
            <span style={{ fontSize: 27, color: '#dcc6bc' }}>{t('stack')}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontFamily: 'Geist Mono', fontSize: 18, letterSpacing: 2.5, textTransform: 'uppercase', color: '#e2cbb6' }}>
            <div style={{ display: 'flex', width: 10, height: 10, borderRadius: 999, background: '#9db67f' }} />
            <span>{t('place')}</span>
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            top: 86,
            right: 92,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '14px 14px 16px',
            background: '#fffdf5',
            transform: 'rotate(4deg)',
            boxShadow: '0 20px 44px rgba(30, 10, 16, 0.45)',
          }}
        >
          <img src={portrait} alt="" width={262} height={340} style={{ objectFit: 'cover', objectPosition: 'center 40%' }} />
          <span style={{ marginTop: 12, fontFamily: 'Fraunces', fontStyle: 'italic', fontWeight: 300, fontSize: 21, color: '#837564' }}>bryanhoublon.com</span>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts },
  )
}
