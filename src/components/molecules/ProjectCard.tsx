import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import type { Project } from '../sections/projects/projects.data'

type ProjectCardProps = {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.id}`}
      aria-label={`Ouvrir ${project.name}`}
      className="group relative flex aspect-square w-full flex-col overflow-hidden rounded-2xl border border-foreground/10 bg-(--background-card) text-left origin-bottom transition-transform transition-shadow duration-500 ease-out hover:rotate-[3deg] hover:border-important/60 hover:shadow-[6px_10px_20px_-14px_var(--color-important)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-important/60 focus-visible:ring-offset-2 focus-visible:ring-offset-(--background) cursor-pointer will-change-transform"
    >
      <div className="relative h-1/2 w-full overflow-hidden bg-gradient-to-br from-important/10 via-foreground/5 to-transparent">
        {project.image ? (
          <Image
            src={project.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <div className="text-important/30 [&>svg]:h-20 [&>svg]:w-20 transition-transform duration-500 group-hover:scale-110">
              {project.logo}
            </div>
          </div>
        )}
        <div className="absolute top-3 left-3 flex h-9 w-9 items-center justify-center rounded-lg border border-foreground/10 bg-(--background)/80 backdrop-blur-sm text-important [&>svg]:h-4 [&>svg]:w-4">
          {project.logo}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-serif text-lg leading-tight transition-colors duration-300 group-hover:text-important">
          {project.name}
        </h3>
        <p className="text-foreground/70 line-clamp-2 text-sm">{project.description}</p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {project.stack.map((logo, i) => (
            <span
              key={i}
              className="flex h-7 w-7 items-center justify-center rounded-md border border-foreground/10 bg-(--background)/40 [&>svg]:h-3.5 [&>svg]:w-3.5"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
