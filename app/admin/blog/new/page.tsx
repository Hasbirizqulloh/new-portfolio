import { BlogForm } from "@/components/admin/BlogForm";

export default function NewBlogPage() {
  return (
    <div className="min-h-screen bg-background-dark p-8">
      <div className="max-w-7xl mx-auto">
        <BlogForm />
      </div>
    </div>
  );
}
