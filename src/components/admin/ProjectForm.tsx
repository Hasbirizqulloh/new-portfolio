"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { saveProject, getAllTechnologies } from "../../../app/actions/projects";
import { 
  Save, 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Image as ImageIcon,
  Layout,
  Cpu,
  Target,
  Trophy,
  Loader2
} from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/ui/Toast";
import { ProjectFormData } from "@/types/admin";

interface ProjectFormProps {
  initialData?: ProjectFormData;
}

export function ProjectForm({ initialData }: ProjectFormProps) {
  const router = useRouter();
  const { success, error } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [allTechs, setAllTechs] = useState<any[]>([]);
  
  // State Form
  const [formData, setFormData] = useState<ProjectFormData>({
    id: initialData?.id || null,
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    description: initialData?.description || "",
    content: initialData?.content || "",
    category: initialData?.category || "Web Development",
    coverImageUrl: initialData?.coverImageUrl || "",
    liveDemoUrl: initialData?.liveDemoUrl || "",
    sourceCodeUrl: initialData?.sourceCodeUrl || "",
    architectureDescription: initialData?.architectureDescription || "",
    architectureImageUrl: initialData?.architectureImageUrl || "",
    technologies: initialData?.technologies || [],
    challenges: initialData?.challenges || [{ title: "", challenge: "", solution: "" }],
    results: initialData?.results || [{ metric: "", value: "", color: "primary" }]
  });

  const [isAutoSlug, setIsAutoSlug] = useState(!initialData?.slug);

  useEffect(() => {
    async function loadTechs() {
      const techs = await getAllTechnologies();
      setAllTechs(techs);
    }
    loadTechs();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      
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

  // Manage Technologies
  const toggleTech = (id: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.includes(id)
        ? prev.technologies.filter((t: string) => t !== id)
        : [...prev.technologies, id]
    }));
  };

  // Manage Dynamic Challenges
  const addChallenge = () => {
    setFormData(prev => ({
      ...prev,
      challenges: [...prev.challenges, { title: "", challenge: "", solution: "" }]
    }));
  };

  const removeChallenge = (index: number) => {
    setFormData(prev => ({
      ...prev,
      challenges: prev.challenges.filter((_: any, i: number) => i !== index)
    }));
  };

  const updateChallenge = (index: number, field: string, value: string) => {
    const newChallenges = [...formData.challenges];
    newChallenges[index] = { ...newChallenges[index], [field]: value };
    setFormData(prev => ({ ...prev, challenges: newChallenges }));
  };

  // Manage Dynamic Results
  const addResult = () => {
    setFormData(prev => ({
      ...prev,
      results: [...prev.results, { metric: "", value: "", color: "primary" }]
    }));
  };

  const removeResult = (index: number) => {
    setFormData(prev => ({
      ...prev,
      results: prev.results.filter((_: any, i: number) => i !== index)
    }));
  };

  const updateResult = (index: number, field: string, value: string) => {
    const newResults = [...formData.results];
    newResults[index] = { ...newResults[index], [field]: value };
    setFormData(prev => ({ ...prev, results: newResults }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const result = await saveProject(formData);
    
    if (result.success) {
      success("Proyek berhasil disimpan!");
      router.push("/admin/projects");
      router.refresh();
    } else {
      error(result.error || "Gagal menyimpan proyek.");
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-12 pb-20">
      {/* Header Sticky */}
      <div className="sticky top-0 z-20 bg-background-dark/80 backdrop-blur-md py-4 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/projects" className="p-2 rounded-lg hover:bg-white/5 text-gray-400 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-white">
            {formData.id ? "Edit Project" : "New Project"}
          </h1>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-background-dark font-bold hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          Save Project
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Basic Info */}
          <section className="p-8 bg-surface-dark rounded-2xl border border-white/5 space-y-6">
            <div className="flex items-center gap-2 text-primary mb-2">
              <Layout className="w-5 h-5" />
              <h2 className="font-bold text-lg">Basic Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Project Title</label>
                <input 
                  name="title" 
                  value={formData.title} 
                  onChange={handleChange} 
                  required
                  placeholder="e.g. AI Vision Platform"
                  className="w-full px-4 py-3 rounded-lg bg-background-dark border border-white/10 text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Slug (URL)</label>
                <input 
                  name="slug" 
                  value={formData.slug} 
                  onChange={handleChange} 
                  required
                  placeholder="ai-vision-platform"
                  className="w-full px-4 py-3 rounded-lg bg-background-dark border border-white/10 text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all font-mono"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Short Description</label>
              <textarea 
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                required
                rows={3}
                placeholder="A brief overview of the project..."
                className="w-full px-4 py-3 rounded-lg bg-background-dark border border-white/10 text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Full Content (Markdown)</label>
              <textarea 
                name="content" 
                value={formData.content} 
                onChange={handleChange} 
                rows={10}
                placeholder="Write the detailed story of your project..."
                className="w-full px-4 py-3 rounded-lg bg-background-dark border border-white/10 text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all font-mono"
              />
            </div>
          </section>

          {/* STAR Framework: Challenges */}
          <section className="p-8 bg-surface-dark rounded-2xl border border-white/5 space-y-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-red-400">
                <Target className="w-5 h-5" />
                <h2 className="font-bold text-lg">Key Challenges & Solutions</h2>
              </div>
              <button 
                type="button" 
                onClick={addChallenge}
                className="text-xs flex items-center gap-1 text-primary hover:underline"
              >
                <Plus className="w-3 h-3" /> Add Challenge
              </button>
            </div>

            <div className="space-y-6">
              {formData.challenges.map((c: any, idx: number) => (
                <div key={idx} className="p-6 rounded-xl bg-background-dark border border-white/5 relative group">
                  <button 
                    type="button"
                    onClick={() => removeChallenge(idx)}
                    className="absolute top-4 right-4 p-2 text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="space-y-4">
                    <input 
                      placeholder="Challenge Title (e.g. Scalability)" 
                      value={c.title}
                      onChange={(e) => updateChallenge(idx, "title", e.target.value)}
                      className="w-full bg-transparent border-b border-white/10 py-2 text-white font-bold focus:border-primary outline-none transition-all"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <textarea 
                        placeholder="The Challenge..." 
                        value={c.challenge}
                        onChange={(e) => updateChallenge(idx, "challenge", e.target.value)}
                        className="w-full px-3 py-2 rounded bg-surface-dark border border-white/5 text-sm text-gray-300 min-h-[100px] outline-none"
                      />
                      <textarea 
                        placeholder="The Solution..." 
                        value={c.solution}
                        onChange={(e) => updateChallenge(idx, "solution", e.target.value)}
                        className="w-full px-3 py-2 rounded bg-surface-dark border border-white/5 text-sm text-primary/80 min-h-[100px] outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Architecture */}
          <section className="p-8 bg-surface-dark rounded-2xl border border-white/5 space-y-6">
            <div className="flex items-center gap-2 text-blue-400 mb-2">
              <Cpu className="w-5 h-5" />
              <h2 className="font-bold text-lg">System Architecture</h2>
            </div>
            <div className="space-y-4">
              <textarea 
                name="architectureDescription" 
                value={formData.architectureDescription} 
                onChange={handleChange} 
                rows={4}
                placeholder="Describe how the system is built..."
                className="w-full px-4 py-3 rounded-lg bg-background-dark border border-white/10 text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all"
              />
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Architecture Image URL</label>
                <input 
                  name="architectureImageUrl" 
                  value={formData.architectureImageUrl} 
                  onChange={handleChange} 
                  placeholder="https://..."
                  className="w-full px-4 py-3 rounded-lg bg-background-dark border border-white/10 text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all font-mono text-sm"
                />
                {formData.architectureImageUrl && (
                  <div className="mt-2 relative aspect-video rounded-lg overflow-hidden border border-white/10 bg-surface-dark">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={formData.architectureImageUrl} alt="Architecture Preview" className="object-cover w-full h-full" onError={(e) => (e.currentTarget.style.display = 'none')} />
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar Controls */}
        <div className="space-y-8">
          {/* Publishing Info */}
          <section className="p-6 bg-surface-dark rounded-2xl border border-white/5 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Category</label>
                <select 
                  name="category" 
                  value={formData.category} 
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-background-dark border border-white/10 text-white focus:ring-2 focus:ring-primary/50 outline-none appearance-none"
                >
                  <option value="Web Development">Web Development</option>
                  <option value="AI & Machine Learning">AI & Machine Learning</option>
                  <option value="Data Engineering">Data Engineering</option>
                  <option value="Mobile Development">Mobile Development</option>
                </select>
              </div>
            </div>
          </section>

          {/* Media & Links */}
          <section className="p-6 bg-surface-dark rounded-2xl border border-white/5 space-y-6">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <ImageIcon className="w-5 h-5" />
              <h2 className="font-bold text-lg">Media & Links</h2>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Cover Image URL</label>
                <input name="coverImageUrl" value={formData.coverImageUrl} onChange={handleChange} className="w-full px-3 py-2 rounded bg-background-dark border border-white/10 text-white text-sm" />
                {formData.coverImageUrl && (
                  <div className="mt-2 relative aspect-video rounded-lg overflow-hidden border border-white/10 bg-surface-dark">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={formData.coverImageUrl} alt="Cover Preview" className="object-cover w-full h-full" onError={(e) => (e.currentTarget.style.display = 'none')} />
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Live Demo URL</label>
                <input name="liveDemoUrl" value={formData.liveDemoUrl} onChange={handleChange} className="w-full px-3 py-2 rounded bg-background-dark border border-white/10 text-white text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Source Code URL</label>
                <input name="sourceCodeUrl" value={formData.sourceCodeUrl} onChange={handleChange} className="w-full px-3 py-2 rounded bg-background-dark border border-white/10 text-white text-sm" />
              </div>
            </div>
          </section>

          {/* Tech Stack */}
          <section className="p-6 bg-surface-dark rounded-2xl border border-white/5 space-y-4">
            <h2 className="font-bold text-white">Tech Stack</h2>
            <div className="flex flex-wrap gap-2 max-h-[300px] overflow-y-auto p-1">
              {allTechs.map((tech) => (
                <button
                  key={tech.id}
                  type="button"
                  onClick={() => toggleTech(tech.id)}
                  className={`px-3 py-1 rounded-full text-xs transition-all border ${
                    formData.technologies.includes(tech.id)
                      ? "bg-primary text-background-dark border-primary font-bold"
                      : "bg-background-dark text-gray-500 border-white/10 hover:border-white/30"
                  }`}
                >
                  {tech.name}
                </button>
              ))}
            </div>
          </section>

          {/* STAR Framework: Results */}
          <section className="p-6 bg-surface-dark rounded-2xl border border-white/5 space-y-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-green-400">
                <Trophy className="w-5 h-5" />
                <h2 className="font-bold text-lg">Impact/Results</h2>
              </div>
              <button type="button" onClick={addResult} className="text-xs text-primary hover:underline">
                <Plus className="w-3 h-3" /> Add
              </button>
            </div>
            <div className="space-y-4">
              {formData.results.map((r: any, idx: number) => (
                <div key={idx} className="space-y-2 p-4 rounded-xl bg-background-dark border border-white/5 relative group">
                  <button type="button" onClick={() => removeResult(idx)} className="absolute top-2 right-2 text-gray-600 hover:text-red-500">
                    <Trash2 className="w-3 h-3" />
                  </button>
                  <input 
                    placeholder="Metric (e.g. 50%)" 
                    value={r.metric} 
                    onChange={(e) => updateResult(idx, "metric", e.target.value)}
                    className="w-full bg-transparent border-b border-white/10 text-white font-bold outline-none"
                  />
                  <input 
                    placeholder="Value (e.g. Efficiency boost)" 
                    value={r.value} 
                    onChange={(e) => updateResult(idx, "value", e.target.value)}
                    className="w-full bg-transparent text-xs text-gray-400 outline-none"
                  />
                  <select 
                    value={r.color} 
                    onChange={(e) => updateResult(idx, "color", e.target.value)}
                    className="bg-transparent text-[10px] text-gray-600 outline-none"
                  >
                    <option value="primary">Cyan (Primary)</option>
                    <option value="green">Green</option>
                    <option value="blue">Blue</option>
                  </select>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </form>
  );
}
