"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "info";

interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastContextType {
  toast: (type: ToastType, message: string) => void;
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((type: ToastType, message: string) => {
    if (message === "Unauthorized") {
      window.location.href = "/admin/login";
      return;
    }

    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);

    // Auto dismiss after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const success = useCallback((message: string) => addToast("success", message), [addToast]);
  const error = useCallback((message: string) => addToast("error", message), [addToast]);
  const info = useCallback((message: string) => addToast("info", message), [addToast]);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast: addToast, success, error, info }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`
              flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border pointer-events-auto
              animate-in slide-in-from-right-8 fade-in duration-300
              ${t.type === "success" ? "bg-green-500/10 border-green-500/20 text-green-400" : ""}
              ${t.type === "error" ? "bg-red-500/10 border-red-500/20 text-red-400" : ""}
              ${t.type === "info" ? "bg-blue-500/10 border-blue-500/20 text-blue-400" : ""}
            `}
            style={{ backdropFilter: "blur(8px)" }}
          >
            {t.type === "success" && <CheckCircle2 className="w-5 h-5" />}
            {t.type === "error" && <AlertCircle className="w-5 h-5" />}
            {t.type === "info" && <Info className="w-5 h-5" />}
            <p className="font-medium text-sm text-white">{t.message}</p>
            <button
              onClick={() => removeToast(t.id)}
              className="ml-2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
