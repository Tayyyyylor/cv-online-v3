import styles from './PhysicalBook.module.css'

const TURN_DURATION = 950
const COVER_DURATION = 1150
const JUMP_FACTOR = 0.75
const JUMP_STAGGER = 130
const MAX_BEND = 110
const MIN_STRIPS = 6
const MAX_STRIPS = 14
const STRIP_WIDTH = 44
const STRIP_OVERLAP = 1
const BOARD_CLEARANCE = 0.2
const DRAG_THRESHOLD = 6
const TAP_DURATION = 450
const COMMIT_PROGRESS = 0.3
const COMMIT_VELOCITY = 0.35
const FLICK_WINDOW = 90
const CLICKABLE = 'a, button'

type Easing = (t: number) => number

type Motion = {
  from: number
  to: number
  start: number
  duration: number
  ease: Easing
}

type Strip = {
  element: HTMLElement
  frontShade: HTMLElement
  backShade: HTMLElement
}

type Sheet = {
  element: HTMLElement
  strips: Strip[]
  stripWidth: number
  pageWidth: number
}

type Pointer = {
  id: number
  x: number
  y: number
  time: number
  clickable: boolean
  drag: { leaf: number; from: number; forward: boolean; lastX: number; lastTime: number; velocity: number } | null
}

type BookEngineOptions = {
  book: HTMLElement
  leaves: HTMLElement[]
  sheets: HTMLElement
  castLeft: HTMLElement
  castRight: HTMLElement
  isReducedMotion: () => boolean
  onPositionChange: (position: number) => void
}

export type BookEngine = {
  goTo: (position: number, instant?: boolean) => void
  next: () => void
  previous: () => void
  getPosition: () => number
  destroy: () => void
}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)
const easeInOut: Easing = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2)
const easeOut: Easing = (t) => 1 - (1 - t) ** 3
/** Une couverture ne porte son ombre sur la table qu'en arrivant à plat. */
const landing = (progress: number) => clamp((progress - 0.75) / 0.25, 0, 1)

function sliceOf(prototype: Node, offset: number, width: number, height: number, className: string) {
  const clip = document.createElement('div')
  clip.className = className
  const page = prototype.cloneNode(true) as HTMLElement
  page.style.cssText = `position:absolute;top:0;left:${-offset}px;width:${width}px;height:${height}px`
  clip.append(page)
  return clip
}

function shadeOf(className: string) {
  const shade = document.createElement('div')
  shade.className = className
  return shade
}

function pagePrototype(leaf: HTMLElement, side: 'front' | 'back') {
  const page = leaf.querySelector(`:scope > .${styles[side]} > section`)
  const copy = page?.cloneNode(true) as HTMLElement
  copy.querySelectorAll('img').forEach((image) => {
    image.loading = 'eager'
    image.decoding = 'sync'
  })
  return copy
}

function buildSheet(leaf: HTMLElement): Sheet {
  // Taille exacte de la page : arrondie, le texte de la copie se recomposerait autrement.
  const { width, height } = getComputedStyle(leaf)
  const pageWidth = parseFloat(width)
  const pageHeight = parseFloat(height)
  const count = clamp(Math.round(pageWidth / STRIP_WIDTH), MIN_STRIPS, MAX_STRIPS)
  // Une largeur entière évite les traits entre deux bandes.
  const stripWidth = Math.ceil(pageWidth / count)
  const front = pagePrototype(leaf, 'front')
  const back = pagePrototype(leaf, 'back')
  const element = document.createElement('div')
  element.className = styles.sheet

  const strips = Array.from({ length: count }, (_, index) => {
    const strip = document.createElement('div')
    strip.className = styles.strip
    const start = index * stripWidth
    const visible = Math.min(stripWidth, pageWidth - start)
    strip.style.width = `${visible + STRIP_OVERLAP}px`
    // L'ombre reste hors de la découpe : repeinte à chaque image, elle ne touche pas au texte.
    const frontShade = shadeOf(styles.stripShadeFront)
    const backShade = shadeOf(styles.stripShadeBack)
    strip.append(
      sliceOf(front, start, pageWidth, pageHeight, styles.stripFront),
      sliceOf(back, pageWidth - start - visible - STRIP_OVERLAP, pageWidth, pageHeight, styles.stripBack),
      frontShade,
      backShade,
    )
    element.append(strip)
    return { element: strip, frontShade, backShade }
  })

  return { element, strips, stripWidth, pageWidth }
}

