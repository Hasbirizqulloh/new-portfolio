"use client";

import { useState, useEffect } from "react";
import { getSiteSettings, updateSiteSettings } from "../../actions/settings";
import { 
  Save, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  LayoutTemplate
} from "lucide-react";
import Link from "next/link";

export default function HomeEditorPage() {
  const [formData, setFormData] = useState({
    heroBadge: "Available for new opportunities",
    heroTitleMain: "Fullstack & AI Engineer building",
    heroTitleHighlight: "intelligent systems",
    heroDescription: "I design and implement scalable backend architectures and data-driven solutions that bridge the gap between complex algorithms and intuitive user experiences.",
    heroName: "Hasbirizqulloh",
    heroRole: "Fullstack & AI Engineer",
    quoteText: `"Passionate about leveraging cutting-edge AI technologies to solve real-world problems. I combine robust engineering principles with data science to build products that matter."`
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    async function loadSettings() {
      try {
        const settings = await getSiteSettings();
        if (settings && settings.length > 0) {
          const newFormData = { ...formData };
          settings.forEach((s: any) => {
            if (s.key in newFormData) {
              (newFormData as any)[s.key] = s.value;
            }
          });
          setFormData(newFormData);
        }
      } catch (err) {
        console.error("Failed to load settings", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    const settingsToSave = Object.entries(formData).map(([key, value]) => ({
      key,
      value
    }));

    const result = await updateSiteSettings(settingsToSave);

    if (result.success) {
      setMessage({ type: "success", text: "Konten beranda berhasil diperbarui!" });
      setTimeout(() => setMessage(null), 3000);
    } else {
      setMessage({ type: "error", text: "Terjadi kesalahan saat menyimpan." });
    }
    setIsSaving(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <LayoutTemplate className="text-primary w-8 h-8" />
            Home Editor
          </h1>
          <p className="text-gray-400 mt-2">Ubah teks di halaman beranda tanpa perlu mengedit kode.</p>
        </div>
        <Link href="/" target="_blank">
          <button className="px-4 py-2 rounded-lg border border-white/10 text-white hover:bg-white/5 transition-all">
            Lihat Beranda
          </button>
        </Link>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Hero Section Settings */}
        <div className="p-8 bg-surface-dark rounded-2xl border border-white/5 shadow-xl">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="w-2 h-6 bg-primary rounded-full"></span>
            Hero Section
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Badge Text</label>
              <input
                name="heroBadge"
                type="text"
                className="w-full px-4 py-3 rounded-lg bg-background-dark border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                value={formData.heroBadge}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Title (Main Part)</label>
                <input
                  name="heroTitleMain"
                  type="text"
                  className="w-full px-4 py-3 rounded-lg bg-background-dark border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  value={formData.heroTitleMain}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Title (Highlighted)</label>
                <input
                  name="heroTitleHighlight"
                  type="text"
                  className="w-full px-4 py-3 rounded-lg bg-background-dark border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  value={formData.heroTitleHighlight}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
              <textarea
                name="heroDescription"
                rows={3}
                className="w-full px-4 py-3 rounded-lg bg-background-dark border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                value={formData.heroDescription}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Profile Name</label>
                <input
                  name="heroName"
                  type="text"
                  className="w-full px-4 py-3 rounded-lg bg-background-dark border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  value={formData.heroName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Profile Role</label>
                <input
                  name="heroRole"
                  type="text"
                  className="w-full px-4 py-3 rounded-lg bg-background-dark border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  value={formData.heroRole}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Core Expertise Settings */}
        <div className="p-8 bg-surface-dark rounded-2xl border border-white/5 shadow-xl">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="w-2 h-6 bg-blue-500 rounded-full"></span>
            Core Expertise Section
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Quote Text</label>
              <textarea
                name="quoteText"
                rows={3}
                className="w-full px-4 py-3 rounded-lg bg-background-dark border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none"
                value={formData.quoteText}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4">
          <div className="flex-1">
            {message && (
              <div className={`flex items-center gap-2 text-sm font-bold ${message.type === "success" ? "text-green-500" : "text-red-500"}`}>
                {message.type === "success" ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                {message.text}
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 px-8 py-3 bg-primary text-background-dark font-bold rounded-xl hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none shadow-neon"
          >
            {isSaving ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Save className="w-5 h-5" />
            )}
            {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </form>
    </div>
  );
}
