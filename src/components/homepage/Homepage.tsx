import Book from '../sections/book/Book'
import { projects } from '../sections/projects/projects.data'

export default function Homepage() {
  // Rendues ici, les icônes de stack arrivent au livre en SVG, sans leur code côté client.
  const bookProjects = projects.map(({ id, year, image, categories, stack, links }) => ({
    id,
    year,
    image,
    client: categories.includes('clients'),
    stack,
    links: links ?? [],
  }))

  return <Book projects={bookProjects} />
}
