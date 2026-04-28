import { notFound } from 'next/navigation'
import Modal from '@/components/molecules/Modal'
import ProjectDetail from '@/components/sections/projects/ProjectDetail'
import { getProjectById, projects } from '@/components/sections/projects/projects.data'

type Props = {
  params: Promise<{ id: string; locale: string }>
}

export default async function ProjectModalPage({ params }: Props) {
  const { id } = await params
  const project = getProjectById(id)
  if (!project) notFound()

  return (
    <Modal>
      <ProjectDetail project={project} />
    </Modal>
  )
}

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }))
}
