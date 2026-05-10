import { Blog, BlogPost } from "@/components/sections/Blog";
import prisma from "@/lib/prisma";

export const metadata = {
    title: "Blog | DevPortfolio",
    description: "Read engineering insights on AI, Fullstack, and Data Engineering by Hasbirizqulloh.",
};

export default async function BlogPage() {
    const dbPosts = await prisma.blogPost.findMany({
        orderBy: { publishedAt: 'desc' }
    });

    const formattedPosts: BlogPost[] = dbPosts.map((p) => ({
        id: p.id,
        title: p.title,
        excerpt: p.excerpt,
        category: p.category,
        date: p.publishedAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        readTime: `${p.readTimeMinutes} min read`,
        author: p.author,
        tags: p.tags,
        image: p.coverImageUrl || undefined,
        featured: p.isFeatured,
    }));

    return (
        <main className="flex flex-col min-h-screen">
            <Blog initialPosts={formattedPosts} />
        </main>
    );
}
