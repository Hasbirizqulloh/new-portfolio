import { Projects, Project } from "@/components/sections/Projects";
import prisma from "@/lib/prisma";

export const metadata = {
    title: "Projects | DevPortfolio",
    description: "Explore the engineering gallery and portfolio of Hasbirizqulloh.",
};

const categoryColorMap: Record<string, string> = {
    "AI / ML": "text-primary border-primary/20",
    "Fullstack": "text-blue-400 border-blue-400/20",
    "Data Eng": "text-purple-400 border-purple-400/20",
};

export default async function ProjectsPage() {
    // 1. Fetch data directly in Server Component (No API route needed!)
    // Note: If you don't have records yet, it will return an empty array safely.
    const dbProjects = await prisma.project.findMany({
        include: {
            technologies: {
                include: {
                    technology: true,
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    // 2. Map Database schema to Frontend UI structure
    const formattedProjects: Project[] = dbProjects.map((p) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        category: p.category,
        categoryColor: categoryColorMap[p.category] || "text-gray-400 border-gray-400/20",
        image: p.coverImageUrl || "",
        // Flatten the deep M-to-M relation table into a simple array of strings
        tech: p.technologies.map((t) => t.technology.name),
    }));

    return (
        <main className="flex flex-col min-h-screen">
            <Projects initialProjects={formattedProjects} />
        </main>
    );
}
