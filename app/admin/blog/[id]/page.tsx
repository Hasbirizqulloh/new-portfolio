import { getBlogById } from "../../../actions/blog";
import { BlogForm } from "@/components/admin/BlogForm";
import { notFound } from "next/navigation";

interface EditBlogPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  const { id } = await params;
  const blog = await getBlogById(id);

  if (!blog) {
    notFound();
  }

  return (
    <div>
      <BlogForm initialData={{
        ...blog,
        coverImageUrl: blog.coverImageUrl || ""
      }} />
    </div>
  );
}
