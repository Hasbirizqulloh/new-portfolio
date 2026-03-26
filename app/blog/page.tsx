import { Blog } from "@/components/sections/Blog";

export const metadata = {
    title: "Blog | DevPortfolio",
    description: "Read engineering insights on AI, Fullstack, and Data Engineering by Hasbirizqulloh.",
};

export default function BlogPage() {
    return (
        <main className="flex flex-col min-h-screen">
            <Blog />
        </main>
    );
}
