"use client";

import { useState, useEffect } from "react";
import { getAdminProjects, deleteProject } from "../../actions/projects";
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  ExternalLink, 
  Loader2, 
  ArrowLeft,
  LayoutGrid,
  List as ListIcon
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  const loadProjects = async () => {
    setIsLoading(true);
    const data = await getAdminProjects();
    setProjects(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus proyek "${title}"?`)) {
      const result = await deleteProject(id);
      if (result.success) {
        loadProjects();
      } else {
        alert(result.error);
      }
    }
  };

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background-dark p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <Link
              href="/admin/dashboard"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-primary mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Kembali ke Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-white">Manage Projects</h1>
            <p className="text-gray-400">Total {projects.length} proyek terdaftar</p>
          </div>
          
          <Link href="/admin/projects/new">
            <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-background-dark font-bold hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-neon">
              <Plus className="w-5 h-5" /> Add New Project
            </button>
          </Link>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search projects by title or category..."
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface-dark border border-white/5 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex bg-surface-dark p-1 rounded-xl border border-white/5">
            <button 
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-white/10 text-primary" : "text-gray-500 hover:text-white"}`}
            >
              <ListIcon className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-white/10 text-primary" : "text-gray-500 hover:text-white"}`}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
            <p className="text-gray-400 animate-pulse">Loading your projects...</p>
          </div>
        ) : filteredProjects.length > 0 ? (
          viewMode === "list" ? (
            /* List View */
            <div className="bg-surface-dark rounded-2xl border border-white/5 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 bg-white/5">
                    <th className="p-4 text-sm font-semibold text-gray-400">Project</th>
                    <th className="p-4 text-sm font-semibold text-gray-400">Category</th>
                    <th className="p-4 text-sm font-semibold text-gray-400">Tech Stack</th>
                    <th className="p-4 text-sm font-semibold text-gray-400 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredProjects.map((project) => (
                    <tr key={project.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-background-dark border border-white/10 overflow-hidden relative flex-shrink-0">
                            {project.coverImageUrl ? (
                              <Image 
                                src={project.coverImageUrl} 
                                alt={project.title} 
                                fill 
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-xs text-gray-600 font-mono uppercase">
                                No IMG
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-white group-hover:text-primary transition-colors">{project.title}</p>
                            <p className="text-xs text-gray-500 font-mono truncate max-w-[200px]">{project.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm">
                        <span className="px-2 py-1 rounded-md bg-blue-500/10 text-blue-400 text-xs font-semibold">
                          {project.category}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {project.technologies?.slice(0, 3).map((t: any) => (
                            <span key={t.technology.id} className="text-[10px] bg-white/5 text-gray-400 px-1.5 py-0.5 rounded">
                              {t.technology.name}
                            </span>
                          ))}
                          {project.technologies?.length > 3 && (
                            <span className="text-[10px] text-gray-600">+{project.technologies.length - 3}</span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link 
                            href={`/projects/${project.id}`} 
                            target="_blank"
                            className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-all"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                          <Link 
                            href={`/admin/projects/${project.id}`}
                            className="p-2 rounded-lg hover:bg-primary/10 text-gray-400 hover:text-primary transition-all"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Link>
                          <button 
                            onClick={() => handleDelete(project.id, project.title)}
                            className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-500 transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            /* Grid View */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <div key={project.id} className="bg-surface-dark rounded-2xl border border-white/5 overflow-hidden group hover:border-primary/30 transition-all">
                  <div className="aspect-video relative bg-background-dark border-b border-white/5">
                    {project.coverImageUrl && (
                      <Image src={project.coverImageUrl} alt={project.title} fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    )}
                    <div className="absolute top-2 right-2 flex gap-1">
                      <Link href={`/admin/projects/${project.id}`} className="p-2 rounded-lg bg-background-dark/80 backdrop-blur-sm text-gray-300 hover:text-primary border border-white/10 transition-all">
                        <Edit2 className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-white group-hover:text-primary transition-colors line-clamp-1">{project.title}</h3>
                    </div>
                    <p className="text-xs text-gray-500 mb-4 line-clamp-2">{project.description}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest">{project.category}</span>
                      <button 
                        onClick={() => handleDelete(project.id, project.title)}
                        className="text-xs text-gray-500 hover:text-red-500 transition-colors flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          /* Empty State */
          <div className="bg-surface-dark rounded-2xl border border-white/5 p-20 text-center">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-gray-600" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">No projects found</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              {searchQuery ? `We couldn't find any projects matching "${searchQuery}"` : "You haven't added any projects yet. Start by creating your first showcase!"}
            </p>
            {!searchQuery && (
              <Link href="/admin/projects/new">
                <button className="px-6 py-3 rounded-lg bg-primary text-background-dark font-bold hover:bg-primary/90 transition-all">
                  Create First Project
                </button>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
