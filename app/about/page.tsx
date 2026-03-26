import { About } from "@/components/sections/About";

export const metadata = {
    title: "About | DevPortfolio",
    description: "Learn more about Hasbirizqulloh, Fullstack & AI Engineer.",
};

export default function AboutPage() {
    return (
        <main className="flex flex-col min-h-screen">
            <About />
        </main>
    );
}
