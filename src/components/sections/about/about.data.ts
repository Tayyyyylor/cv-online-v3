export type AboutData = {
  photo: string
  headline: { line1: string; line2Italic: string }
  paragraphs: string[]
  now: {
    workingOn: string
    reading: { title: string; href?: string }
    building: string
    updatedAt: string
  }
}

export const aboutData: AboutData = {
  photo: '/toto.png',
  headline: {
    line1: 'Mi-développeur, mi-bricoleur,',
    line2Italic: 'lecteur à plein temps.',
  },
  paragraphs: [
    "J'ai commencé à coder par curiosité, pour comprendre comment les sites que je lisais étaient faits. Très vite, l'envie de construire a pris le pas sur celle de consommer — et elle ne m'a plus quitté depuis.",
    "Je suis surtout heureux quand un détail s'ajuste : un timing d'animation qui sonne juste, une typographie qui respire, une interaction qui se laisse oublier. Le front est mon terrain de jeu, mais je touche à toute la chaîne — back, data, infra légère.",
    "En dehors de l'écran, je lis beaucoup. Philosophie, essais, fiction. C'est ce qui m'a poussé à faire MyShelf — un outil pour mes lectures, pas un réseau social.",
    "Et quand j'ai besoin de toucher au concret, je sors mon Raspberry Pi et quelques composants. Tout ne se code pas — parfois il faut sentir un fer à souder.",
  ],
  now: {
    workingOn: 'Le redesign de mon portfolio.',
    reading: { title: "L'Éthique de Spinoza", href: 'https://fr.wikipedia.org/wiki/%C3%89thique_(Spinoza)' },
    building: "Un capteur de qualité d'air pour ma chambre.",
    updatedAt: '28 avril 2026',
  },
}
