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
    <div className="min-h-screen bg-background-dark p-8">
      <div className="max-w-7xl mx-auto">
        <ProjectForm initialData={project} />
      </div>
    </div>
  );
}
