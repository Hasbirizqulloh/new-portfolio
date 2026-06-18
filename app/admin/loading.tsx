import { Loader2 } from "lucide-react";

export default function AdminLoading() {
    return (
        <div className="flex-1 w-full h-full min-h-[500px] flex flex-col items-center justify-center animate-pulse gap-6">
            <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl"></div>
                <div className="relative bg-surface-dark border border-[#2f333a] p-4 rounded-full shadow-2xl">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
            </div>
            <div className="flex flex-col items-center gap-2">
                <h3 className="text-xl font-bold text-white">Loading Workspace...</h3>
                <p className="text-sm text-text-muted">Fetching your secure data</p>
            </div>
            
            {/* Quick Skeleton Layout for Admin */}
            <div className="w-full max-w-4xl mt-8 space-y-4 px-6 opacity-30">
                <div className="h-10 bg-surface-dark rounded-lg w-1/4"></div>
                <div className="h-64 bg-surface-dark rounded-xl w-full"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="h-32 bg-surface-dark rounded-xl"></div>
                    <div className="h-32 bg-surface-dark rounded-xl"></div>
                    <div className="h-32 bg-surface-dark rounded-xl"></div>
                </div>
            </div>
        </div>
    );
}
