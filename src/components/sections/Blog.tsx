"use client";

import React, { useState } from "react";
import { Search, Clock, ArrowRight, User, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export type BlogPost = {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    readTime: string;
    author: string;
    tags: string[];
    image?: string;
    featured: boolean;
};

const filters = ["all", "python", "react", "llm"];

export function Blog({ initialPosts }: { initialPosts: BlogPost[] }) {
    const [activeFilter, setActiveFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const featuredPost = initialPosts.find((post) => post.featured);
    const regularPosts = initialPosts.filter((post) => !post.featured);

    // Apply search and filter to regular posts
    const filteredPosts = regularPosts.filter((post) => {
        const matchesFilter = activeFilter === "all" || post.tags.includes(activeFilter);
        const matchesSearch =
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">

            {/* Header & Search/Filter */}
            <section className="mb-16 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
                <div className="max-w-2xl">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.15] tracking-tight mb-4">
                        Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">Insights</span>
                    </h1>
                    <p className="text-lg text-text-muted leading-relaxed">
                        Deep dives into AI, fullstack architecture, and data engineering. Exploring the technical challenges behind building intelligent systems.
                    </p>
                </div>
                <div className="w-full lg:w-auto flex flex-col gap-4">
                    <div className="relative w-full lg:w-80 group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors w-5 h-5" />
                        <input
                            className="w-full bg-surface-dark border border-[#2f333a] text-white rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-text-muted/60 shadow-sm"
                            placeholder="Search posts (AI, Fullstack, Data)..."
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={cn(
                                    "px-3 py-1.5 rounded-full text-xs font-semibold transition-colors",
                                    activeFilter === filter
                                        ? "bg-primary/10 border border-primary/30 text-primary"
                                        : "bg-surface-dark border border-[#2f333a] text-text-muted hover:text-primary hover:border-primary/50"
                                )}
                            >
                                # {filter}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Post (Only show if no search/filter to keep focus when searching) */}
            {featuredPost && activeFilter === "all" && !searchQuery && (
                <section className="mb-20">
                    <div className="flex items-center gap-4 mb-8">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-text-muted">
                            Featured Post
                        </h3>
                        <div className="h-px bg-[#2f333a] flex-grow"></div>
                    </div>
                    <Link
                        href={`/blog/${featuredPost.id}`}
                        className="group relative rounded-2xl overflow-hidden bg-surface-dark border border-[#2f333a] hover:border-primary/50 transition-all duration-300 hover:shadow-neon flex flex-col md:flex-row cursor-pointer h-full md:min-h-[400px]"
                    >
                        <div className="w-full md:w-[55%] relative overflow-hidden bg-[#151619]">
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-80"
                                style={{ backgroundImage: `url('${featuredPost.image}')` }}
                            ></div>
                            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-surface-dark via-surface-dark/80 to-transparent"></div>
                        </div>
                        <div className="w-full md:w-[45%] p-8 lg:p-12 flex flex-col justify-center relative z-10">
                            <div className="flex items-center gap-4 mb-4">
                                <span className="px-3 py-1 rounded bg-primary/20 text-xs font-bold text-primary tracking-wide">
                                    {featuredPost.category}
                                </span>
                                <span className="text-sm text-text-muted flex items-center gap-1">
                                    <Clock className="w-4 h-4" /> {featuredPost.readTime}
                                </span>
                            </div>
                            <h2 className="text-2xl lg:text-4xl font-bold text-white mb-4 group-hover:text-primary transition-colors leading-tight">
                                {featuredPost.title}
                            </h2>
                            <p className="text-text-muted leading-relaxed mb-8">
                                {featuredPost.excerpt}
                            </p>
                            <div className="flex items-center justify-between mt-auto">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-[#151619] border border-[#2f333a] flex items-center justify-center text-primary">
                                        <User className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-white">{featuredPost.author}</p>
                                        <p className="text-xs text-text-muted">{featuredPost.date}</p>
                                    </div>
                                </div>
                                <ArrowRight className="text-primary group-hover:translate-x-1 transition-transform w-5 h-5" />
                            </div>
                        </div>
                    </Link>
                </section>
            )}

            {/* Grid of Posts */}
            <section className="mb-20">
                <div className="flex items-center gap-4 mb-8">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-text-muted">
                        {activeFilter === "all" && !searchQuery ? "Recent Articles" : "Search Results"}
                    </h3>
                    <div className="h-px bg-[#2f333a] flex-grow"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map((post) => (
                            <Link
                                href={`/blog/${post.id}`}
                                key={post.id}
                                className="group rounded-xl overflow-hidden bg-surface-dark border border-[#2f333a] hover:border-primary/50 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 cursor-pointer flex flex-col h-full"
                            >
                                <div className="p-6 flex-grow flex flex-col">
                                    <div className="flex items-center justify-between mb-5">
                                        <span className="text-xs font-bold text-primary uppercase tracking-wider">
                                            {post.category}
                                        </span>
                                        <span className="text-xs text-text-muted">{post.date}</span>
                                    </div>
                                    <h4 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                        {post.title}
                                    </h4>
                                    <p className="text-sm text-text-muted leading-relaxed mb-6 flex-grow line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between pt-4 border-t border-[#2f333a]">
                                        <span className="text-xs font-medium text-text-muted bg-[#151619] px-2 py-1 rounded border border-[#2f333a]">
                                            # {post.tags[0]}
                                        </span>
                                        <span className="text-xs text-text-muted flex items-center gap-1">
                                            <Clock className="w-3.5 h-3.5" /> {post.readTime}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full py-12 text-center text-text-muted">
                            <p className="text-lg">No articles found matching your criteria.</p>
                            <button
                                onClick={() => { setActiveFilter("all"); setSearchQuery(""); }}
                                className="mt-4 text-primary hover:underline text-sm"
                            >
                                Clear search & filters
                            </button>
                        </div>
                    )}
                </div>

                {
                    filteredPosts.length > 0 && (
                        <div className="mt-12 flex justify-center">
                            <button className="px-6 py-3 rounded-lg border border-[#2f333a] bg-transparent text-white font-medium hover:border-primary/50 hover:bg-surface-dark/50 transition-all hover:scale-105 active:scale-95">
                                Load More Articles
                            </button>
                        </div>
                    )
                }
            </section >

            {/* Footer Area inside page */}
            < footer className="bg-surface-dark border border-[#2f333a] rounded-2xl overflow-hidden mb-8" >
                <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl font-bold text-white mb-2">Want to discuss a project?</h2>
                        <p className="text-text-muted">I&apos;m always open to talking about AI, infrastructure, and scalable systems.</p>
                    </div>
                    <Link
                        className="group flex items-center gap-2 px-8 py-4 rounded-full bg-[#151619] border border-[#2f333a] hover:border-primary text-white font-medium transition-all hover:shadow-neon"
                        href="/contact"
                    >
                        <span>Contact Me</span>
                        <Mail className="group-hover:translate-x-1 transition-transform text-primary w-5 h-5 ml-1" />
                    </Link>
                </div>
            </footer >
        </div >
    );
}
