import { Projects } from "@/components/sections/Projects";

export const metadata = {
    title: "Projects | DevPortfolio",
    description: "Explore the engineering gallery and portfolio of Hasbirizqulloh.",
};

export default function ProjectsPage() {
    return (
        <main className="flex flex-col min-h-screen">
            <Projects />
        </main>
    );
}
