"use client";

import React, { useState } from "react";
import { Search, ArrowUpRight, Github, Mail, Linkedin, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Define types for a project
export type Project = {
    id: string;
    title: string;
    description: string;
    category: string;
    categoryColor: string;
    image: string;
    tech: string[];
};

const filters = ["All Projects", "Fullstack", "AI / ML", "Data Eng"];

export function Projects({ initialProjects }: { initialProjects: Project[] }) {
    const [activeFilter, setActiveFilter] = useState("All Projects");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredProjects = initialProjects.filter((project) => {
        const matchesFilter =
            activeFilter === "All Projects" || project.category === activeFilter;
        const matchesSearch =
            project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.tech.some((t) =>
                t.toLowerCase().includes(searchQuery.toLowerCase())
            );
        return matchesFilter && matchesSearch;
    });


    return (
        <div className="flex-grow pt-10 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex flex-col gap-12">
            {/* Header Section */}
            <section className="max-w-3xl">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
                    Engineering <span className="text-primary">Gallery</span>
                </h1>
                <p className="text-lg text-text-muted leading-relaxed border-l-4 border-primary/50 pl-6">
                    My approach to engineering is rooted in &quot;Invisible Complexity&quot;—creating
                    sophisticated systems that feel simple to the end-user. Below is a
                    curated collection of my work, bridging the gap between robust data
                    architecture, intelligent algorithms, and pixel-perfect interfaces.
                </p>
            </section>

            {/* Filter & Search Bar */}
            <section className="py-4 border-b border-[#2f333a] -mx-4 px-4 sm:mx-0 sm:px-0">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2 p-1 bg-surface-dark rounded-lg border border-[#2f333a] w-full md:w-auto overflow-x-auto hide-scrollbar">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={cn(
                                    "px-5 py-2 rounded-md font-medium text-sm transition-all whitespace-nowrap",
                                    activeFilter === filter
                                        ? "bg-primary/10 text-primary font-bold border border-primary/20"
                                        : "text-text-muted hover:text-white hover:bg-white/5 border border-transparent"
                                )}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                    <div className="relative w-full md:w-80 group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors w-5 h-5" />
                        <input
                            className="w-full h-11 pl-10 pr-4 bg-surface-dark border border-[#2f333a] rounded-lg text-sm text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-600"
                            placeholder="Search tech stack, title..."
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.length > 0 ? (
                    filteredProjects.map((project) => (
                        <Link
                            href={`/projects/${project.id}`}
                            key={project.id}
                            className="group rounded-xl overflow-hidden bg-surface-dark border border-[#2f333a] hover:border-primary/50 hover:shadow-neon transition-all duration-300 flex flex-col h-full relative"
                        >
                            <div className="h-56 w-full relative overflow-hidden bg-[#151619]">
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105 opacity-80"
                                    style={{ backgroundImage: `url('${project.image}')` }}
                                ></div>
                                <div className="absolute inset-0 bg-background-dark/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm z-10">
                                    <div className="flex items-center gap-2 px-6 py-3 bg-primary text-background-dark font-bold rounded-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg shadow-primary/20">
                                        Read Case Study
                                        <ArrowUpRight className="w-4 h-4" />
                                    </div>
                                </div>
                                <div className="absolute top-4 left-4 z-20">
                                    <span
                                        className={cn(
                                            "px-3 py-1 bg-background-dark/80 backdrop-blur text-xs font-bold uppercase tracking-wider rounded border",
                                            project.categoryColor
                                        )}
                                    >
                                        {project.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-text-muted text-sm mb-6 flex-grow leading-relaxed">
                                    {project.description}
                                </p>
                                <div className="border-t border-[#2f333a] pt-4">
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map((t) => (
                                            <span
                                                key={t}
                                                className="text-xs font-mono px-2 py-1 bg-white/5 text-gray-300 rounded border border-[#2f333a]"
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center text-text-muted">
                        <Code2 className="w-12 h-12 mx-auto mb-4 opacity-20" />
                        <p className="text-lg">No projects found matching your criteria.</p>
                        <button
                            onClick={() => { setActiveFilter("All Projects"); setSearchQuery(""); }}
                            className="mt-4 text-primary hover:underline text-sm"
                        >
                            Clear filters
                        </button>
                    </div>
                )}
            </section>

            {/* CTA Section */}
            <footer className="mt-12 pt-12 border-t border-[#2f333a]">
                <div className="bg-surface-dark rounded-2xl border border-[#2f333a] p-10 md:p-16 text-center max-w-4xl mx-auto flex flex-col items-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Interested in collaboration?
                    </h2>
                    <p className="text-text-muted mb-8 max-w-md">
                        I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Let&apos;s build something great together.
                    </p>
                    <Link
                        href="/contact"
                        className="bg-primary hover:bg-primary/90 text-background-dark font-bold py-4 px-8 rounded-xl flex items-center gap-2 transition-all hover:shadow-neon hover:-translate-y-1 active:scale-[0.98]"
                    >
                        <span>Let&apos;s Talk</span>
                        <ArrowUpRight className="w-5 h-5" />
                    </Link>
                </div>

                <div className="text-center pt-20 pb-4 text-xs text-text-muted flex items-center justify-center gap-1">
                    © 2024 Hasbirizqulloh. Designed with <span className="text-primary hover:text-white transition-colors">♥</span> &amp; Code.
                </div>
            </footer>
        </div>
    );
}
