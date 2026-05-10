"use client";

import { usePathname } from "next/navigation";

export function FooterWrapper() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) return null;

  return (
    <footer className="py-8 text-center text-gray-500 text-sm border-t border-white/5">
      © {new Date().getFullYear()} Hasbirizqulloh. Built with Next.js & Tailwind.
    </footer>
  );
}
