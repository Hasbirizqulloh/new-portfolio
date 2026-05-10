import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function AdminDashboard() {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  // Fetch real stats
  const [projectCount, blogCount, messageCount] = await Promise.all([
    prisma.project.count(),
    prisma.blogPost.count(),
    prisma.contactMessage.count({ where: { status: "UNREAD" } }),
  ]);

  return (
    <div className="min-h-screen bg-background-dark p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard Admin</h1>
            <p className="text-gray-400">Selamat datang kembali, {session.user?.name}</p>
          </div>
          
          <form action={async () => {
            "use server";
            await signOut();
          }}>
            <button className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all">
              Sign Out
            </button>
          </form>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stats Cards */}
          {[
            { label: "Total Projects", value: projectCount, color: "text-primary" },
            { label: "Blog Posts", value: blogCount, color: "text-blue-500" },
            { label: "Unread Messages", value: messageCount, color: "text-green-500" },
          ].map((stat) => (
            <div key={stat.label} className="p-6 bg-surface-dark rounded-xl border border-white/5">
              <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold mb-2">{stat.label}</p>
              <p className={`text-4xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <div className="p-8 bg-surface-dark rounded-2xl border border-white/5">
            <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/admin/projects" className="p-4 rounded-xl bg-primary/10 border border-primary/20 text-primary font-semibold hover:bg-primary/20 transition-all text-center">
                Manage Projects
              </Link>
              <Link href="/admin/blog" className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-500 font-semibold hover:bg-blue-500/20 transition-all text-center">
                Manage Blog
              </Link>
              <Link href="/admin/about" className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500 font-semibold hover:bg-green-500/20 transition-all text-center">
                Edit About
              </Link>
              <Link href="/admin/settings" className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-500 font-semibold hover:bg-purple-500/20 transition-all text-center">
                Site Settings
              </Link>
            </div>
          </div>

          {/* Recent Messages Preview */}
          <div className="p-8 bg-surface-dark rounded-2xl border border-white/5">
            <h2 className="text-xl font-bold text-white mb-6">Recent Messages</h2>
            <div className="space-y-4">
              {messageCount > 0 ? (
                <p className="text-primary text-sm font-semibold animate-pulse">
                  Anda memiliki {messageCount} pesan baru yang belum dibaca!
                </p>
              ) : (
                <p className="text-gray-500 text-sm">Belum ada pesan baru.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
