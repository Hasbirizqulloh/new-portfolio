import { ProjectDetail } from "@/components/sections/ProjectDetail";

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

    return (
        <main className="flex flex-col min-h-screen">
            <ProjectDetail id={id} />
        </main>
    );
}
