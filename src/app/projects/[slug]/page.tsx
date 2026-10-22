import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/project-detail";
import { projects } from "@/data/content";

export const dynamicParams = false;
export function generateStaticParams() {
  return projects.length ? projects.map((project) => ({ slug: project.slug })) : [{ slug: "__empty__" }];
}
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  return <ProjectDetail project={project} />;
}
