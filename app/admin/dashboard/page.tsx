import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { 
  FolderGit2, 
  FileText, 
  Mail, 
  ArrowRight, 
  Clock, 
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default async function AdminDashboard() {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  // Fetch real stats & recent data
  const [
    projectCount, 
    blogCount, 
    messageCount,
    recentMessages,
    recentProjects,
    recentBlogs
  ] = await Promise.all([
    prisma.project.count(),
    prisma.blogPost.count(),
    prisma.contactMessage.count({ where: { status: "UNREAD" } }),
    prisma.contactMessage.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    }),
    prisma.project.findMany({
      take: 3,
      orderBy: { updatedAt: "desc" },
      select: { id: true, title: true, updatedAt: true }
    }),
    prisma.blogPost.findMany({
      take: 3,
      orderBy: { updatedAt: "desc" },
      select: { id: true, title: true, updatedAt: true }
    }),
  ]);

  // Combine and sort recent activities
  const activities = [
    ...recentProjects.map(p => ({ ...p, type: 'Project' as const, icon: FolderGit2, color: 'text-primary', bg: 'bg-primary/10' })),
    ...recentBlogs.map(b => ({ ...b, type: 'Blog' as const, icon: FileText, color: 'text-blue-500', bg: 'bg-blue-500/10' }))
  ]
  .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
  .slice(0, 5);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Selamat datang kembali, {session.user?.name}</p>
      </header>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Projects", value: projectCount, icon: FolderGit2, color: "text-primary", bg: "bg-primary/10" },
          { label: "Blog Posts", value: blogCount, icon: FileText, color: "text-blue-500", bg: "bg-blue-500/10" },
          { label: "Unread Messages", value: messageCount, icon: Mail, color: "text-green-500", bg: "bg-green-500/10" },
        ].map((stat) => (
          <div key={stat.label} className="p-6 bg-surface-dark rounded-xl border border-white/5 shadow-sm flex items-center justify-between group hover:border-white/10 transition-colors">
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold mb-2">{stat.label}</p>
              <p className={`text-4xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
            <div className={`w-14 h-14 rounded-full ${stat.bg} flex items-center justify-center ${stat.color}`}>
              <stat.icon size={28} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Recent Activity Feed */}
        <div className="p-8 bg-surface-dark rounded-2xl border border-white/5 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Clock className="text-gray-400 w-5 h-5" /> Recent Activity
            </h2>
          </div>
          
          <div className="flex-1 space-y-6">
            {activities.length > 0 ? (
              <div className="relative border-l border-white/10 ml-3 space-y-6">
                {activities.map((activity, i) => (
                  <div key={`${activity.type}-${activity.id}`} className="relative pl-6">
                    <div className={`absolute -left-3.5 top-1 w-7 h-7 rounded-full bg-surface-dark border border-white/10 flex items-center justify-center z-10`}>
                      <div className={`w-5 h-5 rounded-full ${activity.bg} flex items-center justify-center`}>
                        <activity.icon className={`w-3 h-3 ${activity.color}`} />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-white font-medium">
                        <span className="text-gray-400 font-normal">Updated {activity.type.toLowerCase()} </span>
                        {activity.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDistanceToNow(new Date(activity.updatedAt), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">Belum ada aktivitas.</p>
            )}
          </div>
          
          <div className="mt-6 pt-6 border-t border-white/5">
             <Link href="/admin/projects" className="text-sm text-gray-400 hover:text-white flex items-center gap-2 transition-colors">
              Manage Content <ArrowRight className="w-4 h-4" />
             </Link>
          </div>
        </div>

        {/* Recent Messages Preview */}
        <div className="p-8 bg-surface-dark rounded-2xl border border-white/5 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Mail className="text-gray-400 w-5 h-5" /> Recent Messages
            </h2>
            {messageCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full bg-green-500/10 text-green-500 text-xs font-bold animate-pulse">
                {messageCount} New
              </span>
            )}
          </div>

          <div className="flex-1 space-y-4">
            {recentMessages.length > 0 ? (
              recentMessages.map(msg => (
                <div key={msg.id} className="p-4 rounded-xl bg-background-dark border border-white/5 hover:border-white/10 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-semibold text-white text-sm">{msg.senderName}</p>
                    <span className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(msg.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 truncate mb-3">
                    {msg.subject || msg.message.substring(0, 50)}...
                  </p>
                  <div className="flex items-center gap-2">
                    {msg.status === 'UNREAD' ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-red-500/10 text-red-400 text-[10px] font-bold tracking-wider uppercase">
                        <AlertCircle className="w-3 h-3" /> Unread
                      </span>
                    ) : msg.status === 'READ' ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-blue-500/10 text-blue-400 text-[10px] font-bold tracking-wider uppercase">
                        Read
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-green-500/10 text-green-400 text-[10px] font-bold tracking-wider uppercase">
                        <CheckCircle2 className="w-3 h-3" /> Responded
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Mail className="w-12 h-12 text-gray-600 mx-auto mb-3 opacity-50" />
                <p className="text-gray-500 text-sm">Belum ada pesan masuk.</p>
              </div>
            )}
          </div>

          <div className="mt-6 pt-6 border-t border-white/5">
             <Link href="/admin/messages" className="text-sm text-gray-400 hover:text-white flex items-center gap-2 transition-colors">
              View All Messages <ArrowRight className="w-4 h-4" />
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
