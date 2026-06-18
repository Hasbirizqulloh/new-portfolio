import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

export default function ProjectDetailLoading() {
    return (
        <main className="flex flex-col min-h-screen">
            <div className="flex-grow pt-10 pb-20 px-6 sm:px-8 max-w-7xl mx-auto w-full flex flex-col gap-10 animate-pulse">
                <div>
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 text-sm text-text-muted opacity-50"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Projects
                    </Link>
                </div>

                <section className="flex flex-col gap-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="space-y-4 w-full md:w-2/3">
                            <div className="flex flex-wrap gap-2">
                                <div className="w-24 h-6 rounded-full bg-surface-dark border border-[#2f333a]"></div>
                                <div className="w-16 h-6 rounded-full bg-surface-dark border border-[#2f333a]"></div>
                            </div>
                            {/* Title Skeleton */}
                            <div className="h-14 md:h-20 bg-surface-dark rounded-xl border border-[#2f333a] w-3/4"></div>
                            {/* Description Skeleton */}
                            <div className="space-y-2 mt-4">
                                <div className="h-4 bg-surface-dark rounded w-full"></div>
                                <div className="h-4 bg-surface-dark rounded w-5/6"></div>
                                <div className="h-4 bg-surface-dark rounded w-4/6"></div>
                            </div>
                        </div>
                        {/* Buttons Skeleton */}
                        <div className="flex gap-4">
                            <div className="w-36 h-12 rounded-lg bg-surface-dark border border-[#2f333a]"></div>
                            <div className="w-12 h-12 rounded-lg bg-surface-dark border border-[#2f333a]"></div>
                        </div>
                    </div>

                    {/* Image Skeleton */}
                    <div className="w-full aspect-video md:aspect-[21/9] rounded-2xl bg-surface-dark border border-[#2f333a] flex items-center justify-center">
                        <Loader2 className="w-10 h-10 text-primary/30 animate-spin" />
                    </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8">
                    {/* Main Content Skeleton */}
                    <div className="lg:col-span-8 flex flex-col gap-16">
                        <section className="space-y-6">
                            <div className="h-8 bg-surface-dark rounded-lg w-1/3"></div>
                            <div className="space-y-3">
                                <div className="h-4 bg-surface-dark rounded w-full"></div>
                                <div className="h-4 bg-surface-dark rounded w-full"></div>
                                <div className="h-4 bg-surface-dark rounded w-11/12"></div>
                                <div className="h-4 bg-surface-dark rounded w-full"></div>
                                <div className="h-4 bg-surface-dark rounded w-4/5"></div>
                            </div>
                        </section>
                        <section className="space-y-6">
                            <div className="h-8 bg-surface-dark rounded-lg w-1/2"></div>
                            <div className="w-full h-80 rounded-xl bg-surface-dark border border-[#2f333a]"></div>
                        </section>
                    </div>

                    {/* Sidebar Skeleton */}
                    <aside className="lg:col-span-4 space-y-8">
                        <div className="bg-surface-dark rounded-xl p-6 border border-[#2f333a] h-64"></div>
                        <div className="bg-surface-dark rounded-xl p-6 border border-[#2f333a] h-48"></div>
                        <div className="bg-surface-dark rounded-xl p-6 border border-[#2f333a] h-48"></div>
                    </aside>
                </div>
            </div>
        </main>
    );
}
