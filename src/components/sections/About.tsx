"use client";

import React from "react";
import {
    MapPin,
    Terminal,
    Layers,
    Github,
    Linkedin,
    Mail,
    Sparkles,
    GraduationCap,
    Library,
    Award,
    Download,
    Briefcase
} from "lucide-react";
import Image from "next/image";

export type EducationItem = {
    id: string;
    degree: string;
    institution: string;
    description: string;
    startYear: number;
    endYear: number | null;
};

export type CertificationItem = {
    id: string;
    name: string;
    issuer: string;
    description: string;
    issuedDate: string;
    credentialUrl: string | null;
};

export type WorkExperienceItem = {
    id: string;
    position: string;
    company: string;
    description: string;
    startDate: string;
    endDate: string | null;
};

interface AboutProps {
    settings?: Record<string, string>;
    educations: EducationItem[];
    certifications: CertificationItem[];
    experiences: WorkExperienceItem[];
    resumeUrl: string;
}

export function About({ settings, educations, certifications, experiences, resumeUrl }: AboutProps) {
    return (
        <div className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
                {/* Left Column: Profile & Quick Facts */}
                <div className="md:col-span-5 lg:col-span-4 flex flex-col gap-6">
                    {/* Profile Image */}
                    <div className="group relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-surface-dark border border-[#2f333a] shadow-neon">
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                            style={{ backgroundImage: "url('/profile.jpg')" }}
                        ></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-transparent to-transparent opacity-80"></div>
                        <div className="absolute bottom-0 left-0 p-6">
                            <h2 className="text-2xl font-bold text-white">Hasbirizqulloh</h2>
                            <p className="text-primary font-medium">Fullstack / AI Engineer</p>
                        </div>
                    </div>

                    {/* Quick Facts Card */}
                    <div className="rounded-xl bg-surface-dark p-6 border border-[#2f333a]">
                        <h3 className="text-lg font-bold text-white mb-4 border-b border-[#2f333a] pb-2">
                            Quick Facts
                        </h3>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-start gap-3">
                                <MapPin className="text-primary mt-0.5 w-5 h-5" />
                                <div>
                                    <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Location</p>
                                    <p className="text-sm text-text-main font-medium">{settings?.aboutLocation || "Indonesia"}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Terminal className="text-primary mt-0.5 w-5 h-5" />
                                <div>
                                    <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Focus</p>
                                    <p className="text-sm text-text-main font-medium">{settings?.aboutFocus || "AI Integration, System Architecture"}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Layers className="text-primary mt-0.5 w-5 h-5" />
                                <div>
                                    <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Core Stack</p>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        {(settings?.aboutCoreStack || "Python, React & Next.js, TypeScript").split(',').map((stack, idx) => (
                                            <span key={idx} className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
                                                {stack.trim()}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Actions / Socials */}
                        <div className="mt-8 flex justify-between gap-2 border-t border-[#2f333a] pt-4">
                            <a className="group flex flex-col items-center gap-1 w-full rounded-lg hover:bg-white/5 p-2 transition-colors" href="https://github.com/hasbirizqulloh" target="_blank" rel="noopener noreferrer">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-background-dark text-text-muted group-hover:text-white group-hover:ring-1 group-hover:ring-primary">
                                    <Github className="w-4 h-4" />
                                </div>
                                <span className="text-[10px] text-text-muted uppercase font-bold tracking-wide">GitHub</span>
                            </a>
                            <a className="group flex flex-col items-center gap-1 w-full rounded-lg hover:bg-white/5 p-2 transition-colors" href="https://www.linkedin.com/in/moh-hasbi" target="_blank" rel="noopener noreferrer">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-background-dark text-text-muted group-hover:text-white group-hover:ring-1 group-hover:ring-primary">
                                    <Linkedin className="w-4 h-4" />
                                </div>
                                <span className="text-[10px] text-text-muted uppercase font-bold tracking-wide">LinkedIn</span>
                            </a>
                            <a className="group flex flex-col items-center gap-1 w-full rounded-lg hover:bg-white/5 p-2 transition-colors" href="mailto:emailkamu@domain.com?subject=Tawaran%20Kerja%20Sama&body=Halo,%20saya%20melihat%20portofolio%20Anda%20dan%20tertarik%20untuk%20berdiskusi%20lebih%20lanjut.">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-background-dark text-text-muted group-hover:text-white group-hover:ring-1 group-hover:ring-primary">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <span className="text-[10px] text-text-muted uppercase font-bold tracking-wide">Contact</span>
                            </a>
                        </div>

                        <a
                            href={resumeUrl.includes('?') ? `${resumeUrl}&download=Moh_Hasbi_Rizqulloh_Resume_2026-03-27.pdf` : (resumeUrl !== "#" ? `${resumeUrl}?download=Moh_Hasbi_Rizqulloh_Resume_2026-03-27.pdf` : "#")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 mt-4 w-full rounded-lg bg-primary py-2.5 text-sm font-bold text-background-dark transition-transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <Download className="w-4 h-4" /> Download Resume
                        </a>
                    </div>
                </div>

                {/* Right Column: Mission & Education */}
                <div className="md:col-span-7 lg:col-span-8 flex flex-col gap-10">
                    {/* Mission Statement */}
                    <section>
                        <div className="mb-4 flex items-center gap-2 text-primary">
                            <Sparkles className="w-6 h-6" />
                            <span className="text-sm font-bold uppercase tracking-widest">About Me</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                            {settings?.aboutTitleMain || "Bridging the gap between"}{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                                {settings?.aboutTitleHighlight || "complex data"}
                            </span>{" "}
                            {settings?.aboutTitleSuffix || "and intuitive experiences."}
                        </h1>
                        <div className="prose prose-invert prose-lg max-w-none text-text-muted">
                            <p className="mb-4 whitespace-pre-wrap">
                                {settings?.aboutDescription1 || "I am a multidisciplinary engineer obsessed with the intersection of scalable backend systems and intelligent user interfaces. In a world awash with data, my mission is to build tools that not only process information but make it actionable and accessible."}
                            </p>
                            <p className="whitespace-pre-wrap">
                                {settings?.aboutDescription2 || "With experience in distributed systems and a recent deep dive into Large Language Model integration, I help companies transition from \"AI-curious\" to \"AI-native.\" I believe that the best code is the code that solves human problems with elegant simplicity."}
                            </p>
                        </div>
                    </section>

                    {/* Work Experience Section */}
                    {experiences.length > 0 && (
                        <section>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                    <Briefcase className="text-violet-400 w-6 h-6" />
                                    Work Experience
                                </h2>
                            </div>
                            <div className="flex flex-col gap-4">
                                {experiences.map((exp) => (
                                    <div key={exp.id} className="group relative overflow-hidden rounded-xl bg-surface-dark p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(139,92,246,0.15)] hover:border-violet-500/30 border border-[#2f333a]">
                                        <div className="absolute right-0 top-0 h-24 w-24 bg-gradient-to-bl from-violet-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                                        <div className="flex flex-col sm:flex-row sm:items-start gap-4 z-10 relative">
                                            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-[#151619] border border-[#2f333a] text-violet-400">
                                                <Briefcase className="w-6 h-6" />
                                            </div>
                                            <div className="flex-grow">
                                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                                                    <div>
                                                        <h3 className="text-lg font-bold text-white group-hover:text-violet-400 transition-colors">
                                                            {exp.position}
                                                        </h3>
                                                        <p className="text-sm text-text-muted">{exp.company}</p>
                                                    </div>
                                                    <span className="mt-1 sm:mt-0 rounded-full bg-[#151619] border border-[#2f333a] px-3 py-1 text-xs font-medium text-text-muted">
                                                        {exp.startDate} — {exp.endDate || "Present"}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-text-muted leading-relaxed">{exp.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education & Certifications Section - DYNAMIC */}
                    <section>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                <GraduationCap className="text-primary w-6 h-6" />
                                Education &amp; Certifications
                            </h2>
                        </div>
                        <div className="flex flex-col gap-4">
                            {/* Dynamic Education Cards */}
                            {educations.map((edu) => (
                                <div key={edu.id} className="group relative overflow-hidden rounded-xl bg-surface-dark p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-neon hover:border-primary/30 border border-[#2f333a]">
                                    <div className="absolute right-0 top-0 h-24 w-24 bg-gradient-to-bl from-primary/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                                    <div className="flex flex-col sm:flex-row sm:items-start gap-4 z-10 relative">
                                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-[#151619] border border-[#2f333a] text-primary">
                                            <Library className="w-6 h-6" />
                                        </div>
                                        <div className="flex-grow">
                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                                                <div>
                                                    <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">
                                                        {edu.degree}
                                                    </h3>
                                                    <p className="text-sm text-text-muted">{edu.institution}</p>
                                                </div>
                                                <span className="mt-1 sm:mt-0 rounded-full bg-[#151619] border border-[#2f333a] px-3 py-1 text-xs font-medium text-text-muted">
                                                    {edu.startYear} — {edu.endYear || "Present"}
                                                </span>
                                            </div>
                                            <p className="text-sm text-text-muted leading-relaxed">{edu.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Dynamic Certification Cards */}
                            {certifications.map((cert) => (
                                <div key={cert.id} className="group relative overflow-hidden rounded-xl bg-surface-dark p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-neon hover:border-primary/30 border border-[#2f333a]">
                                    <div className="absolute right-0 top-0 h-24 w-24 bg-gradient-to-bl from-primary/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                                    <div className="flex flex-col sm:flex-row sm:items-start gap-4 z-10 relative">
                                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-[#151619] border border-[#2f333a] text-primary">
                                            <Award className="w-6 h-6" />
                                        </div>
                                        <div className="flex-grow">
                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                                                <div>
                                                    <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">
                                                        {cert.name}
                                                    </h3>
                                                    <p className="text-sm text-text-muted">{cert.issuer}</p>
                                                </div>
                                                <span className="mt-1 sm:mt-0 rounded-full bg-[#151619] border border-[#2f333a] px-3 py-1 text-xs font-medium text-text-muted">
                                                    {cert.issuedDate}
                                                </span>
                                            </div>
                                            <p className="text-sm text-text-muted leading-relaxed">{cert.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Skills / Tech Cloud */}
                    <section className="mt-8 pt-8 border-t border-[#2f333a]">
                        <h2 className="text-lg font-bold text-white mb-6">
                            Technical Stack
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="p-4 rounded-lg bg-[#151619] border border-[#2f333a] hover:border-primary/50 transition-colors">
                                <span className="block text-xs text-text-muted mb-1">
                                    Languages
                                </span>
                                <span className="block text-white font-semibold">
                                    Python, TS, Go
                                </span>
                            </div>
                            <div className="p-4 rounded-lg bg-[#151619] border border-[#2f333a] hover:border-primary/50 transition-colors">
                                <span className="block text-xs text-text-muted mb-1">
                                    Frontend
                                </span>
                                <span className="block text-white font-semibold">
                                    React, Next.js
                                </span>
                            </div>
                            <div className="p-4 rounded-lg bg-[#151619] border border-[#2f333a] hover:border-primary/50 transition-colors">
                                <span className="block text-xs text-text-muted mb-1">
                                    AI / ML
                                </span>
                                <span className="block text-white font-semibold">
                                    PyTorch, LangChain
                                </span>
                            </div>
                            <div className="p-4 rounded-lg bg-[#151619] border border-[#2f333a] hover:border-primary/50 transition-colors">
                                <span className="block text-xs text-text-muted mb-1">
                                    Infrastructure
                                </span>
                                <span className="block text-white font-semibold">
                                    Docker, AWS, K8s
                                </span>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
