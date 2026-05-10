"use client";

import { useState, useEffect } from "react";
import { 
  getEducation, saveEducation, deleteEducation,
  getCertifications, saveCertification, deleteCertification 
} from "../../actions/about";
import { 
  GraduationCap, 
  Award, 
  Plus, 
  Trash2, 
  Edit2, 
  ArrowLeft, 
  Loader2,
  Check,
  X
} from "lucide-react";
import Link from "next/link";

export default function AdminAboutPage() {
  const [activeTab, setActiveTab] = useState<"education" | "certification">("education");
  const [education, setEducation] = useState<any[]>([]);
  const [certs, setCerts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});

  const loadData = async () => {
    setIsLoading(true);
    const [eduData, certData] = await Promise.all([getEducation(), getCertifications()]);
    setEducation(eduData);
    setCerts(certData);
    setIsLoading(false);
  };

  useEffect(() => { loadData(); }, []);

  const handleSaveEdu = async (data: any) => {
    const res = await saveEducation(data);
    if (res.success) { setEditingId(null); loadData(); }
    else alert(res.error);
  };

  const handleSaveCert = async (data: any) => {
    const res = await saveCertification(data);
    if (res.success) { setEditingId(null); loadData(); }
    else alert(res.error);
  };

  return (
    <div className="min-h-screen bg-background-dark p-8 pb-20">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12 text-center">
          <Link href="/admin/dashboard" className="text-sm text-gray-400 hover:text-primary flex items-center justify-center gap-2 mb-2">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-white">About Page Manager</h1>
          <p className="text-gray-400">Manage your background, education, and credentials.</p>
        </header>

        <div className="flex justify-center gap-4 p-1 bg-surface-dark rounded-xl border border-white/5 mb-8 mx-auto w-fit">
          <button 
            onClick={() => setActiveTab("education")}
            className={`flex items-center gap-2 px-8 py-3 rounded-lg transition-all ${activeTab === "education" ? "bg-primary text-background-dark font-bold" : "text-gray-400 hover:text-white"}`}
          >
            <GraduationCap className="w-5 h-5" /> Education
          </button>
          <button 
            onClick={() => setActiveTab("certification")}
            className={`flex items-center gap-2 px-8 py-3 rounded-lg transition-all ${activeTab === "certification" ? "bg-primary text-background-dark font-bold" : "text-gray-400 hover:text-white"}`}
          >
            <Award className="w-5 h-5" /> Certifications
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-primary animate-spin" /></div>
        ) : (
          <div className="space-y-6">
            {activeTab === "education" ? (
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
                          <button onClick={async () => { if(confirm("Hapus?")) { await deleteEducation(edu.id); loadData(); } }} className="p-2 text-gray-500 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
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
                          <button onClick={async () => { if(confirm("Hapus?")) { await deleteCertification(cert.id); loadData(); } }} className="p-2 text-gray-500 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function EduForm({ data, onChange, onSave, onCancel }: any) {
  return (
    <div className="p-8 bg-background-dark border-2 border-primary/30 rounded-2xl space-y-6 shadow-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs text-gray-500 uppercase font-bold">Institution</label>
          <input placeholder="University Name" value={data.institution} onChange={e => onChange({...data, institution: e.target.value})} className="w-full bg-surface-dark border border-white/10 p-3 rounded-lg text-white" />
        </div>
        <div className="space-y-2">
          <label className="text-xs text-gray-500 uppercase font-bold">Degree</label>
          <input placeholder="Major/Degree" value={data.degree} onChange={e => onChange({...data, degree: e.target.value})} className="w-full bg-surface-dark border border-white/10 p-3 rounded-lg text-white" />
        </div>
        <div className="space-y-2">
          <label className="text-xs text-gray-500 uppercase font-bold">Start Year</label>
          <input type="number" placeholder="2018" value={data.startYear} onChange={e => onChange({...data, startYear: e.target.value})} className="w-full bg-surface-dark border border-white/10 p-3 rounded-lg text-white" />
        </div>
        <div className="space-y-2">
          <label className="text-xs text-gray-500 uppercase font-bold">End Year (Empty if Present)</label>
          <input type="number" placeholder="2022" value={data.endYear} onChange={e => onChange({...data, endYear: e.target.value})} className="w-full bg-surface-dark border border-white/10 p-3 rounded-lg text-white" />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-xs text-gray-500 uppercase font-bold">Description</label>
        <textarea rows={3} placeholder="Focus of study..." value={data.description} onChange={e => onChange({...data, description: e.target.value})} className="w-full bg-surface-dark border border-white/10 p-3 rounded-lg text-white resize-none" />
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
          <input placeholder="e.g. AWS Certified" value={data.name} onChange={e => onChange({...data, name: e.target.value})} className="w-full bg-surface-dark border border-white/10 p-3 rounded-lg text-white" />
        </div>
        <div className="space-y-2">
          <label className="text-xs text-gray-500 uppercase font-bold">Issuer</label>
          <input placeholder="e.g. Amazon" value={data.issuer} onChange={e => onChange({...data, issuer: e.target.value})} className="w-full bg-surface-dark border border-white/10 p-3 rounded-lg text-white" />
        </div>
        <div className="space-y-2">
          <label className="text-xs text-gray-500 uppercase font-bold">Issued Date</label>
          <input placeholder="e.g. Issued Jan 2023" value={data.issuedDate} onChange={e => onChange({...data, issuedDate: e.target.value})} className="w-full bg-surface-dark border border-white/10 p-3 rounded-lg text-white" />
        </div>
        <div className="space-y-2">
          <label className="text-xs text-gray-500 uppercase font-bold">Credential URL</label>
          <input placeholder="https://..." value={data.credentialUrl} onChange={e => onChange({...data, credentialUrl: e.target.value})} className="w-full bg-surface-dark border border-white/10 p-3 rounded-lg text-white font-mono text-sm" />
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
        <button onClick={onCancel} className="px-4 py-2 text-gray-400 hover:text-white font-semibold">Cancel</button>
        <button onClick={onSave} className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg font-bold hover:scale-105 transition-all"><Check className="w-5 h-5" /> Save Changes</button>
      </div>
    </div>
  );
}
