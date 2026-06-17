import { auth } from "@/auth";
import { Sidebar } from "@/components/admin/Sidebar";
import { Topbar } from "@/components/admin/Topbar";
import { ToastProvider } from "@/components/ui/Toast";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Jika tidak ada session (belum login), kembalikan children saja (halaman login)
  if (!session) {
    return <ToastProvider>{children}</ToastProvider>;
  }

  return (
    <ToastProvider>
      <div className="flex min-h-screen bg-background-dark">
        <Sidebar user={session.user} />
        <Topbar user={session.user} />
        
        <main className="flex-1 p-6 lg:p-10 lg:ml-64 mt-20 h-[calc(100vh-5rem)] overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </ToastProvider>
  );
}
