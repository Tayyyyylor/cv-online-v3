'use client'

import { useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import Title from '../../atoms/Title'
import Chip from '../../atoms/Chip'
import ProjectCard from '../../molecules/ProjectCard'
import { projects, useProjectFilters, type ProjectCategory } from './projects.data'
import Reveal, { RevealItem, RevealStagger } from '../../atoms/Reveal'

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('all')
  const projectFilters = useProjectFilters()
  const t = useTranslations('Projects')

  const filtered = useMemo(() => {
    const visible = projects.filter((p) => !p.featured)
    if (activeFilter === 'all') return visible
    return visible.filter((p) => p.categories.includes(activeFilter))
  }, [activeFilter])

  return (
    <article id="projects" className="w-full p-3 mt-20">
      <Reveal>
        <Title
          number="02"
          title={t('title')}
          desc={t.rich('descTitle', {
            important: (chunks) => <span className="text-important italic">{chunks}</span>,
          })}
        />
      </Reveal>

      <RevealStagger className="flex flex-wrap justify-center gap-2 mb-10" stagger={0.05}>
        {projectFilters.map((filter) => (
          <RevealItem key={filter.id} y={10}>
            <Chip
              active={activeFilter === filter.id}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </Chip>
          </RevealItem>
        ))}
      </RevealStagger>

      <RevealStagger
        key={activeFilter}
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:p-10"
        stagger={0.08}
        once={false}
        immediate
      >
        {filtered.map((project) => (
          <RevealItem key={project.id}>
            <ProjectCard project={project} />
          </RevealItem>
        ))}
      </RevealStagger>

      {filtered.length === 0 && (
        <p className="text-center text-foreground/50 mt-10 font-mono text-sm">
          Aucun projet dans cette catégorie pour le moment.
        </p>
      )}
    </article>
  )
}
