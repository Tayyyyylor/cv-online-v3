export const sheetBackButton =
  'fixed top-4 left-4 z-30 inline-flex cursor-pointer items-center gap-2 rounded-full bg-black/45 px-4 py-2.5 text-sm text-white backdrop-blur-md transition-colors hover:bg-black/70'

/** Point de départ de l'ouverture d'une fiche : l'endroit où l'on vient de cliquer. */
export const sheetOrigin = { x: '50%', y: '60%' }

export function rememberSheetOrigin(event: { clientX: number; clientY: number }) {
  sheetOrigin.x = `${event.clientX}px`
  sheetOrigin.y = `${event.clientY}px`
}
