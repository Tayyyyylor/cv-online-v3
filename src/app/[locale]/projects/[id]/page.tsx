import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import ProjectDetail from '@/components/sections/projects/ProjectDetail'
import { getNextProject, getProjectById, projects } from '@/components/sections/projects/projects.data'
import { sheetBackButton } from '@/components/sections/projects/sheetStyles'

type Props = {
  params: Promise<{ id: string; locale: string }>
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params
  const project = getProjectById(id)
  if (!project) notFound()
  const t = await getTranslations('Project')
  const chapter = project.categories.includes('clients') ? 'projects' : project.id
  return (
    <main data-project-document>
      <Link href={`/#${chapter}`} className={sheetBackButton}>
        <ArrowLeft className="size-4" aria-hidden="true" />
        {t('backToBook')}
      </Link>
      <ProjectDetail project={project} nextId={getNextProject(project.id).id} />
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
