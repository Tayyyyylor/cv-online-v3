export type BookType = {
  id: string
  title: string
  author: string
  color: string          // couleur de la tranche (hex)
  textColor?: string     // optionnel, défaut blanc cassé
  height: number         // hauteur en % (75 à 100)
  width: number          // largeur en px (32 à 44)
  href?: string          // lien optionnel (MyShelf, article...)
  quote?: string         // citation à afficher au hover/click
}