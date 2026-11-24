import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import type { ImageResponse } from 'next/og'

type OgFonts = NonNullable<NonNullable<ConstructorParameters<typeof ImageResponse>[1]>['fonts']>

/** Taille recommandée par LinkedIn, Slack, X et Facebook. */
export const OG_SIZE = { width: 1200, height: 630 }

// Chemins bornés à un dossier, pour que le traçage des fichiers ne remonte pas tout le projet.
const readFont = (file: string) => readFile(join(process.cwd(), 'src/assets/og', file))

/** Satori ne lit pas le woff2 de next/font : les TTF sont versionnés dans `src/assets/og`. */
export async function loadOgFonts(): Promise<OgFonts> {
  const [serif, serifItalic, sans, mono] = await Promise.all([
    readFont('Fraunces-Regular.ttf'),
    readFont('Fraunces-LightItalic.ttf'),
    readFont('Inter-Regular.ttf'),
    readFont('GeistMono-Regular.ttf'),
  ])
  return [
    { name: 'Fraunces', data: serif, weight: 400, style: 'normal' },
    { name: 'Fraunces', data: serifItalic, weight: 300, style: 'italic' },
    { name: 'Inter', data: sans, weight: 400, style: 'normal' },
    { name: 'Geist Mono', data: mono, weight: 400, style: 'normal' },
  ]
}

/** Image de `public/` en data URI, que Satori sait intégrer. */
export async function loadPublicImage(path: string) {
  const data = await readFile(join(process.cwd(), 'public', path))
  const type = path.endsWith('.png') ? 'image/png' : 'image/jpeg'
  return `data:${type};base64,${data.toString('base64')}`
}

/** `#rrggbb` vers `rgba()`, pour les dégradés et les filets translucides. */
export function withAlpha(hex: string, alpha: number) {
  const value = Number.parseInt(hex.slice(1), 16)
  return `rgba(${(value >> 16) & 255}, ${(value >> 8) & 255}, ${value & 255}, ${alpha})`
}
