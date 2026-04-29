import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import type { Project } from '../sections/projects/projects.data'
import Badge from '../atoms/Badge'
import Image from 'next/image'

type ProjectCardProps = {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const t = useTranslations('Projects.items')
  const name = t(`${project.id}.name`)
  const description = t(`${project.id}.description`)

  return (
    <Link
      href={`/projects/${project.id}`}
      aria-label={`Ouvrir ${name}`}
      className="group relative flex gap-6 aspect-[1.5] w-full flex-col overflow-hidden rounded-2xl border border-foreground/10 bg-(--background-card) text-left origin-bottom transition-transform transition-shadow duration-500 ease-out hover:rotate-[3deg] hover:border-important/60 hover:shadow-[6px_10px_20px_-14px_var(--color-important)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-important/60 focus-visible:ring-offset-2 focus-visible:ring-offset-(--background) cursor-pointer will-change-transform"
    >
    <div className='flex items-center gap-3 p-3'>
      <Image src={project.logo} alt='logo' width={50} height={50} className="h-auto w-auto object-contain"/>
        <h3 className="font-serif text-lg leading-tight transition-colors duration-300 group-hover:text-important">
          {name}
        </h3>
      </div>

      <div className="flex flex-col gap-2 px-4 justify-between">

        <p className="text-foreground/70 line-clamp-2 text-sm">{description}</p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {project.stack.map((logo, i) => (
            <Badge key={i} logo={logo} />
          ))}
        </div>
      </div>
    </Link>
  )
}
