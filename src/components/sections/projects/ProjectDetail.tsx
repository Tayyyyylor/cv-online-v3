import Image from 'next/image'
import { ExternalLink, Globe } from 'lucide-react'
import { SiGithub } from '@icons-pack/react-simple-icons'
import { useTranslations } from 'next-intl'
import type { Project, ProjectLinkKind } from './projects.data'
import Button from '@/components/atoms/Button'

const linkIcon: Record<ProjectLinkKind, React.ComponentType<{ className?: string }>> = {
  repo: SiGithub,
  website: Globe,
  demo: ExternalLink,
  other: ExternalLink,
}

export default function ProjectDetail({ project }: { project: Project }) {
  const t = useTranslations('Projects.items')
  const name = t(`${project.id}.name`)
  const role = t(`${project.id}.role`)
  const longDescription = t.raw(`${project.id}.longDescription`) as string[]
  const highlightsRaw = t.has(`${project.id}.highlights`)
    ? (t.raw(`${project.id}.highlights`) as string[])
    : undefined
  const highlights = Array.isArray(highlightsRaw) ? highlightsRaw : undefined

  return (
    <article className="flex flex-col gap-8">
      <header className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-foreground/10 bg-(--background-card) text-important [&>svg]:h-5 [&>svg]:w-5">
            {project.logo}
          </span>
          <div className="flex flex-col">
            <h1 className="font-serif text-3xl leading-tight">{name}</h1>
            <p className="font-mono text-xs text-foreground/60">
              {project.year} · {role}
            </p>
          </div>
        </div>

        {project.image && (
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-foreground/10 bg-gradient-to-br from-important/10 via-foreground/5 to-transparent">
            <Image
              src={project.image}
              alt={name}
              fill
              sizes="(min-width: 1024px) 720px, 100vw"
              className="object-cover"
              priority
            />
          </div>
        )}
      </header>

      <section className="flex flex-col gap-3">
        {longDescription.map((paragraph, i) => (
          <p key={i} className="text-foreground/80 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </section>

      {highlights && highlights.length > 0 && (
        <section className="flex flex-col gap-3">
          <h2 className="font-serif text-xl">Points clés</h2>
          <ul className="flex flex-col gap-2">
            {highlights.map((item, i) => (
              <li key={i} className="flex gap-3 text-foreground/80">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-important" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="flex flex-col gap-3">
        <h2 className="font-serif text-xl">Stack technique</h2>
        <ul className="flex flex-wrap gap-2">
          {project.detailedStack.map((tech) => (
            <li
              key={tech.name}
              className="flex items-center gap-2 rounded-lg border border-foreground/10 bg-(--background-card) px-3 py-2 text-sm [&>span:first-child>svg]:h-4 [&>span:first-child>svg]:w-4"
            >
              <span className="text-important">{tech.icon}</span>
              <span>{tech.name}</span>
            </li>
          ))}
        </ul>
      </section>

      {project.mockups && project.mockups.length > 0 && (
        <section className="flex flex-col gap-3">
          <h2 className="font-serif text-xl">Aperçus</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {project.mockups.map((src, i) => (
              <div
                key={i}
                className="relative aspect-[4/3] overflow-hidden rounded-xl border border-foreground/10 bg-(--background-card)"
              >
                <Image
                  src={src}
                  alt={`${name} - aperçu ${i + 1}`}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {project.links && project.links.length > 0 && (
        <section className="flex flex-wrap gap-3 pt-2">
          {project.links.map((link) => {
            const Icon = linkIcon[link.kind]
            return (
               <Button key={link.href} href={link.href} variant="primary">
                                         <Icon className="h-4 w-4" />
                {t(`${project.id}.links.${link.kind}`)}
                                      </Button>
            )
          })}
        </section>
      )}
    </article>
  )
}
