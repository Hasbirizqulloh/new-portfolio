"use client";

import { useState, useEffect } from "react";
import { getAdminBlogs, deleteBlog } from "../../actions/blog";
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Loader2, 
  ArrowLeft,
  FileText,
  Eye
} from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/ui/Toast";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { AdminBlog } from "@/types/admin";

export default function AdminBlogPage() {
  const [blogs, setBlogs] = useState<AdminBlog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const { success, error } = useToast();
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; id: string; title: string }>({
    isOpen: false,
    id: "",
    title: ""
  });
  const [isDeleting, setIsDeleting] = useState(false);

  const loadBlogs = async () => {
    setIsLoading(true);
    const data = await getAdminBlogs();
    setBlogs(data as unknown as AdminBlog[]);
    setIsLoading(false);
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const confirmDelete = (id: string, title: string) => {
    setDeleteConfirm({ isOpen: true, id, title });
  };

  const executeDelete = async () => {
    setIsDeleting(true);
    const result = await deleteBlog(deleteConfirm.id);
    if (result.success) {
      success(`Artikel "${deleteConfirm.title}" berhasil dihapus.`);
      loadBlogs();
    } else {
      error(result.error || "Gagal menghapus artikel.");
    }
    setIsDeleting(false);
    setDeleteConfirm({ isOpen: false, id: "", title: "" });
  };

  const filteredBlogs = blogs.filter(b => 
    b.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Blog Manager</h1>
            <p className="text-gray-400">{blogs.length} articles found</p>
          </div>
          <Link href="/admin/blog/new">
            <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-500 text-white font-bold hover:bg-blue-600 transition-all">
              <Plus className="w-5 h-5" /> New Article
            </button>
          </Link>
        </header>

        <div className="mb-8 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search articles..."
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface-dark border border-white/5 text-white outline-none focus:ring-2 focus:ring-blue-500/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-blue-500 animate-spin" /></div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredBlogs.map((blog) => (
              <div key={blog.id} className="p-6 bg-surface-dark rounded-2xl border border-white/5 flex items-center justify-between group hover:border-blue-500/30 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white group-hover:text-blue-400 transition-colors">{blog.title}</h3>
                    <div className="flex items-center gap-3 text-xs mt-1">
                      <span className="text-gray-500 uppercase">{blog.category}</span>
                      <span className="text-gray-700">•</span>
                      <span className={blog.published ? "text-green-500" : "text-yellow-500"}>
                        {blog.published ? "Published" : "Draft"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/blog/${blog.slug}`} target="_blank" className="p-2 text-gray-500 hover:text-white"><Eye className="w-5 h-5" /></Link>
                  <Link href={`/admin/blog/${blog.id}`} className="p-2 text-gray-500 hover:text-blue-500"><Edit2 className="w-5 h-5" /></Link>
                  <button onClick={() => confirmDelete(blog.id, blog.title)} className="p-2 text-gray-500 hover:text-red-500"><Trash2 className="w-5 h-5" /></button>
                </div>
              </div>
            ))}
          </div>
        )}

        <ConfirmDialog
          isOpen={deleteConfirm.isOpen}
          title="Hapus Artikel"
          message={`Apakah Anda yakin ingin menghapus artikel "${deleteConfirm.title}"? Tindakan ini tidak dapat dibatalkan.`}
          confirmText="Hapus"
          onConfirm={executeDelete}
          onCancel={() => setDeleteConfirm({ isOpen: false, id: "", title: "" })}
          isLoading={isDeleting}
        />
    </div>
  );
}
