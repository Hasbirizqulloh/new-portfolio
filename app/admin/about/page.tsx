"use client";

import { useState, useEffect } from "react";
import { 
  getEducation, saveEducation, deleteEducation,
  getCertifications, saveCertification, deleteCertification 
} from "../../actions/about";
import { getSiteSettings, updateSiteSettings } from "../../actions/settings";
import { 
  GraduationCap, 
  Award, 
  Plus, 
  Trash2, 
  Edit2, 
  ArrowLeft, 
  Loader2,
  Check,
  X,
  FileText,
  Save
} from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/ui/Toast";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { EducationType, CertificationType } from "@/types/admin";

export default function AdminAboutPage() {
  const [activeTab, setActiveTab] = useState<"texts" | "education" | "certification">("texts");
  const [education, setEducation] = useState<EducationType[]>([]);
  const [certs, setCerts] = useState<CertificationType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});
  const [textsForm, setTextsForm] = useState({
    aboutTitleMain: "Bridging the gap between",
    aboutTitleHighlight: "complex data",
    aboutTitleSuffix: "and intuitive experiences.",
    aboutDescription1: "I am a multidisciplinary engineer obsessed with the intersection of scalable backend systems and intelligent user interfaces. In a world awash with data, my mission is to build tools that not only process information but make it actionable and accessible.",
    aboutDescription2: "With experience in distributed systems and a recent deep dive into Large Language Model integration, I help companies transition from \"AI-curious\" to \"AI-native.\" I believe that the best code is the code that solves human problems with elegant simplicity.",
    aboutLocation: "Indonesia",
    aboutFocus: "AI Integration, System Architecture",
    aboutCoreStack: "Python, React & Next.js, TypeScript"
  });
  const [isSavingTexts, setIsSavingTexts] = useState(false);

  const { success, error } = useToast();
  
  // Confirm Delete State
  const [deleteConfirmEdu, setDeleteConfirmEdu] = useState<{ isOpen: boolean; id: string }>({ isOpen: false, id: "" });
  const [deleteConfirmCert, setDeleteConfirmCert] = useState<{ isOpen: boolean; id: string }>({ isOpen: false, id: "" });
  const [isDeleting, setIsDeleting] = useState(false);

  const loadData = async () => {
    setIsLoading(true);
    const [eduData, certData, settings] = await Promise.all([getEducation(), getCertifications(), getSiteSettings()]);
    setEducation(eduData as unknown as EducationType[]);
    setCerts(certData as unknown as CertificationType[]);
    
    if (settings && settings.length > 0) {
      const newTexts = { ...textsForm };
      settings.forEach((s: any) => {
        if (s.key in newTexts) {
          (newTexts as any)[s.key] = s.value;
        }
      });
      setTextsForm(newTexts);
    }
    
    setIsLoading(false);
  };

  useEffect(() => { loadData(); }, []);

  const handleSaveEdu = async (data: any) => {
    const res = await saveEducation(data);
    if (res.success) { 
      setEditingId(null); 
      loadData(); 
      success("Pendidikan berhasil disimpan.");
    }
    else error(res.error || "Gagal menyimpan pendidikan.");
  };

  const handleSaveCert = async (data: any) => {
    const res = await saveCertification(data);
    if (res.success) { 
      setEditingId(null); 
      loadData(); 
      success("Sertifikasi berhasil disimpan.");
    }
    else error(res.error || "Gagal menyimpan sertifikasi.");
  };

  const handleSaveTexts = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingTexts(true);
    
    const settingsToSave = Object.entries(textsForm).map(([key, value]) => ({
      key,
      value
    }));

    const result = await updateSiteSettings(settingsToSave);
    if (result.success) {
      success("Teks About berhasil disimpan.");
    } else {
      error("Gagal menyimpan teks About.");
    }
    setIsSavingTexts(false);
  };

  const executeDeleteEdu = async () => {
    setIsDeleting(true);
    const res = await deleteEducation(deleteConfirmEdu.id);
    if (res.success) {
      success("Pendidikan berhasil dihapus.");
      loadData();
    } else {
      error(res.error || "Gagal menghapus pendidikan.");
    }
    setIsDeleting(false);
    setDeleteConfirmEdu({ isOpen: false, id: "" });
  };

  const executeDeleteCert = async () => {
    setIsDeleting(true);
    const res = await deleteCertification(deleteConfirmCert.id);
    if (res.success) {
      success("Sertifikasi berhasil dihapus.");
      loadData();
    } else {
      error(res.error || "Gagal menghapus sertifikasi.");
    }
    setIsDeleting(false);
    setDeleteConfirmCert({ isOpen: false, id: "" });
  };

  return (
    <div className="space-y-6">
        <header className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-white">About Page Manager</h1>
          <p className="text-gray-400">Manage your background, education, and credentials.</p>
        </header>

        <div className="flex justify-center gap-4 p-1 bg-surface-dark rounded-xl border border-white/5 mb-8 mx-auto w-fit overflow-x-auto max-w-full">
          <button 
            onClick={() => setActiveTab("texts")}
            className={`flex items-center gap-2 px-6 sm:px-8 py-3 rounded-lg transition-all whitespace-nowrap ${activeTab === "texts" ? "bg-primary text-background-dark font-bold" : "text-gray-400 hover:text-white"}`}
          >
            <FileText className="w-5 h-5" /> General Texts
          </button>
          <button 
            onClick={() => setActiveTab("education")}
            className={`flex items-center gap-2 px-6 sm:px-8 py-3 rounded-lg transition-all whitespace-nowrap ${activeTab === "education" ? "bg-primary text-background-dark font-bold" : "text-gray-400 hover:text-white"}`}
          >
            <GraduationCap className="w-5 h-5" /> Education
          </button>
          <button 
            onClick={() => setActiveTab("certification")}
            className={`flex items-center gap-2 px-6 sm:px-8 py-3 rounded-lg transition-all whitespace-nowrap ${activeTab === "certification" ? "bg-primary text-background-dark font-bold" : "text-gray-400 hover:text-white"}`}
          >
            <Award className="w-5 h-5" /> Certifications
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-primary animate-spin" /></div>
        ) : (
          <div className="space-y-6">
            {activeTab === "texts" ? (
              <form onSubmit={handleSaveTexts} className="space-y-8">
                <div className="p-8 bg-surface-dark rounded-2xl border border-white/5">
                  <h2 className="text-xl font-bold text-white mb-6">Mission Statement</h2>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Title Main</label>
                        <input
                          name="aboutTitleMain"
                          type="text"
                          className="w-full px-4 py-3 rounded-lg bg-background-dark border border-white/10 text-white focus:ring-2 focus:ring-primary/50"
                          value={textsForm.aboutTitleMain}
                          onChange={(e) => setTextsForm({ ...textsForm, aboutTitleMain: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Title Highlight</label>
                        <input
                          name="aboutTitleHighlight"
                          type="text"
                          className="w-full px-4 py-3 rounded-lg bg-background-dark border border-white/10 text-white focus:ring-2 focus:ring-primary/50"
                          value={textsForm.aboutTitleHighlight}
                          onChange={(e) => setTextsForm({ ...textsForm, aboutTitleHighlight: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Title Suffix</label>
                        <input
                          name="aboutTitleSuffix"
                          type="text"
                          className="w-full px-4 py-3 rounded-lg bg-background-dark border border-white/10 text-white focus:ring-2 focus:ring-primary/50"
                          value={textsForm.aboutTitleSuffix}
                          onChange={(e) => setTextsForm({ ...textsForm, aboutTitleSuffix: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Description Paragraph 1</label>
                      <textarea
                        name="aboutDescription1"
                        rows={3}
                        className="w-full px-4 py-3 rounded-lg bg-background-dark border border-white/10 text-white focus:ring-2 focus:ring-primary/50 resize-none"
                        value={textsForm.aboutDescription1}
                        onChange={(e) => setTextsForm({ ...textsForm, aboutDescription1: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Description Paragraph 2</label>
                      <textarea
                        name="aboutDescription2"
                        rows={3}
                        className="w-full px-4 py-3 rounded-lg bg-background-dark border border-white/10 text-white focus:ring-2 focus:ring-primary/50 resize-none"
                        value={textsForm.aboutDescription2}
                        onChange={(e) => setTextsForm({ ...textsForm, aboutDescription2: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="p-8 bg-surface-dark rounded-2xl border border-white/5">
                  <h2 className="text-xl font-bold text-white mb-6">Quick Facts & Stack</h2>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                        <input
                          name="aboutLocation"
                          type="text"
                          className="w-full px-4 py-3 rounded-lg bg-background-dark border border-white/10 text-white focus:ring-2 focus:ring-primary/50"
                          value={textsForm.aboutLocation}
                          onChange={(e) => setTextsForm({ ...textsForm, aboutLocation: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Focus</label>
                        <input
                          name="aboutFocus"
                          type="text"
                          className="w-full px-4 py-3 rounded-lg bg-background-dark border border-white/10 text-white focus:ring-2 focus:ring-primary/50"
                          value={textsForm.aboutFocus}
                          onChange={(e) => setTextsForm({ ...textsForm, aboutFocus: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Core Stack (Comma Separated)</label>
                      <input
                        name="aboutCoreStack"
                        type="text"
                        className="w-full px-4 py-3 rounded-lg bg-background-dark border border-white/10 text-white focus:ring-2 focus:ring-primary/50"
                        value={textsForm.aboutCoreStack}
                        onChange={(e) => setTextsForm({ ...textsForm, aboutCoreStack: e.target.value })}
                        placeholder="e.g. Python, React & Next.js, TypeScript"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    disabled={isSavingTexts}
                    className="flex items-center gap-2 px-8 py-3 bg-primary text-background-dark font-bold rounded-xl hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                  >
                    {isSavingTexts ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                    {isSavingTexts ? "Menyimpan..." : "Simpan Teks"}
                  </button>
                </div>
              </form>
            ) : activeTab === "education" ? (
              <>
                <button 
                  onClick={() => { setEditingId("new"); setEditForm({ institution: "", degree: "", startYear: "", endYear: "", description: "" }); }}
                  className="w-full p-6 rounded-2xl border border-dashed border-white/10 text-gray-500 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2 group"
                >
                  <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" /> Add New Education
                </button>

                <div className="grid grid-cols-1 gap-4">
                  {editingId === "new" && (
                    <EduForm data={editForm} onChange={setEditForm} onSave={() => handleSaveEdu(editForm)} onCancel={() => setEditingId(null)} />
                  )}
                  {education.map((edu) => (
                    editingId === edu.id ? (
                      <EduForm key={edu.id} data={editForm} onChange={setEditForm} onSave={() => handleSaveEdu(editForm)} onCancel={() => setEditingId(null)} />
                    ) : (
                      <div key={edu.id} className="p-6 bg-surface-dark rounded-2xl border border-white/5 flex items-start justify-between group hover:border-primary/20 transition-all">
                        <div className="flex gap-4">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary"><GraduationCap className="w-6 h-6" /></div>
                          <div>
                            <h3 className="font-bold text-white text-lg">{edu.institution}</h3>
                            <p className="text-primary/80">{edu.degree}</p>
                            <p className="text-xs text-gray-500 mt-1 font-mono">{edu.startYear} — {edu.endYear || "Present"}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => { setEditingId(edu.id); setEditForm(edu); }} className="p-2 text-gray-500 hover:text-white"><Edit2 className="w-4 h-4" /></button>
                          <button onClick={() => setDeleteConfirmEdu({ isOpen: true, id: edu.id })} className="p-2 text-gray-500 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </>
            ) : (
              <>
                <button 
                  onClick={() => { setEditingId("new"); setEditForm({ name: "", issuer: "", issuedDate: "", credentialUrl: "", description: "" }); }}
                  className="w-full p-6 rounded-2xl border border-dashed border-white/10 text-gray-500 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2 group"
                >
                  <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" /> Add New Certification
                </button>

                <div className="grid grid-cols-1 gap-4">
                  {editingId === "new" && (
                    <CertForm data={editForm} onChange={setEditForm} onSave={() => handleSaveCert(editForm)} onCancel={() => setEditingId(null)} />
                  )}
                  {certs.map((cert) => (
                    editingId === cert.id ? (
                      <CertForm key={cert.id} data={editForm} onChange={setEditForm} onSave={() => handleSaveCert(editForm)} onCancel={() => setEditingId(null)} />
                    ) : (
                      <div key={cert.id} className="p-6 bg-surface-dark rounded-2xl border border-white/5 flex items-start justify-between group hover:border-blue-500/20 transition-all">
                        <div className="flex gap-4">
                          <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500"><Award className="w-6 h-6" /></div>
                          <div>
                            <h3 className="font-bold text-white text-lg">{cert.name}</h3>
                            <p className="text-blue-400">{cert.issuer}</p>
                            <p className="text-xs text-gray-500 mt-1 font-mono">{cert.issuedDate}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => { setEditingId(cert.id); setEditForm(cert); }} className="p-2 text-gray-500 hover:text-white"><Edit2 className="w-4 h-4" /></button>
                          <button onClick={() => setDeleteConfirmCert({ isOpen: true, id: cert.id })} className="p-2 text-gray-500 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        <ConfirmDialog
          isOpen={deleteConfirmEdu.isOpen}
          title="Hapus Pendidikan"
          message="Apakah Anda yakin ingin menghapus data pendidikan ini?"
          confirmText="Hapus"
          onConfirm={executeDeleteEdu}
          onCancel={() => setDeleteConfirmEdu({ isOpen: false, id: "" })}
          isLoading={isDeleting}
        />

        <ConfirmDialog
          isOpen={deleteConfirmCert.isOpen}
          title="Hapus Sertifikasi"
          message="Apakah Anda yakin ingin menghapus data sertifikasi ini?"
          confirmText="Hapus"
          onConfirm={executeDeleteCert}
          onCancel={() => setDeleteConfirmCert({ isOpen: false, id: "" })}
          isLoading={isDeleting}
        />
      </div>
  );
}

function EduForm({ data, onChange, onSave, onCancel }: any) {
  return (
    <div className="p-8 bg-background-dark border-2 border-primary/30 rounded-2xl space-y-6 shadow-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs text-gray-500 uppercase font-bold">Institution</label>
          <input placeholder="University Name" value={data.institution || ""} onChange={e => onChange({...data, institution: e.target.value})} className="w-full bg-surface-dark border border-white/10 p-3 rounded-lg text-white" />
        </div>
        <div className="space-y-2">
          <label className="text-xs text-gray-500 uppercase font-bold">Degree</label>
          <input placeholder="Major/Degree" value={data.degree || ""} onChange={e => onChange({...data, degree: e.target.value})} className="w-full bg-surface-dark border border-white/10 p-3 rounded-lg text-white" />
        </div>
        <div className="space-y-2">
          <label className="text-xs text-gray-500 uppercase font-bold">Start Year</label>
          <input type="number" placeholder="2018" value={data.startYear || ""} onChange={e => onChange({...data, startYear: e.target.value ? parseInt(e.target.value) : ""})} className="w-full bg-surface-dark border border-white/10 p-3 rounded-lg text-white" />
        </div>
        <div className="space-y-2">
          <label className="text-xs text-gray-500 uppercase font-bold">End Year (Empty if Present)</label>
          <input type="number" placeholder="2022" value={data.endYear || ""} onChange={e => onChange({...data, endYear: e.target.value ? parseInt(e.target.value) : null})} className="w-full bg-surface-dark border border-white/10 p-3 rounded-lg text-white" />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-xs text-gray-500 uppercase font-bold">Description</label>
        <textarea rows={3} placeholder="Focus of study..." value={data.description || ""} onChange={e => onChange({...data, description: e.target.value})} className="w-full bg-surface-dark border border-white/10 p-3 rounded-lg text-white resize-none" />
      </div>
      <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
        <button onClick={onCancel} className="px-4 py-2 text-gray-400 hover:text-white font-semibold">Cancel</button>
        <button onClick={onSave} className="flex items-center gap-2 px-6 py-2 bg-primary text-background-dark rounded-lg font-bold hover:scale-105 transition-all shadow-neon"><Check className="w-5 h-5" /> Save Changes</button>
      </div>
    </div>
  );
}

function CertForm({ data, onChange, onSave, onCancel }: any) {
  return (
    <div className="p-8 bg-background-dark border-2 border-blue-500/30 rounded-2xl space-y-6 shadow-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs text-gray-500 uppercase font-bold">Certification Name</label>
          <input placeholder="e.g. AWS Certified" value={data.name || ""} onChange={e => onChange({...data, name: e.target.value})} className="w-full bg-surface-dark border border-white/10 p-3 rounded-lg text-white" />
        </div>
        <div className="space-y-2">
          <label className="text-xs text-gray-500 uppercase font-bold">Issuer</label>
          <input placeholder="e.g. Amazon" value={data.issuer || ""} onChange={e => onChange({...data, issuer: e.target.value})} className="w-full bg-surface-dark border border-white/10 p-3 rounded-lg text-white" />
        </div>
        <div className="space-y-2">
          <label className="text-xs text-gray-500 uppercase font-bold">Issued Date</label>
          <input placeholder="e.g. Issued Jan 2023" value={data.issuedDate || ""} onChange={e => onChange({...data, issuedDate: e.target.value})} className="w-full bg-surface-dark border border-white/10 p-3 rounded-lg text-white" />
        </div>
        <div className="space-y-2">
          <label className="text-xs text-gray-500 uppercase font-bold">Credential URL</label>
          <input placeholder="https://..." value={data.credentialUrl || ""} onChange={e => onChange({...data, credentialUrl: e.target.value})} className="w-full bg-surface-dark border border-white/10 p-3 rounded-lg text-white font-mono text-sm" />
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
        <button onClick={onCancel} className="px-4 py-2 text-gray-400 hover:text-white font-semibold">Cancel</button>
        <button onClick={onSave} className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg font-bold hover:scale-105 transition-all"><Check className="w-5 h-5" /> Save Changes</button>
      </div>
    </div>
  );
}
