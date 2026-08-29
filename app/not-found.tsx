"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FloralDivider } from "@/components/floral-divider";

function CornerOrnament({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      className={`text-primary/50 ${className}`}
      aria-hidden="true"
    >
      <path d="M10 10 Q 40 10 50 30 Q 55 50 35 55 Q 15 50 10 30 Z" fill="currentColor" opacity="0.18" />
      <path d="M10 10 Q 60 10 80 30" />
      <path d="M10 10 Q 10 60 30 80" />
      <circle cx="50" cy="30" r="2" fill="currentColor" />
      <circle cx="30" cy="50" r="2" fill="currentColor" />
      <path d="M70 25 Q 75 30 70 35 Q 65 30 70 25 Z" fill="currentColor" opacity="0.4" />
      <path d="M25 70 Q 30 75 35 70 Q 30 65 25 70 Z" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/");
    }, 1500); // Dar 1.5s para apreciar la pantalla antes de redirigir
    
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center relative overflow-hidden">
      {/* Fondo suave */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/60 via-background to-background" aria-hidden="true" />

      {/* Ornamentos en esquinas */}
      <CornerOrnament className="absolute top-4 left-4 h-20 w-20 sm:h-28 sm:w-28" />
      <CornerOrnament className="absolute top-4 right-4 h-20 w-20 sm:h-28 sm:w-28 -scale-x-100" />
      <CornerOrnament className="absolute bottom-4 left-4 h-20 w-20 sm:h-28 sm:w-28 -scale-y-100" />
      <CornerOrnament className="absolute bottom-4 right-4 h-20 w-20 sm:h-28 sm:w-28 -scale-x-100 -scale-y-100" />

      <div className="relative mx-auto flex max-w-lg flex-col items-center px-6 text-center animate-in fade-in zoom-in duration-1000">
        <p className="font-display text-xs sm:text-sm tracking-[0.5em] uppercase text-primary/80">
          Oops...
        </p>

        <div className="mt-4 mb-4">
          <span className="font-script text-6xl sm:text-8xl text-primary leading-none">
            Página no encontrada
          </span>
        </div>

        <p className="font-serif italic text-base sm:text-lg text-muted-foreground max-w-md text-balance leading-relaxed">
          Parece que te has perdido de camino a la fiesta.
        </p>

        <FloralDivider className="my-8" />

        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="font-serif italic text-sm text-foreground/80">
            Acomodándote de vuelta al inicio...
          </p>
        </div>
      </div>
    </main>
  );
}
