"use client";

import { useState, useEffect } from "react";
import { updateSiteSetting, getSiteSettings } from "../../actions/settings";
import { ArrowLeft, Save, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  const [resumeUrl, setResumeUrl] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadSettings() {
      try {
        const settings = await getSiteSettings();
        if (Array.isArray(settings)) {
          const resume = settings.find((s: any) => s.key === "resumeUrl");
          if (resume) setResumeUrl(resume.value);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    const result = await updateSiteSetting("resumeUrl", resumeUrl);

    if (result.success) {
      setMessage({ type: "success", text: "Resume URL berhasil diperbarui!" });
    } else {
      setMessage({ type: "error", text: "Terjadi kesalahan saat menyimpan." });
    }
    setIsSaving(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mt-4">Site Settings</h1>
          <p className="text-gray-400">Kelola konfigurasi global aplikasi Anda</p>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="p-8 bg-surface-dark rounded-2xl border border-white/5 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-6 bg-primary rounded-full"></span>
              Resume Configuration
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Resume Download URL (Supabase Storage)
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg bg-background-dark border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-mono text-sm"
                  placeholder="https://your-supabase-url.com/storage/v1/object/public/..."
                  value={resumeUrl}
                  onChange={(e) => setResumeUrl(e.target.value)}
                />
                <p className="mt-2 text-xs text-gray-500 italic">
                  *Tip: Gunakan link publik dari Supabase Storage Bucket Anda.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            {message && (
              <div className={`flex items-center gap-2 text-sm ${message.type === "success" ? "text-green-500" : "text-red-500"}`}>
                {message.type === "success" ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                {message.text}
              </div>
            )}
            <button
              type="submit"
              disabled={isSaving}
              className="ml-auto flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-background-dark font-bold hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Simpan Perubahan
            </button>
          </div>
        </form>
    </div>
  );
}
