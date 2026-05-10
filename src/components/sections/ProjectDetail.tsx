"use client";

import React from "react";
import { ArrowLeft, Rocket, Code, FileText, Component, Lightbulb, MonitorSmartphone, Server, Database, TrendingUp, Folder, Star, GitFork, ExternalLink, Github, Mail, Linkedin, Copy } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
interface ProjectDetailProps {
    project: {
        id: string;
        title: string;
        description: string;
        content: string;
        category: string;
        image: string;
        liveDemoUrl: string | null;
        sourceCodeUrl: string | null;
        tech: string[];
        architectureDescription?: string;
        architectureImageUrl?: string | null;
        challenges: {
            id: string;
            title: string;
            challenge: string;
            solution: string;
            iconType: string;
        }[];
        results: {
            id: string;
            metric: string;
            value: string;
            color: string;
        }[];
    };
}

export function ProjectDetail({ project }: ProjectDetailProps) {

    return (
        <div className="flex-grow pt-10 pb-20 px-6 sm:px-8 max-w-7xl mx-auto w-full flex flex-col gap-10">
            <div>
                <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Projects
                </Link>
            </div>

            <section className="flex flex-col gap-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider border border-primary/20">
                                {project.category}
                            </span>
                            <span className="px-3 py-1 rounded-full bg-surface-dark text-text-muted text-xs font-bold uppercase tracking-wider border border-[#2f333a]">
                                2023
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
                            {project.title.split(" ")[0]} <span className="text-primary">{project.title.split(" ").slice(1).join(" ")}</span>
                        </h1>
                        <p className="text-xl text-text-muted max-w-2xl">
                            {project.description}
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <a
                            href={project.liveDemoUrl || "#"}
                            className="flex items-center gap-2 h-12 px-6 rounded-lg bg-primary text-background-dark font-bold hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/20"
                        >
                            <Rocket className="w-5 h-5" />
                            Live Demo
                        </a>
                        <a
                            href={project.sourceCodeUrl || "#"}
                            className="flex items-center justify-center w-12 h-12 rounded-lg bg-surface-dark border border-[#2f333a] text-white hover:bg-white hover:text-background-dark transition-all duration-300"
                        >
                            <Code className="w-5 h-5" />
                        </a>
                    </div>
                </div>

                <div className="relative w-full aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden bg-surface-dark border border-[#2f333a] shadow-2xl">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url('${project.image}')` }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-6 left-6 hidden md:flex items-center gap-6 p-4 rounded-xl bg-surface-dark/90 backdrop-blur border border-[#2f333a]">
                        <div>
                            <p className="text-xs text-text-muted uppercase tracking-wide">Platform</p>
                            <p className="text-white font-bold">Web / Desktop</p>
                        </div>
                        <div className="w-px h-8 bg-[#2f333a]"></div>
                        <div>
                            <p className="text-xs text-text-muted uppercase tracking-wide">Client</p>
                            <p className="text-white font-bold">Open Research Lab</p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8">
                <div className="lg:col-span-8 flex flex-col gap-16">
                    <section className="space-y-6">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                            <FileText className="text-primary w-6 h-6" />
                            Project Overview
                        </h2>
                        <div className="prose prose-invert prose-lg text-text-muted leading-relaxed max-w-none whitespace-pre-line">
                            {project.content}
                        </div>
                    </section>

                    <section className="space-y-8">
                        <div className="flex justify-between items-end">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                <Component className="text-primary w-6 h-6" />
                                Architecture &amp; System Design
                            </h2>
                        </div>
                        <p className="text-text-muted whitespace-pre-line">
                            {project.architectureDescription}
                        </p>
                        {project.architectureImageUrl ? (
                            <div className="w-full relative aspect-video rounded-xl bg-surface-dark border border-[#2f333a] overflow-hidden">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img 
                                    src={project.architectureImageUrl} 
                                    alt="Architecture Diagram"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        ) : (
                            <div className="w-full h-80 rounded-xl bg-surface-dark border-2 border-dashed border-[#2f333a] diagram-pattern relative flex items-center justify-center overflow-hidden group">
                                <div className="absolute inset-0 flex items-center justify-center gap-8 opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-32 h-20 rounded bg-background-dark border border-primary/30 flex items-center justify-center text-primary/80 font-mono text-xs shadow-[0_0_15px_rgba(6,206,224,0.1)]">
                                            FastAPI Backend
                                        </div>
                                        <ArrowLeft className="text-gray-600 rotate-[-90deg] w-5 h-5" />
                                    </div>
                                    <div className="h-px w-16 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
                                    <div className="flex flex-col items-center gap-2 transform translate-y-8">
                                        <div className="w-32 h-20 rounded bg-background-dark border border-blue-500/30 flex items-center justify-center text-blue-400/80 font-mono text-xs shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                                            Web Socket
                                        </div>
                                    </div>
                                    <div className="h-px w-16 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-32 h-20 rounded bg-background-dark border border-green-500/30 flex items-center justify-center text-green-400/80 font-mono text-xs shadow-[0_0_15px_rgba(34,197,94,0.1)]">
                                            React Three Fiber
                                        </div>
                                        <ArrowLeft className="text-gray-600 rotate-90 w-5 h-5" />
                                    </div>
                                </div>
                                <div className="absolute bottom-4 right-4 text-xs text-gray-500 font-mono bg-background-dark px-2 py-1 rounded border border-[#2f333a]">
                                    FIG 1.0: System Data Flow
                                </div>
                            </div>
                        )}
                    </section>

                    <section className="space-y-6">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                            <Lightbulb className="text-primary w-6 h-6" />
                            Key Challenges &amp; Solutions
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {project.challenges.map((challenge, idx) => {
                                const isAlt = idx % 2 !== 0; 
                                return (
                                    <div key={challenge.id} className="bg-surface-dark p-6 rounded-xl border border-[#2f333a] hover:border-primary/30 transition-colors">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className={`p-2 rounded ${isAlt ? 'bg-yellow-500/10 text-yellow-400' : 'bg-red-500/10 text-red-400'}`}>
                                                {isAlt ? <Database className="w-5 h-5" /> : <TrendingUp className="w-5 h-5" />}
                                            </div>
                                            <h3 className="text-lg font-bold text-white">{challenge.title}</h3>
                                        </div>
                                        <p className="text-sm text-text-muted mb-2 font-semibold">Challenge:</p>
                                        <p className="text-sm text-text-muted mb-4">{challenge.challenge}</p>
                                        <div className="h-px w-full bg-[#2f333a] mb-4"></div>
                                        <p className="text-sm text-text-muted mb-2 font-semibold text-primary">Solution:</p>
                                        <p className="text-sm text-gray-300">{challenge.solution}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                </div>

                <aside className="lg:col-span-4 space-y-8">
                    <div className="bg-surface-dark rounded-xl p-6 border border-[#2f333a]">
                        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <Code className="text-primary w-5 h-5" />
                            Tech Stack
                        </h3>
                        <div className="space-y-6">
                            <div>
                                <p className="text-xs font-bold text-gray-500 uppercase mb-3">Frontend</p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map((t) => (
                                        <div key={t} className="flex items-center gap-2 px-3 py-2 rounded bg-background-dark border border-[#2f333a] text-sm text-gray-300">
                                            <span className="w-2 h-2 rounded-full bg-blue-400"></span> {t}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-500 uppercase mb-3">Backend</p>
                                <div className="flex flex-wrap gap-2">
                                    <div className="flex items-center gap-2 px-3 py-2 rounded bg-background-dark border border-[#2f333a] text-sm text-gray-300">
                                        <span className="w-2 h-2 rounded-full bg-yellow-400"></span> Python
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-2 rounded bg-background-dark border border-[#2f333a] text-sm text-gray-300">
                                        <span className="w-2 h-2 rounded-full bg-green-400"></span> FastAPI
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-500 uppercase mb-3">DevOps</p>
                                <div className="flex flex-wrap gap-2">
                                    <div className="flex items-center gap-2 px-3 py-2 rounded bg-background-dark border border-[#2f333a] text-sm text-gray-300">
                                        <Server className="w-4 h-4 text-blue-500" /> Docker
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-2 rounded bg-background-dark border border-[#2f333a] text-sm text-gray-300">
                                        <MonitorSmartphone className="w-4 h-4 text-white" /> AWS
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-surface-dark to-[#252A2F] rounded-xl p-6 border border-[#2f333a]">
                        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <TrendingUp className="text-primary w-5 h-5" />
                            Results &amp; Outcomes
                        </h3>
                        <div className="space-y-6 relative">
                            <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-white/5"></div>
                            {project.results.map((result) => {
                                let bgColor = "border-primary";
                                if (result.color === "green") bgColor = "border-green-500";
                                if (result.color === "blue") bgColor = "border-blue-500";
                                
                                return (
                                    <div key={result.id} className="relative pl-6">
                                        <div className={`absolute left-0 top-1.5 w-3.5 h-3.5 bg-background-dark border-2 ${bgColor} rounded-full`}></div>
                                        <p className="text-3xl font-bold text-white">{result.metric}</p>
                                        <p className="text-sm text-text-muted">{result.value}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="bg-surface-dark rounded-xl p-6 border border-[#2f333a] flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Folder className="w-8 h-8 text-white" />
                                <div>
                                    <p className="text-white font-bold text-sm">hasbirizqulloh/{project.title.toLowerCase().replace(" ", "-")}</p>
                                    <p className="text-xs text-gray-500">Public Repository</p>
                                </div>
                            </div>
                            <ExternalLink className="w-5 h-5 text-gray-500" />
                        </div>
                        <div className="flex gap-4 text-xs text-text-muted">
                            <div className="flex items-center gap-1">
                                <Star className="w-3.5 h-3.5" /> 1.2k
                            </div>
                            <div className="flex items-center gap-1">
                                <GitFork className="w-3.5 h-3.5" /> 140
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span> Active
                            </div>
                        </div>
                        <a
                            href="#"
                            className="w-full py-2 rounded border border-[#2f333a] text-center text-sm font-medium text-gray-300 hover:bg-white hover:text-background-dark transition-colors"
                        >
                            View Source Code
                        </a>
                    </div>
                </aside>
            </div>
            {/* Diagram Pattern CSS */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .diagram-pattern {
                    background-image: radial-gradient(#374151 1px, transparent 1px);
                    background-size: 20px 20px;
                }
            `}} />
        </div>
    );
}