const shadeColor = (angle: number, strength: number) => {
  const slope = 1 - Math.abs(Math.cos((angle * Math.PI) / 180))
  return `rgb(42 28 16 / ${(slope * strength).toFixed(3)})`
}

/** Dessine la feuille comme une bande souple : l'extrémité libre mène, le pli reste près du dos. */
function drawSheet(sheet: Sheet, progress: number, forward: boolean) {
  const bend = MAX_BEND * Math.sin(Math.PI * progress) * (forward ? 1 : -1)
  const angleAt = (along: number) => clamp(180 * progress + (along - 0.5) * bend, 0, 180)
  let x = 0
  let z = 0

  sheet.strips.forEach(({ element, frontShade, backShade }, index) => {
    const start = angleAt((index * sheet.stripWidth) / sheet.pageWidth)
    const end = angleAt(Math.min(((index + 1) * sheet.stripWidth) / sheet.pageWidth, 1))
    const angle = (start + end) / 2
    const radians = (angle * Math.PI) / 180
    element.style.transform = `translate3d(${x.toFixed(2)}px,0,${z.toFixed(2)}px) rotateY(${-angle.toFixed(2)}deg)`
    frontShade.style.background = `linear-gradient(90deg,${shadeColor(start, 0.36)},${shadeColor(end, 0.36)})`
    backShade.style.background = `linear-gradient(270deg,${shadeColor(start, 0.26)},${shadeColor(end, 0.26)})`
    x += sheet.stripWidth * Math.cos(radians)
    z += sheet.stripWidth * Math.sin(radians)
  })

  return x / sheet.pageWidth
}

