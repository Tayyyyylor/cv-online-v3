import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import ProjectDetail from '@/components/sections/projects/ProjectDetail'
import { getProjectById, projects } from '@/components/sections/projects/projects.data'

type Props = {
  params: Promise<{ id: string; locale: string }>
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params
  const project = getProjectById(id)
  if (!project) notFound()
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-12 sm:py-16">
      <Link
        href="/#projects"
        className="inline-flex items-center gap-2 self-start text-sm text-foreground/70 transition-colors hover:text-important"
      >
        <ArrowLeft className="h-10 w-10" />
      </Link>
      <ProjectDetail project={project} />
    </main>
  )
}

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }))
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  const project = getProjectById(id)
  if (!project) return {}
  const t = await getTranslations('Projects.items')
  return {
    title: t(`${project.id}.name`),
    description: t(`${project.id}.description`),
  }
}
