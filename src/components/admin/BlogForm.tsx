"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveBlog } from "../../../app/actions/blog";
import { Save, ArrowLeft, Loader2, Layout, FileText, Image as ImageIcon, Eye } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/ui/Toast";
import { BlogFormData } from "@/types/admin";
import ReactMarkdown from "react-markdown";

interface BlogFormProps {
  initialData?: BlogFormData;
}

export function BlogForm({ initialData }: BlogFormProps) {
  const router = useRouter();
  const { success, error } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isAutoSlug, setIsAutoSlug] = useState(!initialData?.slug);
  
  const [formData, setFormData] = useState<BlogFormData>({
    id: initialData?.id || null,
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    excerpt: initialData?.excerpt || "",
    content: initialData?.content || "",
    category: initialData?.category || "Technology",
    coverImageUrl: initialData?.coverImageUrl || "",
    isFeatured: initialData?.isFeatured || false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as any;
    
    setFormData(prev => {
      const newData = { 
        ...prev, 
        [name]: type === 'checkbox' ? (e.target as any).checked : value 
      };

      // Auto-generate slug if title changes and auto-slug is active
      if (name === "title" && isAutoSlug) {
        newData.slug = value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "");
      }

      return newData;
    });

    if (name === "slug") {
      setIsAutoSlug(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await saveBlog(formData);
    if (result.success) {
      success("Artikel berhasil disimpan!");
      router.push("/admin/blog");
      router.refresh();
    } else {
      error(result.error || "Gagal menyimpan artikel.");
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/blog" className="p-2 rounded-lg hover:bg-white/5 text-gray-400"><ArrowLeft /></Link>
          <h1 className="text-2xl font-bold text-white">{formData.id ? "Edit Article" : "New Article"}</h1>
        </div>
        <button type="submit" disabled={isLoading} className="flex items-center gap-2 px-6 py-2 rounded-lg bg-blue-500 text-white font-bold hover:bg-blue-600 disabled:opacity-50">
          {isLoading ? <Loader2 className="animate-spin" /> : <Save />} Save Article
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <section className="p-8 bg-surface-dark rounded-2xl border border-white/5 space-y-6">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Title</label>
              <input name="title" value={formData.title} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg bg-background-dark border border-white/10 text-white focus:ring-2 focus:ring-blue-500/50 outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Slug</label>
              <input name="slug" value={formData.slug} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg bg-background-dark border border-white/10 text-white font-mono text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Excerpt (Summary)</label>
              <textarea name="excerpt" value={formData.excerpt} onChange={handleChange} rows={3} className="w-full px-4 py-3 rounded-lg bg-background-dark border border-white/10 text-white resize-none" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-400">Content (Markdown)</label>
                <button
                  type="button"
                  onClick={() => setShowPreview(!showPreview)}
                  className="flex items-center gap-2 text-sm text-blue-500 hover:text-blue-400 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  {showPreview ? "Edit Content" : "Preview Markdown"}
                </button>
              </div>
              
              {showPreview ? (
                <div className="w-full px-4 py-3 rounded-lg bg-background-dark border border-white/10 text-white min-h-[350px] prose prose-invert max-w-none">
                  {formData.content ? (
                    <ReactMarkdown>{formData.content}</ReactMarkdown>
                  ) : (
                    <p className="text-gray-500 italic">No content to preview.</p>
                  )}
                </div>
              ) : (
                <textarea 
                  name="content" 
                  value={formData.content} 
                  onChange={handleChange} 
                  rows={15} 
                  className="w-full px-4 py-3 rounded-lg bg-background-dark border border-white/10 text-white font-mono text-sm focus:ring-2 focus:ring-blue-500/50 outline-none" 
                />
              )}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="p-6 bg-surface-dark rounded-2xl border border-white/5 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Category</label>
                <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-3 rounded-lg bg-background-dark border border-white/10 text-white outline-none">
                  <option value="Technology">Technology</option>
                  <option value="Tutorial">Tutorial</option>
                  <option value="Career">Career</option>
                  <option value="Personal">Personal</option>
                </select>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-background-dark border border-white/10">
                <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} className="w-5 h-5 accent-blue-500" />
                <label className="text-sm text-white">Featured Post</label>
              </div>
            </div>
          </section>

          <section className="p-6 bg-surface-dark rounded-2xl border border-white/5 space-y-4">
            <div className="flex items-center gap-2 text-gray-400"><ImageIcon className="w-4 h-4" /> <span className="font-bold">Cover Image</span></div>
            <input name="coverImageUrl" value={formData.coverImageUrl} onChange={handleChange} placeholder="Image URL..." className="w-full px-3 py-2 rounded bg-background-dark border border-white/10 text-white text-sm" />
            {formData.coverImageUrl && (
              <div className="mt-2 relative aspect-video rounded-lg overflow-hidden border border-white/10 bg-surface-dark">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={formData.coverImageUrl} alt="Cover Preview" className="object-cover w-full h-full" onError={(e) => (e.currentTarget.style.display = 'none')} />
              </div>
            )}
          </section>
        </div>
      </div>
    </form>
  );
}
