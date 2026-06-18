import { Loader2 } from "lucide-react";

export default function ProjectsLoading() {
    return (
        <main className="flex flex-col min-h-screen">
            <div className="flex-grow pt-32 pb-20 px-6 sm:px-8 max-w-7xl mx-auto w-full animate-pulse">
                {/* Header Skeleton */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div className="space-y-4 max-w-2xl w-full">
                        <div className="h-12 md:h-16 bg-surface-dark rounded-xl w-3/4 border border-[#2f333a]"></div>
                        <div className="h-6 bg-surface-dark rounded-lg w-full max-w-lg border border-[#2f333a]"></div>
                    </div>
                    {/* Filter Skeleton */}
                    <div className="flex gap-2">
                        <div className="w-24 h-10 rounded-full bg-surface-dark border border-[#2f333a]"></div>
                        <div className="w-24 h-10 rounded-full bg-surface-dark border border-[#2f333a]"></div>
                        <div className="w-24 h-10 rounded-full bg-surface-dark border border-[#2f333a]"></div>
                    </div>
                </div>

                {/* Grid Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex flex-col rounded-2xl bg-surface-dark border border-[#2f333a] overflow-hidden h-[400px]">
                            <div className="w-full h-48 bg-background-dark flex items-center justify-center">
                                <Loader2 className="w-8 h-8 text-primary/30 animate-spin" />
                            </div>
                            <div className="p-8 space-y-4">
                                <div className="h-6 bg-background-dark rounded w-3/4"></div>
                                <div className="h-4 bg-background-dark rounded w-full"></div>
                                <div className="h-4 bg-background-dark rounded w-5/6"></div>
                                <div className="flex gap-2 pt-4">
                                    <div className="w-16 h-6 rounded-full bg-background-dark"></div>
                                    <div className="w-16 h-6 rounded-full bg-background-dark"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
