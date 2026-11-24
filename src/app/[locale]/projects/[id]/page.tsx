import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import JsonLd from '@/components/seo/JsonLd'
import { projectGraph } from '@/components/seo/structuredData'
import ProjectDetail from '@/components/sections/projects/ProjectDetail'
import { getNextProject, getProjectById, projects, type Project } from '@/components/sections/projects/projects.data'
import { sheetBackButton } from '@/components/sections/projects/sheetStyles'
import { pageMetadata, SITE_NAME } from '@/lib/site'

type Props = {
  params: Promise<{ id: string; locale: string }>
}

export default async function ProjectPage({ params }: Props) {
  const { id, locale } = await params
  setRequestLocale(locale)
  const project = getProjectById(id)
  if (!project) notFound()
  const t = await getTranslations({ locale, namespace: 'Project' })
  const text = await getProjectText(locale, project)
  const chapter = project.categories.includes('clients') ? 'projects' : project.id
  return (
    <main data-project-document>
      <JsonLd data={projectGraph(locale, project, text)} />
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

async function getProjectText(locale: string, project: Project) {
  const [items, meta] = await Promise.all([
    getTranslations({ locale, namespace: 'Projects.items' }),
    getTranslations({ locale, namespace: 'Book.meta' }),
  ])
  const name = items(`${project.id}.name`)
  const stack = project.detailedStack.slice(0, 5).map(({ name }) => name).join(', ')
  return {
    name,
    description: meta('project', { description: items(`${project.id}.description`), stack }),
    shareTitle: `${name} · ${SITE_NAME}`,
    jobTitle: meta('jobTitle'),
    personDescription: meta('description'),
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, locale } = await params
  const project = getProjectById(id)
  if (!project) return {}
  const { name, description, shareTitle } = await getProjectText(locale, project)
  return pageMetadata({ locale, path: `/projects/${project.id}`, title: name, shareTitle, description })
}
