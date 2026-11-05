# Portfolio de Bryan Houblon

Portfolio en forme de livre à feuilleter. Next.js, next-intl et Tailwind, avec un moteur de livre maison en CSS 3D.

```sh
bun install
bun run dev
```

Le site tourne sur `http://localhost:3000/fr` et `/en`.

## Où est quoi

| Dossier ou fichier | Contenu |
| --- | --- |
| `src/components/sections/book/book.data.tsx` | Liste des chapitres et des doubles pages, dans l'ordre du livre |
| `src/components/sections/book/pages/` | Une page du livre par fichier |
| `src/components/sections/book/Book.tsx` | Assemblage : navigation, URL, clavier |
| `src/components/molecules/book/` | Briques réutilisables (`BookPage`, `BookText`, onglets, commandes) |
| `src/components/molecules/book/bookEngine.ts` | Moteur : feuilles, couvertures, gestes, animation |
| `src/components/molecules/book/PhysicalBook.module.css` | Taille du livre, caméra, volumes |
| `src/components/sections/projects/projects.data.tsx` | Données des projets, partagées par le livre et les fiches |
| `messages/fr.json`, `messages/en.json` | Tous les textes. Ceux du livre sont sous la clé `Book` |

## Ajouter une double page

Le livre s'ouvre toujours sur deux pages, donc on les ajoute par paire : une gauche, une droite. Numéros de page, compteur, sommaire et ancres se recalculent tout seuls.

**1. Créer les pages** dans `src/components/sections/book/pages/` :

```tsx
'use client'

import { useTranslations } from 'next-intl'
import BookPage from '@/components/molecules/book/BookPage'
import { BookTitle, Lead, richTitle } from '@/components/molecules/book/BookText'

export default function LecturesPage() {
  const t = useTranslations('Book.lectures')

  return (
    <BookPage head={t('head')} foot={t('foot')} labelledBy="lectures-title">
      <BookTitle id="lectures-title" className="mt-[6.4cqw] mb-[3.2cqw] text-[clamp(23px,8.8cqw,54px)]">
        {t.rich('title', richTitle)}
      </BookTitle>
      <Lead>{t('intro')}</Lead>
      <Lead className="@max-[300px]:hidden">{t('details')}</Lead>
    </BookPage>
  )
}
```

`BookPage` gère les marges, l'en-tête et le pied de page. Options utiles : `aside` pour remplacer le numéro de chapitre en haut à droite, `paper="bg-[#efebe0]"` pour changer la couleur du papier, `dark` pour un fond sombre.

**2. Ajouter les textes** dans `messages/fr.json` et `messages/en.json`, sous `Book` :

```json
"lectures": {
  "head": "Ce que je lis",
  "title": "Mes lectures<br></br><em>du moment.</em>",
  "intro": "Quelques livres qui m’ont marqué.",
  "details": "Le détail qu’on peut retirer sur téléphone.",
  "foot": "Lectures"
}
```

Dans ces titres, `<em>` met en italique et `<br></br>` passe à la ligne. Écrire `’` plutôt que `'` juste avant une balise : l'apostrophe droite y est interprétée par ICU.

**3. Déclarer la double page** dans `book.data.tsx`, dans le chapitre voulu :

```tsx
{
  id: 'about',
  tab: 'bg-[#b3b9bc] text-[#3d4b51]',
  spreads: [
    { left: <PortraitPage />, right: <AboutPage /> },
    { left: <LecturesPage />, right: <AutrePage /> },
  ],
},
```

## Ajouter un chapitre

Ajouter une entrée dans `chapters` (`book.data.tsx`), à la position voulue :

```tsx
{
  id: 'lectures',
  tab: 'bg-[#a9b8a0] text-[#2f3b2a]',
  contents: { icon: <BookOpen />, tint: 'bg-[#e4e9dc] text-[#5a6b50]' },
  spreads: [{ left: <LecturesPage />, right: <AutrePage /> }],
},
```

- `id` sert d'ancre (`/fr#lectures`) et de clé pour les textes.
- `tab` donne les couleurs de l'onglet.
- `contents` est facultatif : sans lui, le chapitre n'apparaît pas dans le sommaire.

Puis ajouter ses libellés dans `Book.chapters` des deux fichiers de messages. `summary` n'est nécessaire que si le chapitre a un `contents`, et `short` remplace `label` là où la place manque :

```json
"lectures": { "label": "Mes lectures", "short": "Lectures", "summary": "Ce que je lis en ce moment." }
```

Le dernier chapitre de la liste reçoit le bouton de contact du header : garder `contact` en dernier.

## Ajouter ou modifier un projet

Un projet vit à deux endroits :

- `projects.data.tsx` : visuels, stack, liens et `theme`, la palette de sa fiche en plein écran.
- `Projects.items.<id>` dans les messages : `tagline`, `description`, `longDescription` (l'histoire), `highlights` et `technical` (« Sous le capot »).

Pour les boutons, l'ordre reste `website`, `appStore`, `googlePlay`. Un lien sans `href` s'affiche comme « Bientôt » : c'est le cas de l'App Store de Noomi, il suffira d'ajouter son `href` à la sortie.

## Dessiner une page pour toutes les tailles

Une page ne défile pas : ce qui dépasse est coupé. Elle fait 660 px de large sur grand écran et 160 px sur un petit téléphone, toujours en double page.

- Exprimer les tailles en `cqw` (pourcentage de la largeur de la page) et les textes avec un minimum : `text-[clamp(11px,2.4cqw,15.5px)]`.
- Retirer ce qui est secondaire sur téléphone avec `@max-[300px]:hidden`. Une page haute et étroite peut le remettre avec `[@container(min-height:400px)]:block`.
- `Lead`, `BookTitle`, `MonoLabel` et `BookLink` suivent déjà ces règles.

Pour les couleurs, utiliser les jetons (`text-ink`, `bg-paper-warm`, `text-rose`, etc.) plutôt qu'une valeur en dur : ils changent avec le thème clair ou sombre, et sont définis dans `globals.css`.

Vérifier la page en français et en anglais, en clair et en sombre, sur ordinateur, sur un téléphone en portrait et en paysage.

## Le moteur

`bookEngine.ts` modélise un vrai livre. Chaque feuille a un recto et un verso, et tourne autour du dos. La première et la dernière feuille sont les couvertures : deux planches rigides plus grandes que le papier, qui servent de support une fois posées. Une feuille souple qui tourne est découpée en bandes verticales pour se courber en 3D. Au repos, tout redevient du DOM à plat : le texte reste net et les liens fonctionnent normalement.

Tous les gestes passent par `goTo`, `next` et `previous`. La `position` est le nombre de feuilles tournées : 0 pour le livre fermé, le nombre de feuilles pour le livre refermé sur le dos.
