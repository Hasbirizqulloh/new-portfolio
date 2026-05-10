import { PostDetail } from "@/components/sections/PostDetail";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export const metadata = {
    title: "Article | DevPortfolio",
    description: "Read in-depth engineering insights.",
};

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function BlogPostPage({ params }: PageProps) {
    const { id } = await params;

    const dbPost = await prisma.blogPost.findUnique({
        where: { id },
    });

    if (!dbPost) return notFound();

    const post = {
        id: dbPost.id,
        title: dbPost.title,
        excerpt: dbPost.excerpt,
        content: dbPost.content,
        category: dbPost.category,
        date: dbPost.publishedAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        readTime: `${dbPost.readTimeMinutes} min read`,
        author: dbPost.author,
        tags: dbPost.tags,
        image: dbPost.coverImageUrl || undefined,
    };

    return (
        <main className="flex flex-col min-h-screen">
            <PostDetail post={post} />
        </main>
    );
}
