import { ProjectDetail } from "@/components/sections/ProjectDetail";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export const metadata = {
    title: "Case Study | DevPortfolio",
    description: "In-depth project case study and architecture breakdown.",
};

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function ProjectDetailPage({ params }: PageProps) {
    // Extract id and await the promise (Next.js 15 requirement)
    const { id } = await params;

    const dbProject = await prisma.project.findUnique({
        where: { id },
        include: {
            technologies: {
                include: { technology: true }
            },
            challenges: true,
            results: {
                orderBy: { sortOrder: 'asc' }
            }
        }
    });

    if (!dbProject) return notFound();

    // Map DB to frontend model
    const project = {
        id: dbProject.id,
        title: dbProject.title,
        description: dbProject.description,
        content: dbProject.content,
        category: dbProject.category,
        image: dbProject.coverImageUrl || "",
        liveDemoUrl: dbProject.liveDemoUrl || null,
        sourceCodeUrl: dbProject.sourceCodeUrl || null,
        year: dbProject.year,
        platform: dbProject.platform,
        client: dbProject.client,
        tech: dbProject.technologies.map(t => ({
            name: t.technology.name,
            category: t.technology.category || "Other"
        })),
        architectureDescription: dbProject.architectureDescription || "The system follows a client-server architecture designed for heavy computational offloading. The backend handles model parsing and simplification, while the frontend focuses on high-performance WebGL rendering.",
        architectureImageUrl: dbProject.architectureImageUrl,
        challenges: dbProject.challenges.map(c => ({
            id: c.id,
            title: c.title,
            challenge: c.challenge,
            solution: c.solution,
            iconType: c.iconType || "Lightbulb"
        })),
        results: dbProject.results.map(r => ({
            id: r.id,
            metric: r.metric,
            value: r.value,
            color: r.color || "primary"
        }))
    };

    return (
        <main className="flex flex-col min-h-screen">
            <ProjectDetail project={project} />
        </main>
    );
}