export function createBookEngine({
  book,
  leaves,
  sheets,
  castLeft,
  castRight,
  isReducedMotion,
  onPositionChange,
}: BookEngineOptions): BookEngine {
  const lastLeaf = leaves.length - 1
  const progress = leaves.map(() => 0)
  const forwardBend = leaves.map(() => true)
  const motions = new Map<number, Motion>()
  const active = new Set<number>()
  const turning = new Map<number, Sheet>()
  let position = 0
  let frame = 0
  let pointer: Pointer | null = null
  let refocus = false

  const isBoard = (leaf: number) => leaf === 0 || leaf === lastLeaf

  function setRest(leaf: number) {
    const element = leaves[leaf]
    const left = progress[leaf] >= 1
    element.dataset.rest = left ? 'left' : 'right'
    element.style.zIndex = String(left ? leaf * 2 : (lastLeaf - leaf) * 2)
    element.style.transform = ''
    element.style.removeProperty('--lift')
  }

  function layout() {
    let leftTop = -1
    let rightTop = leaves.length
    for (let leaf = 0; leaf <= lastLeaf; leaf++) {
      if (active.has(leaf)) continue
      if (progress[leaf] >= 1) leftTop = leaf
      else if (rightTop === leaves.length) rightTop = leaf
    }
    leaves.forEach((element, leaf) => {
      const shown = !active.has(leaf) && (leaf === leftTop || leaf === rightTop || isBoard(leaf))
      element.dataset.shown = String(shown)
    })
    const sheetsOn = (side: 'left' | 'right') =>
      leaves.filter((_, leaf) => !isBoard(leaf) && (side === 'left' ? progress[leaf] >= 0.5 : progress[leaf] < 0.5)).length
    book.style.setProperty('--sheets-left', String(progress[0] >= 1 ? sheetsOn('left') : 0))
    book.style.setProperty('--sheets-right', String(progress[lastLeaf] < 1 ? sheetsOn('right') : 0))
    book.dataset.leftBoard = String(progress[0] >= 1)
    book.dataset.rightBoard = String(progress[lastLeaf] < 1)
  }

  function drawCamera() {
    const front = progress[0]
    const back = progress[lastLeaf]
    book.style.setProperty('--closed', (1 - front * (1 - back)).toFixed(4))
    book.style.setProperty('--shift', ((1 - front) * -0.5 + back * 0.5).toFixed(4))
    book.style.setProperty('--thick-right', (1 - front).toFixed(4))
    book.style.setProperty('--thick-left', back.toFixed(4))
    book.style.setProperty('--ground-left', landing(front).toFixed(3))
    book.style.setProperty('--ground-right', (1 - landing(back)).toFixed(3))
  }

  function drawCast(reach: number, strength: number) {
    castRight.style.opacity = reach > 0 ? strength.toFixed(3) : '0'
    castLeft.style.opacity = reach < 0 ? strength.toFixed(3) : '0'
    const scale = `translateZ(.5px) scaleX(${clamp(Math.abs(reach), 0.08, 1).toFixed(3)})`
    castRight.style.transform = scale
    castLeft.style.transform = scale
  }

  function draw() {
    let reach = 0
    let strength = 0
    active.forEach((leaf) => {
      const value = progress[leaf]
      const sheet = turning.get(leaf)
      const lift = Math.sin(Math.PI * value)
      if (sheet) {
        reach = drawSheet(sheet, value, forwardBend[leaf])
      } else {
        // Décollage progressif pour éviter un saut, avec une marge pour rester au-dessus des pages.
        leaves[leaf].style.setProperty('--lift', lift.toFixed(3))
        leaves[leaf].style.transform = `translateZ(${(BOARD_CLEARANCE + lift).toFixed(3)}px) rotateY(${(-180 * value).toFixed(2)}deg)`
        reach = Math.cos(Math.PI * value)
      }
      strength = Math.max(strength, lift * 0.42)
    })
    drawCast(reach, strength)
    drawCamera()
  }

  function begin(leaf: number) {
    if (active.has(leaf)) return
    active.add(leaf)
    book.dataset.turning = 'true'
    const element = leaves[leaf]
    delete element.dataset.rest
    element.style.zIndex = ''
    if (!isBoard(leaf)) {
      const sheet = buildSheet(element)
      turning.set(leaf, sheet)
      sheets.append(sheet.element)
    }
    layout()
  }

  function finish(leaf: number) {
    active.delete(leaf)
    motions.delete(leaf)
    turning.get(leaf)?.element.remove()
    turning.delete(leaf)
    setRest(leaf)
    layout()
  }

  function settle() {
    delete book.dataset.turning
    drawCast(0, 0)
    drawCamera()
    if (!refocus) return
    refocus = false
    const pages = [...book.querySelectorAll('section')]
    pages.find((page) => getComputedStyle(page).visibility === 'visible')?.focus({ preventScroll: true })
  }

  function tick() {
    frame = 0
    const now = performance.now()
    motions.forEach((motion, leaf) => {
      if (now < motion.start) return
      begin(leaf)
      const elapsed = clamp((now - motion.start) / motion.duration, 0, 1)
      progress[leaf] = motion.from + (motion.to - motion.from) * motion.ease(elapsed)
      if (elapsed === 1) {
        progress[leaf] = motion.to
        finish(leaf)
      }
    })
    draw()
    if (motions.size > 0 || pointer?.drag) frame = requestAnimationFrame(tick)
    else settle()
  }

  function run() {
    if (!frame) frame = requestAnimationFrame(tick)
  }

  function animate(leaf: number, to: number, delay: number, duration: number, ease: Easing) {
    motions.set(leaf, {
      from: progress[leaf],
      to,
      start: performance.now() + delay,
      duration: Math.max(duration * Math.abs(to - progress[leaf]), 220),
      ease,
    })
  }

  function emit() {
    book.dataset.position = String(position)
    onPositionChange(position)
  }

  function goTo(target: number, instant = false) {
    const next = clamp(target, 0, leaves.length)
    if (next === position) return
    const forward = next > position
    const order: number[] = []
    if (forward) for (let leaf = position; leaf < next; leaf++) order.push(leaf)
    else for (let leaf = position - 1; leaf >= next; leaf--) order.push(leaf)
    position = next
    refocus = book.contains(document.activeElement)

    if (instant || isReducedMotion()) {
      order.forEach((leaf) => {
        progress[leaf] = forward ? 1 : 0
        if (active.has(leaf)) finish(leaf)
        else setRest(leaf)
      })
      layout()
      settle()
      emit()
      return
    }

    const jump = order.length > 1
    order.forEach((leaf, index) => {
      forwardBend[leaf] = forward
      const duration = (isBoard(leaf) ? COVER_DURATION : TURN_DURATION) * (jump ? JUMP_FACTOR : 1)
      animate(leaf, forward ? 1 : 0, index * JUMP_STAGGER, duration, easeInOut)
    })
    emit()
    run()
  }

  function startDrag(event: PointerEvent, current: Pointer, forward: boolean) {
    const leaf = forward ? position : position - 1
    if (leaf < 0 || leaf > lastLeaf) return false
    motions.delete(leaf)
    forwardBend[leaf] = forward
    begin(leaf)
    current.drag = { leaf, from: progress[leaf], forward, lastX: event.clientX, lastTime: event.timeStamp, velocity: 0 }
    book.setPointerCapture(event.pointerId)
    run()
    return true
  }

  function onPointerDown(event: PointerEvent) {
    if (pointer || event.button !== 0) return
    const target = event.target as Element
    pointer = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      time: event.timeStamp,
      clickable: !!target.closest(CLICKABLE),
      drag: null,
    }
  }

  function onPointerMove(event: PointerEvent) {
    if (!pointer || event.pointerId !== pointer.id) return
    const dx = event.clientX - pointer.x
    const dy = event.clientY - pointer.y

    if (!pointer.drag) {
      if (Math.hypot(dx, dy) < DRAG_THRESHOLD) return
      if (Math.abs(dy) > Math.abs(dx) || isReducedMotion()) {
        if (isReducedMotion() && Math.abs(dx) > Math.abs(dy)) goTo(position + (dx < 0 ? 1 : -1))
        pointer = null
        return
      }
      if (!startDrag(event, pointer, dx < 0)) {
        pointer = null
        return
      }
    }

    const drag = pointer.drag
    if (!drag) return
    const span = book.getBoundingClientRect().width
    progress[drag.leaf] = clamp(drag.from - dx / span, 0, 1)
    const elapsed = event.timeStamp - drag.lastTime
    if (elapsed > 0) drag.velocity = (event.clientX - drag.lastX) / elapsed
    drag.lastX = event.clientX
    drag.lastTime = event.timeStamp
  }

  function swallowClick(event: MouseEvent) {
    event.preventDefault()
    event.stopPropagation()
  }

  function onPointerUp(event: PointerEvent) {
    if (!pointer || event.pointerId !== pointer.id) return
    const current = pointer
    pointer = null

    if (current.drag) {
      const { leaf, forward, lastTime } = current.drag
      const value = progress[leaf]
      const travelled = forward ? value : 1 - value
      // Une main qui s'est arrêtée avant de relâcher ne lance plus la page.
      const velocity = event.timeStamp - lastTime > FLICK_WINDOW ? 0 : current.drag.velocity
      const flicked = forward ? velocity < -COMMIT_VELOCITY : velocity > COMMIT_VELOCITY
      const commit = event.type === 'pointerup' && (travelled > COMMIT_PROGRESS || flicked)
      if (commit) {
        position += forward ? 1 : -1
        emit()
      }
      const to = commit === forward ? 1 : 0
      animate(leaf, to, 0, isBoard(leaf) ? COVER_DURATION : TURN_DURATION, easeOut)
      window.addEventListener('click', swallowClick, { capture: true, once: true })
      setTimeout(() => window.removeEventListener('click', swallowClick, true), 0)
      run()
      return
    }

    const tapped = event.type === 'pointerup' && !current.clickable && event.timeStamp - current.time < TAP_DURATION
    if (!tapped) return
    const { left, width } = book.getBoundingClientRect()
    if (position === 0) goTo(1)
    else if (position === leaves.length) goTo(position - 1)
    else goTo(position + (event.clientX > left + width / 2 ? 1 : -1))
  }

  const preventDragStart = (event: Event) => event.preventDefault()

  const scene = book.parentElement as HTMLElement
  let sceneSize = `${scene.clientWidth}x${scene.clientHeight}`

  const observer = new ResizeObserver(() => {
    const size = `${scene.clientWidth}x${scene.clientHeight}`
    if (size === sceneSize) return
    sceneSize = size
    const moving = new Set([...active, ...motions.keys()])
    if (moving.size === 0) return
    motions.clear()
    pointer = null
    moving.forEach((leaf) => {
      progress[leaf] = leaf < position ? 1 : 0
      if (active.has(leaf)) finish(leaf)
      else setRest(leaf)
    })
    layout()
    settle()
  })

  leaves.forEach((_, leaf) => setRest(leaf))
  layout()
  drawCamera()
  book.dataset.position = '0'
  observer.observe(scene)
  book.addEventListener('pointerdown', onPointerDown)
  book.addEventListener('dragstart', preventDragStart)
  window.addEventListener('pointermove', onPointerMove)
  window.addEventListener('pointerup', onPointerUp)
  window.addEventListener('pointercancel', onPointerUp)

  return {
    goTo,
    next: () => goTo(position + 1),
    previous: () => goTo(position - 1),
    getPosition: () => position,
    destroy() {
      cancelAnimationFrame(frame)
      observer.disconnect()
      book.removeEventListener('pointerdown', onPointerDown)
      book.removeEventListener('dragstart', preventDragStart)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('pointercancel', onPointerUp)
      sheets.replaceChildren()
    },
  }
}
