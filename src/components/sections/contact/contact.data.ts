export type ContactLink = {
  label: string
  href: string
}

export type ContactData = {
  headline: { line1: string; line2Italic: string }
  description: string
  email: string
  links: ContactLink[]
  cv: { href: string; label: string; meta: string }
}

export const contactData: ContactData = {
  headline: { line1: 'Parlons-', line2Italic: 'nous.' },
  description:
    "Un projet en tête, une question, ou juste envie d'échanger sur un livre ? Écrivez-moi.",
  email: 'bryan.houblon@icloud.com',
  links: [
    { label: 'GitHub', href: 'https://github.com/tayyyyylor' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/bryan-houblon-172121211/' },
    { label: 'MyShelf', href: 'https://myshelf.example.com' },
  ],
  cv: { href: '/cv.pdf', label: 'Télécharger mon CV', meta: 'PDF · 240 Ko' },
}
