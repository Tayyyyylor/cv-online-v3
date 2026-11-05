import { notFound } from 'next/navigation'
import Modal from '@/components/molecules/Modal'
import ProjectDetail from '@/components/sections/projects/ProjectDetail'
import { getNextProject, getProjectById, projects } from '@/components/sections/projects/projects.data'

type Props = {
  params: Promise<{ id: string; locale: string }>
}

export default async function ProjectModalPage({ params }: Props) {
  const { id } = await params
  const project = getProjectById(id)
  if (!project) notFound()

  return (
    <Modal key={project.id}>
      <ProjectDetail project={project} nextId={getNextProject(project.id).id} />
    </Modal>
  )
}

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }))
}
