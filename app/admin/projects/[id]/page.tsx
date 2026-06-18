import { getProjectById } from "../../../actions/projects";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { notFound } from "next/navigation";

interface EditProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <div>
      <ProjectForm initialData={{
        ...project,
        technologies: project.technologies ? project.technologies.map((t: any) => t.technologyId) : [],
        challenges: project.challenges ? project.challenges.map((c: any) => ({
          title: c.title,
          challenge: c.challenge,
          solution: c.solution
        })) : [],
        results: project.results ? project.results.map((r: any) => ({
          metric: r.metric,
          value: r.value,
          color: r.color || "primary"
        })) : [],
        coverImageUrl: project.coverImageUrl || "",
        liveDemoUrl: project.liveDemoUrl || "",
        sourceCodeUrl: project.sourceCodeUrl || "",
        year: project.year || "",
        platform: project.platform || "",
        client: project.client || "",
        architectureDescription: project.architectureDescription || "",
        architectureImageUrl: project.architectureImageUrl || ""
      }} />
    </div>
  );
}
