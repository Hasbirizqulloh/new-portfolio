"use client";

import React from "react";
import { User, Calendar, Clock, Share2, Link as LinkIcon, Bookmark, Mail, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "./Blog";

interface PostDetailProps {
    id: string;
}

export function PostDetail({ id }: PostDetailProps) {
    // Find the post, or show a 404 if it doesn't exist
    const post = blogPosts.find((p) => p.id.toString() === id);

    if (!post) {
        // In a real app we might fetch from API, for now if ID is not 1 we just return not found
        // Or we could mock it using the ID
        return notFound();
    }

    return (
        <div className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">

            {/* Top Progress Bar - Fixed */}
            <div className="fixed top-0 left-0 h-1 bg-primary cursor-pointer w-1/3 z-[60] transition-all duration-300"></div>

            <div className="flex flex-col lg:flex-row justify-center gap-8 lg:gap-12 relative">

                {/* Left Sidebar: TOC & Share */}
                <aside className="hidden lg:block w-64 flex-shrink-0">
                    <div className="sticky top-28 flex flex-col gap-10">
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-text-muted mb-4">Table of Contents</h3>
                            <nav className="flex flex-col gap-3 border-l border-[#2f333a] pl-4">
                                <a className="text-sm font-medium text-primary" href="#">Introduction</a>
                                <a className="text-sm font-medium text-text-muted hover:text-white transition-colors" href="#">The Challenge: Latency vs Throughput</a>
                                <a className="text-sm font-medium text-text-muted hover:text-white transition-colors" href="#">Architecture Overview</a>
                                <a className="text-sm font-medium text-text-muted hover:text-white transition-colors pl-3" href="#">FastAPI for Serving</a>
                                <a className="text-sm font-medium text-text-muted hover:text-white transition-colors pl-3" href="#">Redis as a Message Broker</a>
                                <a className="text-sm font-medium text-text-muted hover:text-white transition-colors" href="#">Kubernetes Deployment</a>
                                <a className="text-sm font-medium text-text-muted hover:text-white transition-colors" href="#">Conclusion</a>
                            </nav>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-text-muted mb-4">Share</h3>
                            <div className="flex items-center gap-3">
                                <button className="w-10 h-10 rounded-full bg-surface-dark border border-[#2f333a] flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/50 transition-colors">
                                    <Share2 className="w-5 h-5" />
                                </button>
                                <button className="w-10 h-10 rounded-full bg-surface-dark border border-[#2f333a] flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/50 transition-colors">
                                    <LinkIcon className="w-5 h-5" />
                                </button>
                                <button className="w-10 h-10 rounded-full bg-surface-dark border border-[#2f333a] flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/50 transition-colors">
                                    <Bookmark className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Article Content */}
                <article className="flex-1 min-w-0 max-w-3xl">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-text-muted hover:text-primary transition-colors mb-6">
                        &larr; Back to Blog
                    </Link>

                    <div className="mb-8 w-full rounded-2xl overflow-hidden aspect-[2/1] bg-surface-dark border border-[#2f333a]">
                        {post.image ? (
                            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${post.image}')` }}></div>
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-surface-dark to-[#151619] border border-[#2f333a]"></div>
                        )}
                    </div>

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-text-muted mb-10 pb-8 border-b border-[#2f333a]">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#151619] border border-[#2f333a] flex items-center justify-center text-primary">
                                <User className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="font-bold text-white">{post.author}</p>
                                <p className="text-xs">Fullstack/AI Engineer</p>
                            </div>
                        </div>
                        <div className="hidden md:block w-px h-8 bg-[#2f333a]"></div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{post.date}</span>
                        </div>
                        <div className="hidden md:block w-px h-8 bg-[#2f333a]"></div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{post.readTime}</span>
                        </div>
                        <div className="hidden md:block w-px h-8 bg-[#2f333a]"></div>
                        <span className="px-3 py-1 rounded bg-primary/10 border border-primary/30 text-xs font-bold text-primary tracking-wide">
                            {post.category}
                        </span>
                    </div>

                    <div className="prose prose-invert prose-lg max-w-none prose-p:text-text-main prose-headings:text-white prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-white prose-li:text-text-main">
                        <p className="text-xl leading-relaxed text-text-muted mb-8">
                            {post.excerpt}
                        </p>
                        <h2 className="text-2xl font-bold mt-12 mb-6">Introduction</h2>
                        <p className="mb-6">
                            Deploying machine learning models to production is often more challenging than training them. While a Jupyter notebook is a great environment for experimentation, a production system needs to handle concurrent requests, manage resources efficiently, and scale dynamically based on traffic.
                        </p>
                        <h2 className="text-2xl font-bold mt-12 mb-6">The Challenge: Latency vs Throughput</h2>
                        <p className="mb-6">
                            When designing an inference pipeline, you typically face a trade-off between latency (how fast a single request is processed) and throughput (how many requests can be processed per second).
                        </p>
                        <ul className="list-disc pl-6 mb-8 space-y-2">
                            <li><strong>Direct Inference:</strong> Great for latency, poor for throughput. Every request blocks the server.</li>
                            <li><strong>Batch Inference:</strong> Great for throughput, poor for latency. Requests wait until a batch is full.</li>
                        </ul>
                        <h2 className="text-2xl font-bold mt-12 mb-6">Architecture Overview</h2>
                        <p className="mb-6">
                            To achieve the best of both worlds, we implemented a microservice architecture using FastAPI for the API gateway, Redis as a message broker for dynamic batching, and an isolated model inference worker.
                        </p>
                        <h3 className="text-xl font-bold mt-8 mb-4">FastAPI for Serving</h3>
                        <p className="mb-6">
                            FastAPI is an excellent choice for the API layer due to its asynchronous support and automatic OpenAPI documentation. Here is a simplified version of our ingestion endpoint:
                        </p>
                        <pre className="bg-[#151619] border border-[#2f333a] rounded-xl p-6 overflow-x-auto mb-8 shadow-inner">
                            <code className="text-sm font-mono text-text-main">
                                <span className="text-purple-400">from</span> fastapi <span className="text-purple-400">import</span> FastAPI, BackgroundTasks{"\n"}
                                <span className="text-purple-400">from</span> pydantic <span className="text-purple-400">import</span> BaseModel{"\n"}
                                <span className="text-purple-400">import</span> redis{"\n"}
                                app = FastAPI(){"\n"}
                                redis_client = redis.Redis(host=<span className="text-green-400">'localhost'</span>, port=<span className="text-orange-400">6379</span>){"\n"}
                                <span className="text-purple-400">class</span> <span className="text-blue-400">InferenceRequest</span>(BaseModel):{"\n"}
                                {"    "}text: <span className="text-primary">str</span>{"\n"}
                                <span className="text-yellow-400">@app.post</span>(<span className="text-green-400">"/predict"</span>){"\n"}
                                <span className="text-purple-400">async def</span> <span className="text-blue-400">predict</span>(request: InferenceRequest):{"\n"}
                                {"    "}<span className="text-text-muted"># Push request to Redis queue for the worker</span>{"\n"}
                                {"    "}job_id = redis_client.rpush(<span className="text-green-400">'inference_queue'</span>, request.text){"\n"}
                                {"    "}<span className="text-purple-400">return</span> {"{"}<span className="text-green-400">"job_id"</span>: job_id, <span className="text-green-400">"status"</span>: <span className="text-green-400">"processing"</span>{"}"}
                            </code>
                        </pre>
                        <h3 className="text-xl font-bold mt-8 mb-4">Conclusion</h3>
                        <p className="mb-6">
                            By decoupling the API gateway from the actual inference using Redis, we were able to scale our worker nodes independently. This architecture easily handles sudden spikes in traffic while keeping our GPU utilization optimal.
                        </p>
                    </div>

                    <div className="mt-16 pt-12 border-t border-[#2f333a]">
                        {/* Newsletter Subscription */}
                        <div className="bg-surface-dark border border-[#2f333a] rounded-2xl p-8 mb-12 text-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold text-white mb-2">Subscribe to Engineering Insights</h3>
                                <p className="text-text-muted mb-6 max-w-md mx-auto">Get deep dives on AI engineering, system design, and fullstack development delivered to your inbox.</p>
                                <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                                    <input className="flex-1 bg-[#151619] border border-[#2f333a] text-white rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-text-muted/60" placeholder="Email address" type="email" />
                                    <button className="px-6 py-3 rounded-lg bg-primary text-background-dark font-bold hover:bg-primary/90 transition-colors shadow-neon whitespace-nowrap" type="button">Subscribe</button>
                                </form>
                            </div>
                        </div>

                        {/* Comments Section */}
                        <div>
                            <h3 className="text-xl font-bold text-white mb-6">Comments (3)</h3>
                            <div className="space-y-6">
                                <div className="bg-surface-dark border border-[#2f333a] rounded-xl p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-[#151619] flex items-center justify-center text-text-muted text-xs font-bold">JD</div>
                                            <span className="font-medium text-white text-sm">John Doe</span>
                                        </div>
                                        <span className="text-xs text-text-muted">2 days ago</span>
                                    </div>
                                    <p className="text-sm text-text-muted leading-relaxed">Great write-up! Have you considered using RabbitMQ instead of Redis for the message broker? I&apos;ve found it handles complex routing better.</p>
                                </div>
                            </div>
                            <button className="mt-6 w-full py-4 rounded-xl border border-[#2f333a] bg-transparent text-white font-medium hover:border-primary/50 hover:bg-surface-dark transition-all">
                                Load More Comments
                            </button>
                        </div>
                    </div>
                </article>

                {/* Right Sidebar: Related Articles */}
                <aside className="hidden xl:block w-72 flex-shrink-0">
                    <div className="sticky top-28">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-text-muted mb-6">Related Articles</h3>
                        <div className="flex flex-col gap-6">
                            <Link href="/blog/2" className="group flex flex-col gap-2">
                                <div className="w-full aspect-video rounded-lg bg-[#151619] border border-[#2f333a] overflow-hidden relative">
                                    <div className="absolute inset-0 bg-cover bg-center opacity-70 group-hover:scale-105 transition-transform duration-500 bg-surface-dark border border-[#2f333a]" ></div>
                                </div>
                                <span className="text-xs font-bold text-primary">Deep Learning</span>
                                <h4 className="text-sm font-bold text-white group-hover:text-primary transition-colors line-clamp-2">Fine-Tuning Open Source LLMs for Domain-Specific Tasks</h4>
                            </Link>
                            <Link href="/blog/3" className="group flex flex-col gap-2">
                                <div className="w-full aspect-video rounded-lg bg-[#151619] border border-[#2f333a] overflow-hidden relative">
                                    <div className="absolute inset-0 bg-cover bg-center opacity-70 group-hover:scale-105 transition-transform duration-500 bg-surface-dark border border-[#2f333a]"></div>
                                </div>
                                <span className="text-xs font-bold text-primary">System Design</span>
                                <h4 className="text-sm font-bold text-white group-hover:text-primary transition-colors line-clamp-2">Event-Driven Microservices: A Practical Architecture</h4>
                            </Link>
                        </div>
                    </div>
                </aside>

            </div>

            {/* CTA Section */}
            <footer className="mt-12 pt-12 border-t border-[#2f333a]">
                <div className="bg-surface-dark rounded-2xl border border-[#2f333a] p-10 md:p-16 text-center max-w-4xl mx-auto flex flex-col items-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Enjoyed the read?
                    </h2>
                    <p className="text-text-muted mb-8 max-w-md">
                        I regularly share technical deep dives on my newsletter. Subscribe, or if you have a specific project in mind, let&apos;s talk.
                    </p>
                    <Link
                        href="/contact"
                        className="bg-primary hover:bg-primary/90 text-background-dark font-bold py-4 px-8 rounded-xl flex items-center gap-2 transition-all hover:shadow-neon hover:-translate-y-1 active:scale-[0.98]"
                    >
                        <span>Let&apos;s Talk</span>
                        <ArrowUpRight className="w-5 h-5" />
                    </Link>
                </div>
            </footer>
        </div>
    );
}
