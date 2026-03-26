import { PostDetail } from "@/components/sections/PostDetail";

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
    // Extract id from the dynamic route parameter
    const { id } = await params;

    return (
        <main className="flex flex-col min-h-screen">
            <PostDetail id={id} />
        </main>
    );
}
