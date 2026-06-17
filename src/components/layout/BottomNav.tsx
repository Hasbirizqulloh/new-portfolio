"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, FolderGit2, BookOpen, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/about", icon: User },
  { name: "Projects", href: "/projects", icon: FolderGit2 },
  { name: "Blog", href: "/blog", icon: BookOpen },
  { name: "Contact", href: "/contact", icon: Mail },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface-dark/95 backdrop-blur-xl border-t border-white/10 safe-area-bottom">
      <div className="flex items-center justify-around h-16 px-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname?.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 w-full py-1 rounded-xl transition-all duration-200 relative",
                isActive
                  ? "text-primary"
                  : "text-gray-500 active:text-gray-300"
              )}
            >
              {/* Active indicator dot */}
              {isActive && (
                <span className="absolute -top-1 w-1 h-1 rounded-full bg-primary shadow-[0_0_6px_theme(colors.primary)]" />
              )}
              <Icon
                size={20}
                strokeWidth={isActive ? 2.5 : 1.8}
                className={cn(
                  "transition-all duration-200",
                  isActive ? "scale-110" : ""
                )}
              />
              <span
                className={cn(
                  "text-[10px] leading-tight transition-all duration-200",
                  isActive ? "font-bold" : "font-medium"
                )}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
