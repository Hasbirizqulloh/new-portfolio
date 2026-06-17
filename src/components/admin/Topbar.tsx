"use client";

import React from "react";

interface TopbarProps {
  user: any;
}

export function Topbar({ user }: TopbarProps) {
  return (
    <div className="fixed top-0 right-0 left-0 lg:left-64 h-20 bg-background-dark/80 backdrop-blur-md border-b border-white/5 z-40 px-6 lg:px-10 flex items-center justify-end">
      <div className="flex items-center gap-3 px-4 py-2 bg-surface-dark border border-white/5 rounded-full shadow-lg">
        <div className="hidden sm:block overflow-hidden text-right">
          <p className="text-sm font-bold text-white leading-tight">{user?.name || "Admin"}</p>
          <p className="text-xs text-gray-500">{user?.email}</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold shadow-neon shrink-0">
          {user?.name?.charAt(0) || "A"}
        </div>
      </div>
    </div>
  );
}
