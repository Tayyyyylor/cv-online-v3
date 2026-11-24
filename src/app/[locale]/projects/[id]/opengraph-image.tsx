import { ImageResponse } from 'next/og'
import { getTranslations } from 'next-intl/server'
import { getProjectById, projects } from '@/components/sections/projects/projects.data'
import { loadOgFonts, loadPublicImage, OG_SIZE, withAlpha } from '@/components/seo/og'
import { routing } from '@/i18n/routing'

type Params = { locale: string; id: string }

export const alt = 'A project by Bryan Houblon, front-end & full-stack developer'
export const size = OG_SIZE
export const contentType = 'image/png'

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => projects.map(({ id }) => ({ locale, id })))
}

export default async function Image({ params }: { params: Promise<Params> }) {
  const { locale, id } = await params
  const project = getProjectById(id)
  if (!project) return new Response('Not found', { status: 404 })

  const [t, detail, og] = await Promise.all([
    getTranslations({ locale, namespace: 'Projects.items' }),
    getTranslations({ locale, namespace: 'Projects.detail' }),
    getTranslations({ locale, namespace: 'Book.meta.og' }),
  ])
  const { theme, phone, image, detailedStack, year, categories } = project
  const name = t(`${id}.name`)
  const visualPath = phone?.imageSrc ?? phone?.poster ?? image
  const [fonts, visual] = await Promise.all([loadOgFonts(), visualPath ? loadPublicImage(visualPath) : null])

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          background: theme.background,
          backgroundImage: `radial-gradient(circle at 78% 38%, ${withAlpha(theme.accent, 0.26)}, ${withAlpha(theme.background, 0)} 58%)`,
          color: theme.foreground,
          fontFamily: 'Inter',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: 640, padding: '72px 0 64px 80px' }}>
          <span style={{ fontFamily: 'Geist Mono', fontSize: 17, letterSpacing: 4, textTransform: 'uppercase', color: theme.accent }}>{og('by')}</span>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontFamily: 'Fraunces', fontSize: name.length > 10 ? 68 : 96, lineHeight: 1.02, letterSpacing: -2 }}>{name}</span>
            <span style={{ marginTop: 22, maxWidth: 520, fontFamily: 'Fraunces', fontStyle: 'italic', fontWeight: 300, fontSize: 32, lineHeight: 1.3, color: theme.accent }}>
              {t(`${id}.tagline`)}
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 34, maxWidth: 540 }}>
              {detailedStack.slice(0, 4).map(({ name: tech }) => (
                <span key={tech} style={{ padding: '8px 16px', borderRadius: 999, background: theme.surface, fontSize: 19, color: theme.foreground }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <span style={{ fontFamily: 'Geist Mono', fontSize: 17, letterSpacing: 2.5, textTransform: 'uppercase', color: theme.muted }}>
            {`${year} · ${detail(categories.includes('clients') ? 'client' : 'personal')} · bryanhoublon.com`}
          </span>
        </div>

        {visual && phone && (
          <div
            style={{
              position: 'absolute',
              top: 58,
              right: 150,
              display: 'flex',
              width: 240,
              height: 514,
              overflow: 'hidden',
              borderRadius: 38,
              border: '7px solid #0b0b0d',
              background: '#0b0b0d',
              transform: 'rotate(-4deg)',
              boxShadow: `0 28px 60px ${withAlpha('#000000', 0.45)}`,
            }}
          >
            <img src={visual} alt="" width={226} height={500} style={{ objectFit: 'cover', objectPosition: 'top' }} />
          </div>
        )}
        {visual && !phone && (
          <img src={visual} alt="" width={620} height={361} style={{ position: 'absolute', top: 150, right: -40, objectFit: 'contain' }} />
        )}
      </div>
    ),
    { ...OG_SIZE, fonts },
  )
}
